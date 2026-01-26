import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';

// GET /api/auth/me - Récupère les informations de l'utilisateur connecté
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);

    if (!auth.authenticated || !auth.user) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    // Récupérer les informations complètes de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: auth.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return errorResponse('Utilisateur non trouvé', 404);
    }

    return successResponse(user);
  } catch (error) {
    console.error('Erreur GET /api/auth/me:', error);
    return errorResponse('Erreur lors de la récupération des informations utilisateur');
  }
}
