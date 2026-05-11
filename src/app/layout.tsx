import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ChatProvider } from "@/context/ChatContext";
import AIAssistant from "@/components/ui/AIAssistant";

export const metadata: Metadata = {
  title: "MarketBénin — La boutique en ligne premium du Bénin",
  description:
    "Découvrez nos produits physiques sélectionnés. Contactez-nous directement sur WhatsApp pour passer commande.",
  keywords: ["boutique", "bénin", "cotonou", "acheter", "produits", "ecommerce"],
  openGraph: {
    title: "MarketBénin",
    description: "La boutique en ligne premium du Bénin",
    locale: "fr_BJ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ChatProvider>
              <WishlistProvider>
                <CartProvider>
                  <Header />
                  <Breadcrumb />
                  <main style={{ flex: 1 }}>{children}</main>
                  <Footer />
                  <AIAssistant />
                </CartProvider>
              </WishlistProvider>
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
