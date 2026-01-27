import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';

interface Params {
  params: Promise<{ id: string }>;
}

// OPTIONS /api/lots/:id
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

// GET /api/lots/:id
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const lot = await prisma.lot.findUnique({
      where: { id: id },
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
      return errorResponse(`Lot avec l'ID "${id}" non trouvé`, 404);
    }

    // Transformer les données de production
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
    console.error('Erreur GET /api/lots/:id:', error);
    return errorResponse('Erreur lors de la récupération du lot');
  }
}

// PUT /api/lots/:id
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.lot.findUnique({
      where: { id: id },
      include: {
        zones: true,
        production: true,
      },
    });

    if (!existing) {
      return errorResponse(`Lot avec l'ID "${id}" non trouvé`, 404);
    }

    // Supprimer les anciennes zones
    await prisma.lotZone.deleteMany({
      where: { lotId: id },
    });

    // Supprimer l'ancienne production si elle existe
    if (existing.production) {
      await prisma.lotProduction.delete({
        where: { lotId: id },
      });
    }

    // Mettre à jour le lot
    const lot = await prisma.lot.update({
      where: { id: id },
      data: {
        humidity: body.humidity,
        beekeeperId: body.beekeeperId,
        honeyTypeId: body.honeyTypeId || null,
        zones: body.zones && body.zones.length > 0
          ? {
              create: body.zones.map((zone: any) => ({
                lieuxRucher: zone.lieuxRucher,
                environnement: zone.environnement,
              })),
            }
          : undefined,
        production: body.datesRecolte || body.datesExtractions || body.datesConditionnement
          ? {
              create: {
                datesRecolte: body.datesRecolte || [],
                datesExtractions: body.datesExtractions || [],
                datesConditionnement: body.datesConditionnement || [],
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

    return successResponse(transformedLot, 'Lot mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/lots/:id:', error);
    return errorResponse('Erreur lors de la mise à jour du lot');
  }
}

// DELETE /api/lots/:id
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;

    const existing = await prisma.lot.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return errorResponse(`Lot avec l'ID "${id}" non trouvé`, 404);
    }

    // Supprimer les zones liées (cascade)
    await prisma.lotZone.deleteMany({
      where: { lotId: id },
    });

    // Supprimer la production liée si elle existe
    await prisma.lotProduction.deleteMany({
      where: { lotId: id },
    });

    // Supprimer le lot
    await prisma.lot.delete({
      where: { id: id },
    });

    return successResponse(null, 'Lot supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/lots/:id:', error);
    return errorResponse('Erreur lors de la suppression du lot');
  }
}
