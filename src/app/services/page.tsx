"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, ChevronDown, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

const SERVICES = [
  { id: 1, title: "Création site web vitrine ou e-commerce", vendor: "Dev Bénin Studio", vendorId: "dev-benin-studio", price: 150000, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80", cat: "it", rating: 4.9, reviews: 38, delivery: "7 jours" },
  { id: 2, title: "Logo & charte graphique complète", vendor: "Creative Hub Porto-Novo", vendorId: "creative-hub", price: 25000, img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80", cat: "design", rating: 4.8, reviews: 64, delivery: "3 jours" },
  { id: 3, title: "Dépannage PC & récupération de données", vendor: "TechFix Express", vendorId: "techfix", price: 10000, img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80", cat: "reparation", rating: 4.7, reviews: 22, delivery: "24h" },
  { id: 4, title: "Shooting photo produits professionnels", vendor: "Lens Cotonou", vendorId: "lens-cotonou", price: 45000, img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80", cat: "media", rating: 4.9, reviews: 17, delivery: "2 jours" },
  { id: 5, title: "Gestion des réseaux sociaux (1 mois)", vendor: "DigitalBJ Agency", vendorId: "digitalbj", price: 60000, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80", cat: "marketing", rating: 4.6, reviews: 29, delivery: "Mensuel" },
  { id: 6, title: "Traduction Français / Anglais (page)", vendor: "TranslateBJ", vendorId: "translatebj", price: 5000, img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80", cat: "redaction", rating: 4.8, reviews: 45, delivery: "48h" },
  { id: 7, title: "Application mobile React Native", vendor: "Dev Bénin Studio", vendorId: "dev-benin-studio", price: 350000, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80", cat: "it", rating: 5.0, reviews: 12, delivery: "30 jours" },
  { id: 8, title: "Vidéo promotionnelle 60 secondes", vendor: "Lens Cotonou", vendorId: "lens-cotonou", price: 75000, img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80", cat: "media", rating: 4.7, reviews: 20, delivery: "5 jours" },
];

const CATS = [
  { value: "all", label: "Tous" },
  { value: "it", label: "Dev & IT" },
  { value: "design", label: "Design" },
  { value: "reparation", label: "Réparation" },
  { value: "media", label: "Photo & Vidéo" },
  { value: "marketing", label: "Marketing" },
  { value: "redaction", label: "Rédaction" },
];

export default function ServicesPage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const { toggleFavorite, isFavorite } = useWishlist();

  const filtered = SERVICES.filter(s =>
    (cat === "all" || s.cat === cat) &&
    (search === "" || s.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "3rem 2rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Services</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.95rem" }}>Des experts certifiés au service de votre réussite</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: "1 1 280px", minWidth: "220px", background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", borderRadius: "var(--radius-full)", padding: "0.55rem 1rem" }}>
          <Search size={16} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un service..." style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "hsl(var(--foreground))", width: "100%", fontFamily: "inherit" }} />
        </div>
        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {CATS.map(c => (
            <button key={c.value} onClick={() => setCat(c.value)} style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", border: "1.5px solid", borderColor: cat === c.value ? "hsl(var(--primary))" : "hsl(var(--border))", background: cat === c.value ? "hsl(var(--primary))" : "transparent", color: cat === c.value ? "white" : "hsl(var(--muted-foreground))", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {filtered.map(s => (
          <div key={s.id} style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.7)", borderRadius: "var(--radius-lg)", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.22s var(--ease-out), box-shadow 0.22s", position: "relative" }} className="service-card">
            <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9", background: "hsl(var(--muted))" }}>
              <img src={s.img} alt={s.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s var(--ease-out)" }} className="service-img" />
              <button 
                style={{ 
                  position: "absolute", top: "10px", right: "10px", 
                  width: "34px", height: "34px", borderRadius: "50%", 
                  background: isFavorite(s.id) ? "white" : "hsl(var(--card) / 0.9)", 
                  border: "none", cursor: "pointer", display: "flex", 
                  alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)",
                  color: isFavorite(s.id) ? "hsl(0 72% 51%)" : "hsl(var(--muted-foreground))",
                  transition: "all 0.2s", zIndex: 10
                }} 
                onClick={e => {
                  e.preventDefault();
                  toggleFavorite({ ...s, type: "service", image: s.img });
                }}
              >
                <Heart size={16} fill={isFavorite(s.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <div style={{ padding: "1.125rem 1.25rem 1.375rem", display: "flex", flexDirection: "column", flex: 1 }}>
              <Link href={`/vendeurs/${s.vendorId}`} style={{ fontSize: "0.75rem", color: "hsl(var(--primary))", fontWeight: 600, marginBottom: "0.4rem", textDecoration: "none", position: "relative", zIndex: 2 }}>
                {s.vendor}
              </Link>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.35, flex: 1 }}>
                <Link href={`/services/${s.id}`} style={{ color: "inherit", textDecoration: "none" }} className="stretched-link">
                  {s.title}
                </Link>
              </h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Star size={13} fill="hsl(38 95% 48%)" color="hsl(38 95% 48%)" />
                  <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{s.rating}</span>
                  <span style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))" }}>({s.reviews})</span>
                </div>
                <span style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>Délai: {s.delivery}</span>
              </div>
              <div style={{ borderTop: "1px solid hsl(var(--border))", marginTop: "0.875rem", paddingTop: "0.875rem" }}>
                <span style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))" }}>À partir de</span>
                <span style={{ display: "block", fontSize: "1.05rem", fontWeight: 800, color: "hsl(var(--primary))", marginTop: "0.125rem" }}>{s.price.toLocaleString("fr")} F</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .service-card:hover .service-img { transform: scale(1.04); }
        .stretched-link::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
