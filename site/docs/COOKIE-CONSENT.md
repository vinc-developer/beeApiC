# Système de Gestion du Consentement aux Cookies - RGPD

## 📋 Vue d'ensemble

Ce système permet de gérer le consentement aux cookies conformément au RGPD. Il affiche une bannière de consentement lors de la première visite de l'utilisateur et mémorise son choix pour les visites suivantes.

## 🎯 Fonctionnalités

- ✅ Bannière de consentement élégante et non intrusive
- ✅ Mémorisation du choix de l'utilisateur (accepter/refuser)
- ✅ Vérification du consentement avant utilisation de cookies
- ✅ Hook personnalisé pour accéder au statut du consentement
- ✅ Animation fluide d'apparition/disparition
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Intégration avec le formulaire de contact

## 📁 Fichiers créés

### 1. **Composant CookieConsent**
- `components/CookieConsent.tsx` - Composant de bannière de consentement
- `components/CookieConsent.module.css` - Styles du composant

### 2. **Hook personnalisé**
- `hooks/useCookieConsent.ts` - Hook pour gérer le consentement

## 🚀 Utilisation

### Dans n'importe quelle page ou composant

```typescript
import { useCookieConsent, canUseCookies } from "@/hooks/useCookieConsent";

export default function MonComposant() {
    const cookieConsent = useCookieConsent();
    
    // Vérifier le statut du consentement
    if (cookieConsent.status === "accepted") {
        // L'utilisateur a accepté les cookies
    }
    
    if (cookieConsent.status === "refused") {
        // L'utilisateur a refusé les cookies
    }
    
    if (cookieConsent.status === "pending") {
        // L'utilisateur n'a pas encore fait de choix
    }
    
    // Vérifier avant d'utiliser des cookies
    if (canUseCookies()) {
        // OK pour utiliser des cookies
    }
}
```

### Exemple avec le formulaire de contact

Le formulaire de contact vérifie automatiquement le consentement avant l'envoi :

```typescript
const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Vérifier le consentement
    if (!canUseCookies()) {
        setStatus('error');
        setErrorMessage('Vous devez accepter les cookies...');
        return;
    }
    
    // Continuer avec l'envoi
};
```

## 🎨 Personnalisation

### Modifier l'apparence de la bannière

Éditez `components/CookieConsent.module.css` pour personnaliser :
- Les couleurs
- La position (actuellement en bas)
- Les animations
- Le responsive

### Modifier le texte de la bannière

Éditez `components/CookieConsent.tsx` :

```typescript
<p className={styles.description}>
    Ce site utilise des cookies uniquement pour...
</p>
```

## 💾 Stockage

Le consentement est stocké dans le `localStorage` :
- `cookieConsent` : "accepted" | "refused"
- `cookieConsentDate` : Date ISO du consentement

## 🔧 Fonctions utilitaires

### `useCookieConsent()`
Retourne un objet avec :
- `status`: "accepted" | "refused" | "pending"
- `date`: Date du consentement ou null

### `canUseCookies()`
Retourne `true` si l'utilisateur a accepté les cookies, `false` sinon.

### `resetConsent()`
Réinitialise le consentement (utile pour les tests).

```typescript
import { resetConsent } from "@/hooks/useCookieConsent";

// Pour tester à nouveau la bannière
resetConsent();
window.location.reload();
```

## 📱 Responsive Design

La bannière s'adapte automatiquement :
- **Desktop** : Bannière horizontale avec icône à gauche
- **Tablette** : Adaptation des espacements
- **Mobile** : Bannière verticale, boutons en colonne

## 🔒 Conformité RGPD

Le système respecte le RGPD en :
1. Demandant le consentement **avant** toute utilisation de cookies
2. Permettant de **refuser** les cookies
3. Expliquant clairement **l'usage** des cookies
4. Mémorisant le choix de l'utilisateur
5. Fournissant un lien vers la politique de confidentialité

## 🧪 Tests

Pour tester la bannière :

1. Ouvrez la console du navigateur
2. Exécutez : `localStorage.removeItem("cookieConsent")`
3. Rechargez la page
4. La bannière devrait réapparaître

## 📝 Améliorations futures possibles

- [ ] Gestion granulaire des cookies (cookies essentiels, analytiques, marketing)
- [ ] Panneau de préférences avancées
- [ ] Expiration automatique du consentement après X mois
- [ ] Export du consentement (preuve RGPD)
- [ ] Intégration avec Google Analytics conditionnelle

## 🆘 Support

Pour toute question ou problème, consultez la documentation Next.js ou contactez l'équipe de développement.
