/**
 * Module UI
 * Gère l'interface utilisateur et l'affichage des données
 */

const UI = (function() {
    'use strict';

    const config = window.APP_CONFIG;

    // Éléments du DOM
    const elements = {
        // Brand / Maison Mère
        brandLogo: document.getElementById('brandLogo'),
        logoPlaceholderBrand: document.getElementById('logoPlaceholderBrand'),
        companySection: document.querySelector('.company-section'),
        companyAddress: document.getElementById('companyAddress'),
        companyWebsite: document.getElementById('companyWebsite'),
        companyEmail: document.getElementById('companyEmail'),
        companyPhone: document.getElementById('companyPhone'),

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
        backButtonContainer: document.getElementById('backButtonContainer'),

        // Résultats - Informations du produit
        displayLotNumber: document.getElementById('displayLotNumber'),
        displayZone: document.getElementById('displayZone'),
        displayEnvironment: document.getElementById('displayEnvironment'),
        honeyTypeInfo: document.getElementById('honeyTypeInfo'),
        honeyTypeBadge: document.getElementById('honeyTypeBadge'),
        honeyTypeDescription: document.getElementById('honeyTypeDescription'),

        // Résultats - Dates
        displayExtractionDates: document.getElementById('displayExtractionDates'),
        displayBottlingDate: document.getElementById('displayBottlingDate'),

        // Résultats - Apiculteur
        beekeeperType: document.getElementById('beekeeperType'),
        partnerBadge: document.getElementById('partnerBadge'),
        partnerYear: document.getElementById('partnerYear'),
        beeapicProducerBadge: document.getElementById('beeapicProducerBadge'),
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
        btnNewSearch: document.getElementById('btnNewSearch'),
        btnMoreInfo: document.getElementById('btnMoreInfo')
    };

    /**
     * Extrait le code apiculteur du numéro de lot
     * @param {string} lotNumber - Numéro de lot (ex: BA-2026-CH-0107)
     * @returns {string|null} - Code apiculteur (ex: BA, CV) ou null
     */
    function extractBeekeeperCode(lotNumber) {
        if (!lotNumber) return null;
        const match = lotNumber.match(/^([A-Z]{2,3})-/);
        return match ? match[1] : null;
    }

    /**
     * Extrait le type de miel du numéro de lot
     * @param {string} lotNumber - Numéro de lot (ex: BA-2026-CH-0107 ou BA-2026-PA ou BA-2026-CH2)
     * @returns {string|null} - Code du type de miel (ex: CH, PA, CH2) ou null
     */
    function extractHoneyType(lotNumber) {
        if (!lotNumber) return null;
        // Format: XX-YYYY-TYPE-DDMM ou XX-YYYY-TYPE
        // Cherche 1-3 caractères (lettres ou lettres+chiffre) après le dernier tiret
        const match = lotNumber.match(/-([A-Z]{1,2}\d?)-?\d*$/);
        return match ? match[1] : null;
    }

    /**
     * Charge les informations sur un type de miel
     * @param {string} honeyTypeCode - Code du type de miel
     * @returns {Promise<Object|null>} - Info du type de miel ou null
     */
    async function loadHoneyTypeInfo(honeyTypeCode) {
        try {
            const response = await fetch('data/honey-types.json');
            const data = await response.json();
            return data.honeyTypes[honeyTypeCode] || null;
        } catch (error) {
            console.error('Erreur lors du chargement des types de miel:', error);
            return null;
        }
    }

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
     * Initialise les informations de la maison mère
     */
    function initializeCompanyInfo() {
        // Tentative de chargement du logo
        const logoImg = new Image();
        logoImg.src = 'images/logo-beeapic.png';

        logoImg.onload = function() {
            elements.brandLogo.src = 'images/logo-beeapic.png';
            elements.brandLogo.classList.remove('hidden');
            elements.logoPlaceholderBrand.classList.add('hidden');
        };

        logoImg.onerror = function() {
            // Le logo n'existe pas encore, on garde le placeholder
            console.log('ℹ Logo Bee Api\'C non trouvé, utilisation du placeholder');
        };

        // Configurer les liens de contact de la maison mère
        if (elements.companyWebsite) {
            elements.companyWebsite.href = 'https://www.beeapic.fr';
            elements.companyWebsite.target = '_blank';
            elements.companyWebsite.rel = 'noopener noreferrer';
        }

        if (elements.companyEmail) {
            elements.companyEmail.href = 'mailto:contact@beeapic.fr';
        }

        if (elements.companyPhone) {
            // Vous pouvez remplacer par le vrai numéro quand vous l'aurez
            elements.companyPhone.href = 'tel:+33XXXXXXXXX';
        }
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
     * Peuple la liste déroulante des numéros de lots
     * @param {Array<string>} lotsFlat - Liste plate des lots (pour compatibilité)
     * @param {Object} lotsByBeekeeper - Lots organisés par apiculteur
     */
    function populateLotsList(lotsFlat, lotsByBeekeeper = null) {
        // Vider la liste sauf l'option par défaut
        elements.lotSelect.innerHTML = '<option value="">-- Choisir un numéro de lot --</option>';

        // Si les lots sont organisés par apiculteur, créer des optgroups
        if (lotsByBeekeeper && Object.keys(lotsByBeekeeper).length > 0) {
            for (const [code, data] of Object.entries(lotsByBeekeeper)) {
                if (data.lots && data.lots.length > 0) {
                    // Créer un optgroup pour chaque apiculteur
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = `${data.name} (${code})`;

                    // Ajouter les lots de cet apiculteur
                    data.lots.forEach(lot => {
                        const option = document.createElement('option');
                        option.value = lot;
                        option.textContent = lot;
                        optgroup.appendChild(option);
                    });

                    elements.lotSelect.appendChild(optgroup);
                }
            }
        } else {
            // Fallback: afficher la liste plate sans organisation
            lotsFlat.forEach(lot => {
                const option = document.createElement('option');
                option.value = lot;
                option.textContent = lot;
                elements.lotSelect.appendChild(option);
            });
        }
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
    async function displayResults(data) {
        try {
            console.log('🎨 Début affichage des résultats');

            // Masquer la section maison mère lors de l'affichage des résultats
            if (elements.companySection) {
                elements.companySection.classList.add('hidden');
            }

            // Informations du produit
            console.log('📦 Affichage informations produit...');
            elements.displayLotNumber.textContent = data.lotNumber || '-';

            // Zone géographique : combiner tous les nomPublicZone des ruchers
            if (data.ruchers && data.ruchers.length > 0) {
                const zones = data.ruchers.map(r => r.nomPublicZone).filter(Boolean);
                elements.displayZone.textContent = zones.join(', ') || 'Non spécifiée';

                // Environnement : combiner et dédupliquer les environnements
                const environnements = [...new Set(data.ruchers.map(r => r.environnement).filter(Boolean))];
                elements.displayEnvironment.textContent = environnements.join(', ') || 'Non spécifié';
            } else {
                elements.displayZone.textContent = '-';
                elements.displayEnvironment.textContent = '-';
            }

            // Extraire et afficher le type de miel
            const honeyTypeCode = extractHoneyType(data.lotNumber);
            if (honeyTypeCode && elements.honeyTypeInfo) {
                const honeyTypeInfo = await loadHoneyTypeInfo(honeyTypeCode);
                if (honeyTypeInfo) {
                    elements.honeyTypeBadge.textContent = honeyTypeInfo.name;
                    if (elements.honeyTypeDescription) {
                        elements.honeyTypeDescription.textContent = honeyTypeInfo.description;
                    }
                    elements.honeyTypeInfo.classList.remove('hidden');
                    // Utiliser style.display pour les éléments avec style inline
                    elements.honeyTypeInfo.style.display = 'flex';
                } else {
                    elements.honeyTypeInfo.classList.add('hidden');
                    elements.honeyTypeInfo.style.display = 'none';
                }
            } else if (elements.honeyTypeInfo) {
                elements.honeyTypeInfo.classList.add('hidden');
                elements.honeyTypeInfo.style.display = 'none';
            }

            // Dates d'extraction (format proxy BeePerf : datesExtractions)
            console.log('📅 Affichage dates...');
            console.log('   Structure production:', {
                hasProduction: !!data.production,
                hasDatesExtractions: !!data.production?.datesExtractions,
                isArray: Array.isArray(data.production?.datesExtractions),
                datesExtractions: data.production?.datesExtractions,
                type: typeof data.production?.datesExtractions
            });

            if (data.production?.datesExtractions && Array.isArray(data.production.datesExtractions)) {
                if (data.production.datesExtractions.length > 0) {
                    console.log(`   ✅ ${data.production.datesExtractions.length} date(s) d'extraction à afficher`);
                    elements.displayExtractionDates.innerHTML = data.production.datesExtractions
                        .map(date => {
                            const formatted = formatDate(date);
                            console.log(`      Date: ${date} → Formatée: ${formatted}`);
                            return `<span class="date-value">${formatted}</span>`;
                        })
                        .join('');
                } else {
                    console.warn('   ⚠️ Tableau datesExtractions vide');
                    elements.displayExtractionDates.innerHTML = '<span class="date-value">-</span>';
                }
            } else {
                console.warn('   ⚠️ Pas de datesExtractions ou pas un tableau');
                console.warn('   Structure de production:', data.production);
                elements.displayExtractionDates.innerHTML = '<span class="date-value">-</span>';
            }

            // Date de conditionnement (format proxy BeePerf : dateConditionnement)
            console.log('📦 Date de conditionnement:', {
                hasDateConditionnement: !!data.production?.dateConditionnement,
                dateConditionnement: data.production?.dateConditionnement,
                type: typeof data.production?.dateConditionnement
            });
            const dateCondFormatted = formatDate(data.production?.dateConditionnement) || '-';
            console.log(`   Date conditionnement formatée: ${dateCondFormatted}`);
            elements.displayBottlingDate.textContent = dateCondFormatted;

            // Informations de l'apiculteur
            console.log('👨‍🌾 Affichage informations apiculteur...');
            const beekeeper = data.beekeeper || {};

            // Type d'apiculteur
            elements.beekeeperType.textContent = beekeeper.type || '-';

            // Extraire le code apiculteur pour identifier Bee Api'C
            const beekeeperCode = extractBeekeeperCode(data.lotNumber);

            // Badge Bee Api'C (si c'est le miel produit par Bee Api'C)
            if (elements.beeapicProducerBadge) {
                if (beekeeperCode === 'BA') {
                    elements.beeapicProducerBadge.classList.remove('hidden');
                } else {
                    elements.beeapicProducerBadge.classList.add('hidden');
                }
            }

            // Badge partenaire (si apiculteur externe)
            console.log('🤝 Gestion badge partenaire...');
            if (elements.partnerBadge) {
                if (beekeeper.partnerSince && beekeeperCode !== 'BA') {
                    //elements.partnerYear.textContent = beekeeper.partnerSince;
                    elements.partnerBadge.classList.remove('hidden');
                } else {
                    elements.partnerBadge.classList.add('hidden');
                }
            }

            // Nom complet
            console.log('📝 Affichage nom...');
            const fullName = [beekeeper.firstName, beekeeper.lastName]
                .filter(Boolean)
                .join(' ') || '-';

            elements.beekeeperName.textContent = fullName;
            elements.commercialName.textContent = beekeeper.commercialName || '-';
            elements.beekeeperAddress.textContent = beekeeper.address || '-';
            elements.beekeeperSiret.textContent = beekeeper.siret || '-';

            // Site web (lien cliquable)
            console.log('🌐 Affichage site web...');
            if (beekeeper.website) {
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
            console.log('📧 Affichage email...');
            if (beekeeper.email) {
                elements.beekeeperEmail.textContent = beekeeper.email;
                elements.beekeeperEmail.href = `mailto:${beekeeper.email}`;
            } else {
                elements.beekeeperEmail.textContent = '-';
                elements.beekeeperEmail.removeAttribute('href');
            }

            // Téléphone (lien cliquable)
            console.log('📱 Affichage téléphone...');
            if (beekeeper.phone) {
                elements.beekeeperPhone.textContent = beekeeper.phone;
                elements.beekeeperPhone.href = `tel:${beekeeper.phone}`;
            } else {
                elements.beekeeperPhone.textContent = '-';
                elements.beekeeperPhone.removeAttribute('href');
            }

            // Photo de l'apiculteur
            console.log('📷 Affichage photo...');
            if (beekeeper.photo) {
                elements.beekeeperPhotoImg.src = "images/" + beekeeper.photo;
                elements.beekeeperPhotoImg.classList.remove('hidden');
                elements.photoPlaceholder.classList.add('hidden');
            } else {
                elements.beekeeperPhotoImg.classList.add('hidden');
                elements.photoPlaceholder.classList.remove('hidden');
            }

            // Logo commercial
            console.log('🏢 Affichage logo...');
            if (beekeeper.logo) {
                elements.beekeeperLogoImg.src = "images/" + beekeeper.logo;
                elements.beekeeperLogoImg.classList.remove('hidden');
                elements.logoPlaceholder.classList.add('hidden');
            } else {
                elements.beekeeperLogoImg.classList.add('hidden');
                elements.logoPlaceholder.classList.remove('hidden');
            }

            // Réseaux sociaux
            console.log('🌐 Affichage réseaux sociaux...');
            displaySocialMedia(beekeeper.socialMedia);

            // Afficher les résultats et cacher la recherche
            console.log('✨ Finalisation affichage...');
            elements.resultsSection.classList.remove('hidden');
            elements.searchSection.classList.add('hidden');

            // Afficher le bouton retour
            if (elements.backButtonContainer) {
                elements.backButtonContainer.classList.remove('hidden');
            }

            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });

            console.log('✅ Affichage terminé avec succès');
        } catch (error) {
            console.error('❌ Erreur dans displayResults:', error);
            console.error('Stack:', error.stack);
            throw error; // Re-lancer l'erreur pour qu'elle soit capturée par handleSearchDev
        }
    }

    /**
     * Affiche le formulaire de recherche et cache les résultats
     */
    function showSearchForm() {
        elements.resultsSection.classList.add('hidden');
        elements.searchSection.classList.remove('hidden');

        // Masquer le bouton retour
        if (elements.backButtonContainer) {
            elements.backButtonContainer.classList.add('hidden');
        }

        // Réafficher la section maison mère
        if (elements.companySection) {
            elements.companySection.classList.remove('hidden');
        }

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
        initializeCompanyInfo,
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

