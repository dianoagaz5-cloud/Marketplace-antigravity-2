"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function VendreLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Si nous ne sommes pas sur la page racine /vendre (qui présente les avantages)
    // mais sur une sous-page de publication (/vendre/produit, /vendre/service, etc.)
    const isSubPage = pathname !== "/vendre";

    if (!loading) {
      if (isSubPage && !user) {
        // Rediriger vers login avec une redirection vers la page actuelle après connexion
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, pathname, router]);

  if (loading || (pathname !== "/vendre" && !user && !authorized)) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: "40px", height: "40px", border: "3px solid hsl(var(--muted))", 
            borderTopColor: "hsl(var(--primary))", borderRadius: "50%", 
            animation: "spin 1s linear infinite", margin: "0 auto 1rem" 
          }} />
          <p style={{ color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>Vérification de votre compte...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}
