import { MetadataRoute } from 'next';
import beekeepersData from "@/data/beekeepers.json";

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.bee-apic.com';
    const routes = [
        '',
        '/au-rucher',
        '/mon-apiculture',
        '/mes-miels',
        '/frelon-asiatique',
        '/essaims',
        '/documentation',
        '/entreprises-rse',
        '/ventes-ecoles',
        '/apiculteurs',
        '/tracabilite',
        '/apiculteur',
        '/contact',
        '/a-propos',
        '/mentions-legales'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const beekeepersArray = Object.values(beekeepersData.beekeepers);
    const apiculteursRoutes = beekeepersArray.map((api) => ({
       url: `${baseUrl}/apiculteur/${api.code}`,
       lastModified: new Date(),
       priority: 0.6,
    }));

    return [...routes, ...apiculteursRoutes];
}
