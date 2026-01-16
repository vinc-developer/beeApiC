# Ajout de la Section Boutique sur la Page d'Accueil

## 📋 Résumé

Une nouvelle section boutique a été ajoutée à la page d'accueil (`app/page.tsx`) pour mettre en avant les produits disponibles à la vente. Les produits affichés sont sélectionnés **aléatoirement** à chaque chargement de page et sont **entièrement configurables via un fichier JSON**.

## 🎯 Fonctionnalités

### ✅ Ce qui a été ajouté

1. **Section boutique sur la page d'accueil** avec :
   - Titre et description de la boutique
   - 3 produits affichés aléatoirement
   - Bouton "Voir tous nos produits" qui redirige vers la page contact
   - Note explicative indiquant que les produits changent à chaque visite

2. **Composant ProductCard réutilisable** (`components/shop/ProductCard.tsx`) :
   - Affichage d'une image produit
   - Nom et poids du produit
   - Description détaillée
   - Prix en euros
   - Bouton "Commander" qui redirige vers la page contact
   - Badge "Rupture de stock" si le produit n'est pas disponible
   - Animations au survol

3. **Fichier de configuration des produits** (`data/products.json`) :
   - 9 produits pré-configurés (miels, hydromel, coffrets)
   - Structure JSON facile à modifier
   - Tous les champs nécessaires pour l'affichage

4. **Documentation complète** :
   - Guide de configuration (`docs/BOUTIQUE-CONFIG.md`)
   - Spécifications des images requises (`public/images/products/README.md`)

## 📁 Fichiers créés

```
site/
├── components/
│   └── shop/
│       ├── ProductCard.tsx          # Composant carte produit
│       └── ProductCard.module.css   # Styles du composant
├── data/
│   └── products.json                # Configuration des produits
├── docs/
│   ├── BOUTIQUE-CONFIG.md          # Guide de configuration
│   └── AJOUT-SECTION-BOUTIQUE.md   # Ce fichier
└── public/
    └── images/
        └── products/
            └── README.md            # Guide des images produits
```

## 📝 Fichiers modifiés

```
site/
├── app/
│   ├── page.tsx                     # Ajout de la section boutique
│   └── page.module.css              # Ajout des styles boutique
```

## 🎨 Design et Style

La section boutique suit le design existant du site :
- Palette de couleurs cohérente (or/jaune/blanc)
- Animations douces au survol
- Design responsive (mobile, tablette, desktop)
- Cards avec ombres et bordures arrondies

## 🔧 Configuration

### Ajouter un nouveau produit

1. Ouvrez `site/data/products.json`
2. Ajoutez un nouvel objet dans le tableau `products` :

```json
{
  "id": "miel-lavande-250g",
  "name": "Miel de Lavande",
  "description": "Miel parfumé aux notes florales de Provence",
  "price": 9.50,
  "image": "/images/products/miel-lavande.jpg",
  "category": "miel",
  "weight": "250g",
  "inStock": true
}
```

3. Ajoutez l'image correspondante dans `public/images/products/`

### Modifier le nombre de produits affichés

Dans `app/page.tsx`, ligne 16, modifiez le paramètre de `getRandomProducts()` :

```typescript
const featuredProducts = getRandomProducts(3); // Changer 3 par le nombre souhaité
```

### Marquer un produit comme rupture de stock

Dans `products.json`, changez `inStock` à `false` :

```json
{
  "id": "miel-printemps-250g",
  "inStock": false
}
```

## 🖼️ Images des produits

### Images requises

Les images suivantes sont référencées dans `products.json` :

- `miel-printemps.jpg`
- `miel-ete.jpg`
- `miel-chataignier.jpg`
- `miel-toutes-fleurs.jpg`
- `hydromel.jpg`
- `coffret-decouverte.jpg`
- `coffret-premium.jpg`

### Spécifications recommandées

- **Format** : JPG ou PNG
- **Dimensions** : 800x600px minimum
- **Ratio** : 4:3
- **Taille** : < 200KB pour optimiser les performances

### Solution temporaire

En attendant les vraies photos de produits, vous pouvez :
1. Utiliser une image par défaut (ex: `miels.jpg` existante)
2. Créer des visuels simples avec Canva
3. Photographier vos produits existants

## 🚀 Prochaines étapes suggérées

### Court terme
- [ ] Ajouter les vraies photos des produits
- [ ] Ajuster les prix si nécessaire
- [ ] Compléter les descriptions produits

### Moyen terme
- [ ] Créer une page `/boutique` dédiée avec tous les produits
- [ ] Ajouter des filtres par catégorie (miel, hydromel, coffret)
- [ ] Ajouter un système de panier (optionnel)

### Long terme
- [ ] Intégrer un système de paiement en ligne
- [ ] Ajouter la gestion des stocks en temps réel
- [ ] Créer des pages produits individuelles

## 💡 Avantages de cette implémentation

✅ **Facile à configurer** : Simple fichier JSON, pas besoin de toucher au code  
✅ **Aléatoire** : Les produits changent à chaque visite, ça incite à revenir  
✅ **Responsive** : Fonctionne sur tous les appareils  
✅ **Extensible** : Facile d'ajouter de nouveaux produits  
✅ **Performant** : Pas de base de données nécessaire pour commencer  
✅ **Cohérent** : Design qui s'intègre parfaitement au reste du site  

## 🔗 Liens utiles

- Configuration des produits : `site/data/products.json`
- Documentation complète : `site/docs/BOUTIQUE-CONFIG.md`
- Guide des images : `site/public/images/products/README.md`
- Composant ProductCard : `site/components/shop/ProductCard.tsx`

## 📞 Support

Pour toute question ou modification, référez-vous à la documentation dans `docs/BOUTIQUE-CONFIG.md`.

---

**Date de création** : 2026-01-14  
**Version** : 1.0

