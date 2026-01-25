import {TraceabilityData, Beekeeper, LotsGroupedByBeekeeper, Rucher, Lot, Zone} from '@/types';
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

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Erreur proxy: ${response.status}`);
    }

    const data = await response.json();
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
    humidity: legacyData.humidity || null,
    ruchers: legacyData.zone ? legacyData.zone.map((zone: any, index: number) => ({
      nom: `Rucher ${index + 1}`,
      lieuxRucher: zone.lieuxRucher || 'Zone non spécifiée',
      environnement: zone.environnement || 'Environnement non spécifié'
    })) : [],
    production: {
      datesRecolte: legacyData.production?.datesRecolte || [],
      datesExtractions: legacyData.production?.datesExtractions || [],
      datesConditionnement: legacyData.production?.datesConditionnement || [],
      nbRuchesRecoltees: undefined
    },
    beekeeper: legacyData.beekeeper
  };
}

/**
 * Charge les données de traçabilité pour un numéro de lot
 */
export async function getTraceability(lotNumber: string): Promise<TraceabilityData | null> {
  const code = extractBeekeeperCode(lotNumber);

  // Si le code ne peut pas être extrait (format numérique comme 03052027)
  if (!code) {
    try {
      const proxyData = await fetchFromProxy(lotNumber);

      // Trouver l'apiculteur
      let beekeeper: Beekeeper | null = null;

      if (proxyData.code_apiculteur || proxyData.beekeeper?.code || proxyData.apiculteur?.code) {
        const beekeeperCode = proxyData.code_apiculteur || proxyData.beekeeper?.code || proxyData.apiculteur?.code;
        beekeeper = await loadBeekeeper(beekeeperCode);
      }

      if (!beekeeper) {
        const beekeepers = beekeepersData.beekeepers as Record<string, Beekeeper>;
        for (const [beekeeperCode, beekeeperData] of Object.entries(beekeepers)) {
          if (beekeeperData.useProxy) {
            beekeeper = beekeeperData;
            break;
          }
        }
      }

      if (!beekeeper) {
        throw new Error('Impossible de déterminer l\'apiculteur pour ce numéro de lot');
      }

      // Utiliser directement le format du proxy BeePerf
      const result: TraceabilityData = {
        lotNumber: proxyData.lotNumber || proxyData.numero_lot || lotNumber,
        humidity: proxyData.humidity || proxyData.tauxHumidite || null,
        ruchers: proxyData.ruchers || [],
        production: {
          datesRecolte: proxyData.datesRecolte || [],
          datesExtractions: proxyData.datesExtractions || [],
          datesConditionnement: proxyData.datesConditionnement
              ? [proxyData.datesConditionnement]
              : [],
          nbRuchesRecoltees: proxyData.nbRuchesRecoltees
        },
        beekeeper,
      };

      return result;

    } catch (error) {
      throw new Error(`Format de numéro de lot non reconnu: ${lotNumber}`);
    }
  }

  // Cas normal : code apiculteur extrait du numéro de lot
  const beekeeper = await loadBeekeeper(code);

  if (!beekeeper) {
    throw new Error('Apiculteur non trouvé');
  }

  // Si useProxy, récupérer depuis le proxy BeePerf
  if (beekeeper.useProxy) {
    try {
      const proxyData = await fetchFromProxy(lotNumber);

      // Utiliser directement le format du proxy BeePerf
      const result: TraceabilityData = {
        lotNumber: proxyData.lotNumber || proxyData.numero_lot || lotNumber,
        humidity: proxyData.humidity || proxyData.tauxHumidite || null,
        ruchers: proxyData.ruchers || [],
        production: {
          datesRecolte: proxyData.datesRecolte || [],
          datesExtractions: proxyData.datesExtractions || [],
          datesConditionnement: proxyData.datesConditionnement || '',
          nbRuchesRecoltees: proxyData.nbRuchesRecoltees
        },
        beekeeper,
      };

      return result;

    } catch (error) {
      console.error(`   ❌ Erreur proxy:`, error);
      console.log(`   🔄 Fallback sur les données locales...`);
    }
  }

  // Utiliser les données locales
  const lots = traceabilityData.lots as Record<string, any>;
  const lot = lots[lotNumber];

  if (!lot) {
    throw new Error(`Lot ${lotNumber} non trouvé`);
  }

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

  for (const [code, beekeeper] of Object.entries(beekeepers)) {
    // Utiliser un Set pour éviter les doublons lors de la fusion
    const allLotsForBeekeeper = new Set<string>();

    // 1. TOUJOURS charger depuis le JSON local si disponible
    const localLots = traceabilityData.lots as Record<string, any>;
    const localBeekeeperLots = Object.keys(localLots).filter(lotNumber => lotNumber.startsWith(code + '-'));

    localBeekeeperLots.forEach(lot => allLotsForBeekeeper.add(lot));

    // 2. Si useProxy, charger AUSSI depuis le proxy et fusionner
    if (beekeeper.useProxy) {
      const url = `${API_CONFIG.PROXY_URL}${API_CONFIG.ENDPOINTS.NUMEROS_LOTS}?per_page=100&page=1&beekeeper=${code}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
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
            proxyLots = data.data
              .map((lot: any, index: number) => {
                // Si c'est déjà une chaîne de caractères (numéro de lot direct)
                if (typeof lot === 'string') {
                  return lot;
                }

                // Si c'est un objet, essayer d'extraire le numéro de lot
                if (typeof lot === 'object' && lot !== null) {
                  const numeroLot = lot.numero_lot || lot.numeroLot || lot.lot_number || lot.number || lot.lotNumber;
                  return numeroLot;
                }

                return null;
              })
              .filter((lot: string | null) => lot && typeof lot === 'string');

          } else if (Array.isArray(data)) {
            // Fallback : si data est directement un tableau

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

        }
      } catch (error) {
        console.error(`   ❌ Erreur lors de la récupération des lots depuis le proxy pour ${code}:`, error);
        console.error(`   💡 Les lots locaux seront utilisés`);
      }
    }

    // 3. Convertir le Set en tableau trié
    const beekeeperLots = Array.from(allLotsForBeekeeper).sort();

    // Ajouter au groupe si des lots existent
    if (beekeeperLots.length > 0) {
      grouped.push({
        beekeeperName: `${beekeeper.commercialName ? `${beekeeper.commercialName}` : `${beekeeper.firstName} ${beekeeper.lastName}`} (${code}) `,
        beekeeperCode: code,
        lots: beekeeperLots,
      });
    }
  }

  // Trier par nom d'apiculteur
  return grouped.sort((a, b) => a.beekeeperName.localeCompare(b.beekeeperName));
}