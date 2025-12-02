import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./QueryProvider";

export const metadata: Metadata = {
  title: "Project Achats",
  description: "Gestion des fournisseurs, produits et achats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
