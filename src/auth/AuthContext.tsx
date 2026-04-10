import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Role } from "@/types/roles";
import {
  AUTH_NOTICE_REASONS,
  AUTH_SESSION_EXPIRY_MS,
  AUTH_STORAGE_KEYS,
  getAllRoleSessionStorageKeys,
} from "@/constants/auth";
import { clearJson, readJson, writeJson } from "@/data/adapters/storage";
import { addAuthAuditRecord } from "@/data/authAudit";
import { clearAuthNotice, setAuthNotice } from "@/auth/noticeStorage";
import { clearRoleSession, getRoleSessionRaw, setRoleSession } from "@/auth/sessionStore";
import { isRole } from "@/auth/roleRouting";

type LoginInput = {
  email: string;
  password?: string;
  role: Role;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

type AuthContextValue = {
  user: AuthUser | null;
  role: Role;
  currentRole: Role;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  sessionExpiresAt: number | null;
  login: (input: LoginInput) => Promise<AuthUser>;
  mockLoginAsRole: (role: Role, method?: "password" | "social") => Promise<AuthUser>;
  setRole: (role: Role) => void;
  switchRole: (role: Role) => void;
  logout: () => void;
  logoutAllRoles: () => void;
};

const FALLBACK_ROLE: Role = "user";

const defaultContext: AuthContextValue = {
  user: null,
  role: FALLBACK_ROLE,
  currentRole: FALLBACK_ROLE,
  isAuthenticated: false,
  isAuthLoading: true,
  sessionExpiresAt: null,
  login: async () => {
    throw new Error("Auth provider is not mounted.");
  },
  mockLoginAsRole: async () => {
    throw new Error("Auth provider is not mounted.");
  },
  setRole: () => undefined,
  switchRole: () => undefined,
  logout: () => undefined,
  logoutAllRoles: () => undefined,
};

const AuthContext = createContext<AuthContextValue>(defaultContext);

function resolveRoleLabel(role: Role) {
  if (role === "admin") return "Admin";
  if (role === "provider") return "Provider";
  return "Member";
}

function toDisplayName(email: string, role: Role) {
  const seed = email.split("@")[0]?.replace(/[._-]+/g, " ") || "faithhub";
  const normalized = seed
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1).toLowerCase())
    .join(" ");

  if (normalized) return normalized;
  return role === "user" ? "Faith Member" : `${resolveRoleLabel(role)} User`;
}

function resolveRoleFromStorage() {
  return readJson<Role>(AUTH_STORAGE_KEYS.activeRole, FALLBACK_ROLE, (value) =>
    isRole(value) ? value : null,
  );
}

function reviveUser(value: unknown): AuthUser | null {
  if (!value || typeof value !== "object") return null;
  const parsed = value as Partial<AuthUser>;
  if (!isRole(parsed.role)) return null;
  if (typeof parsed.email !== "string" || typeof parsed.name !== "string") return null;

  return {
    id: parsed.id || `${parsed.role}:${parsed.email}`,
    email: parsed.email,
    name: parsed.name,
    role: parsed.role,
  };
}

