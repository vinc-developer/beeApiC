import styles from "./page.module.css";

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
                            <span className={styles.infoLine}><strong>Bee Api'C</strong></span>
                            <span className={styles.infoLine}>Apiculteur – Producteur de miel local</span>
                            <span className={styles.infoLine}>Entreprise individuelle</span>
                            <span className={styles.infoLine}>SIRET : <em>À compléter</em></span>
                            <span className={styles.infoLine}>Siège social : <em>À compléter (commune, département)</em></span>
                            <span className={styles.infoLine}>
                                Email : <a href="mailto:contact@bee-apic.fr" className={styles.link}>contact@bee-apic.fr</a>
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
                            <span className={styles.infoLine}><strong>Amazon Web Services (AWS)</strong></span>
                            <span className={styles.infoLine}>Amazon Web Services EMEA SARL</span>
                            <span className={styles.infoLine}>38 Avenue John F. Kennedy</span>
                            <span className={styles.infoLine}>L-1855 Luxembourg</span>
                            <span className={styles.infoLine}>
                                Site web : <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className={styles.link}>https://aws.amazon.com</a>
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
                                <a href="mailto:contact@bee-apic.fr" className={styles.link}>contact@bee-apic.fr</a>.
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