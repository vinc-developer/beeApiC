'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apicultureOpen, setApicultureOpen] = useState(false);
  const [engagementsOpen, setEngagementsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize(); // Initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debug: Monitor state changes
  useEffect(() => {
    console.log('📊 État Apiculture:', apicultureOpen);
  }, [apicultureOpen]);

  useEffect(() => {
    console.log('📊 État Engagements:', engagementsOpen);
  }, [engagementsOpen]);

  // Ferme tous les menus
  const closeAllMenus = () => {
    console.log('🔴 Fermeture de tous les menus');
    setApicultureOpen(false);
    setEngagementsOpen(false);
  };

  // Ferme tout y compris le menu mobile
  const closeEverything = () => {
    setMobileMenuOpen(false);
    closeAllMenus();
  };

  // Ouvre le menu mobile avec sous-menus fermés
  const openMobileMenu = () => {
    setMobileMenuOpen(true);
    closeAllMenus();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoImageWrapper}>
              <Image
                src= {`${process.env.NEXT_PUBLIC_BASE_PATH}//images/logo-beeapic.png`}
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

            {/* Dropdown L'Apiculture */}
            <div
              className={styles.dropdown}
              data-open={apicultureOpen}
            >
              <button
                className={styles.dropdownToggle}
                onClick={() => {
                  console.log('🐝 CLICK Apiculture, current:', apicultureOpen);
                  setApicultureOpen(!apicultureOpen);
                  if (!apicultureOpen) setEngagementsOpen(false);
                }}
                onMouseEnter={() => {
                  console.log('🐝 Mouse ENTER Apiculture');
                  setApicultureOpen(true);
                  setEngagementsOpen(false);
                }}
              >
                <span className={styles.navLinkIcon}>
                  <span>🐝</span>
                  <span>L'Apiculture</span>
                  <span className={styles.dropdownArrow}>▼</span>
                </span>
              </button>
              <div
                className={`${styles.dropdownMenu} ${apicultureOpen ? styles.dropdownMenuOpen : ''}`}
                style={apicultureOpen ? { opacity: 1, visibility: 'visible', transform: 'translateY(0)' } : {}}
                onMouseEnter={() => {
                  console.log('🐝 Mouse ENTER Menu');
                  setApicultureOpen(true);
                }}
                onMouseLeave={() => {
                  console.log('🐝 Mouse LEAVE Menu');
                  setApicultureOpen(false);
                }}
              >
                <Link
                  href="/au-rucher"
                  className={styles.dropdownItem}
                  onClick={() => {
                    console.log('🔴 Click Au rucher - Navigation en cours');
                    setTimeout(() => closeAllMenus(), 100);
                  }}
                >
                  <span>🐝</span>
                  <span>Au rucher</span>
                </Link>
                <Link
                  href="/mon-apiculture"
                  className={styles.dropdownItem}
                  onClick={() => {
                    console.log('🔴 Click Mon apiculture');
                    setTimeout(() => closeAllMenus(), 100);
                  }}
                >
                  <span>👨‍🌾</span>
                  <span>Mon apiculture</span>
                </Link>
                <Link
                  href="/mes-miels"
                  className={styles.dropdownItem}
                  onClick={() => {
                    console.log('🔴 Click Mes miels');
                    setTimeout(() => closeAllMenus(), 100);
                  }}
                >
                  <span>🍯</span>
                  <span>Mes miels</span>
                </Link>
                <Link
                  href="/frelon-asiatique"
                  className={styles.dropdownItem}
                  onClick={() => {
                    console.log('🔴 Click Frelon asiatique');
                    setTimeout(() => closeAllMenus(), 100);
                  }}
                >
                  <span>⚠️</span>
                  <span>Le frelon asiatique</span>
                </Link>
              </div>
            </div>

            {/* Dropdown Apiculteurs & Traçabilité */}
            <div
              className={styles.dropdown}
              data-open={engagementsOpen}
            >
              <button
                className={styles.dropdownToggle}
                onClick={() => {
                  setEngagementsOpen(!engagementsOpen);
                  if (!engagementsOpen) setApicultureOpen(false);
                }}
                onMouseEnter={() => {
                  setEngagementsOpen(true);
                  setApicultureOpen(false);
                }}
              >
                <span className={styles.navLinkIcon}>
                  <span>👥</span>
                  <span>Nos engagements</span>
                  <span className={styles.dropdownArrow}>▼</span>
                </span>
              </button>
              <div
                className={`${styles.dropdownMenu} ${engagementsOpen ? styles.dropdownMenuOpen : ''}`}
                style={engagementsOpen ? { opacity: 1, visibility: 'visible', transform: 'translateY(0)' } : {}}
                onMouseEnter={() => setEngagementsOpen(true)}
                onMouseLeave={() => setEngagementsOpen(false)}
              >
                <Link
                    href="/entreprises-rse"
                    className={styles.dropdownItem}
                    onClick={() => {
                      console.log('🔴 Click Tracer mon miel');
                      setTimeout(() => closeAllMenus(), 100);
                    }}
                >
                  <span>🏢</span>
                  <span>Entreprises & RSE</span>
                </Link>
                <Link
                  href="/apiculteurs"
                  className={styles.dropdownItem}
                  onClick={() => {
                    console.log('🔴 Click Nos apiculteurs');
                    setTimeout(() => closeAllMenus(), 100);
                  }}
                >
                  <span>👥</span>
                  <span>Nos apiculteurs</span>
                </Link>
                <Link
                  href="/tracabilite"
                  className={styles.dropdownItem}
                  onClick={() => {
                    console.log('🔴 Click Tracer mon miel');
                    setTimeout(() => closeAllMenus(), 100);
                  }}
                >
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
          </nav>

          {/* Mobile menu button */}
          <button
            className={styles.mobileMenuButton}
            aria-label="Menu"
            onClick={() => mobileMenuOpen ? closeEverything() : openMobileMenu()}
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
                    <Link href="/au-rucher" className={styles.mobileDropdownItem} onClick={closeEverything}>
                      <span>🐝</span>
                      <span>Au rucher</span>
                    </Link>
                    <Link href="/mon-apiculture" className={styles.mobileDropdownItem} onClick={closeEverything}>
                      <span>👨‍🌾</span>
                      <span>Mon apiculture</span>
                    </Link>
                    <Link href="/mes-miels" className={styles.mobileDropdownItem} onClick={closeEverything}>
                      <span>🍯</span>
                      <span>Mes miels</span>
                    </Link>
                    <Link href="/frelon-asiatique" className={styles.mobileDropdownItem} onClick={closeEverything}>
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
                    <Link
                        href="/entreprises-rse" className={styles.mobileDropdownItem} onClick={closeEverything}>
                      <span>🏢</span>
                      <span>Entreprises & RSE</span>
                    </Link>
                    <Link href="/apiculteurs" className={styles.mobileDropdownItem} onClick={closeEverything}>
                      <span>👥</span>
                      <span>Nos apiculteurs</span>
                    </Link>
                    <Link href="/tracabilite" className={styles.mobileDropdownItem} onClick={closeEverything}>
                      <span>🔍</span>
                      <span>Tracer mon miel</span>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className={styles.mobileNavLink} onClick={closeEverything}>
                <span>📧</span>
                <span>Me contacter</span>
              </Link>

              <a
                href="https://bee-apic.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileNavLink}
                onClick={closeEverything}
              >
                <span>🛒</span>
                <span>Boutique</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

