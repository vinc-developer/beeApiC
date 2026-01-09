import { siteConfig } from '@/config/site';
import Link from 'next/link';
import styles from './page.module.css';

export default function AProposPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>
          À Propos de {siteConfig.name}
        </h1>

        {/* Présentation */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Notre Mission</h2>
          <p className={styles.cardText}>
            {siteConfig.name} est une entreprise d'apiculture locale basée en
            Loire-Atlantique, dédiée à la production de miel 100% local et de
            qualité. Notre mission est de vous offrir un miel authentique,
            traçable de la ruche à votre table.
          </p>
          <p className={styles.cardText}>
            Nous travaillons également en partenariat avec des apiculteurs
            locaux passionnés pour vous proposer une gamme variée de miels tout
            en maintenant nos exigences de qualité et de traçabilité.
          </p>
        </div>

        {/* Nos Valeurs */}
        <div className={styles.valuesSection}>
          <h2 className={styles.valuesSectionTitle}>Nos Valeurs</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🌱</span>
              <h3 className={styles.valueTitle}>Local</h3>
              <p className={styles.valueDescription}>
                100% de notre miel est produit en Loire-Atlantique
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🔍</span>
              <h3 className={styles.valueTitle}>Traçabilité</h3>
              <p className={styles.valueDescription}>
                Chaque pot est traçable de la ruche à votre table
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>❤️</span>
              <h3 className={styles.valueTitle}>Passion</h3>
              <p className={styles.valueDescription}>
                Des apiculteurs passionnés et engagés
              </p>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className={styles.labelCard}>
          <span className={styles.labelIcon}>🇫🇷</span>
          <h2 className={styles.labelTitle}>
            {siteConfig.label}
          </h2>
          <p className={styles.labelText}>
            Tous nos miels sont récoltés, extraits et mis en pot en
            Loire-Atlantique
          </p>
        </div>

        {/* Slogan */}
        <div className={styles.sloganCard}>
          <h2 className={styles.sloganText}>
            {siteConfig.slogan}
          </h2>
        </div>

        {/* Contact */}
        <div className={styles.contactCard}>
          <h2 className={styles.contactTitle}>
            Nous Contacter
          </h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactSection}>
              <h3 className={styles.contactSectionTitle}>
                Informations
              </h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <a
                    href={`mailto:${siteConfig.company.email}`}
                    className={styles.contactLink}
                  >
                    {siteConfig.company.email}
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>{siteConfig.company.phone}</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🏢</span>
                  <span>SIRET: {siteConfig.company.siret}</span>
                </div>
              </div>
            </div>
            <div className={styles.contactSection}>
              <h3 className={styles.contactSectionTitle}>Adresse</h3>
              <p className={styles.contactAddress}>
                {siteConfig.company.address}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <Link
            href="/tracabilite"
            className={styles.ctaButton}
          >
            Découvrez la traçabilité de votre miel
          </Link>
        </div>
      </div>
    </div>
  );
}
