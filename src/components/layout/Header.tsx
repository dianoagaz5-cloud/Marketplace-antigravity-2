"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, User, Sun, Moon, X, Menu,
  ChevronDown, Shirt, Cpu, Home, Gem, UtensilsCrossed, Dumbbell,
  Heart, MessageSquare
} from "lucide-react";
import styles from "./Header.module.css";
import CartDrawer from "@/components/ui/CartDrawer";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { LogOut, Settings, Shield } from "lucide-react";

/* ── Mega-menu data ── */
const BOUTIQUE_ITEMS = [
  { icon: Shirt,         label: "Mode & Vêtements",    href: "/boutique?cat=mode" },
  { icon: Cpu,           label: "Électronique",         href: "/boutique?cat=electronique" },
  { icon: Home,          label: "Maison & Déco",        href: "/boutique?cat=maison" },
  { icon: Gem,           label: "Bijoux & Accessoires", href: "/boutique?cat=bijoux" },
  { icon: UtensilsCrossed, label: "Alimentation",       href: "/boutique?cat=alimentation" },
  { icon: Dumbbell,      label: "Sport & Fitness",      href: "/boutique?cat=sport" },
];

/* ── Animation variants ── */
const menuVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.12 } },
};

export default function Header() {
  const [openMenu, setOpenMenu]     = useState<string | null>(null);
  const [cartOpen, setCartOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const { theme, setTheme }         = useTheme();
  const { favorites }               = useWishlist();
  const { user, logout }            = useAuth();
  const { count }                   = useCart();
  const pathname                    = usePathname();
  const headerRef                   = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpenMenu(null); setSearchOpen(false); setMobileOpen(false); }, [pathname]);

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

            <Link href="/boutique" className={`${styles.navLink} ${pathname === "/boutique" ? styles.active : ""}`}>
              Tous les produits
            </Link>
            <Link href="/contact" className={`${styles.navLink} ${pathname === "/contact" ? styles.active : ""}`}>
              Contact
            </Link>
          </nav>

          {/* ── Mobile burger ── */}
          <button
            className={`${styles.iconBtn} ${styles.burger}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* ── Actions ── */}
          <div className={styles.actions}>

            {/* Search toggle */}
            <button
              className={`${styles.iconBtn} ${styles.hideMobileSm}`}
              onClick={() => setSearchOpen(v => !v)}
              aria-label="Rechercher"
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>

            {/* Theme */}
            {mounted && (
              <button
                className={`${styles.iconBtn} ${styles.hideMobileSm}`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Changer le thème"
              >
                {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
              </button>
            )}

            {/* Favorites */}
            <Link
              href="/favoris"
              className={`${styles.iconBtn} ${styles.hideMobileSm}`}
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
              {count > 0 && <span className={styles.cartBadge}>{count}</span>}
            </button>

            {/* Messages */}
            <Link
              href="/messages"
              className={`${styles.iconBtn} ${styles.hideMobileSm}`}
              aria-label="Mes messages"
            >
              <MessageSquare size={19} />
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
          </div>
        </div>

        {/* ── Search bar (expandable) ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className={styles.searchBar}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, transition: { duration: 0.2 } }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
            >
              <div className={styles.searchInner}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher un produit..."
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

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
          >
            <nav className={styles.mobileNav} aria-label="Navigation mobile">
              <Link href="/boutique" className={`${styles.mobileLink} ${pathname.startsWith("/boutique") ? styles.mobileActive : ""}`}>
                Boutique
              </Link>
              {BOUTIQUE_ITEMS.map(i => (
                <Link key={i.href} href={i.href} className={styles.mobileSublink}>
                  <i.icon size={16} /> {i.label}
                </Link>
              ))}
              <Link href="/contact" className={`${styles.mobileLink} ${pathname === "/contact" ? styles.mobileActive : ""}`}>
                Contact
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className={`${styles.mobileLink} ${pathname.startsWith("/profile") ? styles.mobileActive : ""}`}>
                    Mon profil
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link href="/admin" className={`${styles.mobileLink} ${pathname.startsWith("/admin") ? styles.mobileActive : ""}`}>
                      Administration
                    </Link>
                  )}
                  <button onClick={logout} className={styles.mobileLogout}>
                    <LogOut size={16} /> Déconnexion
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className={styles.mobileLink}>Se connecter</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
