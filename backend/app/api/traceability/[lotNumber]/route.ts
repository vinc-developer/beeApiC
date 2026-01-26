import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { TraceabilityResponse } from '@/types';

interface Params {
  params: Promise<{ lotNumber: string }>;
}

// GET /api/traceability/:lotNumber - Récupère les informations complètes de traçabilité
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { lotNumber } = await params;

    const lot = await prisma.lot.findUnique({
      where: { lotNumber: lotNumber.toUpperCase() },
      include: {
        beekeeper: {
          include: {
            ruchers: true,
            socialMedia: true,
          },
        },
        honeyType: true,
        zones: true,
        production: true,
      },
    });

    if (!lot) {
      return errorResponse(`Lot avec le numéro "${lotNumber}" non trouvé`, 404);
    }

    // Construire la réponse de traçabilité complète
    const traceabilityResponse: TraceabilityResponse = {
      lot: {
        id: lot.id,
        lotNumber: lot.lotNumber,
        humidity: lot.humidity || undefined,
        beekeeperId: lot.beekeeperId,
        honeyTypeId: lot.honeyTypeId || undefined,
        zones: lot.zones.map((z) => ({
          id: z.id,
          lieuxRucher: z.lieuxRucher,
          environnement: z.environnement || undefined,
        })),
        production: lot.production
          ? {
              id: lot.production.id,
              datesRecolte: lot.production.datesRecolte as string[],
              datesExtractions: lot.production.datesExtractions as string[],
              datesConditionnement: lot.production.datesConditionnement as string[],
            }
          : undefined,
        createdAt: lot.createdAt,
        updatedAt: lot.updatedAt,
      },
      beekeeper: {
        code: lot.beekeeper.code,
        firstName: lot.beekeeper.firstName,
        lastName: lot.beekeeper.lastName,
        commercialName: lot.beekeeper.commercialName,
        photo: lot.beekeeper.photo || undefined,
        logo: lot.beekeeper.logo || undefined,
        location: lot.beekeeper.location || undefined,
        website: lot.beekeeper.website || undefined,
        webshop: lot.beekeeper.webshop || undefined,
        socialMedia: lot.beekeeper.socialMedia
          ? {
              instagram: lot.beekeeper.socialMedia.instagram || undefined,
              facebook: lot.beekeeper.socialMedia.facebook || undefined,
              tiktok: lot.beekeeper.socialMedia.tiktok || undefined,
              youtube: lot.beekeeper.socialMedia.youtube || undefined,
              linkedin: lot.beekeeper.socialMedia.linkedin || undefined,
            }
          : undefined,
      },
      honeyType: lot.honeyType
        ? {
            code: lot.honeyType.code,
            name: lot.honeyType.name,
            description: lot.honeyType.description || undefined,
          }
        : undefined,
      zones: lot.zones.map((z) => ({
        id: z.id,
        lieuxRucher: z.lieuxRucher,
        environnement: z.environnement || undefined,
      })),
      production: lot.production
        ? {
            id: lot.production.id,
            datesRecolte: lot.production.datesRecolte as string[],
            datesExtractions: lot.production.datesExtractions as string[],
            datesConditionnement: lot.production.datesConditionnement as string[],
          }
        : undefined,
    };

    return successResponse(traceabilityResponse);
  } catch (error) {
    console.error('Erreur GET /api/traceability/:lotNumber:', error);
    return errorResponse('Erreur lors de la récupération des données de traçabilité');
  }
}
