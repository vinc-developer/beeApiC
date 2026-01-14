import Link from 'next/link';
import { siteConfig } from '@/config/site';
import styles from './Footer.module.css';
import CardEntreprise from "@/components/entreprise/card-entreprise";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

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

