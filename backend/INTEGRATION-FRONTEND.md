# 🔗 Guide d'intégration Frontend ↔ Backend

Ce guide explique comment connecter votre frontend Next.js (dans `/site`) avec le nouveau backend API (dans `/backend`).

## 📋 Modifications à effectuer dans le frontend

### 1. Configuration de l'URL de l'API

Créer ou modifier le fichier de configuration dans votre frontend :

**`site/config/api.ts`**
```typescript
// Configuration de l'URL de l'API backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Endpoints
export const API_ENDPOINTS = {
  beekeepers: {
    list: `${API_BASE_URL}/beekeepers`,
    byCode: (code: string) => `${API_BASE_URL}/beekeepers/${code}`,
  },
  honeyTypes: {
    list: `${API_BASE_URL}/honey-types`,
    byCode: (code: string) => `${API_BASE_URL}/honey-types/${code}`,
  },
  products: {
    list: `${API_BASE_URL}/products`,
    bySlug: (slug: string) => `${API_BASE_URL}/products/${slug}`,
    byCategory: (category: string) => `${API_BASE_URL}/products/category/${category}`,
  },
  lots: {
    list: `${API_BASE_URL}/lots`,
    byLotNumber: (lotNumber: string) => `${API_BASE_URL}/lots/${lotNumber}`,
  },
  traceability: {
    byLotNumber: (lotNumber: string) => `${API_BASE_URL}/traceability/${lotNumber}`,
  },
  beeperf: {
    byLotNumber: (lotNumber: string) => `${API_BASE_URL}/beeperf/numero-lot/${lotNumber}`,
    lotsList: `${API_BASE_URL}/beeperf/numeros-lots`,
  },
};
```

### 2. Variable d'environnement

**`site/.env.local`**
```env
# URL de l'API backend (développement)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# URL de l'API backend (production)
# NEXT_PUBLIC_API_URL=https://api.bee-apic.com/api
```

### 3. Remplacer les imports de fichiers JSON

#### Avant (avec JSON statiques)
```typescript
import beekeepersData from '@/data/beekeepers.json';
import productsData from '@/data/products.json';
```

#### Après (avec API)
```typescript
import { API_ENDPOINTS } from '@/config/api';

// Récupérer les apiculteurs
async function getBeekeepers() {
  const response = await fetch(API_ENDPOINTS.beekeepers.list);
  const data = await response.json();
  return data.data; // Les données sont dans data.data avec pagination
}

// Récupérer un apiculteur par code
async function getBeekeeperByCode(code: string) {
  const response = await fetch(API_ENDPOINTS.beekeepers.byCode(code));
  const data = await response.json();
  return data.data;
}
```

### 4. Créer des fonctions utilitaires pour l'API

**`site/lib/api-client.ts`**
```typescript
import { API_BASE_URL } from '@/config/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // ou 'force-cache' selon vos besoins
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error(result.error || 'API request failed');
  }

  return result.data;
}

export async function apiGetList<T>(
  endpoint: string,
  params?: { page?: number; per_page?: number; [key: string]: any }
): Promise<PaginatedResponse<T>> {
  const searchParams = new URLSearchParams();
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
  }

  const url = `${API_BASE_URL}${endpoint}${searchParams.toString() ? `?${searchParams}` : ''}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function apiPost<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error(result.error || 'API request failed');
  }

  return result.data;
}
```

### 5. Exemples de migration des pages

#### Page apiculteurs (`site/app/apiculteurs/page.tsx`)

**Avant :**
```typescript
import beekeepersData from '@/data/beekeepers.json';

export default function ApiculteursPage() {
  const beekeepers = Object.values(beekeepersData.beekeepers);
  
  return (
    <div>
      {beekeepers.map(bk => (
        <div key={bk.code}>{bk.commercialName}</div>
      ))}
    </div>
  );
}
```

**Après :**
```typescript
import { apiGetList } from '@/lib/api-client';

interface Beekeeper {
  code: string;
  commercialName: string;
  // ... autres propriétés
}

export default async function ApiculteursPage() {
  const response = await apiGetList<Beekeeper>('/beekeepers', { per_page: 100 });
  const beekeepers = response.data;
  
  return (
    <div>
      {beekeepers.map(bk => (
        <div key={bk.code}>{bk.commercialName}</div>
      ))}
    </div>
  );
}
```

#### Page apiculteur détail (`site/app/apiculteur/[code]/page.tsx`)

**Avant :**
```typescript
import beekeepersData from '@/data/beekeepers.json';

export default function ApiculteurPage({ params }: { params: { code: string } }) {
  const beekeeper = beekeepersData.beekeepers[params.code];
  
  if (!beekeeper) {
    return <div>Apiculteur non trouvé</div>;
  }
  
  return <div>{beekeeper.commercialName}</div>;
}
```

**Après :**
```typescript
import { apiGet } from '@/lib/api-client';

