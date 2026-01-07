# 🧪 Dossier Tests & Démonstrations

Ce dossier contient tous les fichiers de test, validation et démonstration du projet Bee Api'C - Interface de Traçabilité.

---

## 📁 Contenu

### 🧪 Tests Fonctionnels

#### **test-v3.6.html**
- Tests unitaires automatisés pour la version 3.6
- Tests d'extraction de code apiculteur
- Tests d'extraction de type de miel
- Tests de chargement des types de miel
- Interface interactive de validation

**Utilisation :**
```
Ouvrir test-v3.6.html dans un navigateur
```

#### **validation-v3.6.js**
- Script de validation pour la version 3.6
- Vérification des fichiers nécessaires
- Vérification des éléments DOM
- Vérification des fonctions UI et API

**Utilisation :**
```javascript
// Dans la console du navigateur (F12)
// Copier/coller le contenu du fichier
```

#### **validation-sources-donnees.js**
- Validation du système de gestion des sources de données
- Vérification des fichiers JSON (beekeepers, traceability-data)
- Tests de cohérence entre apiculteurs et lots
- Tests d'extraction du code apiculteur

**Utilisation :**
```javascript
// Dans la console du navigateur (F12)
// Copier/coller le contenu du fichier
```

---

### 🎨 Démonstrations Visuelles

#### **demo-icones.html**
- Démonstration des icônes de réseaux sociaux
- Affichage de toutes les icônes disponibles
- Tests de style et d'intégration

**Utilisation :**
```
Ouvrir demo-icones.html dans un navigateur
```

#### **comparaison-badges.html**
- Comparaison visuelle des différents badges
- Badge "Production Bee Api'C" (doré)
- Badge "Partenaire Bee Api'C" (vert)
- Explications détaillées et exemples

**Utilisation :**
```
Ouvrir comparaison-badges.html dans un navigateur
```

#### **visualisation-sources-donnees.html**
- Visualisation interactive du système de sources de données
- Diagramme de flux (API Proxy vs JSON local)
- Configuration actuelle des apiculteurs
- Tests en direct dans le navigateur

**Utilisation :**
```
Ouvrir visualisation-sources-donnees.html dans un navigateur
Cliquer sur "Lancer les Tests" pour voir les résultats
```

---

### 🧹 Scripts Utilitaires

#### **test.html**
- Page de test générale (version ancienne)
- Peut être supprimée si obsolète

#### **cleanup-docs-final.ps1**
- Script PowerShell de nettoyage de la documentation
- Suppression des fichiers .md obsolètes
- Affichage des fichiers restants

**Utilisation :**
```powershell
.\cleanup-docs-final.ps1
```

---

## 🚀 Tests Recommandés

### Après une Modification du Code

1. **Tests fonctionnels**
   ```
   Ouvrir tests/test-v3.6.html
   Vérifier que tous les tests passent
   ```

2. **Validation des sources de données**
   ```
   Ouvrir l'application principale (index.html)
   F12 → Console
   Copier/coller validation-sources-donnees.js
   Vérifier les résultats
   ```

3. **Tests visuels**
   ```
   Ouvrir tests/comparaison-badges.html
   Vérifier l'affichage des badges
   ```

---

### Après une Modification des Données

1. **Validation de cohérence**
   ```
   Console (F12) → validation-sources-donnees.js
   Vérifier qu'il n'y a pas d'erreurs
   ```

2. **Visualisation**
   ```
   Ouvrir tests/visualisation-sources-donnees.html
   Lancer les tests
   Vérifier la structure des données
   ```

---

## 📊 Fichiers par Catégorie

### Tests (3 fichiers)
- ✅ test-v3.6.html
- ✅ validation-v3.6.js
- ✅ validation-sources-donnees.js

### Démonstrations (3 fichiers)
- 🎨 demo-icones.html
- 🎨 comparaison-badges.html
- 🎨 visualisation-sources-donnees.html

### Utilitaires (1 fichier)
- 🧹 cleanup-docs-final.ps1

### Archive (1 fichier)
- 📦 test.html (ancienne version)

---

## 🔧 Maintenance

### Ajouter un Nouveau Test

1. Créer le fichier dans `tests/`
2. Documenter son utilisation dans ce README
3. Référencer dans la section appropriée

### Supprimer un Test Obsolète

1. Vérifier qu'il n'est plus référencé
2. Supprimer le fichier
3. Mettre à jour ce README

---

## 📝 Notes

- Ces fichiers **ne doivent pas** être déployés en production
- Ils sont uniquement pour le développement et les tests
- Garder ce dossier à jour avec les nouveaux tests

---

## 🆘 Support

Pour toute question sur les tests :
- Consulter la documentation principale
- Contacter : **bee.apic@gmail.com**

---

**Dernière mise à jour** : 2026-01-07  
**Version** : 3.8.0

🐝 **Don't Pannic, Bee Api'C !** 🍯

