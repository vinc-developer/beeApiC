# 📘 Guide d'utilisation - Numéros de lots v3.6

## 🎯 Format du numéro de lot

### Structure complète
```
[CODE_APICULTEUR]-[ANNEE]-[TYPE_MIEL]-[DATE]
```

### Exemples
- `BA-2026-CH-0107` - Bee Api'C, Châtaignier, 7 janvier 2026
- `MC-2026-PA-2505` - Matthieu Colas, Acacia, 25 mai 2026
- `CV-2026-P` - Colas Vincent, Printemps (pas de date)
- `BA-2026-CH2-1507` - Bee Api'C, Châtaignier cuve 2, 15 juillet 2026

---

## 🐝 Codes apiculteurs

Les 2-3 premières lettres identifient l'apiculteur :

| Code | Apiculteur | Statut |
|------|------------|--------|
| `BA` | Bee Api'C | Maison mère (producteur) |
| `CV` | Colas Vincent | Apiculteur Bee Api'C |
| `MC` | Matthieu Colas | Partenaire externe |

### Comment ajouter un nouvel apiculteur ?

1. Ouvrir le fichier `data/beekeepers.json`
2. Ajouter un nouvel objet avec le code apiculteur comme clé
3. Remplir toutes les informations requises

**Exemple :**
```json
{
  "beekeepers": {
    "BA": { ... },
    "MC": { ... },
    "NV": {
      "type": "Apiculteur Récoltant",
      "partnerSince": "2026",
      "firstName": "Nouveau",
      "lastName": "Apiculteur",
      "commercialName": "Les Ruches du Val",
      "address": "123 rue des Abeilles\n44000 Nantes - France",
      "email": "contact@ruchesduval.fr",
      "phone": "+33 6 12 34 56 78",
      "website": "https://ruchesduval.fr",
      "siret": "123 456 789 00012",
      "photo": "nouveau-apiculteur/photo.jpg",
      "logo": "nouveau-apiculteur/logo.jpg",
      "socialMedia": {
        "instagram": "https://instagram.com/ruchesduval",
        "facebook": "https://facebook.com/ruchesduval"
      }
    }
  }
}
```

---

## 🍯 Types de miel

Les 1-3 caractères après l'année et le tiret identifient le type de miel :

| Code | Nom complet | Description |
|------|-------------|-------------|
| `P` | Miel de Printemps | Récolte de printemps, fleurs variées |
| `PA` | Miel d'Acacia | Miel doux et clair |
| `CH` | Miel de Châtaignier | Miel corsé au goût prononcé |
| `E` | Miel d'Été | Récolte d'été, fleurs de saison |
| `F` | Miel de Forêt | Miel de miellat aux notes boisées |
| `T` | Miel de Tilleul | Miel aromatique et bienfaisant |
| `L` | Miel de Lavande | Miel parfumé aux notes florales |
| `TO` | Miel Toutes Fleurs | Mélange harmonieux de fleurs variées |

### Support des cuves multiples

Vous pouvez ajouter un chiffre après le code pour identifier différentes cuves :
- `CH` - Châtaignier (cuve unique)
- `CH1` - Châtaignier cuve 1
- `CH2` - Châtaignier cuve 2
- `PA1` - Acacia cuve 1

### Comment ajouter un nouveau type de miel ?

1. Ouvrir le fichier `data/honey-types.json`
2. Ajouter un nouvel objet avec le code comme clé
3. Définir le nom et la description

**Exemple :**
```json
{
  "honeyTypes": {
    "P": { ... },
    "CH": { ... },
    "BR": {
      "name": "Miel de Bruyère",
      "description": "Miel ambré aux notes maltées"
    }
  }
}
```

---

## 🎨 Badges affichés

### Badge "🐝 Miel Bee Api'C"
- **Condition** : Code apiculteur = `BA`
- **Couleur** : Gradient orange vif
- **Signification** : Miel produit directement par Bee Api'C

### Badge "🤝 Partenaire Bee Api'C depuis XXXX"
- **Condition** : Code apiculteur ≠ `BA` ET `partnerSince` défini dans beekeepers.json
- **Couleur** : Gradient doré
- **Signification** : Miel produit par un apiculteur partenaire

### Badge Type de Miel
- **Condition** : Type de miel reconnu dans honey-types.json
- **Couleur** : Gradient orange/brun
- **Signification** : Variété de miel spécifique

---

## 📅 Format de la date (optionnel)

Les 4 derniers chiffres peuvent représenter la date de production :
- Format : `DDMM`
- `0107` → 7 janvier
- `2505` → 25 mai
- `1507` → 15 juillet

**Note :** La date est optionnelle et n'est pas utilisée par l'application actuellement.

---

## 🔍 Exemples d'utilisation

### Cas 1 : Miel Bee Api'C
```
Numéro : BA-2026-CH-0107
→ Producteur : Bee Api'C (badge orange)
→ Type : Miel de Châtaignier
→ Date : 7 janvier 2026
```

### Cas 2 : Partenaire avec type de miel
```
Numéro : MC-2026-PA-2505
→ Producteur : Matthieu Colas - Partenaire depuis 2025 (badge doré)
→ Type : Miel d'Acacia
→ Date : 25 mai 2026
```

### Cas 3 : Sans type de miel spécifique
```
Numéro : CV-2026-XXXX
→ Producteur : Colas Vincent
→ Type : Non spécifié (badge type de miel non affiché)
```

### Cas 4 : Plusieurs cuves du même type
```
Numéro : BA-2026-CH1-0107
→ Producteur : Bee Api'C
→ Type : Miel de Châtaignier (cuve 1)

Numéro : BA-2026-CH2-1507
→ Producteur : Bee Api'C
→ Type : Miel de Châtaignier (cuve 2)
```

---

## ⚠️ Erreurs courantes

### Type de miel non reconnu
Si le type de miel n'existe pas dans `honey-types.json`, le badge ne s'affichera pas.
**Solution :** Ajouter le type dans le fichier de configuration.

### Code apiculteur non reconnu
Si le code apiculteur n'existe pas dans `beekeepers.json`, les informations de l'apiculteur ne seront pas affichées.
**Solution :** Ajouter l'apiculteur dans le fichier de configuration.

### Format de lot invalide
Si le numéro de lot ne respecte pas le format `XX-YYYY-...`, aucun code ne sera extrait.
**Solution :** Utiliser le format recommandé.

---

## 🚀 Migration depuis l'ancien format

### Ancien format
```
LOT2024-001
MIEL-2025-CH
```

### Nouveau format recommandé
```
BA-2024-TO-0001
BA-2025-CH
```

**Note :** Les anciens formats continuent de fonctionner mais ne bénéficient pas des nouvelles fonctionnalités (badges, types de miel).

---

## 📞 Support

Pour toute question ou problème :
- Email : bee.apic.pro@gmail.com
- Documentation technique : voir `CHANGELOG-V3.6.md`

