import Link from "next/link";
import styles from "../page.module.css";

export default function MonApiculturePage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          👨‍🌾 Mon apiculture, ma passion
        </h1>
        <span>Au croisement de la nature et du savoir-faire, je pratique une apiculture artisanale, douce et engagée.
         Chaque ruche raconte une histoire de passion, de respect et de transmission.
        </span>

        <div>
          <div>
            <h2>Une passion, un engagement </h2>
            <p>
              C’est grâce à mon frère que j’ai découvert l’apiculture, il y a quelques années. Très vite, ce monde fascinant s’est
              imposé à moi comme une évidence : travailler avec les abeilles, c’est renouer avec la nature, la vraie — celle qu’on
              observe, qu’on respecte et dont on apprend chaque jour.
              Je ne suis pas apiculteur professionnel : je suis développeur informatique de métier. Pourtant, ces deux univers ont
              plus de points communs qu’on ne l’imagine. Tous deux demandent rigueur, patience, logique et observation. Dans un
              rucher comme dans une ligne de code, chaque détail compte, chaque action a des conséquences.
              Depuis tout petit, j’ai grandi au contact du vivant. Issu d’une famille de chasseurs attachés à la préservation des
              milieux naturels, j’ai appris avec mon père à reconnaître les fleurs, à observer les animaux, à comprendre les
              équilibres subtils entre les espèces. Cette éducation sensible à la nature m’accompagne encore aujourd’hui dans
              chaque visite de rucher, dans chaque décision que je prends pour mes colonies.
            </p>
            <img src="" alt=""/>
          </div>
          <div>
            <h2>🍯 Une apiculture douce et responsable</h2>
            <p>
              Je pratique une apiculture que je qualifie de douce, car elle commence par l’écoute et l’observation. Avant toute
              intervention, je prends le temps d’observer mes colonies : leur activité, leur comportement, leur développement. Je
              respecte leur rythme naturel, et je limite mes actions au strict nécessaire.
              Mes ruches sont sédentaires : je ne pratique pas la transhumance. Ce choix permet aux abeilles de s’adapter
              pleinement à leur environnement, sans stress, et de construire leurs réserves au fil des floraisons locales. Je
              produis uniquement les essaims et les reines dont j’ai besoin, ce qui me permet de garder un cheptel cohérent, en
              bonne santé, et adapté à son territoire.
              Mon approche mêle également technologie et rigueur : chaque ruche est identifiée individuellement, tout comme chaque
              hausse. Cela me permet d’assurer un suivi précis, avec une véritable traçabilité de la production. Cette
              transparence, je la partage aussi avec mes clients grâce à un QR code apposé sur mes pots de miel. Ils peuvent ainsi
              connaître la provenance exacte du miel, les dates de récolte, et les principales étapes de sa fabrication.
            </p>
            <img src="" alt=""/>
          </div>
          <div>
            <h2>🌼 Des produits sincères, au rythme des saisons </h2>
            <p>
              Je récolte principalement du miel, que je décline selon les périodes de floraison : un miel de printemps aux arômes délicats, un miel d’été plus intense, et un miel de forêt aux notes boisées. Lorsque la météo est clémente, il m’arrive aussi de proposer un miel d’acacia, rare et très apprécié. Tous mes miels sont issus exclusivement de mes propres ruchers, situés dans le Pays de Retz, et ne subissent aucune transformation autre que l’extraction et la mise en pot.
              Une partie de ma production de miel est destinée à la fabrication d’hydromel, que je produis une fois par an. C’est un produit singulier, élaboré lentement et avec soin, vieilli en fût de chêne afin de développer ses arômes. Je surveille régulièrement son évolution pour garantir un équilibre de saveurs sans dérive.
              Qu’il s’agisse du miel ou de l’hydromel, tout est conditionné à la main, dans des contenants en verre que je récupère pour leur donner une seconde vie. Cette démarche me tient à cœur : elle reflète une production locale, artisanale et écoresponsable, où rien n’est laissé au hasard.
            </p>
            <img src="" alt=""/>
          </div>
          <div>
            <h2>🌱 Une apiculture pour demain</h2>
            <p>L’avenir de l’apiculture est incertain. Entre le changement climatique, la pression des parasites et la menace grandissante du frelon asiatique, les abeilles font face à de nombreux défis. Pourtant, elles restent indispensables à la vie, à l’équilibre des écosystèmes, à notre alimentation.
              C’est pourquoi je m’efforce de sensibiliser à leur importance, à travers chaque discussion avec un client, chaque pot de miel vendu. J’encourage à planter des arbres, des haies mellifères, à préserver les fleurs sauvages, à piéger les prédateurs quand c’est nécessaire. Je partage aussi mes connaissances sur la flore locale et le rôle des abeilles via les réseaux sociaux, et j’ouvre régulièrement mes ruchers au public pour faire découvrir, expliquer, démystifier.
              L’apiculture est aussi pour moi une histoire de transmission. J’emmène souvent ma fille de 4 ans avec moi au rucher, pour qu’elle découvre ce monde fascinant, qu’elle comprenne dès le plus jeune âge à quel point les abeilles sont précieuses. C’est en semant ces graines de conscience que nous pouvons, je l’espère, préserver demain ce que nous aimons tant aujourd’hui.
              Je continuerai à travailler avec mes deux types d’abeilles, la noire et la buckfast, parce que chacune m’apporte à sa façon une joie sincère à chaque visite. Et parce qu’une apiculture durable, respectueuse et engagée, c’est aussi celle qui sait garder du plaisir, de l’émerveillement, et du sens.</p>
            <img src="" alt=""/>
          </div>
          <div>
            <h2>🐝 Merci de faire partie de cette aventure</h2>
            <p>Mon apiculture est née d’une passion, mais elle ne prend tout son sens que dans l’échange et le partage.
              En choisissant mes produits, en visitant mes ruchers ou simplement en vous intéressant aux abeilles, vous participez vous aussi à leur préservation.
              🌼 MERCI pour elle, merci pour nous 🌼</p>
            <img src="" alt=""/>
          </div>
        </div>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription}>
            Découvrez notre approche de l'apiculture, nos méthodes respectueuses de l'environnement
            et notre engagement pour une production durable.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Notre philosophie
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Nous pratiquons une apiculture raisonnée, respectueuse des abeilles et de l'environnement.
              Notre objectif est de produire un miel de qualité tout en préservant la santé de nos colonies
              et la biodiversité locale.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Nos pratiques
            </h2>
            <ul style={{ lineHeight: 1.75, color: 'var(--color-text)', paddingLeft: '1.5rem' }}>
              <li>Ruches installées dans des zones préservées de Loire-Atlantique</li>
              <li>Respect du cycle naturel des abeilles</li>
              <li>Nourrissement limité et naturel</li>
              <li>Traçabilité complète de la production</li>
              <li>Formation continue aux meilleures pratiques</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Nos engagements
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Nous nous engageons à produire un miel 100% naturel, sans traitement chimique,
              en préservant la santé de nos abeilles et en respectant l'environnement.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/" className={styles.btnSecondary}>
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}

