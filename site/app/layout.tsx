import type { Metadata } from "next";
import 'leaflet/dist/leaflet.css'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vinc-developer.github.io/beeApiC/'),
  title: {
    default: "Apiculteur local – Miel du Pays de Retz",
    template: "%s | Bee Api’C",
  },
  description:
      "Apiculteur local en Loire-Atlantique. Production et vente directe de miel artisanal du Pays de Retz, hydromel et produits apicoles entre Nantes et Pornic.",
  keywords: [
    "apiculteur",
    "apiculteur local",
    "miel pays de retz",
    "miel loire atlantique",
    "vente directe miel",
    "producteur de miel",
    "miel artisanal",
    "pornic",
    "nantes",
  ],
  openGraph: {
    title: "Bee Api’C | Apiculteur local en Loire-Atlantique",
    description: "Production et vente directe de miel artisanal du Pays de Retz, hydromel et produits apicoles entre Nantes et Pornic.",
    url: './',
    siteName: 'Bee Api’C',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/pages/apiculture/abeilles-ruches-wallpaper.jpg',
        width: 1200,
        height: 630,
        alt: 'Logo Bee Api’C - Apiculture locale',
      },
    ],
  },
  // 3. Configuration Twitter
  twitter: {
    card: 'summary_large_image',
    title: "Bee Api’C | Miel artisanal du Pays de Retz",
    description: "Miel local, hydromel et sauvetage d'essaims. Directement du producteur au consommateur.",
    images: ['/images/pages/apiculture/abeilles-ruches-wallpaper.jpg'],
  },
};

export const dynamic = "force-static";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
    <head>
      <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/bee-apic/logo-bee-apic.png`} />
    </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
