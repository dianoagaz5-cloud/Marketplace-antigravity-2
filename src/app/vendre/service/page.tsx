import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, TrendingUp, Clock } from "lucide-react";

export default function VendreServicePage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>
      <Link href="/vendre" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", fontWeight: 500, marginBottom: "2.5rem", textDecoration: "none" }}>
        <ArrowLeft size={16} /> Retour
      </Link>

      <div style={{ marginBottom: "3.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1rem" }}>Proposer un service sur MarketBénin</h1>
        <p style={{ fontSize: "1.05rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.65 }}>
          Développement, design, réparation, marketing, traduction — vos compétences ont une valeur. Des centaines de clients attendent vos offres.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "4rem" }}>
        {[
          { icon: Shield, title: "Paiement garanti", desc: "Les fonds sont bloqués à la commande et libérés à la livraison." },
          { icon: TrendingUp, title: "Visibilité maximale", desc: "Votre profil est mis en avant auprès d'acheteurs qualifiés." },
          { icon: Clock, title: "Travaillez à votre rythme", desc: "Vous définissez vos délais et votre disponibilité." },
          { icon: CheckCircle2, title: "Badge Certifié", desc: "Obtenez la certification après 5 avis positifs." },
        ].map(b => (
          <div key={b.title} style={{ display: "flex", gap: "1rem", padding: "1.5rem", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-lg)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius)", background: "hsl(var(--primary) / 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <b.icon size={20} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.95rem" }}>{b.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.55 }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, hsl(258 72% 18%), hsl(258 72% 32%))", borderRadius: "var(--radius-xl)", padding: "3rem", color: "white", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Prêt(e) à commencer ?</h2>
        <p style={{ opacity: 0.85, marginBottom: "2rem", lineHeight: 1.65 }}>Créez votre profil prestataire et publiez votre première offre gratuitement.</p>
        <Link href="/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "var(--radius-full)", background: "white", color: "hsl(258 72% 28%)", fontWeight: 800, fontSize: "1rem", textDecoration: "none" }}>
          Créer mon profil prestataire <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
