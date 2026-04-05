import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/types/roles";
import { addAuthAuditRecord } from "@/data/authAudit";
import {
  AUTH_NOTICE_REASONS,
  AUTH_SESSION_EXPIRY_MS,
  AUTH_STORAGE_KEYS,
  getAllRoleSessionStorageKeys,
  getRoleSessionStorageKey,
} from "@/constants/auth";
import { isRole } from "@/auth/roleRouting";
import { setAuthNotice } from "@/auth/noticeStorage";

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
  isAuthLoading: boolean;
  sessionExpiresAt: number | null;
  login: (input: LoginInput) => Promise<AuthUser>;
  mockLoginAsRole: (role: Role, source?: "social" | "access") => Promise<AuthUser>;
  logout: () => void;
  logoutAllRoles: () => void;
  switchRole: (role: Role) => void;
  setRole: (role: Role) => void;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  hasRole: (role: Role) => boolean;
  isAdmin: boolean;
  isProvider: boolean;
  isUser: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type StoredFaithHubUser = {
  email: string;
  role: Role;
  expiresAt?: number;
};

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
    const parsed = JSON.parse(raw) as Partial<AuthUser> | Partial<StoredFaithHubUser>;
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.email !== "string" || !isRole(parsed.role)) {
      return null;
    }
    const normalizedEmail = parsed.email.trim().toLowerCase();
    const normalizedRole = parsed.role;
    const legacyAuthUser = parsed as Partial<AuthUser>;
    const withExpiry = parsed as Partial<StoredFaithHubUser>;
    if (typeof withExpiry.expiresAt === "number" && withExpiry.expiresAt < Date.now()) {
      setAuthNotice(AUTH_NOTICE_REASONS.sessionExpired);
      return null;
    }
    return {
      id: typeof legacyAuthUser.id === "string" ? legacyAuthUser.id : `auth-${normalizedRole}-persisted`,
      name:
        typeof legacyAuthUser.name === "string" && legacyAuthUser.name.trim().length > 0
          ? legacyAuthUser.name
          : normalizeNameFromEmail(normalizedEmail),
      email: normalizedEmail,
      role: normalizedRole,
      community:
        typeof legacyAuthUser.community === "string"
          ? legacyAuthUser.community
          : normalizedRole === "admin"
          ? "FaithHub Command Center"
          : "FaithHub Community",
      status: legacyAuthUser.status === "idle" ? "idle" : "active",
    };
  } catch {
    return null;
  }
}

function readActiveRole(): Role {
  if (typeof window === "undefined") return "user";
  const raw = window.localStorage.getItem(AUTH_STORAGE_KEYS.activeRole);
  return isRole(raw) ? raw : "user";
}

function persistActiveRole(role: Role) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEYS.activeRole, role);
}

function readStoredSession(role: Role): AuthUser | null {
  if (typeof window === "undefined") return null;
  return parseStoredUser(window.localStorage.getItem(getRoleSessionStorageKey(role)));
}

function persistSession(role: Role, user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    window.localStorage.removeItem(getRoleSessionStorageKey(role));
    return;
  }
  const storedUser: StoredFaithHubUser = {
    email: user.email,
    role,
    expiresAt: Date.now() + AUTH_SESSION_EXPIRY_MS,
  };
  window.localStorage.setItem(getRoleSessionStorageKey(role), JSON.stringify(storedUser));
}

function mirrorActiveSession(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    window.localStorage.removeItem(AUTH_STORAGE_KEYS.activeUser);
    return;
  }
  const storedUser: StoredFaithHubUser = {
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + AUTH_SESSION_EXPIRY_MS,
  };
  window.localStorage.setItem(AUTH_STORAGE_KEYS.activeUser, JSON.stringify(storedUser));
}

function consumeLegacySession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const current = parseStoredUser(window.localStorage.getItem(AUTH_STORAGE_KEYS.activeUser));
  if (current) return current;
  return parseStoredUser(window.localStorage.getItem(AUTH_STORAGE_KEYS.legacySession));
}

