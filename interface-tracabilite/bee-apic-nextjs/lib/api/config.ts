/**
 * Configuration de l'API Proxy
 */
export const API_CONFIG = {
  // URL du proxy local
  PROXY_URL: process.env.NEXT_PUBLIC_PROXY_URL || 'http://localhost:3000',

  // Endpoints
  ENDPOINTS: {
    TRACABILITE: '/api/tracabilite/numero-lot',
    NUMEROS_LOTS: '/api/tracabilite/numeros-lots',
  },
};

