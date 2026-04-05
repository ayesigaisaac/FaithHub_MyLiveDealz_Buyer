import type { Role } from "@/types/roles";

export type AnalyticsCategory = "navigation" | "auth" | "giving" | "community" | "wallet";

export type AnalyticsEvent = {
  name: string;
  category: AnalyticsCategory;
  payload?: Record<string, any>;
  timestamp: number;
};

export type StoredAnalyticsEvent = AnalyticsEvent & {
  role: Role | "guest";
};

const ANALYTICS_STORAGE_KEY = "faithhub_analytics";
const AUTH_STORAGE_KEY = "faithhub_user";
const MAX_ANALYTICS_EVENTS = 500;

function getCurrentRole(): Role | "guest" {
  if (typeof window === "undefined") return "guest";
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return "guest";
    const parsed = JSON.parse(raw) as { role?: unknown };
    if (parsed.role === "admin" || parsed.role === "provider" || parsed.role === "user") {
      return parsed.role;
    }
    return "guest";
  } catch {
    return "guest";
  }
}

export function getAnalyticsEvents(): StoredAnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredAnalyticsEvent[];
  } catch {
    return [];
  }
}

export function clearAnalyticsEvents() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ANALYTICS_STORAGE_KEY);
}

export function trackEvent(event: AnalyticsEvent): StoredAnalyticsEvent {
  const normalizedTimestamp =
    typeof event.timestamp === "number" && Number.isFinite(event.timestamp) ? event.timestamp : Date.now();

  const trackedEvent: StoredAnalyticsEvent = {
    ...event,
    timestamp: normalizedTimestamp,
    role: getCurrentRole(),
  };

  if (typeof window !== "undefined") {
    const existing = getAnalyticsEvents();
    const next = [...existing, trackedEvent].slice(-MAX_ANALYTICS_EVENTS);
    window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(next));
  }

  // Safe fallback while analytics service is not connected.
  // eslint-disable-next-line no-console
  console.log("[FaithHub analytics]", trackedEvent);
  return trackedEvent;
}

