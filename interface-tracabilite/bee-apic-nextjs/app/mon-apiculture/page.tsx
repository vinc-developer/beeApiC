import Link from "next/link";
import styles from "../page.module.css";

export default function MonApiculturePage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          👨‍🌾 Mon Apiculture
        </h1>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription}>
            Découvrez notre approche de l'apiculture, nos méthodes respectueuses de l'environnement
            et notre engagement pour une production durable.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Notre philosophie
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Nous pratiquons une apiculture raisonnée, respectueuse des abeilles et de l'environnement.
              Notre objectif est de produire un miel de qualité tout en préservant la santé de nos colonies
              et la biodiversité locale.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Nos pratiques
            </h2>
            <ul style={{ lineHeight: 1.75, color: 'var(--color-text)', paddingLeft: '1.5rem' }}>
              <li>Ruches installées dans des zones préservées de Loire-Atlantique</li>
              <li>Respect du cycle naturel des abeilles</li>
              <li>Nourrissement limité et naturel</li>
              <li>Traçabilité complète de la production</li>
              <li>Formation continue aux meilleures pratiques</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Nos engagements
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Nous nous engageons à produire un miel 100% naturel, sans traitement chimique,
              en préservant la santé de nos abeilles et en respectant l'environnement.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/" className={styles.btnSecondary}>
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}

