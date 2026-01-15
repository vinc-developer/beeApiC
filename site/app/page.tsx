import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";
import ImageGallery from "@/components/gallery/ImageGallery";
import ProductCard from "@/components/shop/ProductCard";
import productsData from "@/data/products.json";

// Fonction pour sélectionner des produits aléatoires
function getRandomProducts(count: number = 3) {
  const products = [...productsData.products];
  const shuffled = products.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Home() {
  // nombre de produit à afficher
  const featuredProducts = getRandomProducts(4);
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}
               style={{
                 '--bg-cadre-miel': `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/cadre-miel.jpg')`
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
        {/* Section Présentation */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            <div className={styles.companyHeader}>
              <span className={styles.companyIcon}>🐝</span>
              <h2 className={styles.companyTitle}>Producteur de miel et sauveteur d'essaims</h2>
            </div>
            <div className={styles.companyContent}>
              <div className={styles.companyInfo}>
                <p className={styles.companyDescription}>
                  Partez à la découverte des richesses de la ruche : du miel de printemps, doux et floral, au miel d'été, aux notes
                  plus intenses et ensoleillées.
                </p>
                <p className={styles.companyDescription}>
                  J'interviens également pour récupérer les essaims d'abeilles installés dans des arbres, poteaux ou autres endroits
                  inattendus, afin de leur offrir un nouveau foyer en toute sécurité.
                </p>
              </div>
              <div className={styles.companyContact}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/essaim.jpg`}
                  alt="Essaim d'abeilles Bee Api'C"
                  style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section Boutique */}
        <section className={styles.companySection}>
          <div className={styles.shopHeader}>
            <div>
              <h2 className={styles.sectionTitle}>
                Boutique en ligne
              </h2>
              <p className={styles.shopSubtitle}>
                Découvrez nos miels et produits de la ruche, disponibles à la commande
              </p>
            </div>
          </div>

          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
          </div>

          <div className={styles.backLinkContainer}>
            <Link href="https://bee-apic.sumupstore.com/produits" className={styles.btnLink }>
              Voir tous nos produits
            </Link>
          </div>
        </section>

        {/* Section Fabrication */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            <div className={styles.companyHeader}>
              <span className={styles.companyIcon}>🌿</span>
              <h2 className={styles.companyTitle}>Fabrication artisanale et éco-responsable</h2>
            </div>
            <div className={styles.companyContent}>
              <div className={styles.companyInfo}>
                <p className={styles.companyDescription}>
                  Tous mes produits sont fabriqués dans le respect des traditions et de la nature.
                </p>
                <p className={styles.companyDescription}>
                  Mon hydromel est élaboré en dame-jeanne, puis lentement maturé en fût de chêne pour développer des arômes profonds et authentiques. Pour préserver ses qualités, je conseille de le conserver à 10 °C.
                </p>
                <p className={styles.companyDescription}>
                  Mon miel, quant à lui, est extrait à chaud à l'aide d'un extracteur manuel et mis en pot à la main, sans aucun traitement ni ajout. Il conserve ainsi toute sa richesse naturelle. Pour une conservation optimale, gardez-le à 14 °C à l'abri de la lumière.
                </p>
              </div>
              <div className={styles.companyContact}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/miels.jpg`}
                  alt="Pots de miel Bee Api'C"
                  style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
                />
              </div>
            </div>
            <div className={styles.companyLabel} style={{ marginTop: '1.5rem' }}>
              <span className={styles.labelIcon}>♻️</span>
              <span className={styles.labelText}>
                Dans une démarche éco-responsable, je récupère également les pots et les bouteilles vides. N'hésitez pas à les rapporter pour leur offrir une seconde vie !
              </span>
            </div>
            <p className={styles.companyDescription} style={{ marginTop: '1rem' }}>
              Et parce que chaque geste compte, j'imprime mes étiquettes uniquement en fonction des besoins réels, en petites quantités, pour éviter tout gaspillage inutile.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.companySection}>
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

        {/* Section La vie autour de la ruche */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            <div className={styles.companyHeader}>
              <span className={styles.companyIcon}>🌸</span>
              <h2 className={styles.companyTitle}>La vie autour de la ruche</h2>
            </div>
            <p className={styles.companyDescription}>
              Chaque photo témoigne d'un engagement : préserver le vivant, respecter les saisons, et offrir des produits vrais et locaux.
            </p>
            <ImageGallery
              images={[
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/vincent-colas/colas-vincent.jpg`,
                  alt: "Vincent Colas - Apiculteur Bee Api'C"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/produits.jpg`,
                  alt: "Produits de la ruche Bee Api'C"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/abeille-fleur.jpeg`,
                  alt: "Abeille dans une fleur"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/abeille-ruchette.jpeg`,
                  alt: "Abeille sur une ruchette"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/abeilles-miel.jpeg`,
                  alt: "Abeilles qui mangent du miel"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/abeilles-ruche.jpeg`,
                  alt: "Abeilles sur une ruche Bee Api'C"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/cadre.jpeg`,
                  alt: "Cadre de ruche Bee Api'C"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/cadre-miel.jpg`,
                  alt: "Cadre de miel"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/rucher-foret.jpeg`,
                  alt: "Rucher dans la forêt"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/ruche-foret.jpeg`,
                  alt: "Ruche dans la forêt"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/visite.jpeg`,
                  alt: "Visite d'une ruche"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/rucher.jpeg`,
                  alt: "Rucher dans les Pays de Retz"
                }
              ]}
            />
          </div>
        </section>

        {/* Section Ce que nous proposons */}
        <section className={styles.companySection}>
          <div className={styles.propositionCard}>
            <h2 className={styles.featuresTitle}>
              Ce que nous proposons !
            </h2>
            <p className={styles.featuresSubtitle}>
              Chez Bee Api'C, nous valorisons un miel local, authentique et transparent, issu de notre rucher et de nos
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
                  Nos miels sont également disponibles dans certains magasins partenaires de la région, afin de faciliter l'accès
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
                  scolaires et locales dans l'organisation de ventes de miel.
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
                  les producteurs, échanger autour de l'apiculture et faire découvrir nos miels dans une ambiance conviviale.
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
                  À travers différentes actions, les entreprises peuvent soutenir l'apiculture, la biodiversité et les circuits courts, tout en valorisant leur engagement auprès de leurs collaborateurs et partenaires.
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  🤝
                </div>
                <h3 className={styles.featureTitle}>Une charte qualité Bee Api'C</h3>
                <p className={styles.featureDescription}>
                  Tous les miels proposés par Bee Api'C, y compris ceux de nos partenaires, respectent une charte qualité
                  exigeante, fondée sur des critères de qualité, de traçabilité et de transparence.
                  Cette démarche garantit la provenance locale du miel et un produit respectueux des bonnes pratiques apicoles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Merci */}
        <section className={styles.companySection}>
          <div className={styles.thanksCard}>
            <h2 className={styles.companyTitle}>Merci de faire partie de cette aventure</h2>
            <br />
            <p className={styles.companyDescription}>
              Mon apiculture est née d'une passion, mais elle ne prend tout son sens que dans l'échange et le partage.
              En choisissant mes produits, en visitant mes ruchers ou simplement en vous intéressant aux abeilles, vous participez
              vous aussi à leur préservation.
            </p>
            <br />
            <p className={styles.companyDescription}>
              🌼 MERCI pour elles, merci pour nous 🌼
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
