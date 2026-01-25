import Link from "next/link";
import Image from "next/image";
import styles from "./apiculteurs.module.css";
import beekeepersData from "@/data/beekeepers.json";
import {Metadata} from "next";
import { getRegionalFlag } from '@/lib/utils/regional-flags';
import CityMap from "@/components/ui/map/CityMap";

export const metadata: Metadata = {
  title: "Apiculteurs partenaires – Réseau local",
  description:
      "Découvrez les apiculteurs partenaires de Bee Api’C : un réseau local engagé pour une apiculture responsable et un miel de qualité.",
  keywords: [
    "apiculteurs partenaires",
    "apiculteur local",
    "apiculture responsable",
    "miel local",
    "pays de retz",
    "loire atlantique",
  ],
};


export default function ApiculteursPage() {
  // Convertir l'objet beekeepers en tableau
  const beekeepersArray = Object.values(beekeepersData.beekeepers);
  const cities = beekeepersArray.flatMap(b => b.ruchers || []);

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
        <div />
        <div className={styles.beekeepersContainer}>
          <section className={styles.section}>
            <h1 className={styles.sectionTitle}>
              Nos Apiculteurs
            </h1>

            <div className={styles.introCard}>
              <p className={styles.introText}>
                Découvrez les apiculteurs passionnés qui produisent nos miels.
                Chacun d'entre eux apporte son savoir-faire unique et son engagement
                pour une apiculture de qualité et respectueuse de l'environnement.
              </p>
            </div>

            {/* Producteurs Bee Api'C */}
            {beeapicProducers.length > 0 && (
                <>
                  <div className={styles.categoryHeader}>
                    <h2 className={styles.categoryTitle}>
                      Producteurs Bee Api'C
                    </h2>
                    <p className={styles.categorySubtitle}>
                      Nos apiculteurs producteurs au cœur de Bee Api'C
                    </p>
                  </div>

                  <div className={styles.beekeepersGrid}>
                    {beeapicProducers.map((beekeeper) => (
                        <BeekeeperCard key={beekeeper.code} beekeeper={beekeeper}/>
                    ))}
                  </div>
                </>
            )}

            {/* Apiculteurs Partenaires */}
            {partners.length > 0 && (
                <>
                  <div className={styles.categoryHeader} style={{marginTop: '3rem'}}>
                    <h2 className={styles.categoryTitle}>
                      Apiculteurs Partenaires
                    </h2>
                    <p className={styles.categorySubtitle}>
                      Nos partenaires de confiance
                    </p>
                  </div>

                  <div className={styles.beekeepersGrid}>
                    {partners.map((beekeeper) => (
                        <BeekeeperCard key={beekeeper.code} beekeeper={beekeeper} isPartner={true}/>
                    ))}
                  </div>
                </>
            )}

            <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Nos ruchers</h2>
              </div>
              <div className={styles.cardContent}>
                <p>
                 Nos abeilles butinent principalement dans un rayon de 3 kms autour de leurs ruchers.
                  Voici une carte indiquant les villes où se trouvent nos ruchers.
                </p>
                <CityMap cities={cities} zoom={8} beeApic={false} isVille={true} />
              </div>
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
  // Obtenir le drapeau régional
  const regionalFlag = getRegionalFlag(beekeeper.location);

  return (
    <Link href={`/apiculteur/${beekeeper.code}`} className={styles.beekeeperCard}>
      {/* Photo de l'apiculteur */}
      <div className={styles.beekeeperPhoto}>
        {beekeeper.photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/${beekeeper.photo}`}
            alt={`${beekeeper.firstName} ${beekeeper.lastName} - apiculteur récoltant`}
            width={300}
            height={300}
            className={styles.photoImage}
          />
        ) : (
          <div className={styles.photoPlaceholder}>
            <span className={styles.placeholderIcon}>👤</span>
          </div>
        )}
      </div>

      {/* Badge */}
      <div className={styles.badgeContainer}>
        {isPartner ? (
          <div className={styles.partnerBadge}>
            <span className={styles.badgeIcon}>🤝</span>
            <span className={styles.badgeText}>Partenaire</span>
          </div>
        ) : (
          <div className={styles.producerBadge}>
            <span className={styles.badgeIcon}>🐝</span>
            <span className={styles.badgeText}>Bee Api'C</span>
          </div>
        )}
      </div>

      {/* Informations */}
      <div className={styles.beekeeperInfo}>
        <h3 className={styles.beekeeperName}>
          {beekeeper.firstName} {beekeeper.lastName}
        </h3>

        {beekeeper.commercialName && (
          <p className={styles.commercialName}>
            {beekeeper.commercialName}
          </p>
        )}

        <div className={styles.infoDetails}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📍</span>
            <span className={styles.infoText}>
              {beekeeper.location}
              {regionalFlag && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}${regionalFlag}`}
                  alt="Drapeau régional"
                  width={20}
                  height={13}
                  style={{ marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle' }}
                />
              )}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>🏷️</span>
            <span className={styles.infoText}>{beekeeper.type}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>📅</span>
            <span className={styles.infoText}>
              Depuis {beekeeper.beekeeperSince}
            </span>
          </div>

          {isPartner && beekeeper.partnerSince && (
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🤝</span>
              <span className={styles.infoText}>
                Partenaire depuis {beekeeper.partnerSince}
              </span>
            </div>
          )}
        </div>

        {beekeeper.bio && (
          <p className={styles.bioPreview}>
            {beekeeper.bio.substring(0, 150)}
            {beekeeper.bio.length > 150 ? "..." : ""}
          </p>
        )}

        <div className={styles.cardFooter}>
          <span className={styles.linkText}>
            Voir le profil complet →
          </span>
        </div>
      </div>
    </Link>
  );
}

