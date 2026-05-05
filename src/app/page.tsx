"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Zap, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

/* ────────────────────────────────
   DATA
──────────────────────────────── */
const PRODUCTS = [
  { id: 1, title: "Sneakers Nike Air Premium", price: 27500, oldPrice: 35000, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&auto=format", badge: "Tendance", refCode: "SNK-001" },
  { id: 2, title: "Montre Connected Series 8", price: 45000, oldPrice: null, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80&auto=format", badge: "Nouveau", refCode: "MTR-002" },
  { id: 3, title: "Sac en cuir véritable artisanal", price: 18500, oldPrice: 24000, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80&auto=format", badge: null, refCode: "SAC-003" },
  { id: 4, title: "Écouteurs True Wireless Pro", price: 14000, oldPrice: null, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&auto=format", badge: "-20%", refCode: "ECO-004" },
];

const STATS = [
  { value: "500+", label: "Produits disponibles" },
  { value: "100%", label: "Produits vérifiés" },
  { value: "24/7", label: "Support client" },
  { value: "48h", label: "Livraison rapide" },
];

/* ────────────────────────────────
   COMPONENTS
──────────────────────────────── */
function ProductCard({ item }: { item: typeof PRODUCTS[0] }) {
  const { toggleFavorite, isFavorite } = useWishlist();
  const { addItem } = useCart();
  const active = isFavorite(item.id);

  return (
    <div className="product-card">
      <div className="card-img-wrap">
        <Link href={`/produit/${item.id}`} style={{ display: "block", height: "100%" }}>
          <img src={item.img} alt={item.title} loading="lazy" />
        </Link>
        {item.badge && <span className="card-badge">{item.badge}</span>}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite({ ...item, type: "product" });
          }}
          className={`wishlist-btn ${active ? "active" : ""}`}
          aria-label="Ajouter aux favoris"
        >
          <Heart size={18} fill={active ? "currentColor" : "none"} />
        </button>
      </div>
      <Link href={`/produit/${item.id}`} style={{ display: "block", textDecoration: "none" }}>
        <div className="card-body">
          <h3 className="card-title">{item.title}</h3>
          <div className="card-price-row">
            <span className="card-price">{item.price.toLocaleString("fr")} F</span>
            {item.oldPrice && <span className="card-old-price">{item.oldPrice.toLocaleString("fr")} F</span>}
          </div>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem({ id: item.id, name: item.title, price: item.price, img: item.img, refCode: item.refCode });
              }}
              style={{
                flex: 1, padding: "0.5rem", borderRadius: "var(--radius)",
                background: "hsl(var(--primary))", color: "white",
                border: "none", fontWeight: 700, fontSize: "0.8rem",
                cursor: "pointer", fontFamily: "inherit"
              }}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ────────────────────────────────
   SECTION WRAPPER
──────────────────────────────── */
function SectionHeader({ title, subtitle, href, linkText }: { title: string; subtitle?: string; href: string; linkText: string }) {
  return (
    <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", gap: "1rem", flexWrap: "wrap" }}>
      <div style={{ minWidth: 0 }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{title}</h2>
        {subtitle && <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "0.375rem", fontSize: "0.925rem" }}>{subtitle}</p>}
      </div>
      <Link href={href} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", fontWeight: 700, color: "hsl(var(--primary))", flexShrink: 0, paddingBottom: subtitle ? "0.125rem" : 0, whiteSpace: "nowrap" }}>
        {linkText} <ArrowRight size={16} />
      </Link>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

/* ────────────────────────────────
   PAGE
──────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, hsl(258 72% 97%) 0%, hsl(var(--background)) 60%)",
      }}>
        <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, hsl(258 72% 52% / 0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, hsl(35 95% 55% / 0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ maxWidth: "1240px", margin: "0 auto", padding: "4rem 2rem", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.875rem", borderRadius: "var(--radius-full)", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.02em", marginBottom: "1.75rem" }}>
                <Zap size={13} fill="currentColor" /> Boutique en ligne au Bénin
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2.6rem, 5.5vw, 4rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1.25rem" }}>
              Vos produits
              <span style={{ display: "block", color: "hsl(var(--primary))" }}>
                livrés au Bénin
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: "1.1rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.65, maxWidth: "480px", marginBottom: "2rem" }}>
              Produits physiques soigneusement sélectionnés. Commandez directement via WhatsApp et recevez votre livraison rapidement.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/boutique" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", padding: "1rem 2.25rem", borderRadius: "var(--radius-lg)", background: "hsl(var(--primary))", color: "white", fontWeight: 800, fontSize: "1.05rem", boxShadow: "0 6px 20px hsl(var(--primary) / 0.3)", textDecoration: "none" }}>
                Explorer <ArrowRight size={20} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid hsl(var(--border) / 0.6)" }}>
              {[
                { icon: ShieldCheck, text: "Produits vérifiés" },
                { icon: Clock, text: "Support 24/7" },
              ].map(t => (
                <div key={t.text} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>
                  <t.icon size={16} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                  {t.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="hero-cards" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", position: "relative" }}>
            {PRODUCTS.slice(0, 4).map((p, i) => (
              <Link key={p.id} href={`/produit/${p.id}`} style={{ textDecoration: "none", transform: i % 2 === 1 ? "translateY(1.5rem)" : "none" }}>
                <div style={{ background: "hsl(var(--card))", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }} loading="lazy" />
                  <div style={{ padding: "0.875rem" }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.3 }}>{p.price.toLocaleString("fr")} F</p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section style={{ borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}>
        <div className="stats-grid" style={{ maxWidth: "1240px", margin: "0 auto", padding: "2.5rem 2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", color: "hsl(var(--primary))" }}>{s.value}</div>
              <div style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════ PRODUCTS ══════════════════ */}
      <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "5rem 2rem" }} className="products-section">
        <SectionHeader title="Tendances du moment" subtitle="Les produits les plus appréciés cette semaine" href="/boutique" linkText="Tout voir" />
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="products-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}
        >
          {PRODUCTS.map(p => (
            <motion.div key={p.id} variants={fadeUp}><ProductCard item={p} /></motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Global card styles (injected inline for simplicity) ── */}
      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border) / 0.7);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out), border-color 0.2s;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: hsl(var(--border));
        }
        .card-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: hsl(var(--muted));
        }
        .card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.4s var(--ease-out);
        }
        .product-card:hover .card-img-wrap img { transform: scale(1.04); }
        .card-badge {
          position: absolute;
          top: 10px; left: 10px;
          padding: 3px 9px;
          border-radius: var(--radius-lg);
          background: hsl(var(--primary));
          color: white;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .card-body {
          padding: 1.125rem 1.25rem 1.375rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-vendor { font-size: 0.78rem; color: hsl(var(--muted-foreground)); font-weight: 500; margin-bottom: 0.3rem; }
        .card-title { font-size: 0.95rem; font-weight: 700; color: hsl(var(--foreground)); line-height: 1.35; }
        .card-price-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.75rem; }
        .card-price { font-size: 1.05rem; font-weight: 800; color: hsl(var(--primary)); }
        .card-old-price { font-size: 0.85rem; color: hsl(var(--muted-foreground)); text-decoration: line-through; }
        .wishlist-btn {
          position: absolute;
          top: 10px; right: 10px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: hsl(var(--card) / 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid hsl(var(--border) / 0.5);
          display: grid;
          place-items: center;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          transition: all 0.25s var(--ease-out-expo);
          z-index: 10;
          padding: 0;
        }
        .wishlist-btn:hover {
          transform: scale(1.1);
          color: hsl(0 72% 51%);
          background: hsl(var(--card));
        }
        .wishlist-btn.active {
          color: hsl(0 72% 51%);
          background: hsl(var(--card));
          border-color: hsl(0 72% 51% / 0.2);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 2rem 1rem !important;
            gap: 2rem !important;
          }
          .hero-cards {
            display: none !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 2rem 1rem !important;
            gap: 1.5rem !important;
          }
          .section-header {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem !important;
          }
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
