/**
 * Configuration de l'application
 * Définit les paramètres de connexion au proxy de traçabilité
 */

const CONFIG = {
    // URL du proxy de traçabilité
    // Modifier cette URL selon votre configuration
    API_BASE_URL: 'http://localhost:3999/api/tracabilite',

    // Endpoints
    ENDPOINTS: {
        GET_TRACEABILITY: '/numero-lot', // GET /numero-lot/{numeroLot}
        LIST_LOTS: '/numeros-lots'       // GET /numeros-lots
    },

    // Configuration des requêtes
    REQUEST_TIMEOUT: 10000, // 10 secondes

    // Messages
    MESSAGES: {
        LOADING: 'Chargement des informations...',
        ERROR_NETWORK: 'Erreur de connexion au serveur. Veuillez réessayer.',
        ERROR_NOT_FOUND: 'Aucune information trouvée pour ce numéro de lot.',
        ERROR_INVALID_LOT: 'Veuillez saisir un numéro de lot valide.',
        ERROR_NO_LOT_SELECTED: 'Veuillez sélectionner un numéro de lot.',
        ERROR_GENERIC: 'Une erreur est survenue. Veuillez réessayer.',
        SUCCESS: 'Informations chargées avec succès.'
    },

    // Format des dates
    DATE_FORMAT: {
        locale: 'fr-FR',
        options: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    }
};

// Rendre CONFIG accessible globalement
window.APP_CONFIG = CONFIG;

