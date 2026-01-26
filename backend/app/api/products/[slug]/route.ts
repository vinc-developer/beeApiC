import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { ProductUpdateInput } from '@/types';

interface Params {
  params: Promise<{ slug: string }>;
}

// GET /api/products/:slug - Récupère un produit par son slug
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return errorResponse(`Produit avec le slug "${slug}" non trouvé`, 404);
    }

    return successResponse(product);
  } catch (error) {
    console.error('Erreur GET /api/products/:slug:', error);
    return errorResponse('Erreur lors de la récupération du produit');
  }
}

// PUT /api/products/:slug - Met à jour un produit (PROTÉGÉ)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { slug } = await params;
    const body: ProductUpdateInput = await request.json();

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) {
      return errorResponse(`Produit avec le slug "${slug}" non trouvé`, 404);
    }

    const product = await prisma.product.update({
      where: { slug },
      data: {
        ...(body.slug && { slug: body.slug }),
        ...(body.name && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.category && { category: body.category }),
        ...(body.weight !== undefined && { weight: body.weight }),
        ...(body.inStock !== undefined && { inStock: body.inStock }),
        ...(body.storeUrl !== undefined && { storeUrl: body.storeUrl }),
      },
    });

    return successResponse(product, 'Produit mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/products/:slug:', error);
    return errorResponse('Erreur lors de la mise à jour du produit');
  }
}

// DELETE /api/products/:slug - Supprime un produit (PROTÉGÉ)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { slug } = await params;

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (!existing) {
      return errorResponse(`Produit avec le slug "${slug}" non trouvé`, 404);
    }

    await prisma.product.delete({
      where: { slug },
    });

    return successResponse(null, 'Produit supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/products/:slug:', error);
    return errorResponse('Erreur lors de la suppression du produit');
  }
}
