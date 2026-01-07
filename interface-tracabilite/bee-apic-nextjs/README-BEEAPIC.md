# 🐝 Bee Api'C - Interface de Traçabilité

Application Next.js pour la traçabilité du miel de la ruche à votre table.

## 🚀 Démarrage Rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Ouvrir http://localhost:3000
```

## 📋 Fonctionnalités

- ✅ **Traçabilité complète** - Recherche par numéro de lot
- ✅ **Profils apiculteurs** - Informations détaillées sur les producteurs
- ✅ **Multi-sources** - API Proxy BeePerf + JSON local
- ✅ **Badges intelligents** - Production Bee Api'C / Partenaires
- ✅ **Types de miel** - Détection automatique (Châtaignier, Acacia, etc.)
- ✅ **Design responsive** - Mobile, tablette, desktop
- ✅ **TypeScript** - Code typé et sécurisé

## 🏗️ Architecture

```
app/                  # Pages et routes
├── page.tsx         # Accueil
├── tracabilite/     # Module traçabilité
├── apiculteur/      # Module apiculteur
└── a-propos/        # Page à propos

components/          # Composants réutilisables
├── layout/          # Header, Footer
├── tracabilite/     # Composants traçabilité
└── ui/              # Composants UI génériques

lib/                 # Bibliothèques
├── api/             # Appels API
└── utils/           # Utilitaires

types/               # Types TypeScript
config/              # Configuration
data/                # Données JSON
```

## 📝 Format des Numéros de Lots

**Format :** `CODE-YYYY-TT-NNNN`

- **CODE** : Code apiculteur (2-3 lettres) - Ex: BA, MC, CV
- **YYYY** : Année de production - Ex: 2026
- **TT** : Type de miel (1-3 caractères) - Ex: CH, PA, TF
- **NNNN** : Numéro séquentiel - Ex: 0107

**Exemples :**
- `BA-2026-CH-0107` → Bee Api'C, 2026, Châtaignier, n°107
- `MC-2026-PA-2505` → Matthieu Colas, 2026, Printemps/Acacia, n°2505

## 🎨 Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **App Router** - Routing moderne
- **Server Components** - Performance optimale

## 📦 Scripts Disponibles

```bash
npm run dev      # Développement (port 3000)
npm run build    # Build de production
npm start        # Lancer en production
npm run lint     # Vérifier le code
```

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/tracabilite` | Recherche traçabilité |
| `/tracabilite/[lotNumber]` | Détail d'un lot |
| `/apiculteur/[code]` | Profil apiculteur |
| `/a-propos` | À propos de Bee Api'C |

## 🔧 Configuration

### Site
Configuration dans `config/site.ts` :
- Nom, slogan, label
- Coordonnées de l'entreprise
- Informations de contact

### Données
Fichiers JSON dans `data/` :
- `beekeepers.json` - Base de données apiculteurs
- `traceability-data.json` - Données de traçabilité locales
- `honey-types.json` - Types de miel disponibles

## 🐝 Apiculteurs

### Ajouter un Apiculteur

1. Éditer `data/beekeepers.json`
2. Ajouter un nouvel apiculteur avec son code
3. Définir `useProxy: true/false`

**Exemple :**
```json
{
  "AL": {
    "code": "AL",
    "useProxy": false,
    "firstName": "Alex",
    "lastName": "Lemiel",
    ...
  }
}
```

### Sources de Données

- **`useProxy: true`** → Données depuis API Proxy BeePerf
- **`useProxy: false`** → Données depuis `traceability-data.json`

## 📸 Images

Les images doivent être placées dans `public/images/` :
- Photos apiculteurs
- Logos
- Galeries photos

## 🎨 Couleurs

- **Primary** : Jaune doré `#f9bd28` - Bee Api'C
- **Secondary** : Vert `#22c55e` - Partenaires

## 📚 Documentation

- `MIGRATION-COMPLETE.md` - Guide de migration complet
- `DEMARRAGE-RAPIDE.md` - Démarrage rapide

## 🆘 Support

**Email :** bee.apic@gmail.com

## 📄 Licence

© 2026 Bee Api'C. Tous droits réservés.

---

🐝 **Don't Pannic, Bee Api'C !** 🍯

**Version :** 4.0.0  
**Date :** 2026-01-07

