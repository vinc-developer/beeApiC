import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { LotUpdateInput } from '@/types';

interface Params {
  params: Promise<{ lotNumber: string }>;
}

// GET /api/lots/:lotNumber - Récupère un lot par son numéro
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { lotNumber } = await params;

    const lot = await prisma.lot.findUnique({
      where: { lotNumber: lotNumber.toUpperCase() },
      include: {
        beekeeper: {
          select: {
            id: true,
            code: true,
            firstName: true,
            lastName: true,
            commercialName: true,
            photo: true,
            logo: true,
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

    // Transformer les données
    const transformedLot = {
      ...lot,
      production: lot.production
        ? {
            id: lot.production.id,
            datesRecolte: lot.production.datesRecolte as string[],
            datesExtractions: lot.production.datesExtractions as string[],
            datesConditionnement: lot.production.datesConditionnement as string[],
          }
        : null,
    };

    return successResponse(transformedLot);
  } catch (error) {
    console.error('Erreur GET /api/lots/:lotNumber:', error);
    return errorResponse('Erreur lors de la récupération du lot');
  }
}

// PUT /api/lots/:lotNumber - Met à jour un lot (PROTÉGÉ)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { lotNumber } = await params;
    const body: LotUpdateInput = await request.json();

    const existing = await prisma.lot.findUnique({
      where: { lotNumber: lotNumber.toUpperCase() },
    });

    if (!existing) {
      return errorResponse(`Lot avec le numéro "${lotNumber}" non trouvé`, 404);
    }

    // Supprimer les anciennes zones si de nouvelles sont fournies
    if (body.zones) {
      await prisma.lotZone.deleteMany({ where: { lotId: existing.id } });
    }

    // Supprimer l'ancienne production si nouvelle fournie
    if (body.production) {
      await prisma.lotProduction.deleteMany({ where: { lotId: existing.id } });
    }

    // Récupérer le nouveau type de miel si fourni
    let honeyTypeId: string | null | undefined = undefined;
    if (body.honeyTypeCode !== undefined) {
      if (body.honeyTypeCode) {
        const honeyType = await prisma.honeyType.findUnique({
          where: { code: body.honeyTypeCode.toUpperCase() },
        });
        honeyTypeId = honeyType?.id || null;
      } else {
        honeyTypeId = null;
      }
    }

    const lot = await prisma.lot.update({
      where: { lotNumber: lotNumber.toUpperCase() },
      data: {
        ...(body.lotNumber && { lotNumber: body.lotNumber }),
        ...(body.humidity !== undefined && { humidity: body.humidity }),
        ...(honeyTypeId !== undefined && { honeyTypeId }),
        zones: body.zones
          ? {
              create: body.zones.map((zone) => ({
                lieuxRucher: zone.lieuxRucher,
                environnement: zone.environnement,
              })),
            }
          : undefined,
        production: body.production
          ? {
              create: {
                datesRecolte: body.production.datesRecolte || [],
                datesExtractions: body.production.datesExtractions || [],
                datesConditionnement: body.production.datesConditionnement || [],
              },
            }
          : undefined,
      },
      include: {
        beekeeper: {
          select: {
            id: true,
            code: true,
            firstName: true,
            lastName: true,
            commercialName: true,
            photo: true,
            logo: true,
          },
        },
        honeyType: true,
        zones: true,
        production: true,
      },
    });

    const transformedLot = {
      ...lot,
      production: lot.production
        ? {
            id: lot.production.id,
            datesRecolte: lot.production.datesRecolte as string[],
            datesExtractions: lot.production.datesExtractions as string[],
            datesConditionnement: lot.production.datesConditionnement as string[],
          }
        : null,
    };

    return successResponse(transformedLot, 'Lot mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/lots/:lotNumber:', error);
    return errorResponse('Erreur lors de la mise à jour du lot');
  }
}

// DELETE /api/lots/:lotNumber - Supprime un lot (PROTÉGÉ)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { lotNumber } = await params;

    const existing = await prisma.lot.findUnique({
      where: { lotNumber: lotNumber.toUpperCase() },
    });

    if (!existing) {
      return errorResponse(`Lot avec le numéro "${lotNumber}" non trouvé`, 404);
    }

    await prisma.lot.delete({
      where: { lotNumber: lotNumber.toUpperCase() },
    });

    return successResponse(null, 'Lot supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/lots/:lotNumber:', error);
    return errorResponse('Erreur lors de la suppression du lot');
  }
}
