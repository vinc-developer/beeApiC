import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { BeekeeperUpdateInput } from '@/types';

interface Params {
  params: Promise<{ code: string }>;
}

// GET /api/beekeepers/:code - Récupère un apiculteur par son code
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { code } = await params;

    const beekeeper = await prisma.beekeeper.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        ruchers: true,
        gallery: true,
        socialMedia: true,
      },
    });

    if (!beekeeper) {
      return errorResponse(`Apiculteur avec le code "${code}" non trouvé`, 404);
    }

    // Transformer les données
    const transformedBeekeeper = {
      ...beekeeper,
      ruchers: beekeeper.ruchers.map((r) => r.name),
      gallery: beekeeper.gallery.map((g) => g.imagePath),
    };

    return successResponse(transformedBeekeeper);
  } catch (error) {
    console.error('Erreur GET /api/beekeepers/:code:', error);
    return errorResponse('Erreur lors de la récupération de l\'apiculteur');
  }
}

// PUT /api/beekeepers/:code - Met à jour un apiculteur (PROTÉGÉ)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { code } = await params;
    const body: BeekeeperUpdateInput = await request.json();

    const existing = await prisma.beekeeper.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!existing) {
      return errorResponse(`Apiculteur avec le code "${code}" non trouvé`, 404);
    }

    // Supprimer les anciennes relations si de nouvelles sont fournies
    if (body.ruchers) {
      await prisma.rucher.deleteMany({ where: { beekeeperId: existing.id } });
    }
    if (body.gallery) {
      await prisma.beekeeperGallery.deleteMany({ where: { beekeeperId: existing.id } });
    }
    if (body.socialMedia) {
      await prisma.socialMedia.deleteMany({ where: { beekeeperId: existing.id } });
    }

    const beekeeper = await prisma.beekeeper.update({
      where: { code: code.toUpperCase() },
      data: {
        ...(body.code && { code: body.code }),
        ...(body.useProxy !== undefined && { useProxy: body.useProxy }),
        ...(body.type && { type: body.type }),
        ...(body.partnerSince !== undefined && { partnerSince: body.partnerSince }),
        ...(body.firstName && { firstName: body.firstName }),
        ...(body.lastName && { lastName: body.lastName }),
        ...(body.commercialName && { commercialName: body.commercialName }),
        ...(body.address && { address: body.address }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.website !== undefined && { website: body.website }),
        ...(body.webshop !== undefined && { webshop: body.webshop }),
        ...(body.siret !== undefined && { siret: body.siret }),
        ...(body.photo !== undefined && { photo: body.photo }),
        ...(body.logo !== undefined && { logo: body.logo }),
        ...(body.bio !== undefined && { bio: body.bio }),
        ...(body.hivesCount !== undefined && { hivesCount: body.hivesCount }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.distance !== undefined && { distance: body.distance }),
        ...(body.beekeeperSince !== undefined && { beekeeperSince: body.beekeeperSince }),
        ruchers: body.ruchers
          ? { create: body.ruchers.map((name) => ({ name })) }
          : undefined,
        gallery: body.gallery
          ? { create: body.gallery.map((imagePath) => ({ imagePath })) }
          : undefined,
        socialMedia: body.socialMedia
          ? { create: body.socialMedia }
          : undefined,
      },
      include: {
        ruchers: true,
        gallery: true,
        socialMedia: true,
      },
    });

    const transformedBeekeeper = {
      ...beekeeper,
      ruchers: beekeeper.ruchers.map((r) => r.name),
      gallery: beekeeper.gallery.map((g) => g.imagePath),
    };

    return successResponse(transformedBeekeeper, 'Apiculteur mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/beekeepers/:code:', error);
    return errorResponse('Erreur lors de la mise à jour de l\'apiculteur');
  }
}

// DELETE /api/beekeepers/:code - Supprime un apiculteur (PROTÉGÉ)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Vérifier l'authentification
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { code } = await params;

    const existing = await prisma.beekeeper.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!existing) {
      return errorResponse(`Apiculteur avec le code "${code}" non trouvé`, 404);
    }

    await prisma.beekeeper.delete({
      where: { code: code.toUpperCase() },
    });

    return successResponse(null, 'Apiculteur supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/beekeepers/:code:', error);
    return errorResponse('Erreur lors de la suppression de l\'apiculteur');
  }
}
