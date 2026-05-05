"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  avatar?: string;
  banner?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: { name: string; email: string; password: string }) => void;
  logout: () => void;
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

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ name: "Administrateur", email, role: "ADMIN", avatar: "" });
      return true;
    }

    // Check registered users
    const registeredUsersRaw = localStorage.getItem("marketbenin_registered_users");
    if (registeredUsersRaw) {
      const registeredUsers = JSON.parse(registeredUsersRaw);
      const found = registeredUsers.find((u: User & { password: string }) => u.email === email && u.password === password);
      if (found) {
        setUser({ name: found.name, email: found.email, role: "CUSTOMER", avatar: found.avatar || "" });
        return true;
      }
    }

    return false;
  };

  const register = (data: { name: string; email: string; password: string }) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "CUSTOMER" as const,
      avatar: "",
    };

    const registeredUsersRaw = localStorage.getItem("marketbenin_registered_users");
    const registeredUsers = registeredUsersRaw ? JSON.parse(registeredUsersRaw) : [];
    registeredUsers.push(newUser);
    localStorage.setItem("marketbenin_registered_users", JSON.stringify(registeredUsers));

    setUser({ name: data.name, email: data.email, role: "CUSTOMER", avatar: "" });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("marketbenin_user");
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
