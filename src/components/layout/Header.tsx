"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, User, Sun, Moon, X,
  ChevronDown, Plus, Package, Briefcase, BookOpen,
  Shirt, Cpu, Home, Gem, UtensilsCrossed, Dumbbell,
  Code2, Palette, Wrench, Camera, TrendingUp, 
  BookMarked, Globe, ChefHat, Heart, MessageSquare
} from "lucide-react";
import styles from "./Header.module.css";
import CartDrawer from "@/components/ui/CartDrawer";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { LogOut, LayoutDashboard, Settings, Shield } from "lucide-react";

/* ── Mega-menu data ── */
const BOUTIQUE_ITEMS = [
  { icon: Shirt,         label: "Mode & Vêtements",    href: "/boutique?cat=mode" },
  { icon: Cpu,           label: "Électronique",         href: "/boutique?cat=electronique" },
  { icon: Home,          label: "Maison & Déco",        href: "/boutique?cat=maison" },
  { icon: Gem,           label: "Bijoux & Accessoires", href: "/boutique?cat=bijoux" },
  { icon: UtensilsCrossed, label: "Alimentation",       href: "/boutique?cat=alimentation" },
  { icon: Dumbbell,      label: "Sport & Fitness",      href: "/boutique?cat=sport" },
];

const SERVICES_ITEMS = [
  { icon: Code2,    label: "Développement & IT",   href: "/services?cat=it" },
  { icon: Palette,  label: "Design & Création",    href: "/services?cat=design" },
  { icon: Wrench,   label: "Réparation & Entretien",href: "/services?cat=reparation" },
  { icon: Camera,   label: "Photo & Vidéo",        href: "/services?cat=media" },
  { icon: TrendingUp, label: "Marketing Digital",  href: "/services?cat=marketing" },
  { icon: Globe,    label: "Traduction & Rédaction",href: "/services?cat=redaction" },
];

const EBOOKS_ITEMS = [
  { icon: TrendingUp, label: "Business & Finance",  href: "/ebooks?cat=business" },
  { icon: Code2,      label: "Programmation",        href: "/ebooks?cat=dev" },
  { icon: ChefHat,    label: "Cuisine & Recettes",   href: "/ebooks?cat=cuisine" },
  { icon: BookMarked, label: "Développement perso",  href: "/ebooks?cat=developpement-perso" },
];

const VENDRE_ITEMS = [
  { icon: Package,   label: "Vendre un produit",   href: "/vendre/produit", desc: "Vendez vos articles physiques" },
  { icon: Briefcase, label: "Proposer un service",  href: "/vendre/service", desc: "Offrez vos compétences" },
  { icon: BookOpen,  label: "Publier un Ebook",     href: "/vendre/ebook",   desc: "Monétisez votre savoir" },
];

/* ── Animation variants ── */
const menuVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.12 } },
};

