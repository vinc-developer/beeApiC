/**
 * Module Page Apiculteur
 * Gère l'affichage détaillé de l'apiculteur
 */

(function() {
    'use strict';

    const config = window.APP_CONFIG;
    const api = window.API;

    // Données de l'apiculteur (stockées en localStorage)
    let beekeeperData = null;
    let lotNumber = null;

    // Éléments du DOM
    const elements = {
        // Header
        brandLogo: document.getElementById('brandLogo'),
        logoPlaceholderBrand: document.getElementById('logoPlaceholderBrand'),

        // Boutons
        btnBack: document.getElementById('btnBack'),

        // Profil
        profilePhoto: document.getElementById('profilePhoto'),
        profilePhotoPlaceholder: document.getElementById('profilePhotoPlaceholder'),
        profileLogo: document.getElementById('profileLogo'),
        profileLogoContainer: document.getElementById('profileLogoContainer'),
        profileType: document.getElementById('profileType'),
        profileBeeapicBadge: document.getElementById('profileBeeapicBadge'),
        profilePartnerBadge: document.getElementById('profilePartnerBadge'),
        profilePartnerYear: document.getElementById('profilePartnerYear'),
        profileName: document.getElementById('profileName'),
        profileCommercialName: document.getElementById('profileCommercialName'),

        // Bio
        bioContent: document.getElementById('bioContent'),

        // Exploitation
        hivesCount: document.getElementById('hivesCount'),
        location: document.getElementById('location'),
        distance: document.getElementById('distance'),
        beekeeperSince: document.getElementById('beekeeperSince'),

        // Galerie
        photoGallery: document.getElementById('photoGallery'),

        // Contact
        contactAddress: document.getElementById('contactAddress'),
        contactWebsite: document.getElementById('contactWebsite'),
        contactEmail: document.getElementById('contactEmail'),
        contactPhone: document.getElementById('contactPhone'),
        contactSiret: document.getElementById('contactSiret'),

        // Réseaux sociaux
        socialCard: document.getElementById('socialCard'),
        socialLinksProfile: document.getElementById('socialLinksProfile')
    };

    /**
     * Initialise la page
     */
    function init() {
        console.log('🚀 Initialisation de la page apiculteur');

        // Charger le logo Bee Api'C
        initializeBrandLogo();

        // Récupérer les données depuis localStorage
        loadBeekeeperData();

        // Configurer les événements
        setupEventListeners();

        // Afficher les données
        if (beekeeperData) {
            displayBeekeeperData();
        } else {
            // Rediriger vers la page principale si pas de données
            window.location.href = 'index.html';
        }

        console.log('✓ Page apiculteur initialisée');
    }

    /**
     * Initialise le logo de la marque
     */
    function initializeBrandLogo() {
        const logoImg = new Image();
        logoImg.src = 'images/logo-beeapic.png';

        logoImg.onload = function() {
            elements.brandLogo.src = 'images/logo-beeapic.png';
            elements.brandLogo.classList.remove('hidden');
            elements.logoPlaceholderBrand.classList.add('hidden');
        };

        logoImg.onerror = function() {
            console.log('ℹ Logo Bee Api\'C non trouvé, utilisation du placeholder');
        };
    }

    /**
     * Charge les données de l'apiculteur depuis localStorage
     */
    function loadBeekeeperData() {
        const storedData = localStorage.getItem('currentBeekeeper');
        const storedLot = localStorage.getItem('currentLotNumber');

        if (storedData) {
            beekeeperData = JSON.parse(storedData);
            lotNumber = storedLot;
            console.log('✓ Données apiculteur chargées:', beekeeperData);
        }
    }

    /**
     * Configure les écouteurs d'événements
     */
    function setupEventListeners() {
        // Bouton retour
        elements.btnBack.addEventListener('click', () => {
            // Nettoyer le localStorage
            localStorage.removeItem('currentBeekeeper');
            localStorage.removeItem('currentLotNumber');
            // Retour à la page principale
            window.location.href = 'index.html';
        });
    }

    /**
     * Affiche toutes les données de l'apiculteur
     */
    function displayBeekeeperData() {
        // Profil header
        displayProfile();

        // Bio
        displayBio();

        // Exploitation
        displayExploitation();

        // Galerie
        displayGallery();

        // Contact
        displayContact();

        // Réseaux sociaux
        displaySocialMedia();
    }

    /**
     * Affiche le header de profil
     */
    function displayProfile() {
        // Photo
        if (beekeeperData.photo) {
            elements.profilePhoto.src = "images/" + beekeeperData.photo;
            elements.profilePhoto.classList.remove('hidden');
            elements.profilePhotoPlaceholder.classList.add('hidden');
        }

        // Logo
        if (beekeeperData.logo) {
            elements.profileLogo.src = "images/" + beekeeperData.logo;
            elements.profileLogo.classList.remove('hidden');
        } else {
            elements.profileLogoContainer.style.display = 'none';
        }

        // Type
        elements.profileType.textContent = beekeeperData.type || 'Apiculteur';

        // Extraire le code apiculteur du numéro de lot
        const beekeeperCode = extractBeekeeperCodeFromLot(lotNumber);

        // Badge Bee Api'C (si c'est le miel produit par Bee Api'C)
        if (elements.profileBeeapicBadge) {
            if (beekeeperCode === 'BA') {
                elements.profileBeeapicBadge.classList.remove('hidden');
            } else {
                elements.profileBeeapicBadge.classList.add('hidden');
            }
        }

        // Badge partenaire (si apiculteur externe)
        if (elements.profilePartnerBadge) {
            if (beekeeperData.partnerSince && beekeeperCode !== 'BA') {
                //elements.profilePartnerYear.textContent = beekeeperData.partnerSince;
                elements.profilePartnerBadge.classList.remove('hidden');
            } else {
                elements.profilePartnerBadge.classList.add('hidden');
            }
        }

        // Nom
        const fullName = [beekeeperData.firstName, beekeeperData.lastName]
            .filter(Boolean)
            .join(' ');
        elements.profileName.textContent = fullName || 'Apiculteur';
        elements.profileCommercialName.textContent = beekeeperData.commercialName || '';
    }

    /**
     * Extrait le code apiculteur du numéro de lot
     * @param {string} lotNumber - Numéro de lot (ex: BA-2026-CH-0107)
     * @returns {string|null} - Code apiculteur (ex: BA, CV) ou null
     */
    function extractBeekeeperCodeFromLot(lotNumber) {
        if (!lotNumber) return null;
        const match = lotNumber.match(/^([A-Z]{2,3})-/);
        return match ? match[1] : null;
    }

    /**
     * Affiche la biographie
     */
    function displayBio() {
        if (beekeeperData.bio) {
            elements.bioContent.innerHTML = `<p>${beekeeperData.bio.replace(/\n/g, '</p><p>')}</p>`;
        } else {
            elements.bioContent.innerHTML = '<p>Aucune biographie disponible pour le moment.</p>';
        }
    }

    /**
     * Affiche les informations de l'exploitation
     */
    function displayExploitation() {
        elements.hivesCount.textContent = beekeeperData.hivesCount || '-';
        elements.location.textContent = beekeeperData.location || '-';
        elements.distance.textContent = beekeeperData.distance || '-';
        elements.beekeeperSince.textContent = beekeeperData.beekeeperSince || '-';
    }

    /**
     * Affiche la galerie photos
     */
    function displayGallery() {
        if (beekeeperData.gallery && beekeeperData.gallery.length > 0) {
            elements.photoGallery.innerHTML = '';

            beekeeperData.gallery.forEach((photo, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item';

                const img = document.createElement('img');
                img.src = `images/${photo}`;
                img.alt = `Photo ${index + 1}`;
                img.loading = 'lazy';

                item.appendChild(img);
                elements.photoGallery.appendChild(item);
            });
        }
        // Sinon, le placeholder par défaut reste affiché
    }

    /**
     * Affiche les informations de contact
     */
    function displayContact() {
        // Adresse
        elements.contactAddress.textContent = beekeeperData.address || '-';

        // Site web
        if (beekeeperData.website) {
            let displayUrl = beekeeperData.website;
            try {
                const url = new URL(beekeeperData.website);
                displayUrl = url.hostname.replace('www.', '');
            } catch (e) {}
            elements.contactWebsite.textContent = displayUrl;
            elements.contactWebsite.href = beekeeperData.website;
        } else {
            elements.contactWebsite.textContent = '-';
            elements.contactWebsite.removeAttribute('href');
        }

        // Email
        if (beekeeperData.email) {
            elements.contactEmail.textContent = beekeeperData.email;
            elements.contactEmail.href = `mailto:${beekeeperData.email}`;
        } else {
            elements.contactEmail.textContent = '-';
            elements.contactEmail.removeAttribute('href');
        }

        // Téléphone
        if (beekeeperData.phone) {
            elements.contactPhone.textContent = beekeeperData.phone;
            elements.contactPhone.href = `tel:${beekeeperData.phone}`;
        } else {
            elements.contactPhone.textContent = '-';
            elements.contactPhone.removeAttribute('href');
        }

        // SIRET
        elements.contactSiret.textContent = beekeeperData.siret || '-';
    }

    /**
     * Affiche les réseaux sociaux
     */
    function displaySocialMedia() {
        if (!beekeeperData.socialMedia) {
            return;
        }

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

        let hasAtLeastOne = false;
        elements.socialLinksProfile.innerHTML = '';

        Object.keys(socialConfig).forEach(network => {
            const url = beekeeperData.socialMedia[network];
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

                elements.socialLinksProfile.appendChild(link);
            }
        });

        if (hasAtLeastOne) {
            elements.socialCard.classList.remove('hidden');
        }
    }

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

