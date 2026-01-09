import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoImageWrapper}>
              <Image
                src="/images/logo-beeapic.png"
                alt={siteConfig.name}
                width={48}
                height={48}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>
                {siteConfig.name}
              </span>
              <span className={styles.logoSlogan}>Don't Pannic, Bee Api'C !</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              <span className={styles.navLinkIcon}>
                <span>🏠</span>
                <span>Accueil</span>
              </span>
            </Link>

            {/* Dropdown L'Apiculture */}
            <div className={styles.dropdown}>
              <button className={styles.dropdownToggle}>
                <span className={styles.navLinkIcon}>
                  <span>🐝</span>
                  <span>L'Apiculture</span>
                  <span className={styles.dropdownArrow}>▼</span>
                </span>
              </button>
              <div className={styles.dropdownMenu}>
                <Link href="/au-rucher" className={styles.dropdownItem}>
                  <span>🐝</span>
                  <span>Au rucher</span>
                </Link>
                <Link href="/mon-apiculture" className={styles.dropdownItem}>
                  <span>👨‍🌾</span>
                  <span>Mon apiculture</span>
                </Link>
                <Link href="/apiculteurs" className={styles.dropdownItem}>
                  <span>👥</span>
                  <span>Nos apiculteurs</span>
                </Link>
                <Link href="/mes-miels" className={styles.dropdownItem}>
                  <span>🍯</span>
                  <span>Mes miels</span>
                </Link>
              </div>
            </div>

            <Link href="/frelon-asiatique" className={styles.navLink}>
              <span className={styles.navLinkIcon}>
                <span>⚠️</span>
                <span>Le frelon asiatique</span>
              </span>
            </Link>

            <Link href="/contact" className={styles.navLink}>
              <span className={styles.navLinkIcon}>
                <span>📧</span>
                <span>Me contacter</span>
              </span>
            </Link>

            <a
              href="https://bee-apic.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              <span className={styles.navLinkIcon}>
                <span>🛒</span>
                <span>Boutique</span>
              </span>
            </a>

            <Link href="/tracabilite" className={styles.navLink}>
              <span className={styles.navLinkIcon}>
                <span>🔍</span>
                <span>Traçabilité</span>
              </span>
            </Link>

            <Link href="/a-propos" className={styles.navLink}>
              <span className={styles.navLinkIcon}>
                <span>ℹ️</span>
                <span>À Propos</span>
              </span>
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/tracabilite"
            className={styles.ctaButton}
          >
            Tracer mon miel
          </Link>

          {/* Mobile menu button */}
          <button
            className={styles.mobileMenuButton}
            aria-label="Menu"
          >
            <svg
              className={styles.menuIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
