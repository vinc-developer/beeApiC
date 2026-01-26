import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, paginatedResponse, getPaginationParams } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { HoneyTypeCreateInput } from '@/types';

// GET /api/honey-types - Liste tous les types de miel
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, perPage, skip } = getPaginationParams(searchParams);

    const [honeyTypes, total] = await Promise.all([
      prisma.honeyType.findMany({
        skip,
        take: perPage,
        orderBy: { name: 'asc' },
      }),
      prisma.honeyType.count(),
    ]);

    return paginatedResponse(honeyTypes, page, perPage, total);
  } catch (error) {
    console.error('Erreur GET /api/honey-types:', error);
    return errorResponse('Erreur lors de la récupération des types de miel');
  }
}

// POST /api/honey-types - Crée un nouveau type de miel (PROTÉGÉ)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const body: HoneyTypeCreateInput = await request.json();

    const existing = await prisma.honeyType.findUnique({
      where: { code: body.code },
    });

    if (existing) {
      return errorResponse(`Un type de miel avec le code "${body.code}" existe déjà`, 400);
    }

    const honeyType = await prisma.honeyType.create({
      data: {
        code: body.code,
        name: body.name,
        description: body.description,
      },
    });

    return successResponse(honeyType, 'Type de miel créé avec succès');
  } catch (error) {
    console.error('Erreur POST /api/honey-types:', error);
    return errorResponse('Erreur lors de la création du type de miel');
  }
}
