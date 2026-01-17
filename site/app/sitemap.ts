import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.bee-apic.com',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/recuperation-essaims',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/producteur-de-miel',
            lastModified: new Date(),
        },
    ];
}
