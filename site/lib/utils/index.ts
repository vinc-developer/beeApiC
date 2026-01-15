/**
 * Extrait le code apiculteur du numéro de lot
 * Gère plusieurs formats :
 * - Format avec tirets: BA-2026-CH-0107 → BA
 * - Format sans tirets (numérique): 03052027 → null (pas de code apiculteur)
 */
export function extractBeekeeperCode(lotNumber: string): string | null {
  // Format avec tirets (BA-2026-CH-0107)
  const matchWithDash = lotNumber.match(/^([A-Z]{2,3})-/);
  if (matchWithDash) {
    return matchWithDash[1];
  }

  // Format numérique pur (03052027) - considérer comme format legacy
  // On pourrait essayer de déduire le code apiculteur d'une autre manière
  // Pour l'instant, retourner null et gérer ce cas différemment
  if (/^\d+$/.test(lotNumber)) {
    console.warn(`⚠️ Format de lot numérique détecté: ${lotNumber} - impossible d'extraire le code apiculteur`);
    return null;
  }

  return null;
}

/**
 * Extrait le type de miel du numéro de lot
 * Format: BA-2026-CH-0107 → CH
 */
export function extractHoneyType(lotNumber: string): string | null {
  const match = lotNumber.match(/-([A-Z]{1,3})\d?$/);
  return match ? match[1] : null;
}

/**
 * Valide le format d'un numéro de lot
 * Format attendu: CODE-YYYY-TT-NNNN
 */
export function validateLotNumber(lotNumber: string): boolean {
  const pattern = /^[A-Z]{2,3}-\d{4}-[A-Z]{1,3}\d?-\d{4}$/;
  return pattern.test(lotNumber);
}

/**
 * Formate une date au format français
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '-';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}
