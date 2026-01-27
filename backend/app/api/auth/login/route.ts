import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { verifyPassword, generateToken } from '@/lib/auth';
import { UserLoginInput, AuthResponse } from '@/types';

// OPTIONS /api/auth/login - Gère les requêtes CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

// POST /api/auth/login - Connexion utilisateur
export async function POST(request: NextRequest) {
  try {
    const body: UserLoginInput = await request.json();

    // Validation
    if (!body.email || !body.password) {
      return errorResponse('Email et mot de passe requis', 400);
    }

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!user) {
      return errorResponse('Email ou mot de passe incorrect', 401);
    }

    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(body.password, user.password);

    if (!isPasswordValid) {
      return errorResponse('Email ou mot de passe incorrect', 401);
    }

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response: AuthResponse = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        role: user.role,
      },
      token,
    };

    return successResponse(response, 'Connexion réussie');
  } catch (error) {
    console.error('Erreur POST /api/auth/login:', error);
    return errorResponse('Erreur lors de la connexion');
  }
}
