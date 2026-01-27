# 🎯 AdminNav - Composant de Navigation Réutilisable

## ✅ Objectif

Créer un composant de navigation admin **unique et réutilisable**, comme le Header du site, qui sera importé une seule fois et visible sur toutes les pages admin.

---

## 📦 Architecture

### Composants créés

```
site/components/admin/
├── AdminNav.tsx          → Composant de navigation (sidebar + hamburger)
├── AdminNav.module.css   → Styles de la navigation
├── AdminLayout.tsx       → Layout wrapper avec auth
└── AdminLayout.module.css → Styles du layout
```

### Fonctionnement

```
┌─────────────────────────────────────┐
│  AdminLayout (wrapper)              │
│  - Gère l'authentification          │
│  - Affiche AdminNav                 │
│  - Affiche le contenu (children)    │
│                                     │
│  ┌──────────────┬─────────────────┐│
│  │ AdminNav     │  Page Content   ││
│  │ (sidebar)    │  (children)     ││
│  │              │                 ││
│  │ • Dashboard  │  <Dashboard />  ││
│  │ • Apiculteurs│  ou             ││
│  │ • Types      │  <Beekeepers /> ││
│  │ • Produits   │  ou             ││
│  │ • Lots       │  <Products />   ││
│  │              │  etc...         ││
│  │ [User Info]  │                 ││
│  │ [Logout]     │                 ││
│  └──────────────┴─────────────────┘│
└─────────────────────────────────────┘
```

---

## 🚀 Utilisation

### Ancienne méthode ❌ (à remplacer)

Chaque page avait sa propre sidebar :

```tsx
export default function DashboardClient() {
  const { user, token, logout } = useAuth();
  
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        {/* ... toute la sidebar dupliquée ... */}
      </aside>
      <main>
        {/* contenu */}
      </main>
    </div>
  );
}
```

**Problème** : Code dupliqué sur 8+ pages !

### Nouvelle méthode ✅ (recommandée)

Une seule importation du layout :

```tsx
import AdminLayout from "@/components/admin/AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      {/* Votre contenu ici */}
      <h1>Tableau de bord</h1>
      <p>Contenu de la page...</p>
    </AdminLayout>
  );
}
```

**Avantage** : Code centralisé, facile à maintenir !

---

## 📝 Migration des pages existantes

### Étape 1 : Simplifier le composant

**Avant** :
```tsx
export default function BeekeepersClient() {
  const { user, token, logout } = useAuth();
  const [beekeepers, setBeekeepers] = useState([]);
  
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        {/* 100 lignes de sidebar... */}
      </aside>
      <main>
        {/* contenu */}
      </main>
    </div>
  );
}
```

**Après** :
```tsx
import AdminLayout from "@/components/admin/AdminLayout";

export default function BeekeepersPage() {
  const [beekeepers, setBeekeepers] = useState([]);
  
  return (
    <AdminLayout>
      {/* contenu seulement */}
      <h1>Gestion des Apiculteurs</h1>
      {/* ... */}
    </AdminLayout>
  );
}
```

### Étape 2 : Supprimer le code inutile

À supprimer de chaque page :
- ❌ Import de `useAuth` (géré par AdminLayout)
- ❌ État `user`, `token`, `logout` (géré par AdminLayout)
- ❌ Toute la structure de la sidebar
- ❌ Le bouton hamburger
- ❌ L'overlay
- ❌ Les styles de sidebar

À garder :
- ✅ La logique métier de la page
- ✅ Les states propres à la page
- ✅ Le contenu JSX

---

## 🎨 Fonctionnalités de AdminNav

### Desktop
- ✅ Sidebar fixe à gauche (280px)
- ✅ Toujours visible
- ✅ Navigation avec liens actifs
- ✅ Informations utilisateur
- ✅ Bouton déconnexion

### Mobile
- ✅ Bouton hamburger en haut à droite (sous le header)
- ✅ Menu coulissant depuis la gauche
- ✅ Overlay pour fermer
- ✅ Fermeture auto au clic sur lien
- ✅ Animation fluide

### Navigation active
Le composant utilise `usePathname()` pour détecter la page active automatiquement.

```tsx
<Link
  href="/admin/dashboard"
  className={pathname === "/admin/dashboard" ? styles.active : ""}
>
  Dashboard
</Link>
```

---

## 🔧 Props de AdminNav

```typescript
interface AdminNavProps {
  user?: {
    name: string | null;
    email: string;
  } | null;
  onLogout: () => void;
}
```

### `user` (optionnel)
Informations de l'utilisateur connecté.
- `name` : Nom affiché (ou "Administrateur" par défaut)
- `email` : Email affiché

### `onLogout` (requis)
Fonction appelée lors du clic sur le bouton de déconnexion.

---

## 🔒 AdminLayout - Gestion de l'auth

Le composant `AdminLayout` gère automatiquement :

### Vérification de l'auth
```typescript
useEffect(() => {
  const token = localStorage.getItem("adminToken");
  const userStr = localStorage.getItem("adminUser");

  if (!token || !userStr) {
    router.push("/admin/login"); // Redirection
    return;
  }
  
  setUser(JSON.parse(userStr));
}, []);
```

