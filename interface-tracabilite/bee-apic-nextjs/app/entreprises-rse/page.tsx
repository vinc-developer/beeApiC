import { Metadata } from "next";
import styles from "@/app/page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Entreprises & RSE | Bee Api'C",
    description:
        "Découvrez les offres RSE Bee Api'C : apiculture locale, biodiversité, cadeaux responsables, sensibilisation et circuits courts pour les entreprises engagées.",
};

export default function EntreprisesRSEPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">
                Entreprises & démarche RSE
            </h1>

            <p className="mb-10">
                Bee Api’C accompagne les entreprises souhaitant intégrer des actions
                concrètes et locales dans leur politique{" "}
                <strong>RSE</strong>.
                En travaillant directement avec des <strong>apiculteurs locaux</strong>,
                vous soutenez la biodiversité, les circuits courts et une agriculture
                responsable, tout en donnant du sens à vos engagements.
            </p>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className={styles.featuresContainer}>
                    <h2 className={styles.featuresTitle}>
                        Pourquoi choisir Bee Api'C ?
                    </h2>
                    <p className={styles.featuresSubtitle}>
                        Une démarche de qualité et de transparence
                    </p>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                🇫🇷
                            </div>
                            <h3 className={styles.featureTitle}>100% Local</h3>
                            <p className={styles.featureDescription}>
                                Miel produit et récolté exclusivement en Loire Atlantique
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                🔍
                            </div>
                            <h3 className={styles.featureTitle}>Traçabilité Totale</h3>
                            <p className={styles.featureDescription}>
                                Suivez le parcours de votre miel de la ruche à votre table
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                👨‍🌾
                            </div>
                            <h3 className={styles.featureTitle}>Apiculteurs Passionnés</h3>
                            <p className={styles.featureDescription}>
                                Des producteurs engagés et qualifiés pour un miel d'exception
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-10">
                {/* Cadeaux d'entreprise */}
                <article>
                    <h2 className="text-xl font-semibold mb-2">
                        🍯 Cadeaux d’entreprise responsables
                    </h2>
                    <p>
                        Nous proposons des <strong>pots de miel locaux</strong> comme cadeaux
                        d’entreprise, une alternative durable et authentique aux goodies
                        traditionnels.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                        <li>Pots de miel issus de l’apiculture locale</li>
                        <li>Personnalisation possible (étiquette, message)</li>
                        <li>Idéal pour fêtes de fin d’année, onboarding ou événements</li>
                    </ul>
                    <p className="mt-2 text-sm italic">
                        Valeur RSE : circuits courts, soutien à l’économie locale
                    </p>
                </article>

                {/* Soutien à l'apiculture */}
                <article>
                    <h2 className="text-xl font-semibold mb-2">
                        🐝 Partenariat de soutien à l’apiculture locale
                    </h2>
                    <p>
                        Les entreprises peuvent s’engager aux côtés de Bee Api’C en soutenant
                        directement l’<strong>apiculture locale</strong> et les apiculteurs
                        partenaires.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                        <li>Soutien à une production locale et responsable</li>
                        <li>Mise en avant de l’engagement dans la communication interne</li>
                        <li>Approche simple, concrète et mesurable</li>
                    </ul>
                    <p className="mt-2 text-sm italic">
                        Valeur RSE : biodiversité, agriculture durable
                    </p>
                </article>

                {/* Sensibilisation */}
                <article>
                    <h2 className="text-xl font-semibold mb-2">
                        👩‍🏫 Sensibilisation à l’apiculture et à la biodiversité
                    </h2>
                    <p>
                        Nous proposons des actions de <strong>sensibilisation</strong> pour
                        les collaborateurs, afin de mieux comprendre le rôle des abeilles et
                        les enjeux liés à la biodiversité.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                        <li>Interventions et présentations en entreprise</li>
                        <li>Échanges autour de l’apiculture et des saisons</li>
                        <li>Actions pédagogiques accessibles à tous</li>
                    </ul>
                    <p className="mt-2 text-sm italic">
                        Valeur RSE : sensibilisation environnementale
                    </p>
                </article>

                {/* Marchés de Noël */}
                <article>
                    <h2 className="text-xl font-semibold mb-2">
                        🎄 Marchés de Noël et événements d’entreprise
                    </h2>
                    <p>
                        Bee Api’C peut intervenir lors de{" "}
                        <strong>marchés de Noël d’entreprise</strong> ou d’événements
                        internes, en proposant la vente directe de miel aux collaborateurs.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                        <li>Stand Bee Api’C sur site</li>
                        <li>Vente directe de produits locaux</li>
                        <li>Moments d’échange et de convivialité</li>
                    </ul>
                    <p className="mt-2 text-sm italic">
                        Valeur RSE : consommation locale, lien producteur-consommateur
                    </p>
                </article>

                {/* Approvisionnement */}
                <article>
                    <h2 className="text-xl font-semibold mb-2">
                        🧾 Approvisionnement en miel pour l’entreprise
                    </h2>
                    <p>
                        Nous proposons également du miel pour un{" "}
                        <strong>usage interne</strong> :
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                        <li>Cantines et restaurants d’entreprise</li>
                        <li>Salles de pause et petits-déjeuners</li>
                        <li>Événements internes et séminaires</li>
                    </ul>
                    <p className="mt-2 text-sm italic">
                        Valeur RSE : produits locaux, réduction des intermédiaires
                    </p>
                </article>
            </section>

            <section className="mt-12 border-t pt-8">
                <h2 className="text-xl font-semibold mb-3">
                    🤝 Une démarche simple, locale et engagée
                </h2>
                <p>
                    Les offres RSE Bee Api’C sont pensées pour être{" "}
                    <strong>simples à mettre en place</strong>, adaptées aux entreprises de
                    toutes tailles, et ancrées dans une démarche locale, transparente et
                    responsable.
                </p>
            </section>

            <div style={{marginTop: '2rem', textAlign: 'center'}}>
                <Link href="/contact" className={styles.btnPrimary}>
                    📧 Contactez-nous
                </Link>
                {' '}
            </div>
        </main>
    );
}
