import { AUTH_STORAGE_KEYS } from "@/constants/auth";

function canUseSessionStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function getAuthNotice() {
  if (!canUseSessionStorage()) return null;
  return window.sessionStorage.getItem(AUTH_STORAGE_KEYS.notice);
}

export function setAuthNotice(value: string) {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.setItem(AUTH_STORAGE_KEYS.notice, value);
}

export function consumeAuthNotice() {
  if (!canUseSessionStorage()) return null;
  const value = window.sessionStorage.getItem(AUTH_STORAGE_KEYS.notice);
  if (value) {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEYS.notice);
  }
  return value;
}

