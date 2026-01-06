# 🏢 Structure Maison Mère - Interface de Traçabilité

## ✅ Implémentation Terminée

L'interface a été restructurée pour distinguer clairement :
- **Bee Api'C** (Maison Mère) - Section fixe toujours visible
- **L'Apiculteur Producteur** - Affiché uniquement après recherche d'un lot

---

## 🎯 Nouvelle Structure de la Page

### 1. **Header** (Toujours visible)
```
┌────────────────────────────────────┐
│         [Logo Bee Api'C]           │
│    ou                              │
│    🐝 Bee Api'C (placeholder)      │
│                                    │
│    Traçabilité du Miel             │
│    Don't pannic, bee api'c !       │
└────────────────────────────────────┘
```

### 2. **Section Maison Mère** (Toujours visible)
```
┌─────────────────────────────────────────────┐
│ 🏢 Commercialisé par Bee Api'C  [Maison Mère] │
├─────────────────────────────────────────────┤
│                                             │
│ Description:                                │
│ Bee Api'C est une entreprise familiale     │
│ engagée dans la promotion du miel 100%     │
│ local de Loire-Atlantique...               │
│                                             │
│ 🏅 Miel 100% local de Loire-Atlantique     │
│                                             │
│ ┌─────────────────────┐                    │
│ │ Nous contacter      │                    │
│ │ 📍 Loire-Atlantique │                    │
│ │ 🌐 www.beeapic.fr   │                    │
│ │ 📧 contact@beeapic.fr│                    │
│ │ 📱 +33 X XX XX XX XX│                    │
│ └─────────────────────┘                    │
└─────────────────────────────────────────────┘
```

### 3. **Formulaire de Recherche** (Toujours visible)
```
┌─────────────────────────────────────┐
│ Rechercher un lot                   │
│ [Saisie manuelle] [Liste]           │
│ [____________] [Rechercher]         │
└─────────────────────────────────────┘
```

### 4. **Résultats** (Affiché après recherche)
```
┌─────────────────────────────────────┐
│ 🍯 Informations du produit          │
│ ...                                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📅 Dates de production              │
│ ...                                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 👨‍🌾 Produit par l'apiculteur         │
│ [Photo] Alex Terrieur               │
│ Apiculteur Récoltant                │
│ ...                                 │
└─────────────────────────────────────┘
```

---

## 📁 Fichiers Modifiés

### 1. **index.html**

**Ajouts** :
- Header avec logo Bee Api'C (ou placeholder 🐝)
- Slogan "Don't pannic, bee api'c !"
- Section maison mère complète (description, label, contact)
- Titre "Produit par l'apiculteur" (au lieu de "Votre apiculteur")

**Structure** :
```html
<header>
    <div class="brand-logo">
        <img id="brandLogo" src="images/logo-beeapic.png" />
        <div class="logo-placeholder-brand">🐝 Bee Api'C</div>
    </div>
    <h1>Traçabilité du Miel</h1>
    <p>Don't pannic, bee api'c !</p>
</header>

<section class="company-section">
    <!-- Informations Bee Api'C -->
</section>

<section class="search-section">
    <!-- Formulaire de recherche -->
</section>

<section class="results-section">
    <!-- Résultats (apiculteur producteur) -->
</section>
```

### 2. **styles/components.css**

**Ajouts** (172 nouvelles lignes) :
- `.brand-logo` - Logo dans le header
- `.logo-placeholder-brand` - Placeholder 🐝 + texte
- `.company-section` - Section maison mère
- `.company-card` - Card avec fond dégradé jaune
- `.company-header` - Header avec badge "Maison Mère"
- `.company-content` - Grid 2 colonnes (info + contact)
- `.company-label` - Badge "Miel 100% local..."
- `.company-contact` - Encart contact
- Responsive pour mobile

**Styles clés** :
```css
.company-card {
    background: linear-gradient(135deg, #FFF8DC 0%, white 100%);
    border: 2px solid var(--color-primary-light);
    box-shadow: var(--shadow-lg);
}

.company-badge {
    background: var(--color-primary);
    color: white;
    border-radius: var(--border-radius-full);
    text-transform: uppercase;
}

.company-label {
    background: var(--color-primary-lightest);
    border: 2px solid var(--color-primary);
}
```

### 3. **js/ui.js**

**Ajouts** :
- Éléments DOM pour la section maison mère
- Fonction `initializeCompanyInfo()` pour :
  - Charger le logo s'il existe
  - Configurer les liens de contact
  - Gérer le fallback sur placeholder

**Fonction d'initialisation** :
```javascript
function initializeCompanyInfo() {
    // Tentative de chargement du logo
    const logoImg = new Image();
    logoImg.src = 'images/logo-beeapic.png';
    
    logoImg.onload = function() {
        // Afficher le logo
        elements.brandLogo.classList.remove('hidden');
        elements.logoPlaceholderBrand.classList.add('hidden');
    };
    
    logoImg.onerror = function() {
        // Garder le placeholder 🐝
    };
    
    // Configurer les liens
    elements.companyWebsite.href = 'https://www.beeapic.fr';
    elements.companyEmail.href = 'mailto:contact@beeapic.fr';
    // ...
}
```

### 4. **js/app.js**

**Modification** :
- Appel de `ui.initializeCompanyInfo()` au démarrage

