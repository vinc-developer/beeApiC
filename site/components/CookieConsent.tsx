"use client";

import { useState, useEffect } from "react";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Vérifier si l'utilisateur a déjà donné son consentement
        const consent = localStorage.getItem("cookieConsent");

        if (!consent) {
            // Petit délai pour l'animation d'apparition
            setTimeout(() => {
                setShowBanner(true);
                setTimeout(() => setIsVisible(true), 100);
            }, 1000);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        localStorage.setItem("cookieConsentDate", new Date().toISOString());

        // Émettre un événement pour notifier les autres composants
        window.dispatchEvent(new Event("cookieConsentChanged"));

        setIsVisible(false);
        setTimeout(() => setShowBanner(false), 300);
    };

    const refuseCookies = () => {
        localStorage.setItem("cookieConsent", "refused");
        localStorage.setItem("cookieConsentDate", new Date().toISOString());

        // Émettre un événement pour notifier les autres composants
        window.dispatchEvent(new Event("cookieConsentChanged"));

        setIsVisible(false);
        setTimeout(() => setShowBanner(false), 300);
    };

    if (!showBanner) return null;

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}>
            <div className={styles.banner}>
                <div className={styles.content}>
                    <div className={styles.icon}>🍪</div>
                    <div className={styles.text}>
                        <h3 className={styles.title}>Respect de votre vie privée</h3>
                        <p className={styles.description}>
                            Ce site utilise des cookies uniquement pour <strong>traiter vos demandes de contact</strong> via le formulaire.
                            Aucun cookie publicitaire ou de tracking n'est utilisé. Votre consentement nous permet de mémoriser
                            vos informations pendant votre navigation pour faciliter votre prise de contact.
                        </p>
                        <p className={styles.moreInfo}>
                            Pour en savoir plus, consultez notre{" "}
                            <a href="/mentions-legales" className={styles.link}>
                                politique de confidentialité
                            </a>.
                        </p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button
                        onClick={refuseCookies}
                        className={styles.buttonRefuse}
                        aria-label="Refuser les cookies"
                    >
                        Refuser
                    </button>
                    <button
                        onClick={acceptCookies}
                        className={styles.buttonAccept}
                        aria-label="Accepter les cookies"
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
}
