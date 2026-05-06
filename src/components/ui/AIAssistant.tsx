"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const SUGGESTIONS = [
  "Comment acheter un produit ?",
  "Comment contacter l'admin ?",
  "Quels sont les délais de livraison ?",
];

const RESPONSES: Record<string, string> = {
  "Comment acheter un produit ?": "Parcourez la boutique, cliquez sur un produit, choisissez vos options puis cliquez sur « Commander sur WhatsApp ». Notre équipe vous confirmera la commande et les détails de livraison au Bénin.",
  "Comment contacter l'admin ?": "Utilisez la messagerie intégrée (icône Messages) ou écrivez-nous directement sur WhatsApp au +229 97 00 00 00. Nous répondons sous 24h.",
  "Quels sont les délais de livraison ?": "La livraison est rapide sur tout le Bénin : Cotonou en 24-48h, autres villes en 48-72h. Les frais de livraison sont calculés selon votre localisation.",
};

const KEYWORDS: { keys: string[]; reply: string }[] = [
  { keys: ["prix", "cout", "coût", "combien"], reply: "Les prix sont affichés sur chaque fiche produit. Cliquez sur « Commander sur WhatsApp » pour un devis précis avec livraison incluse." },
  { keys: ["livraison", "expedition", "expédition", "envoi", "recevoir"], reply: "Nous livrons sur tout le Bénin. Cotonou : 24-48h. Autres villes : 48-72h. Les frais dépendent de votre localisation exacte." },
  { keys: ["whatsapp", "contact", "telephone", "téléphone", "appeler", "joindre"], reply: "Contactez-nous sur WhatsApp au +229 97 00 00 00 ou via la messagerie du site. Réponse sous 24h." },
  { keys: ["panier", "cart", "ajouter"], reply: "Ajoutez des produits au panier puis validez. Vous pouvez aussi commander directement par WhatsApp depuis n'importe quelle fiche produit." },
  { keys: ["compte", "inscription", "connecter", "login", "connexion"], reply: "Créez un compte client gratuit en quelques secondes. Allez sur Connexion > Créer un compte. Seuls les comptes CLIENT sont acceptés." },
  { keys: ["produit", "article", "acheter", "boutique"], reply: "Notre boutique propose des produits physiques soigneusement sélectionnés : mode, électronique, maison, accessoires. Tous sont vérifiés avant expédition." },
  { keys: ["retour", "rembourser", "remboursement", "échange"], reply: "Vous disposez de 7 jours après réception pour demander un retour ou échange si le produit ne correspond pas à la description." },
];

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
      const lower = text.toLowerCase();
      let reply = RESPONSES[text];
      if (!reply) {
        for (const k of KEYWORDS) {
          if (k.keys.some(key => lower.includes(key))) { reply = k.reply; break; }
        }
      }
      if (!reply) {
        reply = "Je n'ai pas trouvé de réponse exacte à votre question. Vous pouvez utiliser la messagerie du site ou nous contacter sur WhatsApp au +229 97 00 00 00. Nous répondons sous 24h.";
      }
      setMsgs(p => [...p, { role: "ai", text: reply }]);
      setLoading(false);
    }, 700);
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
