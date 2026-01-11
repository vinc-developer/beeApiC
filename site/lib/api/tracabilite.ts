import {TraceabilityData, Beekeeper, LotsGroupedByBeekeeper, Rucher, Lot} from '@/types';
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

export async function loadBeekeeperAll(): Promise<Beekeeper[]> {
  return Object.values(
      beekeepersData.beekeepers as Record<string, Beekeeper>
  );
}

/**
 * Récupère les données de traçabilité depuis le proxy BeePerf
 */
async function fetchFromProxy(lotNumber: string): Promise<any> {
  const url = `${API_CONFIG.PROXY_URL}${API_CONFIG.ENDPOINTS.TRACABILITE}/${lotNumber}`;
  console.log(`      📡 URL du proxy: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log(`      ✅ Réponse reçue: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      console.error(`      ❌ Erreur HTTP: ${response.status}`);
      throw new Error(`Erreur proxy: ${response.status}`);
    }

    const data = await response.json();
    console.log(`      📦 Données JSON reçues:`, JSON.stringify(data, null, 2));

    return data;

  } catch (error) {
    console.error(`      ❌ Erreur lors de la récupération depuis le proxy:`, error);
    throw error;
  }
}

/**
 * Convertit les données locales (ancien format) vers le nouveau format
 */
function convertLegacyToNewFormat(legacyData: any): TraceabilityData {
  return {
    lotNumber: legacyData.lotNumber,
    ruchers: legacyData.zone ? [{
      nom: 'Rucher principal',
      nomPublicZone: legacyData.zone.publicName || 'Zone non spécifiée',
      environnement: legacyData.zone.environment || 'Environnement non spécifié'
    }] : [],
    production: {
      datesExtractions: legacyData.production?.extractionDates || [],
      dateConditionnement: legacyData.production?.bottlingDate || '',
      nbRuchesRecoltees: undefined
    },
    beekeeper: legacyData.beekeeper
  };
}

/**
 * Charge les données de traçabilité pour un numéro de lot
 */
