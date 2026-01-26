import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { paginatedResponse, errorResponse, getPaginationParams } from '@/lib/api-utils';

interface Params {
  params: Promise<{ category: string }>;
}

// GET /api/products/category/:category - Récupère les produits par catégorie
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(request.url);
    const { page, perPage, skip } = getPaginationParams(searchParams);

    // Filtre sur stock
    const inStock = searchParams.get('in_stock');

    const where: Record<string, unknown> = { category };
    if (inStock !== null) {
      where.inStock = inStock === 'true';
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { name: 'asc' },
      }),
      prisma.product.count({ where }),
    ]);

    return paginatedResponse(products, page, perPage, total);
  } catch (error) {
    console.error('Erreur GET /api/products/category/:category:', error);
    return errorResponse('Erreur lors de la récupération des produits par catégorie');
  }
}
