import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["miel", "traçabilité", "apiculture", "Loire-Atlantique", "local", "Bee Api'C"],
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
      <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo-Bee-Apic.png`} />
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
