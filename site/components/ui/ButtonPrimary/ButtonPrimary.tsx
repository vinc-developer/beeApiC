import styles from "./ButtonPrimary.module.css";
import Link from "next/link";

interface ButtonPrimaryProps {
    link: string;
    text: string;
    target?: string;
}

export default function ButtonPrimary(
    { link, text, target }: ButtonPrimaryProps
) {
    return(
        <div className={styles.ctaButtons}>
            <Link href={link} className={styles.btnPrimary} target={target}>
                {text}
            </Link>
        </div>
        )
}