### État de chargement
Affiche un loader pendant la vérification :
```tsx
if (loading) {
  return <div className={styles.loadingContainer}>...</div>;
}
```

### Déconnexion
```typescript
const handleLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  router.push("/admin/login");
};
```

---

## 📋 Liste des pages à migrer

### Pages principales (5)
- [ ] `/admin/dashboard/page.tsx`
- [ ] `/admin/beekeepers/page.tsx`
- [ ] `/admin/honey-types/page.tsx`
- [ ] `/admin/products/page.tsx`
- [ ] `/admin/lots/page.tsx`

### Pages formulaires (4)
- [ ] `/admin/beekeepers/[id]/page.tsx`
- [ ] `/admin/honey-types/[id]/page.tsx`
- [ ] `/admin/products/[id]/page.tsx`
- [ ] `/admin/lots/[id]/page.tsx`

### Pages new (4)
- [ ] `/admin/beekeepers/new/page.tsx`
- [ ] `/admin/honey-types/new/page.tsx`
- [ ] `/admin/products/new/page.tsx`
- [ ] `/admin/lots/new/page.tsx`

**Total : 13 pages à migrer**

---

## 📐 Structure recommandée

### Page simplifiée

```tsx
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "./page.module.css";

export default function MyAdminPage() {
  // États et logique de la page
  const [data, setData] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    const token = localStorage.getItem("adminToken");
    // Fetch data...
  };
  
  return (
    <AdminLayout>
      <header className={styles.pageHeader}>
        <h1>Titre de la page</h1>
      </header>
      
      <div className={styles.content}>
        {/* Contenu de la page */}
      </div>
    </AdminLayout>
  );
}
```

### CSS simplifié

```css
/* Plus besoin de styles pour sidebar, hamburger, overlay ! */

.pageHeader {
    margin-bottom: 2rem;
}

.content {
    /* Styles du contenu uniquement */
}
```

---

## ✨ Avantages du système

### Code
- ✅ **-80% de code** par page
- ✅ **Maintenance centralisée** : 1 seul fichier à modifier
- ✅ **Cohérence garantie** : même navigation partout
- ✅ **Pas de duplication** : DRY principe

### Performance
- ✅ **Moins de code** à charger
- ✅ **Bundle plus petit**
- ✅ **Rendu plus rapide**

### Développement
- ✅ **Plus simple** à créer une nouvelle page
- ✅ **Plus rapide** à développer
- ✅ **Moins d'erreurs** potentielles

### UX
- ✅ **Navigation cohérente** sur toutes les pages
- ✅ **Comportement identique**
- ✅ **Pas de surprise** pour l'utilisateur

---

## 🔄 Procédure de migration (par page)

### 1. Créer le nouveau fichier
```tsx
// app/admin/ma-page/page.tsx
import AdminLayout from "@/components/admin/AdminLayout";

export default function MyPage() {
  return (
    <AdminLayout>
      {/* Contenu copié de l'ancien fichier */}
    </AdminLayout>
  );
}
```

### 2. Supprimer le code inutile
- Supprimer : imports `useAuth`, `useMobileMenu`
- Supprimer : toute la structure sidebar
- Supprimer : bouton hamburger et overlay
- Garder : la logique métier uniquement

### 3. Adapter les styles CSS
- Supprimer : tous les styles de sidebar
- Garder : styles du contenu de la page

### 4. Tester
- Vérifier l'auth
- Vérifier la navigation
- Vérifier le responsive mobile

### 5. Supprimer l'ancien fichier
Une fois validé, supprimer l'ancien fichier client.

---

## 📖 Exemple complet : Dashboard

### Avant (200+ lignes)
```tsx
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export default function DashboardClient() {
  const { user, token, logout } = useAuth();
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [stats, setStats] = useState({...});
  
  return (
    <div className={styles.dashboardContainer}>
      <button onClick={toggleMenu}>...</button>
      <div onClick={closeMenu}>...</div>
      
      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <div>...</div>
        <nav onClick={closeMenu}>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/beekeepers">Apiculteurs</a>
          {/* ... */}
        </nav>
        <div>
          <div>{user?.name}</div>
          <button onClick={logout}>Déconnexion</button>
        </div>
      </aside>
      
      <main>
        <h1>Tableau de bord</h1>
        {/* contenu */}
      </main>
    </div>
  );
}
```

### Après (50 lignes)
```tsx
"use client";
import AdminLayout from "@/components/admin/AdminLayout";

export default function DashboardPage() {
  const [stats, setStats] = useState({...});
  
  return (
    <AdminLayout>
      <h1>Tableau de bord</h1>
      {/* contenu */}
    </AdminLayout>
  );
}
```

**Gain : -75% de code !**

---

## 🎯 Prochaines étapes

1. ✅ Créer AdminNav composant
2. ✅ Créer AdminLayout composant
3. ✅ Tester avec Dashboard
4. ⏳ Migrer toutes les pages (13)
5. ⏳ Supprimer les anciens fichiers
6. ⏳ Nettoyer les CSS inutilisés

---

**Date** : 27 janvier 2026  
**Status** : ✅ Composants créés, prêt pour migration  
**Impact** : ~75% de code en moins par page admin
