import styles from "./BackButton.module.css";
import Link from "next/link";
export default function BackButton() {
    return (
        <div className={styles.backButtonContainer}>
            <Link href="/" className={styles.btnSecondary}>
                ← Retour à l'accueil
            </Link>
        </div>
    );
}