"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const SUGGESTIONS = [
  "Comment acheter un produit ?",
  "Comment devenir vendeur ?",
  "Modes de paiement disponibles ?",
];

const RESPONSES: Record<string, string> = {
  "Comment acheter un produit ?": "Naviguez vers la boutique, sélectionnez un produit, choisissez vos options et ajoutez-le au panier. Ensuite, suivez les étapes de paiement via MTN MoMo ou Moov Money.",
  "Comment devenir vendeur ?": "Cliquez sur « Vendre » dans la barre de navigation, puis « Vendre un produit ». Créez votre compte vendeur gratuitement et configurez votre boutique en moins de 10 minutes.",
  "Modes de paiement disponibles ?": "Nous acceptons MTN MoMo, Moov Money et Celtiis Cash. Tous les paiements sont sécurisés et les fonds sont protégés jusqu'à la livraison.",
};

export default function AIAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Bonjour 👋 Je suis l'assistant MarketBénin. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  if (pathname === "/messages") return null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { role: "user", text }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = RESPONSES[text] ?? "Je note votre question et la transmets à notre équipe. Avez-vous d'autres questions ?";
      setMsgs(p => [...p, { role: "ai", text: reply }]);
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 300, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.875rem" }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 28 } }}
            exit={{ opacity: 0, scale: 0.92, y: 12, transition: { duration: 0.18 } }}
            style={{ width: "340px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            {/* Header */}
            <div style={{ padding: "1rem 1.125rem", borderBottom: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: "0.625rem", background: "hsl(var(--primary))", color: "white" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>Assistant MarketBénin</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.85 }}>En ligne · répond en quelques secondes</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "6px", padding: "4px", cursor: "pointer", color: "white", display: "flex" }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem", maxHeight: "320px" }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "85%", padding: "0.625rem 0.875rem", borderRadius: m.role === "user" ? "var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)" : "var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)", background: m.role === "user" ? "hsl(var(--primary))" : "hsl(var(--muted))", color: m.role === "user" ? "white" : "hsl(var(--foreground))", fontSize: "0.85rem", lineHeight: 1.55 }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: "4px", padding: "0.625rem 0.875rem", background: "hsl(var(--muted))", borderRadius: "var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)", width: "fit-content" }}>
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "hsl(var(--muted-foreground))", animation: `bounce 0.9s ${d}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {msgs.length <= 1 && (
              <div style={{ padding: "0 1rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.75rem", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 500, color: "hsl(var(--foreground))", textAlign: "left", transition: "background 0.12s" }}>
                    {s} <ChevronRight size={13} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: "0.875rem 1rem", borderTop: "1px solid hsl(var(--border))", display: "flex", gap: "0.5rem" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Posez votre question..."
                style={{ flex: 1, padding: "0.5rem 0.75rem", borderRadius: "var(--radius-full)", border: "1.5px solid hsl(var(--border))", background: "hsl(var(--muted) / 0.5)", outline: "none", fontSize: "0.85rem", color: "hsl(var(--foreground))", fontFamily: "inherit" }}
              />
              <button onClick={() => send(input)} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "hsl(var(--primary))", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{ width: "52px", height: "52px", borderRadius: "50%", background: "hsl(var(--primary))", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 20px hsl(var(--primary) / 0.45), 0 0 0 4px hsl(var(--primary) / 0.12)" }}
        aria-label="Ouvrir l'assistant"
      >
        <AnimatePresence mode="wait">
          <motion.div key={open ? "x" : "bot"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
            {open ? <X size={22} /> : <Bot size={22} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </div>
  );
}
