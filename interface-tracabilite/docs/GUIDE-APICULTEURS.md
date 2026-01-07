# 📖 Guide de Gestion des Apiculteurs

## 📋 Vue d'ensemble

Ce guide explique comment gérer les informations des apiculteurs dans l'interface de traçabilité du miel.

## 🔑 Format des Numéros de Lot

### Ancien Format (jusqu'à 2025)
```
LOT2024-001
LOT2024-002
...
```
**Comportement** : Les informations de l'apiculteur proviennent uniquement de l'API BeePerf.

### Nouveau Format (2026 et après)
```
BA-2026-CH-0107
CV-2026-ML-0234
ABC-2026-CH-0089
```

**Structure** :
- `BA` ou `CV` ou `ABC` : Code apiculteur (2-3 lettres majuscules)
- `2026` : Année
- `CH` : Code produit (ex: Châtaignier)
- `0107` : Numéro séquentiel

**Comportement** : Les informations de l'apiculteur proviennent du fichier JSON local (prioritaire sur l'API).

## 📁 Fichier de Configuration des Apiculteurs

### Emplacement
```
data/beekeepers.json
```

### Structure du Fichier

```json
{
  "beekeepers": {
    "BA": {
      "code": "BA",
      "type": "Apiculteur Récoltant",
      "firstName": "Bee",
      "lastName": "Api'C",
      "commercialName": "Bee Api'C",
      "address": "123 Rue des Abeilles\n75000 Paris\nFrance",
      "email": "contact@beeapic.fr",
      "phone": "+33 1 23 45 67 89",
      "siret": "123 456 789 00012",
      "photo": "images/beekeepers/ba-photo.jpg",
      "logo": "images/beekeepers/ba-logo.png",
      "socialMedia": {
        "instagram": "https://instagram.com/beeapic",
        "facebook": "https://facebook.com/beeapic",
        "tiktok": "https://tiktok.com/@beeapic",
        "youtube": "https://youtube.com/@beeapic",
        "linkedin": "https://linkedin.com/in/beeapic"
      }
    },
    "CV": {
      "code": "CV",
      "type": "Apiculteur Récoltant",
      ...
    }
  }
}
```

## ➕ Ajouter un Nouvel Apiculteur

### Étape 1 : Choisir un Code Apiculteur

Le code doit :
- Faire **2 ou 3 lettres majuscules**
- Être **unique**
- Être **mémorable** (initiales, nom commercial abrégé, etc.)

**Exemples** :
- `BA` = Bee Api'C
- `CV` = Colas Vincent
- `MLD` = Miel de Loire
- `ABC` = Apiculture Bio Corse

### Étape 2 : Compléter les Informations

Ouvrez le fichier `data/beekeepers.json` et ajoutez une nouvelle entrée :

```json
{
  "beekeepers": {
    "BA": { ... },
    "CV": { ... },
    "NOUVEAU_CODE": {
      "code": "NOUVEAU_CODE",
      "type": "Apiculteur Récoltant",
      "firstName": "Prénom",
      "lastName": "Nom",
      "commercialName": "Nom Commercial",
      "address": "Adresse ligne 1\nAdresse ligne 2\nVille",
      "email": "email@example.com",
      "phone": "+33 X XX XX XX XX",
      "siret": "XXX XXX XXX XXXXX",
      "photo": "chemin/vers/photo.jpg",
      "logo": "chemin/vers/logo.png",
      "socialMedia": {
        "instagram": "",
        "facebook": "",
        "tiktok": "",
        "youtube": "",
        "linkedin": ""
      }
    }
  }
}
```

### Étape 3 : Ajouter les Images (Optionnel)

1. Créez un dossier `images/beekeepers/` si non existant
2. Ajoutez la photo de l'apiculteur (format recommandé : carré, 500x500px minimum)
3. Ajoutez le logo (format recommandé : PNG transparent)
4. Mettez à jour les chemins dans le JSON

## 📝 Description des Champs

### Champs Obligatoires

| Champ | Description | Exemple |
|-------|-------------|---------|
| `code` | Code unique de l'apiculteur (2-3 lettres) | `"BA"` |
| `type` | Type d'apiculteur | `"Apiculteur Récoltant"` |
| `firstName` | Prénom | `"Jean"` |
| `lastName` | Nom de famille | `"Dupont"` |
| `commercialName` | Nom commercial | `"Les Ruchers du Val"` |

### Champs Optionnels

| Champ | Description | Format |
|-------|-------------|--------|
| `address` | Adresse complète | Lignes séparées par `\n` |
| `email` | Email de contact | `email@example.com` |
| `phone` | Téléphone | `"+33 X XX XX XX XX"` |
| `siret` | Numéro SIRET | `"XXX XXX XXX XXXXX"` |
| `photo` | Chemin vers la photo | `"images/photo.jpg"` |
| `logo` | Chemin vers le logo | `"images/logo.png"` |

### Réseaux Sociaux

