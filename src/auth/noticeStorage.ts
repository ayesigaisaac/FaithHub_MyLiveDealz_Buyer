import { AUTH_STORAGE_KEYS } from "@/constants/auth";
import { clearJson, readJson, writeJson } from "@/data/adapters/storage";

function reviveNotice(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

export function setAuthNotice(reason: string) {
  writeJson(AUTH_STORAGE_KEYS.notice, reason);
}

export function getAuthNotice() {
  return readJson<string | null>(AUTH_STORAGE_KEYS.notice, null, reviveNotice);
}

export function clearAuthNotice() {
  clearJson(AUTH_STORAGE_KEYS.notice);
}

export function consumeAuthNotice() {
  const reason = getAuthNotice();
  clearAuthNotice();
  return reason;
}
