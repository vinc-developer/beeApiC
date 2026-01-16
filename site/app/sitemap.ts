import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.bee-apic.fr',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.fr/recuperation-essaims',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.fr/producteur-de-miel',
            lastModified: new Date(),
        },
    ];
}
