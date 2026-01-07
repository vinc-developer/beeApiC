# 📘 Guide Utilisateur - Bee Api'C Traçabilité

Guide complet pour utiliser l'interface de traçabilité du miel Bee Api'C.

---

## 📋 Table des matières

1. [Introduction](#introduction)
2. [Recherche de traçabilité](#recherche-de-traçabilité)
3. [Format des numéros de lots](#format-des-numéros-de-lots)
4. [Comprendre les badges](#comprendre-les-badges)
5. [Types de miel](#types-de-miel)
6. [Page apiculteur](#page-apiculteur)
7. [FAQ](#faq)

---

## Introduction

### Qu'est-ce que la traçabilité ?

La traçabilité permet de connaître l'origine exacte de votre pot de miel :
- Qui l'a produit (apiculteur)
- Où il a été récolté (localisation des ruches)
- Quand il a été extrait et mis en pot
- Quel type de miel il contient

### Comment ça marche ?

1. Trouvez le **numéro de lot** sur votre pot de miel
2. Entrez-le dans l'interface de traçabilité
3. Découvrez toutes les informations sur votre miel

---

## Recherche de traçabilité

### Méthode 1 : Saisie manuelle

1. Choisissez "Saisie manuelle"
2. Tapez le numéro de lot (ex: `BA-2026-CH-0107`)
3. Cliquez sur "Rechercher"

### Méthode 2 : Sélection dans une liste

1. Choisissez "Sélection dans la liste"
2. Sélectionnez votre numéro de lot dans le menu déroulant
3. Cliquez sur "Rechercher"

### Informations affichées

#### 🍯 Informations du produit
- **Numéro de lot** : Identifiant unique du miel
- **Type de miel** : Variété (Châtaignier, Acacia, etc.) avec description
- **Zone géographique** : Localisation des ruches
- **Environnement** : Description de l'environnement de production

#### 📅 Dates de production
- **Date(s) d'extraction** : Quand le miel a été extrait des cadres
- **Date de mise en pot** : Quand le miel a été conditionné

#### 👨‍🌾 Apiculteur producteur
- **Type** : Apiculteur Récoltant
- **Nom et prénom** : Identité de l'apiculteur
- **Nom commercial** : Marque ou entreprise
- **Badge** : Identification du producteur
- **Coordonnées** : Adresse, email, téléphone, site web
- **Réseaux sociaux** : Instagram, Facebook, TikTok, YouTube, LinkedIn

---

## Format des numéros de lots

### Structure générale

```
[CODE]-[ANNÉE]-[TYPE]-[DATE]
  ↓       ↓       ↓      ↓
2-3 lettres  4 chiffres  1-3 caractères  4 chiffres (optionnel)
```

### Exemples détaillés

#### Exemple 1 : Production Bee Api'C
```
BA-2026-CH-0107
│  │    │  │
│  │    │  └─ Date : 7 janvier (01/07)
│  │    └──── Type : Châtaignier (CH)
│  └───────── Année : 2026
└──────────── Code : Bee Api'C (BA)
```

#### Exemple 2 : Partenaire externe
```
MC-2026-PA-2505
│  │    │  │
│  │    │  └─ Date : 25 mai (25/05)
│  │    └──── Type : Acacia (PA)
│  └───────── Année : 2026
└──────────── Code : Matthieu Colas (MC)
```

#### Exemple 3 : Sans date spécifique
```
CV-2026-P
│  │    │
│  │    └──── Type : Printemps (P)
│  └───────── Année : 2026
└──────────── Code : Colas Vincent (CV)
```

#### Exemple 4 : Plusieurs cuves
```
BA-2026-CH2-1507
│  │    │ │ │
│  │    │ │ └─ Date : 15 juillet
│  │    │ └─── Numéro de cuve : 2
│  │    └───── Type : Châtaignier (CH)
│  └────────── Année : 2026
└───────────── Code : Bee Api'C (BA)
```

---

## Comprendre les badges

### 🟡 Badge "Miel Bee Api'C" (Jaune vif)

```
┌──────────────────────┐
│ 🐝 Miel Bee Api'C    │
└──────────────────────┘
```

**Quand l'afficher** :
- Code apiculteur = BA
- Miel produit directement par Bee Api'C

**Signification** :
- Production maison, entreprise locale
- Qualité Bee Api'C garantie
- Miel 100% local de Loire-Atlantique

**Couleur** : Jaune vif (#FDD835) avec bordure dorée

---

### 🟠 Badge "Partenaire Bee Api'C" (Doré)

```
┌─────────────────────────────────────┐
│ 🤝 Partenaire Bee Api'C depuis 2025 │
└─────────────────────────────────────┘
```

**Quand l'afficher** :
- Code apiculteur ≠ BA
- Apiculteur référencé comme partenaire

**Signification** :
- Miel produit par un apiculteur partenaire
- Vendu sous l'étiquette Bee Api'C
- Partenariat de confiance avec année de début

**Couleur** : Doré (#FFD700) → Orange (#FFA500)

---

### 🟤 Badge "Type de Miel" (Orange/Brun)

```
┌─────────────────────────────┐
│ Miel de Châtaignier         │
│ Miel corsé au goût prononcé │
└─────────────────────────────┘
```

**Quand l'afficher** :
- Type de miel détecté dans le numéro de lot
- Type reconnu dans la base de données

**Signification** :
- Variété spécifique du miel
- Caractéristiques gustatives
- Origine florale

**Couleur** : Orange (#F59E0B) → Brun (#D97706)

---

## Types de miel

### Catalogue complet

| Code | Nom | Description | Période |
|------|-----|-------------|---------|
| **P** | Miel de Printemps | Récolte de printemps, fleurs variées | Mars-Mai |
| **PA** | Miel d'Acacia | Miel doux et clair | Mai-Juin |
| **CH** | Miel de Châtaignier | Miel corsé au goût prononcé | Juin-Juillet |
| **E** | Miel d'Été | Récolte d'été, fleurs de saison | Juillet-Août |
| **F** | Miel de Forêt | Miel de miellat aux notes boisées | Été |
| **T** | Miel de Tilleul | Miel aromatique et bienfaisant | Juin-Juillet |
| **L** | Miel de Lavande | Miel parfumé aux notes florales | Juillet-Août |
| **TO** | Miel Toutes Fleurs | Mélange harmonieux de fleurs variées | Toute saison |

### Comment identifier le type ?

Le type de miel est encodé dans le numéro de lot :
- 1 lettre : `P`, `E`, `F`, `T`, `L`
- 2 lettres : `PA`, `CH`, `TO`
- 2 lettres + chiffre : `CH2`, `PA1` (numéro de cuve)

**Exemple** : `BA-2026-CH-0107` → Type **CH** = Miel de Châtaignier

---

## Page apiculteur

### Accéder à la page détaillée

1. Depuis les résultats de traçabilité
2. Cliquez sur le bouton "En savoir plus"
3. Découvrez le profil complet de l'apiculteur

### Informations disponibles

#### 📖 À propos
- Biographie de l'apiculteur
- Passion et philosophie
- Expérience

#### 🏞️ Mon exploitation
- Nombre de ruches
- Localisation précise
- Distance depuis Nantes
- Apiculteur depuis (année)

#### 📸 Galerie Photos
- Photos des ruches
- Photos du rucher
- Photos de l'apiculteur au travail
- Photos des produits

#### 📞 Contact
- Adresse postale complète
- Site web
- Email
- Téléphone
- SIRET

#### 🌐 Réseaux sociaux
- Instagram
- Facebook
- TikTok
- YouTube
- LinkedIn

*Uniquement les réseaux actifs sont affichés*

---

## FAQ

### Comment trouver le numéro de lot ?

Le numéro de lot est imprimé sur l'étiquette de votre pot de miel, généralement au dos ou sur le côté.

### Que faire si le numéro de lot n'est pas reconnu ?

1. Vérifiez que vous avez bien saisi le numéro complet
2. Respectez les majuscules et les tirets
3. Contactez Bee Api'C si le problème persiste

### Puis-je connaître l'emplacement exact des ruches ?

Pour des raisons de sécurité, seule la zone géographique générale est indiquée (ville/commune).

### Les informations sont-elles à jour ?

Oui, les informations sont mises à jour régulièrement par les apiculteurs et Bee Api'C.

### Puis-je contacter directement l'apiculteur ?

Oui ! Les coordonnées (email, téléphone, réseaux sociaux) sont disponibles sur la page de l'apiculteur.

### Pourquoi certains miels ont un badge "Partenaire" ?

Bee Api'C travaille avec des apiculteurs partenaires de confiance. Ces miels sont produits par des apiculteurs externes mais vendus sous l'étiquette Bee Api'C.

### Quelle est la différence entre "Miel Bee Api'C" et "Partenaire" ?

- **Miel Bee Api'C** (badge jaune) : Produit directement par Bee Api'C
- **Partenaire** (badge doré) : Produit par un apiculteur externe partenaire

Les deux garantissent la même qualité et traçabilité.

### Comment sont choisis les apiculteurs partenaires ?

Bee Api'C sélectionne des apiculteurs locaux (Loire-Atlantique) respectant des critères stricts de qualité et d'éthique.

### Puis-je visiter le rucher ?

Contactez directement l'apiculteur via les coordonnées fournies pour organiser une visite.

### Le miel est-il bio ?

Cette information n'est pas systématiquement affichée. Contactez l'apiculteur ou consultez l'étiquette du pot pour plus de détails.

### Puis-je commander directement auprès de l'apiculteur ?

Oui, utilisez les coordonnées sur la page de l'apiculteur pour passer commande directement.

---

## Glossaire

**Apiculteur Récoltant** : Apiculteur qui produit ET vend son propre miel

**Extraction** : Opération consistant à retirer le miel des cadres de ruche

**Mise en pot** : Conditionnement du miel dans les pots de vente

**Numéro de lot** : Identifiant unique permettant la traçabilité

**Miellat** : Substance sucrée produite par les pucerons, donnant le miel de forêt

**Traçabilité** : Capacité à retracer l'origine et le parcours d'un produit

---

## Support

**Questions** : bee.apic.pro@gmail.com  
**Site web** : https://bee-apic.sumupstore.com/  
**Téléphone** : +33 6 28 51 19 05

**Adresse** :  
Bee Api'C  
14 la Thibaudière  
44680 Saint-Hilaire-de-Chaléons  
Loire-Atlantique, France

---

**Don't Panic, Bee Api'C ! 🐝✨**

*Guide utilisateur - Version 3.6.4 - 7 janvier 2026*

