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
  const honeyTypes = honeyTypesData.types as Record<string, any>;
  const honeyType = honeyTypeCode ? honeyTypes[honeyTypeCode] : null;

  const isBeApiC = data.beekeeper?.code === 'BA';
  const isPartner = data.beekeeper?.partnerSince;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <Link
        href="/tracabilite"
        className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-primary-600"
      >
        ← Nouvelle recherche
      </Link>

      {/* Numéro de lot */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Traçabilité</h1>
        <p className="text-xl text-gray-600">Lot N° {data.lotNumber}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Informations du produit */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Informations du Produit</h2>

          {honeyType && (
            <div className="mb-4">
              <span className="inline-block rounded bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                {honeyType.name}
              </span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">Zone de production</h3>
              <p className="text-gray-600">{data.zone.publicName}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Environnement</h3>
              <p className="text-gray-600">{data.zone.environment}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Dates d'extraction</h3>
              <ul className="text-gray-600">
                {data.production.extractionDates.map((date, index) => (
                  <li key={index}>• {formatDate(date)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Mise en pot</h3>
              <p className="text-gray-600">{formatDate(data.production.bottlingDate)}</p>
            </div>
          </div>
        </div>

        {/* Informations apiculteur */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Apiculteur</h2>

          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {isBeApiC && (
              <span className="inline-block rounded bg-amber-500 px-3 py-1 text-sm font-semibold text-white">
                Production Bee Api'C
              </span>
            )}
            {isPartner && (
              <span className="inline-block rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white">
                Partenaire Bee Api'C depuis {data.beekeeper.partnerSince}
              </span>
            )}
            <span className="inline-block rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {data.beekeeper?.type}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-gray-700">Nom</h3>
              <p className="text-gray-600">
                {data.beekeeper?.firstName} {data.beekeeper?.lastName}
              </p>
              {data.beekeeper?.commercialName && (
                <p className="text-sm text-gray-500">
                  {data.beekeeper.commercialName}
                </p>
              )}
            </div>

            {data.beekeeper?.location && (
              <div>
                <h3 className="font-semibold text-gray-700">Localisation</h3>
                <p className="text-gray-600">{data.beekeeper.location}</p>
              </div>
            )}

            {data.beekeeper?.email && (
              <div>
                <h3 className="font-semibold text-gray-700">Contact</h3>
                <p className="text-gray-600">{data.beekeeper.email}</p>
              </div>
            )}
          </div>

          {/* Bouton En savoir plus */}
          <Link
            href={`/apiculteur/${data.beekeeper?.code}`}
            className="mt-6 inline-block w-full rounded-lg bg-primary-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-500"
          >
            En savoir plus sur l'apiculteur
          </Link>
        </div>
      </div>
    </div>
  );
}
