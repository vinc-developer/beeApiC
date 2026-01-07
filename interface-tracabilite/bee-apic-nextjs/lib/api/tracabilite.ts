import { TraceabilityData, Beekeeper } from '@/types';
import beekeepersData from '@/data/beekeepers.json';
import traceabilityData from '@/data/traceability-data.json';
import { extractBeekeeperCode } from '@/lib/utils';

/**
 * Charge les données d'un apiculteur
 */
export async function loadBeekeeper(code: string): Promise<Beekeeper | null> {
  const beekeepers = beekeepersData.beekeepers as Record<string, Beekeeper>;
  return beekeepers[code] || null;
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

  // Charger les données de traçabilité
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
 * Liste tous les numéros de lots disponibles
 */
export async function getLotsList(): Promise<string[]> {
  const lots = traceabilityData.lots as Record<string, any>;
  return Object.keys(lots);
}
