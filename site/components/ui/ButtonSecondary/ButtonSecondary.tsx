import styles from "./ButtonSecondary.module.css";
import Link from "next/link";

interface ButtonSecondaryProps {
    link: string;
    text: string;
    target?: string;
    className?: string;
    classNameLink?: string;
}

export default function ButtonSecondary(
    { link, text, target, className, classNameLink }: ButtonSecondaryProps
) {
    return(
        <div className={`${className} ${styles.ctaButtons} ` }>
            <Link href={link} className={`${classNameLink} ${styles.btnSecondary}`} target={target}>
                {text}
            </Link>
        </div>
    )
}