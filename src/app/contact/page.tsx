"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Contactez-nous</h1>
        <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "1.1rem" }}>
          Une question ? Un problème ? Notre équipe est là pour vous aider.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
        {/* Info Column */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Informations de contact</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { icon: Phone, title: "Téléphone", value: "+229 00 00 00 00", detail: "Lun-Ven, 8h-18h" },
              { icon: Mail, title: "Email", value: "support@marketbenin.bj", detail: "Réponse sous 24h" },
              { icon: MapPin, title: "Bureau", value: "Cotonou, Quartier Haie Vive", detail: "Immeuble Terra" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1.25rem" }}>
                <div style={{ 
                  width: "3rem", height: "3rem", borderRadius: "0.75rem", 
                  backgroundColor: "hsl(var(--primary) / 0.1)", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <item.icon color="hsl(var(--primary))" size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>{item.value}</div>
                  <div style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            marginTop: "3rem", padding: "2rem", borderRadius: "1.5rem", 
            backgroundColor: "hsl(var(--primary))", color: "white" 
          }}>
            <h3 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "1rem" }}>Support Client</h3>
            <p style={{ opacity: 0.9, fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              Pour toute assistance immédiate, vous pouvez également utiliser notre assistant IA disponible en bas à droite de l'écran.
            </p>
            <button style={{ 
              backgroundColor: "white", color: "hsl(var(--primary))", 
              border: "none", padding: "0.75rem 1.5rem", borderRadius: "9999px",
              fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem"
            }}>
              <MessageSquare size={18} /> Chat avec l'IA
            </button>
          </div>
        </div>

        {/* Form Column */}
        <div style={{ 
          backgroundColor: "hsl(var(--card))", padding: "2.5rem", 
          borderRadius: "2rem", border: "1px solid hsl(var(--border) / 0.5)",
          boxShadow: "0 10px 40px -10px hsl(var(--foreground) / 0.05)"
        }}>
          {isSent ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "3rem 0" }}
            >
              <div style={{ 
                width: "4rem", height: "4rem", borderRadius: "50%", 
                backgroundColor: "hsl(142 71% 45% / 0.1)", color: "hsl(142 71% 45%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem"
              }}>
                <Send size={24} />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Message envoyé !</h2>
              <p style={{ color: "hsl(var(--muted-foreground))" }}>Merci de nous avoir contactés. Nous vous répondrons très vite.</p>
              <button 
                onClick={() => setIsSent(false)}
                style={{ marginTop: "2rem", color: "hsl(var(--primary))", background: "none", border: "none", fontWeight: 600, cursor: "pointer" }}
              >
                Envoyer un autre message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.875rem", fontWeight: 600 }}>Nom complet</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Jean Dupont"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.875rem", fontWeight: 600 }}>Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="jean@exemple.bj"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600 }}>Sujet</label>
                <input 
                  required
                  type="text" 
                  placeholder="Question sur ma commande"
                  value={formState.subject}
                  onChange={e => setFormState({...formState, subject: e.target.value})}
                  style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600 }}>Message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Comment pouvons-nous vous aider ?"
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))", resize: "none" }}
                />
              </div>
              <button 
                disabled={isSubmitting}
                type="submit" 
                style={{ 
                  marginTop: "1rem", backgroundColor: "hsl(var(--primary))", color: "white", 
                  border: "none", padding: "1rem", borderRadius: "0.75rem",
                  fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  transition: "opacity 0.2s"
                }}
              >
                {isSubmitting ? "Envoi en cours..." : (
                  <>Envoyer le message <Send size={18} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
