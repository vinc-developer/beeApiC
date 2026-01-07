import { notFound } from 'next/navigation';
import Link from 'next/link';
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
    <div className="container-custom py-12">
      {/* Bouton retour */}
      <Link
        href="/tracabilite"
        className="mb-8 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-primary-300"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Nouvelle recherche
      </Link>

      {/* En-tête */}
      <div className="mb-8 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-8 shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900">Traçabilité du Miel</h1>
            <p className="flex items-center gap-2 text-2xl font-semibold text-primary-600">
              <span>🍯</span>
              Lot N° {data.lotNumber}
            </p>
          </div>
          {honeyType && (
            <div className="badge-honey text-base">
              {honeyType.name}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">{/* ...existing code for product and beekeeper info... */}
        {/* Informations du produit */}
        <div className="card">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span className="text-3xl">📦</span>
            Informations du Produit
          </h2>

          <div className="space-y-5">
            <div className="rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                <span>🌍</span>
                Zone de production
              </h3>
              <p className="text-lg font-medium text-gray-900">{data.zone.publicName}</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                <span>🌳</span>
                Environnement
              </h3>
              <p className="text-lg font-medium text-gray-900">{data.zone.environment}</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                <span>📅</span>
                Dates d'extraction
              </h3>
              <ul className="space-y-2">
                {data.production.extractionDates.map((date, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-primary-600">•</span>
                    <span className="font-medium">{formatDate(date)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                <span>🏺</span>
                Mise en pot
              </h3>
              <p className="text-lg font-medium text-gray-900">{formatDate(data.production.bottlingDate)}</p>
            </div>
          </div>
        </div>

        {/* Informations apiculteur */}
        <div className="card">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span className="text-3xl">👨‍🌾</span>
            Apiculteur
          </h2>

          {/* Badges */}
          <div className="mb-6 flex flex-wrap gap-2">
            {isBeApiC && (
              <span className="badge-primary">
                <span>⭐</span>
                Production Bee Api'C
              </span>
            )}
            {isPartner && (
              <span className="badge-partner">
                <span>🤝</span>
                Partenaire Bee Api'C depuis {data.beekeeper.partnerSince}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
              <span>👤</span>
              {data.beekeeper?.type}
            </span>
          </div>

          <div className="space-y-5">
            <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                <span>👤</span>
                Identité
              </h3>
              <p className="text-lg font-bold text-gray-900">
                {data.beekeeper?.firstName} {data.beekeeper?.lastName}
              </p>
              {data.beekeeper?.commercialName && (
                <p className="mt-1 text-sm font-medium text-primary-600">
                  {data.beekeeper.commercialName}
                </p>
              )}
            </div>

            {data.beekeeper?.location && (
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                  <span>📍</span>
                  Localisation
                </h3>
                <p className="font-medium text-gray-900">{data.beekeeper.location}</p>
              </div>
            )}

            {data.beekeeper?.email && (
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                  <span>📧</span>
                  Contact
                </h3>
                <a
                  href={`mailto:${data.beekeeper.email}`}
                  className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {data.beekeeper.email}
                </a>
              </div>
            )}
          </div>

          {/* Bouton En savoir plus */}
          <Link
            href={`/apiculteur/${data.beekeeper?.code}`}
            className="btn-primary mt-6 w-full"
          >
            <span>👁️</span>
            En savoir plus sur l'apiculteur
          </Link>
        </div>
      </div>
    </div>
  );
}
