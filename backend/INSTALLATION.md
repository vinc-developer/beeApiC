# 🎉 Backend Bee Api'C - Installation Terminée

## ✅ Ce qui a été créé

### Structure du projet

```
backend/
├── app/
│   ├── api/
│   │   ├── beekeepers/              # API CRUD Apiculteurs
│   │   │   ├── route.ts            # GET (liste), POST (créer)
│   │   │   └── [code]/route.ts     # GET, PUT, DELETE par code (BA, MC, NG)
│   │   │
│   │   ├── honey-types/             # API CRUD Types de Miel
│   │   │   ├── route.ts            # GET (liste), POST (créer)
│   │   │   └── [code]/route.ts     # GET, PUT, DELETE par code (P, PA, CH, E, F, S, TF)
│   │   │
│   │   ├── products/                # API CRUD Produits
│   │   │   ├── route.ts            # GET (liste avec filtres), POST (créer)
│   │   │   ├── [slug]/route.ts     # GET, PUT, DELETE par slug
│   │   │   └── category/
│   │   │       └── [category]/route.ts  # GET par catégorie (miel, bougie, hydromel, coffret)
│   │   │
│   │   ├── lots/                    # API CRUD Lots
│   │   │   ├── route.ts            # GET (liste), POST (créer)
│   │   │   └── [lotNumber]/route.ts # GET, PUT, DELETE par numéro de lot
│   │   │
│   │   ├── traceability/            # API Traçabilité complète
│   │   │   └── [lotNumber]/route.ts # GET traçabilité complète d'un lot
│   │   │
│   │   ├── beeperf/                 # Proxy vers API BeePerf externe
│   │   │   ├── numero-lot/[numeroLot]/route.ts
│   │   │   └── numeros-lots/route.ts
│   │   │
│   │   └── route.ts                 # Documentation de l'API
│   │
│   ├── layout.tsx
│   └── page.tsx                     # Page d'accueil avec documentation
│
├── lib/
│   ├── prisma.ts                    # Client Prisma (singleton)
│   └── api-utils.ts                 # Utilitaires pour les réponses API
│
├── prisma/
│   ├── schema.prisma                # Schéma de la base de données
│   └── seed.ts                      # Script de peuplement initial
│
├── types/
│   ├── beekeeper.ts                 # Types TypeScript Apiculteurs
│   ├── honey-type.ts                # Types TypeScript Types de Miel
│   ├── product.ts                   # Types TypeScript Produits
│   ├── lot.ts                       # Types TypeScript Lots/Traçabilité
│   └── index.ts                     # Export global des types
│
├── .env                             # Configuration environnement
├── .env.example                     # Exemple de configuration
├── .gitignore                       # Fichiers à ignorer par Git
├── next.config.mjs                  # Configuration Next.js (CORS activé)
├── package.json                     # Dépendances et scripts
├── tsconfig.json                    # Configuration TypeScript
└── README.md                        # Documentation complète
```

## 📊 Base de données

### Tables créées avec Prisma

1. **beekeepers** - Apiculteurs
2. **ruchers** - Ruchers (lieux des ruches)
3. **beekeeper_gallery** - Galerie photos des apiculteurs
4. **social_media** - Réseaux sociaux des apiculteurs
5. **honey_types** - Types de miel
6. **products** - Produits (miel, bougies, hydromel, coffrets)
7. **lots** - Lots de production
8. **lot_zones** - Zones de butinage des lots
9. **lot_productions** - Dates de production (récolte, extraction, conditionnement)

### Données peuplées

✅ **7 types de miel** : P, PA, CH, E, F, S, TF
✅ **3 apiculteurs** : BA (Vincent Colas), MC (Matthieu Colas), NG (Nicolas Grouls)
✅ **10 produits** : Miels, bougies, hydromel, coffrets
✅ **2 lots** avec traçabilité complète

## 🚀 Commandes disponibles

```bash
# Développement
npm run dev              # Démarre le serveur de développement (port 3001)
npm run build            # Build pour la production
npm run start            # Démarre le serveur de production

# Base de données
npm run db:generate      # Génère le client Prisma
npm run db:push          # Synchronise le schéma avec la BDD (sans migration)
npm run db:migrate       # Crée une nouvelle migration
npm run db:seed          # Peuple la base avec les données initiales
npm run db:studio        # Ouvre Prisma Studio (interface visuelle BDD)

# Autres
npm run lint             # Lint du code
```

## 🌐 Endpoints API

Le serveur écoute sur **http://localhost:3001**

### Documentation
- `GET http://localhost:3001` - Page d'accueil avec documentation
- `GET http://localhost:3001/api` - Liste des endpoints JSON

