# 🚀 Guide de Démarrage Rapide - Formulaire de Contact EmailJS

## ⏱️ Configuration en 5 minutes

### **Étape 1 : Créer un compte EmailJS** (2 min)

1. Aller sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquer sur **Sign Up** (gratuit)
3. Valider votre email

---

### **Étape 2 : Configurer Gmail** (1 min)

1. Dans EmailJS → **Email Services** → **Add New Service**
2. Choisir **Gmail**
3. Se connecter avec votre compte Gmail
4. **Copier le Service ID** (ex: `service_abc123`)

> 💡 Si vous utilisez un autre email (Outlook, Yahoo), choisissez le service correspondant

---

### **Étape 3 : Créer le template** (1 min)

1. EmailJS → **Email Templates** → **Create New Template**
2. Coller ce contenu :

**Subject :**
```
Nouveau message de {{from_name}} - Bee Api'C
```

**Content :**
```
Nouveau message de contact depuis bee-apic.com

De : {{from_name}}
Email : {{from_email}}
Téléphone : {{phone}}

Message :
{{message}}
```

3. **Copier le Template ID** (ex: `template_xyz789`)

---

### **Étape 4 : Récupérer la Public Key** (30 sec)

1. EmailJS → **Account** → **General**
2. **Copier la Public Key** (ex: `abcDEF123xyz`)

---

### **Étape 5 : Configurer le projet** (30 sec)

Créer le fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcDEF123xyz
```

> ⚠️ Remplacer par VOS valeurs récupér��es aux étapes précédentes

---

## ✅ C'est prêt !

Démarrer le projet :
```bash
npm run dev
```

Tester le formulaire sur : `http://localhost:3000/contact`

---

## 🔒 Sécurité recommandée (optionnelle)

Pour éviter que quelqu'un utilise votre formulaire :

1. EmailJS → **Account** → **Security**
2. Ajouter votre domaine : `bee-apic.com`
3. Activer **Domain Whitelist**

---

## 📧 Recevoir les emails

Les emails seront envoyés à l'adresse Gmail que vous avez connectée à EmailJS.

Pour recevoir sur une autre adresse :
1. Dans EmailJS, modifier le template
2. Dans **Settings**, définir **To Email** avec l'adresse souhaitée

---

## ❓ Problème ?

**"Configuration EmailJS manquante"**
→ Vérifier que les 3 variables sont bien dans `.env.local`

**Email non reçu**
→ Vérifier les spams

**Erreur 403**
→ Vérifier Service ID, Template ID et Public Key

---

## 📚 Documentation complète

Voir `CONFIGURATION-EMAILJS.md` pour plus de détails.

