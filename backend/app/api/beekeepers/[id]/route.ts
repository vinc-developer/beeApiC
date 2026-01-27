import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { authenticate } from '@/lib/middleware';
import { BeekeeperUpdateInput } from '@/types';

interface Params {
  params: Promise<{ id: string }>;
}

// OPTIONS /api/beekeepers/:id
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

// GET /api/beekeepers/:id
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const beekeeper = await prisma.beekeeper.findUnique({
      where: { id: id },
      include: {
        ruchers: true,
        gallery: true,
        socialMedia: true,
      },
    });

    if (!beekeeper) {
      return errorResponse(`Apiculteur avec l'ID "${id}" non trouvé`, 404);
    }

    // Transformer les données
    const transformedBeekeeper = {
      ...beekeeper,
      ruchers: beekeeper.ruchers.map((r) => r.name),
      gallery: beekeeper.gallery.map((g) => g.imagePath),
    };

    return successResponse(transformedBeekeeper);
  } catch (error) {
    console.error('Erreur GET /api/beekeepers/:id:', error);
    return errorResponse('Erreur lors de la récupération de l\'apiculteur');
  }
}

// PUT /api/beekeepers/:id
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;
    const body: BeekeeperUpdateInput = await request.json();

    const existing = await prisma.beekeeper.findUnique({
      where: { id: id },
      include: {
        ruchers: true,
        gallery: true,
        socialMedia: true,
      },
    });

    if (!existing) {
      return errorResponse(`Apiculteur avec l'ID "${id}" non trouvé`, 404);
    }

    // Supprimer les anciennes relations si nécessaire
    if (body.ruchers) {
      await prisma.rucher.deleteMany({
        where: { beekeeperId: id },
      });
    }

    if (body.gallery) {
      await prisma.beekeeperGallery.deleteMany({
        where: { beekeeperId: id },
      });
    }

    if (body.socialMedia !== undefined) {
      await prisma.socialMedia.deleteMany({
        where: { beekeeperId: id },
      });
    }

    // Mettre à jour l'apiculteur
    const beekeeper = await prisma.beekeeper.update({
      where: { id: id },
      data: {
        type: body.type ?? existing.type,
        partnerSince: body.partnerSince ?? existing.partnerSince,
        firstName: body.firstName ?? existing.firstName,
        lastName: body.lastName ?? existing.lastName,
        commercialName: body.commercialName ?? existing.commercialName,
        address: body.address ?? existing.address,
        email: body.email ?? existing.email,
        phone: body.phone ?? existing.phone,
        website: body.website ?? existing.website,
        webshop: body.webshop ?? existing.webshop,
        siret: body.siret ?? existing.siret,
        photo: body.photo ?? existing.photo,
        logo: body.logo ?? existing.logo,
        bio: body.bio ?? existing.bio,
        hivesCount: body.hivesCount ?? existing.hivesCount,
        location: body.location ?? existing.location,
        distance: body.distance ?? existing.distance,
        beekeeperSince: body.beekeeperSince ?? existing.beekeeperSince,
        ruchers: body.ruchers
          ? {
              create: body.ruchers.map((name) => ({ name })),
            }
          : undefined,
        gallery: body.gallery
          ? {
              create: body.gallery.map((imagePath) => ({ imagePath })),
            }
          : undefined,
        socialMedia: body.socialMedia
          ? {
              create: body.socialMedia,
            }
          : undefined,
      },
      include: {
        ruchers: true,
        gallery: true,
        socialMedia: true,
      },
    });

    // Transformer les données
    const transformedBeekeeper = {
      ...beekeeper,
      ruchers: beekeeper.ruchers.map((r) => r.name),
      gallery: beekeeper.gallery.map((g) => g.imagePath),
    };

    return successResponse(transformedBeekeeper, 'Apiculteur mis à jour avec succès');
  } catch (error) {
    console.error('Erreur PUT /api/beekeepers/:id:', error);
    return errorResponse('Erreur lors de la mise à jour de l\'apiculteur');
  }
}

// DELETE /api/beekeepers/:id
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const auth = authenticate(request);
    if (!auth.authenticated) {
      return errorResponse(auth.error || 'Non authentifié', 401);
    }

    const { id } = await params;

    const existing = await prisma.beekeeper.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return errorResponse(`Apiculteur avec l'ID "${id}" non trouvé`, 404);
    }

    // Supprimer les relations en cascade
    await prisma.rucher.deleteMany({
      where: { beekeeperId: id },
    });

    await prisma.beekeeperGallery.deleteMany({
      where: { beekeeperId: id },
    });

    await prisma.socialMedia.deleteMany({
      where: { beekeeperId: id },
    });

    // Supprimer l'apiculteur
    await prisma.beekeeper.delete({
      where: { id: id },
    });

    return successResponse(null, 'Apiculteur supprimé avec succès');
  } catch (error) {
    console.error('Erreur DELETE /api/beekeepers/:id:', error);
    return errorResponse('Erreur lors de la suppression de l\'apiculteur');
  }
}
