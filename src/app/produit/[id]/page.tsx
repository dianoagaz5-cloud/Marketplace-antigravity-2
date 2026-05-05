"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Star, ShieldCheck, Truck,
  MessageCircle, Heart, Share2, ShoppingBag,
  Check
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const DEMO_PRODUCT = {
  id: "prod-1",
  title: "Sneakers Nike Air Premium",
  price: 27500,
  oldPrice: 35000,
  refCode: "SNK-001",
  rating: 4.8,
  reviews: 124,
  stock: 8,
  description: "Sneakers premium importées, idéales pour le quotidien et le sport. Semelle amortissante Air Max, tige en mesh respirant. Disponibles en plusieurs pointures. Profitez d'une qualité exceptionnelle pour vos sorties à Cotonou et partout ailleurs.",
  sizes: ["40", "41", "42", "43", "44", "45"],
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85&auto=format",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=85&auto=format",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85&auto=format",
  ],
};

const WHATSAPP_NUMBER = "+22997000000";

export default function ProduitPage() {
  const { toggleFavorite, isFavorite } = useWishlist();
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  const active = isFavorite(DEMO_PRODUCT.id);

  const handleAddToCart = () => {
    addItem({
      id: 1,
      name: DEMO_PRODUCT.title,
      price: DEMO_PRODUCT.price,
      img: DEMO_PRODUCT.images[0],
      refCode: DEMO_PRODUCT.refCode,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const buildWhatsAppMessage = () => {
    const msg = `Bonjour, je suis intéressé par : ${DEMO_PRODUCT.title}\nRef: ${DEMO_PRODUCT.refCode}\nPrix: ${DEMO_PRODUCT.price.toLocaleString("fr")} F${selectedSize ? `\nPointure: ${selectedSize}` : ""}\n\nMerci !`;
    return encodeURIComponent(msg);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${buildWhatsAppMessage()}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: DEMO_PRODUCT.title,
          text: `Découvrez ${DEMO_PRODUCT.title} sur MarketBénin !`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Erreur de partage:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  return (
    <div className="product-page" style={{ maxWidth: "1240px", margin: "0 auto", padding: "2rem 2rem 6rem" }}>
      <Link href="/boutique" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", fontWeight: 500, marginBottom: "2rem", textDecoration: "none", transition: "color 0.2s" }}>
        <ArrowLeft size={16} /> Retour à la boutique
      </Link>

      <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "4rem", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", background: "hsl(var(--muted))", aspectRatio: "1", boxShadow: "var(--shadow-md)" }}
          >
            <img src={DEMO_PRODUCT.images[activeImage]} alt={DEMO_PRODUCT.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {DEMO_PRODUCT.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                style={{
                  borderRadius: "var(--radius)", overflow: "hidden", aspectRatio: "1", background: "hsl(var(--muted))",
                  border: activeImage === i ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                  cursor: "pointer", transition: "all 0.2s"
                }}
              >
                <img src={img} alt={`Vue ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "sticky", top: "100px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
            <div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--primary))", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Ref: {DEMO_PRODUCT.refCode}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => toggleFavorite({
                  id: DEMO_PRODUCT.id,
                  title: DEMO_PRODUCT.title,
                  price: DEMO_PRODUCT.price,
                  type: "product",
                  image: DEMO_PRODUCT.images[0],
                })}
                style={{
                  padding: "0.6rem", borderRadius: "var(--radius)", border: "1.5px solid",
                  borderColor: active ? "hsl(0 72% 51%)" : "hsl(var(--border))",
                  background: active ? "hsl(0 72% 51% / 0.1)" : "hsl(var(--card))",
                  cursor: "pointer", color: active ? "hsl(0 72% 51%)" : "hsl(var(--muted-foreground))",
                  transition: "all 0.3s"
                }}
              >
                <Heart size={20} fill={active ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                style={{ padding: "0.6rem", borderRadius: "var(--radius)", border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))", cursor: "pointer", color: "hsl(var(--muted-foreground))" }}
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: "0.75rem" }}>{DEMO_PRODUCT.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "hsl(38 95% 48%)", fontSize: "0.9rem", fontWeight: 800 }}>
              <Star size={16} fill="currentColor" /> {DEMO_PRODUCT.rating}
            </div>
            <span style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>{DEMO_PRODUCT.reviews} avis vérifiés</span>
            <span style={{ fontSize: "0.85rem", color: "hsl(var(--success))", fontWeight: 700, background: "hsl(var(--success) / 0.1)", padding: "0.25rem 0.5rem", borderRadius: "var(--radius)" }}>{DEMO_PRODUCT.stock} en stock</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ fontSize: "2.25rem", fontWeight: 900, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>{DEMO_PRODUCT.price.toLocaleString("fr")} F</span>
            {DEMO_PRODUCT.oldPrice && <span style={{ fontSize: "1.2rem", color: "hsl(var(--muted-foreground))", textDecoration: "line-through", opacity: 0.6 }}>{DEMO_PRODUCT.oldPrice.toLocaleString("fr")} F</span>}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 700 }}>Choisir une pointure</p>
              <button style={{ fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--primary))", background: "none", border: "none", cursor: "pointer" }}>Guide des tailles</button>
            </div>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              {DEMO_PRODUCT.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: "48px", height: "48px", borderRadius: "var(--radius)",
                    border: "2px solid",
                    borderColor: selectedSize === s ? "hsl(var(--primary))" : "hsl(var(--border))",
                    background: selectedSize === s ? "hsl(var(--primary) / 0.05)" : "transparent",
                    cursor: "pointer", fontSize: "0.9rem", fontWeight: 700,
                    color: selectedSize === s ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    transition: "all 0.15s"
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
            <button
              onClick={handleAddToCart}
              style={{
                padding: "1.125rem", borderRadius: "var(--radius-lg)",
                background: added ? "hsl(var(--success))" : "hsl(var(--primary))",
                color: "white", border: "none", fontWeight: 800, fontSize: "1rem",
                cursor: "pointer", boxShadow: "0 6px 20px hsl(var(--primary) / 0.2)",
                fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                transition: "all 0.3s"
              }}
            >
              {added ? <><Check size={20} strokeWidth={3} /> Ajouté au panier</> : <><ShoppingBag size={20} /> Ajouter au panier</>}
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "1.125rem", borderRadius: "var(--radius-lg)",
                background: "#25D366", color: "white",
                fontWeight: 800, fontSize: "1rem",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                textDecoration: "none", textAlign: "center",
                boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
              }}
            >
              <MessageCircle size={20} /> Commander sur WhatsApp
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem", background: "hsl(var(--muted) / 0.3)", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border) / 0.5)", marginBottom: "2rem" }}>
            {[
              { icon: ShieldCheck, text: "Produits vérifiés et authentiques" },
              { icon: Truck, text: "Livraison Express sur tout le Bénin" },
              { icon: MessageCircle, text: "Commande facile par WhatsApp" },
            ].map((i, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.875rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
                <i.icon size={18} style={{ color: "hsl(var(--primary))" }} />
                <span style={{ fontWeight: 600 }}>{i.text}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: "1.5rem" }}>
            <h3 style={{ fontWeight: 800, marginBottom: "0.75rem", fontSize: "1rem" }}>Description</h3>
            <p style={{ fontSize: "0.925rem", lineHeight: 1.7, color: "hsl(var(--muted-foreground))" }}>{DEMO_PRODUCT.description}</p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .product-page { padding: 1.25rem 1rem 4rem !important; }
          .product-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
