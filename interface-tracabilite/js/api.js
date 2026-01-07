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
     * @param {string} lotNumber - Numéro de lot (pour s'assurer qu'il est présent)
     * @returns {Object} - Données au format proxy BeePerf
     */
    function convertLegacyToProxyFormat(legacyData, lotNumber) {
        console.log('📝 Conversion des données legacy:', {
            hasLotNumber: !!legacyData.lotNumber,
            hasZone: !!legacyData.zone,
            hasProduction: !!legacyData.production,
            hasBeekeeper: !!legacyData.beekeeper
        });

        return {
            lotNumber: legacyData.lotNumber || lotNumber,
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
            beekeeper: legacyData.beekeeper || null
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

        console.log(`\n🔍 getTraceability() appelée pour le lot: ${lotNumber.trim()}`);

        // Vérifier si le numéro de lot contient un code apiculteur (nouveau format)
        const beekeeperCode = extractBeekeeperCode(lotNumber.trim());
        console.log(`📋 Code apiculteur extrait: ${beekeeperCode || 'AUCUN'}`);

        let beekeeperData = null;
        let useProxy = false; // Par défaut FALSE pour éviter les appels proxy non désirés

        if (beekeeperCode) {
            // Charger les données de l'apiculteur depuis le JSON
            console.log(`📂 Chargement des données pour le code: ${beekeeperCode}...`);
            beekeeperData = await loadBeekeeperData(beekeeperCode);

            if (beekeeperData) {
                console.log(`✓ Données apiculteur chargées:`, {
                    nom: `${beekeeperData.firstName} ${beekeeperData.lastName}`,
                    useProxy: beekeeperData.useProxy
                });
                // Vérifier si on doit utiliser le proxy ou les données locales
                useProxy = beekeeperData.useProxy === true; // Explicite
                console.log(`ℹ️ useProxy configuré à: ${useProxy}`);
                console.log(`📡 Source de données: ${useProxy ? '🌐 Proxy API' : '📂 Fichier JSON local'}`);
            } else {
                console.warn(`⚠️ Aucune donnée apiculteur trouvée pour le code: ${beekeeperCode}`);
                console.log(`ℹ️ Par défaut, on utilisera les données locales (useProxy: false)`);
            }
        } else {
            // Pas de code apiculteur extractible, chercher un apiculteur avec useProxy
            console.log(`⚠️ Format de numéro de lot sans code apiculteur (format numérique)`);
            console.log(`🔍 Recherche d'un apiculteur avec useProxy: true...`);

            const beekeepersResponse = await fetch('data/beekeepers.json');
            const beekeepersAll = await beekeepersResponse.json();

            for (const [code, beekeeper] of Object.entries(beekeepersAll.beekeepers)) {
                if (beekeeper.useProxy === true) {
                    beekeeperData = beekeeper;
                    useProxy = true;
                    console.log(`✓ Apiculteur par défaut trouvé: ${code} (useProxy=true)`);
                    break;
                }
            }

            if (!beekeeperData) {
                console.warn(`⚠️ Aucun apiculteur avec useProxy: true trouvé`);
                throw new Error('NO_BEEKEEPER_FOR_PROXY');
            }
        }

        let data;

        console.log(`\n${'='.repeat(60)}`);
        console.log(`📊 RÉCUPÉRATION DES DONNÉES DE TRAÇABILITÉ`);
        console.log(`${'='.repeat(60)}`);

        if (useProxy) {
            // Récupérer les données depuis le proxy API (format BeePerf natif)
            console.log(`🌐 MODE PROXY API ACTIVÉ`);
            const url = `${config.API_BASE_URL}${config.ENDPOINTS.GET_TRACEABILITY}/${encodeURIComponent(lotNumber.trim())}`;
            console.log(`📡 URL appelée: ${url}`);

            try {
                console.log(`⏳ Appel en cours...`);
                const rawData = await fetchWithTimeout(url);
                console.log('✅ Données reçues du proxy avec succès');
                console.log(`📦 Données brutes du proxy:`, rawData);

                // Le proxy BeePerf retourne les données à la racine :
                // {
                //   dateConditionnement: "2024-07-04",
                //   datesExtractions: ["2024-07-02", "2024-07-03"],
                //   nbRuchesRecoltees: 12,
                //   ruchers: [...]
                // }

                // Restructurer pour matcher notre format attendu
                data = {
                    lotNumber: rawData.lotNumber || rawData.numero_lot || lotNumber.trim(),
                    ruchers: rawData.ruchers || [],
                    production: {
                        datesExtractions: rawData.datesExtractions || [],
                        dateConditionnement: rawData.dateConditionnement || '',
                        nbRuchesRecoltees: rawData.nbRuchesRecoltees
                    },
                    beekeeper: rawData.beekeeper || null
                };

                console.log(`📦 Données restructurées:`, {
                    hasRuchers: !!data.ruchers,
                    nbRuchers: data.ruchers?.length || 0,
                    hasProduction: !!data.production,
                    hasDatesExtractions: !!data.production?.datesExtractions,
                    datesExtractions: data.production?.datesExtractions,
                    hasDateConditionnement: !!data.production?.dateConditionnement,
                    dateConditionnement: data.production?.dateConditionnement
                });
            } catch (error) {
                console.error(`❌ ERREUR lors de la récupération depuis le proxy:`);
                console.error(`   Type: ${error.message}`);
                console.error(`   Détails:`, error);

                // FALLBACK AUTOMATIQUE vers le JSON local si le proxy échoue
                if (error.message === 'NOT_FOUND' || error.message.includes('404')) {
                    console.log(`\n${'='.repeat(60)}`);
                    console.log(`🔄 FALLBACK AUTOMATIQUE VERS JSON LOCAL`);
                    console.log(`${'='.repeat(60)}`);
                    console.log(`⚠️ Le lot n'a pas été trouvé dans le proxy`);
                    console.log(`📂 Tentative de récupération depuis le fichier JSON local...`);

                    try {
                        const legacyData = await loadTraceabilityFromJSON(lotNumber.trim());

                        if (!legacyData) {
                            console.error(`❌ Lot non trouvé dans le JSON local non plus`);
                            throw new Error('NOT_FOUND');
                        }

                        console.log('✅ Lot trouvé dans le JSON local !');
                        console.log(`📦 Structure des données legacy:`, {
                            hasLotNumber: !!legacyData.lotNumber,
                            hasZone: !!legacyData.zone,
                            hasProduction: !!legacyData.production
                        });

                        // Convertir l'ancien format vers le format proxy BeePerf
                        console.log(`🔄 Conversion de l'ancien format vers le format proxy BeePerf...`);
                        data = convertLegacyToProxyFormat(legacyData, lotNumber.trim());

                        console.log('✅ Données converties avec succès (depuis fallback JSON)');
                    } catch (fallbackError) {
                        console.error(`❌ Échec du fallback JSON local:`, fallbackError);
                        throw error; // Relancer l'erreur originale du proxy
                    }
                } else {
                    // Pour les autres erreurs (timeout, réseau, etc.), on ne fait pas de fallback
                    throw error;
                }
            }
        } else {
            // Récupérer les données depuis le fichier JSON local (ancien format)
            console.log(`📂 MODE FICHIER JSON LOCAL ACTIVÉ`);
            console.log(`📄 Fichier: data/traceability-data.json`);
            console.log(`🔑 Recherche de la clé: "${lotNumber.trim()}"`);

            const legacyData = await loadTraceabilityFromJSON(lotNumber.trim());

            if (!legacyData) {
                console.error(`❌ AUCUNE DONNÉE trouvée dans le JSON local`);
                console.error(`   Lot recherché: ${lotNumber.trim()}`);
                console.error(`   Vérifiez que ce lot existe dans traceability-data.json`);
                throw new Error('NOT_FOUND');
            }

            console.log('✅ Données trouvées dans le JSON local');
            console.log(`📦 Structure des données legacy:`, {
                hasLotNumber: !!legacyData.lotNumber,
                hasZone: !!legacyData.zone,
                hasProduction: !!legacyData.production
            });

            // Convertir l'ancien format vers le format proxy BeePerf
            console.log(`🔄 Conversion de l'ancien format vers le format proxy BeePerf...`);
            data = convertLegacyToProxyFormat(legacyData, lotNumber.trim());

            console.log('✅ Données converties avec succès');
            console.log(`📦 Structure après conversion:`, {
                lotNumber: data.lotNumber,
                hasRuchers: !!data.ruchers && data.ruchers.length > 0,
                nbRuchers: data.ruchers?.length || 0,
                hasProduction: !!data.production,
                hasDatesExtractions: !!data.production?.datesExtractions,
                hasBeekeeper: !!data.beekeeper
            });
        }

        console.log(`\n${'='.repeat(60)}`);
        console.log(`👤 FUSION DES DONNÉES APICULTEUR`);
        console.log(`${'='.repeat(60)}`);


        // Fusionner les données de l'apiculteur si elles existent
        if (beekeeperData) {
            console.log('👤 Fusion des données apiculteur depuis beekeepers.json');
            console.log(`   Nom: ${beekeeperData.firstName} ${beekeeperData.lastName}`);
            console.log(`   Nom commercial: ${beekeeperData.commercialName || 'N/A'}`);

            data.beekeeper = {
                ...data.beekeeper, // Données de l'API ou du JSON (si présentes)
                ...beekeeperData   // Données du fichier beekeepers.json (prioritaires)
            };

            console.log('✅ Fusion réussie');
        } else {
            console.warn('⚠️ Aucune donnée apiculteur trouvée dans beekeepers.json');
        }

        console.log(`\n${'='.repeat(60)}`);
        console.log(`✅ DONNÉES FINALES PRÊTES`);
        console.log(`${'='.repeat(60)}`);
        console.log(`📋 Numéro de lot: ${data.lotNumber}`);
        console.log(`🏠 Ruchers: ${data.ruchers?.length || 0}`);
        if (data.ruchers && data.ruchers.length > 0) {
            data.ruchers.forEach((r, i) => {
                console.log(`   ${i + 1}. ${r.nom} - ${r.nomPublicZone} (${r.environnement})`);
            });
        }
        console.log(`📅 Dates extraction: ${data.production?.datesExtractions?.length || 0}`);
        console.log(`📦 Date conditionnement: ${data.production?.dateConditionnement || 'N/A'}`);
        console.log(`👤 Apiculteur: ${data.beekeeper ? `${data.beekeeper.firstName} ${data.beekeeper.lastName}` : 'Non défini'}`);
        console.log(`${'='.repeat(60)}\n`);

        data.lotNumber = lotNumber;

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

