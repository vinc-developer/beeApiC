/**
 * Extrait le code apiculteur du numéro de lot
 * Format: BA-2026-CH-0107 → BA
 */
export function extractBeekeeperCode(lotNumber: string): string | null {
  const match = lotNumber.match(/^([A-Z]{2,3})-/);
  return match ? match[1] : null;
}

/**
 * Extrait le type de miel du numéro de lot
 * Format: BA-2026-CH-0107 → CH
 */
export function extractHoneyType(lotNumber: string): string | null {
  const match = lotNumber.match(/-([A-Z]{1,3}\d?)-\d{4}$/);
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
