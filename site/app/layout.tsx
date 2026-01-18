import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
      </body>
    </html>
  );
}
