'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLotsListGrouped } from '@/lib/api/tracabilite';
import type { LotsGroupedByBeekeeper } from '@/types';

export default function TracabilitePage() {
  const [lotNumber, setLotNumber] = useState('');
  const [error, setError] = useState('');
  const [searchMode, setSearchMode] = useState<'manual' | 'list'>('manual');
  const [lotsGrouped, setLotsGrouped] = useState<LotsGroupedByBeekeeper[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingLots, setLoadingLots] = useState(false);
  const router = useRouter();

  // Charger la liste des lots groupés par apiculteur
  useEffect(() => {
    const loadLots = async () => {
      if (searchMode === 'list') {
        setLoadingLots(true);
        try {
          const grouped = await getLotsListGrouped();
          setLotsGrouped(grouped);
        } catch (error) {
          console.error('Erreur lors du chargement des lots:', error);
          setError('Impossible de charger la liste des lots');
        } finally {
          setLoadingLots(false);
        }
      }
    };

    loadLots();
  }, [searchMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!lotNumber.trim()) {
      setError('Veuillez entrer un numéro de lot');
      return;
    }

    setLoading(true);
    router.push(`/tracabilite/${lotNumber.trim()}`);
  };

  return (
    <div className="container-custom py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-5xl shadow-lg">
            🔍
          </div>
          <h1 className="mb-4 text-5xl font-bold">
            Traçabilité du Miel
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez l'origine de votre pot de miel
          </p>
        </div>

        {/* Mode de recherche */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setSearchMode('manual')}
            className={`rounded-lg px-6 py-3 font-semibold transition-all ${
              searchMode === 'manual'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Saisie manuelle
          </button>
          <button
            onClick={() => setSearchMode('list')}
            className={`rounded-lg px-6 py-3 font-semibold transition-all ${
              searchMode === 'list'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Sélectionner dans une liste
          </button>
        </div>

        {/* Formulaire */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {searchMode === 'manual' ? (
              <div>
                <label
                  htmlFor="lotNumber"
                  className="mb-3 block text-sm font-semibold text-gray-700"
                >
                  Numéro de lot
                </label>
                <input
                  type="text"
                  id="lotNumber"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value.toUpperCase())}
                  placeholder="Ex: BA-2026-CH-0107"
                  className="input text-lg"
                  autoComplete="off"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span>⚠️</span>
                    {error}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label
                  htmlFor="lotSelect"
                  className="mb-3 block text-sm font-semibold text-gray-700"
                >
                  Sélectionnez un numéro de lot
                </label>

                {loadingLots ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600"></div>
                    <span className="ml-3 text-gray-600">Chargement des lots...</span>
                  </div>
                ) : (
                  <select
                    id="lotSelect"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                    className="input text-lg"
                  >
                    <option value="">-- Choisir un numéro de lot --</option>
                    {lotsGrouped.map((group) => (
                      <optgroup key={group.beekeeperCode} label={group.beekeeperName}>
                        {group.lots.map((lot) => (
                          <option key={lot} value={lot}>
                            {lot}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || loadingLots}
              className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Recherche en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🔍</span>
                  Rechercher
                </span>
              )}
            </button>
          </form>

          {/* Informations */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="mb-4 font-semibold text-gray-800 flex items-center gap-2">
              <span>💡</span>
              Format du numéro de lot
            </h3>
            <div className="rounded-lg bg-amber-50 p-4 text-sm text-gray-700">
              <p className="mb-3 font-medium">Le numéro de lot est composé de :</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600">CODE</span>
                  <span>→ 2-3 lettres (code apiculteur) - Ex: BA, MC, CV</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600">YYYY</span>
                  <span>→ 4 chiffres (année) - Ex: 2026</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600">TT</span>
                  <span>→ 1-3 lettres (type de miel) - Ex: CH, PA, TF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary-600">NNNN</span>
                  <span>→ 4 chiffres (numéro) - Ex: 0107</span>
                </li>
              </ul>
              <p className="mt-3 font-semibold text-primary-700">
                Exemple: BA-2026-CH-0107
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