interface Beekeeper {
  code: string;
  commercialName: string;
  // ... autres propriétés
}

export default async function ApiculteurPage({ 
  params 
}: { 
  params: Promise<{ code: string }> 
}) {
  const { code } = await params;
  
  try {
    const beekeeper = await apiGet<Beekeeper>(`/beekeepers/${code}`);
    return <div>{beekeeper.commercialName}</div>;
  } catch (error) {
    return <div>Apiculteur non trouvé</div>;
  }
}
```

#### Page traçabilité (`site/app/tracabilite/lot/[lotNumber]/page.tsx`)

**Avant :**
```typescript
import traceabilityData from '@/data/traceability-data.json';

export default function TraceabilityPage({ params }: { params: { lotNumber: string } }) {
  const lot = traceabilityData.lots[params.lotNumber];
  
  return <div>{lot?.lotNumber}</div>;
}
```

**Après :**
```typescript
import { apiGet } from '@/lib/api-client';

interface TraceabilityData {
  lot: {
    lotNumber: string;
    humidity?: string;
  };
  beekeeper: {
    code: string;
    commercialName: string;
  };
  honeyType?: {
    name: string;
  };
  zones: Array<{
    lieuxRucher: string;
    environnement?: string;
  }>;
  production?: {
    datesRecolte: string[];
    datesExtractions: string[];
    datesConditionnement: string[];
  };
}

export default async function TraceabilityPage({ 
  params 
}: { 
  params: Promise<{ lotNumber: string }> 
}) {
  const { lotNumber } = await params;
  
  try {
    const data = await apiGet<TraceabilityData>(`/traceability/${lotNumber}`);
    
    return (
      <div>
        <h1>Lot {data.lot.lotNumber}</h1>
        <p>Apiculteur: {data.beekeeper.commercialName}</p>
        {data.honeyType && <p>Type: {data.honeyType.name}</p>}
        {/* ... */}
      </div>
    );
  } catch (error) {
    return <div>Lot non trouvé</div>;
  }
}
```

#### Page produits (`site/app/mes-miels/page.tsx`)

**Avant :**
```typescript
import productsData from '@/data/products.json';

export default function MielsPage() {
  const products = productsData.products.filter(p => p.category === 'miel');
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**Après :**
```typescript
import { apiGetList } from '@/lib/api-client';

interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export default async function MielsPage() {
  const response = await apiGetList<Product>('/products/category/miel', {
    in_stock: true,
  });
  const products = response.data;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.slug}>{product.name}</div>
      ))}
    </div>
  );
}
```

### 6. Gestion du cache Next.js

Pour optimiser les performances, vous pouvez configurer le cache :

```typescript
// Cache statique (régénéré toutes les heures)
export const revalidate = 3600;

// Ou cache dynamique
export const dynamic = 'force-dynamic';

// Ou ISR (Incremental Static Regeneration)
const response = await fetch(url, {
  next: { revalidate: 3600 } // Revalide toutes les heures
});
```

### 7. Composant de chargement

**`site/components/LoadingSpinner.tsx`**
```typescript
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  );
}
```

### 8. Gestion des erreurs

**`site/components/ErrorMessage.tsx`**
```typescript
interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-800">{message}</p>
      {retry && (
        <button 
          onClick={retry}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}
```

## 🚀 Démarrage en développement

1. **Démarrer le backend** :
   ```bash
   cd backend
   npm run dev
   # Le backend écoute sur http://localhost:3001
   ```

2. **Démarrer le frontend** :
   ```bash
   cd site
   npm run dev
   # Le frontend écoute sur http://localhost:3000
   ```

## 📝 Points d'attention

1. **Suppression des fichiers JSON** : Une fois l'intégration terminée, vous pouvez supprimer ou archiver les fichiers JSON dans `site/data/` (mais gardez-les en backup au cas où).

2. **Types TypeScript** : Vous pouvez copier les types depuis `backend/types/` vers `site/types/` pour avoir les mêmes interfaces.

3. **Gestion d'erreurs** : Toujours prévoir des fallbacks et messages d'erreur clairs.

4. **Performance** : Utilisez le cache Next.js (ISR) pour les données qui changent peu souvent.

5. **SEO** : Les données récupérées côté serveur (Server Components) sont bonnes pour le SEO.

## 🔄 Migration progressive

Vous pouvez migrer page par page :
1. Commencer par les pages simples (liste des apiculteurs)
2. Puis les pages avec paramètres (détail apiculteur)
3. Ensuite les pages complexes (traçabilité)
4. Garder un fallback sur les JSON pendant la migration

## 🎯 Prochaines étapes recommandées

1. ✅ Backend prêt et fonctionnel
2. 🔄 Migrer les pages du frontend une par une
3. 🧪 Tester chaque page après migration
4. 🗑️ Supprimer les fichiers JSON une fois terminé
5. 🚀 Déployer en production

---

Besoin d'aide pour migrer une page spécifique ? N'hésitez pas !
