import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { matchPath } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { routes } from "@/constants/routes";
import { getRoutePatterns, pageRegistry } from "@/config/pageRegistry";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";

function findPage(path: string) {
  const page = pageRegistry.find((item) => item.path === path);
  if (!page) throw new Error(`Page not found for path: ${path}`);
  return page;
}

function pageMatchesPath(path: string, pathname: string) {
  const page = findPage(path);
  return getRoutePatterns(page).some((pattern) => Boolean(matchPath({ path: pattern, end: true }, pathname)));
}

function collectTsxFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectTsxFiles(fullPath));
      continue;
    }
    if (entry.isFile() && fullPath.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

function collectStaticActionTokens() {
  const sourceRoot = join(process.cwd(), "src");
  const files = collectTsxFiles(sourceRoot);
  const labels = new Set<string>();
  const actionIds = new Set<string>();

  const labelRegex = /data-action-label="([^"]+)"/g;
  const actionIdRegex = /data-action-id="([^"]+)"/g;

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    for (const match of content.matchAll(labelRegex)) {
      labels.add(match[1]);
    }
    for (const match of content.matchAll(actionIdRegex)) {
      actionIds.add(match[1]);
    }
  }

  return { labels: Array.from(labels), actionIds: Array.from(actionIds) };
}

describe("FaithHub routing aliases", () => {
  it("matches canonical and dynamic series detail routes", () => {
    expect(pageMatchesPath(routes.app.user.seriesDetail, routes.app.user.seriesDetail)).toBe(true);
    expect(pageMatchesPath(routes.app.user.seriesDetail, routes.app.user.seriesDetailById("series-123"))).toBe(true);
  });

  it("matches canonical and dynamic event detail routes", () => {
    expect(pageMatchesPath(routes.app.user.eventDetail, routes.app.user.eventDetail)).toBe(true);
    expect(pageMatchesPath(routes.app.user.eventDetail, routes.app.user.eventDetailById("event-abc"))).toBe(true);
  });

  it("matches canonical and dynamic live player routes", () => {
    expect(pageMatchesPath(routes.app.user.livePlayer, routes.app.user.livePlayer)).toBe(true);
    expect(pageMatchesPath(routes.app.user.livePlayer, routes.app.user.livePlayerBySession("live-900"))).toBe(true);
  });
});

describe("FaithHub action-id routing", () => {
  it("resolves provider dashboard action ids", () => {
    expect(resolvePageButtonAction(routes.app.provider.dashboard, "", "open-live-schedule")).toBe(
      routes.app.provider.liveSchedule,
    );
    expect(resolvePageButtonAction(routes.app.provider.dashboard, "", "open-live-studio")).toBe(
      routes.app.provider.liveStudio,
    );
  });

  it("resolves admin overview action ids", () => {
    expect(resolvePageButtonAction(routes.app.admin.overview, "", "open-admin-security")).toBe(
      routes.app.admin.security,
    );
    expect(resolvePageButtonAction(routes.app.admin.overview, "", "open-live-ops")).toBe(
      routes.app.provider.liveOps,
    );
  });

  it("falls back from unmapped action ids using route keywords", () => {
    expect(resolvePageButtonAction(routes.app.provider.dashboard, "", "open-calendar-view")).toBe(
      routes.app.provider.liveSchedule,
    );
    expect(resolvePageButtonAction(routes.app.admin.overview, "", "open-admin-moderation")).toBe(
      routes.app.admin.liveModeration,
    );
  });
});

describe("FaithHub action-label routing", () => {
  it("resolves newly mapped labels", () => {
    expect(resolvePageButtonAction(routes.app.user.eventDetail, "Buy in FaithMart")).toBe(
      routes.app.user.giving,
    );
    expect(resolvePageButtonAction(routes.app.admin.overview, "Open User App")).toBe(
      routes.app.user.home,
    );
  });

  it("falls back by role keyword for navigation intent", () => {
    expect(resolvePageButtonAction(routes.app.provider.dashboard, "Open finance page")).toBe(
      routes.app.provider.funds,
    );
    expect(resolvePageButtonAction(routes.app.admin.overview, "Go to security")).toBe(
      routes.app.admin.security,
    );
  });

  it("resolves calendar and schedule labels by role", () => {
    expect(resolvePageButtonAction(routes.app.user.liveHub, "Open calendar")).toBe(routes.app.user.events);
    expect(resolvePageButtonAction(routes.app.provider.dashboard, "Open schedule")).toBe(
      routes.app.provider.liveSchedule,
    );
  });

  it("does not force navigation on non-navigation labels", () => {
    expect(resolvePageButtonAction(routes.app.user.profile, "Save profile")).toBeNull();
  });
});

describe("FaithHub static action bindings", () => {
  const pathnames = pageRegistry.map((page) => page.path);

  it("resolves all statically declared data-action-label values", () => {
    const { labels } = collectStaticActionTokens();
    const unresolved = labels.filter(
      (label) => !pathnames.some((pathname) => Boolean(resolvePageButtonAction(pathname, label))),
    );
    expect(unresolved).toEqual([]);
  });

  it("resolves all statically declared data-action-id values", () => {
    const { actionIds } = collectStaticActionTokens();
    const unresolved = actionIds.filter(
      (actionId) => !pathnames.some((pathname) => Boolean(resolvePageButtonAction(pathname, "", actionId))),
    );
    expect(unresolved).toEqual([]);
  });
});
