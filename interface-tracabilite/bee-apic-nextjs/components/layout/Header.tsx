import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-100 bg-white/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3 transition-transform hover:scale-105">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-amber-100 to-amber-200 p-1 shadow-md">
              <Image
                src="/images/logo-beeapic.png"
                alt={siteConfig.name}
                width={48}
                height={48}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                {siteConfig.name}
              </span>
              <span className="text-xs text-gray-500">Don't Pannic, Bee Api'C !</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden items-center space-x-2 md:flex">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-amber-50 hover:text-primary-600"
            >
              <span className="flex items-center gap-2">
                <span>🏠</span>
                Accueil
              </span>
            </Link>
            <Link
              href="/tracabilite"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-amber-50 hover:text-primary-600"
            >
              <span className="flex items-center gap-2">
                <span>🔍</span>
                Traçabilité
              </span>
            </Link>
            <Link
              href="/a-propos"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-amber-50 hover:text-primary-600"
            >
              <span className="flex items-center gap-2">
                <span>ℹ️</span>
                À Propos
              </span>
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/tracabilite"
            className="hidden rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md active:scale-95 lg:inline-flex"
          >
            Tracer mon miel
          </Link>

          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
