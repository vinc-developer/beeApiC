import styles from "@/app/page.module.css";
import {siteConfig} from "@/config/site";

export default function CardEntreprise() {
    return (
        <section className={styles.companySection}>
            <div className={styles.companyCard}>
                {/* Header */}
                <div className={styles.companyHeader}>
                    <span className={styles.companyIcon}>🐝</span>
                    <h2 className={styles.companyTitle}>Bee Api'C</h2>
                    <span className={styles.companyBadge}>Entreprise Locale</span>
                </div>

                {/* Content */}
                <div className={styles.companyContent}>
                    {/* Info */}
                    <div className={styles.companyInfo}>
                        <p className={styles.companyDescription}>
                            Bee Api'C est une entreprise familiale engagée dans la promotion du miel 100% local de
                            Loire-Atlantique.
                            Nous travaillons en étroite collaboration avec des apiculteurs passionnés pour vous offrir un miel de
                            qualité,
                            traçable et respectueux de l'environnement.
                        </p>
                        <p>Découvrez l'origine de votre miel avec notre système de traçabilité complet. Du rucher à votre table,
                            suivez chaque étape de production.</p>

                        <div className={styles.companyLabel}>
                            <span className={styles.labelIcon}>🇫🇷</span>
                            <span className={styles.labelText}>
                    {siteConfig.label}
                  </span>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className={styles.companyContact}>
                        <h3 className={styles.contactTitle}>Nous contacter</h3>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📍</span>
                                <span className={styles.contactText}>{siteConfig.company.address}</span>
                            </div>

                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>🌐</span>
                                <a
                                    href={siteConfig.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.contactLink}
                                >
                                    bee-apic.com
                                </a>
                            </div>

                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📧</span>
                                <a
                                    href={`mailto:${siteConfig.company.email}`}
                                    className={styles.contactLink}
                                >
                                    {siteConfig.company.email}
                                </a>
                            </div>

                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📱</span>
                                <a
                                    href={`tel:${siteConfig.company.phone}`}
                                    className={styles.contactLink}
                                >
                                    {siteConfig.company.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}