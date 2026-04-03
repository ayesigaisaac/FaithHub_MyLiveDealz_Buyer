import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/types/roles";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  community: string;
  status: "active" | "idle";
};

type LoginInput = {
  email: string;
  password: string;
  role?: Role;
};

type AuthContextValue = {
  user: AuthUser | null;
  role: Role;
  currentRole: Role;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<AuthUser>;
  mockLoginAsRole: (role: Role) => Promise<AuthUser>;
  logout: () => void;
  switchRole: (role: Role) => void;
  setRole: (role: Role) => void;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  hasRole: (role: Role) => boolean;
  isAdmin: boolean;
  isProvider: boolean;
  isUser: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_STORAGE_KEY = "faithhub.auth.session.v1";

function isRole(value: unknown): value is Role {
  return value === "admin" || value === "provider" || value === "user";
}

function normalizeNameFromEmail(email: string) {
  const local = email.split("@")[0] || "faithhub-user";
  const clean = local.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  if (!clean) return "FaithHub User";
  return clean
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolveRoleFromEmail(email: string): Role {
  const normalized = email.toLowerCase();
  if (normalized.includes("admin")) return "admin";
  if (
    normalized.includes("provider") ||
    normalized.includes("pastor") ||
    normalized.includes("leader")
  ) {
    return "provider";
  }
  return "user";
}

function parseStoredUser(raw: string | null): AuthUser | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (!parsed || typeof parsed !== "object") return null;
    if (
      typeof parsed.id !== "string" ||
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      !isRole(parsed.role)
    ) {
      return null;
    }
    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role,
      community: typeof parsed.community === "string" ? parsed.community : "FaithHub Community",
      status: parsed.status === "idle" ? "idle" : "active",
    };
  } catch {
    return null;
  }
}

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  return parseStoredUser(window.localStorage.getItem(SESSION_STORAGE_KEY));
}

function persistUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

function buildMockUser(email: string, role: Role): AuthUser {
  const normalizedEmail = email.trim().toLowerCase();
  return {
    id: `auth-${role}-${Date.now()}`,
    name: normalizeNameFromEmail(normalizedEmail),
    email: normalizedEmail,
    role,
    community: role === "admin" ? "FaithHub Command Center" : "FaithHub Community",
    status: "active",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const role: Role = user?.role || "user";

  useEffect(() => {
    persistUser(user);
  }, [user]);

  const value = useMemo<AuthContextValue>(() => {
    const login = async ({ email, password, role: preferredRole }: LoginInput) => {
      const safeEmail = email.trim();
      if (!safeEmail || !password.trim()) {
        throw new Error("Email and password are required for mock login.");
      }
      const nextRole = preferredRole || resolveRoleFromEmail(safeEmail);
      const nextUser = buildMockUser(safeEmail, nextRole);
      setUser(nextUser);
      return nextUser;
    };

    const mockLoginAsRole = async (requestedRole: Role) => {
      const email = `${requestedRole}@faithhub.app`;
      const nextUser = buildMockUser(email, requestedRole);
      setUser(nextUser);
      return nextUser;
    };

    const switchRole = (nextRole: Role) => {
      setUser((previous) => {
        if (!previous) {
          return buildMockUser(`${nextRole}@faithhub.app`, nextRole);
        }
        return {
          ...previous,
          role: nextRole,
          community: nextRole === "admin" ? "FaithHub Command Center" : "FaithHub Community",
        };
      });
    };

    const hasRole = (targetRole: Role) => role === targetRole;

    return {
      user,
      role,
      currentRole: role,
      isAuthenticated: Boolean(user),
      login,
      mockLoginAsRole,
      logout: () => setUser(null),
      switchRole,
      setRole: switchRole,
      setUser,
      hasRole,
      isAdmin: hasRole("admin"),
      isProvider: hasRole("provider"),
      isUser: hasRole("user"),
    };
  }, [role, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}

