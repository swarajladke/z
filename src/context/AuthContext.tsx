"use client";

import React, { createContext, useContext, useState } from "react";
import { CustomerUser } from "@/types";
import { MOCK_CUSTOMER } from "@/data/mock-orders";

interface AuthContextType {
  user: CustomerUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, role?: "customer" | "admin") => void;
  logout: () => void;
  toggleAdminRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomerUser | null>(MOCK_CUSTOMER);

  const login = (email: string, role: "customer" | "admin" = "customer") => {
    setUser({
      ...MOCK_CUSTOMER,
      email: email || MOCK_CUSTOMER.email,
      role: role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleAdminRole = () => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            role: prev.role === "admin" ? "customer" : "admin",
          }
        : null
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
        toggleAdminRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
