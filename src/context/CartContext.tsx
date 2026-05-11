"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
  refCode?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  updateQty: (id: number, delta: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  count: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load cart from Supabase when user is logged in
  useEffect(() => {
    if (!user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }

    loadCart();
  }, [user?.id]);

  const loadCart = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        quantity,
        product:products (id, title, price, images, ref_code)
      `)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error loading cart:", error);
      setLoading(false);
      return;
    }

    const cartItems = data?.map(item => {
      const product = Array.isArray(item.product) ? item.product[0] : item.product;
      return {
        id: Number(product?.id),
        name: product?.title || "",
        price: product?.price || 0,
        qty: item.quantity || 1,
        img: product?.images?.[0] || "",
        refCode: product?.ref_code,
      };
    }) || [];

    setItems(cartItems);
    setLoading(false);
  };

  const addItem = async (item: Omit<CartItem, "qty">) => {
    if (!user?.id) return;

    const existing = items.find(i => i.id === item.id);
    if (existing) {
      await updateQty(item.id, 1);
      return;
    }

    // Add to Supabase
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: item.id.toString(),
      quantity: 1,
    });

    if (error) {
      console.error("Error adding to cart:", error);
      return;
    }

    setItems(prev => [...prev, { ...item, qty: 1 }]);
  };

  const removeItem = async (id: number) => {
    if (!user?.id) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", id.toString());

    if (error) {
      console.error("Error removing from cart:", error);
      return;
    }

    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = async (id: number, delta: number) => {
    if (!user?.id) return;

    const item = items.find(i => i.id === id);
    if (!item) return;

    const newQty = Math.max(0, item.qty + delta);
    if (newQty === 0) {
      await removeItem(id);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("user_id", user.id)
      .eq("product_id", id.toString());

    if (error) {
      console.error("Error updating cart:", error);
      return;
    }

    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, qty: newQty } : i))
    );
  };

  const clearCart = async () => {
    if (!user?.id) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error clearing cart:", error);
      return;
    }

    setItems([]);
  };

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
