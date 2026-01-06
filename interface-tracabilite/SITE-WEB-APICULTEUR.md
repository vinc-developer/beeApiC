# 🌐 Ajout du Site Web de l'Apiculteur

## ✅ Fonctionnalité Ajoutée

Un nouveau champ **Site Web** a été ajouté aux informations de l'apiculteur.

---

## 🎯 Affichage

### Position
Le site web s'affiche dans la section "Votre apiculteur", juste après l'adresse et avant l'email :

```
📍 Adresse : ...
🌐 Site Web : beeapic.fr          ← NOUVEAU
📧 Email : ...
📱 Téléphone : ...
🏢 SIRET : ...
```

### Comportement
- **Si renseigné** : Affiche le nom de domaine (sans `www.`) et est cliquable
- **Si vide** : Affiche `-` et n'est pas cliquable
- **Clic** : Ouvre le site dans un nouvel onglet

---

## 📁 Fichiers Modifiés

### 1. `data/beekeepers.json`

Ajout du champ `website` pour chaque apiculteur :

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
      "website": "https://www.beeapic.fr",  ← NOUVEAU
      "siret": "123 456 789 00012",
      // ...
    }
  }
}
```

### 2. `index.html`

Ajout de l'élément HTML :

```html
<div class="beekeeper-info-item">
    <span class="info-icon">🌐</span>
    <div class="info-content">
        <span class="info-small-label">Site Web</span>
        <a href="#" class="info-link" id="beekeeperWebsite" 
           target="_blank" rel="noopener noreferrer">-</a>
    </div>
</div>
```

### 3. `js/ui.js`

**Élément DOM ajouté** :
```javascript
beekeeperWebsite: document.getElementById('beekeeperWebsite'),
```

**Logique d'affichage** :
```javascript
// Site web (lien cliquable)
if (beekeeper.website) {
    // Extraire le nom de domaine pour l'affichage
    let displayUrl = beekeeper.website;
    try {
        const url = new URL(beekeeper.website);
        displayUrl = url.hostname.replace('www.', '');
    } catch (e) {
        // Si l'URL n'est pas valide, afficher telle quelle
    }
    elements.beekeeperWebsite.textContent = displayUrl;
    elements.beekeeperWebsite.href = beekeeper.website;
} else {
    elements.beekeeperWebsite.textContent = '-';
    elements.beekeeperWebsite.removeAttribute('href');
}
```

### 4. `js/api.js`

Mise à jour des données mockées :
```javascript
beekeeper: {
    type: 'Apiculteur Récoltant',
    firstName: 'Jean',
    lastName: 'Dupont',
    commercialName: 'Les Ruchers du Val de Loire',
    address: '123 Chemin des Abeilles\n37000 Tours\nFrance',
    email: 'contact@ruchersduval.fr',
    phone: '+33 2 47 12 34 56',
    website: 'https://www.ruchersduval.fr',  ← NOUVEAU
    siret: '123 456 789 00012',
    // ...
}
```

### 5. `GUIDE-APICULTEURS.md`

Documentation mise à jour avec le nouveau champ.

---

## 💡 Formatage Automatique de l'URL

### Affichage Intelligent

Le système extrait automatiquement le nom de domaine pour un affichage propre :

| URL Complète | Affichage |
|--------------|-----------|
| `https://www.beeapic.fr` | `beeapic.fr` |
| `http://beeapic.fr/boutique` | `beeapic.fr` |
| `https://www.ruchersduval.fr/contact` | `ruchersduval.fr` |

**Avantages** :
- Plus lisible
- Évite les URLs trop longues
- Supprime automatiquement `www.`

---

## 📝 Utilisation

### Ajouter un Site Web

Dans `data/beekeepers.json`, ajoutez simplement l'URL complète :

```json
{
  "code": "BA",
  "type": "Apiculteur Récoltant",
  "firstName": "Bee",
  "lastName": "Api'C",
  "commercialName": "Bee Api'C",
  "address": "...",
  "email": "contact@beeapic.fr",
  "phone": "+33 1 23 45 67 89",
  "website": "https://www.beeapic.fr",  ← Ajouter ici
  "siret": "...",
  // ...
}
```

### Formats Acceptés

Tous les formats d'URL sont acceptés :

✅ `https://www.monsite.fr`  
✅ `http://monsite.fr`  
✅ `https://monsite.fr/page`  
✅ `www.monsite.fr` (sera cliquable tel quel)

### Sans Site Web

Si l'apiculteur n'a pas de site, laissez le champ vide :

