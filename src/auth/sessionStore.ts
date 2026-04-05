import type { Role } from "@/types/roles";
import { getRoleSessionStorageKey } from "@/constants/auth";

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getRoleSessionRaw(role: Role) {
  if (!canUseLocalStorage()) return null;
  return window.localStorage.getItem(getRoleSessionStorageKey(role));
}

