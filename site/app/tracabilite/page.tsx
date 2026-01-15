'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLotsListGrouped } from '@/lib/api/tracabilite';
import type { LotsGroupedByBeekeeper } from '@/types';
import Link from "next/link";
import styles from "@/app/page.module.css";

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <div className="container">
        {/* Header */}
        <section className="header">
          <div className="header-content">
            <div className="brand-logo">
              <span className="brand-icon">🐝</span>
              <span className="brand-name">Bee Api'C</span>
            </div>
            <h1 className="header-title">Traçabilité du Miel</h1>
            <p className="header-subtitle">Don't Pannic, Bee Api'C !</p>
          </div>
        </section>

        {/* Formulaire de recherche */}
        <section className="search-section">
          <div className="search-card">
            <h2 className="section-title">Rechercher un lot</h2>

            {/* Sélecteur de méthode de recherche */}
            <div className="search-method-selector">
              <button
                  className={`btn-method ${searchMode === 'manual' ? 'active' : ''}`}
                  onClick={() => setSearchMode('manual')}
                  data-method="manual"
              >
                Saisie manuelle
              </button>
              <button
                  className={`btn-method ${searchMode === 'list' ? 'active' : ''}`}
                  onClick={() => setSearchMode('list')}
                  data-method="list"
              >
                Sélection dans la liste
              </button>
            </div>

            {/* Saisie manuelle */}
            <div className={`search-input-group ${searchMode !== 'manual' ? 'hidden' : ''}`}>
              <label htmlFor="lotNumber" className="input-label">
                Numéro de lot
              </label>
              <div className="input-wrapper">
                <input
                    type="text"
                    id="lotNumber"
                    className="input-field"
                    placeholder="Ex: BA-250701-CH"
                    autoComplete="off"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value.toUpperCase())}
                />
                <button
                    className="btn-search"
                    onClick={handleSubmit}
                    disabled={loading || loadingLots}
                >
                  <span className="btn-icon">🔍</span>
                  Rechercher
                </button>
              </div>
            </div>

            {/* Sélection par liste */}
            <div className={`search-input-group ${searchMode !== 'list' ? 'hidden' : ''}`}>
              <label htmlFor="lotSelect" className="input-label">
                Sélectionner un lot
              </label>
              <div className="input-wrapper">
                <select
                    id="lotSelect"
                    className="select-field"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
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
                <button
                    className="btn-search"
                    onClick={handleSubmit}
                    disabled={loading || loadingLots}
                >
                  <span className="btn-icon">🔍</span>
                  Rechercher
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            <div className={`error-message ${!error ? 'hidden' : ''}`}>
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
            </div>

            {/* Loading spinner */}
            <div className={`loading-spinner ${!loadingLots && !loading ? 'hidden' : ''}`}>
              <div className="spinner"></div>
              <p>{loadingLots ? 'Chargement des lots...' : 'Chargement des informations...'}</p>
            </div>
          </div>
        </section>
      </div>
  );
}

