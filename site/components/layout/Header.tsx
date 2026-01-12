'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import styles from './Header.module.css';
import { Menu, MenuButton, MenuItems, MenuItem, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoImageWrapper}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo-beeapic.png`}
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
            {/* Dropdown L'Apiculture avec Headless UI */}
            <Menu>
              {({ open }) => (
                <div className={styles.dropdown} data-open={open}>
                  <MenuButton className={styles.dropdownToggle}>
                    <span className={styles.navLinkIcon}>
                      <span>🐝</span>
                      <span>L'Apiculture</span>
                      <span className={styles.dropdownArrow}>▼</span>
                    </span>
                  </MenuButton>
                  <MenuItems
                    className={`${styles.dropdownMenu} ${open ? styles.dropdownMenuOpen : ''}`}
                    style={open ? { opacity: 1, visibility: 'visible', transform: 'translateY(0)' } : {}}
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/au-rucher"
                          className={`${styles.dropdownItem} ${focus ? styles.dropdownItemFocus : ''}`}
                        >
                          <span>🐝</span>
                          <span>Au rucher</span>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/mon-apiculture"
                          className={`${styles.dropdownItem} ${focus ? styles.dropdownItemFocus : ''}`}
                        >
                          <span>👨‍🌾</span>
                          <span>Mon apiculture</span>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/mes-miels"
                          className={`${styles.dropdownItem} ${focus ? styles.dropdownItemFocus : ''}`}
                        >
                          <span>🍯</span>
                          <span>Mes miels</span>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/frelon-asiatique"
                          className={`${styles.dropdownItem} ${focus ? styles.dropdownItemFocus : ''}`}
                        >
                          <span>⚠️</span>
                          <span>Le frelon asiatique</span>
                        </Link>
                      )}
                    </MenuItem>
                  </MenuItems>
                </div>
              )}
            </Menu>

            {/* Dropdown Nos engagements avec Headless UI */}
            <Menu>
              {({ open }) => (
                <div className={styles.dropdown} data-open={open}>
                  <MenuButton className={styles.dropdownToggle}>
                    <span className={styles.navLinkIcon}>
                      <span>👥</span>
                      <span>Nos engagements</span>
                      <span className={styles.dropdownArrow}>▼</span>
                    </span>
                  </MenuButton>
                  <MenuItems
                    className={`${styles.dropdownMenu} ${open ? styles.dropdownMenuOpen : ''}`}
                    style={open ? { opacity: 1, visibility: 'visible', transform: 'translateY(0)' } : {}}
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/entreprises-rse"
                          className={`${styles.dropdownItem} ${focus ? styles.dropdownItemFocus : ''}`}
                        >
                          <span>🏢</span>
                          <span>Entreprises & RSE</span>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/apiculteurs"
                          className={`${styles.dropdownItem} ${focus ? styles.dropdownItemFocus : ''}`}
                        >
                          <span>👥</span>
                          <span>Nos apiculteurs</span>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/tracabilite"
                          className={`${styles.dropdownItem} ${focus ? styles.dropdownItemFocus : ''}`}
                        >
                          <span>🔍</span>
                          <span>Tracer mon miel</span>
                        </Link>
                      )}
                    </MenuItem>
                  </MenuItems>
                </div>
              )}
            </Menu>

            <Link href="/contact" className={styles.navLink}>
              <span className={styles.navLinkIcon}>
                <span>📧</span>
                <span>Me contacter</span>
              </span>
            </Link>

            <a
              href="https://bee-apic.sumupstore.com/produits"
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

          {/* Mobile menu button avec Disclosure de Headless UI */}
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton className={styles.mobileMenuButton} aria-label="Menu">
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
                      d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </DisclosureButton>

                {/* Menu Mobile avec DisclosurePanel */}
                <DisclosurePanel className={styles.mobileMenu}>
                  <nav className={styles.mobileNav}>
                    {/* Apiculture Mobile avec Disclosure imbriqué */}
                    <Disclosure>
                      {({ open: apicultureOpen }) => (
                        <div className={styles.mobileDropdown}>
                          <DisclosureButton className={styles.mobileDropdownToggle}>
                            <span>🐝 L'Apiculture</span>
                            <span className={styles.dropdownArrow}>{apicultureOpen ? '▲' : '▼'}</span>
                          </DisclosureButton>
                          <DisclosurePanel className={styles.mobileDropdownMenu}>
                            <Link href="/au-rucher" className={styles.mobileDropdownItem}>
                              <span>🐝</span>
                              <span>Au rucher</span>
                            </Link>
                            <Link href="/mon-apiculture" className={styles.mobileDropdownItem}>
                              <span>👨‍🌾</span>
                              <span>Mon apiculture</span>
                            </Link>
                            <Link href="/mes-miels" className={styles.mobileDropdownItem}>
                              <span>🍯</span>
                              <span>Mes miels</span>
                            </Link>
                            <Link href="/frelon-asiatique" className={styles.mobileDropdownItem}>
                              <span>⚠️</span>
                              <span>Le frelon asiatique</span>
                            </Link>
                          </DisclosurePanel>
                        </div>
                      )}
                    </Disclosure>

                    {/* Engagements Mobile avec Disclosure imbriqué */}
                    <Disclosure>
                      {({ open: engagementsOpen }) => (
                        <div className={styles.mobileDropdown}>
                          <DisclosureButton className={styles.mobileDropdownToggle}>
                            <span>👥 Nos engagements</span>
                            <span className={styles.dropdownArrow}>{engagementsOpen ? '▲' : '▼'}</span>
                          </DisclosureButton>
                          <DisclosurePanel className={styles.mobileDropdownMenu}>
                            <Link href="/entreprises-rse" className={styles.mobileDropdownItem}>
                              <span>🏢</span>
                              <span>Entreprises & RSE</span>
                            </Link>
                            <Link href="/apiculteurs" className={styles.mobileDropdownItem}>
                              <span>👥</span>
                              <span>Nos apiculteurs</span>
                            </Link>
                            <Link href="/tracabilite" className={styles.mobileDropdownItem}>
                              <span>🔍</span>
                              <span>Tracer mon miel</span>
                            </Link>
                          </DisclosurePanel>
                        </div>
                      )}
                    </Disclosure>

                    <Link href="/contact" className={styles.mobileNavLink}>
                      <span>📧</span>
                      <span>Me contacter</span>
                    </Link>

                    <a
                      href="https://bee-apic.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mobileNavLink}
                    >
                      <span>🛒</span>
                      <span>Boutique</span>
                    </a>
                  </nav>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </header>
  );
}
