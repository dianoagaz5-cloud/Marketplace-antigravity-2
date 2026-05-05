"use client";

import { motion } from "framer-motion";
import { 
  User, Package, Heart, Settings, 
  LogOut, Shield, ChevronRight, Bell,
  CreditCard, MapPin, MessageSquare, HelpCircle
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { favorites } = useWishlist();

  if (!user) {
    return (
      <div style={{ padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Veuillez vous connecter</h2>
        <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "1rem" }}>Vous devez être connecté pour accéder à votre profil.</p>
        <Link href="/auth/login" style={{ display: "inline-block", marginTop: "1.5rem", padding: "0.75rem 1.5rem", background: "hsl(var(--primary))", color: "white", borderRadius: "var(--radius-lg)", fontWeight: 700, textDecoration: "none" }}>Se connecter</Link>
      </div>
    );
  }

  const menuGroups = [
    {
      title: "Mon Activité",
      items: [
        { icon: Package, label: "Mes Commandes", desc: "Suivre mes achats en cours", href: "/profile/commandes" },
        { icon: Heart, label: "Ma Liste d'Envies", desc: `${favorites.length} articles sauvegardés`, href: "/favoris" },
        { icon: MessageSquare, label: "Mes Messages", desc: "Discussions avec les vendeurs", href: "#" },
      ]
    },
    {
      title: "Paramètres & Sécurité",
      items: [
        { icon: Settings, label: "Informations du profil", desc: "Nom, email, mot de passe", href: "/profile/settings" },
        { icon: MapPin, label: "Adresses de livraison", desc: "Gérer mes adresses au Bénin", href: "#" },
        { icon: CreditCard, label: "Moyens de paiement", desc: "MoMo, Moov, Cartes", href: "#" },
      ]
    },
    {
      title: "Assistance",
      items: [
        { icon: HelpCircle, label: "Centre d'aide", desc: "FAQ et support technique", href: "/aide" },
      ]
    }
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
        
        {/* Header Profil */}
        <motion.div variants={fadeUp} style={{ 
          display: "flex", alignItems: "center", gap: "1.5rem", 
          padding: "2rem", background: "hsl(var(--card))", 
          borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border) / 0.5)",
          marginBottom: "2rem", boxShadow: "var(--shadow-sm)"
        }}>
          <div style={{ 
            width: "80px", height: "80px", borderRadius: "var(--radius-lg)", 
            background: "hsl(var(--primary))", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem", fontWeight: 800, flexShrink: 0, overflow: "hidden"
          }}>
            {user.avatar ? <img src={user.avatar} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.name[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{user.name}</h1>
              <span style={{ 
                padding: "4px 10px", background: "hsl(var(--muted))", 
                fontSize: "0.7rem", fontWeight: 800, borderRadius: "var(--radius-sm)",
                color: "hsl(var(--muted-foreground))", textTransform: "uppercase"
              }}>
                {user.role === "VENDOR" ? "Vendeur" : user.role === "ADMIN" ? "Admin" : "Client"}
              </span>
            </div>
            <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.9rem", marginTop: "0.25rem" }}>{user.email}</p>
          </div>
          <button 
            onClick={logout}
            style={{ padding: "0.75rem", borderRadius: "var(--radius)", border: "1.5px solid hsl(var(--border))", background: "transparent", color: "hsl(var(--danger))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            title="Déconnexion"
          >
            <LogOut size={20} />
          </button>
        </motion.div>

        {/* Dashboard Shortcut for VENDORS */}
        {user.role === "VENDOR" && (
          <motion.div variants={fadeUp}>
            <Link href="/dashboard" style={{ 
              display: "flex", alignItems: "center", gap: "1rem", 
              padding: "1.5rem", background: "hsl(var(--primary))", color: "white",
              borderRadius: "var(--radius-lg)", textDecoration: "none",
              marginBottom: "2rem", boxShadow: "0 6px 20px hsl(var(--primary) / 0.2)"
            }}>
              <Shield size={24} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Accéder au Dashboard Vendeur</div>
                <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>Gérer vos produits, ventes et revenus</div>
              </div>
              <ChevronRight size={20} />
            </Link>
          </motion.div>
        )}

        {/* Menu Groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {menuGroups.map((group, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <h2 style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted-foreground))", marginBottom: "1rem", paddingLeft: "0.5rem" }}>
                {group.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {group.items.map((item, i) => (
                  <Link key={i} href={item.href} style={{ 
                    display: "flex", alignItems: "center", gap: "1.25rem", 
                    padding: "1.25rem", background: "hsl(var(--card))", 
                    borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border) / 0.5)",
                    textDecoration: "none", color: "hsl(var(--foreground))",
                    transition: "all 0.2s var(--ease-out)"
                  }} className="profile-menu-item">
                    <div style={{ 
                      width: "42px", height: "42px", borderRadius: "var(--radius)", 
                      background: "hsl(var(--muted) / 0.5)", display: "flex", 
                      alignItems: "center", justifyContent: "center", color: "hsl(var(--primary))", flexShrink: 0
                    }}>
                      <item.icon size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "1rem" }}>{item.label}</div>
                      <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginTop: "0.125rem" }}>{item.desc}</div>
                    </div>
                    <ChevronRight size={18} style={{ color: "hsl(var(--muted-foreground))", opacity: 0.5 }} />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>

      <style>{`
        .profile-menu-item:hover {
          transform: translateX(4px);
          border-color: hsl(var(--primary) / 0.3);
          background-color: hsl(var(--muted) / 0.2);
        }
      `}</style>
    </div>
  );
}
