import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/types/roles";

type AuthUser = {
  name: string;
  role: Role;
};

type AuthContextValue = {
  user: AuthUser | null;
  currentRole: Role;
  role: Role;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  setRole: (role: Role) => void;
  hasRole: (role: Role) => boolean;
  isAdmin: boolean;
  isProvider: boolean;
  isUser: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const ROLE_STORAGE_KEY = "faithhub.currentRole";

const defaultUser: AuthUser = {
  name: "Brian",
  role: "admin",
};

function getStoredRole(): Role | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(ROLE_STORAGE_KEY);
  if (stored === "admin" || stored === "provider" || stored === "user") return stored;
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedRole = getStoredRole();
    return {
      ...defaultUser,
      role: storedRole || defaultUser.role,
    };
  });

  const currentRole: Role = user?.role || "user";

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ROLE_STORAGE_KEY, currentRole);
  }, [currentRole]);

  const value = useMemo<AuthContextValue>(() => {
    const hasRole = (targetRole: Role) => currentRole === targetRole;
    return {
      user,
      currentRole,
      role: currentRole,
      setUser,
      setRole: (nextRole: Role) =>
        setUser((prev) => ({
          name: prev?.name || defaultUser.name,
          role: nextRole,
        })),
      hasRole,
      isAdmin: hasRole("admin"),
      isProvider: hasRole("provider"),
      isUser: hasRole("user"),
    };
  }, [currentRole, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
