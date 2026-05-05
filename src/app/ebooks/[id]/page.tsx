"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, Download, FileText, Heart, Share2, BookOpen, User, Languages, Check } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";

const DEMO_EBOOK = {
  id: "ebk-1",
  title: "Guide de l'Investissement Immobilier au Bénin",
  author: "Sègla AHOUANOU",
  authorId: "segla-ahouanou",
  price: 5500,
  rating: 4.7,
  reviews: 89,
  pages: 145,
  format: "PDF",
  language: "Français",
  description: "Découvrez toutes les clés pour réussir vos investissements immobiliers au Bénin. Ce guide pratique couvre les aspects juridiques, les zones à fort potentiel et les pièges à éviter pour sécuriser votre patrimoine foncier.",
  chapters: [
    "Introduction au marché foncier béninois",
    "Le cadre juridique et le titre foncier",
    "Top 5 des zones d'avenir (Abomey-Calavi, Ouidah...)",
    "Comment négocier et éviter les litiges",
    "Conclusion et ressources utiles"
  ],
  cover: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&q=85&auto=format",
};

export default function EbookPage() {
  const { toggleFavorite, isFavorite } = useWishlist();
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = () => {
    setPurchased(true);
    setTimeout(() => setPurchased(false), 3000);
  };

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>
      <Link href="/ebooks" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", fontWeight: 500, marginBottom: "2rem", textDecoration: "none" }}>
        <ArrowLeft size={16} /> Retour aux ebooks
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "4rem", alignItems: "start" }}>
        {/* Left Side - Cover & Actions */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div style={{ 
            borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "2/3", 
            boxShadow: "var(--shadow-xl)", border: "1px solid hsl(var(--border) / 0.5)",
            background: "hsl(var(--muted))"
          }}>
            <img src={DEMO_EBOOK.cover} alt={DEMO_EBOOK.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button 
              onClick={handlePurchase}
              style={{ 
                width: "100%", padding: "1.125rem", borderRadius: "var(--radius-full)", 
                background: purchased ? "hsl(var(--success))" : "hsl(var(--primary))", 
                color: "white", border: "none", fontWeight: 800, fontSize: "1rem", 
                cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                transition: "all 0.3s"
              }}
            >
              {purchased ? <><Check size={20} strokeWidth={3} /> Accès débloqué !</> : <><Download size={20} /> Acheter & Télécharger</>}
            </button>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button 
                onClick={() => toggleFavorite(DEMO_EBOOK.id)}
                style={{ flex: 1, padding: "0.875rem", borderRadius: "var(--radius-full)", border: "1.5px solid hsl(var(--border))", background: isFavorite(DEMO_EBOOK.id) ? "hsl(var(--danger) / 0.1)" : "transparent", cursor: "pointer", color: isFavorite(DEMO_EBOOK.id) ? "hsl(var(--danger))" : "hsl(var(--muted-foreground))", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                <Heart size={18} fill={isFavorite(DEMO_EBOOK.id) ? "currentColor" : "none"} /> Favoris
              </button>
              <button style={{ flex: 1, padding: "0.875rem", borderRadius: "var(--radius-full)", border: "1.5px solid hsl(var(--border))", background: "transparent", cursor: "pointer", color: "hsl(var(--muted-foreground))", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Share2 size={18} /> Partager
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: "1rem" }}>{DEMO_EBOOK.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: 800 }}>SA</div>
                <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>{DEMO_EBOOK.author}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "hsl(38 95% 48%)", fontSize: "0.95rem", fontWeight: 800 }}>
                <Star size={18} fill="currentColor" /> {DEMO_EBOOK.rating}
                <span style={{ color: "hsl(var(--muted-foreground))", fontWeight: 500, fontSize: "0.85rem", marginLeft: "0.25rem" }}>({DEMO_EBOOK.reviews} avis)</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", padding: "1.5rem", background: "hsl(var(--muted) / 0.3)", borderRadius: "var(--radius-xl)", border: "1px solid hsl(var(--border) / 0.5)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", marginBottom: "0.25rem" }}>Pages</div>
                <div style={{ fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}><FileText size={16} /> {DEMO_EBOOK.pages}</div>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid hsl(var(--border))", borderRight: "1px solid hsl(var(--border))" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", marginBottom: "0.25rem" }}>Format</div>
                <div style={{ fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}><BookOpen size={16} /> {DEMO_EBOOK.format}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", marginBottom: "0.25rem" }}>Langue</div>
                <div style={{ fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}><Languages size={16} /> {DEMO_EBOOK.language}</div>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>Résumé de l'ouvrage</h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>{DEMO_EBOOK.description}</p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem" }}>Au sommaire</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {DEMO_EBOOK.chapters.map((chap, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", padding: "1rem", borderRadius: "var(--radius)", background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)" }}>
                  <span style={{ fontWeight: 800, color: "hsl(var(--primary))", opacity: 0.5 }}>{i + 1}.</span>
                  <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{chap}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "1.5rem", borderRadius: "var(--radius-xl)", background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.1))", border: "1px solid hsl(var(--primary) / 0.2)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><ShieldCheck size={20} /> Protection & Licence</h3>
            <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>
              Cet ebook est protégé par le droit d'auteur. Après achat, vous recevrez un lien de téléchargement personnel. L'accès est illimité et disponible sur tous vos appareils.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
