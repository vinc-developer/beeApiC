import Link from "next/link";
import styles from "../page.module.css";

export default function AuRucherPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          🐝 Au Rucher
        </h1>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription}>
            Découvrez la vie au rucher, le travail quotidien de nos apiculteurs et l'univers fascinant des abeilles.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              La vie au rucher
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Le rucher est un lieu vivant où nos apiculteurs travaillent en harmonie avec la nature.
              Chaque saison apporte son lot d'activités : l'entretien des ruches, la surveillance de la santé des colonies,
              et bien sûr, la récolte du miel.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Le rôle des abeilles
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Les abeilles sont essentielles à notre écosystème. Elles pollinisent plus de 80% des plantes à fleurs
              et contribuent à la biodiversité. Nos apiculteurs veillent au bien-être de chaque colonie.
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
