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
            return [ await getMockData("LOT2323").then(data => data.lotNumber)];
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

        // Données simulées pour les tests
        return {
            lotNumber: lotNumber,
            zone: {
                publicName: 'Vallée de la Loire',
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
                partnerSince: 2025,
                firstName: 'Jean',
                lastName: 'Dupont',
                commercialName: 'Les Ruchers du Val de Loire',
                address: '123 Chemin des Abeilles\n37000 Tours\nFrance',
                email: 'contact@ruchersduval.fr',
                phone: '+33 2 47 12 34 56',
                website: 'https://www.ruchersduval.fr',
                siret: '123 456 789 00012',
                photo: '',
                logo: '',
                bio: 'Passionné par l\'apiculture depuis plus de 20 ans, je produis un miel de qualité dans la magnifique région de la Loire. Mes ruches sont situées dans des zones préservées, entourées de châtaigniers et de prairies fleuries.',
                hivesCount: '40 ruches',
                location: 'Vallée de la Loire, Indre-et-Loire',
                distance: '180 km de Nantes',
                beekeeperSince: '2005',
                gallery: [],
                socialMedia: {
                    instagram: 'https://instagram.com/ruchersduval',
                    facebook: 'https://facebook.com/ruchersduval',
                    tiktok: '',
                    youtube: 'https://youtube.com/@ruchersduval',
                    linkedin: ''
                }
            }
        };
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

