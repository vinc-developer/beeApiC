# 🐝 Bee Api'C - Backend API

Backend Next.js avec Prisma et MySQL pour la traçabilité du miel Bee Api'C.

## 📋 Prérequis

- Node.js 18+
- MySQL 8+
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer la base de données

Copiez le fichier `.env.example` vers `.env` et configurez votre connexion MySQL :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` :

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Exemple :
```env
DATABASE_URL="mysql://root:password@localhost:3306/bee_apic_db"
```

### 3. Créer la base de données MySQL

```sql
CREATE DATABASE bee_apic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Générer le client Prisma et créer les tables

```bash
npm run db:generate
npm run db:push
```

### 5. Peupler la base de données avec les données initiales

```bash
npm run db:seed
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3001`.

## 📚 API Endpoints

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription d'un utilisateur |
| POST | `/api/auth/login` | Connexion utilisateur |
| GET | `/api/auth/me` | Infos utilisateur connecté (protégé) |

> 🔒 **Note:** Les routes POST, PUT et DELETE sont protégées par authentification JWT. Voir [AUTH-GUIDE.md](./AUTH-GUIDE.md) pour plus de détails.

### Apiculteurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/beekeepers` | Liste tous les apiculteurs |
| GET | `/api/beekeepers/:code` | Récupère un apiculteur par son code |
| POST | `/api/beekeepers` | Crée un nouvel apiculteur |
| PUT | `/api/beekeepers/:code` | Met à jour un apiculteur |
| DELETE | `/api/beekeepers/:code` | Supprime un apiculteur |

### Types de Miel

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/honey-types` | Liste tous les types de miel |
| GET | `/api/honey-types/:code` | Récupère un type de miel |
| POST | `/api/honey-types` | Crée un nouveau type de miel |
| PUT | `/api/honey-types/:code` | Met à jour un type de miel |
| DELETE | `/api/honey-types/:code` | Supprime un type de miel |

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Liste tous les produits |
| GET | `/api/products/:slug` | Récupère un produit par son slug |
| GET | `/api/products/category/:category` | Liste les produits par catégorie |
| POST | `/api/products` | Crée un nouveau produit |
| PUT | `/api/products/:slug` | Met à jour un produit |
| DELETE | `/api/products/:slug` | Supprime un produit |

### Lots / Traçabilité

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/lots` | Liste tous les lots |
| GET | `/api/lots/:lotNumber` | Récupère un lot par son numéro |
| POST | `/api/lots` | Crée un nouveau lot |
| PUT | `/api/lots/:lotNumber` | Met à jour un lot |
| DELETE | `/api/lots/:lotNumber` | Supprime un lot |
| GET | `/api/traceability/:lotNumber` | Données de traçabilité complètes |

### Proxy BeePerf (API externe)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/beeperf/numero-lot/:numeroLot` | Traçabilité via API BeePerf |
| GET | `/api/beeperf/numeros-lots` | Liste des numéros de lots BeePerf |

## 🔍 Paramètres de requête

### Pagination

Tous les endpoints de liste supportent la pagination :

- `page` : Numéro de page (défaut: 1)
- `per_page` : Nombre d'éléments par page (défaut: 25, max: 100)

Exemple : `GET /api/products?page=2&per_page=10`

### Filtres

- **Produits** :
  - `in_stock` : `true` ou `false`
  - `category` : `miel`, `bougie`, `hydromel`, `coffret`

- **Lots** :
  - `beekeeper_code` : Code de l'apiculteur (ex: `BA`)

## 📦 Structure du projet

```
backend/
├── app/
│   ├── api/
│   │   ├── beekeepers/
│   │   ├── honey-types/
│   │   ├── lots/
│   │   ├── products/
│   │   └── traceability/
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── api-utils.ts
│   └── prisma.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── types/
│   ├── beekeeper.ts
│   ├── honey-type.ts
│   ├── lot.ts
│   ├── product.ts
│   └── index.ts
├── .env
├── .env.example
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## 🛠️ Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build pour la production |
| `npm run start` | Lance le serveur de production |
| `npm run db:generate` | Génère le client Prisma |
| `npm run db:push` | Pousse le schéma vers la BDD |
| `npm run db:migrate` | Crée une migration |
| `npm run db:seed` | Peuple la base de données |
| `npm run db:studio` | Lance Prisma Studio |
| `npm run create-admin` | Crée un utilisateur administrateur |

## 🔧 Prisma Studio

Pour visualiser et modifier les données directement :

```bash
npm run db:studio
```

Ouvre une interface web sur `http://localhost:5555`.

## 📝 Exemple de requête

### Récupérer la traçabilité d'un lot

```bash
curl http://localhost:3001/api/traceability/BA-250701-CH
```

Réponse :
```json
{
  "success": true,
  "data": {
    "lot": {
      "lotNumber": "BA-250701-CH",
      "humidity": "17.5"
    },
    "beekeeper": {
      "code": "BA",
      "firstName": "Vincent",
      "lastName": "Colas",
      "commercialName": "Bee Api'C"
    },
    "honeyType": {
      "code": "CH",
      "name": "Miel de Châtaignier"
    },
    "zones": [...],
    "production": {...}
  }
}
```

## 📄 Licence

Propriétaire - Bee Api'C © 2024
