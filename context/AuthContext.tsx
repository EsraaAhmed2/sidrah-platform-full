"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Role = "student" | "teacher" | "admin";

export interface User {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string, role?: Role) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidrah-user");
    if (saved) setUser(JSON.parse(saved));
    setReady(true);
  }, []);

  const login = (email: string, name?: string, role: Role = "student") => {
    const u: User = { email, name: name || email.split("@")[0], role };
    setUser(u);
    localStorage.setItem("sidrah-user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sidrah-user");
  };

  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
