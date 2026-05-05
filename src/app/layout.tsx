import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/ui/AIAssistant";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "MarketBénin — La marketplace premium du Bénin",
  description:
    "Achetez et vendez en toute confiance : produits, services et ebooks — paiement sécurisé via MTN MoMo et Moov.",
  keywords: ["marketplace", "bénin", "cotonou", "acheter", "vendre", "ecommerce"],
  openGraph: {
    title: "MarketBénin",
    description: "La marketplace premium du Bénin",
    locale: "fr_BJ",
    type: "website",
  },
};

import { ChatProvider } from "@/context/ChatContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ChatProvider>
              <WishlistProvider>
                <Header />
                <main style={{ flex: 1 }}>{children}</main>
                <Footer />
                <AIAssistant />
              </WishlistProvider>
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
