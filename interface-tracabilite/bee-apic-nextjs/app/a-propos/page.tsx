import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function AProposPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-center">
          À Propos de {siteConfig.name}
        </h1>

        {/* Présentation */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Notre Mission</h2>
          <p className="mb-4 text-gray-600">
            {siteConfig.name} est une entreprise d'apiculture locale basée en
            Loire-Atlantique, dédiée à la production de miel 100% local et de
            qualité. Notre mission est de vous offrir un miel authentique,
            traçable de la ruche à votre table.
          </p>
          <p className="text-gray-600">
            Nous travaillons également en partenariat avec des apiculteurs
            locaux passionnés pour vous proposer une gamme variée de miels tout
            en maintenant nos exigences de qualité et de traçabilité.
          </p>
        </div>

        {/* Nos Valeurs */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-center">Nos Valeurs</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="mb-3 text-4xl">🌱</div>
              <h3 className="mb-2 text-xl font-semibold">Local</h3>
              <p className="text-sm text-gray-600">
                100% de notre miel est produit en Loire-Atlantique
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="mb-3 text-4xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold">Traçabilité</h3>
              <p className="text-sm text-gray-600">
                Chaque pot est traçable de la ruche à votre table
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="mb-3 text-4xl">❤️</div>
              <h3 className="mb-2 text-xl font-semibold">Passion</h3>
              <p className="text-sm text-gray-600">
                Des apiculteurs passionnés et engagés
              </p>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="mb-12 rounded-lg bg-amber-50 p-8 text-center">
          <div className="mb-4 text-5xl">🇫🇷</div>
          <h2 className="mb-2 text-2xl font-bold text-amber-800">
            {siteConfig.label}
          </h2>
          <p className="text-amber-700">
            Tous nos miels sont récoltés, extraits et mis en pot en
            Loire-Atlantique
          </p>
        </div>

        {/* Slogan */}
        <div className="mb-12 rounded-lg bg-primary-50 p-8 text-center">
          <h2 className="text-3xl font-bold text-primary-600">
            {siteConfig.slogan}
          </h2>
        </div>

        {/* Contact */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">
            Nous Contacter
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold text-gray-700">
                Informations
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-start">
                  <span className="mr-2">📧</span>
                  <a
                    href={`mailto:${siteConfig.company.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {siteConfig.company.email}
                  </a>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">📞</span>
                  <span>{siteConfig.company.phone}</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">🏢</span>
                  <span>SIRET: {siteConfig.company.siret}</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-gray-700">Adresse</h3>
              <p className="whitespace-pre-line text-sm text-gray-600">
                {siteConfig.company.address}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/tracabilite"
            className="inline-block rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-500"
          >
            Découvrez la traçabilité de votre miel
          </Link>
        </div>
      </div>
    </div>
  );
}
