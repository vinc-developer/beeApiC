import styles from "./page.module.css";
import {Metadata} from "next";
import {siteConfig} from "@/config/site";

export const metadata: Metadata = {
    title: "Mentions légales",
    description:
        "Mentions légales du site Bee Api’C, apiculteur local en Loire-Atlantique et producteur de miel artisanal.",
    keywords: [
        "mentions légales",
        "bee api c",
        "apiculteur loire atlantique",
        "site apiculture",
    ],
};


export default function MentionsLegalesPage() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.pageTitle}>Mentions légales</h1>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🏢</span>
                        Éditeur du site
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Le présent site est édité par :
                        </p>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}><strong>{siteConfig.name}</strong></span>
                            <span className={styles.infoLine}>Apiculteur Locale</span>
                            <span className={styles.infoLine}>SIRET : <em>{siteConfig.company.siret}</em></span>
                            <span className={styles.infoLine}>Siège social : <em>{siteConfig.company.address}</em></span>
                            <span className={styles.infoLine}>
                                Email : <a href="mailto:bee.apic.pro@gmail.com" className={styles.link}>{siteConfig.company.email}</a>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>✍️</span>
                        Responsable de la publication
                    </h2>
                    <div className={styles.sectionContent}>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}>
                                Le responsable de la publication est : <strong>Vincent Colas</strong>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🌐</span>
                        Hébergement
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Le site est hébergé par :
                        </p>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}><strong>o2switch</strong></span>
                            <span className={styles.infoLine}>Chemin des Pardiaux</span>
                            <span className={styles.infoLine}>63000 Clermont-Ferrand</span>
                            <span className={styles.infoLine}>
                                Site web : <a href="https://www.o2switch.fr/" target="_blank" rel="noopener noreferrer" className={styles.link}>https://www.o2switch.fr/</a>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>©</span>
                        Propriété intellectuelle
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            L'ensemble du contenu présent sur le site Bee Api'C (textes, images, logos, graphismes,
                            vidéos, icônes, sons, etc.) est protégé par le droit de la propriété intellectuelle.
                        </p>
                        <div className={styles.highlightBox}>
                            <p className={styles.highlightText}>
                                Toute reproduction, représentation, modification, publication ou adaptation, totale
                                ou partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite,
                                sauf autorisation écrite préalable de Bee Api'C.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>⚖️</span>
                        Responsabilité
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Bee Api'C s'efforce de fournir sur ce site des informations aussi précises que possible.
                            Toutefois, l'éditeur ne pourra être tenu responsable des omissions, des inexactitudes
                            ou des carences dans la mise à jour des informations, qu'elles soient de son fait ou du
                            fait des tiers partenaires.
                        </p>
                        <p className={styles.paragraph}>
                            L'utilisateur reconnaît utiliser les informations du site sous sa responsabilité exclusive.
                        </p>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🔒</span>
                        Données personnelles
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Les données personnelles éventuellement collectées via le site Bee Api'C (formulaire de contact,
                            email, etc.) sont utilisées uniquement dans le cadre des échanges avec l'utilisateur.
                            Elles ne sont ni vendues, ni cédées, ni transmises à des tiers.
                        </p>
                        <div className={styles.highlightBox}>
                            <p className={styles.highlightText}>
                                <strong>RGPD :</strong> Conformément au Règlement Général sur la Protection des Données,
                                vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
                                Pour exercer ce droit, contactez-nous à{' '}
                                <a href="mailto:bee.apic.pro@gmail.com" className={styles.link}>{siteConfig.company.email}</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🍪</span>
                        Cookies
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Le site Bee Api'C peut être amené à utiliser des cookies afin d'améliorer l'expérience utilisateur
                            et de réaliser des statistiques de navigation. L'utilisateur peut configurer son navigateur
                            pour refuser les cookies.
                        </p>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🇫🇷</span>
                        Droit applicable
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Les présentes mentions légales sont régies par le droit français.
                            En cas de litige, et à défaut de résolution amiable, les tribunaux français
                            seront seuls compétents.
                        </p>
                    </div>
                </div>

                <div className={styles.footerNote}>
                    <p>Dernière mise à jour : Janvier 2026</p>
                    <p>Bee Api'C - Apiculture locale en Loire-Atlantique</p>
                </div>
            </section>
        </div>
    )
}