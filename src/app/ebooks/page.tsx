"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, BookOpen, Download, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

const EBOOKS = [
  { id: 1, title: "Guide complet du business en Afrique", author: "K. Emmanuel", price: 5000, img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80", cat: "business", pages: 187, format: "PDF" },
  { id: 2, title: "Maîtriser React en 30 jours", author: "Dev Bénin Pro", price: 12000, img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80", cat: "dev", pages: 312, format: "PDF + ePub" },
  { id: 3, title: "50 Recettes béninoises modernes", author: "Chef Amina", price: 3500, img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80", cat: "cuisine", pages: 124, format: "PDF" },
  { id: 4, title: "Marketing Digital pour PME africaines", author: "Agence Com BJ", price: 8000, img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&q=80", cat: "business", pages: 210, format: "PDF" },
  { id: 5, title: "Python pour les nuls : édition Afrique", author: "Code Academy BJ", price: 9500, img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80", cat: "dev", pages: 268, format: "PDF + ePub" },
  { id: 6, title: "Développement personnel — la méthode africaine", author: "Dr. Sylvie O.", price: 6500, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80", cat: "perso", pages: 155, format: "PDF" },
  { id: 7, title: "Finances personnelles & investissement", author: "Fintech Bénin", price: 11000, img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80", cat: "business", pages: 198, format: "PDF" },
  { id: 8, title: "Cours de cuisine traditionnelle béninoise", author: "Chef Armand", price: 4000, img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80", cat: "cuisine", pages: 96, format: "PDF" },
];

const CATS = [
  { value: "all", label: "Tous" },
  { value: "business", label: "Business" },
  { value: "dev", label: "Tech & Dev" },
  { value: "cuisine", label: "Cuisine" },
  { value: "perso", label: "Développement perso" },
];

export default function EbooksPage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const { toggleFavorite, isFavorite } = useWishlist();

  const filtered = EBOOKS.filter(e =>
    (cat === "all" || e.cat === cat) &&
    (search === "" || e.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "3rem 2rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Bibliothèque</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.95rem" }}>Ebooks & guides numériques — accès immédiat après achat</p>
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: "1 1 280px", minWidth: "220px", background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", borderRadius: "var(--radius-full)", padding: "0.55rem 1rem" }}>
          <Search size={16} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un ebook..." style={{ border: "none", outline: "none", background: "transparent", fontSize: "0.9rem", color: "hsl(var(--foreground))", width: "100%", fontFamily: "inherit" }} />
        </div>
        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {CATS.map(c => (
            <button key={c.value} onClick={() => setCat(c.value)} style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", border: "1.5px solid", borderColor: cat === c.value ? "hsl(var(--primary))" : "hsl(var(--border))", background: cat === c.value ? "hsl(var(--primary))" : "transparent", color: cat === c.value ? "white" : "hsl(var(--muted-foreground))", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {filtered.map(e => (
          <div key={e.id} style={{ position: "relative" }}>
            <Link href={`/ebooks/${e.id}`} style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", gap: "1rem", background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.7)", borderRadius: "var(--radius-lg)", overflow: "hidden", padding: "1rem", transition: "transform 0.22s var(--ease-out), box-shadow 0.22s" }} className="ebook-card">
                <div style={{ width: "80px", minWidth: "80px", height: "110px", borderRadius: "var(--radius)", overflow: "hidden", background: "hsl(var(--muted))" }}>
                  <img src={e.img} alt={e.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--primary))", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{CATS.find(c => c.value === e.cat)?.label}</span>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.35, color: "hsl(var(--foreground))", flex: 1 }}>{e.title}</h3>
                  <p style={{ fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", marginTop: "0.375rem" }}>{e.author}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.625rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{e.pages}p · {e.format}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.95rem", fontWeight: 800, color: "hsl(var(--primary))" }}>
                      <Download size={13} /> {e.price.toLocaleString("fr")} F
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <button 
              style={{ 
                position: "absolute", top: "15px", right: "15px", 
                width: "28px", height: "28px", borderRadius: "50%", 
                background: isFavorite(e.id) ? "white" : "hsl(var(--card) / 0.9)", 
                border: "none", cursor: "pointer", display: "flex", 
                alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)",
                color: isFavorite(e.id) ? "hsl(0 72% 51%)" : "hsl(var(--muted-foreground))",
                transition: "all 0.2s", zIndex: 10
              }} 
              onClick={e_btn => {
                e_btn.preventDefault();
                toggleFavorite({ ...e, type: "ebook", vendor: e.author, image: e.img });
              }}
            >
              <Heart size={14} fill={isFavorite(e.id) ? "currentColor" : "none"} />
            </button>
          </div>
        ))}
      </div>
      <style>{`.ebook-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }`}</style>
    </div>
  );
}
