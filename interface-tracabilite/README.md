# 🐝 Bee Api'C - Interface de Traçabilité du Miel

![Version](https://img.shields.io/badge/version-3.6.4-yellow)
![License](https://img.shields.io/badge/license-Propriétaire-orange)

## 📋 Vue d'ensemble

Interface web de traçabilité du miel permettant aux clients de suivre l'origine de leur pot de miel grâce à un numéro de lot. Cette application met en relation les consommateurs avec les apiculteurs producteurs.

### 🎯 Fonctionnalités principales

- ✅ **Recherche par numéro de lot** - Saisie manuelle ou sélection dans une liste
- ✅ **Traçabilité complète** - Dates d'extraction, mise en pot, zone géographique
- ✅ **Identification du producteur** - Informations détaillées sur l'apiculteur
- ✅ **Détection automatique du type de miel** - À partir du numéro de lot
- ✅ **Badges distinctifs** - Production Bee Api'C vs Partenaires
- ✅ **Page apiculteur détaillée** - Bio, galerie photos, contact, réseaux sociaux
- ✅ **Interface responsive** - Adaptée mobile, tablette et desktop

---

## 🚀 Démarrage rapide

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local ou hébergement web
- Node.js (pour le proxy API optionnel)

### Installation

1. **Cloner ou télécharger le projet**
```bash
git clone [URL_DU_PROJET]
cd interface-tracabilite
```

2. **Ouvrir directement dans le navigateur**
```bash
# Ouvrir index.html dans votre navigateur
# Ou utiliser un serveur local
```

3. **Configuration du proxy API (optionnel)**
```bash
npm install
# Configurer .env avec votre clé API BeePerf
npm start
```

### Première utilisation

1. Ouvrir `index.html` dans votre navigateur
2. Tester avec un numéro de lot : `BA-2026-CH-0107`
3. Explorer les résultats de traçabilité
4. Cliquer sur "En savoir plus" pour voir le profil de l'apiculteur

---

## 📖 Documentation

### Pour les utilisateurs
- **[GUIDE-UTILISATEUR.md](./GUIDE-UTILISATEUR.md)** - Guide complet d'utilisation
  - Format des numéros de lots
  - Codes apiculteurs
  - Types de miel
  - Badges et leur signification

### Pour les développeurs
- **[GUIDE-DEVELOPPEUR.md](./GUIDE-DEVELOPPEUR.md)** - Documentation technique
  - Architecture du projet
  - Structure des fichiers
  - API et intégration
  - Configuration et personnalisation

### Historique
- **[CHANGELOG.md](./CHANGELOG.md)** - Historique complet des versions
  - v3.6.4 - Positionnement boutons
  - v3.6.3 - Uniformisation boutons
  - v3.6.2 - Type de miel compact
  - v3.6.1 - Badge Bee Api'C distinctif
  - v3.6.0 - Fonctionnalités majeures

---

## 🏗️ Structure du projet

```
interface-tracabilite/
├── index.html              # Page principale
├── beekeeper.html          # Page détail apiculteur
├── comparaison-badges.html # Démo des badges
├── test-v3.6.html         # Tests unitaires
│
├── js/                     # Scripts JavaScript
│   ├── app.js             # Application principale
│   ├── ui.js              # Gestion de l'interface
│   ├── api.js             # Communication API
│   ├── config.js          # Configuration
│   └── beekeeper-page.js  # Page apiculteur
│
├── styles/                 # Feuilles de style
│   ├── main.css           # Styles principaux
│   ├── components.css     # Composants réutilisables
│   ├── variables.css      # Variables CSS
│   └── beekeeper-page.css # Styles page apiculteur
│
├── data/                   # Données de configuration
│   ├── beekeepers.json    # Base de données apiculteurs
│   └── honey-types.json   # Types de miel
│
├── images/                 # Images et logos
│
└── docs/                   # Documentation
    ├── README.md
    ├── CHANGELOG.md
    ├── GUIDE-UTILISATEUR.md
    └── GUIDE-DEVELOPPEUR.md
```

---

## 🎨 Format des numéros de lots

### Structure
```
[CODE]-[ANNÉE]-[TYPE]-[DATE]
  2-3     4      1-3    4
lettres chiffres lettres chiffres
                +chiffre (optionnel)
```

### Exemples
- `BA-2026-CH-0107` → Bee Api'C, Châtaignier, 7 janvier 2026
- `MC-2026-PA-2505` → Matthieu Colas (partenaire), Acacia, 25 mai 2026
- `CV-2026-P` → Colas Vincent, Printemps
- `BA-2026-CH2-1507` → Bee Api'C, Châtaignier cuve 2, 15 juillet

### Codes apiculteurs
- **BA** - Bee Api'C (maison mère)
- **CV** - Colas Vincent
- **MC** - Matthieu Colas (partenaire)

### Types de miel
- **P** - Printemps | **PA** - Acacia | **CH** - Châtaignier
- **E** - Été | **F** - Forêt | **T** - Tilleul
- **L** - Lavande | **TO** - Toutes Fleurs

---

## 🎯 Badges et signification

### 🟡 Badge "Miel Bee Api'C" (Jaune vif)
- **Quand** : Code apiculteur = BA
- **Signification** : Miel produit directement par Bee Api'C
- **Couleur** : Jaune vif (#FDD835) avec bordure dorée

### 🟠 Badge "Partenaire Bee Api'C" (Doré)
- **Quand** : Code ≠ BA + apiculteur partenaire
- **Signification** : Miel produit par un apiculteur externe partenaire
- **Couleur** : Doré (#FFD700) avec année de partenariat

### 🟤 Badge "Type de Miel" (Orange/Brun)
- **Quand** : Type détecté dans le numéro de lot
- **Signification** : Variété de miel avec description
- **Couleur** : Orange/Brun (#F59E0B)

---

## ⚙️ Configuration

### Ajouter un apiculteur
Éditer `data/beekeepers.json` :
```json
{
  "beekeepers": {
    "XX": {
      "type": "Apiculteur Récoltant",
      "firstName": "Prénom",
      "lastName": "Nom",
      "commercialName": "Nom commercial",
      "address": "Adresse complète",
      "email": "email@example.com",
      "phone": "+33 X XX XX XX XX",
      "website": "https://example.com",
      "siret": "XXX XXX XXX XXXXX",
      "photo": "dossier/photo.jpg",
      "logo": "dossier/logo.jpg",
      "partnerSince": "2026",
      "socialMedia": {
        "instagram": "https://instagram.com/...",
        "facebook": "https://facebook.com/..."
      }
    }
  }
}
```

### Ajouter un type de miel
Éditer `data/honey-types.json` :
```json
{
  "honeyTypes": {
    "BR": {
      "name": "Miel de Bruyère",
      "description": "Miel ambré aux notes maltées"
    }
  }
}
```

---

## 🧪 Tests

### Tests unitaires
Ouvrir `test-v3.6.html` pour exécuter les tests automatisés :
- Extraction du code apiculteur
- Extraction du type de miel
- Chargement des données

### Tests manuels
1. **Test production Bee Api'C** : `BA-2026-CH-0107`
2. **Test partenaire** : `MC-2026-PA-2505`
3. **Navigation complète** : Recherche → Résultats → Page apiculteur

---

## 🔧 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec variables CSS
- **JavaScript ES6+** - Programmation modulaire
- **Font Awesome 6** - Icônes réseaux sociaux
- **Fetch API** - Requêtes asynchrones
- **LocalStorage** - Stockage temporaire des données

---

## 📱 Compatibilité

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile iOS/Android
- ✅ Tablettes

---

## 🤝 Contribution

Pour contribuer au projet :
1. Lire `GUIDE-DEVELOPPEUR.md`
2. Créer une branche pour vos modifications
3. Tester avec `test-v3.6.html`
4. Documenter les changements dans `CHANGELOG.md`

---

## 📞 Support

**Email** : bee.apic.pro@gmail.com  
**Site web** : [bee-apic.com](https://bee-apic.sumupstore.com/)  
**Téléphone** : +33 6 28 51 19 05

---

## 📄 Licence

© 2026 Bee Api'C - Tous droits réservés  
Code propriétaire - Utilisation réservée à Bee Api'C

---

## 🎉 Crédits

**Développement** : Interface de traçabilité Bee Api'C  
**Design** : Interface moderne et responsive  
**Entreprise** : Bee Api'C - Miel 100% local de Loire-Atlantique

---

**Don't Panic, Bee Api'C ! 🐝✨**

*Dernière mise à jour : 7 janvier 2026 - Version 3.6.4*

