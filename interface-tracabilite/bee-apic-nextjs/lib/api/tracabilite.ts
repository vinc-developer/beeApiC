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
    console.log(`\n👤 Traitement apiculteur: ${code} (${beekeeper.firstName} ${beekeeper.lastName})`);
    console.log(`   useProxy: ${beekeeper.useProxy}`);

    // Utiliser un Set pour éviter les doublons lors de la fusion
    const allLotsForBeekeeper = new Set<string>();

    // 1. TOUJOURS charger depuis le JSON local si disponible
    console.log(`   📂 Chargement depuis les données locales`);
    const localLots = traceabilityData.lots as Record<string, any>;
    const localBeekeeperLots = Object.keys(localLots).filter(lotNumber => lotNumber.startsWith(code + '-'));

    localBeekeeperLots.forEach(lot => allLotsForBeekeeper.add(lot));
    console.log(`   ✅ ${localBeekeeperLots.length} lot(s) trouvé(s) localement pour ${code}`);

    // 2. Si useProxy, charger AUSSI depuis le proxy et fusionner
    if (beekeeper.useProxy) {
      const url = `${API_CONFIG.PROXY_URL}${API_CONFIG.ENDPOINTS.NUMEROS_LOTS}?per_page=100&page=1&beekeeper=${code}`;
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
          console.log(`   📦 Données proxy reçues`);

          let proxyLots: string[] = [];

          if (Array.isArray(data.data)) {
            console.log(`   📦 data.data est un tableau avec ${data.data.length} élément(s)`);

            // Afficher le premier élément pour voir la structure
            if (data.data.length > 0) {
              console.log(`   📦 Structure du premier élément:`, JSON.stringify(data.data[0], null, 2));
              console.log(`   📦 Clés disponibles:`, Object.keys(data.data[0]));
            }

            proxyLots = data.data
              .map((lot: any, index: number) => {
                const numeroLot = lot.numero_lot || lot.numeroLot || lot.lot_number || lot.number;
                console.log(`      [${index}] Clés: ${Object.keys(lot).join(', ')} → numeroLot extrait: "${numeroLot}"`);
                return numeroLot;
              })
              .filter((lot: string) => lot);

          } else if (Array.isArray(data)) {
            console.log(`   📦 data est directement un tableau avec ${data.length} élément(s)`);

            proxyLots = data
              .map((lot: any) => {
                const numeroLot = lot.numero_lot || lot.numeroLot || lot.lot_number || lot.number;
                return numeroLot;
              })
              .filter((lot: string) => lot);
          }

          // Ajouter les lots du proxy au Set (fusion automatique, pas de doublons)
          proxyLots.forEach(lot => allLotsForBeekeeper.add(lot));
          console.log(`   ✅ ${proxyLots.length} lot(s) trouvé(s) depuis le proxy pour ${code}`);

        } else {
          console.error(`   ❌ Erreur HTTP: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`   ❌ Erreur lors de la récupération des lots depuis le proxy pour ${code}:`, error);
        console.error(`   💡 Les lots locaux seront utilisés`);
      }
    }

    // 3. Convertir le Set en tableau trié
    const beekeeperLots = Array.from(allLotsForBeekeeper).sort();
    console.log(`   ✅ Total pour ${code}: ${beekeeperLots.length} lot(s) unique(s) (local + proxy)`);

    // Ajouter au groupe si des lots existent
    if (beekeeperLots.length > 0) {
      grouped.push({
        beekeeperName: `${beekeeper.firstName} ${beekeeper.lastName}${beekeeper.commercialName ? ` (${beekeeper.commercialName})` : ''}`,
        beekeeperCode: code,
        lots: beekeeperLots,
      });
    }
  }

  console.log(`\n✅ Fin du chargement - ${grouped.length} groupe(s) d'apiculteur(s) avec des lots`);

  // Trier par nom d'apiculteur
  return grouped.sort((a, b) => a.beekeeperName.localeCompare(b.beekeeperName));
}
