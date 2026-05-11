"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

type WishlistItem = {
  id: string | number;
  type: "product";
  title: string;
  price: string | number;
  image?: string;
};

interface WishlistContextType {
  favorites: WishlistItem[];
  toggleFavorite: (item: WishlistItem) => Promise<void>;
  isFavorite: (id: string | number) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load wishlist from Supabase when user is logged in
  useEffect(() => {
    if (!user?.id) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    loadWishlist();
  }, [user?.id]);

  const loadWishlist = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("wishlist_items")
      .select(`
        product:products (id, title, price, images)
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error loading wishlist:", error);
      setLoading(false);
      return;
    }

    const wishlistItems = data?.map(item => {
      const product = Array.isArray(item.product) ? item.product[0] : item.product;
      return {
        id: product?.id || "",
        type: "product" as const,
        title: product?.title || "",
        price: product?.price || 0,
        image: product?.images?.[0],
      };
    }) || [];

    setFavorites(wishlistItems);
    setLoading(false);
  };

  const toggleFavorite = async (item: WishlistItem) => {
    if (!user?.id) return;

    const exists = favorites.find(f => f.id === item.id);
    if (exists) {
      // Remove from Supabase
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", item.id.toString());

      if (error) {
        console.error("Error removing from wishlist:", error);
        return;
      }

      setFavorites(prev => prev.filter(f => f.id !== item.id));
    } else {
      // Add to Supabase
      const { error } = await supabase.from("wishlist_items").insert({
        user_id: user.id,
        product_id: item.id.toString(),
      });

      if (error) {
        console.error("Error adding to wishlist:", error);
        return;
      }

      setFavorites(prev => [...prev, item]);
    }
  };

  const isFavorite = (id: string | number) => {
    return favorites.some(f => f.id === id);
  };

  return (
    <WishlistContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
