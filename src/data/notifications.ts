import type { FaithHubNotification, FaithHubNotificationType } from "@/types/notification";

const STORAGE_KEY = "faithhub_notifications";
const UPDATED_EVENT = "faithhub-notifications-updated";
const MAX_NOTIFICATIONS = 200;

function parse(raw: string | null): FaithHubNotification[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as FaithHubNotification[];
  } catch {
    return [];
  }
}

function read() {
  if (typeof window === "undefined") return [] as FaithHubNotification[];
  return parse(window.localStorage.getItem(STORAGE_KEY)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function write(items: FaithHubNotification[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_NOTIFICATIONS)));
  window.dispatchEvent(new CustomEvent(UPDATED_EVENT));
}

export function getNotifications() {
  return read();
}

export function getUnreadNotificationCount() {
  return read().filter((item) => !item.read).length;
}

export function createNotification(type: FaithHubNotificationType, message: string) {
  const next: FaithHubNotification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    message: message.trim(),
    read: false,
    createdAt: new Date().toISOString(),
  };
  write([next, ...read()]);
  return next;
}

export function markNotificationRead(id: string) {
  write(read().map((item) => (item.id === id ? { ...item, read: true } : item)));
}

export function markAllNotificationsRead() {
  write(read().map((item) => ({ ...item, read: true })));
}

export const notificationEvents = {
  updated: UPDATED_EVENT,
} as const;
