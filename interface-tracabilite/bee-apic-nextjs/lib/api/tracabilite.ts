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
  const url = `${API_CONFIG.PROXY_URL}${API_CONFIG.ENDPOINTS.TRACABILITE}/${lotNumber}`;
  console.log(`      📡 URL du proxy: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Désactiver le cache pour avoir les données en temps réel
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
      // Essayer de récupérer directement depuis le proxy
      const proxyData = await fetchFromProxy(lotNumber);
      console.log(`   ✅ Données reçues du proxy (sans code apiculteur):`, proxyData);

      // Le proxy devrait retourner les infos de l'apiculteur dans les données
      // On va essayer de mapper les données
      let beekeeper: Beekeeper | null = null;

      // Si le proxy retourne un code apiculteur dans les données
      if (proxyData.apiculteur || proxyData.beekeeper || proxyData.code_apiculteur) {
        const beekeeperCode = proxyData.code_apiculteur || proxyData.beekeeper?.code || proxyData.apiculteur?.code;
        if (beekeeperCode) {
          console.log(`   📋 Code apiculteur trouvé dans les données du proxy: ${beekeeperCode}`);
          beekeeper = await loadBeekeeper(beekeeperCode);
        }
      }

      // Si on n'a toujours pas l'apiculteur, essayer de le trouver en cherchant dans tous les apiculteurs
      if (!beekeeper) {
        console.log(`   🔍 Recherche de l'apiculteur par numéro de lot dans tous les apiculteurs...`);
        const beekeepers = beekeepersData.beekeepers as Record<string, Beekeeper>;

        // Chercher l'apiculteur qui a useProxy: true (car ce lot vient du proxy)
        for (const [beekeeperCode, beekeeperData] of Object.entries(beekeepers)) {
          if (beekeeperData.useProxy) {
            console.log(`   ✅ Apiculteur par défaut trouvé (useProxy=true): ${beekeeperCode}`);
            beekeeper = beekeeperData;
            break;
          }
        }
      }

      if (!beekeeper) {
        console.error(`   ❌ Impossible de déterminer l'apiculteur pour ce lot`);
        throw new Error('Impossible de déterminer l\'apiculteur pour ce numéro de lot');
      }

      // Construire les données de traçabilité
      const result = {
        lotNumber: proxyData.lotNumber || proxyData.numero_lot || lotNumber,
        zone: proxyData.zone,
        production: proxyData.production,
        beekeeper,
      } as TraceabilityData;

      console.log(`   ✅ Données de traçabilité construites avec succès`);
      return result;

    } catch (error) {
      console.error(`   ❌ Erreur lors de la récupération depuis le proxy:`, error);
      throw new Error(`Format de numéro de lot non reconnu: ${lotNumber}`);
    }
  }

  // Cas normal : code apiculteur extrait du numéro de lot
  // Charger l'apiculteur
  const beekeeper = await loadBeekeeper(code);
  console.log(`   👤 Apiculteur trouvé: ${beekeeper ? `${beekeeper.firstName} ${beekeeper.lastName}` : 'NON'}`);

  if (!beekeeper) {
    console.error(`   ❌ Apiculteur non trouvé pour le code: ${code}`);
    throw new Error('Apiculteur non trouvé');
  }

  console.log(`   🔧 useProxy: ${beekeeper.useProxy}`);

  // Vérifier si on doit utiliser le proxy
  if (beekeeper.useProxy) {
    try {
      console.log(`   📡 Tentative de récupération depuis le proxy...`);

      // Récupérer depuis le proxy BeePerf
      const proxyData = await fetchFromProxy(lotNumber);
      console.log(`   ✅ Données reçues du proxy:`, proxyData);

      // Fusionner les données du proxy avec les infos de l'apiculteur
      const result = {
        lotNumber: proxyData.lotNumber || proxyData.numero_lot || lotNumber,
        zone: proxyData.zone,
        production: proxyData.production,
        beekeeper,
      } as TraceabilityData;

      console.log(`   ✅ Données de traçabilité construites avec succès`);
      return result;

    } catch (error) {
      console.error(`   ❌ Erreur lors de la récupération depuis le proxy:`, error);
      console.log(`   🔄 Tentative de fallback sur les données locales...`);
      // Fallback sur les données locales en cas d'erreur
    }
  }

  // Utiliser les données locales
  console.log(`   📂 Recherche dans les données locales...`);
  const lots = traceabilityData.lots as Record<string, any>;
  const lot = lots[lotNumber];

  if (!lot) {
    console.error(`   ❌ Lot non trouvé dans les données locales`);
    console.error(`   💡 Lots disponibles localement:`, Object.keys(lots).filter(l => l.startsWith(code + '-')));
    throw new Error(`Lot ${lotNumber} non trouvé`);
  }

  console.log(`   ✅ Lot trouvé dans les données locales`);

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
              console.log(`   📦 Premier élément:`, data.data[0]);
              console.log(`   📦 Type du premier élément:`, typeof data.data[0]);

              // Si c'est un objet, afficher ses clés
              if (typeof data.data[0] === 'object' && data.data[0] !== null) {
                console.log(`   📦 Clés disponibles:`, Object.keys(data.data[0]));
              }
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
                  console.log(`      [${index}] Type: object, clés: ${Object.keys(lot).join(', ')} → numeroLot: "${numeroLot}"`);
                  return numeroLot;
                }

                console.log(`      [${index}] Type inconnu (${typeof lot})`);
                return null;
              })
              .filter((lot: string | null) => lot && typeof lot === 'string');

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
