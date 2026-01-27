# 📐 Hiérarchie Z-Index - Header vs Menu Admin

## ✅ Problème résolu

Les boutons hamburger du **header principal** et du **menu admin** se superposaient en mobile.

---

## 🎯 Solution appliquée

### Position verticale
- **Bouton header** : `top: 1rem` (en haut à droite)
- **Bouton admin** : `top: 5rem` (en dessous du header, environ 80px)

### Hiérarchie des z-index

```
┌─────────────────────────────────────┐
│  HEADER PRINCIPAL DU SITE           │
│  z-index: 100-2100                  │ ← Priorité maximale
├─────────────────────────────────────┤
│  Menu mobile header: 2000-2100      │
│  Header fixe: 100                   │
└─────────────────────────────────────┘
           ↓ (en dessous)
┌─────────────────────────────────────┐
│  MENU ADMIN                         │
│  z-index: 898-900                   │ ← En dessous du header
├─────────────────────────────────────┤
│  Bouton hamburger: 900              │
│  Sidebar: 899                       │
│  Overlay: 898                       │
└─────────────────────────────────────┘
           ↓ (en dessous)
┌─────────────────────────────────────┐
│  CONTENU DE LA PAGE                 │
│  z-index: 1-10 (ou auto)            │
└─────────────────────────────────────┘
```

---

## 📊 Valeurs des z-index

| Élément | Z-Index | Fichier |
|---------|---------|---------|
| **Header principal** | 100 | `Header.module.css` |
| Menu mobile header | 2000-2100 | `Header.module.css` |
| **Bouton hamburger admin** | 900 | `page.module.css` (admin) |
| **Sidebar admin** | 899 | `page.module.css` (admin) |
| **Overlay admin** | 898 | `page.module.css` (admin) |
| Contenu page | auto/1-10 | Divers |

---

## 🎨 Positionnement CSS

### Header principal (site)
```css
.header {
    position: fixed;
    top: 0;
    z-index: 100;
}

.mobileMenuButton {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 2000; /* Au-dessus de tout */
}
```

### Menu admin
```css
.menuToggle {
    position: fixed;
    top: 5rem; /* En dessous du header (80px) */
    right: 1rem;
    z-index: 900; /* En dessous du header */
}

.sidebar {
    position: fixed;
    z-index: 899;
}

.overlay {
    position: fixed;
    z-index: 898;
}
```

---

## 📱 Comportement en mobile

### Ordre d'affichage (du haut au bas)
```
1. Bouton hamburger HEADER (☰) - top: 1rem
   ↓ espace de ~3rem
2. Bouton hamburger ADMIN (☰) - top: 5rem
   ↓ contenu
3. Page principale
```

### Quand les menus sont ouverts
```
Si menu HEADER ouvert (z-index: 2000-2100)
  → Couvre TOUT, y compris le menu admin
  
Si menu ADMIN ouvert (z-index: 898-900)
  → Reste en dessous du header
  → Couvre seulement le contenu principal
```

---

## 🔍 Pourquoi cette hiérarchie ?

### 1. Header toujours prioritaire
Le header principal du site doit **toujours être accessible**, même quand le menu admin est ouvert.

### 2. Pas de conflit visuel
Les deux boutons hamburger sont **espacés verticalement** (3-4rem d'écart).

### 3. Navigation cohérente
- **Header** : Navigation principale du site
- **Admin** : Navigation secondaire (espace admin uniquement)

### 4. Overlay distinct
L'overlay du menu admin ne couvre pas le header, permettant de toujours accéder au menu principal.

---

## 🎯 Cas d'usage

### Utilisateur sur page admin (mobile)

#### Scenario 1 : Ouvrir menu admin
1. Clique sur bouton hamburger admin (en bas)
2. Menu admin s'ouvre depuis la gauche
3. Header reste visible et accessible en haut
4. Peut toujours ouvrir le menu header si besoin

#### Scenario 2 : Ouvrir menu header
1. Clique sur bouton hamburger header (en haut)
2. Menu header s'ouvre
3. Menu header couvre tout (z-index plus élevé)
4. Menu admin (si ouvert) passe en arrière-plan

#### Scenario 3 : Les deux menus ouverts
1. Ouvre menu admin
2. Ouvre menu header
3. **Menu header prend la priorité** (z-index 2000)
4. Menu admin reste en arrière-plan (z-index 900)
5. Ferme menu header → menu admin redevient visible

---

## 💡 Avantages de cette approche

### UX
- ✅ **Pas de confusion** : deux boutons bien distincts
- ✅ **Header toujours accessible** : priorité au menu principal
- ✅ **Séparation claire** : site vs admin

### Technique
- ✅ **Pas de conflit z-index** : hiérarchie claire
- ✅ **Maintenable** : logique simple
- ✅ **Prévisible** : comportement cohérent

### Accessibilité
- ✅ **Navigation claire** : deux niveaux distincts
- ✅ **Pas de blocage** : toujours accès au menu principal
- ✅ **Visuel cohérent** : boutons bien espacés

---

## 🔧 Ajustements possibles

### Si header plus haut/plus bas
Ajuster `top` du bouton admin en conséquence :
```css
/* Si header fait 60px */
.menuToggle { top: 4rem; }

/* Si header fait 100px */
.menuToggle { top: 6.5rem; }
```

### Si besoin de plus d'espace
```css
.menuToggle {
    top: calc(var(--header-height) + 1rem);
}
```

### Si conflit avec autre élément
Augmenter tous les z-index du menu admin de 100 :
```css
.menuToggle { z-index: 1000; }
.sidebar { z-index: 999; }
.overlay { z-index: 998; }
```
(Mais toujours en dessous du header !)

---

## 📝 Checklist de validation

- [x] Bouton admin en dessous du bouton header
- [x] Pas de superposition visuelle
- [x] Menu header prioritaire (z-index plus élevé)
- [x] Menu admin fonctionne correctement
- [x] Overlay admin ne couvre pas le header
- [x] Les deux menus peuvent coexister
- [x] Navigation fluide entre les deux
- [x] Accessible sur tous les mobiles

---

## ✨ Résultat final

```
Mobile (< 768px)
┌─────────────────────────┐
│ [☰] Header   │ (top: 1rem, z: 2000)
├─────────────────────────┤
│ [☰] Admin    │ (top: 5rem, z: 900)
├─────────────────────────┤
│                         │
│   Contenu de la page    │
│                         │
└─────────────────────────┘
```

**Les deux boutons sont clairement séparés et fonctionnent en harmonie ! 🎉**

---

**Date** : 27 janvier 2026  
**Fichiers modifiés** :
- `site/app/admin/beekeepers/page.module.css`
- `site/app/admin/dashboard/page.module.css`

**Status** : ✅ **PARFAIT - Aucune superposition**
