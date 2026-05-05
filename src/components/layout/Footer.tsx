import Link from "next/link";

const LINKS = {
  Acheter:  [
    { label: "Parcourir les produits", href: "/boutique" },
    { label: "Trouver un service", href: "/services" },
    { label: "Bibliothèque d'Ebooks", href: "/ebooks" },
    { label: "Nos vendeurs", href: "/vendeurs" },
  ],
  Vendre: [
    { label: "Vendre un produit", href: "/vendre/produit" },
    { label: "Proposer un service", href: "/vendre/service" },
    { label: "Publier un Ebook", href: "/vendre/ebook" },
    { label: "Mon Dashboard", href: "/dashboard" },
  ],
  Assistance: [
    { label: "À propos de nous", href: "/a-propos" },
    { label: "Nous contacter", href: "/contact" },
    { label: "Centre d'aide", href: "/aide" },
    { label: "Conditions générales", href: "/conditions" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border) / 0.6)", marginTop: "auto" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        
        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
          
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "1rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, hsl(var(--primary)), hsl(258 72% 38%))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "1rem" }}>M</div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>Market<span style={{ color: "hsl(var(--primary))" }}>Bénin</span></span>
            </Link>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.7, maxWidth: "280px" }}>
              La marketplace multi-vendeurs N°1 au Bénin. Produits physiques, services professionnels et ebooks numériques.
            </p>

            {/* Payment badges */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              {["MTN MoMo", "Moov Money", "Celtiis Cash"].map(p => (
                <span key={p} style={{ padding: "0.3rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--muted-foreground))" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "1.25rem", letterSpacing: "0.02em" }}>{title}</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", textDecoration: "none", transition: "color 0.15s" }} className="footer-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid hsl(var(--border) / 0.6)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>
            © {new Date().getFullYear()} MarketBénin. Tous droits réservés.
          </p>
          <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>
            Conçu avec ♥ pour le Bénin
          </p>
        </div>
      </div>

      <style>{`.footer-link:hover { color: hsl(var(--primary)); }`}</style>
    </footer>
  );
}