function clearLegacySessionKeys() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEYS.legacySession);
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeRole, setActiveRole] = useState<Role>("user");
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const role: Role = user?.role || activeRole;

  useEffect(() => {
    const bootstrapRole = readActiveRole();
    const roleSession = readStoredSession(bootstrapRole);

    if (roleSession) {
      const raw = window.localStorage.getItem(getRoleSessionStorageKey(bootstrapRole));
      try {
        const parsed = raw ? (JSON.parse(raw) as Partial<StoredFaithHubUser>) : null;
        setSessionExpiresAt(typeof parsed?.expiresAt === "number" ? parsed.expiresAt : null);
      } catch {
        setSessionExpiresAt(null);
      }
      setActiveRole(bootstrapRole);
      setUser(roleSession);
      mirrorActiveSession(roleSession);
      setIsAuthLoading(false);
      return;
    }

    const legacySession = consumeLegacySession();
    if (legacySession) {
      persistSession(legacySession.role, legacySession);
      persistActiveRole(legacySession.role);
      setActiveRole(legacySession.role);
      setUser(legacySession);
      setSessionExpiresAt(Date.now() + AUTH_SESSION_EXPIRY_MS);
      mirrorActiveSession(legacySession);
      clearLegacySessionKeys();
      setIsAuthLoading(false);
      return;
    }

    setActiveRole(bootstrapRole);
    setUser(null);
    setSessionExpiresAt(null);
    mirrorActiveSession(null);
    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthLoading || !sessionExpiresAt || !user) return;
    if (Date.now() >= sessionExpiresAt) {
      addAuthAuditRecord({
        action: "SESSION_EXPIRED",
        role: activeRole,
        email: user.email,
        detail: "Session expired from active timer guard",
      });
      persistSession(activeRole, null);
      mirrorActiveSession(null);
      if (typeof window !== "undefined") {
        setAuthNotice(AUTH_NOTICE_REASONS.sessionExpired);
      }
      setUser(null);
      setSessionExpiresAt(null);
      return;
    }
    const timeoutMs = Math.max(500, sessionExpiresAt - Date.now() + 200);
    const timer = window.setTimeout(() => {
      persistSession(activeRole, null);
      mirrorActiveSession(null);
      setAuthNotice(AUTH_NOTICE_REASONS.sessionExpired);
      addAuthAuditRecord({
        action: "SESSION_EXPIRED",
        role: activeRole,
        email: user.email,
        detail: "Session expired by timeout callback",
      });
      setUser(null);
      setSessionExpiresAt(null);
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [activeRole, isAuthLoading, sessionExpiresAt, user]);

  const value = useMemo<AuthContextValue>(() => {
    const login = async ({ email, password, role: preferredRole }: LoginInput) => {
      const safeEmail = email.trim();
      if (!safeEmail || !password.trim()) {
        throw new Error("Email and password are required for mock login.");
      }
      const nextRole = preferredRole || resolveRoleFromEmail(safeEmail);
      const nextUser = buildMockUser(safeEmail, nextRole);
      const expiresAt = Date.now() + AUTH_SESSION_EXPIRY_MS;
      persistSession(nextRole, nextUser);
      persistActiveRole(nextRole);
      mirrorActiveSession(nextUser);
      clearLegacySessionKeys();
      setActiveRole(nextRole);
      setSessionExpiresAt(expiresAt);
      setUser(nextUser);
      addAuthAuditRecord({
        action: "LOGIN_SUCCESS",
        role: nextRole,
        email: nextUser.email,
        detail: "Email/password login",
      });
      return nextUser;
    };

    const mockLoginAsRole = async (requestedRole: Role, source: "social" | "access" = "access") => {
      const email = `${requestedRole}@faithhub.app`;
      const nextUser = buildMockUser(email, requestedRole);
      const expiresAt = Date.now() + AUTH_SESSION_EXPIRY_MS;
      persistSession(requestedRole, nextUser);
      persistActiveRole(requestedRole);
      mirrorActiveSession(nextUser);
      clearLegacySessionKeys();
      setActiveRole(requestedRole);
      setSessionExpiresAt(expiresAt);
      setUser(nextUser);
      addAuthAuditRecord({
        action: source === "social" ? "LOGIN_SOCIAL" : "LOGIN_SUCCESS",
        role: requestedRole,
        email: nextUser.email,
        detail: source === "social" ? "Social sign-in" : "Mock role access sign-in",
      });
      return nextUser;
    };

    const switchRole = (nextRole: Role) => {
      addAuthAuditRecord({
        action: "ROLE_SWITCH_REQUESTED",
        role: nextRole,
        email: user?.email,
        detail: "Role switch requires new login",
      });
      persistActiveRole(nextRole);
      persistSession(nextRole, null);
      mirrorActiveSession(null);
      setActiveRole(nextRole);
      setUser(null);
      setSessionExpiresAt(null);
      setAuthNotice(AUTH_NOTICE_REASONS.roleLoginRequired);
    };

    const hasRole = (targetRole: Role) => role === targetRole && Boolean(user);

    return {
      user,
      role,
      currentRole: activeRole,
      isAuthenticated: Boolean(user) && !isAuthLoading && user.role === activeRole,
      isAuthLoading,
      sessionExpiresAt,
      login,
      mockLoginAsRole,
      logout: () => {
        addAuthAuditRecord({
          action: "LOGOUT_ROLE",
          role: activeRole,
          email: user?.email,
          detail: "Manual logout from current role",
        });
        persistSession(activeRole, null);
        mirrorActiveSession(null);
        setAuthNotice(AUTH_NOTICE_REASONS.logout);
        setUser(null);
        setSessionExpiresAt(null);
      },
      logoutAllRoles: () => {
        for (const key of getAllRoleSessionStorageKeys()) {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(key);
          }
        }
        addAuthAuditRecord({
          action: "LOGOUT_ALL_ROLES",
          role: activeRole,
          email: user?.email,
          detail: "Cleared all role sessions",
        });
        mirrorActiveSession(null);
        setUser(null);
        setSessionExpiresAt(null);
        setAuthNotice(AUTH_NOTICE_REASONS.logout);
      },
      switchRole,
      setRole: switchRole,
      setUser,
      hasRole,
      isAdmin: hasRole("admin"),
      isProvider: hasRole("provider"),
      isUser: hasRole("user"),
    };
  }, [activeRole, isAuthLoading, role, sessionExpiresAt, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
