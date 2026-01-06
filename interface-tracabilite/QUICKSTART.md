# 🚀 Guide de Démarrage Rapide

## Configuration initiale (à faire une seule fois)

### 1. Configuration du proxy

Créez un fichier `.env` dans le dossier du proxy avec :

```env
PORT=3000
BEEPERF_API_KEY=votre_clé_api_beeperf
BEEPERF_API_URL=https://web.beeperf.com/api
```

### 2. Installation des dépendances du proxy

```bash
cd chemin/vers/proxy
npm install
```

## Démarrage quotidien

### Étape 1 : Démarrer le proxy

```bash
cd chemin/vers/proxy
node server.js
```

✅ Vous devriez voir :
```
✓ Serveur démarré sur le port 3000
✓ API accessible sur http://localhost:3000
```

### Étape 2 : Ouvrir l'interface

**Option A - Simple (sans serveur local)** :
- Double-cliquez sur `test.html` pour tester
- Double-cliquez sur `index.html` pour l'interface complète

**Option B - Avec serveur local (recommandé)** :

```bash
# Avec Python
cd chemin/vers/interface-tracabilite
python -m http.server 8000

# Avec Node.js
npx http-server -p 8000

# Avec PHP
php -S localhost:8000
```

Puis ouvrez :
- Test : http://localhost:8000/test.html
- Interface : http://localhost:8000/index.html

## ✅ Checklist de vérification

Avant d'utiliser l'interface, vérifiez que :

- [ ] Le serveur proxy est démarré (port 3000)
- [ ] La clé API BeePerf est configurée dans `.env`
- [ ] `test.html` affiche "Connexion réussie" au test du proxy
- [ ] La liste des lots se charge dans `test.html`

## 🔧 Problèmes courants

### "Erreur de connexion au serveur"

**Cause** : Le proxy n'est pas démarré

**Solution** :
```bash
cd chemin/vers/proxy
node server.js
```

### "Configuration incorrecte - La clé API n'est pas configurée"

**Cause** : Le fichier `.env` n'existe pas ou la clé API est manquante

**Solution** : Créez/modifiez le fichier `.env` avec votre clé API BeePerf

### La liste déroulante est vide

**Cause** : Pas de lots dans la base de données ou clé API invalide

**Solution** : Vérifiez que votre clé API a accès aux données

### Erreur CORS

**Cause** : Le proxy n'autorise pas les requêtes depuis votre origine

**Solution** : Le proxy utilise déjà `cors()`, cela ne devrait pas arriver

## 📱 Utilisation de l'interface

### Recherche manuelle
1. Cliquez sur "Saisie manuelle"
2. Entrez le numéro de lot (ex: LOT2024-001)
3. Cliquez sur "Rechercher" ou appuyez sur Entrée

### Recherche par liste
1. Cliquez sur "Sélection dans la liste"
2. Choisissez un lot dans le menu déroulant
3. Cliquez sur "Rechercher"

### Affichage des résultats
- Les informations du produit (lot, zone, environnement)
- Les dates de production (extraction, mise en pot)
- Les informations de l'apiculteur (nom, adresse, contact, etc.)
- Photo et logo (si disponibles)

### Nouvelle recherche
- Cliquez sur "Nouvelle recherche" en bas de page
- Vous retournez au formulaire de recherche

## 🐛 Debug

### Console du navigateur
Ouvrez la console (F12) pour voir :
- Les logs de l'application
- Les requêtes API
- Les erreurs éventuelles

### Tests manuels
```javascript
// Dans la console du navigateur
APP.loadLotsList()  // Recharger la liste des lots
APP.version         // Afficher la version
```

## 📚 Documentation complète

Pour plus d'informations, consultez :
- `README.md` - Documentation complète
- `IMPLEMENTATION.md` - Détails de l'implémentation

## 🎉 C'est tout !

L'interface est maintenant prête à l'emploi.

**Bon usage ! 🍯🐝**

