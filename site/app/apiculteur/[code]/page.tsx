import { notFound } from 'next/navigation';
import {loadBeekeeper, loadBeekeeperAll} from '@/lib/api/tracabilite';
import ImageGallery from "@/components/gallery/ImageGallery";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from 'react-icons/fa';
import CityMap from "@/components/ui/map/CityMap";
import styles from './../page.module.css';
import Image from 'next/image';
import { getRegionalFlag } from '@/lib/utils/regional-flags';

export async function generateMetadata({
                                          params,
                                        }: {
  params: Promise<{ code: string }>;
}) {

  const { code } = await params;

  const beekeeper = await loadBeekeeper(code);

  if (!beekeeper) {
    return {
      title: "Apiculteur introuvable | Bee Api’C",
      description:
          "Cet apiculteur partenaire Bee Api’C est introuvable.",
    };
  }

  const isBeApiC = code === "BA";
  const isPartner = !!beekeeper.partnerSince;

  const role = isBeApiC
      ? "Apiculteur Bee Api'C"
      : isPartner
          ? "Apiculteur partenaire Bee Api'C"
          : "Apiculteur local";

  return {
    title: `${beekeeper.firstName} ${beekeeper.lastName} – ${role}`,
    description: `Découvrez ${beekeeper.firstName} ${beekeeper.lastName}, ${role} situé à ${beekeeper.location}. Apiculture locale, responsable et traçable.`,
    keywords: [
      "apiculteur",
      "apiculteur local",
      "apiculture responsable",
      "miel local",
      `${beekeeper.location}`,
      "bee api'c",
    ],
  };
}

/* référencement apiculteur*/
export async function generateStaticParams() {
  const beekeepers = await loadBeekeeperAll();

  return beekeepers.map((apiculteur) => ({
    code: apiculteur.code,
  }));
}

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

  const role = isBeApiC
      ? "Apiculteur Bee Api'C"
      : isPartner
          ? "Apiculteur partenaire Bee Api'C"
          : "Apiculteur local";

  // Obtenir le drapeau régional
  const regionalFlag = getRegionalFlag(beekeeper.location);

  return (
      <div className="container">
        {/* Header */}
        <section className="section">
            <h1 className="header-title">Portrait de l'apiculteur</h1>
            <p className="header-subtitle">Découvrez qui produit votre miel</p>

          {/* Section Profil */}
          <div className="beekeeper-profile">
            {/* Header Profil */}
            <div className="profile-header">
              <div className="profile-visual">
                {/* Photo */}
                <div className="profile-photo">
                  {beekeeper.photo ? (
                      <img
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/${beekeeper.photo}`}
                          alt={`${beekeeper.firstName} ${beekeeper.lastName} - apiculteur récoltant`}
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
                      <img
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/${beekeeper.logo}`}
                          alt="Logo"
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
                      <span className="info-value">
                        {beekeeper.location}
                        {regionalFlag && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}${regionalFlag}`}
                            alt="Drapeau régional"
                            width={24}
                            height={16}
                            style={{ marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle' }}
                          />
                        )}
                      </span>
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
              <div>
                <h3 className={styles.exploitationTitle}>Mes ruchers</h3>
                <div className={styles.exploitationContent}>
                  <CityMap cities={beekeeper.ruchers} zoom={10} beeApic={false} isVille={true}/>
                </div>

              </div>
            </div>

            {/* Galerie */}
            {beekeeper.gallery && beekeeper.gallery.length > 0 && (
                <div className="profile-card">
                  <h2 className="card-title">
                    <span className="title-icon">📸</span>
                    Galerie Photos
                  </h2>
                  <ImageGallery
                      images={beekeeper.gallery.map((image, index) => ({
                        src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/${image}`,
                        alt: `Photo ${index + 1} - ${beekeeper.firstName} ${beekeeper.lastName}`
                      }))}
                  />
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

                {/* Shop web */}
                {beekeeper?.webshop && (
                    <div className="contact-detail-item">
                      <span className="contact-icon">🛒</span>
                      <div className="contact-content">
                        <span className="contact-label">Boutique</span>
                        <a
                            href={beekeeper.webshop}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                          {beekeeper.webshop}
                        </a>
                      </div>
                    </div>
                )}

                {/* Email */}
                {
                  beekeeper.email && (
                        <div className="contact-detail-item">
                          <span className="contact-icon">📧</span>
                          <div className="contact-content">
                            <span className="contact-label">Email</span>
                            <a href={`mailto:${beekeeper.email}`} className="contact-link">
                              {beekeeper.email}
                            </a>
                          </div>
                        </div>
                    )
                }

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
                {
                  beekeeper.siret && (
                        <div className="contact-detail-item">
                          <span className="contact-icon">🏢</span>
                          <div className="contact-content">
                            <span className="contact-label">SIRET</span>
                            <span className="contact-value">{beekeeper.siret}</span>
                          </div>
                        </div>
                    )
                }
              </div>
            </div>

            {/* Réseaux sociaux */}
            {beekeeper.socialMedia && Object.keys(beekeeper.socialMedia).some(key => beekeeper.socialMedia?.[key as keyof typeof beekeeper.socialMedia]) && (
                <div className="profile-card">
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
                          <FaFacebook className="social-icon" />
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
                          <FaInstagram className="social-icon" />
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
                          <FaYoutube className="social-icon" />
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
                          <FaTiktok className="social-icon" />
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
                          <FaLinkedin className="social-icon" />
                          <span className="social-name">LinkedIn</span>
                        </a>
                    )}
                  </div>
                </div>
            )}
          </div>
        </section>
      </div>
  );
}
