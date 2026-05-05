"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const inp: React.CSSProperties = {
  width: "100%", padding: "0.8rem 1rem", borderRadius: "var(--radius)",
  border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))",
  color: "hsl(var(--foreground))", fontSize: "0.925rem", outline: "none",
  fontFamily: "inherit",
};

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    });
    router.push("/");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "linear-gradient(135deg, hsl(258 72% 97%), hsl(var(--background)))" }}>
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, hsl(var(--primary)), hsl(258 72% 38%))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "1.2rem" }}>M</div>
            <span style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em" }}>Market<span style={{ color: "hsl(var(--primary))" }}>Bénin</span></span>
          </Link>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginTop: "2rem", marginBottom: "0.5rem" }}>Créer un compte</h1>
          <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.9rem" }}>Rejoignez notre boutique en ligne</p>
        </div>

        <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-xl)", padding: "2rem", boxShadow: "var(--shadow-md)" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Prénom</label>
                <input type="text" placeholder="Kofi" required style={inp} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Nom</label>
                <input type="text" placeholder="Mensah" required style={inp} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Email</label>
              <input type="email" placeholder="votre@email.com" required style={inp} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Mot de passe</label>
              <div style={{ position: "relative" }}>
                <input type={show ? "text" : "password"} placeholder="Min. 8 caractères" required style={{ ...inp, paddingRight: "3rem" }} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                <button type="button" onClick={() => setShow(v => !v)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "hsl(var(--muted-foreground))", display: "flex", padding: 0 }}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <p style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              En créant un compte, vous acceptez nos{" "}
              <Link href="/cgu" style={{ color: "hsl(var(--primary))" }}>CGU</Link> et notre{" "}
              <Link href="/confidentialite" style={{ color: "hsl(var(--primary))" }}>politique de confidentialité</Link>.
            </p>

            <button type="submit" style={{ width: "100%", padding: "0.9rem", borderRadius: "var(--radius-full)", background: "hsl(var(--primary))", color: "white", fontWeight: 700, fontSize: "0.975rem", border: "none", cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)", fontFamily: "inherit" }}>
              Créer mon compte
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
            Déjà un compte ?{" "}
            <Link href="/auth/login" style={{ color: "hsl(var(--primary))", fontWeight: 600 }}>Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
