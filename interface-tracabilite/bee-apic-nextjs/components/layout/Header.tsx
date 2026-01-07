import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo-beeapic.png"
            alt={siteConfig.name}
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-primary-600">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary-600"
          >
            Accueil
          </Link>
          <Link
            href="/tracabilite"
            className="text-sm font-medium transition-colors hover:text-primary-600"
          >
            Traçabilité
          </Link>
          <Link
            href="/a-propos"
            className="text-sm font-medium transition-colors hover:text-primary-600"
          >
            À Propos
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
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
    </header>
  );
}
