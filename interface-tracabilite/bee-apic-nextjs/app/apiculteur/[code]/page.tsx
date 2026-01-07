import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { loadBeekeeper } from '@/lib/api/tracabilite';

export default async function BeekeeperPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const beekeeper = await loadBeekeeper(code);

  if (!beekeeper) {
    notFound();
  }

  const isBeApiC = code === 'BA';
  const isPartner = beekeeper.partnerSince;

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="brand-logo">
            <span className="text-5xl">🐝</span>
            <span className="brand-name">Bee Api'C</span>
          </div>
          <h1 className="header-title">Portrait de l'Apiculteur</h1>
          <p className="header-subtitle">Découvrez qui produit votre miel</p>
        </div>
      </header>

      {/* Bouton retour */}
      <div className="back-button-container">
        <Link href="/tracabilite" className="btn-back">
          <span className="btn-icon">←</span>
          Retour à la traçabilité
        </Link>
      </div>

      {/* Section Profil */}
      <section className="beekeeper-profile">
        {/* Header Profil */}
        <div className="profile-header">
          <div className="profile-visual">
            {/* Photo */}
            <div className="profile-photo">
              {beekeeper.photo ? (
                <Image
                  src={`/images/${beekeeper.photo}`}
                  alt={`${beekeeper.firstName} ${beekeeper.lastName}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="photo-placeholder">
                  <span className="placeholder-icon">👤</span>
                </div>
              )}
            </div>

            {/* Logo */}
            {beekeeper.logo && (
              <div className="profile-logo">
                <Image
                  src={`/images/${beekeeper.logo}`}
                  alt="Logo"
                  width={200}
                  height={100}
                  className="max-h-[100px] object-contain"
                />
              </div>
            )}
          </div>

          <div className="profile-info">
            {/* Badges */}
            <div className="profile-badges">
              <span className="profile-type">{beekeeper.type}</span>
              {isBeApiC && (
                <span className="beeapic-producer-badge">
                  <span className="producer-icon">🐝</span>
                  <span className="producer-text">Bee Api'C</span>
                </span>
              )}
              {isPartner && (
                <span className="partner-badge-profile">
                  <span className="partner-icon">🤝</span>
                  <span className="partner-text">Partenaire Bee Api'C</span>
                </span>
              )}
            </div>

            {/* Nom */}
            <h1 className="profile-name">
              {beekeeper.firstName} {beekeeper.lastName}
            </h1>

            {/* Nom commercial */}
            {beekeeper.commercialName && (
              <p className="profile-commercial-name">{beekeeper.commercialName}</p>
            )}
          </div>
        </div>

        {/* Biographie */}
        {beekeeper.bio && (
          <div className="profile-card">
            <h2 className="card-title">
              <span className="title-icon">📖</span>
              À propos
            </h2>
            <div className="bio-content">
              <p>{beekeeper.bio}</p>
            </div>
          </div>
        )}

        {/* Exploitation */}
        <div className="profile-card">
          <h2 className="card-title">
            <span className="title-icon">🏞️</span>
            Mon exploitation
          </h2>
          <div className="exploitation-info">
            {beekeeper.hivesCount && (
              <div className="info-row">
                <span className="info-label">Nombre de ruches</span>
                <span className="info-value">{beekeeper.hivesCount}</span>
              </div>
            )}
            {beekeeper.location && (
              <div className="info-row">
                <span className="info-label">Localisation</span>
                <span className="info-value">{beekeeper.location}</span>
              </div>
            )}
            {beekeeper.distance && (
              <div className="info-row">
                <span className="info-label">Distance depuis Nantes</span>
                <span className="info-value">{beekeeper.distance}</span>
              </div>
            )}
            {beekeeper.beekeeperSince && (
              <div className="info-row">
                <span className="info-label">Apiculteur depuis</span>
                <span className="info-value">{beekeeper.beekeeperSince}</span>
              </div>
            )}
          </div>
        </div>

        {/* Galerie */}
        {beekeeper.gallery && beekeeper.gallery.length > 0 && (
          <div className="profile-card">
            <h2 className="card-title">
              <span className="title-icon">📸</span>
              Galerie Photos
            </h2>
            <div className="photo-gallery">
              {beekeeper.gallery.map((image, index) => (
                <div key={index} className="gallery-item">
                  <Image
                    src={`/images/${image}`}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="profile-card">
          <h2 className="card-title">
            <span className="title-icon">📞</span>
            Contact
          </h2>
          <div className="contact-details">
            {/* Adresse */}
            <div className="contact-detail-item">
              <span className="contact-icon">📍</span>
              <div className="contact-content">
                <span className="contact-label">Adresse</span>
                <span className="contact-value">{beekeeper.address}</span>
              </div>
            </div>

            {/* Site web */}
            {beekeeper.website && (
              <div className="contact-detail-item">
                <span className="contact-icon">🌐</span>
                <div className="contact-content">
                  <span className="contact-label">Site Web</span>
                  <a
                    href={beekeeper.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    {beekeeper.website}
                  </a>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="contact-detail-item">
              <span className="contact-icon">📧</span>
              <div className="contact-content">
                <span className="contact-label">Email</span>
                <a href={`mailto:${beekeeper.email}`} className="contact-link">
                  {beekeeper.email}
                </a>
              </div>
            </div>

            {/* Téléphone */}
            <div className="contact-detail-item">
              <span className="contact-icon">📱</span>
              <div className="contact-content">
                <span className="contact-label">Téléphone</span>
                <a href={`tel:${beekeeper.phone}`} className="contact-link">
                  {beekeeper.phone}
                </a>
              </div>
            </div>

            {/* SIRET */}
            <div className="contact-detail-item">
              <span className="contact-icon">🏢</span>
              <div className="contact-content">
                <span className="contact-label">SIRET</span>
                <span className="contact-value">{beekeeper.siret}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        {beekeeper.socialMedia && Object.keys(beekeeper.socialMedia).some(key => beekeeper.socialMedia?.[key as keyof typeof beekeeper.socialMedia]) && (
          <div className="profile-card social-card">
            <h2 className="card-title">
              <span className="title-icon">🌐</span>
              Suivez-moi
            </h2>
            <div className="social-links-profile">
              {beekeeper.socialMedia.facebook && (
                <a
                  href={beekeeper.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-network="facebook"
                >
                  <span className="social-icon">📘</span>
                  <span className="social-name">Facebook</span>
                </a>
              )}
              {beekeeper.socialMedia.instagram && (
                <a
                  href={beekeeper.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-network="instagram"
                >
                  <span className="social-icon">📷</span>
                  <span className="social-name">Instagram</span>
                </a>
              )}
              {beekeeper.socialMedia.youtube && (
                <a
                  href={beekeeper.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-network="youtube"
                >
                  <span className="social-icon">📹</span>
                  <span className="social-name">YouTube</span>
                </a>
              )}
              {beekeeper.socialMedia.tiktok && (
                <a
                  href={beekeeper.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-network="tiktok"
                >
                  <span className="social-icon">🎵</span>
                  <span className="social-name">TikTok</span>
                </a>
              )}
              {beekeeper.socialMedia.linkedin && (
                <a
                  href={beekeeper.socialMedia.linkedin}
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
      </section>
    </div>
  );
}
