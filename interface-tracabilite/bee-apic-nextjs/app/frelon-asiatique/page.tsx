import Link from "next/link";
import styles from "../page.module.css";

export default function FrelonAsiatiquePage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          ⚠️
          Le frelon asiatique : un danger pour nos abeilles et notre
        </h1>
        <span>Je vous proposons un dossier complet pour mieux comprendre cette menace, ses conséquences sur l'écosystème, et surtout, comment agir à votre échelle grâce au piégeage sélectif.</span>

        <div>
          <div>
            <p>
              Le frelon asiatique (Vespa velutina nigrithorax), originaire d'Asie, a été introduit accidentellement en
              France en 2004. Depuis, il s'est rapidement propagé dans tout le territoire français et au-delà.
              Particulièrement adapté à nos climats, il représente une menace sérieuse pour les abeilles domestiques
              et les pollinisateurs sauvages, déjà fragilisés par d'autres facteurs environnementaux.
            </p>
          </div>

          <div>
            <h2>Qui est le frelon asiatique ?</h2>
            <img src="" alt=""/>
            <p>
              Le frelon asiatique est un insecte de 2,5 à 3 cm, reconnaissable à son thorax noir et ses pattes jaunes.
              Contrairement au frelon européen, il est plus petit et chasse en vol stationnaire.
              Son cycle de vie est annuel : une reine fondatrice sort d'hibernation au printemps et fonde un premier
              nid primaire. En été, ce nid est souvent abandonné au profit d'un nid secondaire, bien plus imposant,
              souvent perché en hauteur. Une colonie peut produire plusieurs centaines de frelons en fin de saison.
            </p>
          </div>
          <div>
            <h2>L’impact sur la biodiversité et les abeilles</h2>
            <img src="" alt=""/>
            <p>
              Le frelon asiatique est un redoutable prédateur. Son alimentation est en grande partie constituée d'insectes, et
              notamment d'abeilles domestiques.
              Aux abords des ruchers, il pratique le vol stationnaire en attendant le passage d'une abeille ouvrière qu'il capture
              pour nourrir sa colonie. Ce comportement entraîne un stress intense sur les colonies d'abeilles, qui limitent leurs
              sorties. La production de miel baisse, les réserves s'amenuisent, et les colonies s'affaiblissent jusqu'à parfois
              disparaître.
              Mais la menace ne s'arrête pas aux abeilles. Le frelon asiatique consomme aussi d'autres insectes
              bénéfiques (papillons, coccinelles, syrphes...), perturbant l'équilibre écologique local.
            </p>
          </div>
          <div>
            <h2>Les mesures de lutte : focus sur le piégeage</h2>
            <div>
              <h3>Pourquoi piéger ?</h3>
              <p>Piéger permet de réduire la pression du frelon asiatique, notamment au printemps, en capturant les reines
                fondatrices avant qu'elles ne construisent de nouveaux nids. Moins de reines, c'est moins de colonies actives à
                l'automne.
                C'est une action simple, accessible à tous, qui a un impact direct sur la population locale de frelons.</p>
            </div>
            <div>
              <h3>Quand piéger ?</h3>
              <ul>
                <li>Période idéale : de fin février à fin mai (selon la région et les températures).</li>
                <li>Cette fenêtre correspond à la sortie d'hibernation des reines.</li>
                <li>Le piégeage en été/automne est d’efficacité très réduite, sauf dans des cas très localisés ou pour protéger
                  directement un rucher.
                </li>
              </ul>
            </div>
            <div>
              <h3>Quels pièges utiliser ?</h3>
              <ul>
                <li>Pièges maison : bouteilles en plastique avec mélange sucré fermenté (bière + vin blanc + sirop), à renouveler
                  régulièrement.
                </li>
                <li>Pièges commerciaux sélectifs : conçus pour limiter les captures d’insectes non ciblés.</li>
                <li>Utilisez de préférence un attractif spécifique et testé pour améliorer l’efficacité.
                </li>
              </ul>
            </div>
            <div>
              <h3>Bonnes pratiques</h3>
              <ul>
                <li>Ne pas piéger toute l'année : cela affecterait inutilement d'autres insectes.
                </li>
                <li>Identifier les insectes capturés, et adapter le piège si besoin.</li>
                <li>Nettoyer et entretenir les pièges pour conserver leur efficacité.
                </li>
              </ul>
            </div>
            <div>
              <h3>Autres méthodes de protection</h3>
              <ul>
                <li>Muselières à abeilles : réduisent l’accès au trou de vol.
                </li>
                <li>Harpes électriques : tuent les frelons en vol autour du rucher.</li>
                <li>Tentes anti-frelons : barrières physiques pour ruches très exposées.
                </li>
                <li>Raquettes électriques, poules, ou même certaines plantes carnivores sont aussi parfois utilisées comme compléments.</li>
              </ul>
            </div>
            <img src="" alt=""/>
          </div>
          <div>
            <h2>Cadre réglementaire</h2>
            <img src="" alt=""/>
            <p>
              Le frelon asiatique est inscrit sur la liste des espèces exotiques envahissantes préoccupantes pour l’Union
              européenne.
              Il est interdit de le transporter, de le relâcher ou de favoriser sa propagation. Des plans régionaux de lutte
              existent, avec soutien aux apiculteurs et campagnes de piégeage coordonnées.
            </p>
          </div>
          <div>
            <h2>Vos gestes qui comptent </h2>
            <img src="" alt=""/>
            <p>Installez des pièges dès fin février dans votre jardin, balcon, verger ou rucher.Proposez une sensibilisation autour de vous : voisins, écoles, associations.Signalez tout nid de frelon asiatique observé à votre mairie ou via une plateforme comme INPN Espèces.Favorisez les insectes auxiliaires et pollinisateurs en plantant des fleurs mîllifères. </p>
          </div>
          <div>
            <h2>Agissons ensemble</h2>
            <p>
              Protéger les abeilles, c’est protéger l’avenir. Le frelon asiatique est un ennemi redoutable, mais en
              agissant ensemble à travers des gestes simples et coordonnés, nous pouvons en limiter les effets.
              Rejoignez le mouvement, équipez-vous, et faites circuler l’information. Chaque piège posé compte !
            </p>
          </div>
        </div>

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

