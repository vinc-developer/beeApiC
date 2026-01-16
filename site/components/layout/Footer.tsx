import Link from 'next/link';
import { siteConfig } from '@/config/site';
import styles from './Footer.module.css';
import CardEntreprise from "@/components/entreprise/card-entreprise";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        <div className={styles.footerTop}>
          <div>
            <h3>Bee Api'C</h3>
            <h4>Apiculteur local</h4>
            <h5>Entre Nantes et Pornic</h5>
          </div>
          <div className={styles.footerNavigation}>
            <ul>
              <li>
                <Link href="/a-propos" className={styles.mobileDropdownItem}>
                  <span>A propos</span>
                </Link>
              </li>
              <li>
                <Link href="https://bee-apic.sumupstore.com/produits" className={styles.mobileDropdownItem} target={"_blank"}>
                  <span>Boutique</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.mobileDropdownItem}>
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className={styles.mobileDropdownItem}>
                  <span>Mentions-legales</span>
                </Link>
              </li>
            </ul>
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

