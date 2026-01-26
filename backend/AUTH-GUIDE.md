# 🔐 Guide d'Authentification JWT - Bee Api'C Backend

## Vue d'ensemble

Toutes les routes de **création (POST)**, **modification (PUT)** et **suppression (DELETE)** sont protégées par authentification JWT.

Les routes de **lecture (GET)** restent publiques et accessibles sans authentification.

## 🔑 Endpoints d'authentification

### 1. Inscription d'un utilisateur

**Endpoint:** `POST /api/auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123",
  "name": "Jean Dupont",
  "role": "admin"
}
```

**Réponse:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx...",
      "email": "user@example.com",
      "name": "Jean Dupont",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Utilisateur créé avec succès"
}
```

### 2. Connexion

**Endpoint:** `POST /api/auth/login`

**Body:**
```json
{
  "email": "admin@bee-apic.com",
  "password": "Admin123!"
}
```

**Réponse:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx...",
      "email": "admin@bee-apic.com",
      "name": "Administrateur",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Connexion réussie"
}
```

### 3. Récupérer les infos de l'utilisateur connecté

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Réponse:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "email": "admin@bee-apic.com",
    "name": "Administrateur",
    "role": "admin",
    "createdAt": "2026-01-26T20:00:00.000Z",
    "updatedAt": "2026-01-26T20:00:00.000Z"
  }
}
```

## 🔒 Utilisation du token JWT

### Format du header

Pour toutes les requêtes protégées, vous devez inclure le token dans le header `Authorization` :

```
Authorization: Bearer VOTRE_TOKEN_JWT
```

### Exemple avec curl

```bash
# Connexion
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bee-apic.com","password":"Admin123!"}'

# Récupération du token (dans la réponse ci-dessus)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Création d'un apiculteur (protégé)
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

### Exemple avec JavaScript/Fetch

```javascript
// 1. Connexion
const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@bee-apic.com',
    password: 'Admin123!',
  }),
});

const { data } = await loginResponse.json();
const token = data.token;

// 2. Utilisation du token pour une requête protégée
const createResponse = await fetch('http://localhost:3001/api/beekeepers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    code: 'TEST',
    type: 'Apiculteur Récoltant',
    firstName: 'Test',
    lastName: 'User',
    commercialName: 'Test Apiculture',
    address: '123 rue Test',
  }),
});
```

## 📋 Routes protégées

### Apiculteurs
- ✅ `GET /api/beekeepers` - **Public**
- ✅ `GET /api/beekeepers/:code` - **Public**
- 🔒 `POST /api/beekeepers` - **PROTÉGÉ**
- 🔒 `PUT /api/beekeepers/:code` - **PROTÉGÉ**
- 🔒 `DELETE /api/beekeepers/:code` - **PROTÉGÉ**

### Types de Miel
- ✅ `GET /api/honey-types` - **Public**
- ✅ `GET /api/honey-types/:code` - **Public**
- 🔒 `POST /api/honey-types` - **PROTÉGÉ**
- 🔒 `PUT /api/honey-types/:code` - **PROTÉGÉ**
- 🔒 `DELETE /api/honey-types/:code` - **PROTÉGÉ**

### Produits
- ✅ `GET /api/products` - **Public**
- ✅ `GET /api/products/:slug` - **Public**
- ✅ `GET /api/products/category/:category` - **Public**
- 🔒 `POST /api/products` - **PROTÉGÉ**
- 🔒 `PUT /api/products/:slug` - **PROTÉGÉ**
- 🔒 `DELETE /api/products/:slug` - **PROTÉGÉ**

### Lots
- ✅ `GET /api/lots` - **Public**
- ✅ `GET /api/lots/:lotNumber` - **Public**
- 🔒 `POST /api/lots` - **PROTÉGÉ**
- 🔒 `PUT /api/lots/:lotNumber` - **PROTÉGÉ**
- 🔒 `DELETE /api/lots/:lotNumber` - **PROTÉGÉ**

### Traçabilité
- ✅ `GET /api/traceability/:lotNumber` - **Public**

### BeePerf Proxy
- ✅ `GET /api/beeperf/numero-lot/:numeroLot` - **Public**
- ✅ `GET /api/beeperf/numeros-lots` - **Public**

## 🔐 Utilisateur administrateur par défaut

