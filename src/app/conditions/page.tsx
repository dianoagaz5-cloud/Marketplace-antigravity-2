export default function TermsPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 1.5rem" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "3rem" }}>Conditions Générales</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", lineHeight: 1.7, color: "hsl(var(--muted-foreground))" }}>
        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>1. Introduction</h2>
          <p>Bienvenue sur MarketBénin. En utilisant notre plateforme, vous acceptez pleinement et sans réserve les présentes conditions générales d'utilisation. Si vous n'êtes pas d'accord avec tout ou partie de ces conditions, vous ne devez pas utiliser ce site.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>2. Services Proposés</h2>
          <p>MarketBénin est une plateforme de mise en relation entre acheteurs et vendeurs. Nous proposons trois types de contenus : des produits physiques, des services professionnels et des produits numériques (ebooks). MarketBénin agit en tant qu'intermédiaire et n'est pas le vendeur direct des produits, sauf mention contraire.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>3. Inscription et Compte</h2>
          <p>Pour effectuer des achats ou vendre sur la plateforme, la création d'un compte peut être requise. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>4. Paiements et Sécurité</h2>
          <p>Les paiements sont effectués via les solutions de paiement mobile locales (MTN, Moov, Celtiis). MarketBénin garantit la sécurité des transactions via des protocoles de cryptage standards. Les fonds sont reversés aux vendeurs après confirmation de la réception du produit ou du service par l'acheteur.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>5. Propriété Intellectuelle</h2>
          <p>Tout le contenu présent sur le site (logos, textes, images, ebooks) est protégé par le droit d'auteur. Toute reproduction non autorisée est strictement interdite.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>6. Modifications des Conditions</h2>
          <p>MarketBénin se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés des changements majeurs via la plateforme.</p>
        </section>

        <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", background: "hsl(var(--muted) / 0.4)", fontSize: "0.9rem", marginTop: "2rem" }}>
          Dernière mise à jour : 30 Avril 2026. Pour toute question, contactez-nous à legal@marketbenin.bj
        </div>
      </div>
    </div>
  );
}
