import Link from "next/link";
import styles from "./page.module.css";

export default function FrelonAsiatiquePage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          ⚠️ Le frelon asiatique : un danger pour nos abeilles et notre biodiversité
        </h1>

        <div className={styles.introCard}>
          <p className={styles.introText}>
            Je vous propose un dossier complet pour mieux comprendre cette menace, ses conséquences sur l'écosystème,
            et surtout, comment agir à votre échelle grâce au piégeage sélectif.
          </p>
        </div>

        <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/frelon-asiatique.jpg`}
            alt="Frelon asiatique"
            style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
        />

        <div className={styles.contentWrapper}>
          {/* Section Introduction */}
          <div className={styles.alertSection}>
            <p className={styles.alertText}>
              Le frelon asiatique (Vespa velutina nigrithorax), originaire d'Asie, a été introduit accidentellement en
              France en 2004. Depuis, il s'est rapidement propagé dans tout le territoire français et au-delà.
              Particulièrement adapté à nos climats, il représente une menace sérieuse pour les abeilles domestiques
              et les pollinisateurs sauvages, déjà fragilisés par d'autres facteurs environnementaux.
            </p>
          </div>

          {/* Section Qui est le frelon asiatique */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Qui est le frelon asiatique ?</h2>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Le frelon asiatique est un insecte de 2,5 à 3 cm, reconnaissable à son thorax noir et ses pattes jaunes.
                Contrairement au frelon européen, il est plus petit et chasse en vol stationnaire.
              </p>
              <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/reconnaitre-un-frelon-asiatique.jpg`}
                  alt="Frelon asiatique"
                  style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
              />
              <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/insects.png`}
                  alt="Frelon asiatique"
                  style={{width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '3rem'}}
              />
              <h3>Son cycle de vie</h3>
              <p className={styles.cardText}>
                Son cycle de vie est annuel : une reine fondatrice sort d'hibernation au printemps et fonde un premier
                nid primaire. En été, ce nid est souvent abandonné au profit d'un nid secondaire, bien plus imposant,
                souvent perché en hauteur. Une colonie peut produire plusieurs centaines de frelons en fin de saison.
              </p>
            </div>
            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/cycle_FA.png`}
                alt="Comparaison entre frelon asiatique et frelon européen"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
            />
          </div>

          {/* Section Impact sur la biodiversité */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>L'impact sur la biodiversité et les abeilles</h2>
            </div>
            <div className={styles.cardContent}>
              <div>
                <p className={styles.cardText}>
                  Le frelon asiatique est un redoutable prédateur. Son alimentation est en grande partie constituée d'insectes, et
                  notamment d'abeilles domestiques.
                </p>
                <p className={styles.cardText}>
                  Aux abords des ruchers, il pratique le vol stationnaire en attendant le passage d'une abeille ouvrière qu'il
                  capture
                  pour nourrir sa colonie. Ce comportement entraîne un stress intense sur les colonies d'abeilles, qui limitent
                  leurs
                  sorties. La production de miel baisse, les réserves s'amenuisent, et les colonies s'affaiblissent jusqu'à
                  parfois
                  disparaître.
                </p>
                <p className={styles.cardText}>
                  Mais la menace ne s'arrête pas aux abeilles. Le frelon asiatique consomme aussi d'autres insectes
                  bénéfiques (papillons, coccinelles, syrphes...), perturbant l'équilibre écologique local.
                </p>
              </div>
              <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/vol-stationnaire-frelon.jpg`}
                  alt="Vol stationnaire du frelon asiatique devnat une ruche"
                  style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
              />
            </div>
          </div>

          {/* Section Mesures de lutte */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Les mesures de lutte : focus sur le piégeage</h2>
            </div>

            <div className={styles.subsectionsGrid}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>❓ Pourquoi piéger ?</h3>
                <p className={styles.subsectionText}>
                  Piéger permet de réduire la pression du frelon asiatique, notamment au printemps, en capturant les reines
                  fondatrices avant qu'elles ne construisent de nouveaux nids. Moins de reines, c'est moins de colonies actives à
                  l'automne.
                </p>
                <p className={styles.subsectionText}>
                  C'est une action simple, accessible à tous, qui a un impact direct sur la population locale de frelons.
                </p>
              </div>

              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>📅 Quand piéger ?</h3>
                <ul className={styles.subsectionList}>
                  <li>Période idéale : de fin février à fin mai (selon la région et les températures).</li>
                  <li>Cette fenêtre correspond à la sortie d'hibernation des reines.</li>
                  <li>Le piégeage en été/automne est d'efficacité très réduite, sauf dans des cas très localisés ou pour protéger
                    directement un rucher.
                  </li>
                </ul>
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/cycle_de_piegage_frelons.jpg`}
                    alt="Comparaison entre frelon asiatique et frelon européen"
                    style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
                />
              </div>

              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>🪤 Quels pièges utiliser ?</h3>
                <ul className={styles.subsectionList}>
                  <li>Pièges maison : bouteilles en plastique avec mélange sucré fermenté (bière + vin blanc + sirop), à
                    renouveler
                    régulièrement.
                  </li>
                  <li>Pièges commerciaux sélectifs : conçus pour limiter les captures d'insectes non ciblés.</li>
                  <li>Utilisez de préférence un attractif spécifique et testé pour améliorer l'efficacité.</li>
                </ul>
              </div>

              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>✅ Bonnes pratiques</h3>
                <ul className={styles.subsectionList}>
                  <li>Ne pas piéger toute l'année : cela affecterait inutilement d'autres insectes.</li>
                  <li>Identifier les insectes capturés, et adapter le piège si besoin.</li>
                  <li>Nettoyer et entretenir les pièges pour conserver leur efficacité.</li>
                </ul>
              </div>

              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>🛡️ Autres méthodes de protection</h3>
                <ul className={styles.subsectionList}>
                  <li>Muselières à abeilles : réduisent l'accès au trou de vol.</li>
                  <li>Harpes électriques : tuent les frelons en vol autour du rucher.</li>
                  <li>Tentes anti-frelons : barrières physiques pour ruches très exposées.</li>
                  <li>Raquettes électriques, poules, ou même certaines plantes carnivores sont aussi parfois utilisées comme
                    compléments.
                  </li>
                </ul>
              </div>
            </div>

            <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/piege.png`}
                alt="Frelon asiatique pris dans un piège selectif"
                style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
            />
          </div>

          {/* Section Cadre réglementaire */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Cadre réglementaire</h2>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Le frelon asiatique est inscrit sur la liste des espèces exotiques envahissantes préoccupantes pour l'Union
                européenne.
              </p>
              <p className={styles.cardText}>
                Il est interdit de le transporter, de le relâcher ou de favoriser sa propagation. Des plans régionaux de lutte
                existent, avec soutien aux apiculteurs et campagnes de piégeage coordonnées.
              </p>
              <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/frelon-attaque.jpg`}
                  alt="Frelon asiatique qui attaque une abeille"
                  style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
              />
            </div>
          </div>

          {/* Section Que faire si vous voyez un nid */}
          <div className={styles.dangerCard}>
            <div className={styles.dangerHeader}>
              <span className={styles.cardIcon}>🚨</span>
              <h2 className={styles.dangerTitle}>Que faire si vous voyez un nid ?</h2>
            </div>
            <ul className={styles.dangerList}>
              <li><strong>Ne vous approchez pas</strong> du nid et n'essayez pas de le détruire vous-même</li>
              <li><strong>Gardez vos distances</strong> (au moins 5 mètres)</li>
              <li><strong>Signalez le nid</strong> à votre mairie ou aux services départementaux</li>
              <li><strong>Contactez un professionnel</strong> pour la destruction du nid</li>
              <li><strong>Informez les apiculteurs locaux</strong> de la présence du nid</li>
            </ul>
          </div>

          {/* Section Vos gestes qui comptent */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Vos gestes qui comptent</h2>
            </div>
            <div className={styles.cardContent}>
              <div>
                <ul className={styles.subsectionList}>
                  <li>Installez des pièges dès fin février dans votre jardin, balcon, verger ou rucher.</li>
                  <li>Proposez une sensibilisation autour de vous : voisins, écoles, associations.</li>
                  <li>Signalez tout nid de frelon asiatique observé à votre mairie ou via une plateforme comme INPN Espèces.</li>
                  <li>Favorisez les insectes auxiliaires et pollinisateurs en plantant des fleurs mellifères.</li>
                </ul>
              </div>
              <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/frelon/frelon-asiatique-nid.jpg`}
                  alt="Nid de frelon asiatique"
                  style={{width: '100%', height: 'auto', borderRadius: '0.5rem'}}
              />
            </div>
          </div>
        </div>

        {/* Warning box numéros utiles */}
        <div className={styles.warningBox}>
          <h3 className={styles.warningTitle}>⚠️ Numéros utiles</h3>
          <p className={styles.warningText}>
            <strong>Mairie :</strong> Contactez votre mairie pour signaler un nid<br/>
            <strong>FDGDON 44 :</strong> 02 40 36 83 03 <br/>
            <strong>En cas d'urgence :</strong> 18 (Pompiers) ou 15 (SAMU)
          </p>
        </div>

        {/* Action finale */}
        <div className={styles.actionCard}>
          <div className={styles.actionIcon}>🤝</div>
          <h2 className={styles.actionTitle}>Agissons ensemble</h2>
          <p className={styles.actionText}>
            Protéger les abeilles, c'est protéger l'avenir. Le frelon asiatique est un ennemi redoutable, mais en
            agissant ensemble à travers des gestes simples et coordonnés, nous pouvons en limiter les effets.
            Rejoignez le mouvement, équipez-vous, et faites circuler l'information. Chaque piège posé compte !
          </p>
        </div>

        <div className={styles.backLinkContainer}>
          <Link href="https://lefrelon.com/" className={styles.btnSecondary} target="_blank">
            Pour en savoir plus sur le frelon !
          </Link>
        </div>
      </section>
    </div>
  );
}
