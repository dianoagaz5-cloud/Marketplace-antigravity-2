"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, Clock, MessageSquare, Heart, Share2, Calendar, User, MapPin, Check } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";

const DEMO_SERVICE = {
  id: "serv-1",
  title: "Service de Nettoyage Professionnel",
  provider: "Cotonou Cleaners",
  providerId: "cotonou-cleaners",
  price: 15000,
  unit: "séance",
  rating: 4.9,
  reviews: 56,
  location: "Cotonou & Calavi",
  description: "Bénéficiez d'un nettoyage en profondeur pour votre maison ou bureau. Notre équipe utilise des produits écologiques et garantit un résultat impeccable. Nous nous déplaçons partout à Cotonou et Calavi avec tout l'équipement nécessaire.",
  includes: ["Nettoyage des sols", "Dépoussiérage complet", "Désinfection des sanitaires", "Nettoyage des vitres"],
  images: [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6954?w=800&q=85&auto=format",
    "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=800&q=85&auto=format",
  ],
};

export default function ServicePage() {
  const { toggleFavorite, isFavorite } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);
  const [booked, setBooked] = useState(false);

  const handleBooking = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 2500);
  };

  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>
      <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", fontWeight: 500, marginBottom: "2rem", textDecoration: "none" }}>
        <ArrowLeft size={16} /> Retour aux services
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "4rem", alignItems: "start" }}>
        {/* Left Side */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Main Image */}
          <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", background: "hsl(var(--muted))", aspectRatio: "16/10", boxShadow: "var(--shadow-md)" }}>
            <img src={DEMO_SERVICE.images[activeImage]} alt={DEMO_SERVICE.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>À propos de ce service</h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "hsl(var(--muted-foreground))" }}>{DEMO_SERVICE.description}</p>
            </div>

            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Ce qui est inclus :</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {DEMO_SERVICE.includes.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "hsl(var(--foreground))" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Card */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-xl)", padding: "2rem", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "hsl(var(--primary))", textTransform: "uppercase", letterSpacing: "0.05em" }}>Service vérifié</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button 
                  onClick={() => toggleFavorite({ id: DEMO_SERVICE.id, type: "service", title: DEMO_SERVICE.title, price: DEMO_SERVICE.price, vendor: DEMO_SERVICE.provider })}
                  style={{ padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: isFavorite(DEMO_SERVICE.id) ? "hsl(var(--danger) / 0.1)" : "transparent", cursor: "pointer", color: isFavorite(DEMO_SERVICE.id) ? "hsl(var(--danger))" : "hsl(var(--muted-foreground))" }}
                >
                  <Heart size={18} fill={isFavorite(DEMO_SERVICE.id) ? "currentColor" : "none"} />
                </button>
                <button style={{ padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "transparent", cursor: "pointer", color: "hsl(var(--muted-foreground))" }}>
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "1rem" }}>{DEMO_SERVICE.title}</h1>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "hsl(38 95% 48%)", fontSize: "0.9rem", fontWeight: 800 }}>
                <Star size={16} fill="currentColor" /> {DEMO_SERVICE.rating}
              </div>
              <span style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))" }}>{DEMO_SERVICE.reviews} avis</span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "2rem" }}>
              <span style={{ fontSize: "2rem", fontWeight: 900 }}>{DEMO_SERVICE.price.toLocaleString("fr")} F</span>
              <span style={{ fontSize: "1rem", color: "hsl(var(--muted-foreground))" }}>/ {DEMO_SERVICE.unit}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "hsl(var(--muted-foreground))" }}>
                <MapPin size={16} color="hsl(var(--primary))" /> {DEMO_SERVICE.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "hsl(var(--muted-foreground))" }}>
                <Calendar size={16} color="hsl(var(--primary))" /> Prochaines dispos : Demain
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "hsl(var(--muted-foreground))" }}>
                <Clock size={16} color="hsl(var(--primary))" /> Durée approx. : 2h - 4h
              </div>
            </div>

            <button 
              onClick={handleBooking}
              style={{ 
                width: "100%", padding: "1.125rem", borderRadius: "var(--radius-full)", 
                background: booked ? "hsl(var(--success))" : "hsl(var(--primary))", 
                color: "white", border: "none", fontWeight: 800, fontSize: "1rem", 
                cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                transition: "all 0.3s", marginBottom: "1rem"
              }}
            >
              {booked ? <><Check size={20} strokeWidth={3} /> Demande envoyée !</> : "Réserver ce service"}
            </button>
            <button style={{ width: "100%", padding: "1.125rem", borderRadius: "var(--radius-full)", background: "transparent", color: "hsl(var(--foreground))", border: "2px solid hsl(var(--foreground))", fontWeight: 800, fontSize: "1rem", cursor: "pointer" }}>
              Contacter le prestataire
            </button>
          </div>

          {/* Provider Card */}
          <div style={{ marginTop: "1.5rem", padding: "1.5rem", background: "hsl(var(--muted) / 0.3)", borderRadius: "var(--radius-xl)", border: "1px solid hsl(var(--border) / 0.5)", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "1.25rem" }}>
              CC
            </div>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>{DEMO_SERVICE.provider}</div>
              <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>Prestataire depuis 2 ans</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