```json
"website": "",
```

**Résultat** : Affiche `-` et le lien n'est pas cliquable.

---

## 🎨 Rendu Visuel

### Avec Site Web

```
┌────────────────────────────────────┐
│ 🌐 Site Web                        │
│    beeapic.fr  ← Cliquable         │
└────────────────────────────────────┘
```

Au survol :
- Texte devient bleu plus foncé
- Curseur en forme de pointeur
- Soulignement apparaît

### Sans Site Web

```
┌────────────────────────────────────┐
│ 🌐 Site Web                        │
│    -           ← Non cliquable     │
└────────────────────────────────────┘
```

---

## 🔒 Sécurité

### Attributs de Sécurité

Le lien utilise les attributs de sécurité recommandés :

```html
<a href="https://www.beeapic.fr" 
   target="_blank"           ← Ouvre dans nouvel onglet
   rel="noopener noreferrer" ← Protection contre exploits
>
```

**Protection** :
- `target="_blank"` : Ouvre dans un nouvel onglet
- `rel="noopener"` : Empêche l'accès à `window.opener`
- `rel="noreferrer"` : Ne transmet pas l'URL de référence

---

## ✨ Exemples

### Exemple 1 : Apiculteur avec Site

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
  "website": "https://www.beeapic.fr",
  "siret": "123 456 789 00012"
}
```

**Résultat** :
- Adresse : 15 Rue des Fleurs, 44000 Nantes, France
- **Site Web** : **beeapic.fr** (cliquable)
- Email : marie.dupont@beeapic.fr
- Téléphone : +33 6 12 34 56 78
- SIRET : 123 456 789 00012

### Exemple 2 : Apiculteur sans Site

```json
"CV": {
  "code": "CV",
  "type": "Apiculteur Récoltant",
  "firstName": "Vincent",
  "lastName": "Colas",
  "commercialName": "Colas Vincent",
  "address": "456 Avenue du Miel\n69000 Lyon\nFrance",
  "email": "vincent.colas@example.fr",
  "phone": "+33 6 12 34 56 78",
  "website": "",
  "siret": "987 654 321 00021"
}
```

**Résultat** :
- Adresse : 456 Avenue du Miel, 69000 Lyon, France
- Site Web : -
- Email : vincent.colas@example.fr
- Téléphone : +33 6 12 34 56 78
- SIRET : 987 654 321 00021

---

## 📱 Responsive

Le site web s'affiche correctement sur tous les appareils :

### Desktop
```
📍 Adresse    : 123 Rue...    🌐 Site Web  : beeapic.fr
📧 Email      : contact@...   📱 Téléphone : +33 6...
```

### Mobile
```
📍 Adresse
   123 Rue...
   
🌐 Site Web
   beeapic.fr
   
📧 Email
   contact@...
```

---

## 🎯 Informations Complètes

Avec l'ajout du site web, la section apiculteur affiche maintenant **10 informations** :

1. ✅ Type d'apiculteur (badge)
2. ✅ Nom et prénom
3. ✅ Nom commercial
4. ✅ Photo
5. ✅ Logo
6. ✅ Adresse
7. ✅ **Site web** ← NOUVEAU
8. ✅ Email
9. ✅ Téléphone
10. ✅ SIRET
11. ✅ Réseaux sociaux (section séparée)

---

## 🚀 Migration

### Apiculteurs Existants

Pour les apiculteurs déjà créés dans `beekeepers.json`, ajoutez simplement le champ `website` :

**Avant** :
```json
{
  "code": "BA",
  "email": "contact@beeapic.fr",
  "phone": "+33 1 23 45 67 89",
  "siret": "123 456 789 00012"
}
```

**Après** :
```json
{
  "code": "BA",
  "email": "contact@beeapic.fr",
  "phone": "+33 1 23 45 67 89",
  "website": "https://www.beeapic.fr",  ← Ajouter
  "siret": "123 456 789 00012"
}
```

---

## ✅ Résumé

Le champ **Site Web** est maintenant :

✅ **Intégré** dans le fichier JSON  
✅ **Affiché** dans l'interface  
✅ **Cliquable** (nouvel onglet)  
✅ **Sécurisé** (noopener, noreferrer)  
✅ **Formaté** automatiquement (extraction du domaine)  
✅ **Responsive** sur tous les appareils  
✅ **Documenté** dans le guide  

**L'interface de traçabilité est encore plus complète ! 🌐**

---

**Version** : 2.2.0  
**Date** : 2026-01-06  
**Ajout** : Champ Site Web de l'apiculteur

