import Link from "next/link";
import styles from "./page.module.css";
import ImageGallery from "@/components/gallery/ImageGallery";

export default function AuRucherPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Mes abeilles, mes ruchers
        </h1>
        <p className={styles.intro}>
          Depuis plusieurs années, j'élève mes abeilles dans le respect de leur rythme et de leur environnement.
          Découvrez ici mes différents ruchers, les races d'abeilles que j'élève, et les paysages dans lesquels elles butinent.
        </p>

        <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/rucher-foret-wallpaper.jpg`}
            alt="Rucher en Pays de Retz"
            style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
        />

        {/* Section La vie au rucher */}
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <h2 className={styles.infoTitle}>La vie au rucher</h2>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Le quotidien au rucher</h3>
              <p className={styles.infoSectionText}>
                Le rucher est un lieu vivant où l'apiculteur travaille en harmonie avec la nature.
                Chaque saison apporte son lot d'activités : l'entretien des ruches, la surveillance de la santé des colonies,
                et bien sûr, la récolte du miel.
              </p>
            </div>

            <div className={styles.infoSection}>
              <h3 className={styles.infoSectionTitle}>Le rôle des abeilles</h3>
              <p className={styles.infoSectionText}>
                Les abeilles sont essentielles à notre écosystème. Elles pollinisent plus de 80% des plantes à fleurs
                et contribuent à la biodiversité. L'apiculteur veille au bien-être de chaque colonie.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          {/* Section Mes abeilles */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🐝 Mes abeilles</h2>
            </div>
            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/abeilles-miel.jpeg`}
                alt="Rucher en Pays de Retz"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />
            <p className={styles.cardText}>
              Travailler avec les abeilles, c’est avant tout apprendre à ralentir. C’est accepter de s’adapter à leur rythme, à
              leurs réactions, à leur façon de communiquer. Chaque visite au rucher est un moment d’observation et d’écoute, où le
              respect du vivant passe avant tout.
            </p>
            <br/>
            <p className={styles.cardText}>
              Aujourd’hui, j’ai fait le choix de travailler avec une seule race d’abeilles : la Buckfast. Ce choix n’est pas le
              fruit du hasard. La Buckfast est une abeille reconnue pour sa douceur, sa stabilité et sa facilité de travail. Son
              comportement calme permet des interventions plus sereines, aussi bien pour moi que pour les abeilles, et limite le
              stress au rucher.
            </p>
            <br/>
            <p className={styles.cardText}>
              Cette douceur ne signifie pas fragilité. Bien au contraire. La Buckfast est une abeille travailleuse, organisée et
              efficace, capable de bien s’adapter à son environnement et de profiter pleinement des ressources florales qui
              l’entourent. Elle me permet de pratiquer une apiculture plus apaisée, plus respectueuse, et plus accessible,
              notamment lors de moments de découverte ou de sensibilisation.
            </p>
            <br/>
            <p className={styles.cardText}>
              Faire ce choix, c’est assumer une apiculture tournée vers le bien-être des abeilles, la sécurité et le
              partage. <br/> Mon
              objectif reste le même : prendre soin de mes colonies, produire un miel local et de qualité, et transmettre une
              image positive et responsable de l’apiculture, au plus proche des gens et de la nature.
            </p>
            <br/>
          </div>

          {/* Section Mes ruchers */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🌱 Mes ruchers</h2>
            </div>
            <p className={styles.cardText}>
            J’ai installé mes ruchers au cœur du Pays de Retz entre Nantes et Pornic, dans des lieux que j’ai pris le temps de choisir avec soin.
              Tous sont situés à moins de 15 kilomètres les uns des autres, afin de rester sur un territoire cohérent et de
              travailler avec une flore locale que je connais bien. Je privilégie des environnements calmes,
              riches en biodiversité, loin des grandes cultures intensives.
            </p>
            <br/>
            <p className={styles.cardText}>
              Ces emplacements offrent aux abeilles une grande diversité de fleurs tout au long de l’année.
              Elles y butinent une flore sauvage et locale, ce qui donne naissance à un miel de terroir,
              vivant, dont le goût évolue selon les saisons et les années.
            </p>
            <br/>
            <p className={styles.cardText}>
              Mon premier rucher se trouve à Port-Saint-Père, en lisière de forêt. Entouré de châtaigniers et d’acacias,
              c’est un endroit calme et ombragé, particulièrement favorable aux abeilles au printemps et en été,
              lorsque les ressources nectarifères y sont abondantes.
            </p>
            <br/>
            <p className={styles.cardText}>
              Le second est installé à Saint-Léger-les-Vignes, au cœur des zones humides et des marais. La flore typique de
              ces milieux — ronces, saules, prunelliers — apporte une signature bien particulière au miel produit sur ce site.
              C’est un environnement vivant, où l’eau et la diversité florale sont toujours présentes.
            </p>
            <br/>
            <p className={styles.cardText}>
              Un troisième rucher est implanté à Saint-Hilaire-de-Chaléons, dans un paysage de prés bordés de bois et de haies sauvages. Cet environnement est très favorable aux butineuses et permet la production de miels polyfloraux riches, équilibrés et complexes.
            </p>
            <br/>
            <p className={styles.cardText}>
              J’ai également un quatrième rucher, lui aussi situé à Saint-Hilaire-de-Chaléons, à proximité de cultures biologiques. Cet emplacement offre aux abeilles une ressource florale saine et diversifiée, en cohérence avec ma volonté de travailler dans des zones respectueuses du vivant et de l’environnement.
            </p>
            <br />

            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/neige-hiver.jpg`}
                alt="Petit rucher en Pays de Retz"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />

            <p className={styles.cardText}>
              Je travaille exclusivement en ruchers sédentaires, avec un nombre volontairement limité de colonies par site.
              Ce choix me permet de respecter l’équilibre naturel, de limiter le stress des abeilles et d’éviter toute
              surconcentration. J’interviens avec parcimonie, uniquement lorsque cela est nécessaire, dans une approche douce
              et attentive.
            </p>
            <br/>
            <p className={styles.cardText}>
              Chaque année, je réalise moi-même mes essaims et l’élevage de reines. Cela me permet d’être autonome, de mieux
              connaître mes colonies et de suivre leur évolution, tout en sélectionnant avec soin les lignées que je souhaite préserver.
            </p>
            <br/>
            <p className={styles.cardText}>
              Le miel de fleurs sauvages que je produis est le reflet direct de ces lieux. Chaque pot raconte une saison, un
              paysage, une météo. Aucun n’est tout à fait identique à un autre, et c’est cette singularité qui fait, pour moi,
              toute la richesse et la beauté du miel de terroir.
            </p>
          </div>

          {/* Section Galerie photos */}
          <div className={styles.galleryCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Au cœur de mes ruchers</h2>
            </div>
            <p className={styles.cardText}>
              Quelques images pour vous faire découvrir mes abeilles dans leur environnement, la diversité de leurs paysages, et
              des instants de vie au fil des saisons.
            </p>
            <ImageGallery
              images={[
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/abeille-butine.jpeg`,
                  alt: "Abeille butinant une fleur"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/couvains.jpg`,
                  alt: "Abeille noire sur les têtes de cadre"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/reine-marque.jpeg`,
                  alt: "Reine marquée qui se balade sur un cadre"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/ronce.jpg`,
                  alt: "Ruche envahie d'abeilles"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/cadre-male.jpg`,
                  alt: "Abeille butinant une fleur"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/buckfast.jpeg`,
                  alt: "Abeille buckfast sur les têtes de cadre"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/ruche-foret.jpeg`,
                  alt: "Reine sur un cadre"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/ruche.jpeg`,
                  alt: "Ruche en Pays de Retz"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/reine-carnica.jpg`,
                  alt: "Rucher en Pays de Retz"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/fleur-acacia.jpg`,
                  alt: "Rucher en Pays de Retz"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/cadre-couvain.jpg`,
                  alt: "Rucher en Pays de Retz"
                },
                {
                  src: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-rucher/rucher-foret-2.jpg`,
                  alt: "Rucher en Pays de Retz"
                }
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
