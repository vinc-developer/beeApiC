import Link from "next/link";
import styles from "./page.module.css";

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
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/rucher.jpeg`}
            alt="Rucher en Pays de Retz"
            style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
        />

        {/* Section La vie au rucher */}
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <h2 className={styles.infoTitle}>La vie au rucher</h2>
            <p className={styles.infoDescription}>
              Découvrez la vie au rucher, le travail quotidien de l'apiculteur et l'univers fascinant des abeilles.
            </p>
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
              <h2 className={styles.cardTitle}>Mes abeilles</h2>
            </div>
            <p className={styles.cardText}>
              Travailler avec les abeilles, c’est accepter de s’adapter à leur rythme, à leur
              langage, à leur sensibilité. C’est une collaboration silencieuse, faite de gestes mesurés, d’observation,
              et de respect profond pour le vivant.
            </p>
            <br/>
            <p className={styles.cardText}>
              J’élève deux types d’abeilles aux caractères bien différents, mais complémentaires.
            </p>
            <br/>
            <p className={styles.cardText}>
              <b>L’abeille noire</b>, notre abeille locale (Apis mellifera mellifera), est rustique, indépendante et résiliente.
              Elle
              connaît les saisons, les tempêtes, les sécheresses. Elle sait s’adapter à la moindre ressource, hiverner longtemps,
              et défendre son foyer avec détermination. Elle est parfois plus vive, mais toujours digne et précieuse. Travailler
              avec elle, c’est renouer avec une apiculture plus sauvage, plus ancrée dans le territoire.
            </p>
            <br/>

            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/home/abeilles-miel.jpeg`}
                alt="Rucher en Pays de Retz"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />

            <p className={styles.cardText}>
              À ses côtés, j’élève aussi des <b>Buckfast</b>, des abeilles issues de croisements sélectionnés pour leur douceur,
              leur
              stabilité et leur capacité de butinage. Elles sont paisibles, appliquées, idéales pour des ruchers accessibles ou
              pédagogiques. Leur comportement calme facilite les manipulations et permet une approche plus sereine, sans pour
              autant renier la rigueur du métier.
            </p>
            <br/>
            <p className={styles.cardText}>
              Élever ces deux lignées, c’est accepter leurs différences, apprendre d’elles, et trouver l’équilibre entre
              patrimoine génétique local et efficacité apicole. C’est aussi s’assurer une diversité précieuse, garante de
              résilience face aux défis de demain.
            </p>
          </div>

          {/* Section Mes ruchers */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Mes ruchers</h2>
            </div>
            <p className={styles.cardText}>
              Mes ruchers sont installés au cœur du <b>Pays de Retz</b>, dans des environnements naturels soigneusement choisis,
              tous
              situés à moins de 15 km les uns des autres. Je privilégie des zones calmes, riches en biodiversité, loin des grandes
              cultures intensives.
            </p>
            <br/>
            <p className={styles.cardText}>
              Ces emplacements permettent aux abeilles de butiner une flore locale et variée, ce qui donne naissance à un miel de
              terroir, chaque année unique.
            </p>
            <br/>
            <p className={styles.cardText}>
              Mon premier rucher se trouve à <b>Port-Saint-Père</b>, en lisière d’une forêt mêlant châtaigniers et acacias. Ce
              cadre
              boisé, calme et ombragé, offre aux abeilles une ressource nectarifère abondante au printemps comme en été.
            </p>
            <br/>
            <p className={styles.cardText}>
              Le second est situé à <b>Saint-Léger-les-Vignes</b>, au cœur des zones humides et marais, où la flore spécifique de
              ces
              milieux (ronces, saules, prunelliers) donne un caractère particulier au miel produit ici. C’est un endroit vivant,
              toujours en mouvement, où les abeilles trouvent à la fois eau et diversité florale.
            </p>
            <br/>
            <p className={styles.cardText}>
              Enfin, le troisième rucher est implanté à <b>Saint-Hilaire-de-Chaléons</b>, dans un environnement de prés bordés de
              bois et
              de haies sauvages. C’est une zone très favorable aux butineuses, notamment pour la production de miels polyfloraux
              riches et complexes.
            </p>
            <br/>

            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/petit-rucher.jpeg`}
                alt="Petit rucher en Pays de Retz"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
            />

            <p className={styles.cardText}>
              Je travaille exclusivement en <b>ruchers sédentaires</b>, avec un nombre limité de colonies par site. Cela me permet
              de
              limiter le stress sur les abeilles et d’éviter toute surconcentration. Les visites sont faites avec soin et
              uniquement lorsque cela est nécessaire, dans une approche douce et extensive.
            </p>
            <br/>
            <p className={styles.cardText}>
              Chaque année, je réalise moi-même mes essaims et l’élevage de reines, afin d’assurer l’autonomie de mon cheptel, de
              mieux connaître mes colonies, et de préserver les lignées que je sélectionne avec attention.
            </p>
            <br/>
            <p className={styles.cardText}>
              Le miel de fleurs sauvages que je produis reflète la richesse de la flore locale. Chaque pot raconte une saison, un
              paysage, une météo… Aucun ne ressemble exactement à un autre, et c’est justement cela qui fait toute la beauté du
              miel de terroir.
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
            <div className={styles.galleryGrid}>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/abeille-butine.jpeg`}
                    alt="Abeille butinant une fleur"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/abeilles-noire.jpeg`}
                    alt="Abeille noire sur les tetes de cadre"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/petit-rucher.jpeg`}
                    alt="Petit rucher en Pays de Retz"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/reine-marque.jpeg`}
                    alt="Reine marquée qui se balade sur un cadre"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/ruche-abeilles.jpeg`}
                    alt="Ruche envahie d'abeilles"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/abeille-fleurs.jpeg`}
                    alt="Abeille butinant une fleur"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/buckfast.jpeg`}
                    alt="Abeille buckfast sur les tetes de cadre"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/reine.jpeg`}
                    alt="Reine sur un cadre"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/ruche.jpeg`}
                    alt="Ruche en Pays de Retz"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
              <div className={styles.galleryItem}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/rucher/rucher.jpeg`}
                    alt="Rucher en Pays de Retz"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.backButton}>
          <Link href="/" className={styles.btnSecondary}>
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
