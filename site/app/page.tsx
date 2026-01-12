import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}
               style={{
                 '--bg-cadre-miel': `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/cadre-miel.jpg')`
               } as React.CSSProperties}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🐝</span>
              <span className={styles.badgeText}>
                Miel 100% Local de Loire Atlantique
              </span>
            </div>

            <h1 className={styles.title}>
              <span className={styles.titleGradient}>{siteConfig.name}</span>
            </h1>

            <p className={styles.slogan}>
              {siteConfig.slogan}
            </p>

            <div className={styles.ctaButtons}>
              <Link
                href="/tracabilite"
                className={styles.btnPrimary}
              >
                🔍 Tracer mon miel
              </Link>
              <Link
                href="/a-propos"
                className={styles.btnSecondary}
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className={styles.heroDivider}></div>
      </section>

      <div className={styles.container}>

        <section className={styles.featuresSection}>
          <div>
            <h2>🐝 Producteur de miel et sauveteur d'essaims</h2>
            <p>
              Partez à la découverte des richesses de la ruche : du miel de printemps, doux et floral, au miel d'été, aux notes
              plus intenses et ensoleillées.
              J'interviens également pour récupérer les essaims d’abeilles installés dans des arbres, poteaux ou autres endroits
              inattendus, afin de leur offrir un nouveau foyer en toute sécurité.
            </p>
            <img src="" alt="photo bee api'c"/>
          </div>
          <div>
            <h2>🌿 Fabrication artisanale et éco-responsable</h2>
            <p>
              Tous mes produits sont fabriqués dans le respect des traditions et de la nature.
              Mon hydromel est élaboré en dame-jeanne, puis lentement maturé en fût de chêne pour développer des arômes profonds et authentiques. Pour préserver ses qualités, je conseille de le conserver à 10 °C.
              Mon miel, quant à lui, est extrait à chaud à l’aide d’un extracteur manuel et mis en pot à la main, sans aucun traitement ni ajout. Il conserve ainsi toute sa richesse naturelle. Pour une conservation optimale, gardez-le à 14 °C à l’abri de la lumière.
              Dans une démarche éco-responsable, je récupère également les pots et les bouteilles vides. N’hésitez pas à les rapporter pour leur offrir une seconde vie !
              Et parce que chaque geste compte, j’imprime mes étiquettes uniquement en fonction des besoins réels, en petites quantités, pour éviter tout gaspillage inutile.
            </p>
          </div>
          <div>
            <h2>🌸 La vie autour de la ruche</h2>
            <p>
              Chaque photo témoigne d’un engagement : préserver le vivant, respecter les saisons, et offrir des produits vrais et locaux.
            </p>
            <div>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
              <img src="" alt="photo bee api'c"/>
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

        <section className={styles.featuresSection}>
          <div className={styles.featuresContainer}>
            <h2 className={styles.featuresTitle}>
              Ce que nous proposons !
            </h2>
            <p className={styles.featuresSubtitle}>
              Chez Bee Api’C, nous valorisons un miel local, authentique et transparent, issu de notre rucher et de nos
                apiculteurs partenaires.
            </p>

            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🍯
                </div>
                <h3 className={styles.featureTitle}>Vente de miel en direct pour les particuliers</h3>
                <p className={styles.featureDescription}>
                  Nous proposons du miel local en vente directe, du producteur au consommateur. Une relation de confiance, sans
                  intermédiaire, pour découvrir des miels de qualité, récoltés avec soin et dans le respect des abeilles.
                  Nos miels sont également disponibles dans certains magasins partenaires de la région, afin de faciliter l’accès
                  à une production locale et responsable.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🏫
                </div>
                <h3 className={styles.featureTitle}>Ventes de miel pour les associations et écoles</h3>
                <p className={styles.featureDescription}>
                  Comme pour les traditionnelles ventes de brioches, saucissons ou bières, nous accompagnons les associations
                  scolaires et locales dans l’organisation de ventes de miel.
                  Une solution originale et locale pour soutenir des projets tout en faisant découvrir un produit naturel et
                  responsable.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🎄
                </div>
                <h3 className={styles.featureTitle}>Marchés de Noël et événements locaux</h3>
                <p className={styles.featureDescription}>
                  Nous participons également à des marchés de Noël et événements locaux, des moments privilégiés pour rencontrer
                  les producteurs, échanger autour de l’apiculture et faire découvrir nos miels dans une ambiance conviviale.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🧑‍🍳
                </div>
                <h3 className={styles.featureTitle}>Vente de miel en seaux pour les professionnels</h3>
                <p className={styles.featureDescription}>
                  Nous proposons également du miel en seaux à destination des professionnels :
                  boulangers, pâtissiers, restaurateurs, cantines, collectivités, ou tout autre métier ayant besoin de miel de
                  qualité pour ses préparations.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🏢
                </div>
                <h3 className={styles.featureTitle}>Partenariats avec les entreprises & démarche RSE</h3>
                <p className={styles.featureDescription}>
                  Nous accompagnons également les entreprises souhaitant intégrer une dimension locale et environnementale à leur politique RSE, en travaillant directement avec des apiculteurs locaux.
                  À travers différentes actions, les entreprises peuvent soutenir l’apiculture, la biodiversité et les circuits courts, tout en valorisant leur engagement auprès de leurs collaborateurs et partenaires.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🤝
                </div>
                <h3 className={styles.featureTitle}>Une charte qualité Bee Api’C</h3>
                <p className={styles.featureDescription}>
                  Tous les miels proposés par Bee Api’C, y compris ceux de nos partenaires, respectent une charte qualité
                  exigeante, fondée sur des critères de qualité, de traçabilité et de transparence.
                  Cette démarche garantit la provenance locale du miel et un produit respectueux des bonnes pratiques apicoles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
