import type { Role } from "@/types/roles";

export const AUTH_SESSION_EXPIRY_MS = 1000 * 60 * 60 * 12;

export const AUTH_STORAGE_KEYS = {
  activeUser: "faithhub_user",
  legacySession: "faithhub.auth.session.v1",
  activeRole: "faithhub_active_role",
  notice: "faithhub_auth_notice",
  sessionPrefix: "faithhub_session_",
  audit: "faithhub_auth_audit.v1",
} as const;

export const AUTH_NOTICE_REASONS = {
  sessionExpired: "session_expired",
  logout: "logout",
  authRequired: "auth_required",
  roleLoginRequired: "role_login_required",
} as const;

export function getRoleSessionStorageKey(role: Role) {
  return `${AUTH_STORAGE_KEYS.sessionPrefix}${role}`;
}

export function getAllRoleSessionStorageKeys() {
  return [
    getRoleSessionStorageKey("user"),
    getRoleSessionStorageKey("provider"),
    getRoleSessionStorageKey("admin"),
  ];
}

