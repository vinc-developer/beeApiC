import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTraceability } from '@/lib/api/tracabilite';
import { extractHoneyType, formatDate } from '@/lib/utils';
import honeyTypesData from '@/data/honey-types.json';

export default async function LotDetailPage({
  params,
}: {
  params: Promise<{ lotNumber: string }>;
}) {
  const { lotNumber } = await params;

  let data;
  try {
    data = await getTraceability(lotNumber);
  } catch (error) {
    notFound();
  }

  if (!data) {
    notFound();
  }

  const honeyTypeCode = extractHoneyType(lotNumber);
  const honeyTypes = honeyTypesData?.honeyTypes as Record<string, any> || {};
  const honeyType = honeyTypeCode && honeyTypes[honeyTypeCode] ? honeyTypes[honeyTypeCode] : null;

  const isBeApiC = data.beekeeper?.code === 'BA';
  const isPartner = data.beekeeper?.partnerSince;

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <header className="mb-8 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-8 text-center shadow-md">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-5xl">🐝</span>
          <span className="text-3xl font-bold text-gray-900">Bee Api'C</span>
        </div>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Traçabilité du Miel</h1>
        <p className="text-lg text-gray-600">Don't Pannic, Bee Api'C !</p>
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
          Nouvelle recherche
        </Link>
      </div>

      {/* Section Résultats */}
      <div className="flex flex-col gap-8">
        {/* Informations du produit */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span className="text-2xl">🍯</span>
            Informations du produit
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Numéro de lot */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-600">Numéro de lot</span>
              <span className="text-lg font-semibold text-gray-900">{data.lotNumber}</span>
            </div>

            {/* Zone géographique */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-600">Zone géographique</span>
              <span className="text-lg font-semibold text-gray-900">{data.zone.publicName}</span>
            </div>

            {/* Type de miel */}
            {honeyType && (
              <div className="col-span-full flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Type de miel</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="inline-block w-fit rounded-lg border border-amber-200 bg-amber-100 px-4 py-2 text-base font-semibold text-amber-800">
                    {honeyType.name}
                  </span>
                  {honeyType.description && (
                    <span className="text-sm text-gray-600">{honeyType.description}</span>
                  )}
                </div>
              </div>
            )}

            {/* Environnement */}
            <div className="col-span-full flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-600">Environnement des ruches</span>
              <span className="text-lg font-semibold text-gray-900">{data.zone.environment}</span>
            </div>
          </div>
        </div>

        {/* Dates de production */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span className="text-2xl">📅</span>
            Dates de production
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Dates d'extraction */}
            <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-gradient-to-br from-amber-50 to-white p-6">
              <div className="text-5xl">🍯</div>
              <h3 className="text-lg font-bold text-gray-900">Date(s) d'extraction</h3>
              <div className="flex flex-col gap-2 text-center">
                {data.production.extractionDates.map((date, index) => (
                  <span key={index} className="text-base font-medium text-gray-700">
                    {formatDate(date)}
                  </span>
                ))}
              </div>
            </div>

            {/* Date de mise en pot */}
            <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-white p-6">
              <div className="text-5xl">🏺</div>
              <h3 className="text-lg font-bold text-gray-900">Date de mise en pot</h3>
              <span className="text-base font-medium text-gray-700">
                {formatDate(data.production.bottlingDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Informations apiculteur */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span className="text-2xl">👨‍🌾</span>
            Produit par l'apiculteur
          </h2>

          <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
            {/* Visual - Photo et Logo */}
            <div className="flex flex-col gap-4">
              {/* Photo */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200 shadow-md">
                {data.beekeeper?.photo ? (
                  <Image
                    src={`/images/${data.beekeeper.photo}`}
                    alt={`${data.beekeeper.firstName} ${data.beekeeper.lastName}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-6xl">👤</div>
                )}
              </div>

              {/* Logo */}
              {data.beekeeper?.logo && (
                <div className="flex min-h-[80px] items-center justify-center rounded-lg border border-gray-200 bg-white p-3">
                  <Image
                    src={`/images/${data.beekeeper.logo}`}
                    alt="Logo"
                    width={150}
                    height={80}
                    className="max-h-[80px] object-contain"
                  />
                </div>
              )}
            </div>

            {/* Détails */}
            <div className="flex flex-col gap-6">
              {/* Nom et badges */}
              <div className="flex flex-col gap-3">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
                    {data.beekeeper?.type}
                  </span>
                  {isBeApiC && (
                    <span className="badge-primary text-xs">
                      <span>🐝</span>
                      <span>Bee Api'C</span>
                    </span>
                  )}
                  {isPartner && (
                    <span className="badge-partner text-xs">
                      <span>🤝</span>
                      <span>Partenaire Bee Api'C depuis {data.beekeeper.partnerSince}</span>
                    </span>
                  )}
                </div>

                {/* Nom */}
                <h3 className="text-2xl font-bold text-gray-900">
                  {data.beekeeper?.firstName} {data.beekeeper?.lastName}
                </h3>
                {data.beekeeper?.commercialName && (
                  <p className="text-lg font-medium italic text-primary-600">
                    {data.beekeeper.commercialName}
                  </p>
                )}
              </div>

              {/* Informations de contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Adresse */}
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-xl">📍</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Adresse</span>
                    <span className="whitespace-pre-line text-sm text-gray-900">{data.beekeeper?.address}</span>
                  </div>
                </div>

                {/* Site web */}
                {data.beekeeper?.website && (
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-xl">🌐</span>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Site Web</span>
                      <a
                        href={data.beekeeper.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                      >
                        {data.beekeeper.website}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-xl">📧</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Email</span>
                    <a
                      href={`mailto:${data.beekeeper?.email}`}
                      className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                    >
                      {data.beekeeper?.email}
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-xl">📱</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">Téléphone</span>
                    <a
                      href={`tel:${data.beekeeper?.phone}`}
                      className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                    >
                      {data.beekeeper?.phone}
                    </a>
                  </div>
                </div>

                {/* SIRET */}
                <div className="flex gap-3 sm:col-span-2">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-xl">🏢</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">SIRET</span>
                    <span className="text-sm text-gray-900">{data.beekeeper?.siret}</span>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              {data.beekeeper?.socialMedia && Object.keys(data.beekeeper.socialMedia).some(key => data.beekeeper?.socialMedia?.[key as keyof typeof data.beekeeper.socialMedia]) && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-gray-900">Suivez-nous</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.beekeeper.socialMedia.facebook && (
                      <a
                        href={data.beekeeper.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                      >
                        <span>📘</span>
                        Facebook
                      </a>
                    )}
                    {data.beekeeper.socialMedia.instagram && (
                      <a
                        href={data.beekeeper.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-md"
                      >
                        <span>📷</span>
                        Instagram
                      </a>
                    )}
                    {data.beekeeper.socialMedia.youtube && (
                      <a
                        href={data.beekeeper.socialMedia.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
                      >
                        <span>📹</span>
                        YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Bouton En savoir plus */}
              <div>
                <Link
                  href={`/apiculteur/${data.beekeeper?.code}`}
                  className="btn-primary inline-flex"
                >
                  <span>ℹ️</span>
                  En savoir plus sur l'apiculteur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
