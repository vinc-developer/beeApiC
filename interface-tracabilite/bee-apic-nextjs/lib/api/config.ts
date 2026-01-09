/**
 * Configuration de l'API Proxy
 */
export const API_CONFIG = {
  // URL du proxy local (serveur Node.js séparé)
  // En développement: le proxy tourne sur le port 3001 (ou celui défini dans server.js)
  // Next.js tourne sur le port 3000
  PROXY_URL: process.env.NEXT_PUBLIC_PROXY_URL || 'http://localhost:3000',

  // Endpoints
  ENDPOINTS: {
    TRACABILITE: '/api/tracabilite/numero-lot',
    NUMEROS_LOTS: '/api/tracabilite/numeros-lots',
  },
};

