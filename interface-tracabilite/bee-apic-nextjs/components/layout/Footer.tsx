import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* À propos */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-3xl">🐝</span>
                <h3 className="text-2xl font-bold text-gray-900">{siteConfig.name}</h3>
              </div>
              <p className="mb-3 text-lg font-medium text-secondary-600">{siteConfig.label}</p>
              <p className="mb-4 text-base font-semibold text-primary-600">{siteConfig.slogan}</p>
              <p className="max-w-md text-sm text-gray-600 leading-relaxed">
                Découvrez l'origine de votre miel avec notre système de traçabilité complet.
                Du rucher à votre table, suivez chaque étape de production.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-gray-900">Navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                    <span className="text-base">🏠</span>
                    <span className="group-hover:translate-x-1 transition-transform">Accueil</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tracabilite" className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                    <span className="text-base">🔍</span>
                    <span className="group-hover:translate-x-1 transition-transform">Traçabilité</span>
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600">
                    <span className="text-base">ℹ️</span>
                    <span className="group-hover:translate-x-1 transition-transform">À Propos</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-gray-900">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-base">📧</span>
                  <a href={`mailto:${siteConfig.company.email}`} className="hover:text-primary-600 transition-colors">
                    {siteConfig.company.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base">📞</span>
                  <a href={`tel:${siteConfig.company.phone}`} className="hover:text-primary-600 transition-colors">
                    {siteConfig.company.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base">📍</span>
                  <span className="whitespace-pre-line leading-relaxed">{siteConfig.company.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} {siteConfig.name}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Fait avec</span>
              <span className="text-red-500">❤️</span>
              <span>en Loire-Atlantique</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