export async function getTraceability(lotNumber: string): Promise<TraceabilityData | null> {
  console.log(`\n🔍 getTraceability() - Recherche du lot: ${lotNumber}`);

  const code = extractBeekeeperCode(lotNumber);
  console.log(`   📋 Code apiculteur extrait: ${code}`);

  // Si le code ne peut pas être extrait (format numérique comme 03052027)
  if (!code) {
    console.warn(`   ⚠️ Impossible d'extraire le code apiculteur du numéro de lot`);
    console.log(`   📡 Tentative de récupération directe depuis le proxy sans code apiculteur...`);

    try {
      const proxyData = await fetchFromProxy(lotNumber);
      console.log(`   ✅ Données reçues du proxy (sans code apiculteur)`);

      // Trouver l'apiculteur
      let beekeeper: Beekeeper | null = null;

      if (proxyData.code_apiculteur || proxyData.beekeeper?.code || proxyData.apiculteur?.code) {
        const beekeeperCode = proxyData.code_apiculteur || proxyData.beekeeper?.code || proxyData.apiculteur?.code;
        console.log(`   📋 Code apiculteur trouvé dans les données du proxy: ${beekeeperCode}`);
        beekeeper = await loadBeekeeper(beekeeperCode);
      }

      if (!beekeeper) {
        console.log(`   🔍 Recherche de l'apiculteur par défaut (useProxy=true)...`);
        const beekeepers = beekeepersData.beekeepers as Record<string, Beekeeper>;

        for (const [beekeeperCode, beekeeperData] of Object.entries(beekeepers)) {
          if (beekeeperData.useProxy) {
            console.log(`   ✅ Apiculteur par défaut trouvé: ${beekeeperCode}`);
            beekeeper = beekeeperData;
            break;
          }
        }
      }

      if (!beekeeper) {
        console.error(`   ❌ Impossible de déterminer l'apiculteur pour ce lot`);
        throw new Error('Impossible de déterminer l\'apiculteur pour ce numéro de lot');
      }

      // Utiliser directement le format du proxy BeePerf
      const result: TraceabilityData = {
        lotNumber: proxyData.lotNumber || proxyData.numero_lot || lotNumber,
        ruchers: proxyData.ruchers || [],
        production: {
          datesExtractions: proxyData.datesExtractions || [],
          dateConditionnement: proxyData.dateConditionnement || '',
          nbRuchesRecoltees: proxyData.nbRuchesRecoltees
        },
        beekeeper,
      };

      console.log(`   ✅ Données construites:`, {
        lotNumber: result.lotNumber,
        nbRuchers: result.ruchers.length,
        nbDatesExtractions: result.production.datesExtractions.length
      });

      return result;

    } catch (error) {
      console.error(`   ❌ Erreur:`, error);
      throw new Error(`Format de numéro de lot non reconnu: ${lotNumber}`);
    }
  }

  // Cas normal : code apiculteur extrait du numéro de lot
  const beekeeper = await loadBeekeeper(code);
  console.log(`   👤 Apiculteur trouvé: ${beekeeper ? `${beekeeper.firstName} ${beekeeper.lastName}` : 'NON'}`);

  if (!beekeeper) {
    console.error(`   ❌ Apiculteur non trouvé pour le code: ${code}`);
    throw new Error('Apiculteur non trouvé');
  }

  console.log(`   🔧 useProxy: ${beekeeper.useProxy}`);

  // Si useProxy, récupérer depuis le proxy BeePerf
  if (beekeeper.useProxy) {
    try {
      console.log(`   📡 Tentative de récupération depuis le proxy...`);

      const proxyData = await fetchFromProxy(lotNumber);
      console.log(`   ✅ Données reçues du proxy`);

      // Utiliser directement le format du proxy BeePerf
      const result: TraceabilityData = {
        lotNumber: proxyData.lotNumber || proxyData.numero_lot || lotNumber,
        ruchers: proxyData.ruchers || [],
        production: {
          datesExtractions: proxyData.datesExtractions || [],
          dateConditionnement: proxyData.dateConditionnement || '',
          nbRuchesRecoltees: proxyData.nbRuchesRecoltees
        },
        beekeeper,
      };

      console.log(`   ✅ Données construites:`, {
        lotNumber: result.lotNumber,
        nbRuchers: result.ruchers.length,
        nbDatesExtractions: result.production.datesExtractions.length
      });

      return result;

    } catch (error) {
      console.error(`   ❌ Erreur proxy:`, error);
      console.log(`   🔄 Fallback sur les données locales...`);
    }
  }

  // Utiliser les données locales
  console.log(`   📂 Recherche dans les données locales...`);
  const lots = traceabilityData.lots as Record<string, any>;
  const lot = lots[lotNumber];

  if (!lot) {
    console.error(`   ❌ Lot non trouvé dans les données locales`);
    throw new Error(`Lot ${lotNumber} non trouvé`);
  }

  console.log(`   ✅ Lot trouvé dans les données locales`);

  // Convertir l'ancien format vers le nouveau
  const result = convertLegacyToNewFormat({
    ...lot,
    beekeeper,
  });

  return result;
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

export function getLotsListAll(): Lot[] {
  const lotsRecord = traceabilityData.lots as Record<string, any>;
  return Object.values(lotsRecord) as Lot[];
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
          console.log(`   📦 Structure:`, {
            hasData: !!data.data,
            hasPagination: !!(data.current_page || data.per_page),
            keys: Object.keys(data)
          });

          let proxyLots: string[] = [];

          // Le proxy retourne une structure de pagination :
          // {
          //   "current_page": 1,
          //   "per_page": 3,
          //   "last_page": 4,
          //   "total": 12,
          //   "data": ["ACA-20250112", "TRE-20250215", ...]
          // }

          if (data.data && Array.isArray(data.data)) {
            console.log(`   📦 data.data est un tableau avec ${data.data.length} élément(s)`);

            if (data.current_page) {
              console.log(`   📄 Pagination: page ${data.current_page}/${data.last_page || '?'}, ${data.total || data.data.length} lot(s) au total`);
            }

            if (data.data.length > 0) {
              console.log(`   📦 Premier élément:`, data.data[0]);
              console.log(`   📦 Type du premier élément:`, typeof data.data[0]);
            }

            proxyLots = data.data
              .map((lot: any, index: number) => {
                // Si c'est déjà une chaîne de caractères (numéro de lot direct)
                if (typeof lot === 'string') {
                  console.log(`      [${index}] Type: string → "${lot}"`);
                  return lot;
                }

                // Si c'est un objet, essayer d'extraire le numéro de lot
                if (typeof lot === 'object' && lot !== null) {
                  const numeroLot = lot.numero_lot || lot.numeroLot || lot.lot_number || lot.number || lot.lotNumber;
                  console.log(`      [${index}] Type: object → numeroLot: "${numeroLot}"`);
                  return numeroLot;
                }

                console.log(`      [${index}] Type inconnu (${typeof lot})`);
                return null;
              })
              .filter((lot: string | null) => lot && typeof lot === 'string');

          } else if (Array.isArray(data)) {
            // Fallback : si data est directement un tableau
            console.log(`   📦 data est directement un tableau avec ${data.length} élément(s)`);

            proxyLots = data
              .map((lot: any) => {
                if (typeof lot === 'string') return lot;
                const numeroLot = lot.numero_lot || lot.numeroLot || lot.lot_number || lot.number;
                return numeroLot;
              })
              .filter((lot: string | null) => lot && typeof lot === 'string');
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
        beekeeperName: `${beekeeper.commercialName ? `${beekeeper.commercialName}` : `${beekeeper.firstName} ${beekeeper.lastName}`} (${code}) `,
        beekeeperCode: code,
        lots: beekeeperLots,
      });
    }
  }

  console.log(`\n✅ Fin du chargement - ${grouped.length} groupe(s) d'apiculteur(s) avec des lots`);

  // Trier par nom d'apiculteur
  return grouped.sort((a, b) => a.beekeeperName.localeCompare(b.beekeeperName));
}