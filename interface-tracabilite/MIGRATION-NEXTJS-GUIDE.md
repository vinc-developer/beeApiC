# 🚀 Migration vers Next.js - Guide Complet

## 📋 Plan de Migration

Transformation de l'application de traçabilité en une application Next.js moderne avec TypeScript.

---

## 🏗️ Nouvelle Architecture

```
bee-apic-nextjs/
├── app/                          # App Router Next.js 14
│   ├── layout.tsx               # Layout global
│   ├── page.tsx                 # Page d'accueil
│   ├── tracabilite/             # Module Traçabilité
│   │   ├── page.tsx            # Page principale traçabilité
│   │   └── [lotNumber]/        # Page détail d'un lot
│   │       └── page.tsx
│   ├── apiculteur/              # Module Apiculteur
│   │   └── [code]/             # Page détail apiculteur
│   │       └── page.tsx
│   ├── a-propos/                # Page À propos
│   │   └── page.tsx
│   └── api/                     # API Routes
│       ├── lots/
│       │   └── route.ts
│       └── apiculteurs/
│           └── route.ts
│
├── components/                   # Composants réutilisables
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── tracabilite/
│   │   ├── SearchForm.tsx
│   │   ├── ResultsDisplay.tsx
│   │   ├── ProductInfo.tsx
│   │   └── BeekeeperCard.tsx
│   ├── apiculteur/
│   │   ├── ProfileHeader.tsx
│   │   ├── Biography.tsx
│   │   ├── Gallery.tsx
│   │   └── ContactInfo.tsx
│   └── ui/                      # Composants UI génériques
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Loading.tsx
│
├── lib/                         # Utilitaires et helpers
│   ├── api/
│   │   ├── tracabilite.ts      # API calls traçabilité
│   │   └── apiculteurs.ts      # API calls apiculteurs
│   ├── utils/
│   │   ├── format.ts           # Formatage dates, etc.
│   │   ├── validation.ts       # Validation numéros de lots
│   │   └── extraction.ts       # Extraction codes, types
│   └── hooks/
│       ├── useTraceability.ts  # Hook personnalisé traçabilité
│       └── useBeekeeper.ts     # Hook personnalisé apiculteur
│
├── types/                       # Types TypeScript
│   ├── tracabilite.ts
│   ├── apiculteur.ts
│   └── index.ts
│
├── data/                        # Données statiques
│   ├── beekeepers.json
│   ├── traceability-data.json
│   └── honey-types.json
│
├── public/                      # Assets statiques
│   ├── images/
│   └── icons/
│
├── styles/                      # Styles globaux
│   └── globals.css
│
├── config/                      # Configuration
│   └── site.ts
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

---

## 📦 Installation

### 1. Créer le projet Next.js

```bash
cd C:\Users\vincolas\Applis\Projets\beeApiC
npx create-next-app@latest bee-apic-nextjs --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**Réponses aux questions :**
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **No**
- App Router: **Yes**
- Import alias: **Yes** (@/*)

### 2. Installer les dépendances supplémentaires

```bash
cd bee-apic-nextjs
npm install clsx class-variance-authority lucide-react date-fns
npm install -D @types/node
```

---

## 🔧 Configuration

### 1. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configuration du proxy API si nécessaire
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

### 2. tsconfig.json (mise à jour)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7e7',
          100: '#fdedc0',
          200: '#fce095',
          300: '#fbd36a',
          400: '#fac849',
          500: '#f9bd28',
          600: '#f8b724',
          700: '#f7ae1e',
          800: '#f6a618',
          900: '#f5980f',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [],
};
```

---

## 📝 Fichiers à Créer

### Types TypeScript

#### `types/tracabilite.ts`

```typescript
export interface Zone {
  publicName: string;
  environment: string;
}

export interface Production {
  extractionDates: string[];
  bottlingDate: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
}

export interface Beekeeper {
  code: string;
  useProxy: boolean;
  type: string;
  partnerSince?: string | number;
  firstName: string;
  lastName: string;
  commercialName?: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  siret: string;
  photo?: string;
  logo?: string;
  bio?: string;
  hivesCount?: string;
  location?: string;
  distance?: string;
  beekeeperSince?: string;
  gallery?: string[];
  socialMedia?: SocialMedia;
}

export interface TraceabilityData {
  lotNumber: string;
  zone: Zone;
  production: Production;
  beekeeper?: Beekeeper;
}

export interface HoneyType {
  code: string;
  name: string;
  description: string;
  color: string;
  season?: string;
}
```

#### `types/apiculteur.ts`

```typescript
import { Beekeeper } from './tracabilite';

export type { Beekeeper };

export interface BeekeeperWithLots extends Beekeeper {
  lots?: string[];
}
```

---

### Configuration

#### `config/site.ts`

```typescript
export const siteConfig = {
  name: "Bee Api'C",
  description: "Traçabilité du miel - De la ruche à votre table",
  slogan: "Don't Pannic, Bee Api'C !",
  label: "Miel 100% local de Loire Atlantique",
  url: "https://bee-apic.com",
  links: {
    facebook: "https://facebook.com/beeapic",
    instagram: "https://instagram.com/beeapic",
  },
  company: {
    name: "Bee Api'C",
    address: "bois des abeilles\n44680 Saint-Hilaire-de-Chaléons - France",
    email: "bee.apic@gmail.com",
    phone: "+33 6 06 06 06 06",
    siret: "910 020 346 00029",
  },
};
```

---

### Layout Global

#### `app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['miel', 'traçabilité', 'apiculture', 'Loire Atlantique', 'local'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

---

### Page d'Accueil

#### `app/page.tsx`

```typescript
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-primary-600">
          {siteConfig.name}
        </h1>
        <p className="text-2xl mb-2 text-gray-600">{siteConfig.slogan}</p>
        <p className="text-xl text-secondary-600 font-semibold">
          {siteConfig.label}
        </p>
      </section>

      {/* CTA Section */}
      <section className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          href="/tracabilite"
          className="group p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-primary-200 hover:border-primary-400"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🍯</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Traçabilité
            </h2>
            <p className="text-gray-600">
              Découvrez l'origine de votre pot de miel
            </p>
          </div>
        </Link>

        <Link
          href="/a-propos"
          className="group p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-secondary-200 hover:border-secondary-400"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🐝</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Nos Apiculteurs
            </h2>
            <p className="text-gray-600">
              Rencontrez nos producteurs passionnés
            </p>
          </div>
        </Link>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="text-4xl mb-3">🇫🇷</div>
          <h3 className="text-xl font-semibold mb-2">100% Local</h3>
          <p className="text-gray-600">
            Miel produit en Loire Atlantique
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Traçabilité Totale</h3>
          <p className="text-gray-600">
            De la ruche à votre table
          </p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-3">👨‍🌾</div>
          <h3 className="text-xl font-semibold mb-2">Apiculteurs Passionnés</h3>
          <p className="text-gray-600">
            Producteurs engagés et qualifiés
          </p>
        </div>
      </section>
    </div>
  );
}
```

---

## 🚀 Étapes de Migration

### Phase 1 : Setup Initial (Jour 1)
1. ✅ Créer le projet Next.js
2. ✅ Configurer TypeScript et Tailwind
3. ✅ Créer la structure de dossiers
4. ✅ Définir les types TypeScript

### Phase 2 : Migration des Données (Jour 1-2)
1. ✅ Copier les fichiers JSON dans `data/`
2. ✅ Créer les API routes
3. ✅ Créer les hooks personnalisés

### Phase 3 : Composants UI (Jour 2-3)
1. ✅ Créer les composants layout (Header, Footer)
2. ✅ Créer les composants UI réutilisables
3. ✅ Migrer les styles CSS vers Tailwind

### Phase 4 : Pages Traçabilité (Jour 3-4)
1. ✅ Page de recherche traçabilité
2. ✅ Page de résultats
3. ✅ Composants de recherche et d'affichage

### Phase 5 : Pages Apiculteur (Jour 4-5)
1. ✅ Page détail apiculteur
2. ✅ Composants profil, galerie, contact

### Phase 6 : Tests et Déploiement (Jour 5)
1. ✅ Tests de toutes les fonctionnalités
2. ✅ Optimisations performances
3. ✅ Déploiement

---

## 📚 Documentation Complète

Fichiers de documentation à créer :
- `docs/MIGRATION-NEXTJS.md` - Guide complet
- `docs/ARCHITECTURE-NEXTJS.md` - Architecture détaillée
- `docs/COMPOSANTS.md` - Documentation composants
- `docs/API-ROUTES.md` - Documentation API

---

## ✅ Avantages de Next.js

### Performance
- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Optimisation automatique des images
- ✅ Code splitting automatique

### Développement
- ✅ TypeScript natif
- ✅ Hot Module Replacement
- ✅ API Routes intégrées
- ✅ Routing automatique

### Production
- ✅ SEO optimisé
- ✅ Performance exceptionnelle
- ✅ Déploiement facile (Vercel)
- ✅ Scalabilité

---

**Date de création** : 2026-01-07  
**Version** : 4.0.0

🐝 **Don't Pannic, Bee Api'C !** 🍯

