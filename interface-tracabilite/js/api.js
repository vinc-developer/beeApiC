/**
 * Module API
 * Gère les communications avec le proxy de traçabilité
 */

const API = (function() {
    'use strict';

    const config = window.APP_CONFIG;

    /**
     * Effectue une requête HTTP GET avec timeout
     * @param {string} url - URL complète de la requête
     * @param {number} timeout - Timeout en millisecondes
     * @returns {Promise<Object>} - Données JSON de la réponse
     */
    async function fetchWithTimeout(url, timeout = config.REQUEST_TIMEOUT) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('NOT_FOUND');
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('TIMEOUT');
            }
            throw error;
        }
    }

    /**
     * Récupère la liste des numéros de lots disponibles
     * @param {number} perPage - Nombre de résultats par page (défaut: 100)
     * @param {number} page - Numéro de la page (défaut: 1)
     * @returns {Promise<Array<string>>} - Liste des numéros de lots
     */
    async function getLotsList(perPage = 100, page = 1) {
        const url = `${config.API_BASE_URL}${config.ENDPOINTS.LIST_LOTS}?per_page=${perPage}&page=${page}`;

        try {
            //const data = await fetchWithTimeout(url);
            // L'API BeePerf retourne un objet avec une propriété 'data' contenant les lots
            return [ await getMockData("BA-2026-CH-0107").then(data => data.lotNumber),
                await getMockData("MC-2026-PA-2505").then(data => data.lotNumber)];
            //return data.data || [];
        } catch (error) {
            console.error('Erreur lors de la récupération de la liste des lots:', error);
            throw error;
        }
    }

    /**
     * Extrait le code apiculteur du numéro de lot (nouveau format: BA-2026-CH-0107)
     * @param {string} lotNumber - Numéro du lot
     * @returns {string|null} - Code apiculteur (2-3 premières lettres) ou null
     */
    function extractBeekeeperCode(lotNumber) {
        // Nouveau format: BA-2026-CH-0107 (commence par 2-3 lettres majuscules)
        const match = lotNumber.match(/^([A-Z]{2,3})-/);
        return match ? match[1] : null;
    }

    /**
     * Charge les données d'un apiculteur depuis le fichier JSON
     * @param {string} beekeeperCode - Code apiculteur (ex: BA, CV)
     * @returns {Promise<Object|null>} - Données de l'apiculteur ou null
     */
    async function loadBeekeeperData(beekeeperCode) {
        try {
            const response = await fetch('data/beekeepers.json');
            const data = await response.json();
            return data.beekeepers[beekeeperCode] || null;
        } catch (error) {
            console.error('Erreur lors du chargement des données apiculteur:', error);
            return null;
        }
    }

    /**
     * Récupère les informations de traçabilité pour un numéro de lot
     * @param {string} lotNumber - Numéro du lot
     * @returns {Promise<Object>} - Données de traçabilité
     */
    async function getTraceability(lotNumber) {
        if (!lotNumber || typeof lotNumber !== 'string' || lotNumber.trim() === '') {
            throw new Error('INVALID_LOT_NUMBER');
        }

        const url = `${config.API_BASE_URL}${config.ENDPOINTS.GET_TRACEABILITY}/${encodeURIComponent(lotNumber.trim())}`;

        try {
            const data = await fetchWithTimeout(url);

            // Vérifier si le numéro de lot contient un code apiculteur (nouveau format)
            const beekeeperCode = extractBeekeeperCode(lotNumber.trim());

            if (beekeeperCode) {
                // Charger les données de l'apiculteur depuis le JSON
                const beekeeperData = await loadBeekeeperData(beekeeperCode);

                if (beekeeperData) {
                    // Remplacer ou fusionner avec les données de l'API
                    data.beekeeper = {
                        ...data.beekeeper, // Données de l'API (si présentes)
                        ...beekeeperData   // Données du JSON (prioritaires)
                    };
                    console.log(`✓ Données apiculteur chargées pour le code: ${beekeeperCode}`);
                }
            }

            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la traçabilité:', error);
            throw error;
        }
    }

    /**
     * Simule une API pour les tests en local (à retirer en production)
     * @param {string} lotNumber - Numéro du lot
     * @returns {Promise<Object>} - Données simulées
     */
    async function getMockData(lotNumber) {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (lotNumber == "BA-2026-CH-0107") {
            // Données simulées pour les tests
            return {
                lotNumber: lotNumber,
                zone: {
                    publicName: 'France - Saint Léger les Vignes',
                    environment: 'Nos ruches sont situées dans un environnement préservé, entouré de forêts de châtaigniers, de prairies fleuries et de cultures biologiques. La diversité florale de cette région offre un miel aux saveurs uniques et authentiques.'
                },
                production: {
                    extractionDates: [
                        '2024-07-15',
                        '2024-07-22',
                        '2024-08-05'
                    ],
                    bottlingDate: '2024-08-20'
                },
                beekeeper: {
                    type: 'Apiculteur Récoltant',
                    partnerSince: '',
                    firstName: 'Vincent',
                    lastName: 'Colas',
                    commercialName: 'Bee Api\'C',
                    address: 'bois des abeilles\n44680 Saint-Hilaire-de-Chaléons - France',
                    email: 'bee.apic@gmail.com',
                    phone: '+33 6 06 06 06 06',
                    website: 'https://bee-apic.com/',
                    siret: '910 020 346 00029',
                    photo: 'colas-vincent.jpg',
                    logo: 'logo-beeapic.png',
                    bio: 'Passionné par l\'apiculture depuis plus de 10 ans, je produis un miel de qualité dans la magnifique région des Pays de Retz. Mes ruches sont situées dans des zones préservées, entourées de châtaigniers et de prairies fleuries.',
                    hivesCount: '20 ruches',
                    location: 'Saint-Hilaire-de-Chaléons, Loire-Atlantique, France',
                    distance: '45 km de Nantes',
                    beekeeperSince: '2023',
                    gallery: ['cadre-miel.jpg', 'essaim.jpg', 'miels.jpg', 'produits.jpg'],
                    socialMedia: {
                        instagram: 'https://instagram.com/ruchersduval',
                        facebook: 'https://facebook.com/ruchersduval',
                        tiktok: 'https://facebook.com/ruchersduval',
                        youtube: 'https://youtube.com/@ruchersduval',
                        linkedin: 'https://facebook.com/ruchersduval'
                    }
                }
            };
        } else {
            return {
                lotNumber: lotNumber,
                zone: {
                    publicName: 'France - Guenrouet',
                    environment: 'Nos ruches sont situées dans un environnement préservé, entouré de forêts de châtaigniers, de prairies fleuries et de cultures biologiques. La diversité florale de cette région offre un miel aux saveurs uniques et authentiques.'
                },
                production: {
                    extractionDates: [
                        '2024-07-15',
                        '2024-07-22',
                        '2024-08-05'
                    ],
                    bottlingDate: '2024-08-20'
                },
                beekeeper: {
                    type: 'Apiculteur Récoltant',
                    partnerSince: '2025',
                    firstName: 'Matthieu',
                    lastName: 'Colas',
                    commercialName: 'L\'abeille Guérinoise',
                    address: 'chemin des abeilles\n44530 Guenrouet - France',
                    email: 'labeille-guerinoise@gmail.com',
                    phone: '+33 6 06 06 06 06',
                    website: 'https://abeille-guerinoise.com/',
                    siret: '910 020 346 00029',
                    photo: 'matthieu-colas/matthieu-colas.jpg',
                    logo: 'matthieu-colas/logo.jpg',
                    bio: 'Passionné par l\'apiculture depuis plus de 10 ans, je produis un miel de qualité dans la magnifique région des Pays de Retz. Mes ruches sont situées dans des zones préservées, entourées de châtaigniers et de prairies fleuries.',
                    hivesCount: '30 ruches',
                    location: 'Guenrouet, Loire-Atlantique, France',
                    distance: '70 km de Nantes',
                    beekeeperSince: '2020',
                    gallery: ['matthieu-colas/ruche-matthieu.jpg', 'matthieu-colas/rucher-matthieu.jpg'],
                    socialMedia: {
                        instagram: 'https://instagram.com/ruchersduval',
                        facebook: 'https://facebook.com/ruchersduval',
                        tiktok: 'https://facebook.com/ruchersduval',
                        youtube: 'https://youtube.com/@ruchersduval',
                        linkedin: 'https://facebook.com/ruchersduval'
                    }
                }
            };
        }
    }

    // Interface publique du module
    return {
        getLotsList,
        getTraceability,
        getMockData // À retirer en production
    };
})();

// Rendre le module API accessible globalement
window.API = API;

