# 👨‍💻 Guide Développeur - Bee Api'C Traçabilité

Documentation technique complète pour les développeurs.

---

## 📋 Table des matières

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Structure des fichiers](#structure-des-fichiers)
4. [API et données](#api-et-données)
5. [Composants](#composants)
6. [Configuration](#configuration)
7. [Tests](#tests)
8. [Déploiement](#déploiement)

---

## Architecture

### Vue d'ensemble

```
┌──────────────┐
│   Client     │ (Navigateur)
│  index.html  │
└──────┬───────┘
       │
       ├─► JavaScript Modules
       │   ├─ app.js (orchestration)
       │   ├─ ui.js (interface)
       │   ├─ api.js (données)
       │   └─ config.js (configuration)
       │
       ├─► CSS Modules
       │   ├─ variables.css (tokens)
       │   ├─ main.css (base)
       │   └─ components.css (composants)
       │
       └─► Data Files (JSON)
           ├─ beekeepers.json
           └─ honey-types.json
```

### Architecture modulaire

Le projet suit une architecture **modulaire** avec séparation des responsabilités :

- **app.js** : Point d'entrée, orchestration
- **ui.js** : Manipulation du DOM et affichage
- **api.js** : Communication avec l'API / données mock
- **config.js** : Configuration centralisée

---

## Installation

### Prérequis

```bash
# Node.js (optionnel, pour le proxy API)
node >= 14.x
npm >= 6.x

# Serveur web local (au choix)
# - Live Server (VS Code)
# - Python : python -m http.server
# - PHP : php -S localhost:8000
```

### Installation de base

```bash
# 1. Cloner le projet
git clone [URL]
cd interface-tracabilite

# 2. Ouvrir directement dans le navigateur
open index.html

# Ou utiliser un serveur local
python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

### Installation avec proxy API (optionnel)

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer .env
cp .env.example .env
# Éditer .env avec votre clé API BeePerf

# 3. Démarrer le proxy
npm start

# 4. L'application est accessible sur http://localhost:3000
```

---

## Structure des fichiers

### Arborescence complète

```
interface-tracabilite/
│
├── index.html                 # Page principale
├── beekeeper.html            # Page détail apiculteur
├── comparaison-badges.html   # Démo badges
├── test-v3.6.html           # Tests unitaires
│
├── js/                       # JavaScript
│   ├── app.js               # Application principale
│   ├── ui.js                # Interface utilisateur
│   ├── api.js               # API et données
│   ├── config.js            # Configuration
│   └── beekeeper-page.js    # Page apiculteur
│
├── styles/                   # CSS
│   ├── variables.css        # Variables CSS (tokens)
│   ├── main.css             # Styles de base
│   ├── components.css       # Composants réutilisables
│   └── beekeeper-page.css   # Styles page apiculteur
│
├── data/                     # Données JSON
│   ├── beekeepers.json      # Base apiculteurs
│   └── honey-types.json     # Types de miel
│
├── images/                   # Assets
│   ├── logo-beeapic.png
│   ├── colas-vincent.jpg
│   └── matthieu-colas/
│       ├── logo.jpg
│       └── photos...
│
├── docs/                     # Documentation
│   ├── README.md
│   ├── CHANGELOG.md
│   ├── GUIDE-UTILISATEUR.md
│   └── GUIDE-DEVELOPPEUR.md
│
└── package.json              # Config Node.js (proxy)
```

---

## API et données

### Modes de fonctionnement

#### Mode 1 : Données mock (développement)

```javascript
// api.js - Fonction getMockData()
async function getMockData(lotNumber) {
    // Simuler un délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retourner des données simulées
    return {
        lotNumber: lotNumber,
        zone: { ... },
        production: { ... },
        beekeeper: { ... }
    };
}
```

#### Mode 2 : API BeePerf (production)

```javascript
// api.js - Fonction getTraceability()
async function getTraceability(lotNumber) {
    const url = `${API_BASE_URL}/tracabilite/numero-lot/${lotNumber}`;
    const response = await fetch(url, {
        headers: { 'x-api-key': API_KEY }
    });
    return await response.json();
}
```

### Structure des données

#### Objet Traçabilité

```javascript
{
    "lotNumber": "BA-2026-CH-0107",
    "zone": {
        "publicName": "France - Saint Léger les Vignes",
        "environment": "Description de l'environnement..."
    },
    "production": {
        "extractionDates": ["2024-07-15", "2024-07-22"],
        "bottlingDate": "2024-08-20"
    },
    "beekeeper": {
        "type": "Apiculteur Récoltant",
        "firstName": "Vincent",
        "lastName": "Colas",
        "commercialName": "Bee Api'C",
        "address": "Adresse complète...",
        "email": "email@example.com",
        "phone": "+33 X XX XX XX XX",
        "website": "https://example.com",
        "siret": "XXX XXX XXX XXXXX",
        "photo": "path/photo.jpg",
        "logo": "path/logo.jpg",
        "partnerSince": "2025",  // Ou "" si production Bee Api'C
        "bio": "Biographie...",
        "hivesCount": "20 ruches",
        "location": "Ville, Département, France",
        "distance": "45 km de Nantes",
        "beekeeperSince": "2023",
        "gallery": ["photo1.jpg", "photo2.jpg"],
        "socialMedia": {
            "instagram": "https://...",
            "facebook": "https://...",
            "tiktok": "https://...",
            "youtube": "https://...",
            "linkedin": "https://..."
        }
    }
}
```

#### Fichier beekeepers.json

```json
{
    "beekeepers": {
        "BA": {
            "type": "Apiculteur Récoltant",
            "firstName": "Vincent",
            "lastName": "Colas",
            "commercialName": "Bee Api'C",
            ...
        },
        "MC": {
            "type": "Apiculteur Récoltant",
            "partnerSince": "2025",
            ...
        }
    }
}
```

#### Fichier honey-types.json

```json
{
    "honeyTypes": {
        "CH": {
            "name": "Miel de Châtaignier",
            "description": "Miel corsé au goût prononcé"
        },
        "PA": {
            "name": "Miel d'Acacia",
            "description": "Miel doux et clair"
        }
    }
}
```

---

## Composants

### Module UI (ui.js)

#### Fonctions principales

```javascript
// Afficher les résultats de traçabilité
async function displayResults(data)

// Afficher le formulaire de recherche
function showSearchForm()

// Afficher/masquer des éléments
function showLoading()
function hideLoading()
function showError(message)
function hideError()

// Extraire des informations du numéro de lot
function extractBeekeeperCode(lotNumber)
function extractHoneyType(lotNumber)

// Charger les types de miel
async function loadHoneyTypeInfo(honeyTypeCode)
```

#### Gestion des badges

```javascript
// Badge Bee Api'C
const beekeeperCode = extractBeekeeperCode(lotNumber);
if (beekeeperCode === 'BA') {
    elements.beeapicProducerBadge.classList.remove('hidden');
}

// Badge Partenaire
if (beekeeper.partnerSince && beekeeperCode !== 'BA') {
    elements.partnerBadge.classList.remove('hidden');
}

// Badge Type de miel
const honeyTypeCode = extractHoneyType(lotNumber);
const honeyTypeInfo = await loadHoneyTypeInfo(honeyTypeCode);
if (honeyTypeInfo) {
    elements.honeyTypeBadge.textContent = honeyTypeInfo.name;
    elements.honeyTypeDescription.textContent = honeyTypeInfo.description;
}
```

### Module API (api.js)

#### Fonctions principales

```javascript
// Récupérer la traçabilité
async function getTraceability(lotNumber)

// Récupérer la liste des lots
async function getLotsList(perPage, page)

// Données mock pour développement
async function getMockData(lotNumber)

// Extraire le code apiculteur
function extractBeekeeperCode(lotNumber)

// Charger les données apiculteur
async function loadBeekeeperData(beekeeperCode)
```

---

## Configuration

### Variables CSS (variables.css)

```css
:root {
    /* Couleurs */
    --color-primary: #FFB300;
    --color-secondary: #4A4A4A;
    --color-white: #FFFFFF;
    
    /* Espacements */
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    
    /* Typographie */
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-weight-normal: 400;
    --font-weight-semibold: 600;
    
    /* Bordures */
    --border-radius-lg: 12px;
    --border-radius-full: 9999px;
}
```

### Configuration JavaScript (config.js)

```javascript
const APP_CONFIG = {
    API_BASE_URL: 'http://localhost:3000/api',
    REQUEST_TIMEOUT: 10000,
    
    ENDPOINTS: {
        GET_TRACEABILITY: '/tracabilite/numero-lot',
        LIST_LOTS: '/tracabilite/numeros-lots'
    },
    
    DATE_FORMAT: {
        locale: 'fr-FR',
        options: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    },
    
    MESSAGES: {
        ERROR_NOT_FOUND: 'Lot non trouvé',
        ERROR_NETWORK: 'Erreur réseau',
        ERROR_GENERIC: 'Une erreur est survenue'
    }
};
```

---

## Tests

### Tests unitaires (test-v3.6.html)

```html
<!-- Tests d'extraction -->
<button onclick="runTest1()">Test extraction code apiculteur</button>
<button onclick="runTest2()">Test extraction type de miel</button>
<button onclick="runTest3()">Test chargement types</button>
```

```javascript
// Exemple de test
function runTest1() {
    const tests = [
        { input: 'BA-2026-CH-0107', expected: 'BA' },
        { input: 'MC-2026-PA-2505', expected: 'MC' }
    ];
    
    tests.forEach(test => {
        const result = extractBeekeeperCode(test.input);
        console.assert(result === test.expected);
    });
}
```

### Tests manuels recommandés

```javascript
// 1. Production Bee Api'C
const lotBA = 'BA-2026-CH-0107';
// ✅ Badge jaune "Miel Bee Api'C"
// ✅ Type "Miel de Châtaignier"
// ✅ Section company masquée

// 2. Partenaire externe
const lotMC = 'MC-2026-PA-2505';
// ✅ Badge doré "Partenaire depuis 2025"
// ✅ Type "Miel d'Acacia"

// 3. Navigation complète
// Recherche → Résultats → Page apiculteur → Retour
```

---

## Déploiement

### Préparation

```bash
# 1. Vérifier les tests
# Ouvrir test-v3.6.html et exécuter tous les tests

# 2. Optimiser les assets
# - Compresser les images
# - Minifier CSS/JS (optionnel)

# 3. Configurer l'API
# - Mettre à jour API_BASE_URL dans config.js
# - Configurer les CORS sur le serveur
```

### Déploiement statique

```bash
# Hébergement sur serveur web simple
# Copier tous les fichiers sur le serveur
rsync -av ./ user@server:/var/www/tracabilite/

# Ou utiliser FTP
# Transférer tous les fichiers
```

### Déploiement avec proxy

```bash
# 1. Déployer sur serveur Node.js
npm run build  # Si build script défini
npm start

# 2. Utiliser PM2 pour la production
npm install -g pm2
pm2 start server.js --name "tracabilite-api"
pm2 save
pm2 startup
```

### Configuration Nginx (exemple)

```nginx
server {
    listen 80;
    server_name tracabilite.beeapic.com;
    
    root /var/www/tracabilite;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Bonnes pratiques

### Développement

1. **Utiliser des constantes** pour les valeurs magiques
2. **Commenter** les fonctions complexes
3. **Gérer les erreurs** avec try/catch
4. **Tester** chaque nouvelle fonctionnalité
5. **Documenter** les changements dans CHANGELOG.md

### Performance

1. **Optimiser les images** (WebP, compression)
2. **Lazy loading** pour les images de galerie
3. **Mise en cache** des données apiculteurs
4. **Minification** CSS/JS en production

### Sécurité

1. **Valider les inputs** utilisateur
2. **Échapper le HTML** dans les contenus dynamiques
3. **Utiliser HTTPS** en production
4. **Protéger la clé API** (côté serveur uniquement)
5. **CORS** configuré correctement

---

## Extensions possibles

### Futures fonctionnalités

```javascript
// 1. Recherche avancée
function searchByBeekeeper(beekeeperCode) { ... }
function searchByHoneyType(honeyTypeCode) { ... }
function searchByDate(startDate, endDate) { ... }

// 2. Export PDF
async function exportToPDF(lotNumber) { ... }

// 3. Partage social
function shareOnSocial(platform, lotNumber) { ... }

// 4. Notifications
function subscribeToNewLots(email) { ... }

// 5. Statistiques
function getViewStats(lotNumber) { ... }
```

---

## Debugging

### Console logs activés

```javascript
// Dans app.js
console.log('🚀 Initialisation...');
console.log('🔍 Recherche du lot:', lotNumber);
console.log('✓ Données reçues:', data);
console.log('❌ Erreur:', error);
```

### Vérifications fréquentes

```javascript
// Vérifier qu'un élément existe
if (!elements.companySection) {
    console.error('Element companySection not found!');
}

// Vérifier les données reçues
if (!data || !data.beekeeper) {
    console.error('Invalid data structure:', data);
}
```

---

## Support et contribution

### Rapporter un bug

1. Vérifier que le bug n'est pas déjà rapporté
2. Créer une issue avec :
   - Description détaillée
   - Steps pour reproduire
   - Comportement attendu vs actuel
   - Screenshots si pertinent

### Proposer une amélioration

1. Ouvrir une discussion sur la fonctionnalité
2. Décrire le cas d'usage
3. Proposer une implémentation
4. Soumettre une PR avec tests

---

## Ressources

### Documentation externe

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Font Awesome](https://fontawesome.com/)

### Outils recommandés

- **VS Code** - Éditeur de code
- **Live Server** - Serveur de développement
- **Chrome DevTools** - Debugging
- **Postman** - Test API

---

**Don't Panic, Bee Api'C ! 🐝✨**

*Guide développeur - Version 3.6.4 - 7 janvier 2026*

