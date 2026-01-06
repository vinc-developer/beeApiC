# Interface de Traçabilité du Miel - BeeApiC

Interface web pour consulter la traçabilité des pots de miel via l'API BeePerf.

## 🚀 Prérequis

- Un serveur proxy Node.js configuré (voir ci-dessous)
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)

## 📁 Structure du projet

```
interface-tracabilite/
├── index.html              # Page principale
├── js/
│   ├── config.js          # Configuration de l'application
│   ├── api.js             # Module de communication avec l'API
│   ├── ui.js              # Module de gestion de l'interface
│   └── app.js             # Module principal de l'application
├── styles/
│   ├── variables.css      # Variables CSS
│   ├── main.css           # Styles principaux
│   └── components.css     # Styles des composants
└── README.md              # Ce fichier
```

## 🔧 Configuration

### 1. Serveur Proxy

Le serveur proxy doit être démarré avant d'utiliser l'interface. Voici le code du proxy :

```javascript
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const BEEPERF_API_URL = process.env.BEEPERF_API_URL || 'https://web.beeperf.com/api';
const API_KEY = process.env.BEEPERF_API_KEY;

// Route pour récupérer la traçabilité d'un pot
app.get('/api/tracabilite/numero-lot/:numeroLot', async (req, res) => {
  try {
    const { numeroLot } = req.params;
    const response = await axios.get(
      `${BEEPERF_API_URL}/tracabilite/numero-lot/${numeroLot}`,
      { headers: { 'x-api-key': API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    // Gestion d'erreur...
  }
});

// Route pour récupérer la liste des numéros de lots
app.get('/api/tracabilite/numeros-lots', async (req, res) => {
  try {
    const { per_page = 25, page = 1 } = req.query;
    const response = await axios.get(
      `${BEEPERF_API_URL}/tracabilite/numeros-lots`,
      { 
        headers: { 'x-api-key': API_KEY },
        params: { per_page, page }
      }
    );
    res.json(response.data);
  } catch (error) {
    // Gestion d'erreur...
  }
});

app.listen(PORT, () => {
  console.log(`✓ Serveur démarré sur le port ${PORT}`);
});
```

### 2. Fichier .env pour le proxy

Créez un fichier `.env` à la racine du projet du proxy :

```env
PORT=3000
BEEPERF_API_KEY=votre_clé_api_ici
BEEPERF_API_URL=https://web.beeperf.com/api
```

### 3. Configuration de l'interface

Par défaut, l'interface est configurée pour se connecter à `http://localhost:3000`.

Si votre proxy tourne sur un autre port ou une autre adresse, modifiez le fichier `js/config.js` :

```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:3000/api/tracabilite',
    // ...
};
```

## 🎯 Utilisation

### Démarrage

1. **Démarrer le serveur proxy** :
   ```bash
   cd proxy-beeperf
   npm install
   node server.js
   ```

2. **Ouvrir l'interface** :
   - Ouvrez simplement le fichier `index.html` dans votre navigateur
   - Ou utilisez un serveur web local (recommandé) :
     ```bash
     # Avec Python 3
     python -m http.server 8000
     
     # Avec Node.js (http-server)
     npx http-server -p 8000
     
     # Avec PHP
     php -S localhost:8000
     ```
   - Puis accédez à `http://localhost:8000`

### Recherche de traçabilité

L'interface propose deux modes de recherche :

#### 1. Saisie manuelle
- Cliquez sur "Saisie manuelle"
- Entrez le numéro de lot (ex: LOT2024-001)
- Cliquez sur "Rechercher" ou appuyez sur Entrée

#### 2. Sélection dans la liste
- Cliquez sur "Sélection dans la liste"
- Choisissez un lot dans le menu déroulant
- Cliquez sur "Rechercher"

### Informations affichées

Une fois la recherche effectuée, vous verrez :

- **Informations du produit** :
  - Numéro de lot
  - Zone géographique
  - Environnement des ruches

- **Dates de production** :
  - Date(s) d'extraction du miel
  - Date de mise en pot

- **Informations de l'apiculteur** :
  - Nom et prénom
  - Nom commercial
  - Photo (si disponible)
  - Logo (si disponible)
  - Adresse
  - Email (cliquable)
  - SIRET

## 🛠️ Développement

### Mode développement

Pour tester l'interface sans l'API, vous pouvez utiliser le mode développement avec des données simulées.

Dans le fichier `js/app.js`, décommentez la fonction `handleSearchDev` et modifiez les écouteurs d'événements pour utiliser cette fonction à la place de `handleSearch`.

### Structure des données

L'API BeePerf retourne des données au format suivant :

```json
{
  "lotNumber": "LOT2024-001",
  "zone": {
    "publicName": "Vallée de la Loire",
    "environment": "Description de l'environnement..."
  },
  "production": {
    "extractionDates": ["2024-07-15", "2024-07-22"],
    "bottlingDate": "2024-08-20"
  },
  "beekeeper": {
    "firstName": "Jean",
    "lastName": "Dupont",
    "commercialName": "Les Ruchers du Val",
    "address": "123 Rue...",
    "email": "contact@example.com",
    "siret": "123 456 789 00012",
    "photo": "url/to/photo.jpg",
    "logo": "url/to/logo.png"
  }
}
```

## 🐛 Débogage

### Console du navigateur

L'application log toutes ses actions dans la console du navigateur. Ouvrez la console (F12) pour voir :
- Les requêtes API
- Les erreurs éventuelles
- Les données reçues

### Objet global APP

Un objet `APP` est exposé dans la console pour faciliter le débogage :

```javascript
// Recharger la liste des lots
APP.loadLotsList()

// Forcer une recherche
APP.handleSearch('manual')

// Vérifier la version
APP.version
```

## 🔍 Résolution de problèmes

### "Erreur de connexion au serveur"
- Vérifiez que le serveur proxy est bien démarré
- Vérifiez l'URL dans `js/config.js`
- Vérifiez la console du navigateur pour les erreurs CORS

### "Aucune information trouvée pour ce numéro de lot"
- Le numéro de lot n'existe pas dans la base de données
- Vérifiez l'orthographe du numéro de lot

### La liste déroulante est vide
- Le proxy ne répond pas ou n'a pas accès à l'API
- Vérifiez que la clé API est correctement configurée dans le `.env`

## 📝 Notes

- L'interface est entièrement statique (HTML/CSS/JavaScript vanilla)
- Aucune dépendance externe requise côté client
- Responsive design pour mobile et desktop
- Supporte les navigateurs modernes (ES6+)

## 🔒 Sécurité

⚠️ **Important** : Ne jamais exposer votre clé API BeePerf dans le code client !

C'est pourquoi nous utilisons un proxy serveur qui :
- Stocke la clé API de manière sécurisée
- Fait les requêtes à l'API BeePerf
- Expose une API publique sans authentification

## 📄 Licence

© 2026 BeeApiC - Traçabilité du Miel

## 📞 Support

Pour toute question ou problème, contactez l'équipe BeeApiC.

