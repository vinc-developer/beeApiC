'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import styles from './Header.module.css';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apicultureOpen, setApicultureOpen] = useState(false);
  const [engagementsOpen, setEngagementsOpen] = useState(false);

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
            <div
              className={styles.dropdown}
              onMouseEnter={() => setApicultureOpen(true)}
              onMouseLeave={() => setApicultureOpen(false)}
            >
              <button
                className={styles.dropdownToggle}
                onClick={() => setApicultureOpen(!apicultureOpen)}
              >
                <span className={styles.navLinkIcon}>
                  <span>🐝</span>
                  <span>L'Apiculture</span>
                  <span className={styles.dropdownArrow}>▼</span>
                </span>
              </button>
              <div className={`${styles.dropdownMenu} ${apicultureOpen ? styles.dropdownMenuOpen : ''}`}>
                <Link href="/au-rucher" className={styles.dropdownItem}>
                  <span>🐝</span>
                  <span>Au rucher</span>
                </Link>
                <Link href="/mon-apiculture" className={styles.dropdownItem}>
                  <span>👨‍🌾</span>
                  <span>Mon apiculture</span>
                </Link>
                <Link href="/mes-miels" className={styles.dropdownItem}>
                  <span>🍯</span>
                  <span>Mes miels</span>
                </Link>
                <Link href="/frelon-asiatique" className={styles.dropdownItem}>
                  <span>⚠️</span>
                  <span>Le frelon asiatique</span>
                </Link>
              </div>
            </div>

            {/* Dropdown Apiculteurs & Traçabilité */}
            <div
              className={styles.dropdown}
              onMouseEnter={() => setEngagementsOpen(true)}
              onMouseLeave={() => setEngagementsOpen(false)}
            >
              <button
                className={styles.dropdownToggle}
                onClick={() => setEngagementsOpen(!engagementsOpen)}
              >
                <span className={styles.navLinkIcon}>
                  <span>👥</span>
                  <span>Nos engagements</span>
                  <span className={styles.dropdownArrow}>▼</span>
                </span>
              </button>
              <div className={`${styles.dropdownMenu} ${engagementsOpen ? styles.dropdownMenuOpen : ''}`}>
                <Link href="/apiculteurs" className={styles.dropdownItem}>
                  <span>👥</span>
                  <span>Nos apiculteurs</span>
                </Link>
                <Link href="/tracabilite" className={styles.dropdownItem}>
                  <span>🔍</span>
                  <span>Tracer mon miel</span>
                </Link>
              </div>
            </div>

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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              <Link href="/" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <span>🏠</span>
                <span>Accueil</span>
              </Link>

              {/* Apiculture Mobile */}
              <div className={styles.mobileDropdown}>
                <button
                  className={styles.mobileDropdownToggle}
                  onClick={() => setApicultureOpen(!apicultureOpen)}
                >
                  <span>🐝 L'Apiculture</span>
                  <span className={styles.dropdownArrow}>{apicultureOpen ? '▲' : '▼'}</span>
                </button>
                {apicultureOpen && (
                  <div className={styles.mobileDropdownMenu}>
                    <Link href="/au-rucher" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                      <span>🐝</span>
                      <span>Au rucher</span>
                    </Link>
                    <Link href="/mon-apiculture" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                      <span>👨‍🌾</span>
                      <span>Mon apiculture</span>
                    </Link>
                    <Link href="/mes-miels" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                      <span>🍯</span>
                      <span>Mes miels</span>
                    </Link>
                    <Link href="/frelon-asiatique" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                      <span>⚠️</span>
                      <span>Le frelon asiatique</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Engagements Mobile */}
              <div className={styles.mobileDropdown}>
                <button
                  className={styles.mobileDropdownToggle}
                  onClick={() => setEngagementsOpen(!engagementsOpen)}
                >
                  <span>👥 Nos engagements</span>
                  <span className={styles.dropdownArrow}>{engagementsOpen ? '▲' : '▼'}</span>
                </button>
                {engagementsOpen && (
                  <div className={styles.mobileDropdownMenu}>
                    <Link href="/apiculteurs" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                      <span>👥</span>
                      <span>Nos apiculteurs</span>
                    </Link>
                    <Link href="/tracabilite" className={styles.mobileDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                      <span>🔍</span>
                      <span>Tracer mon miel</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <span>📧</span>
                <span>Me contacter</span>
              </Link>

              <a
                href="https://bee-apic.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🛒</span>
                <span>Boutique</span>
              </a>

              <Link href="/a-propos" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                <span>ℹ️</span>
                <span>À Propos</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

