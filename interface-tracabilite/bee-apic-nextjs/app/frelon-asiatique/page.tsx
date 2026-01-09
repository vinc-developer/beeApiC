import Link from "next/link";
import styles from "../page.module.css";

export default function FrelonAsiatiquePage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          ⚠️ Le Frelon Asiatique
        </h1>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription} style={{ color: 'var(--color-error)', fontWeight: 600 }}>
            Le frelon asiatique (Vespa velutina) est un prédateur redoutable pour nos abeilles.
            Informez-vous sur cette menace et comment la combattre.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Identification
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Le frelon asiatique se reconnaît par son corps noir, ses pattes jaunes à l'extrémité
              et sa taille d'environ 3 cm. Il construit des nids sphériques pouvant atteindre 1 mètre de diamètre,
              généralement en hauteur dans les arbres.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Impact sur les abeilles
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              Le frelon asiatique se positionne en vol stationnaire devant les ruches et capture les abeilles
              pour nourrir ses larves. Une seule colonie de frelons peut détruire plusieurs ruches d'abeilles
              en une saison. C'est une menace majeure pour la biodiversité et l'apiculture.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Que faire si vous voyez un nid ?
            </h2>
            <ul style={{ lineHeight: 1.75, color: 'var(--color-text)', paddingLeft: '1.5rem' }}>
              <li><strong>Ne vous approchez pas</strong> du nid et n'essayez pas de le détruire vous-même</li>
              <li><strong>Gardez vos distances</strong> (au moins 5 mètres)</li>
              <li><strong>Signalez le nid</strong> à votre mairie ou aux services départementaux</li>
              <li><strong>Contactez un professionnel</strong> pour la destruction du nid</li>
              <li><strong>Informez les apiculteurs locaux</strong> de la présence du nid</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
              Notre lutte contre le frelon asiatique
            </h2>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
              En tant qu'apiculteurs, nous participons activement à la surveillance et à la lutte contre le frelon asiatique.
              Nous installons des pièges au printemps pour capturer les reines fondatrices et nous collaborons
              avec les autorités locales pour signaler et détruire les nids.
            </p>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#FFF3CD',
            borderLeft: '4px solid var(--color-warning)',
            borderRadius: '0.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
              ⚠️ Numéros utiles
            </h3>
            <p style={{ lineHeight: 1.75, color: 'var(--color-text)', margin: 0 }}>
              <strong>Mairie :</strong> Contactez votre mairie pour signaler un nid<br/>
              <strong>FDGDON 44 :</strong> 02 40 16 08 00<br/>
              <strong>En cas d'urgence :</strong> 18 (Pompiers) ou 15 (SAMU)
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

