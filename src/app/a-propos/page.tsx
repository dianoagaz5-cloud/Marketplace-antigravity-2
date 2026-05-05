"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Zap } from "lucide-react";

const stats = [
  { label: "Vendeurs Actifs", value: "500+" },
  { label: "Clients Heureux", value: "10k+" },
  { label: "Livraisons", value: "25k+" },
  { label: "Note Globale", value: "4.9/5" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Confiance & Sécurité",
    description: "Nous vérifions chaque vendeur et sécurisons chaque transaction via MTN MoMo et Moov Money.",
  },
  {
    icon: Target,
    title: "Qualité Premium",
    description: "Une sélection rigoureuse de produits physiques, services et ebooks pour garantir votre satisfaction.",
  },
  {
    icon: Zap,
    title: "Rapidité",
    description: "Des livraisons express à Cotonou et partout au Bénin dans les meilleurs délais.",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Une plateforme faite par des Béninois, pour des Béninois, favorisant l'économie locale.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "5rem" }}
      >
        <h1 style={{ fontSize: "3.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
          Notre Mission : Révolutionner le commerce au <span style={{ color: "hsl(var(--primary))" }}>Bénin</span>
        </h1>
        <p style={{ fontSize: "1.25rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6, maxWidth: "800px", margin: "0 auto" }}>
          MarketBénin est la première marketplace multi-vendeurs tout-en-un du pays. 
          Nous connectons les meilleurs talents et marchands locaux avec des milliers de clients 
          cherchant l'excellence et la simplicité.
        </p>
      </motion.section>

      {/* Stats */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "2rem", 
        marginBottom: "5rem",
        backgroundColor: "hsl(var(--muted) / 0.3)",
        padding: "3rem",
        borderRadius: "2rem"
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "hsl(var(--primary))" }}>{stat.value}</div>
            <div style={{ color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Values */}
      <section>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "3rem", textAlign: "center" }}>Nos Valeurs Fondamentales</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2.5rem" }}>
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: "2rem",
                borderRadius: "1.5rem",
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.5)",
              }}
            >
              <div style={{ 
                width: "3rem", 
                height: "3rem", 
                borderRadius: "1rem", 
                backgroundColor: "hsl(var(--primary) / 0.1)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginBottom: "1.5rem"
              }}>
                <v.icon color="hsl(var(--primary))" size={24} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>{v.title}</h3>
              <p style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.5 }}>{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section style={{ marginTop: "6rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>Notre Histoire</h2>
          <p style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.7, marginBottom: "2rem" }}>
            Né d'une volonté de digitaliser le commerce béninois tout en respectant ses particularités, 
            MarketBénin a commencé comme une simple idée entre passionnés de technologie et entrepreneurs. 
            Aujourd'hui, c'est une plateforme robuste qui permet à n'importe quel artisan ou vendeur 
            de toucher un public national en quelques clics.
          </p>
          <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>L'équipe MarketBénin</div>
        </div>
      </section>
    </div>
  );
}
