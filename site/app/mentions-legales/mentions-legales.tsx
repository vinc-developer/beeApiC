"use client";

import styles from "./page.module.css";
import {siteConfig} from "@/config/site";
import {resetConsent} from "@/hooks/useCookieConsent";

export default function MentionsLegalesComponent() {

    const handleReset = () => {
        resetConsent();
        window.location.reload();
    };

    const handleResetPopup = () => {
        localStorage.removeItem('hasSeenHoneyDataInfo');
        alert('La popup d\'information sera de nouveau affichée lors de votre prochaine visite sur la page des miels.');
    };

    const handleResetNewsBanner = () => {
        localStorage.removeItem('newsBannerClosed');
        alert('Le bandeau d\'actualités sera de nouveau affiché lors du rechargement de la page.');
        window.location.reload();
    };

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.pageTitle}>Mentions légales</h1>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🏢</span>
                        Éditeur du site
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Le présent site est édité par :
                        </p>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}><strong>{siteConfig.name}</strong></span>
                            <span className={styles.infoLine}>Apiculteur Locale</span>
                            <span className={styles.infoLine}>SIRET : <em>{siteConfig.company.siret}</em></span>
                            <span className={styles.infoLine}>Siège social : <em>{siteConfig.company.address}</em></span>
                            <span className={styles.infoLine}>
                                Email : <a href="mailto:bee.apic.pro@gmail.com" className={styles.link}>{siteConfig.company.email}</a>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>✍️</span>
                        Responsable de la publication
                    </h2>
                    <div className={styles.sectionContent}>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}>
                                Le responsable de la publication est : <strong>Vincent Colas</strong>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🌐</span>
                        Hébergement
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Le site est hébergé par :
                        </p>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}><strong>o2switch</strong></span>
                            <span className={styles.infoLine}>Chemin des Pardiaux</span>
                            <span className={styles.infoLine}>63000 Clermont-Ferrand</span>
                            <span className={styles.infoLine}>
                                Site web : <a href="https://www.o2switch.fr/" target="_blank" rel="noopener noreferrer" className={styles.link}>https://www.o2switch.fr/</a>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>©</span>
                        Propriété intellectuelle
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            L'ensemble du contenu présent sur le site Bee Api'C (textes, images, logos, graphismes,
                            vidéos, icônes, sons, etc.) est protégé par le droit de la propriété intellectuelle.
                        </p>
                        <div className={styles.highlightBox}>
                            <p className={styles.highlightText}>
                                Toute reproduction, représentation, modification, publication ou adaptation, totale
                                ou partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite,
                                sauf autorisation écrite préalable de Bee Api'C.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>⚖️</span>
                        Responsabilité
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Bee Api'C s'efforce de fournir sur ce site des informations aussi précises que possible.
                            Toutefois, l'éditeur ne pourra être tenu responsable des omissions, des inexactitudes
                            ou des carences dans la mise à jour des informations, qu'elles soient de son fait ou du
                            fait des tiers partenaires.
                        </p>
                        <p className={styles.paragraph}>
                            L'utilisateur reconnaît utiliser les informations du site sous sa responsabilité exclusive.
                        </p>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🔒</span>
                        Données personnelles
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Les données personnelles éventuellement collectées via le site Bee Api'C (formulaire de contact,
                            email, etc.) sont utilisées uniquement dans le cadre des échanges avec l'utilisateur.
                            Elles ne sont ni vendues, ni cédées, ni transmises à des tiers.
                        </p>
                        <div className={styles.highlightBox}>
                            <p className={styles.highlightText}>
                                <strong>RGPD :</strong> Conformément au Règlement Général sur la Protection des Données,
                                vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
                                Pour exercer ce droit, contactez-nous à{' '}
                                <a href="mailto:bee.apic.pro@gmail.com" className={styles.link}>{siteConfig.company.email}</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🍪</span>
                        Politique de Cookies
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Le site Bee Api'C utilise des cookies uniquement dans le cadre de la gestion des demandes
                            de contact via le formulaire. Conformément au RGPD et à la directive ePrivacy, nous demandons
                            votre consentement avant toute utilisation de cookies.
                        </p>

                        <h3 className={styles.subsectionTitle}>Qu'est-ce qu'un cookie ?</h3>
                        <p className={styles.paragraph}>
                            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone)
                            lors de la visite d'un site web. Il permet de mémoriser des informations relatives à votre navigation.
                        </p>

                        <h3 className={styles.subsectionTitle}>Types de cookies utilisés</h3>
                        <div className={styles.highlightBox}>
                            <p className={styles.highlightText}>
                                <strong>Cookies de fonctionnement :</strong> Ces cookies sont strictement nécessaires
                                au fonctionnement du formulaire de contact. Ils permettent de mémoriser vos informations
                                pendant la durée de votre visite pour faciliter votre prise de contact.
                            </p>
                        </div>

                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}>
                                ❌ <strong>Nous n'utilisons PAS :</strong>
                            </span>
                            <span className={styles.infoLine}>• Cookies publicitaires</span>
                            <span className={styles.infoLine}>• Cookies de tracking</span>
                            <span className={styles.infoLine}>• Cookies de réseaux sociaux</span>
                            <span className={styles.infoLine}>• Cookies de profilage</span>
                        </div>

                        <h3 className={styles.subsectionTitle}>Gestion de votre consentement</h3>
                        <p className={styles.paragraph}>
                            Lors de votre première visite sur le site, une bannière vous demande votre consentement
                            pour l'utilisation de cookies. Vous pouvez :
                        </p>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}>✅ <strong>Accepter</strong> les cookies pour utiliser le formulaire de contact</span>
                            <span className={styles.infoLine}>❌ <strong>Refuser</strong> les cookies (le formulaire ne sera pas accessible)</span>
                        </div>

                        <h3 className={styles.subsectionTitle}>Durée de conservation</h3>
                        <p className={styles.paragraph}>
                            Votre choix de consentement est conservé localement dans votre navigateur.
                            Les cookies de fonctionnement sont supprimés automatiquement à la fermeture de votre navigateur.
                        </p>

                        <h3 className={styles.subsectionTitle}>Comment supprimer les cookies ?</h3>
                        <p className={styles.paragraph}>
                            Vous pouvez à tout moment supprimer les cookies en :
                        </p>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}>• Supprimant les données de navigation de votre navigateur</span>
                            <span className={styles.infoLine}>• Configurant votre navigateur pour refuser les cookies</span>
                            <span className={styles.infoLine}>• Rechargeant la page et refusant le consentement</span>
                            <span className={styles.infoLine}>• Cliquer sur le bouton ci-dessous :</span>
                            <button onClick={handleReset} className={styles.resetButton}>
                                Supprimer mes données !
                            </button>
                        </div>

                        <div className={styles.highlightBox}>
                            <p className={styles.highlightText}>
                                <strong>Note importante :</strong> Le refus des cookies empêchera l'utilisation du formulaire
                                de contact. Vous pourrez toujours nous contacter par email à{' '}
                                <a href="mailto:bee.apic.pro@gmail.com" className={styles.link}>{siteConfig.company.email}</a>
                                {' '}ou par téléphone.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>💾</span>
                        Stockage Local et Préférences
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            En plus des cookies, le site utilise le stockage local de votre navigateur (localStorage)
                            pour améliorer votre expérience utilisateur.
                        </p>

                        <h3 className={styles.subsectionTitle}>Popup d'information sur les données</h3>
                        <p className={styles.paragraph}>
                            Lors de votre première visite sur la page de traçabilité des miels, une popup d'information
                            s'affiche pour vous expliquer que les données sont à titre d'exemple. Une fois que vous
                            avez fermé cette popup, votre préférence est enregistrée localement dans votre navigateur
                            pour ne plus l'afficher lors de vos prochaines visites.
                        </p>

                        <div className={styles.highlightBox}>
                            <p className={styles.highlightText}>
                                <strong>Aucune donnée personnelle n'est collectée</strong> - Seule l'information
                                indiquant que vous avez vu la popup est stockée localement sur votre appareil.
                            </p>
                        </div>

                        <h3 className={styles.subsectionTitle}>Bandeau d'actualités</h3>
                        <p className={styles.paragraph}>
                            Lorsque vous fermez le bandeau d'actualités en haut de la page, votre choix est enregistré
                            pendant 24 heures pour éviter de vous afficher à nouveau ce bandeau de manière répétitive.
                            Cette information est stockée localement dans votre navigateur uniquement.
                        </p>

                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}>
                                <strong>📢 Durée de masquage :</strong> 24 heures
                            </span>
                            <span className={styles.infoLine}>
                                <strong>💾 Stockage :</strong> localStorage (local, non transmis)
                            </span>
                            <span className={styles.infoLine}>
                                <strong>🔒 Données :</strong> Date de fermeture uniquement
                            </span>
                        </div>

                        <p className={styles.paragraph}>
                            Si vous souhaitez réafficher le bandeau immédiatement, vous pouvez cliquer sur le bouton ci-dessous :
                        </p>
                        <div className={styles.infoBlock}>
                            <button onClick={handleResetNewsBanner} className={styles.resetButton}>
                                Réafficher le bandeau d'actualités
                            </button>
                        </div>

                        <h3 className={styles.subsectionTitle}>Réinitialiser vos préférences</h3>
                        <p className={styles.paragraph}>
                            Si vous souhaitez revoir la popup d'information des miels, vous pouvez cliquer sur le bouton ci-dessous :
                        </p>
                        <div className={styles.infoBlock}>
                            <button onClick={handleResetPopup} className={styles.resetButton}>
                                Réafficher la popup d'information
                            </button>
                        </div>

                        <h3 className={styles.subsectionTitle}>Suppression complète</h3>
                        <p className={styles.paragraph}>
                            Pour supprimer toutes les données stockées localement :
                        </p>
                        <div className={styles.infoBlock}>
                            <span className={styles.infoLine}>• Videz le cache et les données de navigation de votre navigateur</span>
                            <span className={styles.infoLine}>• Utilisez le mode navigation privée/incognito</span>
                            <span className={styles.infoLine}>• Configurez votre navigateur pour refuser le stockage local</span>
                        </div>
                    </div>
                </div>

                <div className={styles.legalSection}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🇫🇷</span>
                        Droit applicable
                    </h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.paragraph}>
                            Les présentes mentions légales sont régies par le droit français.
                            En cas de litige, et à défaut de résolution amiable, les tribunaux français
                            seront seuls compétents.
                        </p>
                    </div>
                </div>

                <div className={styles.footerNote}>
                    <p>Dernière mise à jour : Janvier 2025</p>
                    <p>Bee Api'C - Apiculture locale en Loire-Atlantique</p>
                </div>
            </section>
        </div>
    )
}