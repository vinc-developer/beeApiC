'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TracabilitePage() {
  const [lotNumber, setLotNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!lotNumber.trim()) {
      setError('Veuillez entrer un numéro de lot');
      return;
    }

    // Rediriger vers la page de détail du lot
    router.push(`/tracabilite/${lotNumber.trim()}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Traçabilité du Miel
        </h1>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <p className="mb-6 text-gray-600">
            Entrez le numéro de lot inscrit sur votre pot de miel pour découvrir
            son origine et son parcours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="lotNumber"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Numéro de lot
              </label>
              <input
                type="text"
                id="lotNumber"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                placeholder="Ex: BA-2026-CH-0107"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary-500"
            >
              Rechercher
            </button>
          </form>

          <div className="mt-8 border-t pt-6">
            <h3 className="mb-3 font-semibold text-gray-800">
              Format du numéro de lot
            </h3>
            <p className="text-sm text-gray-600">
              Le numéro de lot est composé de :
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• <strong>2-3 lettres</strong> : Code apiculteur</li>
              <li>• <strong>4 chiffres</strong> : Année de production</li>
              <li>• <strong>1-3 lettres</strong> : Type de miel</li>
              <li>• <strong>4 chiffres</strong> : Numéro séquentiel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
