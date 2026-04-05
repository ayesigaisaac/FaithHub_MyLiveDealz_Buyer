import { routes } from "@/constants/routes";
import { getCommunityPosts } from "@/data/community";
import { getEventsSync } from "@/data/services/eventsService";
import { getFaithHubResources } from "@/data/resources";
import type { RoleKey } from "@/config/pageRegistry";

export type GlobalSearchResultType = "page" | "event" | "community" | "content" | "recent";

export interface GlobalSearchResult {
  id: string;
  type: GlobalSearchResultType;
  title: string;
  subtitle: string;
  path: string;
}

const RECENT_STORAGE_KEY = "faithhub_recent_searches";
const MAX_RESULTS = 12;
const MAX_RECENT = 8;

const seriesItems = [
  { id: "mercy-in-motion", title: "Mercy in Motion", summary: "Faith and practical compassion" },
  { id: "family-altars", title: "Family Altars", summary: "Prayer habits for homes" },
  { id: "purpose-pathways", title: "Purpose Pathways", summary: "Calling, vocation, and service" },
];

const liveSessions = [
  { id: "evening-prayer", title: "Evening Prayer Revival", schedule: "Tonight 8:00 PM" },
  { id: "youth-impact", title: "Youth Impact Night", schedule: "Friday 7:30 PM" },
  { id: "worship-watch", title: "Worship Watch", schedule: "Daily 6:15 AM" },
];

type StoredRecentSearch = {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  type: Exclude<GlobalSearchResultType, "recent">;
  role: RoleKey;
  updatedAt: number;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function uniqueById(results: GlobalSearchResult[]) {
  const seen = new Set<string>();
  const unique: GlobalSearchResult[] = [];
  for (const result of results) {
    if (seen.has(result.id)) continue;
    seen.add(result.id);
    unique.push(result);
  }
  return unique;
}

function rolePathByType(role: RoleKey, type: Exclude<GlobalSearchResultType, "recent">, id: string) {
  if (role === "provider") {
    if (type === "content") return routes.app.provider.resources;
    if (type === "event") return routes.app.provider.events;
    if (type === "community") return routes.app.provider.community;
    return routes.app.provider.dashboard;
  }

  if (role === "admin") {
    if (type === "content") return routes.app.admin.channels;
    if (type === "event") return routes.app.admin.liveModeration;
    if (type === "community") return routes.app.admin.noticeboard;
    return routes.app.admin.overview;
  }

  if (type === "content") return routes.app.user.resourceDetailById(id);
  if (type === "event") return routes.app.user.events;
  if (type === "community") return routes.app.user.community;
  return routes.app.user.home;
}

function getPageIndex(role: RoleKey): GlobalSearchResult[] {
  const pagesByRole = {
    user: [
      { id: "page-home", title: "Home", subtitle: "Member dashboard", path: routes.app.user.home },
      { id: "page-discover", title: "Discover", subtitle: "Find institutions and content", path: routes.app.user.discover },
      { id: "page-series", title: "Series", subtitle: "Browse faith series", path: routes.app.user.series },
      { id: "page-live", title: "Live", subtitle: "Join live sessions", path: routes.app.user.liveHub },
      { id: "page-community", title: "Community", subtitle: "Conversations and prayer", path: routes.app.user.community },
      { id: "page-give", title: "Giving", subtitle: "Give and support funds", path: routes.app.user.giving },
      { id: "page-wallet", title: "Wallet", subtitle: "Balance and transactions", path: routes.app.user.wallet },
      { id: "page-settings", title: "Settings", subtitle: "Profile and preferences", path: routes.app.user.settings },
    ],
    provider: [
      { id: "page-provider-dashboard", title: "Provider Dashboard", subtitle: "Workspace overview", path: routes.app.provider.dashboard },
      { id: "page-provider-content", title: "Content", subtitle: "Manage resources and series", path: routes.app.provider.resources },
      { id: "page-provider-events", title: "Events", subtitle: "Schedule and manage events", path: routes.app.provider.events },
      { id: "page-provider-community", title: "Community", subtitle: "Provider engagement feed", path: routes.app.provider.community },
      { id: "page-provider-wallet", title: "Wallet", subtitle: "Earnings and payouts", path: routes.app.provider.wallet },
    ],
    admin: [
      { id: "page-admin-overview", title: "Admin Overview", subtitle: "Global command center", path: routes.app.admin.overview },
      { id: "page-admin-policy", title: "Policy", subtitle: "Rules and governance", path: routes.app.admin.policy },
      { id: "page-admin-security", title: "Security", subtitle: "Trust and moderation", path: routes.app.admin.security },
      { id: "page-admin-finance", title: "Finance", subtitle: "Platform finance and controls", path: routes.app.admin.finance },
      { id: "page-admin-noticeboard", title: "Noticeboard", subtitle: "Announcements and urgent notices", path: routes.app.admin.noticeboard },
    ],
  } as const;

  return pagesByRole[role].map((item) => ({ ...item, type: "page" as const }));
}

function getContentIndex(role: RoleKey): GlobalSearchResult[] {
  const resourceIndex = getFaithHubResources().slice(0, 10).map((resource) => ({
    id: `content-resource-${resource.id}`,
    type: "content" as const,
    title: resource.title,
    subtitle: `${resource.category} - ${resource.author}`,
    path: rolePathByType(role, "content", resource.id),
  }));

  const seriesIndex = seriesItems.map((item) => ({
    id: `content-series-${item.id}`,
    type: "content" as const,
    title: item.title,
    subtitle: `Series - ${item.summary}`,
    path: role === "user" ? routes.app.user.seriesDetailById(item.id) : rolePathByType(role, "content", item.id),
  }));

  const liveIndex = liveSessions.map((item) => ({
    id: `content-live-${item.id}`,
    type: "content" as const,
    title: item.title,
    subtitle: `Live session - ${item.schedule}`,
    path: role === "user" ? routes.app.user.liveHub : rolePathByType(role, "content", item.id),
  }));

  return [...resourceIndex, ...seriesIndex, ...liveIndex];
}

function getEventIndex(role: RoleKey): GlobalSearchResult[] {
  return getEventsSync().slice(0, 10).map((event) => ({
    id: `event-${event.id}`,
    type: "event" as const,
    title: event.title,
    subtitle: `${event.date} ${event.startTime}-${event.endTime}${event.location ? ` - ${event.location}` : ""}`,
    path: role === "user" ? routes.app.user.events : rolePathByType(role, "event", event.id),
  }));
}

function getCommunityIndex(role: RoleKey): GlobalSearchResult[] {
  return getCommunityPosts().slice(0, 10).map((post) => ({
    id: `community-${post.id}`,
    type: "community" as const,
    title: post.author.name,
    subtitle: post.content.slice(0, 80),
    path: rolePathByType(role, "community", post.id),
  }));
}

function makeSearchIndex(role: RoleKey) {
  return [
    ...getPageIndex(role),
    ...getEventIndex(role),
    ...getCommunityIndex(role),
    ...getContentIndex(role),
  ];
}

function readRecentSearches(): StoredRecentSearch[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean) as StoredRecentSearch[];
  } catch {
    return [];
  }
}

