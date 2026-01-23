import styles from "./page.module.css";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Notre charte qualité – Miel premium local",
    description:
        "Découvrez notre engagement qualité : miel local 100% Loire-Atlantique, traçabilité totale, " +
        "apiculture responsable et charte stricte pour nos partenaires apicoles.",
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
                    Chez Bee Api'C, le miel est bien plus qu’un simple produit. Chaque pot est l’aboutissement d’une démarche
                    exigeante où la qualité n’est pas une option, mais une véritable exigence. De la ruche à votre table, chaque
                    étape est menée avec rigueur, transparence et respect de l’environnement, afin de vous offrir un miel
                    authentique, fidèle à nos engagements et à notre passion pour les abeilles.
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
                                <strong>La filtration et la maturation :</strong> processus strict
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
                                Grâce à un système de traçabilité maîtrisé, chaque pot Bee Api'C est lié à son producteur, à son
                                origine locale et à son parcours de fabrication. Cela vous permet de connaître les grandes étapes
                                de sa création, du rucher à votre table, avec une transparence renforcée.

                            </p>
                        </div>

                        <div className={styles.pillarCard}>
                            <div className={styles.pillarIcon}>🍯</div>
                            <h3 className={styles.pillarTitle}>Miel Brut & Pur</h3>
                            <p className={styles.pillarText}>
                                Notre miel est récolté à maturité, extrait avec soin et élaboré sans additifs ni traitement
                                artificiel, pour préserver sa pureté naturelle et son authenticité.

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
                                Chaque étape de l’élaboration est menée avec rigueur : filtration soigneuse, période de repos
                                avant mise en pot et contrôle des conditions d’hygiène. Cela garantit un miel limpide, stable et
                                fidèle à nos standards d’excellence.

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
                                        100% local, producteur identifié, extraction douce, traçabilité complète du pot à la ruche
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Traçabilité du miel - du pot à la ruche</h2>
                    </div>

                    <div className={styles.tracabiliteContainer}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/pages/tracabilite/tracabilite-miel-bee-apic.png`}
                            alt="Tracabilité du miel Bee Api'C du pot à la ruche"
                            className={styles.tracabiliteImage}
                        />

                        <div className={styles.tracabiliteText}>
                            <p className={styles.cardText}>
                                Chaque lot de miel Bee Api'C est suivi à chaque étape de son parcours, de la ruche à votre table :
                            </p>
                            <ul className={styles.charteList}>
                                <li>Ruchers</li>
                                <li>Récoltes</li>
                                <li>Extraction</li>
                                <li>Mise en pot</li>
                            </ul>
                            <p className={styles.cardText}>
                                Cette traçabilité garantit l'origine, la qualité et la transparence de chaque pot vendu.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.contentCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Information réglementaire</h2>
                    </div>

                    <p  className={styles.cardText}>
                        Bee Api’C veille à n’utiliser sur ses étiquettes et supports de communication
                        que des mentions conformes à la réglementation française et européenne,
                        afin de garantir une information loyale, claire et transparente.
                    </p>
                </div>

                {/* Section Contrôle Qualité */}
                <div className={styles.highlightCard}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Contrôle et garantie</h2>
                    </div>
                    <p className={styles.cardText}>
                        Nos apiculteurs partenaires respectent un cadre de qualité exigeant qui inclut la tenue de registres de
                        production et des contrôles réguliers. Cela nous permet d’assurer la conformité et la transparence de
                        chaque lot mis sur le marché.

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
