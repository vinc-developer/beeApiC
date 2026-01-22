import styles from "./page.module.css";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Notre Charte Qualité – Miel Premium Local",
    description:
        "Découvrez notre engagement qualité : miel local 100% Loire-Atlantique, traçabilité totale, apiculture responsable et charte stricte pour nos partenaires apicoles.",
    keywords: [
        "miel qualité premium",
        "miel local Loire-Atlantique",
        "traçabilité miel",
        "charte qualité apicole",
        "miel authentique",
        "apiculture responsable",
    ],
};

export default function QualitePage() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>
                    Notre engagement qualité
                </h1>

                <p className={styles.introText}>
                    Chez Bee Api'C, le miel est bien plus qu’un simple produit. Chaque pot est l’aboutissement d’une démarche exigeante où la qualité n’est pas une option, mais une véritable exigence. De la ruche à votre table, chaque étape est menée avec rigueur, transparence et respect de l’environnement, afin de vous offrir un miel authentique, fidèle à nos engagements et à notre passion pour les abeilles.
                </p>

                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/gallerie-home/mise-en-pot.jpg`}
                    alt="Pots de miel Bee Api'C de qualité premium"
                    className={styles.heroImage}
                />

                {/* Section Charte Qualité */}
                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Notre promesse : un miel d'excellence</h2>
                    </div>
                    <div className={styles.cardContent}>
                        <p className={styles.cardText}>
                            Tous les apiculteurs partenaires de Bee Api'C s'engagent à respecter une charte qualité
                            stricte et détaillée.
                        </p>
                        <p className={styles.cardText}>
                            Cette charte encadre :
                        </p>
                        <ul className={styles.charteList}>
                            <li>
                                <strong>L'origine et la production :</strong> exclusivement locale, sans achat-revente
                            </li>
                            <li>
                                <strong>L'environnement des ruches :</strong> zones favorables et identifiées
                            </li>
                            <li>
                                <strong>Les pratiques apicoles :</strong> respectueuses et raisonnées
                            </li>
                            <li>
                                <strong>La récolte et l'extraction :</strong> à maturité, sans additifs
                            </li>
                            <li>
                                <strong>La filtration et la maturation :</strong> processus strict de 7 jours minimum
                            </li>
                            <li>
                                <strong>La traçabilité :</strong> registres obligatoires et numérotation unique
                            </li>
                            <li>
                                <strong>L'étiquetage :</strong> conforme et transparent
                            </li>
                        </ul>
                        <p className={styles.cardText}>
                            Cette charte n'est pas qu'un document : c'est notre engagement quotidien envers vous,
                            nos consommateurs, et envers l'avenir de l'apiculture locale.
                        </p>
                    </div>
                </div>

                {/* Section Les Piliers de notre Qualité */}
                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Les piliers de notre qualité</h2>
                    </div>
                    <div className={styles.pillarsGrid}>
                        <div className={styles.pillarCard}>
                            <div className={styles.pillarIcon}>🌍</div>
                            <h3 className={styles.pillarTitle}>100% Local</h3>
                            <p className={styles.pillarText}>
                                Nos miels proviennent exclusivement de ruches implantées en Loire-Atlantique (44).
                                Un miel de territoire qui reflète la richesse de nos paysages locaux : forêts, marais,
                                bocage et zones naturelles préservées.
                            </p>
                        </div>

                        <div className={styles.pillarCard}>
                            <div className={styles.pillarIcon}>✋</div>
                            <h3 className={styles.pillarTitle}>Production Artisanale</h3>
                            <p className={styles.pillarText}>
                                Chaque pot est produit par l'apiculteur lui-même. Aucun achat-revente, aucun mélange,
                                aucun intermédiaire. Vous achetez directement le travail passionné d'un artisan local
                                signataire de notre charte.
                            </p>
                        </div>

                        <div className={styles.pillarCard}>
                            <div className={styles.pillarIcon}>🔍</div>
                            <h3 className={styles.pillarTitle}>Traçabilité Totale</h3>
                            <p className={styles.pillarText}>
                                Grâce à notre système de numérotation unique, chaque pot vous permet de connaître
                                l'apiculteur, le lieu de production, l'environnement des ruches et la date de mise en pot.
                                Une transparence absolue à portée de QR code.
                            </p>
                        </div>

                        <div className={styles.pillarCard}>
                            <div className={styles.pillarIcon}>🍯</div>
                            <h3 className={styles.pillarTitle}>Miel Brut & Pur</h3>
                            <p className={styles.pillarText}>
                                Notre miel est récolté à maturité, sans chauffage excessif. Aucun additif, aucune
                                transformation artificielle. Juste le miel, dans toute sa pureté et son authenticité,
                                tel que les abeilles l'ont créé.
                            </p>
                        </div>

                        <div className={styles.pillarCard}>
                            <div className={styles.pillarIcon}>🐝</div>
                            <h3 className={styles.pillarTitle}>Respect des Abeilles</h3>
                            <p className={styles.pillarText}>
                                Nos apiculteurs s'engagent à respecter le bien-être des colonies et leurs cycles naturels.
                                Les interventions sont raisonnées, les traitements limités au strict nécessaire, toujours
                                conformes à la réglementation.
                            </p>
                        </div>

                        <div className={styles.pillarCard}>
                            <div className={styles.pillarIcon}>⚙️</div>
                            <h3 className={styles.pillarTitle}>Process Rigoureux</h3>
                            <p className={styles.pillarText}>
                                Filtration minutieuse, maturation en décantation pendant 7 jours minimum, mise en pot
                                dans des conditions d'hygiène strictes. Chaque étape est contrôlée et tracée pour
                                garantir un produit final irréprochable.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image finale */}
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/products/5-pots-500g.jpg`}
                    alt="Cadre de miel de qualité premium"
                    className={styles.heroImage}
                />

                {/* Section Différence */}
                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Ce qui nous différencie</h2>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.differenceGrid}>
                            <div className={styles.differenceItem}>
                                <span className={styles.differenceIcon}>❌</span>
                                <div>
                                    <h4 className={styles.differenceTitle}>Miel industriel</h4>
                                    <p className={styles.differenceText}>
                                        Origine floue, mélanges internationaux, chauffage excessif, traçabilité limitée
                                    </p>
                                </div>
                            </div>
                            <div className={styles.differenceItem}>
                                <span className={styles.differenceIcon}>✅</span>
                                <div>
                                    <h4 className={styles.differenceTitle}>Miel Bee Api'C</h4>
                                    <p className={styles.differenceText}>
                                        100% local, producteur identifié, extraction douce, traçabilité complète du rucher au pot
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Contrôle Qualité */}
                <div className={styles.highlightCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Contrôle et garantie</h2>
                    </div>
                    <p className={styles.cardText}>
                        Bee Api'C se réserve le droit de procéder à des contrôles réguliers afin de vérifier la conformité des pratiques, des registres et de la traçabilité. Avant chaque mise en vente, le cahier de miellerie de l’apiculteur est contrôlé afin de valider la conformité du processus de production. Le suivi des ruches peut également être vérifié au moins une fois par an à l’aide du cahier de suivi apicole.
                        Cette vigilance garantit que chaque pot respecte les standards d’excellence Bee Api'C.
                    </p>

                    <p className={styles.highlightText}>
                        <span className={styles.labelIcon}>🇫🇷</span>
                        Miel d'origine France garantie !
                        <span className={styles.labelIcon}>🇫🇷</span>
                    </p>
                </div>

                {/* Section Confiance */}
                <div className={styles.trustSection}>
                    <h2 className={styles.trustTitle}>Votre confiance, notre priorité</h2>
                    <p className={styles.trustText}>
                        Choisir Bee Api'C, c'est choisir la transparence, l'authenticité et l'excellence. C'est soutenir
                        une apiculture locale et responsable. C'est savoir exactement ce que vous consommez et d'où cela
                        provient.
                    </p>
                    <p className={styles.trustText}>
                        Parce que la qualité ne se négocie pas, et que votre confiance se mérite chaque jour.
                    </p>
                </div>
            </section>
        </div>
    );
}