function writeRecentSearches(items: StoredRecentSearch[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(items.slice(0, MAX_RECENT * 3)));
  } catch {
    // no-op for storage errors
  }
}

export function getRecentSearches(role: RoleKey): GlobalSearchResult[] {
  return readRecentSearches()
    .filter((item) => item.role === role)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_RECENT)
    .map((item) => ({
      id: `recent-${item.id}`,
      type: "recent",
      title: item.title,
      subtitle: item.subtitle,
      path: item.path,
    }));
}

export function rememberRecentSearch(role: RoleKey, item: GlobalSearchResult) {
  if (item.type === "recent") return;
  const existing = readRecentSearches().filter((entry) => !(entry.role === role && entry.id === item.id));
  const nextEntry: StoredRecentSearch = {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    path: item.path,
    type: item.type,
    role,
    updatedAt: Date.now(),
  };
  writeRecentSearches([nextEntry, ...existing]);
}

export function searchGlobalContent(query: string, role: RoleKey) {
  const normalizedQuery = normalize(query);
  const index = makeSearchIndex(role);
  const recent = getRecentSearches(role);

  if (!normalizedQuery || normalizedQuery.length < 2) {
    return recent;
  }

  const recentMatching = recent.filter((item) =>
    normalize(`${item.title} ${item.subtitle}`).includes(normalizedQuery),
  );

  const indexedMatches = index.filter((item) =>
    normalize(`${item.title} ${item.subtitle}`).includes(normalizedQuery),
  );

  return uniqueById([...recentMatching, ...indexedMatches]).slice(0, MAX_RESULTS);
}
