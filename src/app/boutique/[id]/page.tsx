"use client";

import { use } from "react";
import { Package, ShoppingCart, Heart, Share2, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // Mock data for the product based on ID
  const { id } = use(params);
  
  return (
    <div className={styles.page}>
      <div className={styles.productContainer}>
        {/* IMAGE GALLERY */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Package size={120} opacity={0.2} />
          </div>
          <div className={styles.thumbnailList}>
            <div className={`${styles.thumbnail} ${styles.active}`} />
            <div className={styles.thumbnail} />
            <div className={styles.thumbnail} />
            <div className={styles.thumbnail} />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className={styles.info}>
          <div className={styles.header}>
            <span className={styles.category}>Mode & Accessoires</span>
            <h1 className={styles.title}>Sneakers Premium Edition ({id})</h1>
            <span className={styles.price}>25 000 FCFA</span>
          </div>

          <div className={styles.vendorInfo}>
            <div className={styles.vendorAvatar}>
              <Package size={20} />
            </div>
            <div className={styles.vendorDetails}>
              <span className={styles.vendorName}>
                Boutique Cotonou <CheckCircle2 size={14} color="hsl(var(--primary))" />
              </span>
              <span className={styles.vendorRating}>
                <Star size={12} fill="currentColor" color="hsl(var(--primary))" /> 4.8 (124 avis)
              </span>
            </div>
          </div>

          <div className={styles.description}>
            <h3>Description du produit</h3>
            <p>
              Découvrez nos sneakers premium, conçues pour allier confort et style. 
              Fabriquées avec des matériaux de haute qualité, elles offrent une respirabilité optimale 
              et un maintien parfait pour vos journées actives. Parfaites pour le climat local tout 
              en gardant une esthétique moderne.
            </p>
          </div>

          <div className={styles.actions}>
            <button className={styles.btnPrimary}>
              <ShoppingCart size={20} /> Ajouter au panier
            </button>
            <button className={styles.btnSecondary}>
              <Heart size={20} /> Ajouter aux favoris
            </button>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', alignItems: 'center' }}>
            <ShieldCheck size={18} color="hsl(var(--primary))" /> Paiement sécurisé via MTN MoMo, Moov Money.
          </div>
        </div>
      </div>
    </div>
  );
}
