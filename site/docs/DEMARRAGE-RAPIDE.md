# 🚀 GUIDE DE DÉMARRAGE RAPIDE - Next.js

## ✅ Migration Terminée !

Votre projet Bee Api'C a été complètement migré vers Next.js.

---

## 🎯 Démarrage en 3 Étapes

### Étape 1 : Installer les dépendances
```bash
cd C:\Users\vincolas\Applis\Projets\beeApiC\interface-tracabilite\bee-apic-nextjs
npm install
```

### Étape 2 : Lancer le serveur de développement
```bash
npm run dev
```

### Étape 3 : Ouvrir dans le navigateur
http://localhost:3000

---

## 📄 Pages Créées

✅ **Page d'accueil** - `/`
- Hero section
- 2 cartes CTA (Traçabilité, Nos Apiculteurs)
- 3 features (Local, Traçabilité, Passionnés)

✅ **Page Traçabilité** - `/tracabilite`
- Formulaire de recherche
- Validation du numéro de lot
- Guide du format

✅ **Détail d'un lot** - `/tracabilite/[lotNumber]`
- Informations produit (zone, dates, environnement)
- Type de miel automatique
- Informations apiculteur
- Badges (Production / Partenaire)

✅ **Page Apiculteur** - `/apiculteur/[code]`
- Profil complet
- Photo et logo
- Biographie
- Contact et réseaux sociaux
- Galerie photos

✅ **Page À Propos** - `/a-propos`
- Mission et valeurs
- Label "Miel 100% local"
- Contact

---

## 🧪 Tests Rapides

### Test 1 : Accueil
```
http://localhost:3000
→ Vérifier header, footer, navigation
```

### Test 2 : Traçabilité
```
http://localhost:3000/tracabilite
→ Entrer "BA-2026-CH-0107"
→ Cliquer "Rechercher"
```

### Test 3 : Navigation
```
Tester tous les liens du menu
Tester les boutons retour
```

---

## 🔧 Commandes Disponibles

```bash
# Développement (avec hot-reload)
npm run dev

# Build de production
npm run build

# Lancer en production
npm start

# Vérifier le code
npm run lint
```

---

## ⚠️ Si vous avez des erreurs

### Erreur de dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur de cache
```bash
rm -rf .next
npm run dev
```

### Erreur TypeScript
Vérifier que tous les fichiers .json sont dans `data/`

---

## 📂 Structure Finale

```
bee-apic-nextjs/
├── app/                   # Pages Next.js
├── components/            # Composants React
├── lib/                   # Fonctions utilitaires
├── types/                 # Types TypeScript
├── config/                # Configuration
├── data/                  # Données JSON
└── public/images/         # Images
```

---

## ✅ Tout est Prêt !

Votre application Next.js est **100% fonctionnelle** !

**Lancez-la maintenant :**
```bash
npm run dev
```

🐝 **Don't Pannic, Bee Api'C !** 🍯