Un utilisateur administrateur est créé lors du premier lancement :

- **Email:** `admin@bee-apic.com`
- **Mot de passe:** `Admin123!`
- **Rôle:** `admin`

⚠️ **IMPORTANT:** Changez ce mot de passe après la première connexion !

## 👥 Rôles utilisateurs

Le système supporte 3 rôles :

- **`admin`** - Accès complet (lecture, création, modification, suppression)
- **`editor`** - Accès lecture et modification (pas de suppression) - *À implémenter si nécessaire*
- **`viewer`** - Accès lecture seule - *Déjà implémenté (pas de token requis)*

Actuellement, tous les utilisateurs authentifiés ont les mêmes droits. La gestion fine des rôles peut être ajoutée facilement.

## 🔄 Expiration du token

Le token JWT expire après **7 jours** par défaut (configurable via `JWT_EXPIRES_IN` dans `.env`).

Après expiration, l'utilisateur doit se reconnecter pour obtenir un nouveau token.

## ❌ Gestion des erreurs

### 401 Unauthorized - Token manquant

```json
{
  "success": false,
  "error": "Token manquant. Veuillez fournir un token dans le header Authorization."
}
```

### 401 Unauthorized - Token invalide ou expiré

```json
{
  "success": false,
  "error": "Token invalide ou expiré."
}
```

### 400 Bad Request - Données invalides

```json
{
  "success": false,
  "error": "Email et mot de passe requis"
}
```

### 400 Bad Request - Email déjà utilisé

```json
{
  "success": false,
  "error": "Cet email est déjà utilisé"
}
```

## 🛠️ Créer un nouvel utilisateur admin

Utilisez le script fourni :

```bash
npm run create-admin
```

Ou créez un utilisateur via l'API (si vous êtes déjà connecté) :

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nouveau@bee-apic.com",
    "password": "MotDePasseSecurise123!",
    "name": "Nouveau Admin",
    "role": "admin"
  }'
```

## 🔧 Configuration

Les paramètres JWT sont dans `.env` :

```env
# Clé secrète pour signer les tokens (CHANGEZ EN PRODUCTION!)
JWT_SECRET="bee-apic-super-secret-key-change-in-production-2026"

# Durée de validité du token
JWT_EXPIRES_IN="7d"
```

⚠️ **IMPORTANT:** Utilisez une clé secrète forte et unique en production !

Vous pouvez générer une clé sécurisée avec :

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📱 Intégration Frontend

### React/Next.js avec Context API

```typescript
// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  // Charger le token depuis localStorage au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Optionnel: vérifier le token et récupérer l'utilisateur
      fetchUser(savedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const { data } = await response.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const fetchUser = async (token: string) => {
    const response = await fetch('http://localhost:3001/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const { data } = await response.json();
    setUser(data);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        login, 
        logout, 
        isAuthenticated: !!token 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### Hook pour les requêtes API protégées

```typescript
// hooks/useAuthFetch.ts
import { useAuth } from '@/context/AuthContext';

export function useAuthFetch() {
  const { token } = useAuth();

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return authFetch;
}
```

## 🧪 Tests avec Postman

1. **Collection Postman:** Créez une collection "Bee Api'C"

2. **Variable d'environnement:** Créez une variable `{{token}}`

3. **Script de test pour login:**
   ```javascript
   // Dans l'onglet "Tests" de la requête login
   const response = pm.response.json();
   pm.environment.set("token", response.data.token);
   ```

4. **Utilisation dans les autres requêtes:**
   - Dans l'onglet "Authorization" : Type = "Bearer Token"
   - Token = `{{token}}`

## 🔐 Sécurité - Bonnes pratiques

1. **Ne jamais commiter .env** dans Git
2. **Utiliser HTTPS** en production
3. **Changer JWT_SECRET** en production avec une clé forte
4. **Limiter la durée de vie** des tokens (actuellement 7 jours)
5. **Implémenter un refresh token** pour renouveler automatiquement (optionnel)
6. **Stocker le token de façon sécurisée** dans le frontend (httpOnly cookies recommandé en production)
7. **Valider et sanitiser** toutes les entrées utilisateur
8. **Utiliser des mots de passe forts** (minimum 6 caractères, recommandé 12+)

---

✅ **L'authentification JWT est maintenant opérationnelle !**
