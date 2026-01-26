import { NextRequest } from 'next/server';
import { extractToken, verifyToken } from './auth';
import { JwtPayload } from '@/types';

export interface AuthenticatedRequest extends NextRequest {
  user?: JwtPayload;
}

// Middleware pour vérifier l'authentification
export function authenticate(request: NextRequest): {
  authenticated: boolean;
  user?: JwtPayload;
  error?: string;
} {
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);

  if (!token) {
    return {
      authenticated: false,
      error: 'Token manquant. Veuillez fournir un token dans le header Authorization.'
    };
  }

  const payload = verifyToken(token);

  if (!payload) {
    return {
      authenticated: false,
      error: 'Token invalide ou expiré.'
    };
  }

  return { authenticated: true, user: payload };
}

// Middleware pour vérifier le rôle (optionnel)
export function checkRole(user: JwtPayload, allowedRoles: string[]): boolean {
  return allowedRoles.includes(user.role);
}
