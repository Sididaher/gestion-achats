"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    "block px-4 py-2 text-sm rounded " +
    (pathname === href
      ? "bg-blue-600 text-white"
      : "text-gray-800 hover:bg-gray-100");

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 border-r p-4 space-y-4">
        <h2 className="text-lg font-bold">Gestion des achats</h2>
        <nav className="space-y-1">
          <Link
            href="/dashboard/fournisseurs"
            className={linkClass("/dashboard/fournisseurs")}
          >
            Fournisseurs
          </Link>
          <Link
            href="/dashboard/produits"
            className={linkClass("/dashboard/produits")}
          >
            Produits
          </Link>
        </nav>
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