export default function Header() {
  const [openMenu, setOpenMenu]     = useState<string | null>(null);
  const [cartOpen, setCartOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { theme, setTheme }         = useTheme();
  const { favorites }               = useWishlist();
  const { user, logout }            = useAuth();
  const pathname                    = usePathname();
  const headerRef                   = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpenMenu(null); setSearchOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (key: string) => setOpenMenu(prev => prev === key ? null : key);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>

          {/* ── Logo ── */}
          <Link href="/" className={styles.logo} aria-label="Accueil MarketBénin">
            <span className={styles.logoMark}>M</span>
            <span className={styles.logoText}>Market<strong>Bénin</strong></span>
          </Link>

          {/* ── Nav ── */}
          <nav className={styles.nav} aria-label="Navigation principale">

            {/* Boutique */}
            <div className={styles.navItem} onMouseEnter={() => setOpenMenu("boutique")} onMouseLeave={() => setOpenMenu(null)}>
              <Link href="/boutique" className={`${styles.navLink} ${pathname.startsWith("/boutique") ? styles.active : ""}`}>
                Boutique
                <ChevronDown size={13} className={`${styles.chevron} ${openMenu === "boutique" ? styles.open : ""}`} />
              </Link>
              <AnimatePresence>
                {openMenu === "boutique" && (
                  <motion.div className={styles.megaMenu} variants={menuVariants} initial="hidden" animate="visible" exit="exit">
                    <div className={styles.megaGrid}>
                      {BOUTIQUE_ITEMS.map(i => (
                        <Link key={i.href} href={i.href} className={styles.megaItem}>
                          <i.icon size={16} className={styles.megaIcon} />
                          {i.label}
                        </Link>
                      ))}
                    </div>
                    <div className={styles.megaFooter}>
                      <Link href="/boutique" className={styles.megaFooterLink}>Voir tout le catalogue →</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services */}
            <div className={styles.navItem} onMouseEnter={() => setOpenMenu("services")} onMouseLeave={() => setOpenMenu(null)}>
              <Link href="/services" className={`${styles.navLink} ${pathname.startsWith("/services") ? styles.active : ""}`}>
                Services
                <ChevronDown size={13} className={`${styles.chevron} ${openMenu === "services" ? styles.open : ""}`} />
              </Link>
              <AnimatePresence>
                {openMenu === "services" && (
                  <motion.div className={styles.megaMenu} variants={menuVariants} initial="hidden" animate="visible" exit="exit">
                    <div className={styles.megaGrid}>
                      {SERVICES_ITEMS.map(i => (
                        <Link key={i.href} href={i.href} className={styles.megaItem}>
                          <i.icon size={16} className={styles.megaIcon} />
                          {i.label}
                        </Link>
                      ))}
                    </div>
                    <div className={styles.megaFooter}>
                      <Link href="/services" className={styles.megaFooterLink}>Tous les services →</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ebooks */}
            <div className={styles.navItem} onMouseEnter={() => setOpenMenu("ebooks")} onMouseLeave={() => setOpenMenu(null)}>
              <Link href="/ebooks" className={`${styles.navLink} ${pathname.startsWith("/ebooks") ? styles.active : ""}`}>
                Ebooks
                <ChevronDown size={13} className={`${styles.chevron} ${openMenu === "ebooks" ? styles.open : ""}`} />
              </Link>
              <AnimatePresence>
                {openMenu === "ebooks" && (
                  <motion.div className={styles.megaMenu} variants={menuVariants} initial="hidden" animate="visible" exit="exit">
                    <div className={`${styles.megaGrid} ${styles.megaGrid4}`}>
                      {EBOOKS_ITEMS.map(i => (
                        <Link key={i.href} href={i.href} className={styles.megaItem}>
                          <i.icon size={16} className={styles.megaIcon} />
                          {i.label}
                        </Link>
                      ))}
                    </div>
                    <div className={styles.megaFooter}>
                      <Link href="/ebooks" className={styles.megaFooterLink}>Toute la bibliothèque →</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/vendeurs" className={`${styles.navLink} ${pathname === "/vendeurs" ? styles.active : ""}`}>
              Vendeurs
            </Link>
          </nav>

          {/* ── Actions ── */}
          <div className={styles.actions}>

            {/* Search toggle */}
            <button
              className={styles.iconBtn}
              onClick={() => setSearchOpen(v => !v)}
              aria-label="Rechercher"
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>

            {/* Theme */}
            {mounted && (
              <button
                className={styles.iconBtn}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Changer le thème"
              >
                {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
              </button>
            )}

            {/* Favorites */}
            <Link 
              href="/favoris" 
              className={styles.iconBtn} 
              aria-label="Mes favoris"
            >
              <Heart size={19} />
              {favorites.length > 0 && <span className={styles.cartBadge}>{favorites.length}</span>}
            </Link>

            {/* Cart */}
            <button
              className={styles.iconBtn}
              onClick={() => setCartOpen(true)}
              aria-label="Panier"
            >
              <ShoppingBag size={19} />
              <span className={styles.cartBadge}>2</span>
            </button>

            {/* Messages */}
            <Link 
              href="/messages" 
              className={styles.iconBtn} 
              aria-label="Mes messages"
            >
              <MessageSquare size={19} />
              <span className={styles.cartBadge} style={{ background: "hsl(var(--primary))" }}>1</span>
            </Link>

            {/* Compte */}
            <div 
              className={styles.navItem}
              onMouseEnter={() => setOpenMenu("user")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link href={user ? "/profile" : "/auth/login"} className={styles.iconBtn} aria-label="Mon compte">
                <User size={19} />
              </Link>
              <AnimatePresence>
                {openMenu === "user" && user && (
                  <motion.div className={`${styles.megaMenu} ${styles.userMenu}`} variants={menuVariants} initial="hidden" animate="visible" exit="exit">
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>
                        {user.avatar ? <img src={user.avatar} alt={user.name} /> : <span>{user.name[0]}</span>}
                      </div>
                      <div>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                      </div>
                    </div>
                    <div className={styles.userMenuLinks}>
                      {user.role === "VENDOR" && (
                        <Link href="/dashboard" className={styles.userMenuLink}>
                          <LayoutDashboard size={16} /> Dashboard Vendeur
                        </Link>
                      )}
                      {user.role === "ADMIN" && (
                        <Link href="/admin" className={styles.userMenuLink}>
                          <Shield size={16} /> Administration
                        </Link>
                      )}
                      <Link href="/profile/settings" className={styles.userMenuLink}>
                        <Settings size={16} /> Paramètres du profil
                      </Link>
                      <button onClick={logout} className={`${styles.userMenuLink} ${styles.logoutBtn}`}>
                        <LogOut size={16} /> Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vendre CTA */}
            <div
              className={styles.navItem}
              onMouseEnter={() => setOpenMenu("vendre")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link href="/vendre" className={styles.ctaBtn}>
                <Plus size={15} strokeWidth={2.5} />
                Vendre
              </Link>
              <AnimatePresence>
                {openMenu === "vendre" && (
                  <motion.div className={`${styles.megaMenu} ${styles.vendreMenu}`} variants={menuVariants} initial="hidden" animate="visible" exit="exit">
                    {VENDRE_ITEMS.map(i => (
                      <Link key={i.href} href={i.href} className={styles.vendreItem}>
                        <div className={styles.vendreIconWrap}>
                          <i.icon size={18} />
                        </div>
                        <div>
                          <div className={styles.vendreItemLabel}>{i.label}</div>
                          <div className={styles.vendreItemDesc}>{i.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Search bar (expandable) ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className={styles.searchBar}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
            >
              <div className={styles.searchInner}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher un produit, un service, un ebook..."
                  className={styles.searchInput}
                />
                <button className={styles.searchClose} onClick={() => setSearchOpen(false)}>
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
