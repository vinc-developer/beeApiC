"use client";

import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import styles from './popup.module.css';

export default function HoneyDataInfoPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Vérifier si l'utilisateur a déjà vu la popup
        const hasSeenPopup = localStorage.getItem('hasSeenHoneyDataInfo');
        if (!hasSeenPopup) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenHoneyDataInfo', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <Info className={styles.headerIcon} size={24} />
                        <h2 className={styles.headerTitle}>Information</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className={styles.closeButton}
                        aria-label="Fermer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        Les données affichées sont à <span className={styles.highlight}>titre d'exemple</span>.
                    </p>
                    <p className={styles.paragraph}>
                        Les numéros de lot seront mis à jour avec les prochaines productions de miel. 🍯
                    </p>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <button
                        onClick={handleClose}
                        className={styles.confirmButton}
                    >
                        J'ai compris
                    </button>
                </div>
            </div>
        </div>
    );
}

