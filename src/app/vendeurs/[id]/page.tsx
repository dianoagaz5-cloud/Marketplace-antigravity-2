"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, MapPin, CheckCircle2, Package, MessageCircle, Share2, ShieldCheck, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/context/ChatContext";

const VENDOR = {
  id: "style-cotonou",
  name: "Style Cotonou",
  type: "Boutique",
  city: "Cotonou, Littoral",
  avatar: "SC",
  cover: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
  rating: 4.8,
  reviews: 210,
  products: 34,
  sales: 1240,
  verified: true,
  since: "2022",
  desc: "Boutique spécialisée dans la mode et les accessoires premium. Nous importons directement depuis Paris, Dubai et Guangzhou pour vous offrir les meilleures marques à prix compétitifs. Livraison rapide sur tout le Bénin.",
  products_list: [
    { id: 1, title: "Sneakers Nike Air Premium", price: 27500, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { id: 9, title: "Chaussures cuir Oxford", price: 23000, img: "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=400&q=80" },
    { id: 3, title: "Sac en cuir artisanal", price: 18500, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
    { id: 12, title: "Portefeuille cuir RFID", price: 8000, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80" },
  ],
};

export default function VendeurProfilePage() {
  const { startConversation } = useChat();
  const router = useRouter();
  const [contacting, setContacting] = useState(false);

  const handleContact = () => {
    setContacting(true);
    setTimeout(() => {
      startConversation(VENDOR.id, VENDOR.name, VENDOR.avatar);
      router.push("/messages");
    }, 800);
  };

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem 6rem" }}>
      <Link href="/vendeurs" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", fontWeight: 500, margin: "2rem 0", textDecoration: "none" }}>
        <ArrowLeft size={16} /> Retour aux vendeurs
      </Link>

      {/* Cover with SMOOTH Gradient Blur */}
      <div style={{ height: "350px", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "hsl(var(--muted))", marginBottom: "-100px", position: "relative" }}>
        <img src={VENDOR.cover} alt={VENDOR.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        
        {/* Layer 1: Dark base gradient */}
        <div style={{ 
          position: "absolute", inset: 0, 
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)" 
        }} />
        
        {/* Layer 2: Blurred overlay with mask for smooth transition */}
        <div style={{ 
          position: "absolute", bottom: 0, left: 0, right: 0, height: "180px",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7))",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        }} />
      </div>

      {/* Header info */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 2.5rem", marginBottom: "4rem", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.75rem" }}>
          <div style={{ width: "130px", height: "130px", borderRadius: "var(--radius-lg)", background: "hsl(var(--primary))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "2.5rem", border: "5px solid hsl(var(--background))", flexShrink: 0, boxShadow: "var(--shadow-lg)" }}>
            {VENDOR.avatar}
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em", color: "white", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>{VENDOR.name}</h1>
              {VENDOR.verified && <span style={{ padding: "4px 10px", background: "hsl(var(--success))", color: "white", fontSize: "0.75rem", fontWeight: 800, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "0.35rem" }}><CheckCircle2 size={12} /> CERTIFIÉ</span>}
            </div>
            {/* TEXT VISIBILITY FIX: Using white text with shadow for banner, but darker text if it falls outside */}
            <div style={{ 
              display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "0.5rem", 
              flexWrap: "wrap", color: "white", 
              padding: "0.25rem 0.5rem", borderRadius: "var(--radius-sm)",
              background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)"
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "1rem", fontWeight: 600 }}><MapPin size={18} /> {VENDOR.city}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "1rem", fontWeight: 700, color: "hsl(var(--warning))" }}><Star size={18} fill="currentColor" /> {VENDOR.rating} ({VENDOR.reviews} avis)</span>
              <span style={{ fontSize: "1rem", fontWeight: 500, opacity: 0.9 }}>Membre depuis {VENDOR.since}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          
          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <button 
              onClick={handleContact}
              disabled={contacting}
              style={{ 
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", 
                padding: "1.125rem", borderRadius: "var(--radius-lg)", 
                background: "hsl(var(--primary))", 
                color: "white", border: "none", fontWeight: 800, fontSize: "1.1rem", 
                cursor: contacting ? "wait" : "pointer", 
                boxShadow: "0 8px 24px hsl(var(--primary) / 0.3)",
                transition: "all 0.3s"
              }}
            >
              {contacting ? "Ouverture du chat..." : <><MessageCircle size={22} /> Discuter avec le vendeur</>}
            </button>
            <button style={{ padding: "1.125rem", width: "60px", borderRadius: "var(--radius-lg)", border: "2px solid hsl(var(--border))", background: "hsl(var(--card))", color: "hsl(var(--foreground))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Share2 size={22} />
            </button>
          </div>

          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "2rem", letterSpacing: "-0.02em" }}>Catalogue Produits ({VENDOR.products})</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.75rem" }}>
              {VENDOR.products_list.map(p => (
                <Link key={p.id} href={`/produit/${p.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.7)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.3s var(--ease-out)" }} className="vendor-product-card">
                    <div style={{ aspectRatio: "1", overflow: "hidden", background: "hsl(var(--muted))" }}>
                      <img src={p.img} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s var(--ease-out)" }} className="vp-img" />
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <p style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.4, marginBottom: "0.5rem" }}>{p.title}</p>
                      <p style={{ fontSize: "1.15rem", fontWeight: 900, color: "hsl(var(--primary))" }}>{p.price.toLocaleString("fr")} F</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-lg)", padding: "2.25rem" }}>
            <h3 style={{ fontWeight: 800, marginBottom: "1.25rem", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.625rem" }}><Package size={20} color="hsl(var(--primary))" /> À propos</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>{VENDOR.desc}</p>
          </div>
          
          <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-lg)", padding: "2.25rem" }}>
            <h3 style={{ fontWeight: 800, marginBottom: "1.5rem", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.625rem" }}><ShieldCheck size={20} color="hsl(var(--primary))" /> Statistiques Clés</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { label: "Articles en ligne", value: VENDOR.products },
                { label: "Ventes réussies", value: `${VENDOR.sales}+` },
                { label: "Temps de réponse", value: "< 2h" },
                { label: "Avis positifs", value: "98%" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid hsl(var(--border) / 0.5)", fontSize: "0.95rem" }}>
                  <span style={{ color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontWeight: 800 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .vendor-product-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); border-color: hsl(var(--primary) / 0.3); }
        .vendor-product-card:hover .vp-img { transform: scale(1.1); }
      `}</style>
    </div>
  );
}
