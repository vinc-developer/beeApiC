import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Me Contacter
        </h1>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription}>
            Vous avez une question sur nos miels, notre apiculture ou souhaitez devenir partenaire ?
            N'hésitez pas à nous contacter !
          </p>

          <div className={styles.contactGrid}>
            {/* Coordonnées */}
            <div className={styles.contactSection}>
              <h2 className={styles.contactSectionTitle}>
                Coordonnées
              </h2>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🏢</span>
                  <div className={styles.contactContent}>
                    <strong className={styles.contactLabel}>Entreprise</strong>
                    <span className={styles.contactText}>{siteConfig.name}</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <div className={styles.contactContent}>
                    <strong className={styles.contactLabel}>Adresse</strong>
                    <span className={styles.contactText} style={{ whiteSpace: 'pre-line' }}>{siteConfig.company.address}</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <div className={styles.contactContent}>
                    <strong className={styles.contactLabel}>Email</strong>
                    <a
                      href={`mailto:${siteConfig.company.email}`}
                      className={styles.contactLink}
                    >
                      {siteConfig.company.email}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📱</span>
                  <div className={styles.contactContent}>
                    <strong className={styles.contactLabel}>Téléphone</strong>
                    <a
                      href={`tel:${siteConfig.company.phone}`}
                      className={styles.contactLink}
                    >
                      {siteConfig.company.phone}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🌐</span>
                  <div className={styles.contactContent}>
                    <strong className={styles.contactLabel}>Site Web</strong>
                    <a
                      href={siteConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      bee-apic.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className={styles.contactSection}>
              <h2 className={styles.contactSectionTitle}>
                ✉️ Envoyez-nous un message
              </h2>

              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className={styles.formTextarea}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  📤 Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.backButtonContainer}>
          <Link href="/" className={styles.btnSecondary}>
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}

