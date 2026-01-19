import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Foire aux questions - Ventes solidaires & RSE",
    description:
        "Questions fréquentes sur les ventes solidaires de miel dans les écoles et les démarches RSE en entreprise avec Bee Api'C",
    keywords: [
        "vente solidaire",
        "association école",
        "miel artisanal",
        "financement école",
        "HelloAsso",
        "RSE entreprise",
        "apiculteur loire atlantique",
    ],
};

export default function FaqPage() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.pageTitle}>
                    Foire aux questions
                </h1>

                <div className={styles.introCard}>
                    <p className={styles.introText}>
                        Vous vous posez des questions sur nos ventes solidaires dans les écoles
                        ou nos solutions RSE pour entreprises ? Vous trouverez ici les réponses
                        aux questions les plus fréquentes.
                    </p>
                </div>

                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/bee-apic/lieu-bee-apic.jpg`}
                    alt="Pots de miel artisanal pour les ventes solidaires"
                    className={styles.heroImage}
                />

                {/* Section Ventes Écoles */}
                <div className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>🏫 Ventes solidaires dans les écoles</h2>

                    <div className={styles.faqWrapper}>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment choisissez-vous l'apiculteur pour notre école ?</h3>
                            <p className={styles.faqAnswer}>
                                Nous sélectionnons <strong>l'apiculteur le plus proche de votre établissement</strong> parmi
                                notre réseau de partenaires signataires de notre charte qualité. Cela permet de créer un lien
                                local fort et de réduire au maximum les transports. Chaque pot est traçable, vous saurez
                                exactement qui a produit le miel que vous vendez.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Quelle quantité minimum commander ?</h3>
                            <p className={styles.faqAnswer}>
                                Il n'y a pas vraiment de minimum, mais je recommande au moins <strong>50 pots</strong> pour que
                                l'opération soit intéressante pour votre école. Nous pouvons adapter selon vos besoins et la
                                taille de votre établissement.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Que se passe-t-il si tous les pots ne sont pas vendus ?</h3>
                            <p className={styles.faqAnswer}>
                                <strong>Vous ne payez que les pots vendus.</strong> Les pots restants ne seront ni livrés ni facturés.
                                C'est un engagement de notre part pour que l'opération soit sans risque pour votre établissement.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment fonctionne la vente en ligne via HelloAsso ?</h3>
                            <p className={styles.faqAnswer}>
                                Vous créez une <strong>boutique en ligne</strong> sur HelloAsso où les familles peuvent commander
                                et payer directement. À la fin de la campagne, vous me communiquez le nombre de pots vendus,
                                je livre les quantités exactes et facture uniquement ce qui a été vendu.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Quel est le délai entre la commande et la livraison ?</h3>
                            <p className={styles.faqAnswer}>
                                Nous fixerons ensemble une date de livraison en fonction de votre planning et de la date de distribution des pots de miels aux familles.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Proposez-vous des supports de communication ?</h3>
                            <p className={styles.faqAnswer}>
                                Oui ! Je peux vous fournir des <strong>visuels et informations</strong> sur les produits pour votre
                                communication auprès des familles.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Peut-on choisir les variétés de miel proposées ?</h3>
                            <p className={styles.faqAnswer}>
                                Oui, nous pouvons proposer plusieurs <strong>variétés de miel</strong> en fonction de la production
                                de l'apiculteur local (miel de printemps, miel d'acacia, miel de châtaignier, etc.). Nous adaptons
                                l'offre selon les disponibilités et vos préférences.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment se déroule un stand sur marché de Noël ?</h3>
                            <p className={styles.faqAnswer}>
                                L'<strong>apiculteur local</strong> le plus proche de votre école vient avec son stand et ses produits
                                le jour du marché. Il gère la vente et s'acquitte de son emplacement. C'est une formule
                                gagnant-gagnant qui nécessite peu d'organisation de votre part et qui permet de tisser des liens locaux.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Peut-on organiser une intervention pédagogique en classe ?</h3>
                            <p className={styles.faqAnswer}>
                                Je ne propose pas d'interventions pédagogiques sur les abeilles et l'apiculture, mais{" "}
                                <strong>je peux vous recommander un partenaire</strong> spécialisé dans l'animation scolaire
                                sur ce thème.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Quelle marge peut réaliser l'école ?</h3>
                            <p className={styles.faqAnswer}>
                                La marge dépend du prix de vente que vous fixez. En général, les écoles réalisent une{" "}
                                <strong>marge de 30 à 40%</strong> sur chaque pot vendu, ce qui permet de financer des projets
                                pédagogiques, des sorties scolaires ou du matériel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section RSE Entreprises */}
                <div className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>🏢 Démarches RSE en entreprise</h2>

                    <div className={styles.faqWrapper}>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Qu'est-ce qu'une démarche RSE avec Bee Api'C ?</h3>
                            <p className={styles.faqAnswer}>
                                Nous proposons aux entreprises d'intégrer des <strong>actions concrètes</strong> en faveur de
                                la biodiversité et des circuits courts : cadeaux clients en miel local, parrainage de ruches,
                                approvisionnement responsable pour vos événements d'entreprise.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Proposez-vous la personnalisation des pots de miel ?</h3>
                            <p className={styles.faqAnswer}>
                                Oui, nous pouvons créer des <strong>étiquettes personnalisées</strong> avec votre logo et un
                                message de votre choix pour des cadeaux d'entreprise ou des événements corporate. Un excellent
                                moyen de valoriser votre engagement RSE.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Quelle quantité minimum pour les entreprises ?</h3>
                            <p className={styles.faqAnswer}>
                                Il n'y a pas de quantité minimum stricte, nous nous adaptons à vos besoins. Cependant, pour des
                                commandes personnalisées, un minimum de <strong>50 pots</strong> est recommandé afin de
                                optimiser les coûts de production et de personnalisation.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment valoriser notre partenariat en interne et externe ?</h3>
                            <p className={styles.faqAnswer}>
                                Nous vous fournissons des <strong>éléments de communication</strong> : photos des ruches,
                                présentation de l'apiculteur, données sur la traçabilité. Vous pouvez ainsi communiquer sur
                                votre engagement RSE de manière authentique et locale.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Quels sont les délais de livraison pour les entreprises ?</h3>
                            <p className={styles.faqAnswer}>
                                Comptez <strong>3 à 4 semaines</strong> pour une commande standard, et jusqu'à{" "}
                                <strong>6 semaines</strong> si vous souhaitez une personnalisation des étiquettes.
                                Nous pouvons gérer les livraisons en express selon urgence.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Peut-on visiter les ruches et rencontrer l'apiculteur ?</h3>
                            <p className={styles.faqAnswer}>
                                Oui et Non ! Nous ne pouvons pas organiser de <strong>visites de ruchers</strong> pour vos équipes ou vos
                                clients. Mais il est possible d'organiser une rencontre avec l'apiculteur dans vos locaux.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment garantissez-vous la traçabilité du miel ?</h3>
                            <p className={styles.faqAnswer}>
                                Chaque pot dispose d'un <strong>numéro de lot unique</strong> permettant de connaître
                                l'apiculteur, le lieu de production, la date de récolte et bien d'autre informations. Une
                                transparence totale pour vos clients et collaborateurs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section Générale */}
                <div className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>🍯 Questions générales</h2>

                    <div className={styles.faqWrapper}>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Quelle est la durée de conservation du miel ?</h3>
                            <p className={styles.faqAnswer}>
                                Le miel se conserve <strong>plusieurs années</strong> s'il est stocké dans de bonnes conditions
                                (à l'abri de la lumière et de l'humidité). La DDM (Date de Durabilité Minimale) est généralement
                                de 2 ans, mais le miel reste consommable bien au-delà.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Le miel est-il 100% local ?</h3>
                            <p className={styles.faqAnswer}>
                                Oui ! Tous nos miels sont produits en <strong>Loire-Atlantique</strong> par des apiculteurs
                                signataires de notre charte qualité. Nous privilégions toujours l'apiculteur le plus proche
                                de votre localisation.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment vous contacter pour un projet ?</h3>
                            <p className={styles.faqAnswer}>
                                Vous pouvez me contacter directement via la <strong>page contact</strong> du site ou par email.
                                Je vous répondrai rapidement pour échanger sur votre projet et établir un devis personnalisé.
                            </p>
                        </div>

                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Quels formats de pots proposez-vous ?</h3>
                            <p className={styles.faqAnswer}>
                                Nous proposons principalement des pots de <strong>250g et 500g</strong>. Pour des besoins
                                spécifiques (échantillons, grands formats), nous pouvons étudier d'autres options selon
                                les disponibilités.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Contact */}
                <div className={styles.ctaCard}>
                    <h2 className={styles.ctaTitle}>Vous avez d'autres questions ?</h2>
                    <p className={styles.ctaText}>
                        N'hésitez pas à me contacter, je serai ravi d'échanger avec vous sur votre projet.
                    </p>
                    <a href="/contact" className={styles.ctaButton}>
                        Me contacter
                    </a>
                </div>
            </section>
        </div>
    );
}