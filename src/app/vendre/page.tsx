"use client";

import Link from "next/link";
import { ArrowRight, Package, Briefcase, BookOpen, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function VendrePage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, hsl(258 72% 18%), hsl(258 72% 32%))", color: "white", padding: "6rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 1rem", borderRadius: "var(--radius-full)", background: "rgba(255,255,255,0.15)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.75rem" }}>
            <Zap size={14} fill="currentColor" /> 3 500 vendeurs nous font confiance
          </span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Vendez sur MarketBénin, atteignez des milliers de clients
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.85, lineHeight: 1.65, marginBottom: "2.5rem" }}>
            Rejoignez la marketplace N°1 au Bénin. Créez votre boutique gratuitement et commencez à vendre en moins de 10 minutes.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {!user ? (
              <>
                <Link href="/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "var(--radius-full)", background: "white", color: "hsl(258 72% 30%)", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                  Créer mon compte <ArrowRight size={18} />
                </Link>
                <Link href="/auth/login" style={{ display: "inline-flex", padding: "1rem 2rem", borderRadius: "var(--radius-full)", border: "2px solid rgba(255,255,255,0.4)", color: "white", fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>
                  J'ai déjà un compte
                </Link>
              </>
            ) : (
              <Link href="#select-section" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "var(--radius-full)", background: "white", color: "hsl(258 72% 30%)", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                Commencer à vendre <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* What to sell */}
      <section id="select-section" style={{ maxWidth: "1240px", margin: "0 auto", padding: "6rem 2rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "0.75rem" }}>Que voulez-vous vendre ?</h2>
        <p style={{ textAlign: "center", color: "hsl(var(--muted-foreground))", marginBottom: "3rem" }}>Choisissez le type qui correspond à votre activité</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {[
            { icon: Package, title: "Produit physique", desc: "Vêtements, électronique, artisanat, alimentation... Gérez votre stock et vos livraisons.", href: "/vendre/produit", color: "258 72% 52%" },
            { icon: Briefcase, title: "Service professionnel", desc: "Design, développement, réparation, formation... Proposez vos compétences à des milliers de clients.", href: "/vendre/service", color: "196 80% 48%" },
            { icon: BookOpen, title: "Ebook & contenu numérique", desc: "Guides, cours, recettes, templates... Créez une fois, vendez à l'infini.", href: "/vendre/ebook", color: "35 95% 52%" },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-xl)", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", transition: "transform 0.2s var(--ease-out), box-shadow 0.2s, border-color 0.2s", cursor: "pointer" }} className="sell-card">
                <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-lg)", background: `hsl(${item.color} / 0.12)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <item.icon size={28} style={{ color: `hsl(${item.color})` }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", fontWeight: 700, color: `hsl(${item.color})`, marginTop: "auto" }}>
                  Commencer <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section style={{ background: "hsl(var(--card))", borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "3rem" }}>Pourquoi choisir MarketBénin ?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            {[
              { icon: Users, title: "Audience qualifiée", desc: "Des milliers d'acheteurs actifs cherchent des produits comme les vôtres chaque jour." },
              { icon: Shield, title: "Paiements sécurisés", desc: "Recevez vos revenus directement sur MTN MoMo ou Moov Money. Zéro risque d'impayé." },
              { icon: TrendingUp, title: "Outils de croissance", desc: "Analytics, promotions, badge Certifié — tout ce qu'il vous faut pour croître." },
              { icon: Zap, title: "Mise en ligne rapide", desc: "Votre boutique est prête en moins de 10 minutes. Simple, sans frais cachés." },
            ].map(b => (
              <div key={b.title}>
                <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius)", background: "hsl(var(--primary) / 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <b.icon size={22} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{b.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`.sell-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: hsl(var(--primary) / 0.3); }`}</style>
    </div>
  );
}
