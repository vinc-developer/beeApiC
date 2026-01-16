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
      </section>

      <div className={styles.container}>

        {/* Section Entête */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            <div className={styles.companyHeader}>
              <h2 className={styles.companyTitle}>Bienvenue dans l'univers de Bee Api'C</h2>
            </div>
            <div className={styles.companyInfo}>
              <p className={styles.companyDescription}>
                Bienvenue chez Bee Api'C, une apiculture locale engagée au service des abeilles et de la biodiversité en Loire-Atlantique.
                Animé par une passion profonde pour le monde de la ruche, Bee Api'C vous invite à découvrir l'univers fascinant des abeilles, leur rôle essentiel dans notre écosystème et le travail minutieux qui se cache derrière chaque pot de miel.
              </p>
              <p className={styles.companyDescription}>
                Que vous soyez simplement curieux, sensible à la protection de la nature ou amateur de produits locaux et authentiques, ce site est une porte d'entrée vers une apiculture respectueuse et transparente. Vous y découvrirez mes pratiques, mes ruchers, les miels que je produis ainsi que mes actions pour la sauvegarde des essaims.
              </p>
              <p className={styles.companyDescription}>
                À travers Bee Api'C, mon objectif est simple : protéger les abeilles, produire un miel de qualité et partager une vision responsable et locale de l'apiculture.
              </p>
            </div>
          </div>
        </section>

        {/* Section Biodiversité */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            <div className={styles.companyHeader}>
              <h2 className={styles.companyTitle}> <span className={styles.companyIcon}>🌱</span> Préserver l'abeille c'est
                préserver la biodiversité</h2>
            </div>
            <div className={styles.biodivContent}>
              <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/abeille-fleur.jpeg`}
                  alt="Abeille et biodiversité"
                  className={styles.biodivImage}
                  style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
              />
                <p className={styles.biodivDescription}>
                  Les abeilles jouent un rôle essentiel dans la préservation de la biodiversité. Elles sont avant tout des
                  pollinisateurs particulièrement efficaces : en transportant le pollen d'une fleur à l'autre, elles permettent la
                  reproduction de nombreuses plantes à fleurs. Une grande partie des espèces végétales, qu'il s'agisse de fruits,
                  de légumes ou de fleurs sauvages, dépend directement de leur action. Sans les abeilles, la reproduction de ces
                  plantes serait fortement compromise, entraînant une baisse significative de la diversité végétale.
                </p>
                <p className={styles.biodivDescription}>
                  Cette pollinisation est également indispensable au maintien de l'équilibre écologique. Les plantes constituent
                  la base de la chaîne alimentaire pour de nombreux animaux. Une diminution des populations végétales, causée par
                  un manque de pollinisation, aurait donc des répercussions en cascade sur l'ensemble des écosystèmes et sur les
                  espèces qui en dépendent.
                </p>
                <p className={styles.biodivDescription}>
                  Les abeilles jouent aussi un rôle majeur dans l'alimentation humaine. Elles participent directement à la
                  production de nombreuses cultures agricoles, notamment les fruits, les légumes et certaines cultures
                  céréalières. Leur disparition aurait un impact immédiat sur la quantité, la diversité et la qualité des aliments
                  que nous consommons au quotidien.
                </p>
                <p className={styles.biodivDescription}>
                  Enfin, la pollinisation croisée réalisée par les abeilles favorise la diversité génétique des plantes. Cette
                  diversité renforce leur résistance face aux maladies, aux parasites et aux changements environnementaux,
                  contribuant ainsi à la résilience et à la santé des écosystèmes.
                </p>
                <p className={styles.biodivDescription}>
                  En protégeant les abeilles, nous préservons bien plus qu'un insecte : nous protégeons la biodiversité, la
                  stabilité des écosystèmes et notre propre avenir alimentaire 🐝🌱
                </p>
            </div>
          </div>
        </section>

        {/* Section Présentation */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            <div className={styles.companyHeader}>
              <h2 className={styles.companyTitle}>  <span className={styles.companyIcon}>🐝</span> Producteur de miel et sauveteur
                d'essaims</h2>
            </div>
            <div className={styles.companyContent}>
              <div className={styles.companyInfo}>
                <p className={styles.companyDescription}>
                  Je vous invite à découvrir le monde de la ruche à travers des miels produits localement, avec patience, respect
                  et passion. Chaque saison révèle ses particularités : un miel de printemps doux et floral, puis un miel d’été
                  plus intense, façonné par la diversité des fleurs qui entourent mes ruches en Loire-Atlantique. Derrière chaque
                  pot se cache le travail remarquable des abeilles, accompagné d’une attention constante portée à leur bien-être.
                </p>
                <p className={styles.companyDescription}>
                  En parallèle de mon activité de producteur, je suis également engagé dans le sauvetage des essaims d’abeilles.
                  Lorsqu’un essaim s’installe dans un lieu inattendu, j’interviens pour le récupérer sans le détruire, afin de lui
                  offrir un environnement adapté et durable.
                </p>
                <p className={styles.companyDescription}>
                  Produire du miel local, sauver des essaims et protéger les pollinisateurs, c’est pour moi une démarche globale :
                  préserver la biodiversité, transmettre une apiculture responsable et partager en toute transparence le fruit de
                  ce travail avec vous.
                </p>

                <div className={styles.backLinkContainer}>
                  <Link href="/essaims" className={styles.btnLink}>
                    En savoir plus sur la récupération d'essaims
                  </Link>
                </div>
              </div>
              <div className={styles.imagePresentation}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/essaim.jpg`}
                    alt="Essaim d'abeilles Bee Api'C"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
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
                Découvrez mes miels et produits de la ruche, disponibles à la commande
              </p>
            </div>
          </div>

          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
          </div>

          <div className={styles.backLinkContainer}>
            <Link href="https://bee-apic.sumupstore.com/produits" className={styles.btnLink} target="_blank">
              Voir tous les produits
            </Link>
          </div>
        </section>

        {/* Section Fabrication */}
        <section className={styles.companySection}>
          <div className={styles.companyCard}>
            <div className={styles.companyHeader}>
              <h2 className={styles.companyTitle}>  <span className={styles.companyIcon}>🌿</span> Fabrication artisanale et
                éco-responsable</h2>
            </div>
            <div className={styles.companyContent}>
              <div className={styles.companyInfo}>
                <p className={styles.companyDescription}>
                  Tous mes produits sont fabriqués dans le respect des traditions et de la nature.
                </p>
                <p className={styles.companyDescription}>
                  Mon hydromel est élaboré en dame-jeanne, puis lentement maturé en fût de chêne pour développer des arômes
                  profonds et authentiques. Pour préserver ses qualités, je conseille de le conserver à 10 °C.
                </p>
                <p className={styles.companyDescription}>
                  Mon miel, quant à lui, est extrait à chaud à l'aide d'un extracteur manuel et mis en pot à la main, sans aucun
                  traitement ni ajout. Il conserve ainsi toute sa richesse naturelle. Pour une conservation optimale, gardez-le à
                  14 °C à l'abri de la lumière.
                </p>
              </div>
              <div className={styles.companyContact}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/miels.jpg`}
                    alt="Pots de miel Bee Api'C"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                />
              </div>
            </div>
            <div className={styles.companyLabel} style={{marginTop: '1.5rem'}}>
              <span className={styles.labelIcon}>♻️</span>
              <span className={styles.labelText}>
                Dans une démarche éco-responsable, je récupère également les pots et les bouteilles vides. N'hésitez pas à les rapporter pour leur offrir une seconde vie !
              </span>
            </div>
            <p className={styles.companyDescription} style={{marginTop: '1rem'}}>
              Et parce que chaque geste compte, j'imprime mes étiquettes uniquement en fonction des besoins réels, en petites
              quantités, pour éviter tout gaspillage inutile.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
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
              <h2 className={styles.companyTitle}>La vie autour de la ruche</h2>
            </div>
            <p className={styles.companyDescription}>
              Chaque photo témoigne d'un engagement : préserver le vivant, respecter les saisons, et offrir des produits vrais et
              locaux.
            </p>
            <ImageGallery
                images={[
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/abeille-fleur.jpeg`,
                    alt: "Vincent Colas - Apiculteur Bee Api'C"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/rucher-hiver.jpg`,
                    alt: "Rucher dans les Pays de Retz"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/abeilles-ruche.jpeg`,
                    alt: "Abeille sur une ruchette"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/abeille-fleurs.jpeg`,
                    alt: "Produits de la ruche Bee Api'C"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre.jpeg`,
                    alt: "Abeilles qui mangent du miel"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre-miel.jpeg`,
                    alt: "Cadre de ruche Bee Api'C"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre-miel.jpg`,
                    alt: "Cadre de miel"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre-abeille.jpg`,
                    alt: "Abeilles sur une ruche Bee Api'C"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cire-gaufre.jpg`,
                    alt: "Rucher dans la forêt"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/fleur-chataigner.jpg`,
                    alt: "Ruche dans la forêt"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/mise-en-pot.jpg`,
                    alt: "Visite d'une ruche"
                  },
                  {
                    src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/reine.jpeg`,
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

              <div className={`${styles.featureCard} ${styles.lastFeatureCard}`}>
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

              <div className={`${styles.featureCard} ${styles.lastFeatureCard}`}>
                <div className={styles.featureIcon}>
                  🏢
                </div>
                <h3 className={styles.featureTitle}>Partenariats avec les entreprises & démarche RSE</h3>
                <p className={styles.featureDescription}>
                  Nous accompagnons également les entreprises souhaitant intégrer une dimension locale et environnementale à leur
                  politique RSE, en travaillant directement avec des apiculteurs locaux.
                  À travers différentes actions, les entreprises peuvent soutenir l'apiculture, la biodiversité et les circuits
                  courts, tout en valorisant leur engagement auprès de leurs collaborateurs et partenaires.
                </p>
              </div>

              <div className={`${styles.featureCard} ${styles.lastFeatureCard}`}>
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
            <br/>
            <p className={styles.companyDescription}>
              Mon apiculture est née d'une passion, mais elle ne prend tout son sens que dans l'échange et le partage.
              En choisissant mes produits, en visitant mes ruchers ou simplement en vous intéressant aux abeilles, vous participez
              vous aussi à leur préservation.
            </p>
            <br/>
            <p className={styles.companyDescription}>
              🌼 MERCI pour elles, merci pour nous 🌼
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
