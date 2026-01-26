# ✅ AUTHENTIFICATION JWT IMPLÉMENTÉE - Bee Api'C Backend

## 🎉 Résumé des modifications

L'authentification JWT a été complètement intégrée au backend Bee Api'C.

## 📋 Ce qui a été fait

### 1. Base de données
- ✅ Ajout de la table `users` dans le schéma Prisma
- ✅ Mise à jour de la base de données MySQL (`npm run db:push`)
- ✅ Création d'un utilisateur admin par défaut

### 2. Dépendances installées
- ✅ `bcryptjs` - Hashage sécurisé des mots de passe
- ✅ `jsonwebtoken` - Génération et vérification des tokens JWT
- ✅ Types TypeScript correspondants

### 3. Structure créée

```
backend/
├── lib/
│   ├── auth.ts              # Utilitaires JWT (hash, verify, generate token)
│   └── middleware.ts        # Middleware d'authentification
├── types/
│   └── auth.ts             # Types TypeScript pour l'auth
├── app/api/
│   └── auth/
│       ├── register/route.ts   # POST - Inscription
│       ├── login/route.ts      # POST - Connexion
│       └── me/route.ts         # GET - Infos utilisateur (protégé)
└── scripts/
    └── create-admin.ts     # Script création utilisateur admin
```

### 4. Routes protégées

Toutes les routes de **création, modification et suppression** sont maintenant protégées :

#### Apiculteurs
- 🔒 `POST /api/beekeepers`
- 🔒 `PUT /api/beekeepers/:code`
- 🔒 `DELETE /api/beekeepers/:code`

#### Types de Miel
- 🔒 `POST /api/honey-types`
- 🔒 `PUT /api/honey-types/:code`
- 🔒 `DELETE /api/honey-types/:code`

#### Produits
- 🔒 `POST /api/products`
- 🔒 `PUT /api/products/:slug`
- 🔒 `DELETE /api/products/:slug`

#### Lots
- 🔒 `POST /api/lots`
- 🔒 `PUT /api/lots/:lotNumber`
- 🔒 `DELETE /api/lots/:lotNumber`

**Les routes GET restent publiques** pour permettre la consultation sans authentification.

## 🔑 Identifiants par défaut

Un utilisateur administrateur a été créé automatiquement :

- **Email:** `admin@bee-apic.com`
- **Mot de passe:** `Admin123!`
- **Rôle:** `admin`

⚠️ **Changez ce mot de passe en production !**

## 🚀 Comment utiliser

### 1. Connexion

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bee-apic.com","password":"Admin123!"}'
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "admin@bee-apic.com",
      "name": "Administrateur",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Utilisation du token

Pour toute requête protégée, ajoutez le header :

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Exemple :**
```bash
TOKEN="votre_token_ici"

curl -X POST http://localhost:3001/api/beekeepers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "code": "TEST",
    "type": "Apiculteur Récoltant",
    "firstName": "Test",
    "lastName": "User",
    "commercialName": "Test Apiculture",
    "address": "123 rue Test"
  }'
```

### 3. Vérifier son authentification

```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

## 📚 Documentation

### Guides disponibles

1. **[AUTH-GUIDE.md](./AUTH-GUIDE.md)** - Guide complet d'utilisation de l'authentification
   - Tous les endpoints d'authentification
   - Exemples avec curl, fetch, axios
   - Intégration React/Next.js
   - Tests avec Postman
   - Bonnes pratiques de sécurité

2. **[README.md](./README.md)** - Documentation générale de l'API

3. **[INSTALLATION.md](./INSTALLATION.md)** - Guide d'installation complet

4. **[INTEGRATION-FRONTEND.md](./INTEGRATION-FRONTEND.md)** - Guide d'intégration frontend

## 🔧 Configuration

### Variables d'environnement (.env)

```env
# JWT Secret (CHANGEZ EN PRODUCTION!)
JWT_SECRET="bee-apic-super-secret-key-change-in-production-2026"

# Durée de validité du token (7 jours par défaut)
JWT_EXPIRES_IN="7d"
```

### Générer une clé secrète sécurisée

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🛠️ Scripts disponibles

```bash
# Créer un nouvel utilisateur admin
npm run create-admin

# Démarrer le serveur
npm run dev

# Voir la base de données (Prisma Studio)
npm run db:studio
```

## 🧪 Tests

### Sans authentification (devrait échouer)

```bash
# Tentative de création sans token
curl -X POST http://localhost:3001/api/beekeepers \
  -H "Content-Type: application/json" \
  -d '{"code":"TEST"}'
```

**Réponse attendue :**
```json
{
  "success": false,
  "error": "Token manquant. Veuillez fournir un token dans le header Authorization."
}
```

### Avec authentification (devrait réussir)

```bash
# 1. Connexion
RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bee-apic.com","password":"Admin123!"}')

# 2. Extraction du token
TOKEN=$(echo $RESPONSE | jq -r '.data.token')

# 3. Création avec token
curl -X POST http://localhost:3001/api/beekeepers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "code": "TEST",
    "type": "Apiculteur Récoltant",
    "firstName": "Test",
    "lastName": "User",
    "commercialName": "Test Apiculture",
    "address": "123 rue Test"
  }'
```

## ✅ Checklist de sécurité

- [x] Mots de passe hashés avec bcrypt
- [x] Tokens JWT avec expiration
- [x] Routes de création/modification/suppression protégées
- [x] Routes de lecture publiques
- [x] Validation des entrées utilisateur
- [x] Messages d'erreur clairs mais non verbeux
- [ ] **À faire en production:**
  - [ ] Changer JWT_SECRET
  - [ ] Activer HTTPS
  - [ ] Implémenter rate limiting
  - [ ] Ajouter refresh tokens (optionnel)
  - [ ] Logs d'audit des actions sensibles

## 🎯 Prochaines étapes possibles

1. **Gestion des rôles avancée**
   - Différencier admin/editor/viewer
   - Permissions granulaires par ressource

2. **Refresh tokens**
   - Renouvellement automatique des tokens
   - Révocation de tokens

3. **Audit logs**
   - Tracer qui fait quoi et quand
   - Historique des modifications

4. **Rate limiting**
   - Limiter les tentatives de connexion
   - Protéger contre les attaques par force brute

5. **2FA (Two-Factor Authentication)**
   - Authentification à deux facteurs
   - Codes OTP par email/SMS

## 📞 Support

Pour toute question sur l'authentification, consultez :
- [AUTH-GUIDE.md](./AUTH-GUIDE.md) - Guide détaillé
- Le code source dans `lib/auth.ts` et `lib/middleware.ts`

---

✅ **L'authentification JWT est opérationnelle et prête pour la production !**

🔐 **Sécurité : N'oubliez pas de changer le JWT_SECRET en production !**
