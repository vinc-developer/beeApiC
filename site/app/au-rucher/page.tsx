import Link from "next/link";
import styles from "../page.module.css";

export default function AuRucherPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          🐝 Mes abeilles, mes ruchers
        </h1>
        <span>Depuis plusieurs années, j’élève mes abeilles dans le respect de leur rythme et de leur environnement. Découvrez ici mes différents ruchers, les races d’abeilles que j’élève, et les paysages dans lesquels elles butinent.</span>

        <div>
          <div>
            <h2>🐝 Mes abeilles</h2>
            <p>
              Travailler avec les abeilles, c’est accepter de s’adapter à leur rythme, à leur langage, à leur sensibilité. C’est
              une collaboration silencieuse, faite de gestes mesurés, d’observation, et de respect profond pour le vivant.
              J’élève deux types d’abeilles aux caractères bien différents, mais complémentaires.
              L’abeille noire, notre abeille locale (Apis mellifera mellifera), est rustique, indépendante et résiliente. Elle
              connaît les saisons, les tempêtes, les sécheresses. Elle sait s’adapter à la moindre ressource, hiverner longtemps,
              et défendre son foyer avec détermination. Elle est parfois plus vive, mais toujours digne et précieuse. Travailler
              avec elle, c’est renouer avec une apiculture plus sauvage, plus ancrée dans le territoire.
              À ses côtés, j’élève aussi des Buckfast, des abeilles issues de croisements sélectionnés pour leur douceur, leur
              stabilité et leur capacité de butinage. Elles sont paisibles, appliquées, idéales pour des ruchers accessibles ou
              pédagogiques. Leur comportement calme facilite les manipulations et permet une approche plus sereine, sans pour
              autant renier la rigueur du métier.
              Élever ces deux lignées, c’est accepter leurs différences, apprendre d’elles, et trouver l’équilibre entre
              patrimoine génétique local et efficacité apicole. C’est aussi s’assurer une diversité précieuse, garante de
              résilience face aux défis de demain.
            </p>
          </div>
          <div>
            <h2>🍃 Mes ruchers</h2>
            <p>
              Mes ruchers sont installés au cœur du Pays de Retz, dans des environnements naturels soigneusement choisis, tous
              situés à moins de 15 km les uns des autres. Je privilégie des zones calmes, riches en biodiversité, loin des grandes
              cultures intensives.
              Ces emplacements permettent aux abeilles de butiner une flore locale et variée, ce qui donne naissance à un miel de
              terroir, chaque année unique.
              Mon premier rucher se trouve à Port-Saint-Père, en lisière d’une forêt mêlant châtaigniers et acacias. Ce cadre
              boisé, calme et ombragé, offre aux abeilles une ressource nectarifère abondante au printemps comme en été.
              Le second est situé à Saint-Léger-les-Vignes, au cœur des zones humides et marais, où la flore spécifique de ces
              milieux (ronces, saules, prunelliers) donne un caractère particulier au miel produit ici. C’est un endroit vivant,
              toujours en mouvement, où les abeilles trouvent à la fois eau et diversité florale.
              Enfin, le troisième rucher est implanté à Saint-Hilaire-de-Chaléons, dans un environnement de prés bordés de bois et
              de haies sauvages. C’est une zone très favorable aux butineuses, notamment pour la production de miels polyfloraux
              riches et complexes.
              Je travaille exclusivement en ruchers sédentaires, avec un nombre limité de colonies par site. Cela me permet de
              limiter le stress sur les abeilles et d’éviter toute surconcentration. Les visites sont faites avec soin et
              uniquement lorsque cela est nécessaire, dans une approche douce et extensive.
              Chaque année, je réalise moi-même mes essaims et l’élevage de reines, afin d’assurer l’autonomie de mon cheptel, de
              mieux connaître mes colonies, et de préserver les lignées que je sélectionne avec attention.
              Le miel de fleurs sauvages que je produis reflète la richesse de la flore locale. Chaque pot raconte une saison, un
              paysage, une météo… Aucun ne ressemble exactement à un autre, et c’est justement cela qui fait toute la beauté du
              miel de terroir.
            </p>
          </div>
          <div>
            <h2>📸 Au cœur de mes ruchers</h2>
            <p>
              Quelques images pour vous faire découvrir mes abeilles dans leur environnement, la diversité de leurs paysages, et des instants de vie au fil des saisons.
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
        </div>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription}>
            Découvrez la vie au rucher, le travail quotidien de nos apiculteurs et l'univers fascinant des abeilles.
          </p>

          <div style={{marginTop: '2rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)'}}>
              La vie au rucher
            </h2>
            <p style={{lineHeight: 1.75, color: 'var(--color-text)'}}>
              Le rucher est un lieu vivant où nos apiculteurs travaillent en harmonie avec la nature.
              Chaque saison apporte son lot d'activités : l'entretien des ruches, la surveillance de la santé des colonies,
              et bien sûr, la récolte du miel.
            </p>
          </div>

          <div style={{marginTop: '2rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)'}}>
              Le rôle des abeilles
            </h2>
            <p style={{lineHeight: 1.75, color: 'var(--color-text)'}}>
              Les abeilles sont essentielles à notre écosystème. Elles pollinisent plus de 80% des plantes à fleurs
              et contribuent à la biodiversité. Nos apiculteurs veillent au bien-être de chaque colonie.
            </p>
          </div>
        </div>

        <div style={{marginTop: '2rem', textAlign: 'center'}}>
          <Link href="/" className={styles.btnSecondary}>
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
