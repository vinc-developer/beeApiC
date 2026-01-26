import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { HoneyTypeUpdateInput } from '@/types';

interface Params {
  params: Promise<{ code: string }>;
}

// GET /api/honey-types/:code - Récupère un type de miel par son code
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { code } = await params;

    const honeyType = await prisma.honeyType.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!honeyType) {
      return errorResponse(`Type de miel avec le code "${code}" non trouvé`, 404);
    }

    return successResponse(honeyType);
  } catch (error) {
    console.error('Erreur GET /api/honey-types/:code:', error);
    return errorResponse('Erreur lors de la récupération du type de miel');
  }
}

// PUT /api/honey-types/:code - Met à jour un type de miel (PROTÉGÉ)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { code } = await params;
    const body: HoneyTypeUpdateInput = await request.json();

    const existing = await prisma.honeyType.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!existing) {
      return errorResponse(`Type de miel avec le code "${code}" non trouvé`, 404);
    }

    const honeyType = await prisma.honeyType.update({
      where: { code: code.toUpperCase() },
      data: {
        ...(body.code && { code: body.code }),
        ...(body.name && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
      },
    });

    return successResponse(honeyType, 'Type de miel mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/honey-types/:code:', error);
    return errorResponse('Erreur lors de la mise à jour du type de miel');
  }
}

// DELETE /api/honey-types/:code - Supprime un type de miel (PROTÉGÉ)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { code } = await params;

    const existing = await prisma.honeyType.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!existing) {
      return errorResponse(`Type de miel avec le code "${code}" non trouvé`, 404);
    }

    await prisma.honeyType.delete({
      where: { code: code.toUpperCase() },
    });

    return successResponse(null, 'Type de miel supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/honey-types/:code:', error);
    return errorResponse('Erreur lors de la suppression du type de miel');
  }
}
