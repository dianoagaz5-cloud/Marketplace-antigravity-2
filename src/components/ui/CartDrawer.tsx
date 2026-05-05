"use client";

import { useEffect } from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface Props { isOpen: boolean; onClose: () => void; }

const WHATSAPP_NUMBER = "+22997000000";

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, updateQty, removeItem, total, count } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const buildWhatsAppMessage = () => {
    let msg = "Bonjour, je souhaite commander les articles suivants :\n\n";
    items.forEach(item => {
      msg += `• ${item.name} x${item.qty} — ${(item.price * item.qty).toLocaleString("fr")} F`;
      if (item.refCode) msg += ` (Ref: ${item.refCode})`;
      msg += "\n";
    });
    msg += `\nTotal : ${total.toLocaleString("fr")} F\n\nMerci !`;
    return encodeURIComponent(msg);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${buildWhatsAppMessage()}`;

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
            animate={{ x: 0, transition: { type: "spring" as const, stiffness: 320, damping: 32 } }}
            exit={{ x: "100%", transition: { duration: 0.22 } }}
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: "420px", background: "hsl(var(--card))", borderLeft: "1px solid hsl(var(--border))", zIndex: 201, display: "flex", flexDirection: "column" }}
          >
            <div style={{ padding: "1.5rem", borderBottom: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontWeight: 700, fontSize: "1.05rem" }}>
                <ShoppingBag size={20} style={{ color: "hsl(var(--primary))" }} />
                Mon panier
                {count > 0 && <span style={{ background: "hsl(var(--primary))", color: "white", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, padding: "1px 8px" }}>{count}</span>}
              </div>
              <button onClick={onClose} style={{ width: "34px", height: "34px", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(var(--muted-foreground))" }}>
                <X size={17} />
              </button>
            </div>

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
                        {item.refCode && <p style={{ fontSize: "0.7rem", color: "hsl(var(--muted-foreground))" }}>Ref: {item.refCode}</p>}
                        <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "hsl(var(--primary))" }}>{(item.price * item.qty).toLocaleString("fr")} F</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "auto" }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Minus size={11} />
                          </button>
                          <span style={{ fontSize: "0.875rem", fontWeight: 700, minWidth: "1.25rem", textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Plus size={11} />
                          </button>
                          <button onClick={() => removeItem(item.id)} style={{ marginLeft: "auto", width: "26px", height: "26px", borderRadius: "50%", border: "none", background: "hsl(0 72% 54% / 0.1)", color: "hsl(0 72% 54%)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div style={{ padding: "1.25rem 1.25rem 2rem", borderTop: "1px solid hsl(var(--border))" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{ fontWeight: 500, color: "hsl(var(--muted-foreground))" }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: "1.25rem" }}>{total.toLocaleString("fr")} F</span>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%", padding: "1rem", borderRadius: "var(--radius-full)", background: "#25D366", color: "white", border: "none", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 16px rgba(37,211,102,0.35)", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", textDecoration: "none" }}
                >
                  <MessageCircle size={20} /> Commander sur WhatsApp
                </a>
                <p style={{ textAlign: "center", fontSize: "0.78rem", color: "hsl(var(--muted-foreground))", marginTop: "0.75rem" }}>Votre commande avec les codes ref sera envoyée</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
