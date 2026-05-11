"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const BREADCRUMB_MAP: Record<string, string> = {
  "/": "Accueil",
  "/boutique": "Boutique",
  "/favoris": "Mes favoris",
  "/messages": "Messages",
  "/profile": "Mon compte",
  "/profile/settings": "Paramètres",
  "/admin": "Administration",
  "/auth/login": "Connexion",
  "/auth/register": "Inscription",
  "/contact": "Contact",
  "/a-propos": "À propos",
  "/aide": "Aide",
  "/conditions": "Conditions",
  "/confidentialite": "Confidentialité",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Skip breadcrumb on home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Accueil", href: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    
    // Check if it's a dynamic route (like produit/[id])
    if (segment.match(/^\d+$/)) {
      breadcrumbs.push({ label: "Produit", href: currentPath });
    } else {
      const label = BREADCRUMB_MAP[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, href: currentPath });
    }
  }

  return (
    <nav className="breadcrumb" aria-label="Fil d'Ariane" style={{ padding: "1.5rem 2rem 0.5rem", maxWidth: "1240px", margin: "0 auto" }}>
      <ol style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", listStyle: "none", margin: 0, padding: 0 }}>
        {breadcrumbs.map((crumb, i) => (
          <li key={crumb.href} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {i === 0 ? (
              <Link href={crumb.href} style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.2s" }} className="breadcrumb-link">
                <Home size={14} /> {crumb.label}
              </Link>
            ) : (
              <>
                <ChevronRight size={12} style={{ color: "hsl(var(--border))" }} />
                {i === breadcrumbs.length - 1 ? (
                  <span style={{ color: "hsl(var(--foreground))", fontWeight: 600 }}>{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} style={{ color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.2s" }} className="breadcrumb-link">
                    {crumb.label}
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
      <style>{`
        .breadcrumb-link:hover { color: hsl(var(--primary)) !important; }
        @media (max-width: 768px) {
          .breadcrumb { padding: 1rem 1rem 0.5rem !important; }
          .breadcrumb ol { font-size: 0.8rem !important; }
        }
      `}</style>
    </nav>
  );
}
