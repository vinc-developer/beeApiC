"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function PlanSiteComponent() {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const siteCategories = [
        {
            id: "presentation",
            title: "Présentation",
            pages: [
                { title: "Accueil", path: "/", description: "Découvrez Bee Api'C, apiculture locale en Loire-Atlantique" },
                { title: "À Propos", path: "/a-propos", description: "Notre histoire et nos valeurs" },
                { title: "Mon Apiculture", path: "/mon-apiculture", description: "Notre passion pour l'apiculture" },
                { title: "Au Rucher", path: "/au-rucher", description: "La vie au rucher" },
            ]
        },
        {
            id: "produits",
            title: "Nos Produits & Services",
            pages: [
                { title: "Mes Miels", path: "/mes-miels", description: "Miels artisanaux locaux et traçables" },
                { title: "Essaims", path: "/essaims", description: "Récupération d'essaims d'abeilles" },
            ]
        },
        {
            id: "qualite",
            title: "Qualité & Traçabilité",
            pages: [
                { title: "Traçabilité", path: "/tracabilite", description: "Suivez votre miel par numéro de lot" },
                { title: "Qualité", path: "/qualite", description: "Notre charte qualité et nos engagements" },
                { title: "Apiculteurs Partenaires", path: "/apiculteurs", description: "Le réseau Bee Api'C" },
            ]
        },
        {
            id: "professionnels",
            title: "Professionnels & Collectivités",
            pages: [
                { title: "Ventes Solidaires Écoles", path: "/ventes-ecoles", description: "Programme pour les associations d'écoles" },
                { title: "Entreprises & RSE", path: "/entreprises-rse", description: "Solutions pour entreprises en démarche RSE" },
            ]
        },
        {
            id: "informations",
            title: "Informations & Ressources",
            pages: [
                { title: "Frelon Asiatique", path: "/frelon-asiatique", description: "Lutte contre le frelon asiatique" },
                { title: "Documentation", path: "/documentation", description: "Guides et documentation technique" },
                { title: "Foire aux Questions", path: "/faq", description: "Questions fréquentes" },
            ]
        },
        {
            id: "contact",
            title: "Contact & Informations Légales",
            pages: [
                { title: "Contact", path: "/contact", description: "Contactez-nous" },
                { title: "Mentions Légales", path: "/mentions-legales", description: "Informations juridiques" },
                { title: "Plan du Site", path: "/plan-site", description: "Navigation complète" },
            ]
        },
    ];

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.pageTitle}>
                    Plan du site
                </h1>

                <div className={styles.introCard}>
                    <p className={styles.introText}>
                        Retrouvez ci-dessous l'ensemble des pages et sections disponibles sur notre site web.
                        Cette page vous permet de naviguer facilement vers le contenu qui vous intéresse.
                    </p>
                </div>

                <div className={styles.categoriesContainer}>
                    {siteCategories.map((category) => (
                        <div key={category.id} className={styles.categorySection}>
                            <h2 className={styles.categoryTitle}>
                                {category.title}
                            </h2>
                            <ul className={styles.pagesList}>
                                {category.pages.map((page) => (
                                    <li key={page.path} className={styles.pageItem}>
                                        <Link href={`${basePath}${page.path}`} className={styles.pageLink}>
                                            <span className={styles.pageLinkTitle}>{page.title}</span>
                                            <span className={styles.pageLinkDescription}>{page.description}</span>
                                            <span className={styles.pageLinkArrow}>→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={styles.infoSection}>
                    <h2 className={styles.sectionTitle}>
                        Besoin d'aide pour naviguer ?
                    </h2>
                    <div className={styles.helpContent}>
                        <p className={styles.helpText}>
                            Si vous ne trouvez pas l'information que vous cherchez, n'hésitez pas à consulter
                            notre <Link href={`${basePath}/faq`} className={styles.inlineLink}>FAQ</Link> ou
                            à nous <Link href={`${basePath}/contact`} className={styles.inlineLink}>contacter directement</Link>.
                        </p>
                        <p className={styles.helpText}>
                            Vous pouvez également consulter notre page <Link href={`${basePath}/tracabilite`} className={styles.inlineLink}>Traçabilité</Link> pour
                            vérifier les informations sur votre pot de miel grâce au numéro de lot.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
