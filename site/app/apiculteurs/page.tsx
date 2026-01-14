import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";
import beekeepersData from "@/data/beekeepers.json";

// Styles spécifiques pour cette page
const pageStyles = `
<style>
  .beekeepers-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .intro-card {
    background: linear-gradient(135deg, #FFF8DC 0%, var(--color-white) 100%);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 2px solid #F5B04A;
    margin-bottom: 3rem;
  }

  .intro-text {
    text-align: center;
    font-size: 1.125rem;
    line-height: 1.75;
    color: var(--color-text);
    margin: 0;
  }

  .category-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .category-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-secondary);
    margin-bottom: 0.5rem;
  }

  .category-subtitle {
    font-size: 1rem;
    color: var(--color-text-light);
  }

  .beekeepers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .beekeeper-card {
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 2px solid transparent;
  }

  .beekeeper-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
    border-color: var(--color-primary);
  }

  .beekeeper-photo {
    width: 100%;
    height: 300px;
    overflow: hidden;
    background: var(--color-light-gray);
    position: relative;
  }

  .photo-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .beekeeper-card:hover .photo-image {
    transform: scale(1.1);
  }

  .photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%);
  }

  .placeholder-icon {
    font-size: 6rem;
    opacity: 0.5;
  }

  .badge-container {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
  }

  .producer-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #0AFF00 0%, #0A8C00 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(9, 77, 1, 0.4);
    animation: pulse-glow-producer 2s ease-in-out infinite;
  }

  @keyframes pulse-glow-producer {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(10, 140, 0, 0.5);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 6px 20px rgba(10, 255, 0, 0.8);
      transform: scale(1.05);
    }
  }

  .partner-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4);
  }

  .badge-icon {
    font-size: 1rem;
  }

  .badge-text {
    letter-spacing: 0.5px;
  }

  .beekeeper-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .beekeeper-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-secondary);
    margin: 0;
  }

  .commercial-name {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-primary);
    font-style: italic;
    margin: 0;
  }

  .info-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: linear-gradient(135deg, #FFF8DC 0%, #FFFBF0 100%);
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid #F5E6C8;
  }

  .info-item {
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: white;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    min-height: 2.5rem;
  }

  .info-item:hover {
    background: #FFFEF9;
    transform: translateX(4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .info-icon {
    font-size: 1.25rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #FFF5E6 0%, #FFE0B2 100%);
    border-radius: 0.5rem;
    flex-shrink: 0;
  }

  .info-text {
    font-size: 0.875rem;
    color: var(--color-text);
    font-weight: 500;
    line-height: 1.4;
    display: flex;
    align-items: center;
    min-height: 2.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .bio-preview {
    font-size: 0.875rem;
    line-height: 1.625;
    color: var(--color-text);
    margin: 0;
  }

  .card-footer {
    padding-top: 1rem;
    border-top: 1px solid var(--color-gray);
    margin-top: auto;
  }

  .link-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: gap 0.3s ease;
  }

  .beekeeper-card:hover .link-text {
    gap: 0.75rem;
  }

  @media (max-width: 768px) {
    .beekeepers-container {
      padding: 0 1rem;
    }

    .beekeepers-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .beekeeper-photo {
      height: 250px;
    }
  }
</style>
`;

