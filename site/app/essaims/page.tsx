import styles from "./page.module.css";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Récupération d’essaims d’abeilles",
    description:
        "Apiculteur local pour la récupération d’essaims d’abeilles en Loire-Atlantique et Pays de Retz. Intervention rapide et respectueuse.",
    keywords: [
        "récupération essaim abeilles",
        "apiculteur essaim",
        "essaim abeilles loire atlantique",
        "apiculteur pays de retz",
    ],
};


export default function EssaimPage() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>
                    Récupération d'essaims d'abeilles
                </h1>

                <div className={styles.introCard}>
                    <p className={styles.introText}>
                        Un service gratuit pour sauver les abeilles et préserver la biodiversité locale
                    </p>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}>🐝</span>
                        <h2 className={styles.cardTitle}>Qu'est-ce que l'essaimage ?</h2>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.sectionWithImage}>
                            <div className={styles.textContent}>
                                <p className={styles.cardText}>
                                    L'essaimage est un phénomène naturel par lequel une colonie d'abeilles se reproduit. Lorsque la ruche
                                    devient trop peuplée, une partie des abeilles, accompagnée de la reine, quitte la colonie pour former un
                                    nouvel essaim. Il arrive alors que ces essaims se posent dans des jardins, sur des arbres, des murs ou des
                                    structures urbaines.
                                </p>
                                <p className={styles.cardText}>
                                    Afin d'éviter leur destruction et de préserver ces précieuses pollinisatrices, Bee Api'C propose un
                                    service gratuit de récupération d'essaims. J'interviens avec douceur et respect pour capturer l'essaim et
                                    lui offrir un nouveau foyer adapté dans une ruche.
                                </p>
                                <p className={styles.cardText}>
                                    Si vous observez un essaim d'abeilles, n'intervenez pas vous-même et contactez-moi, chaque essaim sauvé
                                    est une colonie préservée.
                                </p>
                            </div>
                            <div>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/essaim/recuperation-essaim.jpg`}
                                    alt="Récuération d'un essaim d'abeilles dans un arbre"
                                    className={styles.sideImage}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}>📍</span>
                        <h2 className={styles.cardTitle}>Secteurs d'intervention</h2>
                    </div>
                    <div className={styles.cardContent}>
                        <p className={styles.cardText}>
                            J'interviens gratuitement pour récupérer les essaims d'abeilles dans les communes suivantes :
                        </p>
                        <div className={styles.subsectionsGrid}>
                            <div className={styles.subsection}>
                                <h3 className={styles.subsectionTitle}>Port-Saint-Père</h3>
                            </div>
                            <div className={styles.subsection}>
                                <h3 className={styles.subsectionTitle}>Saint-Léger-les-Vignes</h3>
                            </div>
                            <div className={styles.subsection}>
                                <h3 className={styles.subsectionTitle}>Saint-Mars-de-Coutais</h3>
                            </div>
                            <div className={styles.subsection}>
                                <h3 className={styles.subsectionTitle}>Sainte-Pazanne</h3>
                            </div>
                            <div className={styles.subsection}>
                                <h3 className={styles.subsectionTitle}>Saint-Hilaire-de-Chaléons</h3>
                            </div>
                            <div className={styles.subsection}>
                                <h3 className={styles.subsectionTitle}>Chaumes-en-Retz</h3>
                            </div>
                            <div className={styles.subsection}>
                                <h3 className={styles.subsectionTitle}>Bourgneuf-en-Retz</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.warningBox}>
                    <p className={styles.warningTitle}>⚠️ Important</p>
                    <p className={styles.warningText}>
                        <strong>N'intervenez jamais vous-même pour récupérer un essaim !</strong> Les abeilles peuvent se montrer agressives si elles se sentent menacées.
                        Contactez un professionnel pour une intervention en toute sécurité.
                    </p>
                </div>

                <div className={styles.actionCard}>
                    <div className={styles.actionIcon}>📞</div>
                    <h2 className={styles.actionTitle}>
                        Vous avez repéré un essaim ?
                    </h2>
                    <p className={styles.actionText}>
                        Contactez-moi rapidement pour une intervention gratuite et professionnelle.
                        Ensemble, protégeons nos abeilles et préservons la biodiversité !
                    </p>
                    <Link href="/contact" className={styles.btnSecondary}>
                        Me contacter
                    </Link>
                </div>
            </section>
        </div>
    )
}