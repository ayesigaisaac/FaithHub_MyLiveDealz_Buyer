import type { Role } from "@/types/roles";

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

const STORAGE_KEY = "faithhub_auth_audit.v1";
const MAX_RECORDS = 150;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAll(): AuthAuditRecord[] {
  if (!canUseStorage()) return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as AuthAuditRecord[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => Boolean(entry && entry.id && entry.action && entry.role));
  } catch {
    return [];
  }
}

function writeAll(entries: AuthAuditRecord[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_RECORDS)));
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
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}