function loadPersistedState() {
  const activeRole = resolveRoleFromStorage();
  const user = readJson<AuthUser | null>(AUTH_STORAGE_KEYS.activeUser, null, reviveUser);
  return { activeRole, user };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ role, user, isAuthLoading }, setState] = useState(() => {
    const persisted = loadPersistedState();
    return {
      role: persisted.activeRole,
      user: persisted.user,
      isAuthLoading: true,
    };
  });

  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);

  const persistRole = useCallback((nextRole: Role) => {
    writeJson(AUTH_STORAGE_KEYS.activeRole, nextRole);
  }, []);

  const persistUser = useCallback((nextUser: AuthUser | null) => {
    if (!nextUser) {
      clearJson(AUTH_STORAGE_KEYS.activeUser);
      return;
    }
    writeJson(AUTH_STORAGE_KEYS.activeUser, nextUser);
  }, []);

  const clearAllRoleSessions = useCallback(() => {
    for (const key of getAllRoleSessionStorageKeys()) {
      clearJson(key);
    }
  }, []);

  const commitRoleAndUser = useCallback(
    (nextRole: Role, nextUser: AuthUser | null) => {
      setState((prev) => ({ ...prev, role: nextRole, user: nextUser }));
      persistRole(nextRole);
      persistUser(nextUser);
    },
    [persistRole, persistUser],
  );

  useEffect(() => {
    const session = getRoleSessionRaw(role);

    if (!session) {
      setSessionExpiresAt(null);
      setState((prev) => ({ ...prev, user: null, isAuthLoading: false }));
      persistUser(null);
      return;
    }

    if (session.expiresAt <= Date.now()) {
      clearRoleSession(role);
      setAuthNotice(AUTH_NOTICE_REASONS.sessionExpired);
      addAuthAuditRecord({
        action: "SESSION_EXPIRED",
        role,
        email: session.email,
        detail: `Session expired for ${role}`,
      });
      setSessionExpiresAt(null);
      setState((prev) => ({ ...prev, user: null, isAuthLoading: false }));
      persistUser(null);
      return;
    }

    const persistedUser = readJson<AuthUser | null>(AUTH_STORAGE_KEYS.activeUser, null, reviveUser);
    const hydratedUser: AuthUser = {
      id: persistedUser?.id || `${role}:${session.email}`,
      email: session.email,
      name: persistedUser?.name || session.name,
      role,
    };

    setSessionExpiresAt(session.expiresAt);
    setState((prev) => ({ ...prev, role, user: hydratedUser, isAuthLoading: false }));
    persistUser(hydratedUser);
  }, [role, persistUser]);

  const loginWithRole = useCallback(
    async ({ email, role: nextRole }: { email: string; role: Role }, method: "password" | "social") => {
      const safeEmail = email.trim().toLowerCase();
      const resolvedEmail = safeEmail || `${nextRole}@faithhub.app`;
      const authUser: AuthUser = {
        id: `${nextRole}:${resolvedEmail}`,
        email: resolvedEmail,
        name: toDisplayName(resolvedEmail, nextRole),
        role: nextRole,
      };

      const issuedAt = Date.now();
      const expiresAt = issuedAt + AUTH_SESSION_EXPIRY_MS;

      setRoleSession(nextRole, {
        role: nextRole,
        email: authUser.email,
        name: authUser.name,
        issuedAt,
        expiresAt,
        method,
      });

      clearAuthNotice();
      setSessionExpiresAt(expiresAt);
      commitRoleAndUser(nextRole, authUser);

      addAuthAuditRecord({
        action: method === "social" ? "LOGIN_SOCIAL" : "LOGIN_SUCCESS",
        role: nextRole,
        email: authUser.email,
        detail: `Login via ${method}`,
      });

      return authUser;
    },
    [commitRoleAndUser],
  );

  const login = useCallback(
    async ({ email, role: nextRole }: LoginInput) => {
      return loginWithRole({ email, role: nextRole }, "password");
    },
    [loginWithRole],
  );

  const mockLoginAsRole = useCallback(
    async (nextRole: Role, method: "password" | "social" = "password") => {
      const fallbackEmail =
        nextRole === "admin"
          ? "admin@faithhub.app"
          : nextRole === "provider"
          ? "provider@faithhub.app"
          : "member@faithhub.app";
      return loginWithRole({ email: fallbackEmail, role: nextRole }, method);
    },
    [loginWithRole],
  );

  const switchRole = useCallback(
    (nextRole: Role) => {
      if (nextRole === role) return;
      commitRoleAndUser(nextRole, null);
      setSessionExpiresAt(null);
      setAuthNotice(AUTH_NOTICE_REASONS.roleLoginRequired);
      addAuthAuditRecord({
        action: "ROLE_SWITCH_REQUESTED",
        role: nextRole,
        email: user?.email,
        detail: `Requested switch from ${role} to ${nextRole}`,
      });
    },
    [commitRoleAndUser, role, user?.email],
  );

  const setRole = useCallback(
    (nextRole: Role) => {
      switchRole(nextRole);
    },
    [switchRole],
  );

  const logout = useCallback(() => {
    clearRoleSession(role);
    addAuthAuditRecord({
      action: "LOGOUT_ROLE",
      role,
      email: user?.email,
      detail: `Role ${role} signed out`,
    });

    setAuthNotice(AUTH_NOTICE_REASONS.logout);
    setSessionExpiresAt(null);
    commitRoleAndUser(role, null);
  }, [commitRoleAndUser, role, user?.email]);

  const logoutAllRoles = useCallback(() => {
    clearAllRoleSessions();
    addAuthAuditRecord({
      action: "LOGOUT_ALL_ROLES",
      role,
      email: user?.email,
      detail: "Signed out from every role",
    });

    setAuthNotice(AUTH_NOTICE_REASONS.logout);
    setSessionExpiresAt(null);
    commitRoleAndUser(FALLBACK_ROLE, null);
  }, [clearAllRoleSessions, commitRoleAndUser, role, user?.email]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      currentRole: role,
      isAuthenticated: Boolean(user),
      isAuthLoading,
      sessionExpiresAt,
      login,
      mockLoginAsRole,
      setRole,
      switchRole,
      logout,
      logoutAllRoles,
    }),
    [
      isAuthLoading,
      login,
      logout,
      logoutAllRoles,
      mockLoginAsRole,
      role,
      sessionExpiresAt,
      setRole,
      switchRole,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
