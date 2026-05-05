"use client";

import { useState } from "react";
import { Search, ChevronDown, MessageCircle, Mail, Phone, LifeBuoy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = [
  { 
    q: "Comment puis-je payer sur MarketBénin ?", 
    a: "Nous acceptons les paiements via MTN Mobile Money, Moov Money et Celtiis Cash. Le processus est entièrement sécurisé et immédiat." 
  },
  { 
    q: "Quels sont les délais de livraison ?", 
    a: "Pour Cotonou et Calavi, la livraison se fait généralement sous 24h. Pour le reste du Bénin (Porto-Novo, Parakou, etc.), comptez entre 48h et 72h selon le vendeur." 
  },
  { 
    q: "Puis-je retourner un produit ?", 
    a: "Oui, vous disposez de 48h après réception pour signaler un problème. Le produit doit être dans son emballage d'origine. Consultez nos conditions de retour pour plus de détails." 
  },
  { 
    q: "Comment devenir vendeur ?", 
    a: "Cliquez sur 'Devenir Vendeur' dans le menu. Remplissez le formulaire et notre équipe validera votre boutique sous 24h ouvrées." 
  },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "5rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div style={{ display: "inline-flex", padding: "1rem", borderRadius: "var(--radius-xl)", background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))", marginBottom: "1.5rem" }}>
          <LifeBuoy size={40} />
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>Centre d'Aide</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "1.1rem" }}>Comment pouvons-nous vous aider aujourd'hui ?</p>
      </div>

      <div style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "2rem" }}>Questions fréquentes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "hsl(var(--card))" }}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: "100%", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontWeight: 700, fontSize: "1rem" }}>{item.q}</span>
                <ChevronDown size={20} style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 1.5rem 1.5rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6, fontSize: "0.95rem" }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "hsl(var(--muted) / 0.3)", borderRadius: "var(--radius-xl)", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>Vous n'avez pas trouvé votre réponse ?</h2>
        <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2rem" }}>Notre équipe de support est disponible 7j/7 pour vous accompagner.</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div style={{ padding: "1.5rem", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))" }}>
            <MessageCircle size={24} style={{ color: "hsl(var(--primary))", marginBottom: "0.75rem" }} />
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>WhatsApp</div>
            <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>+229 00 00 00 00</div>
          </div>
          <div style={{ padding: "1.5rem", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))" }}>
            <Mail size={24} style={{ color: "hsl(var(--primary))", marginBottom: "0.75rem" }} />
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Email</div>
            <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>support@marketbenin.bj</div>
          </div>
          <div style={{ padding: "1.5rem", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--border))" }}>
            <Phone size={24} style={{ color: "hsl(var(--primary))", marginBottom: "0.75rem" }} />
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Appel</div>
            <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>Lundi - Samedi</div>
          </div>
        </div>
      </div>
    </div>
  );
}
