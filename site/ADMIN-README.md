# 🐝 Espace Administrateur Bee Api'C

## 📋 Description

Interface d'administration complète pour gérer le contenu du site Bee Api'C, incluant :
- 👨‍🌾 Gestion des apiculteurs
- 🍯 Gestion des types de miel
- 📦 Gestion des produits
- 🔐 Authentification sécurisée avec JWT

## 🚀 Pages créées

### 1. Page de connexion
- **URL** : `/admin/login`
- **Fonctionnalités** :
  - Formulaire de connexion avec email/mot de passe
  - Validation des champs
  - Affichage des erreurs
  - Redirection vers le dashboard après connexion
  - Stockage sécurisé du token JWT dans localStorage

### 2. Dashboard (Tableau de bord)
- **URL** : `/admin/dashboard`
- **Fonctionnalités** :
  - Vue d'ensemble avec statistiques
  - Nombre d'apiculteurs, types de miel, produits
  - Actions rapides pour ajouter du contenu
  - Navigation vers les différentes sections
  - Bouton de déconnexion

### 3. Gestion des apiculteurs
- **URL** : `/admin/beekeepers`
- **Fonctionnalités** :
  - Liste de tous les apiculteurs
  - Affichage en tableau avec photo, nom, localisation, contacts
  - Bouton d'ajout
  - Boutons de modification et suppression
  - Confirmation avant suppression

## 🔧 Configuration

### Backend requis

Le frontend communique avec le backend Next.js/Prisma sur le port **3001**.

Assurez-vous que votre backend est démarré :

```bash
cd backend
npm run dev
```

### Variables d'environnement (si besoin)

Si vous voulez changer l'URL du backend, créez un fichier `.env.local` dans le dossier `site` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Puis modifiez les fetch dans les fichiers pour utiliser :
```typescript
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/...`)
```

## 🎯 Utilisation

### 1. Démarrer le frontend

```bash
cd site
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### 2. Se connecter

1. Accédez à `http://localhost:3000/admin/login`
2. Utilisez les identifiants d'un utilisateur créé dans le backend
3. Vous serez redirigé vers le dashboard

### 3. Créer un premier utilisateur admin

Si vous n'avez pas encore d'utilisateur, créez-en un via le backend :

```bash
cd backend
npm run create-admin
```

Ou utilisez l'API directement :

```bash
# Créez d'abord un admin via le script
cd backend
node scripts/create-admin.js
```

## 📁 Structure des fichiers

```
site/app/admin/
├── layout.tsx                    # Layout sans header/footer
├── login/
│   ├── page.tsx                  # Page de connexion
│   ├── loginClient.tsx           # Composant client
│   └── page.module.css           # Styles
├── dashboard/
│   ├── page.tsx                  # Tableau de bord
│   ├── dashboardClient.tsx       # Composant client
│   └── page.module.css           # Styles
└── beekeepers/
    ├── page.tsx                  # Liste des apiculteurs
    ├── beekeepersClient.tsx      # Composant client
    └── page.module.css           # Styles

site/hooks/
└── useAuth.ts                    # Hook personnalisé pour l'authentification
```

## 🔒 Sécurité

- ✅ Token JWT stocké dans localStorage
- ✅ Vérification de l'authentification sur chaque page admin
- ✅ Redirection automatique vers login si non authentifié
- ✅ Header Authorization envoyé avec chaque requête
- ✅ Déconnexion propre (suppression du token)

## 🎨 Design

Le design suit la charte graphique de Bee Api'C :
- Couleur primaire : #F5B04A (miel doré)
- Design épuré et professionnel
- Responsive (mobile, tablette, desktop)
- Sidebar fixe avec navigation
- Animations et transitions fluides

## 🚧 À compléter

Pour avoir un système complet, il faudra créer :

1. **Pages de création/édition** :
   - `/admin/beekeepers/new` - Ajouter un apiculteur
   - `/admin/beekeepers/[id]` - Modifier un apiculteur
   - `/admin/honey-types` - Liste des types de miel
   - `/admin/honey-types/new` - Ajouter un type
   - `/admin/products` - Liste des produits
   - `/admin/products/new` - Ajouter un produit

2. **Fonctionnalités supplémentaires** :
   - Upload d'images
   - Recherche et filtres
   - Pagination
   - Export de données
   - Gestion des lots de miel

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Bee Api'C** - Apiculture locale et traçable 🐝
