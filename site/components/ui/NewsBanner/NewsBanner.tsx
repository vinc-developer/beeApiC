'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './NewsBanner.module.css';

interface NewsItem {
    id: string;
    message: string;
    type?: 'info' | 'warning' | 'success' | 'promotion';
    link?: string;
    active: boolean;
}

const NEWS_DATA: NewsItem[] = [
    {
        id: '1',
        message: '🍯 Bienvenue sur mon nouveau site ! Pour fêter ça, profitez de -15% sur toute la boutique avec le code WELCOME15 🎉',
        type: 'warning',
        link: 'https://bee-apic.sumupstore.com/produits',
        active: true
    },
    {
         id: '2',
         message: '📢 Marché de Noël : Retrouvez-nous le samedi 15 décembre à Saint-Brevin',
         type: 'info',
         link: '/contact',
         active: false
     },
     {
         id: '3',
         message: '⚠️ Rupture de stock temporaire sur le miel d\'acacia - Retour prévu mi-février',
         type: 'success',
         active: false
     },
    {
        id: '4',
        message: '⚠️ Rupture de stock temporaire sur le miel d\'acacia - Retour prévu mi-février',
        type: 'promotion',
        active: false
    },
];

export default function NewsBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeNews, setActiveNews] = useState<NewsItem[]>([]);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const positionRef = useRef<number>(0);
    // vitesse de défilement en pixels par frame
    const speed = 20; // Plus grand = plus rapide, plus petit = plus lent

    // Fonction utilitaire pour réinitialiser le bandeau (accessible dans la console)
    useEffect(() => {
        // @ts-ignore
        globalThis.resetNewsBanner = () => {
            localStorage.removeItem('newsBannerClosed');
            console.log('✅ Bandeau d\'actualités réinitialisé - Rechargez la page');
            globalThis.location.reload();
        };
    }, []);

    useEffect(() => {
        // Vérifier d'abord si le bandeau a été fermé récemment (moins de 24h)
        const closedTime = localStorage.getItem('newsBannerClosed');

        if (closedTime) {
            const hoursSinceClosed = (Date.now() - Number.parseInt(closedTime)) / (1000 * 60 * 60);

            if (hoursSinceClosed < 24) {
                setIsVisible(false);
                return; // Ne pas afficher si fermé récemment
            }
        }

        // Filtrer les actualités actives
        const active = NEWS_DATA.filter(news => news.active);

        setActiveNews(active);
        setIsVisible(active.length > 0);
    }, []);

    // Ajouter/retirer une classe sur le body quand le bandeau est visible/invisible
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('has-news-banner');
        } else {
            document.body.classList.remove('has-news-banner');
        }

        // Cleanup lors du démontage du composant
        return () => {
            document.body.classList.remove('has-news-banner');
        };
    }, [isVisible]);

    // Animation de défilement JavaScript fluide
    useEffect(() => {
        if (!isVisible || !scrollerRef.current) return;

        const scroller = scrollerRef.current;

        const animate = () => {
            if (!scroller) return;

            // Obtenir la largeur d'un seul set de contenu (première moitié)
            const firstChild = scroller.firstElementChild as HTMLElement;
            if (!firstChild) return;

            const contentWidth = firstChild.offsetWidth;

            // Incrémenter la position
            positionRef.current += speed / 60; // 60 FPS

            // Réinitialiser quand on a défilé la largeur d'un contenu
            if (positionRef.current >= contentWidth) {
                positionRef.current = 0;
            }

            // Appliquer la transformation
            scroller.style.transform = `translateX(-${positionRef.current}px)`;

            // Continuer l'animation
            animationRef.current = requestAnimationFrame(animate);
        };

        // Démarrer l'animation
        animationRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, activeNews]);

    const handleClose = () => {
        setIsVisible(false);
        // Sauvegarder dans le localStorage pour ne pas réafficher pendant 24h
        localStorage.setItem('newsBannerClosed', Date.now().toString());
    };


    if (!isVisible || activeNews.length === 0) {
        return null;
    }

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    // Créer le contenu de base
    const renderNewsItems = (keyPrefix: string = '') => {
        return activeNews.map((news) => (
            <span key={`${keyPrefix}${news.id}`} className={styles.newsItem}>
                {news.link ? (
                    <a href={`${basePath}${news.link}`} className={styles.newsLink}>
                        {news.message}
                    </a>
                ) : (
                    news.message
                )}
                <span className={styles.separator}>•</span>
            </span>
        ));
    };

    return (
        <div className={`${styles.newsBanner} ${styles[activeNews[0].type || 'info']}`}>
            <div className={styles.newsContent}>
                <div className={styles.newsScroller} ref={scrollerRef}>
                    {/* Premier set de contenu */}
                    <div className={styles.newsGroup}>
                        {renderNewsItems('')}
                    </div>
                    {/* Dupliquer pour le défilement continu */}
                    <div className={styles.newsGroup}>
                        {renderNewsItems('dup-')}
                    </div>
                </div>
            </div>
            <button
                onClick={handleClose}
                className={styles.closeButton}
                aria-label="Fermer le bandeau"
                title="Fermer"
            >
                ✕
            </button>
        </div>
    );
}
