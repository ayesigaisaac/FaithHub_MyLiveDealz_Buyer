import type { Role } from "@/types/roles";
import { AUTH_STORAGE_KEYS } from "@/constants/auth";
import { readJsonVersioned, writeJsonVersioned, clearJson } from "@/data/adapters/storage";

export type AuthAuditAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_SOCIAL"
  | "LOGOUT_ROLE"
  | "LOGOUT_ALL_ROLES"
  | "ROLE_SWITCH_REQUESTED"
  | "ROLE_SWITCH_CONFIRMED"
  | "AUTH_REDIRECT_REQUIRED"
  | "SESSION_EXPIRED";

export type AuthAuditRecord = {
  id: string;
  action: AuthAuditAction;
  role: Role;
  email?: string;
  detail?: string;
  route?: string;
  createdAt: string;
};

const STORAGE_KEY = AUTH_STORAGE_KEYS.audit;
const SCHEMA_VERSION = 1;
const MAX_RECORDS = 150;

function readAll(): AuthAuditRecord[] {
  return readJsonVersioned(STORAGE_KEY, [] as AuthAuditRecord[], {
    currentVersion: SCHEMA_VERSION,
    reviveData: (value) => {
      if (!Array.isArray(value)) return [];
      return value.filter((entry) => Boolean(entry && entry.id && entry.action && entry.role));
    },
    migrate: (legacyData) => {
      if (!Array.isArray(legacyData)) return [];
      return legacyData.filter((entry) => Boolean(entry && entry.id && entry.action && entry.role));
    },
  });
}

function writeAll(entries: AuthAuditRecord[]) {
  writeJsonVersioned(STORAGE_KEY, entries.slice(0, MAX_RECORDS), SCHEMA_VERSION);
}

export function addAuthAuditRecord(
  input: Omit<AuthAuditRecord, "id" | "createdAt"> & { createdAt?: string },
) {
  const next: AuthAuditRecord = {
    id: `auth-audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: input.createdAt || new Date().toISOString(),
    action: input.action,
    role: input.role,
    email: input.email,
    detail: input.detail,
    route: input.route,
  };

  const current = readAll();
  writeAll([next, ...current]);
  return next;
}

export function getAuthAuditRecords() {
  return readAll();
}

export function clearAuthAuditRecords() {
  clearJson(STORAGE_KEY);
}
