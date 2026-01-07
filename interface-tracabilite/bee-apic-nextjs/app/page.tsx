import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary-600">
          {siteConfig.name}
        </h1>
        <p className="mb-2 text-2xl text-gray-600">{siteConfig.slogan}</p>
        <p className="text-xl font-semibold text-secondary-600">
          🇫🇷 {siteConfig.label}
        </p>
      </section>

      {/* CTA Section */}
      <section className="mb-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        <Link
          href="/tracabilite"
          className="group rounded-lg border-2 border-primary-200 bg-white p-8 shadow-lg transition-all hover:border-primary-400 hover:shadow-xl"
        >
          <div className="text-center">
            <div className="mb-4 text-6xl">🍯</div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Traçabilité
            </h2>
            <p className="text-gray-600">
              Découvrez l'origine de votre pot de miel
            </p>
          </div>
        </Link>

        <Link
          href="/a-propos"
          className="group rounded-lg border-2 border-secondary-200 bg-white p-8 shadow-lg transition-all hover:border-secondary-400 hover:shadow-xl"
        >
          <div className="text-center">
            <div className="mb-4 text-6xl">🐝</div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Nos Apiculteurs
            </h2>
            <p className="text-gray-600">
              Rencontrez nos producteurs passionnés
            </p>
          </div>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <div className="mb-3 text-4xl">🇫🇷</div>
          <h3 className="mb-2 text-xl font-semibold">100% Local</h3>
          <p className="text-gray-600">Miel produit en Loire Atlantique</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <h3 className="mb-2 text-xl font-semibold">Traçabilité Totale</h3>
          <p className="text-gray-600">De la ruche à votre table</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <div className="mb-3 text-4xl">👨‍🌾</div>
          <h3 className="mb-2 text-xl font-semibold">
            Apiculteurs Passionnés
          </h3>
          <p className="text-gray-600">Producteurs engagés et qualifiés</p>
        </div>
      </section>
    </div>
  );
}
