"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { favorites, toggleFavorite } = useWishlist();

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "4rem 2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Mes Favoris</h1>
          <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "0.5rem" }}>
            {favorites.length} article{favorites.length > 1 ? "s" : ""} sauvegardé{favorites.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/boutique" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--primary))", fontWeight: 600, textDecoration: "none" }}>
          Continuer mes achats <ArrowRight size={18} />
        </Link>
      </div>

      {favorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            textAlign: "center", padding: "6rem 2rem", 
            backgroundColor: "hsl(var(--muted) / 0.3)", borderRadius: "var(--radius-xl)" 
          }}
        >
          <div style={{ 
            width: "5rem", height: "5rem", borderRadius: "50%", 
            backgroundColor: "hsl(var(--card))", display: "flex", alignItems: "center", 
            justifyContent: "center", margin: "0 auto 2rem", color: "hsl(var(--muted-foreground))"
          }}>
            <Heart size={32} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Votre liste est vide</h2>
          <p style={{ color: "hsl(var(--muted-foreground))", maxWidth: "400px", margin: "0 auto 2rem" }}>
            Sauvegardez les articles qui vous plaisent pour les retrouver facilement plus tard.
          </p>
          <Link href="/boutique" style={{ 
            display: "inline-flex", alignItems: "center", gap: "0.75rem", 
            padding: "1rem 2.5rem", borderRadius: "var(--radius-lg)", 
            backgroundColor: "hsl(var(--primary))", color: "white", 
            fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.5)"
          }}>
            Découvrir la boutique
          </Link>
        </motion.div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
          <AnimatePresence>
            {favorites.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="fav-card"
                style={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border) / 0.7)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  position: "relative"
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", backgroundColor: "hsl(var(--muted))" }}>
                  <img src={item.image || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80&auto=format"} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button 
                    onClick={() => toggleFavorite(item)}
                    style={{ 
                      position: "absolute", top: "12px", right: "12px", 
                      width: "36px", height: "36px", borderRadius: "50%", 
                      backgroundColor: "white", color: "hsl(0 72% 51%)", 
                      border: "none", display: "flex", alignItems: "center", 
                      justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                  <div style={{ 
                    position: "absolute", bottom: "12px", left: "12px", 
                    padding: "0.4rem 0.8rem", borderRadius: "0.5rem", 
                    backgroundColor: "rgba(0,0,0,0.6)", color: "white", 
                    fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", 
                    backdropFilter: "blur(4px)" 
                  }}>
                    {item.type}
                  </div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginBottom: "0.25rem" }}>{item.vendor}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.3 }}>{item.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--primary))" }}>
                      {typeof item.price === "number" ? item.price.toLocaleString("fr") : item.price} F
                    </span>
                    <Link href={`/${item.type === "product" ? "produit" : item.type + "s"}/${item.id}`} style={{ 
                      width: "40px", height: "40px", borderRadius: "0.75rem", 
                      backgroundColor: "hsl(var(--muted))", display: "flex", 
                      alignItems: "center", justifyContent: "center", color: "hsl(var(--foreground))"
                    }}>
                      <ShoppingBag size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <style>{`
        .fav-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .fav-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -20px hsl(var(--foreground) / 0.15); }
      `}</style>
    </div>
  );
}
