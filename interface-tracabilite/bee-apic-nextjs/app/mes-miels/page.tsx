import Link from "next/link";
import styles from "../page.module.css";

export default function MesMielsPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          🍯 Mes Miels
        </h1>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription}>
            Découvrez notre gamme de miels locaux, chacun avec ses caractéristiques uniques,
            produits avec passion par nos apiculteurs de Loire-Atlantique.
          </p>
        </div>

        <div className={styles.featuresGrid} style={{ marginTop: '2rem' }}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌸</div>
            <h3 className={styles.featureTitle}>Miel de Fleurs</h3>
            <p className={styles.featureDescription}>
              Doux et parfumé, notre miel de fleurs est récolté au printemps.
              Il offre un goût délicat et une texture crémeuse.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌳</div>
            <h3 className={styles.featureTitle}>Miel de Forêt</h3>
            <p className={styles.featureDescription}>
              Corsé et intense, ce miel est issu des essences forestières.
              Riche en minéraux, il a une couleur sombre caractéristique.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌻</div>
            <h3 className={styles.featureTitle}>Miel de Tournesol</h3>
            <p className={styles.featureDescription}>
              Doux et fruité, ce miel jaune d'or cristallise rapidement.
              Parfait pour les tartines du petit-déjeuner.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌾</div>
            <h3 className={styles.featureTitle}>Miel de Sarrasin</h3>
            <p className={styles.featureDescription}>
              Typique de notre région, ce miel sombre a un goût puissant et maltés.
              Excellent pour la santé.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🍀</div>
            <h3 className={styles.featureTitle}>Miel de Trèfle</h3>
            <p className={styles.featureDescription}>
              Léger et délicat, ce miel blanc crémeux est parfait pour adoucir
              les boissons chaudes et les desserts.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌿</div>
            <h3 className={styles.featureTitle}>Miel de Printemps</h3>
            <p className={styles.featureDescription}>
              Un mélange harmonieux des premières fleurs de la saison.
              Doux et équilibré.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/tracabilite" className={styles.btnPrimary}>
            🔍 Tracer votre miel
          </Link>
          {' '}
          <Link href="/" className={styles.btnSecondary} style={{ marginLeft: '1rem' }}>
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}

