import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "../page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>
          📧 Me Contacter
        </h1>

        <div className={styles.companyCard}>
          <p className={styles.companyDescription}>
            Vous avez une question sur nos miels, notre apiculture ou souhaitez devenir partenaire ?
            N'hésitez pas à nous contacter !
          </p>

          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Coordonnées */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                📍 Coordonnées
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏢</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Entreprise</strong>
                    <span style={{ color: 'var(--color-text)' }}>{siteConfig.name}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📍</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Adresse</strong>
                    <span style={{ color: 'var(--color-text)', whiteSpace: 'pre-line' }}>{siteConfig.company.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📧</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Email</strong>
                    <a
                      href={`mailto:${siteConfig.company.email}`}
                      style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      {siteConfig.company.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📱</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Téléphone</strong>
                    <a
                      href={`tel:${siteConfig.company.phone}`}
                      style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      {siteConfig.company.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🌐</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Site Web</strong>
                    <a
                      href={siteConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      bee-apic.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                ✉️ Envoyez-nous un message
              </h2>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-secondary)' }}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '2px solid var(--color-gray)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-secondary)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '2px solid var(--color-gray)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-secondary)' }}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '2px solid var(--color-gray)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-secondary)' }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '2px solid var(--color-gray)',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.btnPrimary}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  📤 Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/" className={styles.btnSecondary}>
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </div>
  );
}

