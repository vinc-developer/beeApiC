import { Metadata } from "next";
import styles from "./page.module.css";
import pageStyles from "@/app/page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Entreprises & RSE | Bee Api'C",
    description:
        "Découvrez les offres RSE Bee Api'C : apiculture locale, biodiversité, cadeaux responsables, sensibilisation et circuits courts pour les entreprises engagées.",
};

export default function EntreprisesRSEPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.pageTitle}>
                Entreprises & démarche RSE
            </h1>

            <p className={styles.introText}>
                Bee Api'C accompagne les entreprises souhaitant intégrer des actions
                concrètes et locales dans leur politique{" "}
                <strong>RSE</strong>.
                En travaillant directement avec des <strong>apiculteurs locaux</strong>,
                vous soutenez la biodiversité, les circuits courts et une agriculture
                responsable, tout en donnant du sens à vos engagements.
            </p>

            {/* Features Section */}
            <section className={pageStyles.featuresSection}>
                <div className={pageStyles.featuresContainer}>
                    <h2 className={pageStyles.featuresTitle}>
                        Pourquoi choisir Bee Api'C ?
                    </h2>
                    <p className={pageStyles.featuresSubtitle}>
                        Une démarche de qualité et de transparence
                    </p>

                    <div className={pageStyles.featuresGrid}>
                        <div className={pageStyles.featureCard}>
                            <div className={pageStyles.featureIcon}>
                                🇫🇷
                            </div>
                            <h3 className={pageStyles.featureTitle}>100% Local</h3>
                            <p className={pageStyles.featureDescription}>
                                Miel produit et récolté exclusivement en Loire Atlantique
                            </p>
                        </div>

                        <div className={pageStyles.featureCard}>
                            <div className={pageStyles.featureIcon}>
                                🔍
                            </div>
                            <h3 className={pageStyles.featureTitle}>Traçabilité Totale</h3>
                            <p className={pageStyles.featureDescription}>
                                Suivez le parcours de votre miel de la ruche à votre table
                            </p>
                        </div>

                        <div className={pageStyles.featureCard}>
                            <div className={pageStyles.featureIcon}>
                                👨‍🌾
                            </div>
                            <h3 className={pageStyles.featureTitle}>Apiculteurs Passionnés</h3>
                            <p className={pageStyles.featureDescription}>
                                Des producteurs engagés et qualifiés pour un miel d'exception
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.offersSection}>
                {/* Cadeaux d'entreprise */}
                <article className={styles.offerCard}>
                    <h2 className={styles.offerHeader}>
                        🍯 Cadeaux d'entreprise responsables
                    </h2>
                    <p className={styles.offerText}>
                        Nous proposons des <strong>pots de miel locaux</strong> comme cadeaux
                        d'entreprise, une alternative durable et authentique aux goodies
                        traditionnels.
                    </p>
                    <ul className={styles.offerList}>
                        <li>Pots de miel issus de l'apiculture locale</li>
                        <li>Personnalisation possible (étiquette, message)</li>
                        <li>Idéal pour fêtes de fin d'année, onboarding ou événements</li>
                    </ul>
                    <p className={styles.rseValue}>
                        <strong>Valeur RSE :</strong> circuits courts, soutien à l'économie locale
                    </p>
                </article>

                {/* Soutien à l'apiculture */}
                <article className={styles.offerCard}>
                    <h2 className={styles.offerHeader}>
                        🐝 Partenariat de soutien à l'apiculture locale
                    </h2>
                    <p className={styles.offerText}>
                        Les entreprises peuvent s'engager aux côtés de Bee Api'C en soutenant
                        directement l'<strong>apiculture locale</strong> et les apiculteurs
                        partenaires.
                    </p>
                    <ul className={styles.offerList}>
                        <li>Soutien à une production locale et responsable</li>
                        <li>Mise en avant de l'engagement dans la communication interne</li>
                        <li>Approche simple, concrète et mesurable</li>
                    </ul>
                    <p className={styles.rseValue}>
                        <strong>Valeur RSE :</strong> biodiversité, agriculture durable
                    </p>
                </article>

                {/* Sensibilisation */}
                <article className={styles.offerCard}>
                    <h2 className={styles.offerHeader}>
                        👩‍🏫 Sensibilisation à l'apiculture et à la biodiversité
                    </h2>
                    <p className={styles.offerText}>
                        Nous proposons des actions de <strong>sensibilisation</strong> pour
                        les collaborateurs, afin de mieux comprendre le rôle des abeilles et
                        les enjeux liés à la biodiversité.
                    </p>
                    <ul className={styles.offerList}>
                        <li>Interventions et présentations en entreprise</li>
                        <li>Échanges autour de l'apiculture et des saisons</li>
                        <li>Actions pédagogiques accessibles à tous</li>
                    </ul>
                    <p className={styles.rseValue}>
                        <strong>Valeur RSE :</strong> sensibilisation environnementale
                    </p>
                </article>

                {/* Marchés de Noël */}
                <article className={styles.offerCard}>
                    <h2 className={styles.offerHeader}>
                        🎄 Marchés de Noël et événements d'entreprise
                    </h2>
                    <p className={styles.offerText}>
                        Bee Api'C peut intervenir lors de{" "}
                        <strong>marchés de Noël d'entreprise</strong> ou d'événements
                        internes, en proposant la vente directe de miel aux collaborateurs.
                    </p>
                    <ul className={styles.offerList}>
                        <li>Stand Bee Api'C sur site</li>
                        <li>Vente directe de produits locaux</li>
                        <li>Moments d'échange et de convivialité</li>
                    </ul>
                    <p className={styles.rseValue}>
                        <strong>Valeur RSE :</strong> consommation locale, lien producteur-consommateur
                    </p>
                </article>

                {/* Approvisionnement */}
                <article className={styles.offerCard}>
                    <h2 className={styles.offerHeader}>
                        🧾 Approvisionnement en miel pour l'entreprise
                    </h2>
                    <p className={styles.offerText}>
                        Nous proposons également du miel pour un{" "}
                        <strong>usage interne</strong> :
                    </p>
                    <ul className={styles.offerList}>
                        <li>Cantines et restaurants d'entreprise</li>
                        <li>Salles de pause et petits-déjeuners</li>
                        <li>Événements internes et séminaires</li>
                    </ul>
                    <p className={styles.rseValue}>
                        <strong>Valeur RSE :</strong> produits locaux, réduction des intermédiaires
                    </p>
                </article>
            </section>

            <section className={styles.conclusionSection}>
                <div className={styles.conclusionCard}>
                    <h2 className={styles.conclusionTitle}>
                        🤝 Une démarche simple, locale et engagée
                    </h2>
                    <p className={styles.conclusionText}>
                        Les offres RSE Bee Api'C sont pensées pour être{" "}
                        <strong>simples à mettre en place</strong>, adaptées aux entreprises de
                        toutes tailles, et ancrées dans une démarche locale, transparente et
                        responsable.
                    </p>
                </div>
            </section>

            <div className={styles.ctaSection}>
                <Link href="/contact" className={styles.btnPrimary}>
                    📧 Contactez-nous
                </Link>
            </div>
        </main>
    );
}
