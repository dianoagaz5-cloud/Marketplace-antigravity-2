"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN";
  avatar?: string;
  banner?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  register: (data: { name: string; email: string; role: "CUSTOMER" | "VENDOR" }) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sync with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("marketbenin_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("marketbenin_user", JSON.stringify(user));
    } else if (!loading) {
      localStorage.removeItem("marketbenin_user");
    }
  }, [user, loading]);

  const login = (email: string) => {
    // Check local storage for registered users first
    const registeredUsersRaw = localStorage.getItem("marketbenin_registered_users");
    if (registeredUsersRaw) {
      const registeredUsers = JSON.parse(registeredUsersRaw);
      const found = registeredUsers.find((u: User) => u.email === email);
      if (found) {
        setUser(found);
        return;
      }
    }

    let mockUser: User;
    if (email === "vendeur@demo.bj") {
      mockUser = { name: "Kofi Boutique", email, role: "VENDOR", avatar: "" };
    } else if (email === "admin@demo.bj") {
      mockUser = { name: "Admin MarketBénin", email, role: "ADMIN", avatar: "" };
    } else {
      mockUser = { name: "Client Démo", email, role: "CUSTOMER", avatar: "" };
    }
    setUser(mockUser);
  };

  const register = (data: { name: string; email: string; role: "CUSTOMER" | "VENDOR" }) => {
    const newUser: User = { 
      name: data.name, 
      email: data.email, 
      role: data.role,
      avatar: "" 
    };
    
    // Save to registered users list
    const registeredUsersRaw = localStorage.getItem("marketbenin_registered_users");
    const registeredUsers = registeredUsersRaw ? JSON.parse(registeredUsersRaw) : [];
    registeredUsers.push(newUser);
    localStorage.setItem("marketbenin_registered_users", JSON.stringify(registeredUsers));
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    router.push("/");
  };

  const updateUser = (data: Partial<User>) => {
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
