"use client";

import { motion } from "framer-motion";
import { Search, Package, CheckCircle2, Clock, XCircle, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

const orders = [
  { id: "#ORD-047", client: "Amina Diallo", email: "amina@gmail.com", product: "Sneakers Premium", amount: 25000, date: "30 Avr 2026", status: "PAID" },
  { id: "#ORD-046", client: "Kofi Mensah", email: "kofi@email.com", product: "Sac à dos cuir", amount: 18500, date: "29 Avr 2026", status: "PENDING" },
  { id: "#ORD-045", client: "Fatou Sow", email: "fatou@mail.bj", product: "Montre Connectée", amount: 45000, date: "28 Avr 2026", status: "DELIVERED" },
  { id: "#ORD-044", client: "Yao Dupont", email: "yao@yahoo.com", product: "Écouteurs Bluetooth", amount: 15000, date: "28 Avr 2026", status: "PAID" },
  { id: "#ORD-043", client: "Rosine Adjo", email: "rosine@benin.com", product: "Lunettes de soleil", amount: 10000, date: "27 Avr 2026", status: "CANCELLED" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  PAID: { label: "Payée", color: "hsl(142 71% 45%)", bg: "hsl(142 71% 45% / 0.1)", icon: <CheckCircle2 size={14} /> },
  PENDING: { label: "En attente", color: "hsl(45 93% 47%)", bg: "hsl(45 93% 47% / 0.1)", icon: <Clock size={14} /> },
  DELIVERED: { label: "Livrée", color: "hsl(221 83% 53%)", bg: "hsl(221 83% 53% / 0.1)", icon: <Truck size={14} /> },
  CANCELLED: { label: "Annulée", color: "hsl(0 72% 51%)", bg: "hsl(0 72% 51% / 0.1)", icon: <XCircle size={14} /> },
};

const tabs = ["Toutes", "En attente", "Payées", "Livrées", "Annulées"];

export default function DashboardCommandes() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "hsl(var(--background))" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", flexShrink: 0, borderRight: "1px solid hsl(var(--border) / 0.5)", padding: "2rem 1rem", position: "sticky", top: 0, height: "100vh", backgroundColor: "hsl(var(--card))", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ padding: "0.5rem 0.75rem", marginBottom: "2rem" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Package size={20} color="hsl(var(--primary))" />
            <span style={{ color: "hsl(var(--foreground))" }}>Market<span style={{ color: "hsl(var(--primary))" }}>Bénin</span></span>
          </Link>
        </div>
        {[
          { label: "Vue d'ensemble", href: "/dashboard" },
          { label: "Mes produits", href: "/dashboard/produits" },
          { label: "Commandes", href: "/dashboard/commandes", active: true },
          { label: "Paramètres", href: "/dashboard/parametres" },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{ padding: "0.75rem 1rem", borderRadius: "var(--radius)", fontSize: "0.875rem", fontWeight: l.active ? 600 : 500, color: l.active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))", backgroundColor: l.active ? "hsl(var(--primary) / 0.1)" : "transparent", textDecoration: "none", transition: "all 0.2s" }}>{l.label}</Link>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "2.5rem" }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>Commandes</h1>
          <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2.5rem" }}>Gérez et suivez toutes vos commandes en temps réel.</p>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid hsl(var(--border) / 0.5)", marginBottom: "2rem" }}>
            {tabs.map((tab, i) => (
              <button key={tab} style={{
                padding: "0.75rem 1.25rem",
                borderBottom: i === 0 ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                color: i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                fontWeight: i === 0 ? 600 : 500, fontSize: "0.875rem",
                background: "none", border: "none", borderBottom: i === 0 ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                cursor: "pointer", transition: "all 0.2s",
              }}>{tab}</button>
            ))}
          </div>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", maxWidth: "360px", backgroundColor: "hsl(var(--muted) / 0.5)", borderRadius: "var(--radius-lg)", padding: "0.5rem 1.25rem", marginBottom: "1.5rem", border: "1px solid transparent" }}>
            <Search size={16} color="hsl(var(--muted-foreground))" />
            <input type="text" placeholder="N° commande, client..." style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.875rem", color: "hsl(var(--foreground))", width: "100%" }} />
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", borderRadius: "calc(var(--radius) * 1.5)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr auto", gap: "1rem", padding: "1rem 1.5rem", borderBottom: "1px solid hsl(var(--border) / 0.5)", backgroundColor: "hsl(var(--muted) / 0.3)" }}>
            {["Commande", "Client", "Montant", "Date", "Statut", ""].map((h) => (
              <span key={h} style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
            ))}
          </div>

          {orders.map((order, i) => {
            const s = statusConfig[order.status];
            return (
              <motion.div key={order.id} variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 1fr 1fr 1fr auto", gap: "1rem", padding: "1.25rem 1.5rem", alignItems: "center", borderBottom: i < orders.length - 1 ? "1px solid hsl(var(--border) / 0.3)" : "none" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "hsl(var(--primary))" }}>{order.id}</div>
                  <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", marginTop: "0.125rem" }}>{order.product}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{order.client}</div>
                  <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{order.email}</div>
                </div>
                <span style={{ fontWeight: 700 }}>{order.amount.toLocaleString()} F</span>
                <span style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>{order.date}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.3rem 0.75rem", borderRadius: "var(--radius)", fontSize: "0.75rem", fontWeight: 600, color: s.color, backgroundColor: s.bg, width: "fit-content" }}>
                  {s.icon} {s.label}
                </span>
                <button style={{ padding: "0.4rem 0.75rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "transparent", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, color: "hsl(var(--foreground))", display: "flex", alignItems: "center", gap: "0.25rem", transition: "all 0.2s" }}>
                  Détail <ArrowRight size={12} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
