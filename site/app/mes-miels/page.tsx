import Link from "next/link";
import styles from "./page.module.css";

export default function MesMielsPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          🍯 Mes Miels
        </h1>

        <div className={styles.introCard}>
          <p className={styles.introText}>
            Découvrez ma gamme de miels locaux, chacun avec ses caractéristiques uniques,
            produits avec passion en Loire-Atlantique.
          </p>
        </div>

        <div className={styles.honeysGrid}>
          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🌸</div>
            <h3 className={styles.honeyTitle}>Miel de Fleurs</h3>
            <p className={styles.honeyDescription}>
              Doux et parfumé, notre miel de fleurs est récolté au printemps.
              Il offre un goût délicat et une texture crémeuse.
            </p>
          </div>

          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🌳</div>
            <h3 className={styles.honeyTitle}>Miel de Forêt</h3>
            <p className={styles.honeyDescription}>
              Corsé et intense, ce miel est issu des essences forestières.
              Riche en minéraux, il a une couleur sombre caractéristique.
            </p>
          </div>

          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🌻</div>
            <h3 className={styles.honeyTitle}>Miel de Tournesol</h3>
            <p className={styles.honeyDescription}>
              Doux et fruité, ce miel jaune d'or cristallise rapidement.
              Parfait pour les tartines du petit-déjeuner.
            </p>
          </div>

          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🌾</div>
            <h3 className={styles.honeyTitle}>Miel de Sarrasin</h3>
            <p className={styles.honeyDescription}>
              Typique de notre région, ce miel sombre a un goût puissant et maltés.
              Excellent pour la santé.
            </p>
          </div>

          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🍀</div>
            <h3 className={styles.honeyTitle}>Miel de Trèfle</h3>
            <p className={styles.honeyDescription}>
              Léger et délicat, ce miel blanc crémeux est parfait pour adoucir
              les boissons chaudes et les desserts.
            </p>
          </div>

          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🌿</div>
            <h3 className={styles.honeyTitle}>Miel de Printemps</h3>
            <p className={styles.honeyDescription}>
              Un mélange harmonieux des premières fleurs de la saison.
              Doux et équilibré.
            </p>
          </div>
        </div>

        {/* Section Cristallisation */}
        <div className={styles.crystallizationSection}>
          <div className={styles.crystallizationHeader}>
            <span className={styles.crystallizationIcon}>💎</span>
            <h2 className={styles.crystallizationTitle}>Miel cristallisé, Miel de qualité !</h2>
          </div>

          <div className={styles.crystallizationContent}>
            <div className={styles.crystallizationText}>
              <div className={styles.crystallizationSubsection}>
                <h3 className={styles.crystallizationSubtitle}>❓ Pourquoi le miel cristallise ?</h3>
                <p className={styles.crystallizationParagraph}>
                  La cristallisation est un phénomène naturel et inévitable du miel. Loin d'être un défaut, elle est même un gage de qualité !
                </p>
                <p className={styles.crystallizationParagraph}>
                  Le miel est une solution naturellement saturée en sucres, principalement le glucose et le fructose. Avec le temps, le glucose se sépare de l'eau pour former de petits cristaux, ce qui épaissit et durcit le miel.
                </p>
              </div>

              <div className={styles.crystallizationSubsection}>
                <h3 className={styles.crystallizationSubtitle}>🔄 Comment rendre le miel liquide ?</h3>
                <p className={styles.crystallizationParagraph}>
                  Que vous le préfériez liquide pour les boissons, ou crémeux pour les tartines, la cristallisation est totalement réversible sans perdre les bienfaits du miel. Pour le liquéfier (le rendre fluide) :
                </p>
                <ul className={styles.crystallizationList}>
                  <li>Remplissez une casserole d'eau tiède (environ 40 °C).</li>
                  <li>Plongez le pot de miel (sans son couvercle) dans l'eau.</li>
                  <li>Laissez-le jusqu'à ce qu'il redevienne liquide, en remuant de temps en temps.</li>
                  <li>Pour un miel crémeux : Laissez-le refroidir et commencez à le brasser doucement avec une cuillère plusieurs fois par jour pendant quelques jours.</li>
                </ul>
                <div className={styles.warningBox}>
                  <p className={styles.warningText}>
                    <strong>⚠️ Attention :</strong> Ne jamais chauffer le miel au-delà de 40°C !
                  </p>
                </div>
                <p className={styles.crystallizationParagraph} style={{marginTop: '1rem', fontWeight: 600, color: 'var(--color-primary)'}}>
                  Bonne dégustation ! 🍯
                </p>
              </div>
            </div>

            <div className={styles.crystallizationImageWrapper}>
              <div className={styles.placeholderImage}>🍯</div>
            </div>
          </div>
        </div>

        <div className={styles.ctaButtons}>
          <Link href="/" className={styles.btnSecondary}>
            ← Retour à l'accueil
          </Link>
          <Link href="/tracabilite" className={styles.btnPrimary}>
            🔍 Tracer votre miel
          </Link>
        </div>
      </section>
    </div>
  );
}
