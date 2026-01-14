# Configuration EmailJS pour le formulaire de contact

## 🎯 EmailJS : Envoi d'emails SANS serveur backend

EmailJS permet d'envoyer des emails directement depuis le frontend (navigateur). **Aucun serveur backend nécessaire !**

---

## 📋 Étapes de configuration

### **1. Créer un compte EmailJS**

1. Aller sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquer sur **"Sign Up"** (gratuit jusqu'à 200 emails/mois)
3. Valider votre email

---

### **2. Configurer votre service d'email**

1. Dans le dashboard EmailJS, aller sur **"Email Services"**
2. Cliquer sur **"Add New Service"**
3. Choisir votre fournisseur (Gmail, Outlook, Yahoo, etc.)
4. Suivre les instructions de connexion
5. **Copier le Service ID** (ex: `service_abc123`)

> 💡 **Pour Gmail** : vous devrez peut-être créer un "App Password" dans les paramètres de sécurité Google

---

### **3. Créer un template d'email**

1. Aller sur **"Email Templates"**
2. Cliquer sur **"Create New Template"**
3. Utiliser ce template :

```
Nouveau message de contact depuis Bee Api'C

De : {{from_name}}
Email : {{from_email}}
Téléphone : {{phone}}

Message :
{{message}}

---
Envoyé via le formulaire de contact bee-apic.com
```

4. **Copier le Template ID** (ex: `template_xyz789`)

---

### **4. Récupérer votre Public Key**

1. Aller sur **"Account"** → **"General"**
2. Trouver votre **Public Key** (ex: `abcDEF123xyz`)

---

### **5. Configurer les variables d'environnement**

Créer/modifier le fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcDEF123xyz
```

> ⚠️ **Important** : Remplacer les valeurs par VOS propres identifiants EmailJS

---

### **6. Ajouter .env.local au .gitignore**

Vérifier que `.env.local` est bien dans votre `.gitignore` :

```gitignore
# Fichiers d'environnement locaux
.env*.local
```

---

## 🚀 C'est tout !

Le formulaire de contact est prêt à fonctionner. Aucun serveur backend nécessaire.

### **Fonctionnalités implémentées :**

✅ Envoi d'emails directement depuis le frontend  
✅ Validation des champs  
✅ Messages de succès/erreur  
✅ État de chargement pendant l'envoi  
✅ Désactivation du bouton pendant l'envoi  
✅ Réinitialisation du formulaire après envoi  
✅ Design harmonisé avec le reste du site  

---

## 📧 Test du formulaire

1. Démarrer votre application : `npm run dev`
2. Aller sur `/contact`
3. Remplir le formulaire
4. Cliquer sur "Envoyer le message"
5. Vérifier votre boîte mail configurée dans EmailJS

---

## 🎨 Variables EmailJS disponibles dans le template

Les variables suivantes sont envoyées au template :

- `{{from_name}}` : Nom de l'expéditeur
- `{{from_email}}` : Email de l'expéditeur
- `{{phone}}` : Téléphone (ou "Non renseigné")
- `{{message}}` : Message complet
- `{{to_email}}` : Votre email (depuis siteConfig)

---

## 💰 Limites du plan gratuit

- **200 emails/mois** (largement suffisant pour un site de contact)
- Si dépassement, passer au plan payant (9$/mois pour 1000 emails)

---

## 🔒 Sécurité

EmailJS utilise votre **Public Key** qui peut être exposée dans le code frontend. C'est normal et sécurisé car :

- La clé publique est faite pour être publique
- Vous pouvez limiter les domaines autorisés dans les paramètres EmailJS
- EmailJS a des protections contre le spam

### **Pour sécuriser davantage :**

1. Dans EmailJS → Account → Security
2. Ajouter votre domaine à la **Domain Whitelist** (ex: `bee-apic.com`)
3. Activer le **reCAPTCHA** (optionnel)

---

## 🐛 Dépannage

### **Erreur "Configuration EmailJS manquante"**
→ Vérifier que les 3 variables d'environnement sont bien définies dans `.env.local`

### **Erreur 403 (Forbidden)**
→ Vérifier que votre Service ID, Template ID et Public Key sont corrects

### **Email non reçu**
→ Vérifier les spams et que le service email est bien connecté dans EmailJS

### **Erreur CORS**
→ Ajouter votre domaine dans la whitelist EmailJS

---

## 📚 Documentation officielle

[https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

