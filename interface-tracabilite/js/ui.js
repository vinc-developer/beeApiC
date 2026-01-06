/**
 * Module UI
 * Gère l'interface utilisateur et l'affichage des données
 */

const UI = (function() {
    'use strict';

    const config = window.APP_CONFIG;

    // Éléments du DOM
    const elements = {
        // Méthodes de recherche
        btnManualInput: document.getElementById('btnManualInput'),
        btnListSelect: document.getElementById('btnListSelect'),
        manualInputGroup: document.getElementById('manualInputGroup'),
        listSelectGroup: document.getElementById('listSelectGroup'),

        // Champs de recherche
        lotNumber: document.getElementById('lotNumber'),
        lotSelect: document.getElementById('lotSelect'),
        btnSearchManual: document.getElementById('btnSearchManual'),
        btnSearchList: document.getElementById('btnSearchList'),

        // Messages et états
        errorMessage: document.getElementById('errorMessage'),
        loadingSpinner: document.getElementById('loadingSpinner'),

        // Sections
        searchSection: document.getElementById('searchSection'),
        resultsSection: document.getElementById('resultsSection'),

        // Résultats - Informations du produit
        displayLotNumber: document.getElementById('displayLotNumber'),
        displayZone: document.getElementById('displayZone'),
        displayEnvironment: document.getElementById('displayEnvironment'),

        // Résultats - Dates
        displayExtractionDates: document.getElementById('displayExtractionDates'),
        displayBottlingDate: document.getElementById('displayBottlingDate'),

        // Résultats - Apiculteur
        beekeeperType: document.getElementById('beekeeperType'),
        beekeeperName: document.getElementById('beekeeperName'),
        commercialName: document.getElementById('commercialName'),
        beekeeperAddress: document.getElementById('beekeeperAddress'),
        beekeeperWebsite: document.getElementById('beekeeperWebsite'),
        beekeeperEmail: document.getElementById('beekeeperEmail'),
        beekeeperPhone: document.getElementById('beekeeperPhone'),
        beekeeperSiret: document.getElementById('beekeeperSiret'),
        beekeeperPhotoImg: document.getElementById('beekeeperPhotoImg'),
        photoPlaceholder: document.getElementById('photoPlaceholder'),
        beekeeperLogoImg: document.getElementById('beekeeperLogoImg'),
        logoPlaceholder: document.getElementById('logoPlaceholder'),
        socialMediaSection: document.getElementById('socialMediaSection'),
        socialLinks: document.getElementById('socialLinks'),

        // Actions
        btnNewSearch: document.getElementById('btnNewSearch')
    };

    /**
     * Affiche un message d'erreur
     * @param {string} message - Message à afficher
     */
    function showError(message) {
        const errorText = elements.errorMessage.querySelector('.error-text');
        errorText.textContent = message;
        elements.errorMessage.classList.remove('hidden');
    }

    /**
     * Cache le message d'erreur
     */
    function hideError() {
        elements.errorMessage.classList.add('hidden');
    }

    /**
     * Affiche le spinner de chargement
     */
    function showLoading() {
        elements.loadingSpinner.classList.remove('hidden');
        hideError();
    }

    /**
     * Cache le spinner de chargement
     */
    function hideLoading() {
        elements.loadingSpinner.classList.add('hidden');
    }

    /**
     * Bascule entre les modes de recherche (manuel / liste)
     * @param {string} method - 'manual' ou 'list'
     */
    function switchSearchMethod(method) {
        if (method === 'manual') {
            elements.btnManualInput.classList.add('active');
            elements.btnListSelect.classList.remove('active');
            elements.manualInputGroup.classList.remove('hidden');
            elements.listSelectGroup.classList.add('hidden');
        } else {
            elements.btnManualInput.classList.remove('active');
            elements.btnListSelect.classList.add('active');
            elements.manualInputGroup.classList.add('hidden');
            elements.listSelectGroup.classList.remove('hidden');
        }
        hideError();
    }

    /**
     * Remplit la liste déroulante avec les numéros de lots
     * @param {Array<string>} lots - Liste des numéros de lots
     */
    function populateLotsList(lots) {
        // Vider la liste sauf l'option par défaut
        elements.lotSelect.innerHTML = '<option value="">-- Choisir un numéro de lot --</option>';

        // Ajouter les lots
        lots.forEach(lot => {
            const option = document.createElement('option');
            option.value = lot;
            option.textContent = lot;
            elements.lotSelect.appendChild(option);
        });
    }

    /**
     * Formate une date au format français
     * @param {string} dateString - Date au format ISO (YYYY-MM-DD)
     * @returns {string} - Date formatée
     */
    function formatDate(dateString) {
        if (!dateString) return '-';

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(
                config.DATE_FORMAT.locale,
                config.DATE_FORMAT.options
            );
        } catch (error) {
            console.error('Erreur de formatage de date:', error);
            return dateString;
        }
    }

    /**
     * Affiche les réseaux sociaux de l'apiculteur
     * @param {Object} socialMedia - Objet contenant les URLs des réseaux sociaux
     */
    function displaySocialMedia(socialMedia) {
        if (!socialMedia) {
            elements.socialMediaSection.classList.add('hidden');
            return;
        }

        // Configuration des réseaux sociaux avec leurs vraies icônes Font Awesome
        const socialConfig = {
            instagram: {
                icon: 'fa-brands fa-instagram',
                name: 'Instagram',
                color: '#E4405F'
            },
            facebook: {
                icon: 'fa-brands fa-facebook',
                name: 'Facebook',
                color: '#1877F2'
            },
            tiktok: {
                icon: 'fa-brands fa-tiktok',
                name: 'TikTok',
                color: '#000000'
            },
            youtube: {
                icon: 'fa-brands fa-youtube',
                name: 'YouTube',
                color: '#FF0000'
            },
            linkedin: {
                icon: 'fa-brands fa-linkedin',
                name: 'LinkedIn',
                color: '#0A66C2'
            }
        };

        // Vider les liens existants
        elements.socialLinks.innerHTML = '';

        let hasAtLeastOne = false;

        // Créer les liens pour chaque réseau social disponible
        Object.keys(socialConfig).forEach(network => {
            const url = socialMedia[network];
            if (url && url.trim() !== '') {
                hasAtLeastOne = true;

                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'social-link';
                link.title = `Visiter notre ${socialConfig[network].name}`;
                link.setAttribute('data-network', network);
                link.innerHTML = `
                    <i class="${socialConfig[network].icon} social-icon"></i>
                    <span class="social-name">${socialConfig[network].name}</span>
                `;

                elements.socialLinks.appendChild(link);
            }
        });

        // Afficher ou cacher la section selon qu'il y a des liens
        if (hasAtLeastOne) {
            elements.socialMediaSection.classList.remove('hidden');
        } else {
            elements.socialMediaSection.classList.add('hidden');
        }
    }

    /**
     * Affiche les résultats de la traçabilité
     * @param {Object} data - Données de traçabilité
     */
    function displayResults(data) {
        // Informations du produit
        elements.displayLotNumber.textContent = data.lotNumber || '-';
        elements.displayZone.textContent = data.zone?.publicName || '-';
        elements.displayEnvironment.textContent = data.zone?.environment || '-';

        // Dates d'extraction
        if (data.production?.extractionDates && Array.isArray(data.production.extractionDates)) {
            if (data.production.extractionDates.length > 0) {
                elements.displayExtractionDates.innerHTML = data.production.extractionDates
                    .map(date => `<span class="date-value">${formatDate(date)}</span>`)
                    .join('');
            } else {
                elements.displayExtractionDates.innerHTML = '<span class="date-value">-</span>';
            }
        } else {
            elements.displayExtractionDates.innerHTML = '<span class="date-value">-</span>';
        }

        // Date de mise en pot
        elements.displayBottlingDate.textContent = formatDate(data.production?.bottlingDate) || '-';

        // Informations de l'apiculteur
        const beekeeper = data.beekeeper || {};

        // Type d'apiculteur
        elements.beekeeperType.textContent = beekeeper.type || '-';

        // Nom complet
        const fullName = [beekeeper.firstName, beekeeper.lastName]
            .filter(Boolean)
            .join(' ') || '-';

        elements.beekeeperName.textContent = fullName;
        elements.commercialName.textContent = beekeeper.commercialName || '-';
        elements.beekeeperAddress.textContent = beekeeper.address || '-';
        elements.beekeeperSiret.textContent = beekeeper.siret || '-';

        // Site web (lien cliquable)
        if (beekeeper.website) {
            // Extraire le nom de domaine pour l'affichage
            let displayUrl = beekeeper.website;
            try {
                const url = new URL(beekeeper.website);
                displayUrl = url.hostname.replace('www.', '');
            } catch (e) {
                // Si l'URL n'est pas valide, afficher telle quelle
            }
            elements.beekeeperWebsite.textContent = displayUrl;
            elements.beekeeperWebsite.href = beekeeper.website;
        } else {
            elements.beekeeperWebsite.textContent = '-';
            elements.beekeeperWebsite.removeAttribute('href');
        }

        // Email (lien cliquable)
        if (beekeeper.email) {
            elements.beekeeperEmail.textContent = beekeeper.email;
            elements.beekeeperEmail.href = `mailto:${beekeeper.email}`;
        } else {
            elements.beekeeperEmail.textContent = '-';
            elements.beekeeperEmail.removeAttribute('href');
        }

        // Téléphone (lien cliquable)
        if (beekeeper.phone) {
            elements.beekeeperPhone.textContent = beekeeper.phone;
            elements.beekeeperPhone.href = `tel:${beekeeper.phone}`;
        } else {
            elements.beekeeperPhone.textContent = '-';
            elements.beekeeperPhone.removeAttribute('href');
        }

        // Photo de l'apiculteur
        if (beekeeper.photo) {
            elements.beekeeperPhotoImg.src = beekeeper.photo;
            elements.beekeeperPhotoImg.classList.remove('hidden');
            elements.photoPlaceholder.classList.add('hidden');
        } else {
            elements.beekeeperPhotoImg.classList.add('hidden');
            elements.photoPlaceholder.classList.remove('hidden');
        }

        // Logo commercial
        if (beekeeper.logo) {
            elements.beekeeperLogoImg.src = beekeeper.logo;
            elements.beekeeperLogoImg.classList.remove('hidden');
            elements.logoPlaceholder.classList.add('hidden');
        } else {
            elements.beekeeperLogoImg.classList.add('hidden');
            elements.logoPlaceholder.classList.remove('hidden');
        }

        // Réseaux sociaux
        displaySocialMedia(beekeeper.socialMedia);

        // Afficher les résultats et cacher la recherche
        elements.resultsSection.classList.remove('hidden');
        elements.searchSection.classList.add('hidden');

        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Affiche le formulaire de recherche et cache les résultats
     */
    function showSearchForm() {
        elements.resultsSection.classList.add('hidden');
        elements.searchSection.classList.remove('hidden');

        // Réinitialiser les champs
        elements.lotNumber.value = '';
        elements.lotSelect.value = '';
        hideError();

        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Obtient le numéro de lot saisi/sélectionné
     * @param {string} method - 'manual' ou 'list'
     * @returns {string|null} - Numéro de lot ou null
     */
    function getLotNumber(method) {
        if (method === 'manual') {
            return elements.lotNumber.value.trim();
        } else {
            return elements.lotSelect.value;
        }
    }

    /**
     * Valide le numéro de lot
     * @param {string} lotNumber - Numéro de lot à valider
     * @param {string} method - Méthode de saisie
     * @returns {boolean} - true si valide
     */
    function validateLotNumber(lotNumber, method) {
        if (!lotNumber) {
            if (method === 'manual') {
                showError(config.MESSAGES.ERROR_INVALID_LOT);
            } else {
                showError(config.MESSAGES.ERROR_NO_LOT_SELECTED);
            }
            return false;
        }
        return true;
    }

    // Interface publique du module
    return {
        elements,
        showError,
        hideError,
        showLoading,
        hideLoading,
        switchSearchMethod,
        populateLotsList,
        displayResults,
        showSearchForm,
        getLotNumber,
        validateLotNumber
    };
})();

// Rendre le module UI accessible globalement
window.UI = UI;

