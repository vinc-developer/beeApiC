import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bee Api'C - Backend API",
  description: "API Backend pour Bee Api'C - Traçabilité du miel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
