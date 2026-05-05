"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";

const inp: React.CSSProperties = {
  width: "100%", padding: "0.8rem 1rem", borderRadius: "var(--radius)",
  border: "1.5px solid hsl(var(--border))", background: "hsl(var(--card))",
  color: "hsl(var(--foreground))", fontSize: "0.925rem", outline: "none",
  fontFamily: "inherit", transition: "border-color 0.15s, box-shadow 0.15s",
};

function LoginPageContent() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const callbackUrl = searchParams.get("callbackUrl");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (!success) {
      setError("Email ou mot de passe incorrect.");
      return;
    }
    router.push(callbackUrl || "/");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "linear-gradient(135deg, hsl(258 72% 97%), hsl(var(--background)))" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, hsl(var(--primary)), hsl(258 72% 38%))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "1.2rem" }}>M</div>
            <span style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em" }}>Market<span style={{ color: "hsl(var(--primary))" }}>Bénin</span></span>
          </Link>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginTop: "2rem", marginBottom: "0.5rem" }}>Bienvenue</h1>
          <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.9rem" }}>Connectez-vous à votre compte</p>
        </div>

        <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-lg)", padding: "2rem", boxShadow: "var(--shadow-md)" }}>
          {error && (
            <div style={{ marginBottom: "1.25rem", padding: "0.75rem", background: "hsl(var(--danger) / 0.1)", borderRadius: "var(--radius)", border: "1px solid hsl(var(--danger) / 0.2)", color: "hsl(var(--danger))", fontSize: "0.85rem", fontWeight: 600 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required style={inp} />
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: 600 }}>Mot de passe</label>
                <Link href="/auth/forgot" style={{ fontSize: "0.8rem", color: "hsl(var(--primary))" }}>Oublié ?</Link>
              </div>
              <div style={{ position: "relative" }}>
                <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ ...inp, paddingRight: "3rem" }} />
                <button type="button" onClick={() => setShow(v => !v)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "hsl(var(--muted-foreground))", display: "flex", padding: 0 }}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" style={{ width: "100%", padding: "0.9rem", borderRadius: "var(--radius-full)", background: "hsl(var(--primary))", color: "white", fontWeight: 700, fontSize: "0.975rem", border: "none", cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.35)", fontFamily: "inherit" }}>
              Se connecter
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
            Pas encore de compte ?{" "}
            <Link href="/auth/register" style={{ color: "hsl(var(--primary))", fontWeight: 600 }}>Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Chargement...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
