import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { loadBeekeeper } from '@/lib/api/tracabilite';

export default async function BeekeeperPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const beekeeper = await loadBeekeeper(code);

  if (!beekeeper) {
    notFound();
  }

  const isBeApiC = code === 'BA';
  const isPartner = beekeeper.partnerSince;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <Link
        href="/tracabilite"
        className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-primary-600"
      >
        ← Retour à la traçabilité
      </Link>

      {/* En-tête du profil */}
      <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Photo */}
          {beekeeper.photo && (
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={`/images/${beekeeper.photo}`}
                alt={`${beekeeper.firstName} ${beekeeper.lastName}`}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            {/* Badges */}
            <div className="mb-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {isBeApiC && (
                <span className="inline-block rounded bg-amber-500 px-3 py-1 text-sm font-semibold text-white">
                  Production Bee Api'C
                </span>
              )}
              {isPartner && (
                <span className="inline-block rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                  Partenaire Bee Api'C depuis {beekeeper.partnerSince}
                </span>
              )}
              <span className="inline-block rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {beekeeper.type}
              </span>
            </div>

            <h1 className="mb-2 text-3xl font-bold">
              {beekeeper.firstName} {beekeeper.lastName}
            </h1>
            {beekeeper.commercialName && (
              <p className="mb-2 text-xl text-gray-600">
                {beekeeper.commercialName}
              </p>
            )}
            {beekeeper.location && (
              <p className="text-gray-600">{beekeeper.location}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Biographie */}
        {beekeeper.bio && (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">À propos</h2>
            <p className="text-gray-600">{beekeeper.bio}</p>
          </div>
        )}

        {/* Exploitation */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Exploitation</h2>
          <div className="space-y-3">
            {beekeeper.hivesCount && (
              <div>
                <h3 className="font-semibold text-gray-700">Nombre de ruches</h3>
                <p className="text-gray-600">{beekeeper.hivesCount}</p>
              </div>
            )}
            {beekeeper.location && (
              <div>
                <h3 className="font-semibold text-gray-700">Localisation</h3>
                <p className="text-gray-600">{beekeeper.location}</p>
              </div>
            )}
            {beekeeper.distance && (
              <div>
                <h3 className="font-semibold text-gray-700">Distance</h3>
                <p className="text-gray-600">{beekeeper.distance}</p>
              </div>
            )}
            {beekeeper.beekeeperSince && (
              <div>
                <h3 className="font-semibold text-gray-700">Apiculteur depuis</h3>
                <p className="text-gray-600">{beekeeper.beekeeperSince}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Contact</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-700">Email</h3>
              <a
                href={`mailto:${beekeeper.email}`}
                className="text-primary-600 hover:underline"
              >
                {beekeeper.email}
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Téléphone</h3>
              <a
                href={`tel:${beekeeper.phone}`}
                className="text-primary-600 hover:underline"
              >
                {beekeeper.phone}
              </a>
            </div>
            {beekeeper.website && (
              <div>
                <h3 className="font-semibold text-gray-700">Site web</h3>
                <a
                  href={beekeeper.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  {beekeeper.website}
                </a>
              </div>
            )}
            {beekeeper.address && (
              <div>
                <h3 className="font-semibold text-gray-700">Adresse</h3>
                <p className="whitespace-pre-line text-gray-600">
                  {beekeeper.address}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Réseaux sociaux */}
        {beekeeper.socialMedia && (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Réseaux sociaux</h2>
            <div className="flex flex-wrap gap-3">
              {beekeeper.socialMedia.facebook && (
                <a
                  href={beekeeper.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Facebook
                </a>
              )}
              {beekeeper.socialMedia.instagram && (
                <a
                  href={beekeeper.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
                >
                  Instagram
                </a>
              )}
              {beekeeper.socialMedia.youtube && (
                <a
                  href={beekeeper.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Galerie */}
      {beekeeper.gallery && beekeeper.gallery.length > 0 && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Galerie</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {beekeeper.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={`/images/${image}`}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
