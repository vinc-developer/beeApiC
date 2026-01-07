# 📝 Historique des versions - Bee Api'C Traçabilité

Toutes les modifications notables du projet sont documentées dans ce fichier.

---

## [3.6.4] - 2026-01-07

### 🎯 Positionnement du bouton "Nouvelle recherche"

#### Ajouté
- Bouton "Nouvelle recherche" repositionné en haut à gauche de la page
- Conteneur `.back-button-container` avec gestion de visibilité
- Position identique au bouton "Retour à la tracabilité"

#### Modifié
- `index.html` : Bouton déplacé avant la section résultats
- `js/ui.js` : Ajout de `backButtonContainer` avec show/hide
- `styles/components.css` : Style `.back-button-container` global

#### Améliorations UX
- ✅ Bouton immédiatement visible (pas de scroll)
- ✅ Cohérence totale entre les pages
- ✅ Navigation intuitive

---

## [3.6.3] - 2026-01-07

### 🎨 Uniformisation des boutons de retour

#### Modifié
- Bouton "Nouvelle recherche" utilise maintenant la classe `.btn-back`
- Ajout de l'icône flèche `←` sur le bouton "Nouvelle recherche"
- Style `.btn-back` centralisé dans `components.css`
- Suppression des styles dupliqués dans `beekeeper-page.css`

#### Résultat
- ✅ Style identique pour tous les boutons de retour
- ✅ Animation cohérente (déplacement de 4px vers la gauche)
- ✅ Code DRY et maintenable

---

## [3.6.2] - 2026-01-07

### 📏 Amélioration de l'affichage du type de miel

#### Modifié
- Badge type de miel avec `width: fit-content` (adapté au texte)
- Taille de police uniformisée à `font-size-base`
- Commentaire HTML mis à jour pour la section maison mère

#### Fichiers modifiés
- `styles/components.css` : Badge compact + tailles uniformes
- `index.html` : Commentaire "visible uniquement si pas de recherche"

#### Améliorations
- ✅ Badge plus compact et professionnel
- ✅ Taille de texte cohérente dans toute l'interface
- ✅ Meilleure utilisation de l'espace

---

## [3.6.1] - 2026-01-07

### 🟡 Badge Bee Api'C distinctif + Améliorations

#### Modifié
- **Couleur du badge Bee Api'C** : Orange → Jaune vif (#FDD835 → #F9A825)
- Ajout d'une bordure dorée (#F57F17) de 2px
- Texte en couleur foncée (meilleure lisibilité)
- Animation pulse-glow améliorée avec scale

#### Ajouté
- Badge Bee Api'C sur la page apiculteur (`beekeeper.html`)
- Description complète du type de miel dans la section produit
- Icône 🍯 pour le label "Type de miel"
- Fonction `extractBeekeeperCodeFromLot()` dans `beekeeper-page.js`

#### Fichiers modifiés
- `styles/components.css` : Nouvelle couleur badge + styles description
- `beekeeper.html` : Ajout du badge dans le profil
- `js/beekeeper-page.js` : Logique d'affichage du badge
- `js/ui.js` : Élément `honeyTypeDescription` + affichage
- `index.html` : Restructuration affichage type de miel

#### Résultat
- ✅ Badge Bee Api'C immédiatement reconnaissable (jaune vif)
- ✅ Cohérence sur toutes les pages
- ✅ Information complète sur le type de miel

---

## [3.6.0] - 2026-01-07

### 🎉 Version majeure - Fonctionnalités complètes

#### Ajouté
- **Masquage automatique de la section maison mère** lors de l'affichage des résultats
- **Badge "🐝 Miel Bee Api'C"** pour identifier la production maison (code BA)
- **Badge "🤝 Partenaire Bee Api'C"** pour les apiculteurs externes
- **Détection automatique du type de miel** à partir du numéro de lot
- **Badge type de miel** avec nom et description
- Support des formats de lots : `BA-2026-CH-0107`, `MC-2026-PA-2505`, etc.
- Fichier `data/honey-types.json` avec 8 types de miel pré-configurés
- Fonction `extractBeekeeperCode()` dans `ui.js`
- Fonction `extractHoneyType()` dans `ui.js`
- Fonction `loadHoneyTypeInfo()` dans `ui.js`

#### Modifié
- `index.html` : Ajout des badges et type de miel
- `js/ui.js` : Fonction `displayResults()` maintenant async
- `js/api.js` : Support extraction code apiculteur et type
- `styles/components.css` : Styles des 3 badges

#### Badges implémentés
- 🟡 **Miel Bee Api'C** : Jaune vif pour la production maison
- 🟠 **Partenaire** : Doré pour les apiculteurs externes
- 🟤 **Type de miel** : Orange/Brun avec description

