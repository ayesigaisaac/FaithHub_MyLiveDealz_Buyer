import { getFaithHubResources } from "@/data/resources";
import { routes } from "@/constants/routes";
import type { RoleKey } from "@/config/pageRegistry";

export type GlobalSearchResultType = "institution" | "series" | "resource" | "live";

export interface GlobalSearchResult {
  id: string;
  type: GlobalSearchResultType;
  title: string;
  subtitle: string;
  path: string;
}

const institutions = [
  { id: "light-community", title: "Light Community Church", locale: "Kampala" },
  { id: "city-prayer-center", title: "City Prayer Center", locale: "Entebbe" },
  { id: "mercy-tabernacle", title: "Mercy Tabernacle", locale: "Mbarara" },
];

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

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function rolePathByType(role: RoleKey, type: GlobalSearchResultType, id: string) {
  if (role === "provider") {
    if (type === "resource") return routes.app.provider.resources;
    if (type === "live") return routes.app.provider.liveSchedule;
    if (type === "series") return routes.app.provider.seriesBuilder;
    return routes.app.provider.dashboard;
  }

  if (role === "admin") {
    if (type === "resource") return routes.app.admin.channels;
    if (type === "live") return routes.app.admin.liveModeration;
    if (type === "series") return routes.app.admin.overview;
    return routes.app.admin.verification;
  }

  if (type === "resource") return routes.app.user.resourceDetailById(id);
  if (type === "live") return routes.app.user.liveHub;
  if (type === "series") return routes.app.user.seriesDetailById(id);
  return routes.app.user.institutionById(id);
}

function makeBaseIndex(role: RoleKey) {
  const resourceIndex = getFaithHubResources().slice(0, 8).map((resource) => ({
    id: resource.id,
    type: "resource" as const,
    title: resource.title,
    subtitle: `${resource.category} - ${resource.author}`,
    path: rolePathByType(role, "resource", resource.id),
  }));

  const institutionIndex = institutions.map((item) => ({
    id: item.id,
    type: "institution" as const,
    title: item.title,
    subtitle: `Institution - ${item.locale}`,
    path: rolePathByType(role, "institution", item.id),
  }));

  const seriesIndex = seriesItems.map((item) => ({
    id: item.id,
    type: "series" as const,
    title: item.title,
    subtitle: `Series - ${item.summary}`,
    path: rolePathByType(role, "series", item.id),
  }));

  const liveIndex = liveSessions.map((item) => ({
    id: item.id,
    type: "live" as const,
    title: item.title,
    subtitle: `Live session - ${item.schedule}`,
    path: rolePathByType(role, "live", item.id),
  }));

  return [...institutionIndex, ...seriesIndex, ...resourceIndex, ...liveIndex];
}

export function searchGlobalContent(query: string, role: RoleKey) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery || normalizedQuery.length < 2) return [];

  return makeBaseIndex(role)
    .filter((item) => normalize(`${item.title} ${item.subtitle}`).includes(normalizedQuery))
    .slice(0, 10);
}

