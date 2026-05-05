"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Camera, Image as ImageIcon, Save, User, Mail, Shield, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileSettingsPage() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  if (!user) return <div style={{ padding: "5rem", textAlign: "center" }}>Veuillez vous connecter.</div>;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Paramètres du Profil</h1>
        <p style={{ color: "hsl(var(--muted-foreground))" }}>Gérez vos informations et votre identité visuelle sur MarketBénin.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3rem" }}>
        
        {/* Form Column */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Banner Upload */}
          <div style={{ position: "relative" }}>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.75rem" }}>Bannière du profil</label>
            <div 
              style={{ 
                height: "180px", 
                borderRadius: "var(--radius-lg)", 
                background: user.banner ? `url(${user.banner}) center/cover no-repeat` : "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05))",
                border: "2px dashed hsl(var(--border))",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <button 
                type="button"
                onClick={() => bannerRef.current?.click()}
                style={{ 
                  position: "absolute", bottom: "1rem", right: "1rem", 
                  padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", 
                  background: "white", color: "black", border: "none", 
                  fontSize: "0.8rem", fontWeight: 600, display: "flex", 
                  alignItems: "center", gap: "0.5rem", cursor: "pointer",
                  boxShadow: "var(--shadow-md)"
                }}
              >
                <Camera size={14} /> Modifier la bannière
              </button>
              <input ref={bannerRef} type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, "banner")} />
            </div>
          </div>

          {/* Identity Section */}
          <div style={{ background: "hsl(var(--card))", padding: "2rem", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <User size={18} /> Informations personnelles
            </h3>
            
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Nom d'affichage</label>
                <input 
                  type="text" 
                  defaultValue={user.name} 
                  style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "transparent", outline: "none" }} 
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Email</label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: "var(--radius)", background: "hsl(var(--muted) / 0.5)", color: "hsl(var(--muted-foreground))", fontSize: "0.9rem" }}>
                  <Mail size={14} /> {user.email}
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Rôle</label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: "var(--radius)", background: "hsl(var(--muted) / 0.5)", color: "hsl(var(--muted-foreground))", fontSize: "0.9rem" }}>
                  <Shield size={14} /> {user.role}
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: "1rem", borderRadius: "var(--radius-full)", 
              background: "hsl(var(--primary))", color: "white", 
              fontWeight: 700, border: "none", cursor: loading ? "wait" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              transition: "all 0.2s"
            }}
          >
            {loading ? "Enregistrement..." : <><Save size={18} /> Enregistrer les modifications</>}
          </button>

          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ padding: "0.75rem", borderRadius: "var(--radius)", background: "hsl(var(--success) / 0.1)", color: "hsl(var(--success))", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
              >
                <CheckCircle2 size={16} /> Profil mis à jour avec succès !
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Preview Column */}
        <div style={{ position: "sticky", top: "100px", height: "fit-content" }}>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.75rem" }}>Aperçu de votre profil</label>
          <div style={{ background: "hsl(var(--card))", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ height: "100px", background: user.banner ? `url(${user.banner}) center/cover no-repeat` : "hsl(var(--primary) / 0.1)" }}></div>
            <div style={{ padding: "0 1.5rem 1.5rem", textAlign: "center", marginTop: "-40px" }}>
              <div 
                onClick={() => avatarRef.current?.click()}
                style={{ 
                  width: "80px", height: "80px", borderRadius: "50%", 
                  background: user.avatar ? `url(${user.avatar}) center/cover no-repeat` : "hsl(var(--primary))",
                  border: "4px solid hsl(var(--card))", margin: "0 auto",
                  position: "relative", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: "1.5rem", fontWeight: 800
                }}
              >
                {!user.avatar && user.name[0]}
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "black/30", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }} className="avatar-hover">
                  <Camera size={20} />
                </div>
              </div>
              <input ref={avatarRef} type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, "avatar")} />
              
              <h3 style={{ marginTop: "0.75rem", fontWeight: 700 }}>{user.name}</h3>
              <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>{user.role === "ADMIN" ? "Administrateur" : "Client"}</p>
              
              <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div style={{ padding: "0.75rem", borderRadius: "var(--radius)", background: "hsl(var(--muted) / 0.5)" }}>
                  <div style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", fontWeight: 700 }}>Ventes</div>
                  <div style={{ fontWeight: 800 }}>0</div>
                </div>
                <div style={{ padding: "0.75rem", borderRadius: "var(--radius)", background: "hsl(var(--muted) / 0.5)" }}>
                  <div style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", fontWeight: 700 }}>Avis</div>
                  <div style={{ fontWeight: 800 }}>—</div>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            .avatar-hover:hover { opacity: 1 !important; }
          `}</style>
        </div>
      </div>
    </div>
  );
}
