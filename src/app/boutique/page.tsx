"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, Heart, ChevronDown, MessageCircle, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "+22997000000";

const PRODUCTS = [
  { id: 1, title: "Sneakers Nike Air Premium", price: 27500, oldPrice: 35000, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", cat: "mode", badge: "Tendance", rating: 4.8, refCode: "SNK-001" },
  { id: 2, title: "Montre Connected Series 8", price: 45000, oldPrice: null, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", cat: "electronique", badge: "Nouveau", rating: 4.6, refCode: "MTR-002" },
  { id: 3, title: "Sac en cuir véritable artisanal", price: 18500, oldPrice: 24000, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", cat: "accessoires", badge: null, rating: 4.9, refCode: "SAC-003" },
  { id: 4, title: "Écouteurs True Wireless Pro", price: 14000, oldPrice: null, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", cat: "electronique", badge: "-20%", rating: 4.5, refCode: "ECO-004" },
  { id: 5, title: "Lunettes de soleil Aviator", price: 9500, oldPrice: null, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80", cat: "accessoires", badge: null, rating: 4.3, refCode: "LUN-005" },
  { id: 6, title: "Enceinte Bluetooth JBL", price: 32000, oldPrice: 38000, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", cat: "electronique", badge: null, rating: 4.7, refCode: "ENC-006" },
  { id: 7, title: "Dashiki brodé premium", price: 12500, oldPrice: null, img: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500&q=80", cat: "mode", badge: "Local", rating: 4.9, refCode: "DAS-007" },
  { id: 8, title: "Lampe de bureau LED rechargeable", price: 7800, oldPrice: 10000, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", cat: "maison", badge: null, rating: 4.4, refCode: "LMP-008" },
  { id: 9, title: "Chaussures cuir homme Oxford", price: 23000, oldPrice: 29000, img: "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=500&q=80", cat: "mode", badge: null, rating: 4.6, refCode: "CHS-009" },
  { id: 10, title: "Tablette Android 10 pouces", price: 89000, oldPrice: null, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", cat: "electronique", badge: "Pro", rating: 4.5, refCode: "TAB-010" },
  { id: 11, title: "Coussin décoratif wax", price: 5500, oldPrice: null, img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&q=80", cat: "maison", badge: "Artisanal", rating: 4.8, refCode: "COU-011" },
  { id: 12, title: "Portefeuille cuir RFID", price: 8000, oldPrice: 12000, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80", cat: "accessoires", badge: "-33%", rating: 4.7, refCode: "POR-012" },
];

const CATS = [
  { value: "all", label: "Tout" },
  { value: "mode", label: "Mode" },
  { value: "electronique", label: "Électronique" },
  { value: "maison", label: "Maison & Déco" },
  { value: "accessoires", label: "Accessoires" },
];

const SORTS = ["Pertinence", "Prix croissant", "Prix décroissant", "Mieux notés", "Nouveautés"];

export default function BoutiquePage() {
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("Pertinence");
  const [search, setSearch] = useState("");
  const { toggleFavorite, isFavorite } = useWishlist();
  const { addItem } = useCart();

  const filtered = PRODUCTS.filter(p =>
    (cat === "all" || p.cat === cat) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  const buildWhatsAppLink = (p: typeof PRODUCTS[0]) => {
    const msg = encodeURIComponent(`Bonjour, je suis intéressé par : ${p.title}\nRef: ${p.refCode}\nPrix: ${p.price.toLocaleString("fr")} F\n\nMerci !`);
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${msg}`;
  };

  return (
    <div className="boutique-page" style={{ maxWidth: "1240px", margin: "0 auto", padding: "3rem 2rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Boutique</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.95rem" }}>
          {filtered.length} produits disponibles — livraison rapide au Bénin
        </p>
      </div>

      <div className="boutique-filters" style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: "1 1 280px", minWidth: "220px", background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", borderRadius: "var(--radius-full)", padding: "0.55rem 1rem" }}>
          <Search size={16} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un produit..." style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "hsl(var(--foreground))", width: "100%", fontFamily: "inherit" }} />
        </div>
        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {CATS.map(c => (
            <button key={c.value} onClick={() => setCat(c.value)} style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", border: "1.5px solid", borderColor: cat === c.value ? "hsl(var(--primary))" : "hsl(var(--border))", background: cat === c.value ? "hsl(var(--primary))" : "transparent", color: cat === c.value ? "white" : "hsl(var(--muted-foreground))", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              {c.label}
            </button>
          ))}
        </div>
        <div style={{ position: "relative", marginLeft: "auto", flexShrink: 0 }}>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ appearance: "none", padding: "0.55rem 2.5rem 0.55rem 1rem", borderRadius: "var(--radius-full)", border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))", color: "hsl(var(--foreground))", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", outline: "none" }}>
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={14} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-foreground))", pointerEvents: "none" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {filtered.map(p => (
          <div key={p.id} style={{ textDecoration: "none", display: "block" }}>
            <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.7)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "transform 0.22s var(--ease-out), box-shadow 0.22s var(--ease-out)" }} className="boutique-card">
              <Link href={`/produit/${p.id}`} style={{ display: "block", textDecoration: "none" }}>
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1", background: "hsl(var(--muted))" }}>
                  <img src={p.img} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s var(--ease-out)" }} className="boutique-img" />
                  {p.badge && <span style={{ position: "absolute", top: "10px", left: "10px", padding: "3px 9px", borderRadius: "var(--radius-full)", background: "hsl(var(--primary))", color: "white", fontSize: "0.72rem", fontWeight: 700 }}>{p.badge}</span>}
                  <button
                    style={{
                      position: "absolute", top: "10px", right: "10px",
                      width: "34px", height: "34px", borderRadius: "50%",
                      background: isFavorite(p.id) ? "white" : "hsl(var(--card) / 0.9)",
                      border: "none", cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)",
                      color: isFavorite(p.id) ? "hsl(0 72% 51%)" : "hsl(var(--muted-foreground))",
                      transition: "all 0.2s"
                    }}
                    onClick={e => {
                      e.preventDefault();
                      toggleFavorite({ ...p, type: "product", image: p.img });
                    }}
                  >
                    <Heart size={16} fill={isFavorite(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </Link>
              <div style={{ padding: "1rem 1.125rem 1.25rem" }}>
                <p style={{ fontSize: "0.7rem", color: "hsl(var(--primary))", fontWeight: 700, marginBottom: "0.2rem", letterSpacing: "0.02em" }}>Ref: {p.refCode}</p>
                <Link href={`/produit/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h3 style={{ fontSize: "0.925rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.35, marginBottom: "0.25rem" }}>{p.title}</h3>
                </Link>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.5rem" }}>
                  <Star size={12} fill="hsl(38 95% 48%)" color="hsl(38 95% 48%)" />
                  <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{p.rating}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "hsl(var(--primary))" }}>{p.price.toLocaleString("fr")} F</span>
                  {p.oldPrice && <span style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", textDecoration: "line-through" }}>{p.oldPrice.toLocaleString("fr")} F</span>}
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => addItem({ id: p.id, name: p.title, price: p.price, img: p.img, refCode: p.refCode })}
                    style={{ flex: 1, padding: "0.5rem", borderRadius: "var(--radius)", background: "hsl(var(--primary))", color: "white", border: "none", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem" }}
                  >
                    <ShoppingBag size={14} /> Panier
                  </button>
                  <a
                    href={buildWhatsAppLink(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "0.5rem", borderRadius: "var(--radius)", background: "#25D366", color: "white", fontWeight: 700, fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
          <p style={{ fontSize: "1.1rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>Aucun produit trouvé pour cette recherche.</p>
          <button onClick={() => { setCat("all"); setSearch(""); }} style={{ marginTop: "1rem", padding: "0.625rem 1.5rem", borderRadius: "var(--radius-full)", border: "1.5px solid hsl(var(--primary))", background: "transparent", color: "hsl(var(--primary))", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Réinitialiser</button>
        </div>
      )}

      <style>{`
        .boutique-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .boutique-card:hover .boutique-img { transform: scale(1.04); }

        @media (max-width: 768px) {
          .boutique-page { padding: 1.5rem 1rem !important; }
          .boutique-filters { flex-direction: column; align-items: stretch !important; }
          .boutique-filters > div:last-child { margin-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .boutique-filters > div:nth-child(2) { overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .boutique-filters > div:nth-child(2)::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </div>
  );
}
