"use client";

import { useState, useEffect } from "react";

export type ConsentStatus = "accepted" | "refused" | "pending";

interface CookieConsentData {
    status: ConsentStatus;
    date: string | null;
}

/**
 * Hook personnalisé pour gérer le consentement aux cookies
 * Permet de vérifier si l'utilisateur a donné son consentement
 * et d'accéder au statut depuis n'importe quel composant
 */
export function useCookieConsent(): CookieConsentData {
    const [consent, setConsent] = useState<CookieConsentData>({
        status: "pending",
        date: null,
    });

    useEffect(() => {
        // Fonction pour lire le consentement depuis localStorage
        const updateConsent = () => {
            const consentStatus = localStorage.getItem("cookieConsent");
            const consentDate = localStorage.getItem("cookieConsentDate");

            if (consentStatus === "accepted" || consentStatus === "refused") {
                setConsent({
                    status: consentStatus as ConsentStatus,
                    date: consentDate,
                });
            } else {
                setConsent({
                    status: "pending",
                    date: null,
                });
            }
        };

        // Lire le consentement initial
        updateConsent();

        // Écouter les changements de localStorage (pour les onglets multiples)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "cookieConsent" || e.key === null) {
                updateConsent();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // Écouter les événements personnalisés pour les changements dans le même onglet
        const handleCustomEvent = () => {
            updateConsent();
        };

        window.addEventListener("cookieConsentChanged", handleCustomEvent);

        // Nettoyage
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("cookieConsentChanged", handleCustomEvent);
        };
    }, []);

    return consent;
}

/**
 * Fonction utilitaire pour vérifier si on peut utiliser les cookies
 */
export function canUseCookies(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("cookieConsent") === "accepted";
}

/**
 * Fonction pour réinitialiser le consentement (utile pour les tests)
 */
export function resetConsent(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("cookieConsent");
    localStorage.removeItem("cookieConsentDate");
    localStorage.removeItem('hasSeenHoneyDataInfo');
    localStorage.removeItem('newsBannerClosed');
}
