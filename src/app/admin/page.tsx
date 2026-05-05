"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Users, ShoppingBag, DollarSign, TrendingUp,
  Search, ShieldCheck, Edit, Trash2, Plus, Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_PRODUCTS = [
  { id: 1, title: "Sneakers Nike Air Premium", refCode: "SNK-001", price: 27500, stock: 8, cat: "mode" },
  { id: 2, title: "Montre Connected Series 8", refCode: "MTR-002", price: 45000, stock: 12, cat: "electronique" },
  { id: 3, title: "Sac en cuir artisanal", refCode: "SAC-003", price: 18500, stock: 5, cat: "accessoires" },
];

const INITIAL_USERS = [
  { id: 1, name: "Jean Dupont", email: "jean@gmail.com", role: "CUSTOMER", joined: "2026-01-15", orders: 12 },
  { id: 4, name: "Amina Soglo", email: "amina@outlook.fr", role: "CUSTOMER", joined: "2026-04-05", orders: 5 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: "", refCode: "", price: "", stock: "", cat: "mode" });

  if (!user || user.role !== "ADMIN") {
    return (
      <div style={{ padding: "5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "hsl(var(--danger))" }}>Accès Refusé</h2>
        <p style={{ marginTop: "1rem" }}>Vous n&apos;avez pas les droits d&apos;administrateur pour accéder à cette page.</p>
      </div>
    );
  }

  const deleteUser = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const p = {
      id: Date.now(),
      title: newProduct.title,
      refCode: newProduct.refCode,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      cat: newProduct.cat,
    };
    setProducts(prev => [...prev, p]);
    setNewProduct({ title: "", refCode: "", price: "", stock: "", cat: "mode" });
    setShowAddForm(false);
  };

  const deleteProduct = (id: number) => {
    if (confirm("Supprimer ce produit ?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.refCode.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalSales = products.reduce((s, p) => s + p.price * (12 - p.stock), 0);

  return (
    <div style={{ minHeight: "100vh", background: "hsl(var(--muted) / 0.3)" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ShieldCheck size={32} style={{ color: "hsl(var(--primary))" }} /> Administration
            </h1>
            <p style={{ color: "hsl(var(--muted-foreground))", marginTop: "0.5rem" }}>Gestion de la boutique MarketBénin.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", background: "hsl(var(--card))", padding: "0.375rem", borderRadius: "var(--radius-full)", border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-sm)" }}>
            {["overview", "products", "users"].map(tab => (
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
                {tab === "overview" ? "Vue d'ensemble" : tab === "products" ? "Produits" : "Utilisateurs"}
              </button>
            ))}
          </div>
        </div>

        {activeTab !== "overview" && (
          <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, background: "hsl(var(--card))", padding: "0.75rem 1rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))" }}>
              <Search size={18} style={{ color: "hsl(var(--muted-foreground))" }} />
              <input
                type="text"
                placeholder={`Rechercher un ${activeTab === "products" ? "produit" : "utilisateur"}...`}
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                {[
                  { label: "Utilisateurs", value: users.length, icon: Users, growth: "+12%" },
                  { label: "Produits", value: products.length, icon: Package, growth: "+5%" },
                  { label: "Commandes", value: "48", icon: ShoppingBag, growth: "+18%" },
                  { label: "Ventes Totales", value: `${totalSales.toLocaleString("fr")} F`, icon: DollarSign, growth: "+24%" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "hsl(var(--card))", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <s.icon size={20} />
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--success))", background: "hsl(var(--success) / 0.1)", padding: "0.25rem 0.5rem", borderRadius: "var(--radius-full)", height: "fit-content" }}>{s.growth}</span>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
                <button
                  onClick={() => setShowAddForm(v => !v)}
                  style={{ padding: "0.625rem 1.25rem", borderRadius: "var(--radius-full)", background: "hsl(var(--primary))", color: "white", border: "none", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Plus size={16} /> Ajouter un produit
                </button>
              </div>
              {showAddForm && (
                <form onSubmit={addProduct} style={{ background: "hsl(var(--card))", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", marginBottom: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Nom du produit</label>
                    <input required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Code Ref</label>
                    <input required value={newProduct.refCode} onChange={e => setNewProduct({...newProduct, refCode: e.target.value})} style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Prix (F)</label>
                    <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Stock</label>
                    <input required type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.3)" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius)", background: "hsl(var(--success))", color: "white", border: "none", fontWeight: 700, cursor: "pointer" }}>Enregistrer</button>
                  </div>
                </form>
              )}
              <div style={{ background: "hsl(var(--card))", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "hsl(var(--muted) / 0.3)", textAlign: "left" }}>
                        <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Produit</th>
                        <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Ref</th>
                        <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Prix</th>
                        <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Stock</th>
                        <th style={{ padding: "1.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(p => (
                        <tr key={p.id} style={{ borderBottom: "1px solid hsl(var(--border) / 0.5)" }}>
                          <td style={{ padding: "1rem", fontWeight: 600 }}>{p.title}</td>
                          <td style={{ padding: "1rem", fontSize: "0.85rem" }}>{p.refCode}</td>
                          <td style={{ padding: "1rem", fontWeight: 700 }}>{p.price.toLocaleString("fr")} F</td>
                          <td style={{ padding: "1rem" }}>{p.stock}</td>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button style={{ padding: "0.4rem", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", background: "white", cursor: "pointer" }} title="Modifier"><Edit size={14} /></button>
                              <button onClick={() => deleteProduct(p.id)} style={{ padding: "0.4rem", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--danger) / 0.2)", background: "white", cursor: "pointer", color: "hsl(var(--danger))" }} title="Supprimer"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: u.role === "ADMIN" ? "hsl(var(--danger))" : "inherit" }}>{u.role}</span>
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
