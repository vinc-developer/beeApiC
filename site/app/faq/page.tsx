import styles from "@/app/ventes-ecoles/page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Foire aux questions",
    description:
        "Foire aux questions que vous pouvez vous posé pour les ventes solidaire et le RSE en entreprise",
    keywords: [
        "vente solidaire",
        "association école",
        "miel artisanal",
        "financement école",
        "HelloAsso",
        "apiculteur loire atlantique",
    ],
};

export default function FaqPage() {
    return (
        <div>
            <section>
                <h1 className={styles.sectionTitle}>
                    Foires aux questions
                </h1>

                <div className={styles.introCard}>
                    <p className={styles.introText}>
                     Si vous avez des questions, certaines reponse sont peut etre deja ici.
                    </p>
                </div>

                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/bee-apic/lieu-bee-apic.jpg`}
                    alt="Pots de miel artisanal pour les ventes solidaires"
                    className={styles.heroImage}
                />

                {/* Section FAQ */}
                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>❓ Questions fréquentes</h2>
                    </div>
                    <div className={styles.faqWrapper}>
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment choisissez-vous l'apiculteur pour notre école ?</h3>
                            <p className={styles.faqAnswer}>
                                Nous sélectionnons <strong> l'apiculteur le plus proche de votre établissement</strong> parmi
                                notre réseau de partenaires signataires de notre charte qualité. Cela permet de créer un lien
                                local fort et de réduire au maximum les transports. Chaque pot est traçable, vous saurez
                                exactement qui a produit le miel que vous vendez.
                            </p>
                        </div>
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
                                Vous ne payez que les pots vendus. Les pots restants ne seront ni livrés ni facturés.
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
                        <div className={styles.faqItem}>
                            <h3 className={styles.faqQuestion}>Comment se déroule un stand sur marché de Noël ?</h3>
                            <p className={styles.faqAnswer}>
                                L'apiculteur local le plus proche de votre école vient avec son stand et ses produits le jour du marché.
                                Il gère la vente et s'acquite de son emplacement. C'est une formule
                                gagnant-gagnant qui nécessite peu d'organisation de votre part et qui permet de tisser des liens locaux.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}