```javascript
async function init() {
    console.log('🚀 Initialisation...');
    
    // Initialiser les infos maison mère
    ui.initializeCompanyInfo();  // ← NOUVEAU
    
    setupEventListeners();
    await loadLotsList();
}
```

---

## 🎨 Design et Couleurs

### Section Maison Mère

**Fond** : Dégradé jaune doux (#FFF8DC → blanc)  
**Bordure** : 2px solid couleur primaire  
**Shadow** : Ombre portée large  
**Badge** : Fond primaire, texte blanc, coins arrondis  

### Label "Miel 100% local"

**Fond** : Couleur primaire très claire  
**Bordure** : 2px solid couleur primaire  
**Icône** : 🏅 (médaille)  
**Style** : Badge arrondi avec padding

### Contact

**Fond** : Blanc  
**Shadow** : Ombre légère  
**Icônes** : Emoji (📍 🌐 📧 📱)  
**Liens** : Couleur primaire, hover souligné

---

## 📱 Responsive

### Desktop (> 1024px)
```
┌───────────────────���───────────────────┐
│ Description        │  Contact         │
│ + Label           │  (encart)        │
└───────────────────────────────────────┘
```

### Tablette (768px - 1024px)
```
┌───────────────────────────────────────┐
│ Description + Label                   │
├───────────────────────────────────────┤
│ Contact                               │
└───────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────┐
│ 🏢 Commercialisé│
│ par Bee Api'C   │
├─────────────────┤
│ [Maison Mère]   │
├─────────────────┤
│ Description     │
│ ...             │
│ 🏅 Label        │
├─────────────────┤
│ Contact         │
└─────────────────┘
```

---

## 🖼️ Logo Bee Api'C

### Emplacement
```
images/logo-beeapic.png
```

### Comportement
1. **Si le logo existe** : Affichage du logo (max-height: 80px)
2. **Si le logo n'existe pas** : Affichage du placeholder 🐝 + texte "Bee Api'C"

### Placeholder
```
🐝 Bee Api'C
```
- Icône abeille emoji
- Texte en gras, couleur primaire
- Alignement centré

---

## 📝 Contenu de la Section Maison Mère

### Description
> Bee Api'C est une entreprise familiale engagée dans la promotion du miel 100% local de Loire-Atlantique. Nous travaillons en étroite collaboration avec des apiculteurs passionnés pour vous offrir un miel de qualité, traçable et respectueux de l'environnement.

### Label
> 🏅 Miel 100% local de Loire-Atlantique

### Contact
- **Adresse** : Loire-Atlantique, France
- **Site Web** : www.beeapic.fr
- **Email** : contact@beeapic.fr
- **Téléphone** : +33 X XX XX XX XX (à remplacer)

---

## 🔄 Flux de Navigation

### 1. Arrivée sur la page
```
✅ Header visible
✅ Section Bee Api'C visible
✅ Formulaire de recherche visible
❌ Résultats cachés
```

### 2. Recherche d'un lot
```
✅ Header visible
✅ Section Bee Api'C visible
⏳ Formulaire → Loading
❌ Résultats cachés
```

### 3. Résultats affichés
```
✅ Header visible
✅ Section Bee Api'C visible
❌ Formulaire caché
✅ Résultats visibles (infos produit + apiculteur)
```

### 4. Nouvelle recherche
```
✅ Header visible
✅ Section Bee Api'C visible
✅ Formulaire de recherche visible
❌ Résultats cachés
```

---

## ✨ Points Clés

### ✅ Séparation Claire
- **Maison mère** (commercialisation) toujours visible
- **Apiculteur** (production) affiché à la recherche

### ✅ Hiérarchie Visuelle
- Header avec logo
- Section maison mère mise en avant (fond coloré, bordure)
- Formulaire de recherche
- Résultats (apiculteur producteur)

### ✅ Cohérence de Marque
- Slogan : "Don't pannic, bee api'c !"
- Label : "Miel 100% local de Loire-Atlantique"
- Couleurs et style cohérents

### ✅ Flexibilité
- Logo avec fallback sur placeholder
- Informations contact configurables
- Design responsive

---

## 🚀 Pour Ajouter le Logo

1. Placez votre logo dans : `images/logo-beeapic.png`
2. Rafraîchissez la page
3. Le logo s'affichera automatiquement !

**Format recommandé** :
- PNG avec fond transparent
- Hauteur : 80-100px
- Largeur : proportionnelle

---

## 📞 Mettre à Jour les Coordonnées

Dans le fichier HTML (`index.html`), section company-contact :

```html
<span class="contact-text" id="companyAddress">
    Votre adresse complète
</span>

<a href="https://www.votresite.fr" class="contact-link" id="companyWebsite">
    www.votresite.fr
</a>

<a href="mailto:votreemail@beeapic.fr" class="contact-link" id="companyEmail">
    votreemail@beeapic.fr
</a>

<a href="tel:+33123456789" class="contact-link" id="companyPhone">
    +33 1 23 45 67 89
</a>
```

---

## ✅ Résultat Final

Une interface professionnelle qui met en avant :
- ✨ L'identité de marque Bee Api'C (maison mère)
- 🍯 La traçabilité du produit
- 👨‍🌾 Le producteur local (apiculteur)

**Structure claire : Marque → Recherche → Producteur**

---

**Version** : 3.0.0  
**Date** : 2026-01-06  
**Ajout majeur** : Section maison mère Bee Api'C

