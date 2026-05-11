"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type User = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  avatar?: string;
  banner?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials (hardcoded for demo purposes)
const ADMIN_EMAIL = "admin@marketbenin.bj";
const ADMIN_PASSWORD = "Admin2026!";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        mapSupabaseUser(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        mapSupabaseUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapSupabaseUser = async (supabaseUser: SupabaseUser) => {
    const email = supabaseUser.email || "";
    const isAdmin = email === ADMIN_EMAIL;

    // Check if user exists in our users table, if not create it
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!existingUser) {
      // Create user in database
      const { data: newUser } = await supabase
        .from("users")
        .insert({
          id: supabaseUser.id,
          email: email,
          name: supabaseUser.user_metadata?.name || email.split("@")[0],
          role: isAdmin ? "ADMIN" : "CUSTOMER",
          avatar: supabaseUser.user_metadata?.avatar_url || "",
        })
        .select()
        .single();

      if (newUser) {
        setUser({
          id: newUser.id,
          name: newUser.name || "",
          email: newUser.email,
          role: newUser.role as "CUSTOMER" | "ADMIN",
          avatar: newUser.avatar || "",
        });
      }
    } else {
      setUser({
        id: existingUser.id,
        name: existingUser.name || "",
        email: existingUser.email,
        role: existingUser.role as "CUSTOMER" | "ADMIN",
        avatar: existingUser.avatar || "",
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (data: { name: string; email: string; password: string }): Promise<boolean> => {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) {
        console.error("Register error:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;

    // Update in database
    await supabase
      .from("users")
      .update({
        name: data.name,
        avatar: data.avatar,
      })
      .eq("id", user.id);

    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
