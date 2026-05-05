"use client";

import Link from "next/link";
import { ArrowLeft, Upload, ImagePlus, Tag, Package, Info } from "lucide-react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 1rem",
  borderRadius: "var(--radius)",
  border: "1.5px solid hsl(var(--border))",
  backgroundColor: "hsl(var(--muted) / 0.4)",
  color: "hsl(var(--foreground))",
  fontSize: "0.925rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.15s",
  boxSizing: "border-box" as const,
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border) / 0.7)",
  borderRadius: "var(--radius-xl)",
  padding: "2rem",
};

export default function VendreProduitPage() {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>
      <Link href="/vendre" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", fontWeight: 500, marginBottom: "2.5rem", textDecoration: "none" }}>
        <ArrowLeft size={16} /> Retour
      </Link>

      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>Publier un produit</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.95rem" }}>Remplissez les informations ci-dessous pour mettre votre produit en ligne.</p>
      </div>

      <form onSubmit={e => e.preventDefault()} style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Photos */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ImagePlus size={18} style={{ color: "hsl(var(--primary))" }} /> Photos du produit
            </h2>
            <label style={{ display: "block", border: "2px dashed hsl(var(--border))", borderRadius: "var(--radius-lg)", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", transition: "border-color 0.15s, background 0.15s" }}>
              <Upload size={32} style={{ color: "hsl(var(--muted-foreground))", margin: "0 auto 1rem", display: "block", opacity: 0.5 }} />
              <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Glissez vos photos ici</p>
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", marginBottom: "1rem" }}>PNG, JPG — jusqu'à 10 Mo</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", borderRadius: "var(--radius-full)", border: "1.5px solid hsl(var(--border))", fontSize: "0.875rem", fontWeight: 600 }}>
                <Upload size={14} /> Parcourir les fichiers
              </span>
              <input type="file" multiple accept="image/*" style={{ display: "none" }} />
            </label>
          </div>

          {/* Description */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Info size={18} style={{ color: "hsl(var(--primary))" }} /> Informations générales
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Nom du produit *</label>
                <input type="text" required placeholder="Ex: Sneakers Premium Nike Air" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Description détaillée *</label>
                <textarea required rows={5} placeholder="Matériaux, dimensions, caractéristiques, état..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Prix & Stock */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Tag size={18} style={{ color: "hsl(var(--primary))" }} /> Prix & Stock
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Prix de vente (FCFA) *</label>
                <input type="number" required placeholder="0" min={0} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Prix barré (optionnel)</label>
                <input type="number" placeholder="Prix original" min={0} style={{ ...inputStyle, color: "hsl(var(--muted-foreground))" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Quantité en stock *</label>
                <input type="number" required placeholder="0" min={0} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Catégorie */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Package size={18} style={{ color: "hsl(var(--primary))" }} /> Catégorie & Statut
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Catégorie *</label>
                <select required style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Sélectionner...</option>
                  <option>Mode & Vêtements</option>
                  <option>Électronique & Informatique</option>
                  <option>Maison & Décoration</option>
                  <option>Bijoux & Accessoires</option>
                  <option>Alimentation & Épicerie</option>
                  <option>Sport & Fitness</option>
                  <option>Beauté & Santé</option>
                  <option>Enfants & Jouets</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Ville / Lieu d'expédition</label>
                <input type="text" placeholder="Ex: Cotonou, Akpakpa" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Publication</label>
                <select style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="active">Publier immédiatement</option>
                  <option value="draft">Sauvegarder en brouillon</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <button type="submit" style={{ width: "100%", padding: "1rem", borderRadius: "var(--radius-full)", background: "hsl(var(--primary))", color: "white", border: "none", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)", fontFamily: "inherit" }}>
            Publier le produit
          </button>
          <button type="button" style={{ width: "100%", padding: "0.875rem", borderRadius: "var(--radius-full)", background: "transparent", color: "hsl(var(--foreground))", border: "1.5px solid hsl(var(--border))", fontWeight: 600, fontSize: "0.925rem", cursor: "pointer", fontFamily: "inherit" }}>
            Sauvegarder en brouillon
          </button>

          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>
            En publiant, vous acceptez les{" "}
            <Link href="/cgu" style={{ color: "hsl(var(--primary))" }}>conditions de vente</Link>{" "}
            de MarketBénin. Une commission de 5% s'applique sur chaque vente.
          </p>
        </div>
      </form>
    </div>
  );
}
