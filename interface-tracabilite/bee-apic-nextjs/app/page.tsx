import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero relative">
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm">
              <span className="text-2xl">🐝</span>
              <span className="text-sm font-semibold text-gray-700">
                Miel 100% Local de Loire Atlantique
              </span>
            </div>

            <h1 className="mb-6 text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
              <span className="text-gradient">{siteConfig.name}</span>
            </h1>

            <p className="mb-8 text-2xl font-medium text-gray-700 md:text-3xl">
              {siteConfig.slogan}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/tracabilite"
                className="btn-primary text-lg"
              >
                🔍 Tracer mon miel
              </Link>
              <Link
                href="/a-propos"
                className="rounded-lg border-2 border-white bg-white/50 px-6 py-3 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
      </section>

      <div className={styles.container}>
        {/* Section Maison Mère */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            {/* Header */}
            <div className={styles.companyHeader}>
              <span className={styles.companyIcon}>🏢</span>
              <h2 className={styles.companyTitle}>Bee Api'C</h2>
              <span className={styles.companyBadge}>Entreprise Locale</span>
            </div>

            {/* Content */}
            <div className={styles.companyContent}>
              {/* Info */}
              <div className={styles.companyInfo}>
                <p className={styles.companyDescription}>
                  Bee Api'C est une entreprise familiale engagée dans la promotion du miel 100% local de Loire-Atlantique.
                  Nous travaillons en étroite collaboration avec des apiculteurs passionnés pour vous offrir un miel de qualité,
                  traçable et respectueux de l'environnement.
                </p>

                <div className={styles.companyLabel}>
                  <span className={styles.labelIcon}>🇫🇷</span>
                  <span className={styles.labelText}>
                    {siteConfig.label}
                  </span>
                </div>
              </div>

              {/* Contact */}
              <div className={styles.companyContact}>
                <h3 className={styles.contactTitle}>Nous contacter</h3>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📍</span>
                    <span className={styles.contactText}>{siteConfig.company.address}</span>
                  </div>

                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>🌐</span>
                    <a
                      href={siteConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      bee-apic.com
                    </a>
                  </div>

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
                    <span className={styles.contactIcon}>📱</span>
                    <a
                      href={`tel:${siteConfig.company.phone}`}
                      className={styles.contactLink}
                    >
                      {siteConfig.company.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Découvrez l'origine de votre miel
          </h2>

          <div className={styles.ctaGrid}>
            {/* Traçabilité */}
            <Link
              href="/tracabilite"
              className={styles.ctaCard}
            >
              <div className={styles.ctaCardBg}></div>

              <div className={styles.ctaCardContent}>
                <div className={styles.ctaIcon}>
                  🍯
                </div>

                <h3 className={styles.ctaTitle}>
                  Traçabilité
                </h3>

                <p className={styles.ctaDescription}>
                  Découvrez l'origine de votre pot de miel en quelques secondes
                </p>

                <div className={styles.ctaLink}>
                  <span>Rechercher maintenant</span>
                  <svg className={styles.ctaArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Nos Apiculteurs */}
            <Link
              href="/apiculteurs"
              className={`${styles.ctaCard} ${styles.ctaCardSecondary}`}
            >
              <div className={styles.ctaCardBg}></div>

              <div className={styles.ctaCardContent}>
                <div className={`${styles.ctaIcon} ${styles.ctaIconSecondary}`}>
                  🐝
                </div>

                <h3 className={styles.ctaTitle}>
                  Nos Apiculteurs
                </h3>

                <p className={styles.ctaDescription}>
                  Rencontrez nos producteurs passionnés et découvrez leur travail
                </p>

                <div className={`${styles.ctaLink} ${styles.ctaLinkSecondary}`}>
                  <span>Découvrir</span>
                  <svg className={styles.ctaArrow} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.featuresContainer}>
            <h2 className={styles.featuresTitle}>
              Pourquoi choisir Bee Api'C ?
            </h2>
            <p className={styles.featuresSubtitle}>
              Une démarche de qualité et de transparence
            </p>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🇫🇷
                </div>
                <h3 className={styles.featureTitle}>100% Local</h3>
                <p className={styles.featureDescription}>
                  Miel produit et récolté exclusivement en Loire Atlantique
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🔍
                </div>
                <h3 className={styles.featureTitle}>Traçabilité Totale</h3>
                <p className={styles.featureDescription}>
                  Suivez le parcours de votre miel de la ruche à votre table
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  👨‍🌾
                </div>
                <h3 className={styles.featureTitle}>Apiculteurs Passionnés</h3>
                <p className={styles.featureDescription}>
                  Des producteurs engagés et qualifiés pour un miel d'exception
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
