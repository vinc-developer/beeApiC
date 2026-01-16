# Configuration de la Boutique

## Fichier de configuration des produits

Le fichier `data/products.json` contient la liste de tous les produits disponibles dans la boutique.

### Structure d'un produit

```json
{
  "id": "identifiant-unique",
  "name": "Nom du produit",
  "description": "Description détaillée du produit",
  "price": 8.50,
  "image": "pages/home/miels.jpg",
  "category": "miel|hydromel|coffret",
  "weight": "250g|500g|75cl|etc",
  "inStock": true|false,
  "storeUrl": "https://bee-apic.sumupstore.com/product/nom-du-produit"
}
```

### Champs obligatoires

- **id**: Identifiant unique du produit (string)
- **name**: Nom commercial du produit (string)
- **description**: Description détaillée pour le client (string)
- **price**: Prix en euros (number)
- **image**: Chemin vers l'image du produit dans le dossier public (string)
- **category**: Catégorie du produit (string: "miel", "hydromel", "coffret")
- **weight**: Poids ou volume du produit (string)
- **inStock**: Disponibilité du produit (boolean)
- **storeUrl**: Lien vers la page produit sur la boutique SumUp (string)

### Affichage sur la page d'accueil

La page d'accueil affiche **3 produits aléatoires** à chaque chargement. Cette sélection se fait automatiquement parmi tous les produits disponibles dans le fichier `products.json`.

Pour modifier le nombre de produits affichés, modifiez la valeur dans `app/page.tsx` :

```typescript
const featuredProducts = getRandomProducts(3); // Changer le nombre ici
```

### Ajouter un nouveau produit

1. Ajoutez une nouvelle entrée dans le tableau `products` du fichier `data/products.json`
2. Assurez-vous que l'image du produit existe dans `public/images/products/`
3. Le produit apparaîtra automatiquement dans la sélection aléatoire

### Images des produits

Placez les images des produits dans le dossier :
```
public/images/products/
```

Format recommandé :
- Format : JPG ou PNG
- Dimensions : 800x600px minimum
- Ratio : 4:3
- Taille : < 200KB

### Exemple de configuration complète

```json
{
  "products": [
    {
      "id": "miel-printemps-250g",
      "name": "Miel de Printemps",
      "description": "Miel doux et floral récolté au printemps",
      "price": 8.50,
      "image": "pages/home/miels.jpg",
      "category": "miel",
      "weight": "250g",
      "inStock": true,
      "storeUrl": "https://bee-apic.sumupstore.com/product/miel-de-printemps-250g"
    }
  ]
}
```

### Catégories disponibles

- **miel** : Pots de miel de différentes variétés
- **hydromel** : Boissons à base de miel fermenté
- **coffret** : Assortiments et coffrets cadeaux

### Gestion des stocks

Pour marquer un produit comme indisponible, changez `inStock` à `false` :

```json
{
  "id": "miel-chataignier-250g",
  "inStock": false
}
```

Un badge "Rupture de stock" apparaîtra sur la carte produit.

