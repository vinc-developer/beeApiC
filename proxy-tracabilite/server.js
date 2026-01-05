require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS pour permettre l'accès depuis n'importe quelle origine
app.use(cors());
app.use(express.json());

// URL de base de l'API BeePerf
const BEEPERF_API_URL = process.env.BEEPERF_API_URL || 'https://web.beeperf.com/api';
const API_KEY = process.env.BEEPERF_API_KEY;

// Middleware pour vérifier que la clé API est configurée
const checkApiKeyConfigured = (req, res, next) => {
  if (!API_KEY || API_KEY === 'votre_clé_api_ici') {
    return res.status(500).json({
      error: 'Configuration incorrecte',
      message: 'La clé API BeePerf n\'est pas configurée sur le serveur'
    });
  }
  next();
};

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'API Traçabilité BeePerf - Proxy',
    version: '1.0.0',
    endpoints: {
      tracabilite: '/api/tracabilite/numero-lot/:numeroLot',
      numerosLots: '/api/tracabilite/numeros-lots'
    }
  });
});

// Route pour récupérer la traçabilité d'un pot par son numéro de lot
app.get('/api/tracabilite/numero-lot/:numeroLot', checkApiKeyConfigured, async (req, res) => {
  try {
    const { numeroLot } = req.params;

    const response = await axios.get(
      `${BEEPERF_API_URL}/tracabilite/numero-lot/${numeroLot}`,
      {
        headers: {
          'x-api-key': API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération de la traçabilité:', error.message);

    if (error.response) {
      // L'API a répondu avec un code d'erreur
      res.status(error.response.status).json({
        error: 'Erreur API BeePerf',
        message: error.response.data?.message || 'Erreur lors de la récupération des données',
        details: error.response.data
      });
    } else if (error.request) {
      // La requête a été faite mais pas de réponse
      res.status(503).json({
        error: 'Service indisponible',
        message: 'Impossible de contacter l\'API BeePerf'
      });
    } else {
      // Erreur lors de la configuration de la requête
      res.status(500).json({
        error: 'Erreur serveur',
        message: 'Une erreur est survenue lors du traitement de la requête'
      });
    }
  }
});

// Route pour récupérer l'ensemble des numéros de lots avec pagination
app.get('/api/tracabilite/numeros-lots', checkApiKeyConfigured, async (req, res) => {
  try {
    const { per_page = 25, page = 1 } = req.query;

    const response = await axios.get(
      `${BEEPERF_API_URL}/tracabilite/numeros-lots`,
      {
        headers: {
          'x-api-key': API_KEY
        },
        params: {
          per_page,
          page
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des numéros de lots:', error.message);

    if (error.response) {
      res.status(error.response.status).json({
        error: 'Erreur API BeePerf',
        message: error.response.data?.message || 'Erreur lors de la récupération des données',
        details: error.response.data
      });
    } else if (error.request) {
      res.status(503).json({
        error: 'Service indisponible',
        message: 'Impossible de contacter l\'API BeePerf'
      });
    } else {
      res.status(500).json({
        error: 'Erreur serveur',
        message: 'Une erreur est survenue lors du traitement de la requête'
      });
    }
  }
});

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    message: 'Cette route n\'existe pas'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✓ Serveur démarré sur le port ${PORT}`);
  console.log(`✓ API accessible sur http://localhost:${PORT}`);
  console.log(`✓ Documentation : http://localhost:${PORT}`);

  if (!API_KEY || API_KEY === 'votre_clé_api_ici') {
    console.warn('⚠ ATTENTION : La clé API BeePerf n\'est pas configurée !');
    console.warn('⚠ Veuillez configurer BEEPERF_API_KEY dans le fichier .env');
  }
});

