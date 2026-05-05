import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Download, Infinity, DollarSign } from "lucide-react";

export default function VendreEbookPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem 6rem" }}>
      <Link href="/vendre" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", fontWeight: 500, marginBottom: "2.5rem", textDecoration: "none" }}>
        <ArrowLeft size={16} /> Retour
      </Link>

      <div style={{ marginBottom: "3.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1rem" }}>Publiez votre Ebook sur MarketBénin</h1>
        <p style={{ fontSize: "1.05rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.65 }}>
          Business, cuisine, programmation, développement personnel — transformez votre savoir en revenus passifs durables.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "4rem" }}>
        {[
          { icon: Download, title: "Livraison instantanée", desc: "Vos clients téléchargent le fichier immédiatement après le paiement." },
          { icon: Infinity, title: "Revenus passifs illimités", desc: "Publiez une fois et encaissez indéfiniment, sans effort supplémentaire." },
          { icon: DollarSign, title: "Fixez votre prix", desc: "Vous décidez du prix de vente, nous prenons seulement une petite commission." },
          { icon: BookOpen, title: "Formats acceptés", desc: "PDF, ePub, MOBI — jusqu'à 100 Mo par fichier. Couverture incluse." },
        ].map(b => (
          <div key={b.title} style={{ display: "flex", gap: "1rem", padding: "1.5rem", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-lg)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius)", background: "hsl(35 95% 52% / 0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <b.icon size={20} style={{ color: "hsl(35 95% 52%)" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: "0.25rem", fontSize: "0.95rem" }}>{b.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", lineHeight: 1.55 }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, hsl(35 95% 38%), hsl(35 95% 50%))", borderRadius: "var(--radius-xl)", padding: "3rem", color: "white", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Votre savoir vaut de l'argent</h2>
        <p style={{ opacity: 0.9, marginBottom: "2rem", lineHeight: 1.65 }}>Rejoignez nos auteurs et générez des revenus passifs dès aujourd'hui.</p>
        <Link href="/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "var(--radius-full)", background: "white", color: "hsl(35 95% 38%)", fontWeight: 800, fontSize: "1rem", textDecoration: "none" }}>
          Publier mon Ebook <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
