import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero relative">
        <div className="container-custom relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-md backdrop-blur-sm">
              <span className="text-2xl">🐝</span>
              <span className="text-sm font-semibold text-gray-700">
                Miel 100% Local de Loire Atlantique
              </span>
            </div>

            <h1 className="mb-6 text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
              <span className="text-gradient">{siteConfig.name}</span>
            </h1>

            <p className="mb-8 text-2xl font-medium text-gray-700 md:text-3xl">
              {siteConfig.slogan}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/tracabilite"
                className="btn-primary text-lg"
              >
                🔍 Tracer mon miel
              </Link>
              <Link
                href="/a-propos"
                className="rounded-lg border-2 border-white bg-white/50 px-6 py-3 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
      </section>

      <div className="container-custom">
        {/* Section Maison Mère */}
        <section className="section">
          <div className="company-card">
            {/* Header */}
            <div className="company-header">
              <span className="text-4xl">🏢</span>
              <h2 className="text-3xl font-bold text-gray-900">Bee Api'C</h2>
              <span className="company-badge">Entreprise Locale</span>
            </div>

            {/* Content */}
            <div className="company-content">
              {/* Info */}
              <div className="company-info">
                <p className="company-description">
                  Bee Api'C est une entreprise familiale engagée dans la promotion du miel 100% local de Loire-Atlantique.
                  Nous travaillons en étroite collaboration avec des apiculteurs passionnés pour vous offrir un miel de qualité,
                  traçable et respectueux de l'environnement.
                </p>

                <div className="company-label">
                  <span className="text-2xl">🇫🇷</span>
                  <span className="font-semibold text-lg text-secondary-600">
                    {siteConfig.label}
                  </span>
                </div>
              </div>

              {/* Contact */}
              <div className="company-contact">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Nous contacter</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">Adresse</span>
                      <span className="text-gray-900 whitespace-pre-line">{siteConfig.company.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xl">🌐</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">Site Web</span>
                      <a
                        href={siteConfig.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        bee-apic.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xl">📧</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">Email</span>
                      <a
                        href={`mailto:${siteConfig.company.email}`}
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {siteConfig.company.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xl">📱</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">Téléphone</span>
                      <a
                        href={`tel:${siteConfig.company.phone}`}
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {siteConfig.company.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Découvrez l'origine de votre miel
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {/* Traçabilité */}
            <Link
              href="/tracabilite"
              className="group relative overflow-hidden rounded-2xl border-2 border-primary-200 bg-white p-10 shadow-lg transition-all duration-300 hover:border-primary-400 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-amber-100 opacity-50 blur-3xl transition-all duration-300 group-hover:scale-150"></div>

              <div className="relative text-center">
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-5xl shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  🍯
                </div>

                <h3 className="mb-3 text-3xl font-bold text-gray-900">
                  Traçabilité
                </h3>

                <p className="mb-4 text-lg text-gray-600">
                  Découvrez l'origine de votre pot de miel en quelques secondes
                </p>

                <div className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Rechercher maintenant</span>
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Nos Apiculteurs */}
            <Link
              href="/a-propos"
              className="group relative overflow-hidden rounded-2xl border-2 border-secondary-200 bg-white p-10 shadow-lg transition-all duration-300 hover:border-secondary-400 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-100 opacity-50 blur-3xl transition-all duration-300 group-hover:scale-150"></div>

              <div className="relative text-center">
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 text-5xl shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  🐝
                </div>

                <h3 className="mb-3 text-3xl font-bold text-gray-900">
                  Nos Apiculteurs
                </h3>

                <p className="mb-4 text-lg text-gray-600">
                  Rencontrez nos producteurs passionnés et découvrez leur travail
                </p>

                <div className="inline-flex items-center gap-2 text-secondary-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Découvrir</span>
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="section bg-gradient-to-b from-gray-50 to-white -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
          <div className="container-custom">
            <h2 className="mb-4 text-center text-4xl font-bold">
              Pourquoi choisir Bee Api'C ?
            </h2>
            <p className="mb-12 text-center text-lg text-gray-600">
              Une démarche de qualité et de transparence
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group rounded-xl bg-white/80 p-8 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                  🇫🇷
                </div>
                <h3 className="mb-3 text-2xl font-bold">100% Local</h3>
                <p className="text-gray-600 leading-relaxed">
                  Miel produit et récolté exclusivement en Loire Atlantique
                </p>
              </div>

              <div className="group rounded-xl bg-white/80 p-8 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                  🔍
                </div>
                <h3 className="mb-3 text-2xl font-bold">Traçabilité Totale</h3>
                <p className="text-gray-600 leading-relaxed">
                  Suivez le parcours de votre miel de la ruche à votre table
                </p>
              </div>

              <div className="group rounded-xl bg-white/80 p-8 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                  👨‍🌾
                </div>
                <h3 className="mb-3 text-2xl font-bold">Apiculteurs Passionnés</h3>
                <p className="text-gray-600 leading-relaxed">
                  Des producteurs engagés et qualifiés pour un miel d'exception
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
