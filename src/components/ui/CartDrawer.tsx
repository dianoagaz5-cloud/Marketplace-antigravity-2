"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem { id: number; name: string; price: number; qty: number; img: string; }
interface Props { isOpen: boolean; onClose: () => void; }

const INIT_CART: CartItem[] = [
  { id: 1, name: "Sneakers Nike Air Premium", price: 27500, qty: 1, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80" },
  { id: 2, name: "Sac en cuir artisanal", price: 18500, qty: 1, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&q=80" },
];

export default function CartDrawer({ isOpen, onClose }: Props) {
  const [items, setItems] = useState<CartItem[]>(INIT_CART);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const update = (id: number, delta: number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "hsl(var(--foreground) / 0.25)", backdropFilter: "blur(4px)", zIndex: 200 }}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { type: "spring", stiffness: 320, damping: 32 } }}
            exit={{ x: "100%", transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: "420px", background: "hsl(var(--card))", borderLeft: "1px solid hsl(var(--border))", zIndex: 201, display: "flex", flexDirection: "column" }}
          >
            {/* Header */}
            <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontWeight: 700, fontSize: "1.05rem" }}>
                <ShoppingBag size={20} style={{ color: "hsl(var(--primary))" }} />
                Mon panier
                {items.length > 0 && <span style={{ background: "hsl(var(--primary))", color: "white", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, padding: "1px 8px" }}>{items.reduce((s, i) => s + i.qty, 0)}</span>}
              </div>
              <button onClick={onClose} style={{ width: "34px", height: "34px", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(var(--muted-foreground))" }}>
                <X size={17} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                  <ShoppingBag size={44} style={{ color: "hsl(var(--muted-foreground))", margin: "0 auto 1rem", opacity: 0.4 }} />
                  <p style={{ color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>Votre panier est vide</p>
                  <button onClick={onClose} style={{ marginTop: "1rem", padding: "0.625rem 1.5rem", borderRadius: "var(--radius-full)", border: "1.5px solid hsl(var(--primary))", background: "transparent", color: "hsl(var(--primary))", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: "flex", gap: "1rem", padding: "1rem", background: "hsl(var(--muted) / 0.4)", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border) / 0.5)" }}>
                      <div style={{ width: "72px", height: "72px", borderRadius: "var(--radius)", overflow: "hidden", flexShrink: 0, background: "hsl(var(--muted))" }}>
                        <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                        <p style={{ fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.35 }}>{item.name}</p>
                        <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "hsl(var(--primary))" }}>{(item.price * item.qty).toLocaleString("fr")} F</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "auto" }}>
                          <button onClick={() => update(item.id, -1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Minus size={11} />
                          </button>
                          <span style={{ fontSize: "0.875rem", fontWeight: 700, minWidth: "1.25rem", textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => update(item.id, 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Plus size={11} />
                          </button>
                          <button onClick={() => setItems(p => p.filter(i => i.id !== item.id))} style={{ marginLeft: "auto", width: "26px", height: "26px", borderRadius: "50%", border: "none", background: "hsl(0 72% 54% / 0.1)", color: "hsl(0 72% 54%)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "1.25rem 1.25rem 2rem", borderTop: "1px solid hsl(var(--border))" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{ fontWeight: 500, color: "hsl(var(--muted-foreground))" }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: "1.25rem" }}>{total.toLocaleString("fr")} F</span>
                </div>
                <button style={{ width: "100%", padding: "1rem", borderRadius: "var(--radius-full)", background: "hsl(var(--primary))", color: "white", border: "none", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  Passer la commande <ArrowRight size={18} />
                </button>
                <p style={{ textAlign: "center", fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", marginTop: "0.75rem" }}>Paiement sécurisé · MTN MoMo · Moov Money</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
