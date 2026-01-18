import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTraceability } from '@/lib/api/tracabilite';
import { extractHoneyType, formatDate } from '@/lib/utils';
import honeyTypesData from '@/data/honey-types.json';
import traceabilityData from '@/data/traceability-data.json';
import styles from "./../tracabilite.module.css";
import {Metadata} from "next";

/* référencement lot*/
export function generateStaticParams() {
  try {
    const lotsRecord = traceabilityData.lots as Record<string, any>;
    // Utiliser les CLÉS du JSON (qui sont les identifiants de routes)
    const lotKeys = Object.keys(lotsRecord);

    const params = lotKeys.map((key) => ({
      lotNumber: String(key), // Utiliser la clé, pas lot.lotNumber
    }));

    console.log(`✅ generateStaticParams: ${params.length} lots trouvés`, params);
    return params;
  } catch (error) {
    console.error('❌ Erreur dans generateStaticParams:', error);
    return [{ lotNumber: 'BA-2026-CH-0107' }]; // Fallback avec la vraie clé
  }
}
export const metadata: Metadata = {
  title: "Traçabilité du miel – De la ruche au pot",
  description:
      "Suivez la traçabilité de votre miel grâce au QR code : origine, rucher, récolte et apiculteur local du Pays de Retz en Loire-Atlantique.",
  keywords: [
    "traçabilité miel",
    "miel traçable",
    "origine du miel",
    "apiculteur local",
    "miel pays de retz",
    "qr code miel",
  ],
};

