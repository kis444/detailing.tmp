"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Simple password protection - In production, use proper authentication
const ADMIN_PASSWORD = "admin123";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
  };

  if (!mounted) {
    return null;
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
