import { siteConfig } from '@/config/site';
import Link from 'next/link';
import styles from './page.module.css';
import CardEntreprise from "@/components/entreprise/card-entreprise";

export default function AProposPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>
          À Propos de {siteConfig.name}
        </h1>

        {/* Présentation */}
        <CardEntreprise />

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

        {/* Slogan */}
        <div className={styles.sloganCard}>
          <h2 className={styles.sloganText}>
            {siteConfig.slogan}
          </h2>
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
