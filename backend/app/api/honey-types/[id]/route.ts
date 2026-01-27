import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { HoneyTypeUpdateInput } from '@/types';

interface Params {
  params: Promise<{ id: string }>;
}

// OPTIONS /api/honey-types/:id
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

// GET /api/honey-types/:id
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const honeyType = await prisma.honeyType.findUnique({
      where: { id: id },
    });

    if (!honeyType) {
      return errorResponse(`Type de miel avec l'ID "${id}" non trouvé`, 404);
    }

    return successResponse(honeyType);
  } catch (error) {
    console.error('Erreur GET /api/honey-types/:id:', error);
    return errorResponse('Erreur lors de la récupération du type de miel');
  }
}

// PUT /api/honey-types/:id
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;
    const body: HoneyTypeUpdateInput = await request.json();

    const existing = await prisma.honeyType.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return errorResponse(`Type de miel avec l'ID "${id}" non trouvé`, 404);
    }

    const honeyType = await prisma.honeyType.update({
      where: { id: id },
      data: {
        name: body.name ?? existing.name,
        description: body.description ?? existing.description,
      },
    });

    return successResponse(honeyType, 'Type de miel mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/honey-types/:id:', error);
    return errorResponse('Erreur lors de la mise à jour du type de miel');
  }
}

// DELETE /api/honey-types/:id
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;

    const existing = await prisma.honeyType.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return errorResponse(`Type de miel avec l'ID "${id}" non trouvé`, 404);
    }

    await prisma.honeyType.delete({
      where: { id: id },
    });

    return successResponse(null, 'Type de miel supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/honey-types/:id:', error);
    return errorResponse('Erreur lors de la suppression du type de miel');
  }
}
