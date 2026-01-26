import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, paginatedResponse, getPaginationParams } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { LotCreateInput } from '@/types';

// GET /api/lots - Liste tous les lots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, perPage, skip } = getPaginationParams(searchParams);

    // Filtres optionnels
    const beekeeperCode = searchParams.get('beekeeper_code');

    const where: Record<string, unknown> = {};
    if (beekeeperCode) {
      const beekeeper = await prisma.beekeeper.findUnique({
        where: { code: beekeeperCode.toUpperCase() },
      });
      if (beekeeper) {
        where.beekeeperId = beekeeper.id;
      }
    }

    const [lots, total] = await Promise.all([
      prisma.lot.findMany({
        where,
        skip,
        take: perPage,
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
        orderBy: { createdAt: 'desc' },
      }),
      prisma.lot.count({ where }),
    ]);

    // Transformer les données de production
    const transformedLots = lots.map((lot) => ({
      ...lot,
      production: lot.production
        ? {
            id: lot.production.id,
            datesRecolte: lot.production.datesRecolte as string[],
            datesExtractions: lot.production.datesExtractions as string[],
            datesConditionnement: lot.production.datesConditionnement as string[],
          }
        : null,
    }));

    return paginatedResponse(transformedLots, page, perPage, total);
  } catch (error) {
    console.error('Erreur GET /api/lots:', error);
    return errorResponse('Erreur lors de la récupération des lots');
  }
}

// POST /api/lots - Crée un nouveau lot (PROTÉGÉ)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const body: LotCreateInput = await request.json();

    // Vérifier que le numéro de lot n'existe pas déjà
    const existing = await prisma.lot.findUnique({
      where: { lotNumber: body.lotNumber },
    });

    if (existing) {
      return errorResponse(`Un lot avec le numéro "${body.lotNumber}" existe déjà`, 400);
    }

    // Récupérer l'apiculteur par son code
    const beekeeper = await prisma.beekeeper.findUnique({
      where: { code: body.beekeeperCode.toUpperCase() },
    });

    if (!beekeeper) {
      return errorResponse(`Apiculteur avec le code "${body.beekeeperCode}" non trouvé`, 400);
    }

    // Récupérer le type de miel si fourni
    let honeyTypeId: string | null = null;
    if (body.honeyTypeCode) {
      const honeyType = await prisma.honeyType.findUnique({
        where: { code: body.honeyTypeCode.toUpperCase() },
      });
      if (honeyType) {
        honeyTypeId = honeyType.id;
      }
    }

    const lot = await prisma.lot.create({
      data: {
        lotNumber: body.lotNumber,
        humidity: body.humidity,
        beekeeperId: beekeeper.id,
        honeyTypeId,
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

    return successResponse(transformedLot, 'Lot créé avec succès');
  } catch (error) {
    console.error('Erreur POST /api/lots:', error);
    return errorResponse('Erreur lors de la création du lot');
  }
}
