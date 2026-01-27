import Link from 'next/link';
import { siteConfig } from '@/config/site';
import styles from './Footer.module.css';
import {FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        <div className={styles.footerTop}>
          <div className={styles.footerInfo}>
            <h3>Bee Api'C - Apiculteur local</h3>
            <h4>Entre Nantes et Pornic</h4>
            <h5>Saint-Hilaire-de-Chaléons</h5>

            <div className={styles.socialIcons}>
              <a
                  href="https://www.facebook.com/profile.php?id=61572010006092"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-network="facebook"
              >
                <FaFacebook className="social-icon"/>
              </a>
              <a
                  href="https://www.instagram.com/bee.api.c/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-network="instagram"
              >
                <FaInstagram className="social-icon"/>
              </a>
              <a
                  href="https://www.linkedin.com/company/bee-apic"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-network="linkedin"
              >
                <FaLinkedin className="social-icon"/>
              </a>
            </div>
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
            </ul>

            <ul>
              <li>
                <Link href="/faq" className={styles.mobileDropdownItem}>
                  <span>F.A.Q</span>
                </Link>
              </li>
              <li>
                <Link href="/plan-site" className={styles.mobileDropdownItem}>
                  <span>Plan du site</span>
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className={styles.mobileDropdownItem}>
                  <span>Mentions-légales</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className={styles.mobileDropdownItem}>
                  <span>Connexion</span>
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

