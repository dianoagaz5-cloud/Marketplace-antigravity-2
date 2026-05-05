"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, ImagePlus, Tag, Package, Info } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "var(--radius)",
  border: "1px solid hsl(var(--border))",
  backgroundColor: "hsl(var(--muted) / 0.3)",
  color: "hsl(var(--foreground))",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 600,
  marginBottom: "0.5rem",
  color: "hsl(var(--foreground))",
};

export default function NouveauProduit() {
  const [dragOver, setDragOver] = useState(false);
  
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Back */}
      <Link href="/dashboard/produits" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", marginBottom: "2rem", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}>
        <ArrowLeft size={16} /> Retour aux produits
      </Link>

      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
        
        <motion.div variants={fadeUp}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Nouveau produit</h1>
          <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2.5rem" }}>Remplissez les informations pour mettre votre produit en ligne.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Photos */}
            <motion.div variants={fadeUp} style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "calc(var(--radius) * 1.5)", padding: "1.75rem" }}>
              <h2 style={{ fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ImagePlus size={18} color="hsl(var(--primary))" /> Photos du produit
              </h2>
              
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={() => setDragOver(false)}
                style={{
                  border: `2px dashed ${dragOver ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                  borderRadius: "var(--radius)",
                  padding: "3rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor: dragOver ? "hsl(var(--primary) / 0.05)" : "transparent",
                }}
              >
                <Upload size={32} color="hsl(var(--muted-foreground))" style={{ margin: "0 auto 1rem" }} />
                <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Glissez vos photos ici</p>
                <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", marginBottom: "1rem" }}>PNG, JPG jusqu'à 10Mo</p>
                <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, transition: "all 0.2s" }}>
                  <Upload size={14} /> Parcourir les fichiers
                  <input type="file" multiple accept="image/*" style={{ display: "none" }} />
                </label>
              </div>
            </motion.div>

            {/* Infos Générales */}
            <motion.div variants={fadeUp} style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "calc(var(--radius) * 1.5)", padding: "1.75rem" }}>
              <h2 style={{ fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Info size={18} color="hsl(var(--primary))" /> Informations générales
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Nom du produit *</label>
                  <input type="text" placeholder="Ex: Sneakers Premium Édition Limitée" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Description *</label>
                  <textarea rows={5} placeholder="Décrivez votre produit en détail : matériaux, dimensions, caractéristiques..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Prix & Stock */}
            <motion.div variants={fadeUp} style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "calc(var(--radius) * 1.5)", padding: "1.75rem" }}>
              <h2 style={{ fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Tag size={18} color="hsl(var(--primary))" /> Prix & Stock
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Prix (FCFA) *</label>
                  <input type="number" placeholder="0" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Quantité en stock *</label>
                  <input type="number" placeholder="0" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Prix barré (optionnel)</label>
                  <input type="number" placeholder="Prix original" style={{ ...inputStyle, color: "hsl(var(--muted-foreground))" }} />
                </div>
              </div>
            </motion.div>

            {/* Catégorie */}
            <motion.div variants={fadeUp} style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "calc(var(--radius) * 1.5)", padding: "1.75rem" }}>
              <h2 style={{ fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Package size={18} color="hsl(var(--primary))" /> Organisation
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>Catégorie *</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Sélectionner une catégorie</option>
                    <option>Mode & Vêtements</option>
                    <option>Électronique</option>
                    <option>Maison & Déco</option>
                    <option>Accessoires</option>
                    <option>Alimentation</option>
                    <option>Beauté & Santé</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Statut</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="draft">Brouillon</option>
                    <option value="active">Publier maintenant</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button style={{
                padding: "1rem", borderRadius: "9999px",
                backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))",
                fontWeight: 700, fontSize: "1rem", border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px hsl(var(--primary) / 0.4)",
                transition: "all 0.3s",
              }}>
                Publier le produit
              </button>
              <button style={{
                padding: "1rem", borderRadius: "9999px",
                backgroundColor: "transparent", color: "hsl(var(--foreground))",
                fontWeight: 600, fontSize: "0.9rem",
                border: "1px solid hsl(var(--border))", cursor: "pointer",
                transition: "all 0.2s",
              }}>
                Sauvegarder en brouillon
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
