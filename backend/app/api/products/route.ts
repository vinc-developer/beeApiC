import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, paginatedResponse, getPaginationParams } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { ProductCreateInput } from '@/types';

// OPTIONS /api/products - Gère les requêtes CORS preflight
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

// GET /api/products - Liste tous les produits
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, perPage, skip } = getPaginationParams(searchParams);

    // Filtres optionnels
    const inStock = searchParams.get('in_stock');
    const category = searchParams.get('category');

    const where: Record<string, unknown> = {};
    if (inStock !== null) {
      where.inStock = inStock === 'true';
    }
    if (category) {
      where.category = category;
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
    console.error('Erreur GET /api/products:', error);
    return errorResponse('Erreur lors de la récupération des produits');
  }
}

// POST /api/products - Crée un nouveau produit (PROTÉGÉ)
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const body: ProductCreateInput = await request.json();

    const existing = await prisma.product.findUnique({
      where: { slug: body.slug },
    });

    if (existing) {
      return errorResponse(`Un produit avec le slug "${body.slug}" existe déjà`, 400);
    }

    const product = await prisma.product.create({
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        category: body.category,
        weight: body.weight,
        inStock: body.inStock ?? true,
        storeUrl: body.storeUrl,
      },
    });

    return successResponse(product, 'Produit créé avec succès');
  } catch (error) {
    console.error('Erreur POST /api/products:', error);
    return errorResponse('Erreur lors de la création du produit');
  }
}
