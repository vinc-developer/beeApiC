import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, paginatedResponse, getPaginationParams } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { BeekeeperCreateInput } from '@/types';

// OPTIONS /api/beekeepers - Gère les requêtes CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

// GET /api/beekeepers - Liste tous les apiculteurs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, perPage, skip } = getPaginationParams(searchParams);

    const [beekeepers, total] = await Promise.all([
      prisma.beekeeper.findMany({
        skip,
        take: perPage,
        include: {
          ruchers: true,
          gallery: true,
          socialMedia: true,
        },
        orderBy: { commercialName: 'asc' },
      }),
      prisma.beekeeper.count(),
    ]);

    // Transformer les données pour le format attendu
    const transformedBeekeepers = beekeepers.map((bk) => ({
      ...bk,
      ruchers: bk.ruchers.map((r) => r.name),
      gallery: bk.gallery.map((g) => g.imagePath),
    }));

    return paginatedResponse(transformedBeekeepers, page, perPage, total);
  } catch (error) {
    console.error('Erreur GET /api/beekeepers:', error);
    return errorResponse('Erreur lors de la récupération des apiculteurs');
  }
}

// POST /api/beekeepers - Crée un nouvel apiculteur (PROTÉGÉ)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const body: BeekeeperCreateInput = await request.json();

    // Vérifier que le code n'existe pas déjà
    const existing = await prisma.beekeeper.findUnique({
      where: { code: body.code },
    });

    if (existing) {
      return errorResponse(`Un apiculteur avec le code "${body.code}" existe déjà`, 400);
    }

    const beekeeper = await prisma.beekeeper.create({
      data: {
        code: body.code,
        useProxy: body.useProxy ?? false,
        type: body.type,
        partnerSince: body.partnerSince,
        firstName: body.firstName,
        lastName: body.lastName,
        commercialName: body.commercialName,
        address: body.address,
        email: body.email,
        phone: body.phone,
        website: body.website,
        webshop: body.webshop,
        siret: body.siret,
        photo: body.photo,
        logo: body.logo,
        bio: body.bio,
        hivesCount: body.hivesCount,
        location: body.location,
        distance: body.distance,
        beekeeperSince: body.beekeeperSince,
        ruchers: body.ruchers
          ? {
              create: body.ruchers.map((name) => ({ name })),
            }
          : undefined,
        gallery: body.gallery
          ? {
              create: body.gallery.map((imagePath) => ({ imagePath })),
            }
          : undefined,
        socialMedia: body.socialMedia
          ? {
              create: body.socialMedia,
            }
          : undefined,
      },
      include: {
        ruchers: true,
        gallery: true,
        socialMedia: true,
      },
    });

    // Transformer les données
    const transformedBeekeeper = {
      ...beekeeper,
      ruchers: beekeeper.ruchers.map((r) => r.name),
      gallery: beekeeper.gallery.map((g) => g.imagePath),
    };

    return successResponse(transformedBeekeeper, 'Apiculteur créé avec succès');
  } catch (error) {
    console.error('Erreur POST /api/beekeepers:', error);
    return errorResponse('Erreur lors de la création de l\'apiculteur');
  }
}
