"use client";

import React, { createContext, useContext, useState } from "react";
import { CustomerUser } from "@/types";
import { MOCK_CUSTOMER } from "@/data/mock-orders";

interface AuthContextType {
  user: CustomerUser | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomerUser | null>(MOCK_CUSTOMER);

  const login = (email: string) => {
    setUser({
      ...MOCK_CUSTOMER,
      email: email || MOCK_CUSTOMER.email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
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
