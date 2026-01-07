import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* À propos */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{siteConfig.name}</h3>
            <p className="mb-2 text-sm text-gray-600">{siteConfig.label}</p>
            <p className="text-sm font-medium text-primary-600">{siteConfig.slogan}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/tracabilite" className="text-sm text-gray-600 hover:text-primary-600">
                  Traçabilité
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm text-gray-600 hover:text-primary-600">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <a href={`mailto:${siteConfig.company.email}`} className="hover:text-primary-600">
                  {siteConfig.company.email}
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <span>{siteConfig.company.phone}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span className="whitespace-pre-line">{siteConfig.company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} {siteConfig.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
