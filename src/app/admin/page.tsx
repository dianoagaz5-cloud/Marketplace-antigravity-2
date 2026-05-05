"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Users, ShoppingBag, DollarSign, Briefcase, 
  TrendingUp, Search, MoreVertical, CheckCircle2, 
  XCircle, Clock, LayoutDashboard, ShieldCheck,
  UserPlus, Mail, Ban, Edit, Trash2, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_VENDORS = [
  { id: 1, name: "Artisans Ganvié", email: "contact@ganvie.bj", status: "Approved", date: "2026-04-28", cat: "Artisanat", sales: 450000 },
  { id: 2, name: "Bénin Tech Store", email: "sales@benintech.bj", status: "Pending", date: "2026-04-29", cat: "Électronique", sales: 0 },
  { id: 3, name: "Mode Porto-Novo", email: "info@modeporto.bj", status: "Approved", date: "2026-04-27", cat: "Mode", sales: 125000 },
  { id: 4, name: "Cuisine Abomey", email: "chef@abomey.bj", status: "Pending", date: "2026-04-30", cat: "Alimentation", sales: 0 },
];

const INITIAL_USERS = [
  { id: 1, name: "Jean Dupont", email: "jean@gmail.com", role: "CUSTOMER", joined: "2026-01-15", orders: 12 },
  { id: 2, name: "Kofi Boutique", email: "vendeur@demo.bj", role: "VENDOR", joined: "2026-02-10", orders: 2 },
  { id: 3, name: "Admin MarketBénin", email: "admin@demo.bj", role: "ADMIN", joined: "2025-12-01", orders: 0 },
  { id: 4, name: "Amina Soglo", email: "amina@outlook.fr", role: "CUSTOMER", joined: "2026-04-05", orders: 5 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");

  if (!user || user.role !== "ADMIN") {
    return (
      <div style={{ padding: "5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "hsl(var(--danger))" }}>Accès Refusé</h2>
        <p style={{ marginTop: "1rem" }}>Vous n'avez pas les droits d'administrateur pour accéder à cette page.</p>
      </div>
    );
  }

  const updateVendorStatus = (id: number, status: "Approved" | "Rejected") => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const deleteUser = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const filteredVendors = vendors.filter(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--muted) / 0.3)" }}>
      
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "3rem 2rem" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ShieldCheck size={32} style={{ color: "hsl(var(--primary))" }} /> Administration
            </h1>
            <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "0.5rem" }}>Tableau de bord de contrôle centralisé.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", background: "hsl(var(--card))", padding: "0.375rem", borderRadius: "var(--radius-full)", border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-sm)" }}>
            {["overview", "vendors", "users"].map(tab => (
              <button 
                key={tab} 
                onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
                style={{ 
                  padding: "0.5rem 1.25rem", borderRadius: "var(--radius-full)", border: "none",
                  background: activeTab === tab ? "hsl(var(--primary))" : "transparent",
                  color: activeTab === tab ? "white" : "hsl(var(--muted-foreground))",
                  fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                  textTransform: "capitalize"
                }}
              >
                {tab === "overview" ? "Vue d'ensemble" : tab === "vendors" ? "Vendeurs" : "Utilisateurs"}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar for list views */}
        {activeTab !== "overview" && (
          <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, background: "white", padding: "0.75rem 1rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))" }}>
              <Search size={18} style={{ color: "hsl(var(--muted-foreground))" }} />
              <input 
                type="text" 
                placeholder={`Rechercher un ${activeTab === "vendors" ? "vendeur" : "utilisateur"}...`} 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%", fontSize: "0.9rem", background: "transparent" }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                {[
                  { label: "Utilisateurs", value: users.length, icon: Users, color: "blue", growth: "+12%" },
                  { label: "Vendeurs", value: vendors.length, icon: Briefcase, color: "purple", growth: "+5%" },
                  { label: "Produits", value: "3,420", icon: ShoppingBag, color: "orange", growth: "+18%" },
                  { label: "Ventes Totales", value: "1,850,000 F", icon: DollarSign, color: "green", growth: "+24%" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "hsl(var(--card))", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: `hsl(var(--primary) / 0.1)`, color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <s.icon size={20} />
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--success))", background: "hsl(var(--success) / 0.1)", padding: "0.25rem 0.5rem", borderRadius: "var(--radius-full)", height: "fit-content" }}>{s.growth}</span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Pending Requests Table */}
              <div style={{ background: "hsl(var(--card))", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", overflow: "hidden", marginBottom: "2rem" }}>
                <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border))" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Demandes en attente</h3>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "hsl(var(--muted) / 0.3)", textAlign: "left" }}>
                        <th style={{ padding: "1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Vendeur</th>
                        <th style={{ padding: "1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Spécialité</th>
                        <th style={{ padding: "1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.filter(v => v.status === "Pending").map(v => (
                        <tr key={v.id} style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{v.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{v.email}</div>
                          </td>
                          <td style={{ padding: "1rem", fontSize: "0.85rem" }}>{v.cat}</td>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button 
                                onClick={() => updateVendorStatus(v.id, "Approved")}
                                style={{ padding: "0.4rem 0.75rem", borderRadius: "var(--radius-full)", background: "hsl(var(--success))", color: "white", border: "none", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}
                              >
                                <CheckCircle2 size={14} /> Approuver
                              </button>
                              <button 
                                onClick={() => updateVendorStatus(v.id, "Rejected")}
                                style={{ padding: "0.4rem 0.75rem", borderRadius: "var(--radius-full)", background: "hsl(var(--danger))", color: "white", border: "none", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.375rem" }}
                              >
                                <XCircle size={14} /> Rejeter
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {vendors.filter(v => v.status === "Pending").length === 0 && (
                        <tr>
                          <td colSpan={3} style={{ padding: "2rem", textAlign: "center", color: "hsl(var(--muted-foreground))", fontSize: "0.9rem" }}>Aucune demande en attente.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "vendors" && (
            <motion.div key="vendors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: "hsl(var(--card))", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "hsl(var(--muted) / 0.3)", textAlign: "left" }}>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Vendeur</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Catégorie</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Ventes</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Statut</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map(v => (
                      <tr key={v.id} style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ fontWeight: 600 }}>{v.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{v.email}</div>
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem" }}>{v.cat}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", fontWeight: 700 }}>{v.sales.toLocaleString()} F</td>
                        <td style={{ padding: "1rem" }}>
                          <span style={{ 
                            padding: "0.25rem 0.625rem", borderRadius: "var(--radius-full)", fontSize: "0.7rem", fontWeight: 700,
                            background: v.status === "Approved" ? "hsl(var(--success) / 0.1)" : v.status === "Rejected" ? "hsl(var(--danger) / 0.1)" : "hsl(var(--warning) / 0.1)",
                            color: v.status === "Approved" ? "hsl(var(--success))" : v.status === "Rejected" ? "hsl(var(--danger))" : "hsl(var(--warning))"
                          }}>{v.status}</span>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button style={{ padding: "0.4rem", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", background: "white", cursor: "pointer" }} title="Voir boutique"><ExternalLink size={14} /></button>
                            <button style={{ padding: "0.4rem", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", background: "white", cursor: "pointer", color: "hsl(var(--danger))" }} title="Suspendre"><Ban size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: "hsl(var(--card))", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "hsl(var(--muted) / 0.3)", textAlign: "left" }}>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Utilisateur</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Rôle</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Rejoint le</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Commandes</th>
                      <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ fontWeight: 600 }}>{u.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{u.email}</div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: u.role === "ADMIN" ? "hsl(var(--danger))" : u.role === "VENDOR" ? "hsl(var(--primary))" : "inherit" }}>{u.role}</span>
                        </td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem" }}>{u.joined}</td>
                        <td style={{ padding: "1rem", fontSize: "0.85rem", textAlign: "center" }}>{u.orders}</td>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button style={{ padding: "0.4rem", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", background: "white", cursor: "pointer" }} title="Modifier"><Edit size={14} /></button>
                            {u.role !== "ADMIN" && (
                              <button onClick={() => deleteUser(u.id)} style={{ padding: "0.4rem", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--danger) / 0.2)", background: "white", cursor: "pointer", color: "hsl(var(--danger))" }} title="Supprimer"><Trash2 size={14} /></button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
