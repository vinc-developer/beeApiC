import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

// Fonction utilitaire pour créer une réponse de succès
export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
}

// Fonction utilitaire pour créer une réponse d'erreur
export function errorResponse(error: string, status: number = 500): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

// Fonction pour paginer les résultats
export function paginatedResponse<T>(
  data: T[],
  page: number,
  perPage: number,
  total: number
) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  });
}

// Fonction pour parser les query params de pagination
export function getPaginationParams(searchParams: URLSearchParams): {
  page: number;
  perPage: number;
  skip: number;
} {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const perPage = Math.min(100, Math.max(1, parseInt(searchParams.get('per_page') || '25', 10)));
  const skip = (page - 1) * perPage;

  return { page, perPage, skip };
}
