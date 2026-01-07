import { TraceabilityData, Beekeeper, LotsGroupedByBeekeeper } from '@/types';
import beekeepersData from '@/data/beekeepers.json';
import traceabilityData from '@/data/traceability-data.json';
import { extractBeekeeperCode } from '@/lib/utils';
import { API_CONFIG } from './config';

/**
 * Charge les données d'un apiculteur
 */
export async function loadBeekeeper(code: string): Promise<Beekeeper | null> {
  const beekeepers = beekeepersData.beekeepers as Record<string, Beekeeper>;
  return beekeepers[code] || null;
}

/**
 * Récupère les données de traçabilité depuis le proxy BeePerf
 */
async function fetchFromProxy(lotNumber: string): Promise<any> {
  try {
    const response = await fetch(
      `${API_CONFIG.PROXY_URL}${API_CONFIG.ENDPOINTS.TRACABILITE}/${lotNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Désactiver le cache pour avoir les données en temps réel
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur proxy: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération depuis le proxy:', error);
    throw new Error('Impossible de récupérer les données depuis le proxy BeePerf');
  }
}

/**
 * Charge les données de traçabilité pour un numéro de lot
 */
export async function getTraceability(lotNumber: string): Promise<TraceabilityData | null> {
  const code = extractBeekeeperCode(lotNumber);

  if (!code) {
    throw new Error('Format de numéro de lot invalide');
  }

  // Charger l'apiculteur
  const beekeeper = await loadBeekeeper(code);

  if (!beekeeper) {
    throw new Error('Apiculteur non trouvé');
  }

  // Vérifier si on doit utiliser le proxy
  if (beekeeper.useProxy) {
    try {
      // Récupérer depuis le proxy BeePerf
      const proxyData = await fetchFromProxy(lotNumber);

      // Fusionner les données du proxy avec les infos de l'apiculteur
      return {
        lotNumber: proxyData.lotNumber || lotNumber,
        zone: proxyData.zone,
        production: proxyData.production,
        beekeeper,
      } as TraceabilityData;
    } catch (error) {
      console.error('Erreur proxy, fallback sur données locales:', error);
      // Fallback sur les données locales en cas d'erreur
    }
  }

  // Utiliser les données locales
  const lots = traceabilityData.lots as Record<string, any>;
  const lot = lots[lotNumber];

  if (!lot) {
    throw new Error('Lot non trouvé');
  }

  // Fusionner les données
  return {
    ...lot,
    beekeeper,
  } as TraceabilityData;
}


/**
 * Liste tous les numéros de lots disponibles (simple liste)
 */
export async function getLotsList(): Promise<string[]> {
  const grouped = await getLotsListGrouped();
  const allLots: string[] = [];

  grouped.forEach(group => {
    allLots.push(...group.lots);
  });

  return allLots;
}

/**
 * Liste tous les numéros de lots groupés par apiculteur
 */
export async function getLotsListGrouped(): Promise<LotsGroupedByBeekeeper[]> {
  const beekeepers = beekeepersData.beekeepers as Record<string, Beekeeper>;
  const grouped: LotsGroupedByBeekeeper[] = [];

  console.log('🔍 getLotsListGrouped() - Début du chargement des lots');
  console.log(`📡 URL du proxy configurée: ${API_CONFIG.PROXY_URL}`);

  for (const [code, beekeeper] of Object.entries(beekeepers)) {
    const beekeeperLots: string[] = [];

    console.log(`\n👤 Traitement apiculteur: ${code} (${beekeeper.firstName} ${beekeeper.lastName})`);
    console.log(`   useProxy: ${beekeeper.useProxy}`);

    if (beekeeper.useProxy) {
      // Récupérer depuis le proxy
      const url = `${API_CONFIG.PROXY_URL}${API_CONFIG.ENDPOINTS.NUMEROS_LOTS}?per_page=100`;
      console.log(`   📡 Appel proxy: ${url}`);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        console.log(`   ✅ Réponse reçue: ${response.status} ${response.statusText}`);

        if (response.ok) {
          const data = await response.json();
          console.log(`   📦 Données reçues:`, data);

          // Filtrer les lots de cet apiculteur (commençant par son code)
          const lots = data.data?.filter((lot: any) =>
            lot.numero_lot?.startsWith(code)
          ).map((lot: any) => lot.numero_lot) || [];

          console.log(`   ✅ ${lots.length} lot(s) trouvé(s) pour ${code}:`, lots);
          beekeeperLots.push(...lots);
        } else {
          console.error(`   ❌ Erreur HTTP: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`   ❌ Erreur lors de la récupération des lots pour ${code}:`, error);
        console.error(`   💡 Vérifiez que le proxy tourne sur ${API_CONFIG.PROXY_URL}`);
      }
    } else {
      // Récupérer depuis les données locales
      console.log(`   📂 Récupération depuis les données locales`);
      const localLots = traceabilityData.lots as Record<string, any>;
      const lots = Object.keys(localLots).filter(lot => lot.startsWith(code));
      console.log(`   ✅ ${lots.length} lot(s) trouvé(s) localement pour ${code}:`, lots);
      beekeeperLots.push(...lots);
    }

    // Ajouter au groupe si des lots existent
    if (beekeeperLots.length > 0) {
      grouped.push({
        beekeeperName: `${beekeeper.firstName} ${beekeeper.lastName}${beekeeper.commercialName ? ` (${beekeeper.commercialName})` : ''}`,
        beekeeperCode: code,
        lots: beekeeperLots.sort(),
      });
    }
  }

  console.log(`\n✅ Fin du chargement - ${grouped.length} groupe(s) d'apiculteur(s) avec des lots`);

  // Trier par nom d'apiculteur
  return grouped.sort((a, b) => a.beekeeperName.localeCompare(b.beekeeperName));
}
