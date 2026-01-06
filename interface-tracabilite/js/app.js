/**
 * Module principal de l'application
 * Initialise l'application et gère les interactions utilisateur
 */

(function() {
    'use strict';

    const config = window.APP_CONFIG;
    const api = window.API;
    const ui = window.UI;

    // Méthode de recherche active
    let currentSearchMethod = 'manual';

    /**
     * Initialise l'application
     */
    async function init() {
        console.log('🚀 Initialisation de l\'application de traçabilité');

        // Initialiser les informations de la maison mère
        ui.initializeCompanyInfo();

        // Configurer les écouteurs d'événements
        setupEventListeners();

        // Charger la liste des lots au démarrage
        try {
            await loadLotsList();
        } catch (error) {
            console.warn('Impossible de charger la liste des lots au démarrage:', error);
            // On continue quand même, l'utilisateur pourra faire une recherche manuelle
        }

        console.log('✓ Application initialisée');
    }

    /**
     * Configure tous les écouteurs d'événements
     */
    function setupEventListeners() {
        // Boutons de sélection de méthode
        ui.elements.btnManualInput.addEventListener('click', () => {
            currentSearchMethod = 'manual';
            ui.switchSearchMethod('manual');
        });

        ui.elements.btnListSelect.addEventListener('click', () => {
            currentSearchMethod = 'list';
            ui.switchSearchMethod('list');
        });

        // Boutons de recherche
        ui.elements.btnSearchManual.addEventListener('click', () => {
            handleSearchDev('manual');
        });

        ui.elements.btnSearchList.addEventListener('click', () => {
            handleSearchDev('list');
        });

        // Recherche avec la touche Entrée dans le champ de saisie manuelle
        ui.elements.lotNumber.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchDev('manual');
            }
        });

        // Bouton nouvelle recherche
        ui.elements.btnNewSearch.addEventListener('click', () => {
            ui.showSearchForm();
        });

        // Bouton En savoir plus
        ui.elements.btnMoreInfo.addEventListener('click', () => {
            handleMoreInfo();
        });
    }

    /**
     * Charge la liste des numéros de lots
     */
    async function loadLotsList() {
        console.log('📋 Chargement de la liste des lots...');

        try {
            // Récupérer tous les lots (on peut augmenter per_page si nécessaire)
            const lots = await api.getLotsList(100, 1);

            if (lots && lots.length > 0) {
                ui.populateLotsList(lots);
                console.log(`✓ ${lots.length} lot(s) chargé(s)`);
            } else {
                console.warn('⚠ Aucun lot disponible');
            }
        } catch (error) {
            console.error('❌ Erreur lors du chargement de la liste des lots:', error);
            throw error;
        }
    }

    /**
     * Gère la recherche de traçabilité
     * @param {string} method - Méthode de recherche ('manual' ou 'list')
     */
    async function handleSearch(method) {
        console.log(`🔍 Recherche de traçabilité (méthode: ${method})`);

        // Récupérer le numéro de lot
        const lotNumber = ui.getLotNumber(method);

        // Valider
        if (!ui.validateLotNumber(lotNumber, method)) {
            return;
        }

        // Afficher le loading
        ui.showLoading();
        ui.hideError();

        try {
            console.log(`📦 Recherche du lot: ${lotNumber}`);

            // Appel API
            const data = await api.getTraceability(lotNumber);

            console.log('✓ Données reçues:', data);

            // Afficher les résultats
            ui.hideLoading();
            ui.displayResults(data);

        } catch (error) {
            console.error('❌ Erreur lors de la recherche:', error);
            ui.hideLoading();

            // Gérer les différents types d'erreurs
            let errorMessage = config.MESSAGES.ERROR_GENERIC;

            if (error.message === 'NOT_FOUND') {
                errorMessage = config.MESSAGES.ERROR_NOT_FOUND;
            } else if (error.message === 'TIMEOUT') {
                errorMessage = config.MESSAGES.ERROR_NETWORK;
            } else if (error.message === 'INVALID_LOT_NUMBER') {
                errorMessage = config.MESSAGES.ERROR_INVALID_LOT;
            } else if (error.message && error.message.startsWith('HTTP')) {
                errorMessage = `Erreur serveur: ${error.message}`;
            }

            ui.showError(errorMessage);
        }
    }

    /**
     * Mode développement - Permet de tester avec des données simulées
     * Décommenter pour utiliser des données de test sans appeler l'API
     */

    let currentBeekeeperData = null;
    let currentLotNumber = null;

    async function handleSearchDev(method) {
        const lotNumber = ui.getLotNumber(method);

        if (!ui.validateLotNumber(lotNumber, method)) {
            return;
        }

        ui.showLoading();
        ui.hideError();

        try {
            // Utiliser les données simulées
            const data = await api.getMockData(lotNumber);
            console.log('✓ Données mockées reçues:', data);

            // Sauvegarder les données pour la page apiculteur
            currentBeekeeperData = data.beekeeper;
            currentLotNumber = lotNumber;

            ui.hideLoading();
            ui.displayResults(data);
            console.log('✓ Résultats affichés avec succès');
        } catch (error) {
            console.error('❌ Erreur dans handleSearchDev:', error);
            console.error('Stack trace:', error.stack);
            ui.hideLoading();
            ui.showError(config.MESSAGES.ERROR_GENERIC + ' (' + error.message + ')');
        }
    }

    /**
     * Gère le clic sur "En savoir plus"
     */
    function handleMoreInfo() {
        if (currentBeekeeperData) {
            // Sauvegarder dans localStorage
            localStorage.setItem('currentBeekeeper', JSON.stringify(currentBeekeeperData));
            localStorage.setItem('currentLotNumber', currentLotNumber);

            // Rediriger vers la page apiculteur
            window.location.href = 'beekeeper.html';
        }
    }


    // Démarrer l'application quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exposer certaines fonctions pour le débogage en console
    window.APP = {
        loadLotsList,
        handleSearchDev,
        version: '1.0.0'
    };

    console.log('📱 Application de traçabilité BeeApiC v1.0.0');
})();

