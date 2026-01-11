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

        <div className={styles.featuresGrid} style={{marginTop: '2rem'}}>
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

        <div>
          <h2>Miel cristallisé, Miel de qualité ! </h2>
          <img src="" alt=""/>
          <h3>Pourquoi le miel cristallise ?</h3>
          <p>
            La cristallisation est un phénomène naturel et inévitable du miel. Loin d'être un défaut, elle est même un gage de
            qualité !
            Le miel est une solution naturellement saturée en sucres, principalement le glucose et le fructose. Avec le temps, le
            glucose se sépare de l'eau pour former de petits cristaux, ce qui épaissit et durcit le miel.
          </p>
          <h3>Comment rendre le miel liquide ?</h3>
          <p>
            Que vous le préfériez liquide pour les boissons, ou crémeux pour les tartines, la cristallisation est totalement
            réversible sans perdre les bienfaits du miel. Pour le liquéfier (le rendre fluide) :
          </p>
          <li>
            <ul>
              <li>Remplissez une casserole d'eau tiède (environ 40 °).</li>
              <li> Plongez le pot de miel (sans son couvercle) dans l'eau.</li>
              <li>Laissez-le jusqu'à ce qu'il redevienne liquide, en remuant de temps en temps.</li>
              <li>Crémeux : Laissez-le refroidir et commencez à le brasser doucement avec une cuillère plusieurs fois par jour
                pendant quelques jours.
              </li>
            </ul>
          </li>
          <p>
            Attention : Ne jamais chauffer le miel au-delà de 40° !
            Bonne dégustation !
          </p>
        </div>

        <div style={{marginTop: '2rem', textAlign: 'center'}}>
          <Link href="/" className={styles.btnSecondary} style={{marginLeft: '1rem'}}>
            ← Retour à l'accueil
          </Link>
          <Link href="/tracabilite" className={styles.btnPrimary}>
            🔍 Tracer votre miel
          </Link>
          {' '}
        </div>
      </section>
    </div>
  );
}

