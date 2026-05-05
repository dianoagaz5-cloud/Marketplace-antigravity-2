"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type WishlistItem = {
  id: string | number;
  type: "product";
  title: string;
  price: string | number;
  image?: string;
};

interface WishlistContextType {
  favorites: WishlistItem[];
  toggleFavorite: (item: WishlistItem) => void;
  isFavorite: (id: string | number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<WishlistItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("marketbenin_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("marketbenin_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item: WishlistItem) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) {
        return prev.filter(f => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorite = (id: string | number) => {
    return favorites.some(f => f.id === id);
  };

  return (
    <WishlistContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
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