### Apiculteurs
- `GET /api/beekeepers` - Liste tous les apiculteurs (pagination)
- `GET /api/beekeepers/BA` - Récupère l'apiculteur BA
- `POST /api/beekeepers` - Crée un apiculteur
- `PUT /api/beekeepers/BA` - Met à jour l'apiculteur BA
- `DELETE /api/beekeepers/BA` - Supprime l'apiculteur BA

### Types de Miel
- `GET /api/honey-types` - Liste tous les types
- `GET /api/honey-types/CH` - Récupère le type Châtaignier
- `POST /api/honey-types` - Crée un type
- `PUT /api/honey-types/CH` - Met à jour un type
- `DELETE /api/honey-types/CH` - Supprime un type

### Produits
- `GET /api/products` - Liste tous les produits
- `GET /api/products?category=miel&in_stock=true` - Filtre par catégorie et stock
- `GET /api/products/miel-acacia-500g` - Récupère un produit par slug
- `GET /api/products/category/miel` - Liste les produits de catégorie "miel"
- `POST /api/products` - Crée un produit
- `PUT /api/products/miel-acacia-500g` - Met à jour un produit
- `DELETE /api/products/miel-acacia-500g` - Supprime un produit

### Lots
- `GET /api/lots` - Liste tous les lots
- `GET /api/lots?beekeeper_code=BA` - Filtre par apiculteur
- `GET /api/lots/BA-250701-CH` - Récupère un lot par numéro
- `POST /api/lots` - Crée un lot
- `PUT /api/lots/BA-250701-CH` - Met à jour un lot
- `DELETE /api/lots/BA-250701-CH` - Supprime un lot

### Traçabilité
- `GET /api/traceability/BA-250701-CH` - Traçabilité complète d'un lot

### Proxy BeePerf
- `GET /api/beeperf/numero-lot/:numeroLot` - Traçabilité via API BeePerf
- `GET /api/beeperf/numeros-lots` - Liste des numéros de lots BeePerf

## 🔧 Configuration

### Variables d'environnement (.env)

```env
# Base de données MySQL
DATABASE_URL="mysql://root@localhost:3306/bee_apic_db"

# Port du serveur
PORT=3001

# Environment
NODE_ENV=development

# API BeePerf (proxy)
BEEPERF_API_URL="https://web.beeperf.com/api"
BEEPERF_API_KEY="votre_clé_api_ici"
```

## 📖 Exemples de requêtes

### Récupérer tous les apiculteurs

```bash
curl http://localhost:3001/api/beekeepers
```

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
      "commercialName": "Bee Api'C",
      "location": "Pays de Retz, Loire-Atlantique, France"
    },
    "honeyType": {
      "code": "CH",
      "name": "Miel de Châtaignier"
    },
    "zones": [
      {
        "lieuxRucher": "Saint-Léger-les-Vignes",
        "environnement": "Forêts de châtaigniers..."
      }
    ],
    "production": {
      "datesRecolte": ["2025-06-10", "2025-06-17", "2025-06-25"],
      "datesExtractions": ["2025-07-15", "2025-07-22"],
      "datesConditionnement": ["2025-08-20"]
    }
  }
}
```

### Créer un nouveau lot

```bash
curl -X POST http://localhost:3001/api/lots \
  -H "Content-Type: application/json" \
  -d '{
    "lotNumber": "BA-260115-E",
    "beekeeperCode": "BA",
    "honeyTypeCode": "E",
    "humidity": "18",
    "zones": [
      {
        "lieuxRucher": "Port-Saint-Père",
        "environnement": "Prairies fleuries"
      }
    ],
    "production": {
      "datesRecolte": ["2026-07-20"],
      "datesExtractions": ["2026-08-01"],
      "datesConditionnement": ["2026-08-15"]
    }
  }'
```

## 🎯 Prochaines étapes

1. **Tester l'API** avec Postman ou votre front-end Next.js
2. **Configurer la clé API BeePerf** dans `.env` si nécessaire
3. **Connecter votre front-end** aux endpoints du backend
4. **Ajouter l'authentification** si besoin (JWT, NextAuth, etc.)
5. **Déployer en production** (Vercel, Railway, etc.)

## 🔒 Sécurité

- ✅ CORS activé pour tous les endpoints `/api/*`
- ✅ Variables d'environnement pour les secrets
- ⚠️ **À faire** : Ajouter l'authentification pour les routes POST/PUT/DELETE
- ⚠️ **À faire** : Limiter le rate limiting en production

## 📚 Documentation complémentaire

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifier que le port 3001 est libre
netstat -ano | findstr :3001

# Changer le port dans .env si nécessaire
PORT=3002
```

### Erreur de connexion à MySQL
```bash
# Vérifier que MySQL est démarré
# Vérifier les identifiants dans DATABASE_URL
# Créer la base si elle n'existe pas :
mysql -u root -p
CREATE DATABASE bee_apic_db;
```

### Prisma Client non généré
```bash
npm run db:generate
```

---

🐝 **Bee Api'C Backend est prêt à l'emploi !**
