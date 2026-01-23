/**
 * Utilitaire pour obtenir le drapeau régional en fonction de la localisation
 */

export interface RegionalFlagInfo {
  path: string;
  alt: string;
  region: string;
}

/**
 * Retourne le chemin du drapeau régional pour une localisation donnée
 * @param location - La localisation de l'apiculteur
 * @returns Le chemin du drapeau ou null si aucun drapeau n'est disponible
 */
export function getRegionalFlag(location: string | undefined): string | null {
  if (!location) return null;

  if (location.includes('Pays de Nantes')) {
    return '/icons/pays-nantais.png';
  }

  if (location.includes('Pays de Retz')) {
    return '/icons/pays-retz.jpg';
  }

  return null;
}

/**
 * Retourne les informations complètes du drapeau régional
 * @param location - La localisation de l'apiculteur
 * @returns Les informations du drapeau ou null si aucun drapeau n'est disponible
 */
export function getRegionalFlagInfo(location: string | undefined): RegionalFlagInfo | null {
  if (!location) return null;

  if (location.includes('Pays de Nantes')) {
    return {
      path: '/icons/pays-nantais.png',
      alt: 'Drapeau du Pays de Nantes',
      region: 'Pays de Nantes'
    };
  }

  if (location.includes('Pays de Retz')) {
    return {
      path: '/icons/pays-retz.jpg',
      alt: 'Drapeau du Pays de Retz',
      region: 'Pays de Retz'
    };
  }

  return null;
}
