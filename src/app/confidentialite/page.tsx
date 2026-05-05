export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "6rem 1.5rem" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "3rem" }}>Confidentialité</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", lineHeight: 1.7, color: "hsl(var(--muted-foreground))" }}>
        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>Collecte des Données</h2>
          <p>Nous collectons les informations nécessaires au bon fonctionnement de vos transactions : nom, email, numéro de téléphone pour les paiements mobiles, et adresse de livraison. Ces données sont collectées uniquement avec votre consentement.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>Utilisation de vos Informations</h2>
          <p>Vos données sont utilisées pour traiter vos commandes, personnaliser votre expérience sur la plateforme et vous informer des mises à jour de vos transactions. Nous ne vendons jamais vos données personnelles à des tiers.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>Sécurité des Paiements</h2>
          <p>Les transactions financières sont gérées directement par nos partenaires de paiement sécurisé. MarketBénin ne stocke aucun code PIN ou information bancaire sensible sur ses propres serveurs.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>Vos Droits</h2>
          <p>Conformément à la législation en vigueur sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez exercer ces droits depuis les paramètres de votre compte ou en nous contactant.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "hsl(var(--foreground))", marginBottom: "1rem" }}>Cookies</h2>
          <p>Nous utilisons des cookies essentiels pour maintenir votre session ouverte et enregistrer vos préférences de navigation (comme vos articles favoris).</p>
        </section>

        <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", background: "hsl(var(--muted) / 0.4)", fontSize: "0.9rem", marginTop: "2rem" }}>
          MarketBénin s'engage pour une transparence totale sur l'usage de vos données. Pour plus d'infos : privacy@marketbenin.bj
        </div>
      </div>
    </div>
  );
}
