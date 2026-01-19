"use client";

import {FormEvent, useState} from "react";
import {siteConfig} from "@/config/site";
import styles from "@/app/contact/page.module.css";
import { useCookieConsent, canUseCookies } from "@/hooks/useCookieConsent";

export default function ContactClient() {
    const cookieConsent = useCookieConsent();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleReopenCookieBanner = () => {
        // Supprimer le consentement pour faire réapparaître la bannière
        localStorage.removeItem("cookieConsent");
        localStorage.removeItem("cookieConsentDate");

        // Émettre un événement pour notifier les autres composants
        window.dispatchEvent(new Event("cookieConsentChanged"));

        // Recharger la page pour afficher la bannière
        window.location.reload();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Vérifier si l'utilisateur a accepté les cookies
        if (!canUseCookies()) {
            setStatus('error');
            setErrorMessage('Vous devez accepter les cookies pour envoyer un message via ce formulaire. Veuillez accepter les cookies et réessayer.');
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        try {
            // EmailJS configuration
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

            // Vérification de la configuration
            if (!serviceId || !templateId || !publicKey) {
                throw new Error('Configuration EmailJS manquante. Veuillez configurer les variables d\'environnement.');
            }

            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: serviceId,
                    template_id: templateId,
                    user_id: publicKey,
                    template_params: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone || 'Non renseigné',
                        message: formData.message,
                        to_email: siteConfig.company.email,
                    }
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                throw new Error('Erreur lors de l\'envoi du message');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.');
            console.error('Erreur EmailJS:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>
                    Me Contacter
                </h1>

                <div className={styles.companyCard}>
                    <p className={styles.companyDescription}>
                        Vous avez une question sur nos miels, notre apiculture ou souhaitez devenir partenaire ?
                        N'hésitez pas à nous contacter !
                    </p>

                    <div className={styles.contactGrid}>
                        {/* Coordonnées */}
                        <div className={styles.contactSection}>
                            <h2 className={styles.contactSectionTitle}>
                                Coordonnées
                            </h2>

                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>🏢</span>
                                    <div className={styles.contactContent}>
                                        <strong className={styles.contactLabel}>Entreprise</strong>
                                        <span className={styles.contactText}>{siteConfig.name}</span>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>📍</span>
                                    <div className={styles.contactContent}>
                                        <strong className={styles.contactLabel}>Adresse</strong>
                                        <span className={styles.contactText} style={{ whiteSpace: 'pre-line' }}>{siteConfig.company.address}</span>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>📧</span>
                                    <div className={styles.contactContent}>
                                        <strong className={styles.contactLabel}>Email</strong>
                                        <a
                                            href={`mailto:${siteConfig.company.email}`}
                                            className={styles.contactLink}
                                        >
                                            {siteConfig.company.email}
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>📱</span>
                                    <div className={styles.contactContent}>
                                        <strong className={styles.contactLabel}>Téléphone</strong>
                                        <a
                                            href={`tel:${siteConfig.company.phone}`}
                                            className={styles.contactLink}
                                        >
                                            {siteConfig.company.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <span className={styles.contactIcon}>🌐</span>
                                    <div className={styles.contactContent}>
                                        <strong className={styles.contactLabel}>Site Web</strong>
                                        <a
                                            href={siteConfig.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.contactLink}
                                        >
                                            bee-apic.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulaire de contact */}
                        <div className={styles.contactSection}>
                            <h2 className={styles.contactSectionTitle}>
                                ✉️ Envoyez un message
                            </h2>

                            {cookieConsent.status === 'refused' && (
                                <div className={styles.warningMessage}>
                                    <span className={styles.warningIcon}>⚠️</span>
                                    <div>
                                        <p>
                                            Vous avez refusé les cookies. Pour utiliser ce formulaire de contact,
                                            vous devez accepter les cookies qui permettent de traiter votre demande.
                                        </p>
                                        <button
                                            onClick={handleReopenCookieBanner}
                                            className={styles.reopenButton}
                                            type="button"
                                        >
                                            🍪 Modifier mes préférences de cookies
                                        </button>
                                        <p className={styles.alternativeText}>
                                            Ou contactez-nous directement par <a href={`mailto:${siteConfig.company.email}`} className={styles.contactLink}>{siteConfig.company.email}</a> ou par téléphone au <a href={`tel:${siteConfig.company.phone}`} className={styles.contactLink}>{siteConfig.company.phone}</a>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {cookieConsent.status === 'pending' && (
                                <div className={styles.infoMessage}>
                                    <span className={styles.infoIcon}>ℹ️</span>
                                    <div>
                                        <p>
                                            Ce formulaire nécessite l'utilisation de cookies pour fonctionner.
                                            Veuillez accepter les cookies en utilisant la bannière en bas de page.
                                        </p>
                                        <p className={styles.alternativeText}>
                                            Si la bannière n'apparaît pas, rechargez la page. Vous pouvez aussi nous contacter
                                            directement par <a href={`mailto:${siteConfig.company.email}`} className={styles.contactLink}>{siteConfig.company.email}</a>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {status === 'success' && (
                                <div className={styles.successMessage}>
                                    <span className={styles.successIcon}>✅</span>
                                    <p>Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.</p>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className={styles.errorMessage}>
                                    <span className={styles.errorIcon}>❌</span>
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Nom *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={status === 'sending'}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={status === 'sending'}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={status === 'sending'}
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        disabled={status === 'sending'}
                                        className={styles.formTextarea}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={styles.submitButton}
                                >
                                    {status === 'sending' ? (
                                        <>⏳ Envoi en cours...</>
                                    ) : (
                                        <>📤 Envoyer</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}