#### Documentation
- `CHANGELOG-V3.6.md` : Détails techniques complets
- `GUIDE-NUMEROS-LOTS.md` : Guide des formats de lots
- `README-V3.6.md` : Vue d'ensemble de la version
- `QUICKSTART-V3.6.md` : Démarrage rapide
- `test-v3.6.html` : Tests unitaires
- `comparaison-badges.html` : Démo visuelle des badges

---

## [3.5.0] - 2025-12-XX

### Fonctionnalités de base

#### Ajouté
- Interface de recherche par numéro de lot
- Affichage des informations de traçabilité
- Page détaillée de l'apiculteur
- Réseaux sociaux avec vraies icônes Font Awesome
- Système de configuration externe (JSON)
- Section maison mère Bee Api'C
- Design responsive

#### Fichiers créés
- `index.html` : Page principale
- `beekeeper.html` : Page apiculteur
- `js/app.js`, `js/ui.js`, `js/api.js`, `js/config.js`
- `styles/main.css`, `styles/components.css`, `styles/variables.css`
- `data/beekeepers.json` : Base de données apiculteurs

---

## Types de modifications

- **Ajouté** : Nouvelles fonctionnalités
- **Modifié** : Changements dans les fonctionnalités existantes
- **Déprécié** : Fonctionnalités bientôt supprimées
- **Supprimé** : Fonctionnalités retirées
- **Corrigé** : Corrections de bugs
- **Sécurité** : Correctifs de sécurité

---

## Format des numéros de lots (depuis v3.6.0)

### Structure
```
[CODE]-[ANNÉE]-[TYPE]-[DATE]
```

### Codes apiculteurs
- **BA** : Bee Api'C (maison mère)
- **CV** : Colas Vincent
- **MC** : Matthieu Colas (partenaire)

### Types de miel
- **P** : Printemps
- **PA** : Acacia
- **CH** : Châtaignier
- **E** : Été
- **F** : Forêt
- **T** : Tilleul
- **L** : Lavande
- **TO** : Toutes Fleurs

### Exemples
- `BA-2026-CH-0107` : Bee Api'C, Châtaignier, 7 janvier
- `MC-2026-PA-2505` : Matthieu Colas, Acacia, 25 mai
- `BA-2026-CH2-1507` : Bee Api'C, Châtaignier cuve 2, 15 juillet

---

## Évolution de la structure

### v3.6.4 - Positionnement optimal
- Bouton retour en haut à gauche sur toutes les pages
- Navigation cohérente et intuitive

### v3.6.3 - Uniformisation
- Tous les boutons de retour identiques
- Centralisation du code CSS

### v3.6.2 - Peaufinage
- Badge type de miel compact
- Tailles de texte uniformes

### v3.6.1 - Distinction visuelle
- Badge Bee Api'C en jaune vif (très distinctif)
- Présence sur toutes les pages

### v3.6.0 - Fonctionnalités majeures
- Détection automatique du type de miel
- Badges pour identifier les producteurs
- Masquage intelligent de la section maison mère

---

## Fichiers de configuration

### data/beekeepers.json
Base de données des apiculteurs avec :
- Informations personnelles
- Coordonnées
- Photos et logos
- Réseaux sociaux
- Année de partenariat

### data/honey-types.json
Types de miel avec :
- Code (P, PA, CH, etc.)
- Nom complet
- Description

---

## Tests

### Tests unitaires (test-v3.6.html)
- Extraction du code apiculteur
- Extraction du type de miel
- Chargement des types de miel

### Tests manuels recommandés
1. `BA-2026-CH-0107` : Production Bee Api'C
2. `MC-2026-PA-2505` : Partenaire externe
3. Navigation complète (recherche → résultats → page apiculteur)

---

## Compatibilité

### Navigateurs supportés
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile iOS/Android

### Dépendances externes
- Font Awesome 6.5.1 (icônes réseaux sociaux)

---

## Roadmap

### Version 3.7 (à venir)
- [ ] Infobulles sur les badges
- [ ] Filtres par type de miel
- [ ] Page "À propos" du système
- [ ] Export PDF de la traçabilité
- [ ] Mode sombre

### Version 4.0 (futur)
- [ ] Authentification apiculteurs
- [ ] Gestion en ligne des profils
- [ ] Statistiques de consultation
- [ ] API publique

---

## Contributeurs

**Développement** : Équipe Bee Api'C  
**Design** : Interface moderne et responsive  
**Tests** : Validation complète des fonctionnalités

---

## Licence

© 2026 Bee Api'C - Tous droits réservés  
Code propriétaire

---

**Don't Panic, Bee Api'C ! 🐝✨**

*Dernière mise à jour : 7 janvier 2026*

