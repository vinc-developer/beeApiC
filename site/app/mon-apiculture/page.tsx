import styles from "./page.module.css";
import {Metadata} from "next";
import ImageGallery from "@/components/gallery/ImageGallery";

export const metadata: Metadata = {
  title: "Mon apiculture – Passion et vision",
  description:
      "Découvrez mon apiculture : passion des abeilles, méthodes de travail, apiculture responsable et vision durable pour demain en Pays de Retz.",
  keywords: [
    "mon apiculture",
    "apiculture responsable",
    "philosophie apicole",
    "apiculteur pays de retz",
    "abeilles",
    "apiculture durable",
  ],
};



export default function MonApiculturePage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Mon apiculture, ma passion
        </h1>
        <p className={styles.intro}>
          Au croisement de la nature et du savoir-faire, je pratique une apiculture artisanale, douce et engagée.
          Chaque ruche raconte une histoire de passion, de respect et de transmission.
        </p>

        <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/apiculture/abeilles-ruches-wallpaper.jpg`}
            alt="Colonie d'abeilles sur des cadres de ruche"
            style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
        />

        <div className={styles.contentWrapper}>

          {/* Section Philosophie */}
          <div className={styles.philosophyCard}>
            <div className={styles.philosophyHeader}>
              <h2 className={styles.philosophyTitle}>Ma philosophie apicole</h2>
              <p className={styles.philosophyDescription}>
                Une approche respectueuse de l'environnement et des abeilles, avec un engagement pour une production durable.
              </p>
            </div>

            <div className={styles.philosophyGrid}>
              <div className={styles.philosophySection}>
                <h3 className={styles.philosophySectionTitle}>🌿 Ma philosophie</h3>
                <p className={styles.philosophySectionText}>
                  Je pratique une apiculture raisonnée, respectueuse des abeilles et de l'environnement.
                  Mon objectif est de produire un miel de qualité tout en préservant la santé de mes colonies
                  et la biodiversité locale.
                </p>
              </div>

              <div className={styles.philosophySection}>
                <h3 className={styles.philosophySectionTitle}>🐝 Mes pratiques</h3>
                <ul className={styles.philosophyList}>
                  <li>Ruches installées dans des zones préservées de Loire-Atlantique</li>
                  <li>Respect du cycle naturel des abeilles</li>
                  <li>Nourrissement limité et naturel</li>
                  <li>Traçabilité complète de la production</li>
                  <li>Formation continue aux meilleures pratiques</li>
                </ul>
              </div>

              <div className={styles.philosophySection}>
                <h3 className={styles.philosophySectionTitle}>💚 Mes engagements</h3>
                <p className={styles.philosophySectionText}>
                  Je m'engage à produire un miel 100% naturel, sans traitement chimique,
                  en préservant la santé de mes abeilles et en respectant l'environnement.
                </p>
              </div>
            </div>
          </div>

          {/* Section Une passion, un engagement */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Une passion, un engagement</h2>
            </div>
            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre-miel.jpg`}
                alt="Hausse de miel avec un cadre de miel operculé"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                C'est grâce à mon frère que j'ai découvert l'apiculture, il y a quelques années. Très vite, ce monde fascinant
                s'est imposé à moi comme une évidence : travailler avec les abeilles, c'est renouer avec la nature, la vraie —
                celle
                qu'on observe, qu'on respecte et dont on apprend chaque jour.
              </p>
              <br/>
              <p className={styles.cardText}>
                Je ne suis pas apiculteur professionnel : je suis développeur informatique de métier. Pourtant, ces deux univers
                ont plus de points communs qu'on ne l'imagine. Tous deux demandent rigueur, patience, logique et observation. Dans
                un rucher comme dans une ligne de code, chaque détail compte, chaque action a des conséquences.
              </p>
              <br/>
              <p className={styles.cardText}>
                Depuis tout petit, j'ai grandi au contact du vivant. Issu d'une famille de chasseurs attachés à la préservation
                des milieux naturels, j'ai appris avec mon père à reconnaître les fleurs, à observer les animaux, à comprendre les
                équilibres subtils entre les espèces. Cette éducation sensible à la nature m'accompagne encore aujourd'hui dans
                chaque visite de rucher, dans chaque décision que je prends pour mes colonies.
              </p>
            </div>
          </div>

          {/* Section Une apiculture douce et responsable */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Une apiculture douce et responsable</h2>
            </div>
            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/vincent-colas/apiculteur.jpeg`}
                alt="Apiculteur qui lève un cadre"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Je pratique une apiculture que je qualifie de douce, car elle commence par l'écoute et l'observation. Avant
                toute intervention, je prends le temps d'observer mes colonies : leur activité, leur comportement, leur
                développement.
                Je respecte leur rythme naturel, et je limite mes actions au strict nécessaire.
              </p>
              <br/>
              <p className={styles.cardText}>
                Mes ruches sont sédentaires : je ne pratique pas la transhumance. Ce choix permet aux abeilles de s'adapter
                pleinement à leur environnement, sans stress, et de construire leurs réserves au fil des floraisons locales. Je
                produis uniquement les essaims et les reines dont j'ai besoin, ce qui me permet de garder un cheptel cohérent,
                en bonne santé, et adapté à son territoire.
              </p>
              <br/>
              <p className={styles.cardText}>
                Mon approche mêle également technologie et rigueur : chaque ruche est identifiée individuellement, tout comme
                chaque hausse. Cela me permet d'assurer un suivi précis, avec une véritable traçabilité de la production. Cette
                transparence, je la partage aussi avec mes clients grâce à un QR code apposé sur mes pots de miel. Ils peuvent
                ainsi connaître la provenance exacte du miel, les dates de récolte, et les principales étapes de sa fabrication.
              </p>
            </div>
          </div>

          {/* Section Des produits sincères */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Des produits sincères, au rythme des saisons</h2>
            </div>
            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/products/miels-couleurs.jpg`}
                alt="plusieurs pots de miel Bee Api'C avec des couleurs différentes"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Je récolte principalement du miel, que je décline selon les périodes de floraison : un miel de printemps aux
                arômes délicats, un miel d'été plus intense, et un miel de forêt aux notes boisées. Lorsque la météo est clémente,
                il m'arrive aussi de proposer un miel d'acacia, rare et très apprécié. Tous mes miels sont issus exclusivement de
                mes propres ruchers, situés dans le Pays de Retz, et ne subissent aucune transformation autre que l'extraction et
                la mise en pot.
              </p>
              <br/>
              <p className={styles.cardText}>
                Une partie de ma production de miel est destinée à la fabrication d'hydromel, que je produis une fois par an.
                C'est un produit singulier, élaboré lentement et avec soin, vieilli en fût de chêne afin de développer ses arômes.
                Je surveille régulièrement son évolution pour garantir un équilibre de saveurs sans dérive.
              </p>
              <br/>
              <p className={styles.cardText}>
                Qu'il s'agisse du miel ou de l'hydromel, tout est conditionné à la main, dans des contenants en verre que je
                récupère pour leur donner une seconde vie. Cette démarche me tient à cœur : elle reflète une production locale,
                artisanale et écoresponsable, où rien n'est laissé au hasard.
              </p>
            </div>
          </div>

          {/* Section Une apiculture pour demain */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Une apiculture pour demain</h2>
            </div>
            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/matthieu-colas/rucher-matthieu.jpg`}
                alt="Rucher de Matthieu Colas en hiver"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                L’avenir de l’apiculture est incertain. Entre le changement climatique, la pression des parasites et la
                menace grandissante du frelon asiatique, les abeilles font face à de nombreux défis. Pourtant, elles restent
                indispensables à la vie, à l’équilibre des écosystèmes, à notre alimentation.
              </p>
              <br/>
              <p className={styles.cardText}>
                C'est pourquoi je m'efforce de sensibiliser à leur importance, à travers chaque discussion avec un client,
                chaque pot de miel vendu. J'encourage à planter des arbres, des haies mellifères, à préserver les fleurs
                sauvages, à piéger les prédateurs quand c'est nécessaire. Je partage aussi mes connaissances sur la flore locale
                et le rôle des abeilles via les réseaux sociaux, et j'ouvre régulièrement mes ruchers au public pour faire
                découvrir, expliquer, démystifier.
              </p>
              <br/>
              <p className={styles.cardText}>
                L'apiculture est aussi pour moi une histoire de transmission. J'emmène souvent ma fille de 4 ans avec moi au
                rucher, pour qu'elle découvre ce monde fascinant, qu'elle comprenne dès le plus jeune âge à quel point les
                abeilles sont précieuses. C'est en semant ces graines de conscience que nous pouvons, je l'espère, préserver
                demain ce que nous aimons tant aujourd'hui.
              </p>
              <br/>
              <p className={styles.cardText}>
                Je continuerai à travailler avec mes deux types d'abeilles, la noire et la buckfast, parce que chacune m'apporte
                à sa façon une joie sincère à chaque visite. Et parce qu'une apiculture durable, respectueuse et engagée, c'est
                aussi celle qui sait garder du plaisir, de l'émerveillement, et du sens.
              </p>
            </div>
          </div>

          {/* Section La vie autour de la ruche */}
          <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>La vie autour de la ruche</h2>
              </div>
              <p className={styles.companyDescription}>
                Chaque photo témoigne d'un engagement : préserver le vivant, respecter les saisons, et offrir des produits vrais et
                locaux.
              </p>
              <ImageGallery
                  images={[
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/abeille-fleur.jpeg`,
                      alt: "Abeille qui butine dans une fleur"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/rucher-hiver.jpg`,
                      alt: "Rucher en hiver dans les Pays de Retz"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/abeilles-ruche.jpeg`,
                      alt: "Abeilles sur l'entrée d'une ruche Bee Api'C"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/abeille-fleurs.jpeg`,
                      alt: "Abeille qui butine des fleurs de laurier"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre.jpeg`,
                      alt: "Cadre de couvain d'une ruche d'abeille"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre-miel.jpeg`,
                      alt: "Cadre de miel d'une ruche Bee Api'C"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre-miel.jpg`,
                      alt: "Cadre de miel operculé avec une hausse de miel"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cadre-abeille.jpg`,
                      alt: "Cadre de couvain avec des abeilles"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/cire-gaufre.jpg`,
                      alt: "Cadre de cire gaufrée pour les abeilles"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/fleur-chataigner.jpg`,
                      alt: "Fleurs de châtaignier"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/mise-en-pot.jpg`,
                      alt: "Miel en cours de mise en pot"
                    },
                    {
                      src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/reine.jpeg`,
                      alt: "Reine des abeilles sur un cadre de ruche"
                    }
                  ]}
              />
            </div>
        </div>
      </section>
    </div>
  );
}
