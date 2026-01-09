import Link from 'next/link';
import { siteConfig } from '@/config/site';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            {/* À propos */}
            <div className={styles.aboutSection}>
              <div className={styles.aboutHeader}>
                <span className={styles.aboutIcon}>🐝</span>
                <h3 className={styles.aboutTitle}>{siteConfig.name}</h3>
              </div>
              <p className={styles.aboutLabel}>{siteConfig.label}</p>
              <p className={styles.aboutSlogan}>{siteConfig.slogan}</p>
              <p className={styles.aboutDescription}>
                Découvrez l'origine de votre miel avec notre système de traçabilité complet.
                Du rucher à votre table, suivez chaque étape de production.
              </p>
            </div>

            {/* Navigation */}
            <div className={styles.navSection}>
              <h4 className={styles.navTitle}>Navigation</h4>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link href="/" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>🏠</span>
                    <span className={styles.navLinkText}>Accueil</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/au-rucher" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>🐝</span>
                    <span className={styles.navLinkText}>Au rucher</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/mon-apiculture" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>👨‍🌾</span>
                    <span className={styles.navLinkText}>Mon apiculture</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/mes-miels" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>🍯</span>
                    <span className={styles.navLinkText}>Mes miels</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/frelon-asiatique" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>⚠️</span>
                    <span className={styles.navLinkText}>Le frelon asiatique</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/contact" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>📧</span>
                    <span className={styles.navLinkText}>Me contacter</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <a href="https://bee-apic.com" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>🛒</span>
                    <span className={styles.navLinkText}>Boutique</span>
                  </a>
                </li>
                <li className={styles.navItem}>
                  <Link href="/tracabilite" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>🔍</span>
                    <span className={styles.navLinkText}>Traçabilité</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/a-propos" className={styles.navLink}>
                    <span className={styles.navLinkIcon}>ℹ���</span>
                    <span className={styles.navLinkText}>À Propos</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.contactSection}>
              <h4 className={styles.contactTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <a href={`mailto:${siteConfig.company.email}`} className={styles.contactLink}>
                    {siteConfig.company.email}
                  </a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <a href={`tel:${siteConfig.company.phone}`} className={styles.contactLink}>
                    {siteConfig.company.phone}
                  </a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span className={styles.contactAddress}>{siteConfig.company.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              &copy; {currentYear} {siteConfig.name}. Tous droits réservés.
            </p>
            <div className={styles.madeWith}>
              <span>Fait avec</span>
              <span className={styles.heart}>❤️</span>
              <span>en Loire-Atlantique</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
