"use client";

import { motion } from "framer-motion";
import { 
  Package, Plus, Search, Edit2, Trash2, 
  Eye, MoreVertical, ImagePlus, TrendingUp
} from "lucide-react";
import Link from "next/link";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const products = [
  { id: 1, name: "Sneakers Premium Edition", category: "Mode", price: 25000, stock: 12, sales: 34, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80", status: "active" },
  { id: 2, name: "Montre Connectée Pro", category: "Électronique", price: 45000, stock: 5, sales: 18, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80", status: "active" },
  { id: 3, name: "Sac à dos en cuir", category: "Accessoires", price: 18500, stock: 0, sales: 52, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80", status: "out_of_stock" },
  { id: 4, name: "Écouteurs Sans Fil", category: "Électronique", price: 15000, stock: 22, sales: 89, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80", status: "active" },
  { id: 5, name: "Lunettes de soleil", category: "Accessoires", price: 10000, stock: 8, sales: 21, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=80", status: "draft" },
];

const statusBadge: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "En ligne", color: "hsl(142 71% 45%)", bg: "hsl(142 71% 45% / 0.1)" },
  out_of_stock: { label: "Rupture", color: "hsl(0 72% 51%)", bg: "hsl(0 72% 51% / 0.1)" },
  draft: { label: "Brouillon", color: "hsl(45 93% 47%)", bg: "hsl(45 93% 47% / 0.1)" },
};

export default function DashboardProduits() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "hsl(var(--background))" }}>

      {/* Sidebar - same as main dashboard */}
      <aside style={{
        width: "260px", flexShrink: 0,
        borderRight: "1px solid hsl(var(--border) / 0.5)",
        padding: "2rem 1rem",
        position: "sticky", top: 0, height: "100vh",
        backgroundColor: "hsl(var(--card))",
        display: "flex", flexDirection: "column", gap: "0.5rem"
      }}>
        <div style={{ padding: "0.5rem 0.75rem", marginBottom: "2rem" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Package size={20} color="hsl(var(--primary))" />
            <span style={{ color: "hsl(var(--foreground))" }}>Market<span style={{ color: "hsl(var(--primary))" }}>Bénin</span></span>
          </Link>
        </div>
        {[
          { label: "Vue d'ensemble", href: "/dashboard" },
          { label: "Mes produits", href: "/dashboard/produits", active: true },
          { label: "Commandes", href: "/dashboard/commandes" },
          { label: "Paramètres", href: "/dashboard/parametres" },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{
            padding: "0.75rem 1rem", borderRadius: "var(--radius)",
            fontSize: "0.875rem", fontWeight: l.active ? 600 : 500,
            color: l.active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            backgroundColor: l.active ? "hsl(var(--primary) / 0.1)" : "transparent",
            textDecoration: "none", transition: "all 0.2s",
          }}>{l.label}</Link>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "2.5rem" }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Mes Produits</h1>
              <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>
                {products.length} produits dans votre catalogue
              </p>
            </div>
            <Link href="/dashboard/produits/nouveau" style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.25rem", borderRadius: "var(--radius-lg)",
              backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))",
              fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
              boxShadow: "0 4px 14px hsl(var(--primary) / 0.4)",
            }}>
              <Plus size={16} strokeWidth={3} /> Nouveau produit
            </Link>
          </div>

          {/* Search & Filter */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, maxWidth: "360px", backgroundColor: "hsl(var(--muted) / 0.5)", borderRadius: "var(--radius-lg)", padding: "0.5rem 1.25rem", border: "1px solid transparent", transition: "all 0.3s" }}>
              <Search size={16} color="hsl(var(--muted-foreground))" />
              <input type="text" placeholder="Rechercher un produit..." style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.875rem", color: "hsl(var(--foreground))", width: "100%" }} />
            </div>
            <select style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", fontSize: "0.875rem", backgroundColor: "hsl(var(--card))", color: "hsl(var(--foreground))", cursor: "pointer" }}>
              <option>Toutes catégories</option>
              <option>Mode</option>
              <option>Électronique</option>
              <option>Accessoires</option>
            </select>
          </div>
        </motion.div>

        {/* Products Table */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.5)",
            borderRadius: "calc(var(--radius) * 1.5)",
            overflow: "hidden",
          }}
        >
          {/* Table Header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto", gap: "1rem", padding: "1rem 1.5rem", borderBottom: "1px solid hsl(var(--border) / 0.5)", backgroundColor: "hsl(var(--muted) / 0.3)" }}>
            {["Produit", "Catégorie", "Prix", "Stock", "Statut", ""].map((h) => (
              <span key={h} style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {products.map((product, i) => {
            const s = statusBadge[product.status];
            return (
              <motion.div
                key={product.id}
                variants={fadeUp}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
                  gap: "1rem",
                  padding: "1.25rem 1.5rem",
                  alignItems: "center",
                  borderBottom: i < products.length - 1 ? "1px solid hsl(var(--border) / 0.3)" : "none",
                  transition: "background 0.15s",
                }}
              >
                {/* Product */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "var(--radius)", overflow: "hidden", flexShrink: 0, backgroundColor: "hsl(var(--muted))" }}>
                    <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{product.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.125rem" }}>
                      <TrendingUp size={11} /> {product.sales} ventes
                    </div>
                  </div>
                </div>

                {/* Category */}
                <span style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>{product.category}</span>

                {/* Price */}
                <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{product.price.toLocaleString()} F</span>

                {/* Stock */}
                <span style={{ fontSize: "0.875rem", color: product.stock === 0 ? "hsl(0 72% 51%)" : "hsl(var(--foreground))", fontWeight: product.stock === 0 ? 700 : 400 }}>
                  {product.stock === 0 ? "Épuisé" : `${product.stock} unités`}
                </span>

                {/* Status */}
                <span style={{ display: "inline-flex", alignItems: "center", padding: "0.3rem 0.75rem", borderRadius: "var(--radius)", fontSize: "0.75rem", fontWeight: 600, color: s.color, backgroundColor: s.bg, width: "fit-content" }}>
                  {s.label}
                </span>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button style={{ padding: "0.4rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "transparent", cursor: "pointer", color: "hsl(var(--muted-foreground))", transition: "all 0.2s" }}>
                    <Edit2 size={14} />
                  </button>
                  <button style={{ padding: "0.4rem", borderRadius: "var(--radius)", border: "1px solid hsl(0 72% 51% / 0.3)", background: "transparent", cursor: "pointer", color: "hsl(0 72% 51%)", transition: "all 0.2s" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
