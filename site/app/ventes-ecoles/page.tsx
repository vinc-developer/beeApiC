import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ventes solidaires pour les écoles – Miel artisanal",
  description:
    "Soutenez votre association d'école avec nos ventes solidaires de miel artisanal. Sans risque, sans avance de frais, uniquement facturé sur les pots vendus.",
  keywords: [
    "vente solidaire",
    "association école",
    "miel artisanal",
    "financement école",
    "HelloAsso",
    "apiculteur loire atlantique",
  ],
};

export default function VenteEcolePage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Ventes solidaires de miel pour les écoles
        </h1>

        <div className={styles.introCard}>
          <p className={styles.introText}>
            Une solution clé en main pour financer les projets de votre école ou association,
            sans risque et sans avance de frais. Je vous accompagne de A à Z pour organiser
            votre vente de miel artisanal 100% local, en ligne ou sur vos marchés de Noël.
          </p>
        </div>

        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/products/miels-couleurs.jpg`}
          alt="Pots de miel artisanal pour les ventes solidaires"
          className={styles.heroImage}
        />

        <div className={styles.contentWrapper}>
          {/* Section Le concept */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Le concept</h2>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Vous cherchez un moyen simple et efficace de financer les projets de votre école ou association ?
                Je vous propose une solution <strong>sans risque financier</strong> : une vente solidaire de miel artisanal
                produit localement en Loire-Atlantique.
              </p>
              <p className={styles.cardText}>
                <strong>Le principe est simple :</strong>
              </p>
              <ul className={styles.benefitsList}>
                <li>Je mets à disposition de votre école une <strong>quantité déterminée de pots de miel</strong></li>
                <li>Vous organisez la vente via une <strong>boutique en ligne</strong> (type HelloAsso ou autre plateforme)</li>
                <li>Je ne facture à l'école <strong>que les pots effectivement vendus</strong> pendant la campagne</li>
                <li>Vous conservez la <strong>marge bénéficiaire</strong> pour financer vos projets</li>
              </ul>
            </div>
          </div>

          {/* Section Avantages */}
          <div className={styles.highlightCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Les avantages pour votre école</h2>
            </div>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>💰</div>
                <h3 className={styles.benefitTitle}>Zéro risque financier</h3>
                <p className={styles.benefitText}>
                  Pas d'avance de frais, vous ne payez que ce qui est vendu
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🌱</div>
                <h3 className={styles.benefitTitle}>Produit local et responsable</h3>
                <p className={styles.benefitText}>
                  Miel 100% artisanal produit en Loire-Atlantique, traçable et de qualité
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🛒</div>
                <h3 className={styles.benefitTitle}>Vente simplifiée</h3>
                <p className={styles.benefitText}>
                  Boutique en ligne facile à mettre en place (HelloAsso, etc.)
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🎯</div>
                <h3 className={styles.benefitTitle}>Clé en main</h3>
                <p className={styles.benefitText}>
                  Je vous accompagne dans la mise en place de votre campagne
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>📚</div>
                <h3 className={styles.benefitTitle}>Pédagogique</h3>
                <p className={styles.benefitText}>
                  Sensibilisez les enfants au monde des abeilles et de l'apiculture
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🤝</div>
                <h3 className={styles.benefitTitle}>Solidaire</h3>
                <p className={styles.benefitText}>
                  Soutenez un apiculteur local tout en finançant vos projets
                </p>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🎄</div>
                <h3 className={styles.benefitTitle}>Stand sur marché de Noël</h3>
                <p className={styles.benefitText}>
                  Possibilité de tenir un stand lors de vos marchés de Noël
                </p>
              </div>
            </div>
          </div>

          {/* Section Comment ça marche */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Comment ça marche ?</h2>
            </div>
            <div className={styles.stepsWrapper}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Contactez-moi</h3>
                  <p className={styles.stepText}>
                    Discutons ensemble de votre projet : nombre de pots souhaités, période de vente,
                    variétés de miel, etc.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Mise en place de la boutique</h3>
                  <p className={styles.stepText}>
                    Créez votre boutique en ligne sur HelloAsso (ou autre plateforme).
                    Je vous fournis toutes les informations produit nécessaires.
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Campagne de vente</h3>
                  <p className={styles.stepText}>
                    Communiquez auprès des parents et de votre réseau. La période de vente
                    est définie ensemble (généralement 2 à 4 semaines).
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Livraison et facturation</h3>
                  <p className={styles.stepText}>
                    Je livre les pots vendus à l'école et facture uniquement la quantité vendue.
                    Vous organisez ensuite la distribution aux familles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Informations pratiques */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Informations pratiques</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>🍯 Les miels disponibles</h3>
                <p className={styles.cardText}>
                  Je propose différentes variétés de miel selon les saisons et les récoltes :
                </p>
                <ul className={styles.honeyList}>
                  <li><strong>Miel de printemps</strong> – Doux et floral</li>
                  <li><strong>Miel toutes fleurs</strong> – Équilibré et polyvalent</li>
                  <li><strong>Miel d'été</strong> – Fruités et légés</li>
                  <li><strong>Miel de forêt</strong> – Notes boisées</li>
                </ul>
                <p className={styles.cardText}>
                  Tous les miels sont <strong>100% naturels, non chauffés, extraits à froid</strong> et
                  proviennent de mes ruches situées en Loire-Atlantique.
                </p>
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>📦 Formats proposés</h3>
                <ul className={styles.formatList}>
                  <li>Pots de 250g – Format idéal pour les familles</li>
                  <li>Pots de 500g – Format économique</li>
                  <li>Possibilité de proposer plusieurs formats dans une même campagne</li>
                </ul>
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>💵 Tarification</h3>
                <p className={styles.cardText}>
                  Le prix est défini ensemble en fonction du format choisi et de la marge souhaitée
                  par l'école. En général :
                </p>
                <ul className={styles.pricingList}>
                  <li>L'école achète les pots à un <strong>tarif préférentiel</strong></li>
                  <li>Elle les revend à un prix permettant de <strong>dégager une marge bénéficiaire</strong></li>
                  <li>Exemple : pot acheté 7€, revendu 9.50€ = 2.50€ de bénéfice par pot</li>
                </ul>
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>📍 Zone de livraison</h3>
                <p className={styles.cardText}>
                  Livraison possible dans les <strong>Pays de Retz</strong> et toute la <strong>Loire-Atlantique</strong> sous conditions.
                </p>
              </div>

              <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>🎄 Stand sur marché de Noël</h3>
                <p className={styles.cardText}>
                  Pour les marchés de Noël organisés par votre école, je peux également venir tenir un stand
                  pour présenter et vendre directement mes produits. C'est une excellente opportunité de :
                </p>
                <ul className={styles.formatList}>
                  <li>Créer un lien direct entre les familles et l'apiculteur</li>
                  <li>Présenter l'ensemble de ma gamme de miels et produits dérivés</li>
                  <li>Répondre aux questions sur l'apiculture et les abeilles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section Témoignages/Résultats */}
          <div className={styles.resultsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Des résultats concrets</h2>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Ces ventes solidaires permettent aux écoles de financer :
              </p>
              <ul className={styles.projectsList}>
                <li>🚌 Sorties scolaires et voyages de classe</li>
                <li>📚 Matériel pédagogique et livres</li>
                <li>🎨 Projets artistiques et culturels</li>
                <li>🏃 Équipements sportifs</li>
                <li>🌳 Projets environnementaux</li>
                <li>🎉 Fêtes et événements d'école</li>
              </ul>
              <p className={styles.highlightText}>
                En moyenne, une vente peut rapporter entre <strong>100€ et 500€</strong> selon
                la taille de l'école et la mobilisation des familles.
              </p>
            </div>
          </div>

          {/* Section CTA */}
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Prêt à lancer votre vente solidaire ?</h2>
            <p className={styles.ctaText}>
              Contactez-moi pour discuter de votre projet et mettre en place votre campagne
              de vente de miel. C'est simple, rapide et sans engagement !
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaButtonPrimary}>
                Me contacter
              </Link>
              <Link href="/mes-miels" className={styles.ctaButtonSecondary}>
                Découvrir mes miels
              </Link>
            </div>
          </div>

          {/* Section FAQ */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>❓ Questions fréquentes</h2>
            </div>
            <div className={styles.faqWrapper}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Quelle quantité minimum commander ?</h3>
                <p className={styles.faqAnswer}>
                  Il n'y a pas vraiment de minimum, mais je recommande au moins 50 pots pour que
                  l'opération soit intéressante pour votre école. Nous pouvons adapter selon vos besoins.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Que se passe-t-il si tous les pots ne sont pas vendus ?</h3>
                <p className={styles.faqAnswer}>
                  Vous ne payez que les pots vendus. Les pots restants ne seront ni livré ni facturés.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Quelle est la durée de conservation du miel ?</h3>
                <p className={styles.faqAnswer}>
                  Le miel se conserve plusieurs années s'il est stocké dans de bonnes conditions
                  (à l'abri de la lumière et de l'humidité). La DDM est généralement de 2 ans.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Proposez-vous des supports de communication ?</h3>
                <p className={styles.faqAnswer}>
                  Oui ! Je peux vous fournir des visuels et informations sur les produits pour votre
                  communication auprès des familles.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Peut-on organiser une intervention en classe ?</h3>
                <p className={styles.faqAnswer}>
                  Je ne propose pas d'interventions pédagogiques sur les abeilles et l'apiculture.
                  Mais je peux vous recommander un partenaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

