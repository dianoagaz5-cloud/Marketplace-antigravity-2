"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, Camera, Mail, Phone, MapPin, 
  Save, CreditCard, Bell, Shield, CheckCircle2,
  Trash2, Globe, Store, User
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", borderRadius: "var(--radius)",
  border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--muted) / 0.3)",
  color: "hsl(var(--foreground))", fontSize: "0.9rem", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box" as const,
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)",
  borderRadius: "calc(var(--radius) * 1.5)", padding: "2rem",
};

export default function DashboardParametres() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  if (!user || user.role !== "VENDOR") {
    return <div style={{ padding: "5rem", textAlign: "center" }}>Accès réservé aux vendeurs.</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "banner") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ [type]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "hsl(var(--background))" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", flexShrink: 0, borderRight: "1px solid hsl(var(--border) / 0.5)", padding: "2rem 1rem", position: "sticky", top: 0, height: "100vh", backgroundColor: "hsl(var(--card))", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ padding: "0.5rem 0.75rem", marginBottom: "2rem" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem" }}>M</div>
            <span style={{ color: "hsl(var(--foreground))" }}>Market<span style={{ color: "hsl(var(--primary))" }}>Bénin</span></span>
          </Link>
        </div>
        {[
          { label: "Vue d'ensemble", href: "/dashboard", icon: Store },
          { label: "Mes produits", href: "/dashboard/produits", icon: Package },
          { label: "Commandes", href: "/dashboard/commandes", icon: CreditCard },
          { label: "Paramètres", href: "/dashboard/parametres", icon: Shield, active: true },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{ 
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.75rem 1rem", borderRadius: "var(--radius)", fontSize: "0.875rem", 
            fontWeight: l.active ? 600 : 500, color: l.active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))", 
            backgroundColor: l.active ? "hsl(var(--primary) / 0.1)" : "transparent", 
            textDecoration: "none", transition: "all 0.2s" 
          }}>
            <l.icon size={18} />
            {l.label}
          </Link>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "2.5rem", maxWidth: "1000px" }}>
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          
          <motion.div variants={fadeUp}>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>Paramètres Boutique</h1>
            <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2.5rem" }}>Personnalisez votre identité visuelle et gérez vos informations professionnelles.</p>
          </motion.div>

          <form onSubmit={handleSave}>
            {/* Bannière & Profil */}
            <motion.div variants={fadeUp} style={{ ...sectionStyle, marginBottom: "2rem", padding: 0, overflow: "hidden" }}>
              <div 
                style={{ 
                  height: "160px", background: user.banner ? `url(${user.banner}) center/cover no-repeat` : "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.05))",
                  position: "relative", display: "flex", alignItems: "flex-end", padding: "1.5rem"
                }}
              >
                <button 
                  type="button" 
                  onClick={() => bannerRef.current?.click()}
                  style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", background: "white", color: "black", border: "none", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", gap: "0.375rem" }}
                >
                  <Camera size={14} /> Changer la bannière
                </button>
                <input ref={bannerRef} type="file" hidden accept="image/*" onChange={e => handleFileChange(e, "banner")} />

                <div style={{ position: "relative", marginBottom: "-40px" }}>
                  <div 
                    onClick={() => avatarRef.current?.click()}
                    style={{ 
                      width: "80px", height: "80px", borderRadius: "50%", background: user.avatar ? `url(${user.avatar}) center/cover no-repeat` : "hsl(var(--primary))",
                      border: "4px solid hsl(var(--card))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.5rem", fontWeight: 800, overflow: "hidden"
                    }}
                  >
                    {!user.avatar && user.name[0]}
                  </div>
                  <button type="button" onClick={() => avatarRef.current?.click()} style={{ position: "absolute", bottom: 0, right: 0, padding: "0.35rem", backgroundColor: "hsl(var(--primary))", borderRadius: "50%", border: "2px solid white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Camera size={12} color="white" />
                  </button>
                  <input ref={avatarRef} type="file" hidden accept="image/*" onChange={e => handleFileChange(e, "avatar")} />
                </div>
              </div>
              <div style={{ padding: "3rem 2rem 2rem" }}>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{user.name}</div>
                <div style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))" }}>Boutique active depuis 2026</div>
              </div>
            </motion.div>

            {/* Shop Info */}
            <motion.div variants={fadeUp} style={{ ...sectionStyle, marginBottom: "2rem" }}>
              <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1rem" }}>
                <Store size={20} color="hsl(var(--primary))" /> Détails de la boutique
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.625rem" }}>Nom public de la boutique</label>
                    <input type="text" defaultValue={user.name} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.625rem" }}>Secteur d'activité</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }}>
                      <option>Mode & Accessoires</option>
                      <option>Électronique & Gadgets</option>
                      <option>Artisanat & Déco</option>
                      <option>Services & Freelance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.625rem" }}>Description (Bio)</label>
                  <textarea rows={4} defaultValue="Spécialiste béninois des sneakers haut de gamme et accessoires de mode importés. Qualité garantie." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                </div>
              </div>
            </motion.div>

            {/* Contact & Bio */}
            <motion.div variants={fadeUp} style={{ ...sectionStyle, marginBottom: "2rem" }}>
              <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1rem" }}>
                <Globe size={20} color="hsl(var(--primary))" /> Contact & Visibilité
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.625rem" }}>Email professionnel</label>
                  <input type="email" defaultValue={user.email} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.625rem" }}>Numéro WhatsApp Business</label>
                  <input type="tel" placeholder="+229 00 00 00 00" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.625rem" }}>Ville de résidence</label>
                  <input type="text" placeholder="Ex: Cotonou, Akpakpa" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.625rem" }}>Site web (optionnel)</label>
                  <input type="url" placeholder="https://..." style={inputStyle} />
                </div>
              </div>
            </motion.div>

            {/* Action Bar */}
            <motion.div variants={fadeUp} style={{ position: "sticky", bottom: "2rem", zIndex: 10 }}>
              <button 
                type="submit"
                disabled={loading}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  width: "100%", padding: "1.125rem", borderRadius: "var(--radius-full)",
                  backgroundColor: "hsl(var(--primary))", color: "white",
                  fontWeight: 800, fontSize: "1rem", border: "none", cursor: loading ? "wait" : "pointer",
                  boxShadow: "0 8px 24px hsl(var(--primary) / 0.35)", transition: "all 0.3s",
                }}
              >
                {loading ? "Enregistrement en cours..." : <><Save size={18} /> Enregistrer tous les changements</>}
              </button>
              <AnimatePresence>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                      marginTop: "1rem", padding: "0.875rem", borderRadius: "var(--radius)", 
                      background: "hsl(var(--success) / 0.1)", color: "hsl(var(--success))", 
                      fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center",
                      border: "1px solid hsl(var(--success) / 0.2)"
                    }}
                  >
                    <CheckCircle2 size={18} /> Vos paramètres ont été mis à jour avec succès !
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
