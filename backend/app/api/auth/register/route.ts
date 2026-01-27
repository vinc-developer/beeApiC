import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { hashPassword, generateToken } from '@/lib/auth';
import { UserCreateInput, AuthResponse } from '@/types';
import {authenticate} from "@/lib/middleware";

// POST /api/auth/register - Créer un nouvel utilisateur
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const body: UserCreateInput = await request.json();

    // Validation
    if (!body.email || !body.password) {
      return errorResponse('Email et mot de passe requis', 400);
    }

    if (body.password.length < 6) {
      return errorResponse('Le mot de passe doit contenir au moins 6 caractères', 400);
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (existingUser) {
      return errorResponse('Cet email est déjà utilisé', 400);
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(body.password);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: body.email.toLowerCase(),
        password: hashedPassword,
        name: body.name,
        role: body.role || 'admin',
      },
    });

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

    return successResponse(response, 'Utilisateur créé avec succès');
  } catch (error) {
    console.error('Erreur POST /api/auth/register:', error);
    return errorResponse('Erreur lors de la création de l\'utilisateur');
  }
}
