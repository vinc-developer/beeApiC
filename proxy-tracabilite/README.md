# API Traçabilité BeePerf - Proxy

API proxy Node.js/Express qui permet d'accéder aux données de traçabilité BeePerf sans exposer votre clé API.

## 🚀 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer la clé API**

Copiez le fichier `.env.example` en `.env` et ajoutez votre clé API BeePerf :

```bash
copy .env.example .env
```

Puis modifiez le fichier `.env` :
```
BEEPERF_API_KEY=votre_vraie_clé_api_ici
PORT=3000
BEEPERF_API_URL=https://web.beeperf.com/api
```

3. **Démarrer le serveur**

Mode production :
```bash
npm start
```

Mode développement (avec redémarrage automatique) :
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📡 Endpoints disponibles

### 1. Récupérer la traçabilité d'un pot

**Endpoint :** `GET /api/tracabilite/numero-lot/:numeroLot`

**Exemple :**
```bash
curl http://localhost:3000/api/tracabilite/numero-lot/ACA-20250112
```

**Réponse :**
```json
{
  "dateConditionnement": "2024-07-04",
  "datesExtractions": ["2024-07-02", "2024-07-03"],
  "nbRuchesRecoltees": 12,
  "ruchers": [
    {
      "nom": "Rucher 1",
      "environnement": "Marais",
      "nomPublicZone": "Marais poitevin"
    }
  ]
}
```

### 2. Récupérer la liste des numéros de lots

**Endpoint :** `GET /api/tracabilite/numeros-lots`

**Paramètres de requête :**
- `per_page` (optionnel) : Nombre de résultats par page (défaut: 25)
- `page` (optionnel) : Numéro de la page (défaut: 1)

**Exemple :**
```bash
curl "http://localhost:3000/api/tracabilite/numeros-lots?per_page=10&page=1"
```

**Réponse :**
```json
{
  "current_page": 1,
  "per_page": 10,
  "last_page": 4,
  "total": 40,
  "data": [
    "ACA-20250112",
    "TRE-20250215",
    "FOR-20240511"
  ]
}
```

### 3. Documentation

**Endpoint :** `GET /`

Affiche les informations sur l'API et la liste des endpoints disponibles.

## 🌐 Déploiement

### Option 1 : Heroku

1. Créez un compte sur [Heroku](https://www.heroku.com/)
2. Installez Heroku CLI
3. Déployez l'application :

```bash
heroku create votre-app-name
heroku config:set BEEPERF_API_KEY=votre_clé_api
git push heroku main
```

### Option 2 : Render -> privilégié

1. Créez un compte sur [Render](https://render.com/)
2. "New" → "Web Service"
3. Connectez votre repository GitHub
4. Configurez :
   - Environment : Node
   - Build Command : npm install
   - Start Command : npm start
   - Variables d'environnement : Ajoutez BEEPERF_API_KEY
5. Déployez automatiquement

### Option 3 : Railway

1. Créez un compte sur [Railway](https://railway.app/)
2. Importez votre projet depuis GitHub
3. Configurez les variables d'environnement
4. Déployez en un clic

### Option 4 : VPS (DigitalOcean, AWS, etc.)

1. Connectez-vous à votre serveur
2. Installez Node.js et npm
3. Clonez le repository
4. Configurez le fichier `.env`
5. Utilisez PM2 pour gérer le processus :

```bash
npm install -g pm2
pm2 start server.js --name api-tracabilite
pm2 startup
pm2 save
```

## 🔒 Sécurité

- ⚠️ **Ne commitez JAMAIS le fichier `.env`** - il contient votre clé API secrète
- Le fichier `.gitignore` est configuré pour ignorer `.env` par défaut
- L'API proxy est ouverte à tous, mais la clé API reste cachée côté serveur
- CORS est activé pour permettre les requêtes depuis n'importe quel domaine

## 🛠️ Maintenance

### Mise à jour des dépendances

```bash
npm update
```

### Vérification des vulnérabilités

```bash
npm audit
npm audit fix
```

## 📝 Structure du projet

```
api-tracabilite/
├── server.js          # Point d'entrée principal
├── package.json       # Dépendances et scripts
├── .env              # Configuration (ne pas commiter)
├── .env.example      # Template de configuration
├── .gitignore        # Fichiers à ignorer
└── README.md         # Documentation
```

## 🐛 Dépannage

### Le serveur ne démarre pas
- Vérifiez que Node.js est installé : `node --version`
- Vérifiez que les dépendances sont installées : `npm install`

### Erreur "La clé API n'est pas configurée"
- Vérifiez que le fichier `.env` existe
- Vérifiez que `BEEPERF_API_KEY` est bien définie dans `.env`
- Redémarrez le serveur après modification du `.env`

### Erreur 401 (Non autorisé)
- Votre clé API BeePerf est invalide ou expirée
- Vérifiez votre abonnement premium BeePerf

## 📞 Support

Pour toute question concernant l'API BeePerf, consultez la documentation officielle ou contactez le support BeePerf.

## 📄 Licence

ISC

