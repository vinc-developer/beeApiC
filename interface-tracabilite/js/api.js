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
     * @returns {Promise<Object>} - Objet avec les lots organisés par apiculteur
     */
    async function getLotsList(perPage = 100, page = 1) {
        try {
            const lotsByBeekeeper = {};

            // 1. Charger la liste des apiculteurs
            const beekeepersResponse = await fetch('data/beekeepers.json');
            const beekeepersData = await beekeepersResponse.json();

            // Charger une seule fois les données JSON locales (optimisation)
            let localTraceabilityData = null;
            try {
                const traceabilityResponse = await fetch('data/traceability-data.json');
                localTraceabilityData = await traceabilityResponse.json();
            } catch (error) {
                console.warn('⚠ Impossible de charger traceability-data.json:', error.message);
            }

            // 2. Pour chaque apiculteur
            for (const [code, beekeeper] of Object.entries(beekeepersData.beekeepers)) {
                lotsByBeekeeper[code] = {
                    name: beekeeper.commercialName || `${beekeeper.firstName} ${beekeeper.lastName}`,
                    lots: []
                };

                const allLotsForBeekeeper = new Set(); // Utiliser un Set pour éviter les doublons

                // Toujours charger depuis le JSON local si disponible
                if (localTraceabilityData) {
                    try {
                        const localLots = Object.keys(localTraceabilityData.lots || {})
                            .filter(lotNumber => lotNumber.startsWith(code + '-'));

                        localLots.forEach(lot => allLotsForBeekeeper.add(lot));
                        console.log(`✓ ${localLots.length} lot(s) chargé(s) depuis JSON local pour ${code}`);
                    } catch (error) {
                        console.warn(`⚠ Erreur lors du filtrage des lots JSON pour ${code}:`, error.message);
                    }
                }

                // Si useProxy, charger AUSSI depuis l'API et fusionner
                if (beekeeper.useProxy) {
                    try {
                        const url = `${config.API_BASE_URL}${config.ENDPOINTS.LIST_LOTS}?per_page=${perPage}&page=${page}&beekeeper=${code}`;
                        const response = await fetchWithTimeout(url);
                        const proxyLots = response.data || [];

                        proxyLots.forEach(lot => allLotsForBeekeeper.add(lot));
                        console.log(`✓ ${proxyLots.length} lot(s) chargé(s) depuis l'API Proxy pour ${code}`);
                    } catch (error) {
                        console.warn(`⚠ Impossible de charger les lots depuis l'API pour ${code}:`, error.message);
                        // Continuer avec les autres apiculteurs même si un échoue
                    }
                }

                // Convertir le Set en tableau et trier
                lotsByBeekeeper[code].lots = Array.from(allLotsForBeekeeper).sort();
                console.log(`✓ Total pour ${code}: ${lotsByBeekeeper[code].lots.length} lot(s) unique(s)`);
            }

            // 3. Aplatir la liste pour compatibilité avec le code existant
            const allLots = [];
            for (const [code, data] of Object.entries(lotsByBeekeeper)) {
                if (data.lots.length > 0) {
                    allLots.push(...data.lots);
                }
            }

            console.log(`✓ Total: ${allLots.length} lot(s) disponible(s)`);

            // Retourner les deux formats pour flexibilité
            return {
                flat: allLots,              // Liste plate pour compatibilité
                byBeekeeper: lotsByBeekeeper // Organisé par apiculteur
            };

        } catch (error) {
            console.error('Erreur lors de la récupération de la liste des lots:', error);
            // En cas d'erreur, retourner un objet vide
            return {
                flat: [],
                byBeekeeper: {}
            };
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
     * Charge les données de traçabilité depuis le fichier JSON local
     * @param {string} lotNumber - Numéro du lot
     * @returns {Promise<Object|null>} - Données de traçabilité ou null
     */
    async function loadTraceabilityFromJSON(lotNumber) {
        try {
            const response = await fetch('data/traceability-data.json');
            const data = await response.json();
            return data.lots[lotNumber] || null;
        } catch (error) {
            console.error('Erreur lors du chargement des données de traçabilité depuis JSON:', error);
            return null;
        }
    }

    /**
     * Convertit les données locales (ancien format) vers le format du proxy BeePerf
     * @param {Object} legacyData - Données au format legacy
     * @returns {Object} - Données au format proxy BeePerf
     */
    function convertLegacyToProxyFormat(legacyData) {
        return {
            lotNumber: legacyData.lotNumber,
            ruchers: legacyData.zone ? [{
                nom: 'Rucher principal',
                nomPublicZone: legacyData.zone.publicName || 'Zone non spécifiée',
                environnement: legacyData.zone.environment || 'Environnement non spécifié'
            }] : [],
            production: {
                datesExtractions: legacyData.production?.extractionDates || [],
                dateConditionnement: legacyData.production?.bottlingDate || '',
                nbRuchesRecoltees: undefined
            },
            beekeeper: legacyData.beekeeper
        };
    }

    /**
     * Récupère les informations de traçabilité pour un numéro de lot
     * @param {string} lotNumber - Numéro du lot
     * @returns {Promise<Object>} - Données de traçabilité au format proxy BeePerf
     */
    async function getTraceability(lotNumber) {
        if (!lotNumber || typeof lotNumber !== 'string' || lotNumber.trim() === '') {
            throw new Error('INVALID_LOT_NUMBER');
        }

        // Vérifier si le numéro de lot contient un code apiculteur (nouveau format)
        const beekeeperCode = extractBeekeeperCode(lotNumber.trim());
        let beekeeperData = null;
        let useProxy = true; // Par défaut, on utilise le proxy

        if (beekeeperCode) {
            // Charger les données de l'apiculteur depuis le JSON
            beekeeperData = await loadBeekeeperData(beekeeperCode);

            if (beekeeperData) {
                console.log(`✓ Données apiculteur chargées pour le code: ${beekeeperCode}`);
                // Vérifier si on doit utiliser le proxy ou les données locales
                useProxy = beekeeperData.useProxy !== undefined ? beekeeperData.useProxy : true;
                console.log(`ℹ Source de données: ${useProxy ? 'Proxy API' : 'Fichier JSON local'}`);
            }
        } else {
            // Pas de code apiculteur extractible, chercher un apiculteur avec useProxy
            const beekeepersResponse = await fetch('data/beekeepers.json');
            const beekeepersAll = await beekeepersResponse.json();

            for (const [code, beekeeper] of Object.entries(beekeepersAll.beekeepers)) {
                if (beekeeper.useProxy) {
                    beekeeperData = beekeeper;
                    console.log(`✓ Apiculteur par défaut (useProxy=true): ${code}`);
                    break;
                }
            }
        }

        let data;

        if (useProxy) {
            // Récupérer les données depuis le proxy API (format BeePerf natif)
            const url = `${config.API_BASE_URL}${config.ENDPOINTS.GET_TRACEABILITY}/${encodeURIComponent(lotNumber.trim())}`;

            try {
                data = await fetchWithTimeout(url);
                console.log('✓ Données reçues du proxy (format BeePerf natif)');

                // Les données du proxy sont déjà au bon format avec ruchers[], datesExtractions, etc.
                // Pas besoin de mapping !
            } catch (error) {
                console.error('Erreur lors de la récupération de la traçabilité depuis le proxy:', error);
                throw error;
            }
        } else {
            // Récupérer les données depuis le fichier JSON local (ancien format)
            const legacyData = await loadTraceabilityFromJSON(lotNumber.trim());

            if (!legacyData) {
                console.error(`Aucune donnée de traçabilité trouvée pour le lot: ${lotNumber.trim()}`);
                throw new Error('NOT_FOUND');
            }

            // Convertir l'ancien format vers le format proxy BeePerf
            console.log('🔄 Conversion des données locales vers le format proxy BeePerf');
            data = convertLegacyToProxyFormat(legacyData);
        }

        // Fusionner les données de l'apiculteur si elles existent
        if (beekeeperData) {
            data.beekeeper = {
                ...data.beekeeper, // Données de l'API ou du JSON (si présentes)
                ...beekeeperData   // Données du fichier beekeepers.json (prioritaires)
            };
        }

        return data;
    }


    // Interface publique du module
    return {
        getLotsList,
        getTraceability
    };
})();

// Rendre le module API accessible globalement
window.API = API;

