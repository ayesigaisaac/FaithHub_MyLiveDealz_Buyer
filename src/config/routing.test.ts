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

  it("does not force navigation on non-navigation labels", () => {
    expect(resolvePageButtonAction(routes.app.user.profile, "Save profile")).toBeNull();
  });
});
