# Composant ImageGallery

Composant de galerie photo avec lightbox (visualisation en grand) pour le site Bee Api'C.

## Fonctionnalités

✅ **Affichage en grille responsive** : s'adapte automatiquement à la taille de l'écran  
✅ **Lightbox interactif** : cliquez sur une image pour la voir en grand  
✅ **Navigation** : boutons précédent/suivant dans le lightbox  
✅ **Clavier** : `←` `→` pour naviguer, `Échap` pour fermer  
✅ **Animations fluides** : transitions et effets hover  
✅ **Accessibilité** : support clavier et ARIA labels  
✅ **Compteur** : affiche la position dans la galerie (ex: 3/12)

## Utilisation

```tsx
import ImageGallery from "@/components/gallery/ImageGallery";

<ImageGallery
  images={[
    {
      src: "/images/photo1.jpg",
      alt: "Description de la photo 1"
    },
    {
      src: "/images/photo2.jpg",
      alt: "Description de la photo 2"
    }
  ]}
/>
```

## Props

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `images` | `Array<{src: string, alt: string}>` | ✅ | Tableau des images à afficher |

## Pages utilisant ce composant

- **Page d'accueil** (`app/page.tsx`) : Section "La vie autour de la ruche"
- **Page Au Rucher** (`app/au-rucher/page.tsx`) : Section "Au cœur de mes ruchers"
- **Page Apiculteur** (`app/apiculteur/[code]/page.tsx`) : Section "Galerie Photos"

## Styles harmonisés

Le composant utilise les variables CSS du site pour garantir une cohérence visuelle :
- Font-sizes standardisés (`--font-size-*`)
- Transitions fluides
- Responsive adapté aux mobiles, tablettes et desktop