Les réseaux sociaux sont **optionnels**. Si un réseau n'est pas utilisé, laissez la valeur vide `""`.

**Réseaux supportés** :
- `instagram` - Lien vers le profil Instagram
- `facebook` - Lien vers la page Facebook
- `tiktok` - Lien vers le profil TikTok
- `youtube` - Lien vers la chaîne YouTube
- `linkedin` - Lien vers le profil LinkedIn

**Affichage** : Seuls les réseaux sociaux avec une URL seront affichés sur l'interface.

## 🔍 Exemples Complets

### Exemple 1 : Apiculteur Complet

```json
"BA": {
  "code": "BA",
  "type": "Apiculteur Récoltant",
  "firstName": "Marie",
  "lastName": "Dupont",
  "commercialName": "Bee Api'C",
  "address": "15 Rue des Fleurs\n44000 Nantes\nFrance",
  "email": "marie.dupont@beeapic.fr",
  "phone": "+33 6 12 34 56 78",
  "siret": "123 456 789 00012",
  "photo": "images/beekeepers/marie.jpg",
  "logo": "images/beekeepers/beeapic-logo.png",
  "socialMedia": {
    "instagram": "https://instagram.com/beeapic",
    "facebook": "https://facebook.com/beeapic",
    "tiktok": "",
    "youtube": "https://youtube.com/@beeapic",
    "linkedin": ""
  }
}
```

### Exemple 2 : Apiculteur Minimal

```json
"CV": {
  "code": "CV",
  "type": "Apiculteur Récoltant",
  "firstName": "Vincent",
  "lastName": "Colas",
  "commercialName": "Colas Vincent",
  "address": "",
  "email": "",
  "phone": "",
  "siret": "",
  "photo": "",
  "logo": "",
  "socialMedia": {
    "instagram": "",
    "facebook": "",
    "tiktok": "",
    "youtube": "",
    "linkedin": ""
  }
}
```

## 🔄 Fonctionnement Technique

### 1. Détection du Code Apiculteur

Quand un numéro de lot est recherché, le système :
1. Vérifie si le numéro commence par 2-3 lettres majuscules suivies d'un tiret
2. Extrait le code apiculteur
3. Charge les données depuis `beekeepers.json`

### 2. Fusion des Données

Si des données existent dans l'API BeePerf ET dans le fichier JSON :
```javascript
data.beekeeper = {
    ...data.beekeeper, // Données de l'API (si présentes)
    ...beekeeperData   // Données du JSON (prioritaires)
};
```

**⚠️ Important** : Les données du fichier JSON sont **prioritaires** sur celles de l'API.

### 3. Affichage

L'interface affiche :
- ✅ Type d'apiculteur (badge)
- ✅ Nom et prénom
- ✅ Nom commercial
- ✅ Photo (ou placeholder)
- ✅ Logo (ou placeholder)
- ✅ Adresse
- ✅ Site web (lien cliquable)
- ✅ Email (lien cliquable)
- ✅ Téléphone (lien cliquable)
- ✅ SIRET
- ✅ Réseaux sociaux (uniquement ceux remplis)

## 🛠️ Maintenance

### Modifier un Apiculteur

1. Ouvrez `data/beekeepers.json`
2. Trouvez le code de l'apiculteur
3. Modifiez les informations
4. Sauvegardez le fichier
5. Rafraîchissez la page de l'interface

### Supprimer un Apiculteur

1. Ouvrez `data/beekeepers.json`
2. Supprimez l'entrée complète de l'apiculteur
3. Sauvegardez le fichier

**⚠️ Attention** : Si un numéro de lot référence un code apiculteur supprimé, les données proviendront de l'API uniquement.

## 📊 Validation du JSON

Avant de sauvegarder, validez votre JSON :
- **En ligne** : https://jsonlint.com/
- **Dans votre éditeur** : La plupart des éditeurs modernes valident automatiquement

### Erreurs Courantes

❌ **Virgule en trop** :
```json
{
  "code": "BA",
  "type": "Apiculteur",  // ← Virgule après le dernier champ
}
```

✅ **Correct** :
```json
{
  "code": "BA",
  "type": "Apiculteur"
}
```

❌ **Guillemets manquants** :
```json
{
  code: "BA"  // ← Pas de guillemets autour de la clé
}
```

✅ **Correct** :
```json
{
  "code": "BA"
}
```

## 🔐 Sécurité

### Données Publiques

⚠️ **Attention** : Toutes les données du fichier `beekeepers.json` sont **publiques** et accessibles par n'importe qui visitant votre site.

**Ne mettez JAMAIS** :
- ❌ Mots de passe
- ❌ Clés API
- ❌ Informations bancaires
- ❌ Données personnelles sensibles

### Données Recommandées

✅ **Mettez uniquement** :
- Nom et prénom (informations publiques)
- Email et téléphone professionnels
- Adresse professionnelle
- Liens vers réseaux sociaux publics

## 📞 Support

Pour toute question sur la gestion des apiculteurs, contactez l'équipe technique.

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2026-01-06