export default function ApiculteursPage() {
  // Convertir l'objet beekeepers en tableau
  const beekeepersArray = Object.values(beekeepersData.beekeepers);

  // Séparer les producteurs Bee Api'C et les partenaires
  const beeapicProducers = beekeepersArray.filter(b => !b.partnerSince || b.partnerSince === "");
  const partners = beekeepersArray.filter(b => b.partnerSince && b.partnerSince !== "");

  // Trier les partenaires par année (plus anciens en premier)
  partners.sort((a, b) => {
    const yearA = parseInt(a.partnerSince || "9999");
    const yearB = parseInt(b.partnerSince || "9999");
    return yearA - yearB;
  });

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div className="beekeepers-container">
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>
            Nos Apiculteurs
          </h1>

          <div className="intro-card">
            <p className="intro-text">
              Découvrez les apiculteurs passionnés qui produisent nos miels.
              Chacun d'entre eux apporte son savoir-faire unique et son engagement
              pour une apiculture de qualité et respectueuse de l'environnement.
            </p>
          </div>

          {/* Producteurs Bee Api'C */}
          {beeapicProducers.length > 0 && (
            <>
              <div className="category-header">
                <h2 className="category-title">
                  Producteurs Bee Api'C
                </h2>
                <p className="category-subtitle">
                  Nos apiculteurs producteurs au cœur de Bee Api'C
                </p>
              </div>

              <div className="beekeepers-grid">
                {beeapicProducers.map((beekeeper) => (
                  <BeekeeperCard key={beekeeper.code} beekeeper={beekeeper} />
                ))}
              </div>
            </>
          )}

          {/* Apiculteurs Partenaires */}
          {partners.length > 0 && (
            <>
              <div className="category-header" style={{ marginTop: '3rem' }}>
                <h2 className="category-title">
                  Apiculteurs Partenaires
                </h2>
                <p className="category-subtitle">
                  Nos partenaires de confiance
                </p>
              </div>

              <div className="beekeepers-grid">
                {partners.map((beekeeper) => (
                  <BeekeeperCard key={beekeeper.code} beekeeper={beekeeper} isPartner={true} />
                ))}
              </div>
            </>
          )}

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/" className={styles.btnSecondary}>
              ← Retour à l'accueil
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

interface BeekeeperCardProps {
  beekeeper: any;
  isPartner?: boolean;
}

function BeekeeperCard({ beekeeper, isPartner = false }: BeekeeperCardProps) {
  return (
    <Link href={`/apiculteur/${beekeeper.code}`} className="beekeeper-card">
      {/* Photo de l'apiculteur */}
      <div className="beekeeper-photo">
        {beekeeper.photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/${beekeeper.photo}`}
            alt={`${beekeeper.firstName} ${beekeeper.lastName}`}
            width={300}
            height={300}
            className="photo-image"
          />
        ) : (
          <div className="photo-placeholder">
            <span className="placeholder-icon">👤</span>
          </div>
        )}
      </div>

      {/* Badge */}
      <div className="badge-container">
        {isPartner ? (
          <div className="partner-badge">
            <span className="badge-icon">🤝</span>
            <span className="badge-text">Partenaire</span>
          </div>
        ) : (
          <div className="producer-badge">
            <span className="badge-icon">🐝</span>
            <span className="badge-text">Bee Api'C</span>
          </div>
        )}
      </div>

      {/* Informations */}
      <div className="beekeeper-info">
        <h3 className="beekeeper-name">
          {beekeeper.firstName} {beekeeper.lastName}
        </h3>

        {beekeeper.commercialName && (
          <p className="commercial-name">
            {beekeeper.commercialName}
          </p>
        )}

        <div className="info-details">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span className="info-text">{beekeeper.location}</span>
          </div>

          <div className="info-item">
            <span className="info-icon">🏷️</span>
            <span className="info-text">{beekeeper.type}</span>
          </div>

          <div className="info-item">
            <span className="info-icon">📅</span>
            <span className="info-text">
              Depuis {beekeeper.beekeeperSince}
            </span>
          </div>

          {isPartner && beekeeper.partnerSince && (
            <div className="info-item">
              <span className="info-icon">🤝</span>
              <span className="info-text">
                Partenaire depuis {beekeeper.partnerSince}
              </span>
            </div>
          )}

          <div className="info-item">
            <span className="info-icon">🏠</span>
            <span className="info-text">{beekeeper.hivesCount}</span>
          </div>
        </div>

        {beekeeper.bio && (
          <p className="bio-preview">
            {beekeeper.bio.substring(0, 150)}
            {beekeeper.bio.length > 150 ? "..." : ""}
          </p>
        )}

        <div className="card-footer">
          <span className="link-text">
            Voir le profil complet →
          </span>
        </div>
      </div>
    </Link>
  );
}

