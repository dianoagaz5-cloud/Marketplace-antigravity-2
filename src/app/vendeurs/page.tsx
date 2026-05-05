"use client";

import Link from "next/link";
import { Search, MapPin, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const VENDORS = [
  { id: "style-cotonou", name: "Style Cotonou", type: "Boutique", city: "Cotonou", avatar: "SC", products: 34, rating: 4.8, reviews: 210, verified: true, cover: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", desc: "Mode et accessoires premium importés" },
  { id: "dev-benin-studio", name: "Dev Bénin Studio", type: "Service", city: "Cotonou", avatar: "DB", products: 8, rating: 4.9, reviews: 38, verified: true, cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80", desc: "Développement web & mobile professionnel" },
  { id: "creative-hub", name: "Creative Hub Porto-Novo", type: "Service", city: "Porto-Novo", avatar: "CH", products: 12, rating: 4.8, reviews: 64, verified: true, cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", desc: "Design graphique & identité visuelle" },
  { id: "artisans-ganvie", name: "Artisans Ganvié", type: "Boutique", city: "Ganvié", avatar: "AG", products: 28, rating: 4.9, reviews: 87, verified: true, cover: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&q=80", desc: "Artisanat local authentique du Bénin" },
  { id: "techfix", name: "TechFix Express", type: "Service", city: "Parakou", avatar: "TF", products: 5, rating: 4.7, reviews: 22, verified: false, cover: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80", desc: "Réparation informatique rapide" },
  { id: "soundx", name: "SoundX Bénin", type: "Boutique", city: "Cotonou", avatar: "SX", products: 19, rating: 4.6, reviews: 53, verified: true, cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", desc: "Audio & électronique grand public" },
];

export default function VendeursPage() {
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "3rem 2rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Nos Partenaires</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "1rem", fontWeight: 500 }}>Marchands et prestataires certifiés sur MarketBénin</p>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", maxWidth: "450px", background: "hsl(var(--card))", border: "2px solid hsl(var(--border))", borderRadius: "var(--radius-lg)", padding: "0.75rem 1.25rem", marginBottom: "3rem" }}>
        <Search size={18} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />
        <input placeholder="Rechercher un vendeur ou un service..." style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.95rem", color: "hsl(var(--foreground))", width: "100%", fontWeight: 500 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
        {VENDORS.map(v => (
          <Link key={v.id} href={`/vendeurs/${v.id}`} style={{ textDecoration: "none" }}>
            <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.7)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.3s var(--ease-out)" }} className="vendor-card">
              {/* Cover */}
              <div style={{ height: "140px", overflow: "hidden", background: "hsl(var(--muted))", position: "relative" }}>
                <img src={v.cover} alt={v.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s var(--ease-out)" }} className="vendor-img" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.4))" }} />
              </div>

              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", marginTop: "-3rem", marginBottom: "1.25rem", position: "relative", zIndex: 5 }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "var(--radius-lg)", background: "hsl(var(--primary))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.25rem", border: "4px solid hsl(var(--card))", flexShrink: 0, boxShadow: "var(--shadow-md)" }}>
                    {v.avatar}
                  </div>
                  {v.verified && (
                    <span style={{ padding: "3px 8px", background: "hsl(var(--success))", color: "white", fontSize: "0.65rem", fontWeight: 800, borderRadius: "var(--radius-sm)", marginBottom: "4px" }}>CERTIFIÉ</span>
                  )}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.01em", marginBottom: "0.375rem" }}>{v.name}</h3>
                <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", marginBottom: "1.25rem", lineHeight: 1.5 }}>{v.desc}</p>

                <div style={{ display: "flex", gap: "1.25rem", borderTop: "1px solid hsl(var(--border) / 0.6)", paddingTop: "1rem" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: "1rem" }}>{v.products}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", fontWeight: 600 }}>Articles</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: "1rem", color: "hsl(var(--warning))" }}>{v.rating}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", fontWeight: 600 }}>Note</div>
                  </div>
                  <div style={{ textAlign: "center", marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "hsl(var(--primary))" }}>{v.type}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "center", gap: "0.25rem" }}><MapPin size={12} /> {v.city}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .vendor-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: hsl(var(--primary) / 0.3); }
        .vendor-card:hover .vendor-img { transform: scale(1.08); }
      `}</style>
    </div>
  );
}
