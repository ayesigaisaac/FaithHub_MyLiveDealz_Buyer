import type { Role } from "@/types/roles";
import { getRoleSessionStorageKey } from "@/constants/auth";
import { clearJson, readJson, writeJson } from "@/data/adapters/storage";

export type RoleSession = {
  role: Role;
  email: string;
  name: string;
  issuedAt: number;
  expiresAt: number;
  method: "password" | "social";
};

function isRoleSession(value: unknown): value is RoleSession {
  if (!value || typeof value !== "object") return false;

  const parsed = value as Partial<RoleSession>;
  const isRole = parsed.role === "user" || parsed.role === "provider" || parsed.role === "admin";

  return Boolean(
    isRole &&
      typeof parsed.email === "string" &&
      typeof parsed.name === "string" &&
      typeof parsed.issuedAt === "number" &&
      Number.isFinite(parsed.issuedAt) &&
      typeof parsed.expiresAt === "number" &&
      Number.isFinite(parsed.expiresAt) &&
      (parsed.method === "password" || parsed.method === "social"),
  );
}

export function getRoleSessionRaw(role: Role) {
  return readJson<RoleSession | null>(getRoleSessionStorageKey(role), null, (value) =>
    isRoleSession(value) ? value : null,
  );
}

export function setRoleSession(role: Role, session: RoleSession) {
  writeJson(getRoleSessionStorageKey(role), { ...session, role });
}

export function clearRoleSession(role: Role) {
  clearJson(getRoleSessionStorageKey(role));
}
