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
            url: 'https://www.bee-apic.com/au-rucher',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/mon-apiculture',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/mes-miels',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/frelon-asiatique',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/essaims',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/documentation',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/entreprises-rse',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/apiculteurs',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/tracabilite',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/apiculteur',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/contact',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/a-propos',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bee-apic.com/mentions-legales',
            lastModified: new Date(),
        },
    ];
}
