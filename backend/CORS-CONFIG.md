# Configuration CORS - Bee Api'C

## ✅ Problème résolu

Le problème CORS "CORS Missing Allow Header" a été résolu en configurant correctement les en-têtes CORS entre le frontend (port 3000) et le backend (port 3001).

## 🔧 Modifications apportées

### 1. Configuration Next.js (`backend/next.config.mjs`)
- ✅ Ajout du header `Authorization` aux headers autorisés
- ✅ Configuration de l'origine spécifique `http://localhost:3000`
- ✅ Activation des credentials pour les cookies/tokens

### 2. Routes API - Handler OPTIONS
Ajout d'un handler `OPTIONS` pour gérer les requêtes preflight CORS sur toutes les routes :

- ✅ `/api/auth/login` - Route d'authentification
- ✅ `/api/beekeepers` - Gestion des apiculteurs
- ✅ `/api/honey-types` - Types de miel
- ✅ `/api/products` - Produits

Chaque handler OPTIONS retourne :
```typescript
{
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}
```

## 🚀 Test de la configuration

1. **Démarrer le backend** :
   ```bash
   cd backend
   npm run dev
   ```
   Le backend démarre sur http://localhost:3001

2. **Démarrer le frontend** :
   ```bash
   cd site
   npm run dev
   ```
   Le frontend démarre sur http://localhost:3000

3. **Tester la connexion** :
   - Aller sur http://localhost:3000/admin/login
   - Entrer vos identifiants
   - La requête devrait maintenant fonctionner sans erreur CORS

## 🔍 Vérification

Dans les outils de développement du navigateur (F12) :
- Onglet **Network** : Vous devriez voir une requête `OPTIONS` (preflight) suivie de la requête `POST`
- Les deux requêtes doivent avoir un statut **200 OK**
- Les headers de réponse doivent inclure :
  - `Access-Control-Allow-Origin: http://localhost:3000`
  - `Access-Control-Allow-Headers: Content-Type, Authorization`
  - `Access-Control-Allow-Credentials: true`

## 📝 Notes importantes

### En développement
- L'origine est fixée à `http://localhost:3000`
- Les credentials sont autorisés

### En production
Vous devrez modifier :
1. **`next.config.mjs`** : Remplacer `http://localhost:3000` par votre domaine de production
2. **Routes API** : Mettre à jour l'origine dans chaque handler OPTIONS

Exemple pour la production :
```javascript
'Access-Control-Allow-Origin': 'https://votre-domaine.fr'
```

## 🛡️ Sécurité

- ✅ L'origine est restreinte à `localhost:3000` (pas de wildcard `*`)
- ✅ Les headers autorisés sont limités aux nécessaires
- ✅ Les méthodes HTTP sont explicitement définies
- ✅ Les credentials sont gérés de manière sécurisée

## 🐛 En cas de problème

Si le problème CORS persiste :

1. **Vider le cache du navigateur** (Ctrl+Shift+Delete)
2. **Redémarrer les deux serveurs** (backend et frontend)
3. **Vérifier les ports** :
   - Backend : http://localhost:3001
   - Frontend : http://localhost:3000
4. **Vérifier la console** pour d'autres erreurs

## 📚 Ressources

- [MDN - CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)
- [Next.js - API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Next.js - Headers](https://nextjs.org/docs/api-reference/next.config.js/headers)
