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
    <div className="container-custom py-8">
      {/* Header */}
      <header className="mb-8 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-8 text-center shadow-md">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-5xl">🐝</span>
          <span className="text-3xl font-bold text-gray-900">Bee Api'C</span>
        </div>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Portrait de l'Apiculteur</h1>
        <p className="text-lg text-gray-600">Découvrez qui produit votre miel</p>
      </header>

      {/* Bouton retour */}
      <div className="mb-8">
        <Link
          href="/tracabilite"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary-300 hover:bg-gray-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la traçabilité
        </Link>
      </div>

      {/* Section Profil */}
      <div className="flex flex-col gap-8">
        {/* Header Profil */}
        <div className="grid gap-8 rounded-xl bg-gradient-to-br from-amber-50 to-white p-8 shadow-lg lg:grid-cols-[300px_1fr]">
          {/* Visual */}
          <div className="flex flex-col gap-6">
            {/* Photo */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200 shadow-md">
              {beekeeper.photo ? (
                <Image
                  src={`/images/${beekeeper.photo}`}
                  alt={`${beekeeper.firstName} ${beekeeper.lastName}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl">👤</div>
              )}
            </div>

            {/* Logo */}
            {beekeeper.logo && (
              <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
                <Image
                  src={`/images/${beekeeper.logo}`}
                  alt="Logo"
                  width={200}
                  height={100}
                  className="max-h-[100px] object-contain"
                />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary-600">
                {beekeeper.type}
              </span>
              {isBeApiC && (
                <span className="badge-primary">
                  <span>🐝</span>
                  <span>Bee Api'C</span>
                </span>
              )}
              {isPartner && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1 text-sm font-semibold text-white shadow-md">
                  <span>🤝</span>
                  <span>Partenaire Bee Api'C</span>
                </span>
              )}
            </div>

            {/* Nom */}
            <h1 className="text-4xl font-bold text-gray-900">
              {beekeeper.firstName} {beekeeper.lastName}
            </h1>

            {/* Nom commercial */}
            {beekeeper.commercialName && (
              <p className="text-xl font-medium italic text-primary-600">
                {beekeeper.commercialName}
              </p>
            )}
          </div>
        </div>

        {/* Biographie */}
        {beekeeper.bio && (
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-gray-900">
              <span className="text-2xl">📖</span>
              À propos
            </h2>
            <div className="leading-relaxed text-gray-700">
              <p>{beekeeper.bio}</p>
            </div>
          </div>
        )}

        {/* Exploitation */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-gray-900">
            <span className="text-2xl">🏞️</span>
            Mon exploitation
          </h2>
          <div className="flex flex-col gap-4">
            {beekeeper.hivesCount && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="font-medium text-gray-700">Nombre de ruches</span>
                <span className="font-semibold text-primary-600">{beekeeper.hivesCount}</span>
              </div>
            )}
            {beekeeper.location && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="font-medium text-gray-700">Localisation</span>
                <span className="font-semibold text-primary-600">{beekeeper.location}</span>
              </div>
            )}
            {beekeeper.distance && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="font-medium text-gray-700">Distance depuis Nantes</span>
                <span className="font-semibold text-primary-600">{beekeeper.distance}</span>
              </div>
            )}
            {beekeeper.beekeeperSince && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="font-medium text-gray-700">Apiculteur depuis</span>
                <span className="font-semibold text-primary-600">{beekeeper.beekeeperSince}</span>
              </div>
            )}
          </div>
        </div>

        {/* Galerie */}
        {beekeeper.gallery && beekeeper.gallery.length > 0 && (
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-gray-900">
              <span className="text-2xl">📸</span>
              Galerie Photos
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {beekeeper.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm transition-transform hover:scale-105 hover:shadow-md"
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

        {/* Contact */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-gray-900">
            <span className="text-2xl">📞</span>
            Contact
          </h2>
          <div className="flex flex-col gap-6">
            {/* Adresse */}
            <div className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-2xl">📍</span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Adresse</span>
                <span className="whitespace-pre-line leading-relaxed text-gray-900">{beekeeper.address}</span>
              </div>
            </div>

            {/* Site web */}
            {beekeeper.website && (
              <div className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-2xl">🌐</span>
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Site Web</span>
                  <a
                    href={beekeeper.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                  >
                    {beekeeper.website}
                  </a>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-2xl">📧</span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Email</span>
                <a
                  href={`mailto:${beekeeper.email}`}
                  className="font-medium text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                >
                  {beekeeper.email}
                </a>
              </div>
            </div>

            {/* Téléphone */}
            <div className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-2xl">📱</span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Téléphone</span>
                <a
                  href={`tel:${beekeeper.phone}`}
                  className="font-medium text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                >
                  {beekeeper.phone}
                </a>
              </div>
            </div>

            {/* SIRET */}
            <div className="flex gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-2xl">🏢</span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">SIRET</span>
                <span className="text-gray-900">{beekeeper.siret}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        {beekeeper.socialMedia && Object.keys(beekeeper.socialMedia).some(key => beekeeper.socialMedia?.[key as keyof typeof beekeeper.socialMedia]) && (
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-4 text-2xl font-bold text-gray-900">
              <span className="text-2xl">🌐</span>
              Suivez-moi
            </h2>
            <div className="flex flex-wrap gap-4">
              {beekeeper.socialMedia.facebook && (
                <a
                  href={beekeeper.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md"
                >
                  <span>📘</span>
                  Facebook
                </a>
              )}
              {beekeeper.socialMedia.instagram && (
                <a
                  href={beekeeper.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-md"
                >
                  <span>📷</span>
                  Instagram
                </a>
              )}
              {beekeeper.socialMedia.youtube && (
                <a
                  href={beekeeper.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:bg-red-700 hover:shadow-md"
                >
                  <span>📹</span>
                  YouTube
                </a>
              )}
              {beekeeper.socialMedia.tiktok && (
                <a
                  href={beekeeper.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-md"
                >
                  <span>🎵</span>
                  TikTok
                </a>
              )}
              {beekeeper.socialMedia.linkedin && (
                <a
                  href={beekeeper.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-800 hover:shadow-md"
                >
                  <span>💼</span>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
