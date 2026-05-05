"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Package, TrendingUp, ShoppingCart, Star, 
  Plus, ArrowUpRight, ArrowRight, BarChart3,
  Users, Eye, Settings, LogOut, Bell, 
  CheckCircle2, Clock, XCircle
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const stats = [
  { label: "Revenus ce mois", value: "312 500 FCFA", change: "+18%", icon: TrendingUp, positive: true },
  { label: "Commandes reçues", value: "47", change: "+12%", icon: ShoppingCart, positive: true },
  { label: "Produits en ligne", value: "23", change: "+3", icon: Package, positive: true },
  { label: "Note moyenne", value: "4.8 / 5", change: "+0.2", icon: Star, positive: true },
];

const recentOrders = [
  { id: "#ORD-001", client: "Amina Diallo", product: "Sneakers Premium", amount: "25 000 FCFA", status: "PAID" },
  { id: "#ORD-002", client: "Kofi Mensah", product: "Sac à dos cuir", amount: "18 500 FCFA", status: "PENDING" },
  { id: "#ORD-003", client: "Fatou Sow", product: "Montre Connectée", amount: "45 000 FCFA", status: "DELIVERED" },
  { id: "#ORD-004", client: "Yao Dupont", product: "Écouteurs Bluetooth", amount: "15 000 FCFA", status: "PAID" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PAID: { label: "Payée", color: "hsl(142 71% 45%)", icon: <CheckCircle2 size={14} /> },
  PENDING: { label: "En attente", color: "hsl(45 93% 47%)", icon: <Clock size={14} /> },
  DELIVERED: { label: "Livrée", color: "hsl(221 83% 53%)", icon: <CheckCircle2 size={14} /> },
  CANCELLED: { label: "Annulée", color: "hsl(0 72% 51%)", icon: <XCircle size={14} /> },
};

const sidebarLinks = [
  { icon: BarChart3, label: "Vue d'ensemble", href: "/dashboard", active: true },
  { icon: Package, label: "Mes produits", href: "/dashboard/produits" },
  { icon: ShoppingCart, label: "Commandes", href: "/dashboard/commandes" },
  { icon: Users, label: "Clients", href: "/dashboard/clients" },
  { icon: Eye, label: "Boutique publique", href: "/boutique" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/parametres" },
];

/* ── Activity Chart SVG Component (Histogram Style) ── */
function ActivityChart() {
  const [data, setData] = useState([40, 65, 52, 88, 70, 95, 82]);
  
  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(v => Math.max(20, Math.min(100, v + (Math.random() * 20 - 10)))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const barWidth = 8;
  const gap = (100 - (data.length * barWidth)) / (data.length - 1);

  return (
    <div style={{ width: "100%", height: "220px", marginTop: "1rem", position: "relative" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={100 - y} x2="100" y2={100 - y} stroke="hsl(var(--border) / 0.5)" strokeWidth="0.5" />
        ))}
        
        {/* Bars */}
        {data.map((val, i) => {
          const x = i * (barWidth + gap);
          return (
            <g key={i}>
              <motion.rect
                initial={{ height: 0, y: 100 }}
                animate={{ height: val, y: 100 - val }}
                transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: i * 0.05 }}
                x={x}
                y={100 - val}
                width={barWidth}
                height={val}
                fill="hsl(var(--primary))"
                rx="2"
                style={{ filter: "drop-shadow(0 4px 8px hsl(var(--primary) / 0.2))" }}
              />
              {/* Tooltip-like value (subtle) */}
              <text 
                x={x + barWidth/2} 
                y={100 - val - 5} 
                textAnchor="middle" 
                style={{ fontSize: "4px", fontWeight: 800, fill: "hsl(var(--primary))", opacity: 0.8 }}
              >
                {Math.round(val)}%
              </text>
            </g>
          );
        })}
      </svg>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", fontWeight: 700 }}>
        <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user || user.role !== "VENDOR") {
    return (
      <div style={{ padding: "5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Accès réservé aux vendeurs</h2>
        <p style={{ marginTop: "1rem" }}>Veuillez vous connecter avec un compte vendeur.</p>
        <Link href="/auth/login" style={{ display: "inline-block", marginTop: "1.5rem", color: "hsl(var(--primary))", fontWeight: 600 }}>Se connecter</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "hsl(var(--background))" }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: "260px", flexShrink: 0, borderRight: "1px solid hsl(var(--border) / 0.5)",
        padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem",
        position: "sticky", top: 0, height: "100vh", backgroundColor: "hsl(var(--card))",
      }}>
        <div style={{ padding: "0.5rem 0.75rem", marginBottom: "2rem" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "var(--radius)", background: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem" }}>M</div>
            <span style={{ color: "hsl(var(--foreground))" }}>Market<span style={{ color: "hsl(var(--primary))" }}>Bénin</span></span>
          </Link>
          <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "hsl(var(--muted))", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "var(--radius)", backgroundColor: "hsl(var(--primary) / 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "hsl(var(--primary))", flexShrink: 0, overflow: "hidden" }}>
              {user.avatar ? <img src={user.avatar} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : user.name[0]}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))", fontWeight: 600 }}>Vendeur Certifié ✓</div>
            </div>
          </div>
        </div>

        {sidebarLinks.map((link) => (
          <Link key={link.href} href={link.href} style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.75rem 1rem", borderRadius: "var(--radius)", fontSize: "0.875rem",
            fontWeight: link.active ? 700 : 500, color: link.active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            backgroundColor: link.active ? "hsl(var(--primary) / 0.1)" : "transparent",
            transition: "all 0.2s", textDecoration: "none",
          }}>
            <link.icon size={18} />
            {link.label}
          </Link>
        ))}

        <div style={{ flex: 1 }} />

        <button 
          onClick={logout}
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.75rem 1rem", borderRadius: "var(--radius)",
            fontSize: "0.875rem", fontWeight: 600, color: "hsl(var(--muted-foreground))",
            background: "none", border: "none", cursor: "pointer",
          }}
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "2.5rem", overflow: "auto" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}
        >
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Vue d'ensemble</h1>
            <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "0.25rem", fontWeight: 500 }}>Dashboard Professionnel · 2026</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button style={{ position: "relative", padding: "0.6rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", cursor: "pointer" }}>
              <Bell size={20} color="hsl(var(--foreground))" />
              <span style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "hsl(var(--primary))", border: "2px solid hsl(var(--card))" }} />
            </button>
            <Link href="/dashboard/produits/nouveau" style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              padding: "0.75rem 1.5rem", borderRadius: "var(--radius-lg)",
              backgroundColor: "hsl(var(--primary))", color: "white",
              fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
              boxShadow: "0 6px 20px hsl(var(--primary) / 0.25)",
            }}>
              <Plus size={18} strokeWidth={3} /> Nouveau produit
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} style={{
              backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)",
              borderRadius: "var(--radius-lg)", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ padding: "0.75rem", borderRadius: "var(--radius)", backgroundColor: "hsl(var(--primary) / 0.1)" }}>
                  <stat.icon size={22} color="hsl(var(--primary))" />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: stat.positive ? "hsl(var(--success))" : "hsl(var(--danger))", backgroundColor: stat.positive ? "hsl(var(--success) / 0.1)" : "hsl(var(--danger) / 0.1)", padding: "0.3rem 0.6rem", borderRadius: "var(--radius)" }}>
                  {stat.change}
                </span>
              </div>
              <div>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.02em" }}>{stat.value}</div>
                <div style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem", fontWeight: 600 }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity Graph Section */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "var(--radius-lg)", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontWeight: 800, fontSize: "1.125rem" }}>Évolution de l'activité</h2>
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))" }}>Volume de ventes des 7 derniers jours</p>
            </div>
            <select style={{ padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)", fontSize: "0.8rem", fontWeight: 600, outline: "none" }}>
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>
          <ActivityChart />
        </motion.div>

        {/* Recent Orders Table */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show" style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <div style={{ padding: "1.5rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
              <h2 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Dernières commandes</h2>
              <Link href="/dashboard/commandes" style={{ fontSize: "0.85rem", color: "hsl(var(--primary))", fontWeight: 700 }}>Voir tout</Link>
            </div>
            {recentOrders.map((order, i) => {
              const s = statusConfig[order.status];
              return (
                <div key={order.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.75rem", borderBottom: i < recentOrders.length - 1 ? "1px solid hsl(var(--border) / 0.3)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "var(--radius)", background: "hsl(var(--muted) / 0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Package size={18} color="hsl(var(--muted-foreground))" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{order.product}</div>
                      <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))" }}>{order.client} · {order.id}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{order.amount}</div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: s.color, display: "flex", alignItems: "center", gap: "0.25rem", justifyContent: "flex-end" }}>{s.icon} {s.label}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "1rem" }}>Objectif mensuel</h3>
              <div style={{ height: "10px", background: "hsl(var(--muted))", borderRadius: "var(--radius)", overflow: "hidden", marginBottom: "0.75rem" }}>
                <div style={{ height: "100%", width: "62%", background: "hsl(var(--primary))", borderRadius: "var(--radius)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>62% de l'objectif</span>
                <span style={{ fontWeight: 800 }}>312k / 500k</span>
              </div>
            </div>

            <div style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "1.25rem" }}>Actions rapides</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "Gérer mes produits", icon: Package, href: "/dashboard/produits" },
                  { label: "Paramètres boutique", icon: Settings, href: "/dashboard/parametres" },
                  { label: "Contacter le support", icon: MessageCircle, href: "/aide" }
                ].map(a => (
                  <Link key={a.label} href={a.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem", borderRadius: "var(--radius)", border: "1.5px solid hsl(var(--border))", textDecoration: "none", color: "hsl(var(--foreground))", fontSize: "0.875rem", fontWeight: 700 }}>
                    <a.icon size={18} color="hsl(var(--primary))" /> {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper icons needed for Quick Actions that weren't in initial imports
import { MessageCircle } from "lucide-react";