export default async function LotDetailPage({
  params,
}: {
  params: Promise<{ lotNumber: string }>;
}) {
  const { lotNumber } = await params;

  let data;
  try {
    data = await getTraceability(lotNumber);
  } catch (error) {
    notFound();
  }

  if (!data) {
    notFound();
  }

  const honeyTypeCode = extractHoneyType(lotNumber);
  console.log(honeyTypeCode + " : type de miel");
  const honeyTypes = honeyTypesData?.honeyTypes as Record<string, any> || {};
  const honeyType = honeyTypeCode && honeyTypes[honeyTypeCode] ? honeyTypes[honeyTypeCode] : null;

  const isBeApiC = data.beekeeper?.code === 'BA';
  const isPartner = data.beekeeper?.partnerSince;

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

      {/* Résultats de la traçabilité */}
      <section className="results-section">
        {/* Informations du produit */}
        <div className="result-card">
          <h2 className="section-title">
            <span className="title-icon">🍯</span>
            Informations du produit
          </h2>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Numéro de lot</span>
              <span className="info-value">{data.lotNumber}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Taux d'humidité du miel</span>
              <span className="info-value">{data.humidity}%</span>
            </div>

            <div className="info-item">
              <span className="info-label">Secteur(s) de butinage(s)</span>
              <span className="info-value">
                {data.ruchers.map(r => r.lieuxRucher).join(', ') || 'Non spécifiée'}
              </span>
            </div>

            {honeyType && (
                <div className="info-item full-width">
                  <span className="info-label">Type de miel</span>
                  <div className="honey-type-details">
                    <span className="honey-type-badge">{honeyType.name}</span>
                    {honeyType.description && (
                        <span className="honey-type-description">{honeyType.description}</span>
                    )}
                  </div>
                </div>
            )}

            <div className="info-item full-width">
              <span className="info-label">Environnement des ruches</span>
              <span className="info-value">
                {[...new Set(data.ruchers.map(r => r.environnement))].join(', ') || 'Non spécifié'}
              </span>
            </div>

            {data.production.nbRuchesRecoltees && (
                <div className="info-item">
                  <span className="info-label">Nombre de ruches récoltées</span>
                  <span className="info-value">{data.production.nbRuchesRecoltees}</span>
                </div>
            )}
          </div>
        </div>

        {/* Dates importantes */}
        <div className="result-card">
          <h2 className="section-title">
            <span className="title-icon">📅</span>
            Dates de production
          </h2>

          <div className="dates-container">
            <div className="date-card">
              <div className="date-icon">🚚</div>
              <h3 className="date-title">Date(s) de récolte</h3>
              <div className="date-list">
                {data.production.datesRecolte?.map((date, index) => (
                    <span key={index} className="date-value">
                    {formatDate(date)}
                  </span>
                ))}
              </div>
            </div>

            <div className="date-card">
              <div className="date-icon">🍯</div>
              <h3 className="date-title">Date(s) d'extraction</h3>
              <div className="date-list">
                {data.production.datesExtractions.map((date, index) => (
                    <span key={index} className="date-value">
                    {formatDate(date)}
                  </span>
                ))}
              </div>
            </div>

            <div className="date-card">
              <div className="date-icon">📦</div>
              <h3 className="date-title">Date(s) de conditionnement</h3>
              <div className="date-list">
                {data.production.datesConditionnement.map((date, index) => (
                    <span key={index} className="date-value">
                    {formatDate(date)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Informations de l'apiculteur producteur */}
        <div className="result-card beekeeper-card">
          <h2 className="section-title">
            <span className="title-icon">👨‍🌾</span>
            Produit par l'apiculteur
          </h2>

          <div className="beekeeper-content">
            <div className="beekeeper-visual">
              {/* Photo */}
              <div className="beekeeper-photo">
              {data.beekeeper?.photo ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/${data.beekeeper.photo}`}
                    alt={`${data.beekeeper.firstName} ${data.beekeeper.lastName}`}
                  />
                ) : (
                  <div className="photo-placeholder">
                    <span className="placeholder-icon">👤</span>
                  </div>
                )}
              </div>

              {/* Logo */}
              <div className="beekeeper-logo">
                {data.beekeeper?.logo ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/${data.beekeeper.logo}`}
                    alt="Logo"
                  />
                ) : (
                  <div className="logo-placeholder">
                    <span className="placeholder-icon">🏢</span>
                  </div>
                )}
              </div>
            </div>

            <div className="beekeeper-details">
              <div className="beekeeper-name">
                <span className="beekeeper-type">{data.beekeeper?.type}</span>
                {isBeApiC && (
                  <span className="beeapic-producer-badge">
                    <span className="producer-icon">🐝</span>
                    <span className="producer-text">Bee Api'C</span>
                  </span>
                )}
                {isPartner && (
                  <span className="partner-badge">
                    <span className="partner-icon">🤝</span>
                    <span className="partner-text">
                      Partenaire Bee Api'C
                    </span>
                  </span>
                )}
                <h3>
                  {data.beekeeper?.firstName} {data.beekeeper?.lastName}
                </h3>
                {data.beekeeper?.commercialName && (
                  <p className="commercial-name">{data.beekeeper.commercialName}</p>
                )}
              </div>

              <div className="beekeeper-info-grid">
                {/* Adresse */}
                <div className="beekeeper-info-item">
                  <span className="info-icon">📍</span>
                  <div className="info-content">
                    <span className="info-small-label">Adresse</span>
                    <span className="info-text">{data.beekeeper?.address}</span>
                  </div>
                </div>

                {/* Site web
                {data.beekeeper?.website && (
                  <div className="beekeeper-info-item">
                    <span className="info-icon">🌐</span>
                    <div className="info-content">
                      <span className="info-small-label">Site Web</span>
                      <a
                        href={data.beekeeper.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="info-link"
                      >
                        {data.beekeeper.website}
                      </a>
                    </div>
                  </div>
                )}
                */}

                {/* Email */}
                <div className="beekeeper-info-item">
                  <span className="info-icon">📧</span>
                  <div className="info-content">
                    <span className="info-small-label">Email</span>
                    <a href={`mailto:${data.beekeeper?.email}`} className="info-link">
                      {data.beekeeper?.email}
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="beekeeper-info-item">
                  <span className="info-icon">📱</span>
                  <div className="info-content">
                    <span className="info-small-label">Téléphone</span>
                    <a href={`tel:${data.beekeeper?.phone}`} className="info-link">
                      {data.beekeeper?.phone}
                    </a>
                  </div>
                </div>

                {/* SIRET
                <div className="beekeeper-info-item">
                  <span className="info-icon">🏢</span>
                  <div className="info-content">
                    <span className="info-small-label">SIRET</span>
                    <span className="info-text">{data.beekeeper?.siret}</span>
                  </div>
                </div>*/}
              </div>

              {/* Réseaux sociaux
              {data.beekeeper?.socialMedia && Object.keys(data.beekeeper.socialMedia).some(key => data.beekeeper?.socialMedia?.[key as keyof typeof data.beekeeper.socialMedia]) && (
                <div className="social-media-section">
                  <h4 className="social-title">Suivez-nous</h4>
                  <div className="social-links">
                    {data.beekeeper.socialMedia.facebook && (
                      <a
                        href={data.beekeeper.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        data-network="facebook"
                      >
                        <span className="social-icon">📘</span>
                        <span className="social-name">Facebook</span>
                      </a>
                    )}
                    {data.beekeeper.socialMedia.instagram && (
                      <a
                        href={data.beekeeper.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        data-network="instagram"
                      >
                        <span className="social-icon">📷</span>
                        <span className="social-name">Instagram</span>
                      </a>
                    )}
                    {data.beekeeper.socialMedia.youtube && (
                      <a
                        href={data.beekeeper.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        data-network="youtube"
                      >
                        <span className="social-icon">📹</span>
                        <span className="social-name">YouTube</span>
                      </a>
                    )}
                    {data.beekeeper.socialMedia.tiktok && (
                      <a
                        href={data.beekeeper.socialMedia.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        data-network="tiktok"
                      >
                        <span className="social-icon">🎵</span>
                        <span className="social-name">TikTok</span>
                      </a>
                    )}
                    {data.beekeeper.socialMedia.linkedin && (
                      <a
                        href={data.beekeeper.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        data-network="linkedin"
                      >
                        <span className="social-icon">💼</span>
                        <span className="social-name">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
               */}

              {/* Bouton En savoir plus */}
              <div className="beekeeper-actions">
                <Link href={`/apiculteur/${data.beekeeper?.code}`} className="btn-more-info">
                  <span className="btn-icon">ℹ️</span>
                  En savoir plus sur l'apiculteur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bouton nouvelle recherche */}
      <div className={styles.tracabiliteButtonContainer}>
        <Link href="/tracabilite" className={styles.btnSecondary}>
          <span className="btn-icon">← </span>
          Nouvelle recherche
        </Link>
      </div>
    </div>
  );
}

