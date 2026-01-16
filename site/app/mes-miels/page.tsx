import Link from "next/link";
import styles from "./page.module.css";

export default function MesMielsPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Mes Miels
        </h1>
        <div className={styles.introPresentation}>
          <p>Chaque pot de miel que je produis raconte une histoire : celle des fleurs, des saisons et des abeilles qui l’ont
            créé.
            Mon objectif est simple : offrir un miel local, authentique et vivant, où l’on retrouve toute la richesse du Pays de
            Retz.</p>
          <br/>
          <p> Je propose différents types de miels selon les floraisons et les saisons. Au printemps, les abeilles butinent les
            fleurs tendres et parfumées, donnant un miel doux et floral. En été, le miel devient plus corsé, avec des notes
            chaudes et intenses, reflet de la diversité florale et du soleil généreux. Chaque récolte est unique, et aucun pot ne
            se ressemble totalement : c’est ce qui fait la beauté du miel de terroir.</p>
          <br/>
          <p>
            Tous mes miels sont récoltés avec soin, directement dans mes ruchers. Je veille à respecter le rythme naturel des
            colonies, pour ne prélever que ce qui peut être produit sans compromettre leur bien-être. Cela garantit un miel riche
            en goût, en arômes et en nutriments, tout en préservant la santé des abeilles.
          </p>
          <br/>
          <p>
            Que vous soyez amateur de douceurs ou curieux de nouvelles saveurs, je vous invite à découvrir et savourer mes miels,
            un produit 100% local, fruit du travail passionné de mes abeilles et de mon engagement pour une apiculture
            respectueuse de la nature.
          </p>
        </div>

        <h3 className={styles.titleMiel}> Découvrez ma gamme de miels locaux, produits en Loire-Atlantique</h3>

        <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/miel/miels-wallpaper.jpg`}
            alt="plusieurs pots de miel"
            style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
        />

        <div className={styles.honeysGrid}>
          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🍀</div>
            <h3 className={styles.honeyTitle}>Miel de Printemps</h3>
            <p className={styles.honeyDescription}>
              Un mélange harmonieux des premières fleurs de la saison.
              Doux et équilibré.
            </p>
          </div>
          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🏵️</div>
            <h3 className={styles.honeyTitle}>Miel d'acacia</h3>
            <p className={styles.honeyDescription}>
              Miel rare et capricieux, au goût délicat et floral.
              Excellent pour les enfants.
            </p>
          </div>

          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🌸</div>
            <h3 className={styles.honeyTitle}>Miel toutes Fleurs</h3>
            <p className={styles.honeyDescription}>
              Doux et parfumé, notre miel toutes fleurs est récolté durant toute la saison.
              Il offre un goût délicat et une texture crémeuse.
            </p>
          </div>
          <div className={styles.honeyCard}>
            <div className={styles.honeyIcon}>🌿</div>
            <h3 className={styles.honeyTitle}>Miel d'été</h3>
            <p className={styles.honeyDescription}>
              Léger et délicat, ce miel liquide est parfait pour adoucir
              les boissons chaudes et les desserts.
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
            <div className={styles.honeyIcon}>🌲</div>
            <h3 className={styles.honeyTitle}>Miel de Sapin</h3>
            <p className={styles.honeyDescription}>
              Miel rare et précieux, au goût résineux et boisé.
              Puissant en antioxydants, il est idéal pour les amateurs de saveurs fortes.
            </p>
          </div>
        </div>

        {/* Section Cristallisation */}
        <div className={styles.crystallizationSection}>
          <div className={styles.crystallizationHeader}>
            <h2 className={styles.crystallizationTitle}>Miel cristallisé, Miel de qualité !</h2>
          </div>

          <div className={styles.crystallizationContent}>
            <div className={styles.crystallizationText}>
              <div className={styles.crystallizationSubsection}>
                <h3 className={styles.crystallizationSubtitle}>❓ Pourquoi le miel cristallise ?</h3>
                <p className={styles.crystallizationParagraph}>
                  La cristallisation est un phénomène naturel et inévitable du miel. Loin d'être un défaut, elle est même un gage
                  de qualité !
                </p>
                <p className={styles.crystallizationParagraph}>
                  Le miel est une solution naturellement saturée en sucres, principalement le glucose et le fructose. Avec le
                  temps, le glucose se sépare de l'eau pour former de petits cristaux, ce qui épaissit et durcit le miel.
                </p>
              </div>

              <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/miel/miel-cristalise.jpg`}
                  alt="Miel cristallisé"
                  style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
              />

              <div className={styles.crystallizationSubsection}>
                <h3 className={styles.crystallizationSubtitle}>🔄 Comment rendre le miel liquide ?</h3>
                <p className={styles.crystallizationParagraph}>
                  Que vous le préfériez liquide pour les boissons, ou crémeux pour les tartines, la cristallisation est totalement
                  réversible sans perdre les bienfaits du miel. Pour le liquéfier (le rendre fluide) :
                </p>
                <ul className={styles.crystallizationList}>
                  <li>Remplissez une casserole d'eau tiède (environ 40 °C).</li>
                  <li>Plongez le pot de miel (sans son couvercle) dans l'eau.</li>
                  <li>Laissez-le jusqu'à ce qu'il redevienne liquide, en remuant de temps en temps.</li>
                  <li>Pour un miel crémeux : Laissez-le refroidir et commencez à le brasser doucement avec une cuillère plusieurs
                    fois par jour pendant quelques jours.
                  </li>
                </ul>
                <div className={styles.warningBox}>
                  <p className={styles.warningText}>
                    <strong>⚠️ Attention :</strong> Ne jamais chauffer le miel au-delà de 40°C !
                  </p>
                </div>
                <p className={styles.crystallizationParagraph}
                   style={{marginTop: '1rem', fontWeight: 600, color: 'var(--color-primary)'}}>
                  Bonne dégustation ! 🍯
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ctaButtons}>
          <Link href="/tracabilite" className={styles.btnPrimary}>
            🔍 Tracer votre miel
          </Link>
        </div>
      </section>
    </div>
  );
}
