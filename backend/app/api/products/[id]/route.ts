import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { ProductUpdateInput } from '@/types';

interface Params {
  params: Promise<{ id: string }>;
}

// OPTIONS /api/products/:id
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

// GET /api/products/:id
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      return errorResponse(`Produit avec l'ID "${id}" non trouvé`, 404);
    }

    return successResponse(product);
  } catch (error) {
    console.error('Erreur GET /api/products/:id:', error);
    return errorResponse('Erreur lors de la récupération du produit');
  }
}

// PUT /api/products/:id
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;
    const body: ProductUpdateInput = await request.json();

    const existing = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return errorResponse(`Produit avec l'ID "${id}" non trouvé`, 404);
    }

    const product = await prisma.product.update({
      where: { id: id },
      data: {
        name: body.name ?? existing.name,
        description: body.description ?? existing.description,
        price: body.price ?? existing.price,
        image: body.image ?? existing.image,
        category: body.category ?? existing.category,
        weight: body.weight ?? existing.weight,
        inStock: body.inStock ?? existing.inStock,
        storeUrl: body.storeUrl ?? existing.storeUrl,
      },
    });

    return successResponse(product, 'Produit mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/products/:id:', error);
    return errorResponse('Erreur lors de la mise à jour du produit');
  }
}

// DELETE /api/products/:id
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;

    const existing = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return errorResponse(`Produit avec l'ID "${id}" non trouvé`, 404);
    }

    await prisma.product.delete({
      where: { id: id },
    });

    return successResponse(null, 'Produit supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/products/:id:', error);
    return errorResponse('Erreur lors de la suppression du produit');
  }
}
