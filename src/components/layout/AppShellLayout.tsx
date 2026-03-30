import React, { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Bell, CircleUserRound, Menu, Search } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import AccountSwitcher from "@/components/layout/AccountSwitcher";
import Sidebar from "@/components/layout/Sidebar";
import GiveSupportCTA from "@/components/giving/GiveSupportCTA";
import { useColorMode } from "@/theme/color-mode";
import { getRoutePatterns, pageRegistry, type PageRegistryItem, type RoleKey } from "@/config/pageRegistry";
import { buildUnifiedSidebarSections } from "@/config/sidebar";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";
import { searchGlobalContent } from "@/data/globalSearch";
import { routes } from "@/constants/routes";
import type { Role } from "@/types/roles";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

const roleTriggerLabel: Record<RoleKey, string> = {
  user: "Faith Member",
  provider: "Provider Workspace",
  admin: "Admin Command",
};

const alertRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.settings,
  provider: routes.app.provider.notifications,
  admin: routes.app.admin.liveModeration,
};

const profileSettingsRouteByRole: Record<RoleKey, string> = {
  user: routes.app.user.profile,
  provider: routes.app.provider.onboarding,
  admin: routes.app.admin.security,
};

const iconFallbackRouteByRole: Record<
  RoleKey,
  { calendar: string; messages: string; discover: string; settings: string }
> = {
  user: {
    calendar: routes.app.user.events,
    messages: routes.app.user.liveChat,
    discover: routes.app.user.discover,
    settings: routes.app.user.settings,
  },
  provider: {
    calendar: routes.app.provider.liveSchedule,
    messages: routes.app.provider.notifications,
    discover: routes.app.provider.contacts,
    settings: routes.app.provider.onboarding,
  },
  admin: {
    calendar: routes.app.admin.overview,
    messages: routes.app.admin.liveModeration,
    discover: routes.app.admin.verification,
    settings: routes.app.admin.security,
  },
};

function getCurrentRole(pathname: string): RoleKey {
  if (pathname.startsWith(routes.app.provider.base)) return "provider";
  if (pathname.startsWith(routes.app.admin.base)) return "admin";
  return "user";
}

function matchesPagePath(page: Pick<PageRegistryItem, "path" | "routePatterns">, pathname: string) {
  return getRoutePatterns(page).some((pattern) => Boolean(matchPath({ path: pattern, end: true }, pathname)));
}

function resolveIconOnlyFallbackPath(button: HTMLButtonElement, role: RoleKey) {
  const iconRoutes = iconFallbackRouteByRole[role];
  if (button.querySelector(".lucide-bell")) return alertRouteByRole[role];
  if (button.querySelector(".lucide-sparkles")) return iconRoutes.settings;
  if (button.querySelector(".lucide-settings")) return iconRoutes.settings;
  if (button.querySelector(".lucide-calendar-days")) return iconRoutes.calendar;
  if (button.querySelector(".lucide-message-square")) return iconRoutes.messages;
  if (button.querySelector(".lucide-users")) return iconRoutes.discover;
  return null;
}

export default function AppShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, setRole, setUser } = useAuth();
  const { mode, toggle } = useColorMode();

  const routeRole = getCurrentRole(location.pathname);
  const shellRole: RoleKey = currentRole || routeRole;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountSwitcherOpen, setAccountSwitcherOpen] = useState(false);
  const searchContainerRef = useRef<HTMLLabelElement | null>(null);

  const sidebarSections = useMemo(
    () => buildUnifiedSidebarSections({ role: shellRole, query: navQuery }),
    [shellRole, navQuery],
  );

  const currentPage = pageRegistry.find((page) => matchesPagePath(page, location.pathname));
  const activeNavPath = currentPage?.path || location.pathname;
  const currentRoleLabel = roleTriggerLabel[shellRole];
  const sidebarWidthClass = sidebarCollapsed ? "lg:ml-[84px]" : "lg:ml-[280px]";
  const showGivingCta =
    shellRole !== "admin" &&
    (location.pathname.startsWith(routes.app.provider.base) ||
      location.pathname.includes("/series") ||
      location.pathname.includes("/live") ||
      location.pathname.includes("/community") ||
      location.pathname.includes("/institution"));
  const globalSearchResults = useMemo(
    () => searchGlobalContent(navQuery, shellRole),
    [navQuery, shellRole],
  );

  const resolveNavPath = (path: string) => path;
  const navigateToPath = (path: string) => navigate(path);
  const handleRoleSwitch = (nextRole: Role, path: string) => {
    flushSync(() => {
      setRole(nextRole);
    });
    navigateToPath(path);
    setMobileOpen(false);
  };

  const handlePageAction = (event: React.MouseEvent<HTMLElement>) => {
    const insideAppWorkspace = location.pathname.startsWith("/app/");
    if (!insideAppWorkspace && !currentPage) return;

    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest("[data-no-nav]")) return;
    if (target.closest("a, [role='link'], input, textarea, select, option, label")) return;

    const button = target.closest("button");
    if (!button || button.hasAttribute("disabled")) return;
    if ((button.getAttribute("type") || "").toLowerCase() === "submit") return;

    const actionId = button.getAttribute("data-action-id") || "";
    const rawLabel =
      button.getAttribute("data-action-label") ||
      button.getAttribute("aria-label") ||
      button.getAttribute("title") ||
      button.textContent ||
      "";
    const label = rawLabel.replace(/\s+/g, " ").trim();
    const hasIconOnlyContent = !label && !actionId && Boolean(button.querySelector("svg"));
    const actionPath =
      resolvePageButtonAction(currentPage?.path || location.pathname, label, actionId) ||
      resolveIconOnlyFallbackPath(button, shellRole) ||
      (hasIconOnlyContent ? alertRouteByRole[shellRole] : null);
    if (!actionPath) return;
    event.preventDefault();
    navigateToPath(actionPath);
  };

  useEffect(() => {
    setAccountSwitcherOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [searchOpen]);

  return (
    <div className="fh-page-canvas h-[100dvh] overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]">
      <header className="fh-shell-topbar fixed inset-x-0 top-0 z-50 h-14 border-b">
        <div className="h-full w-full px-2.5 sm:px-3 lg:px-4">
          <div className="flex h-full items-center gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                className="fh-shell-control inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-secondary)] lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Go to FaithHub landing page"
                onClick={() => navigate(routes.public.landing)}
                className="fh-shell-control inline-flex h-10 min-w-0 items-center rounded-2xl px-2.5 sm:px-3"
              >
                <img
                  src={faithmartLogoLandscape}
                  alt="FaithMart"
                  className="h-8 w-auto max-w-[11rem] object-contain sm:h-9 sm:max-w-[12rem]"
                />
              </button>
            </div>

            <div className="hidden min-w-0 flex-1 px-1 md:flex lg:px-2">
              <label
                ref={searchContainerRef}
                className="fh-search-shell fh-shell-control relative mx-auto flex h-10 w-full max-w-[44rem] min-w-0 items-center gap-2 rounded-2xl px-3"
              >
                <Search className="h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
                <input
                  type="search"
                  aria-label="Search institutions, series, resources, and live sessions"
                  value={navQuery}
                  onChange={(event) => setNavQuery(event.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search institutions, series, resources, live..."
                  className="h-8 w-full border-0 bg-transparent text-sm font-semibold text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted,#6B7280)]"
                />
                {searchOpen && navQuery.trim().length >= 2 ? (
                  <div
                    className="absolute left-0 right-0 top-[calc(100%+0.45rem)] z-50 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-1.5 shadow-[var(--shadow-soft)]"
                    data-no-nav
                  >
                    {globalSearchResults.length ? (
                      <div className="max-h-72 overflow-y-auto">
                        {globalSearchResults.map((result) => (
                          <button
                            key={`${result.type}:${result.id}`}
                            type="button"
                            onClick={() => {
                              navigateToPath(result.path);
                              setSearchOpen(false);
                            }}
                            className="flex w-full items-start justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition hover:bg-[var(--fh-elevated-surface)]"
                            data-no-nav
                          >
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold text-[var(--text-primary)]">
                                {result.title}
                              </span>
                              <span className="block truncate text-xs text-[var(--text-secondary)]">
                                {result.subtitle}
                              </span>
                            </span>
                            <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                              {result.type}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-2 py-3 text-xs text-[var(--text-secondary)]">
                        No results found for "{navQuery.trim()}".
                      </div>
                    )}
                  </div>
                ) : null}
              </label>
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2 md:ml-0">
              <button
                type="button"
                aria-label="Open alerts"
                data-action-id="open-alerts"
                title="Open alerts"
                onClick={() => navigateToPath(alertRouteByRole[shellRole])}
                className="fh-shell-control relative inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-secondary)]"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
                  2
                </span>
              </button>
              <div className="relative">
                <button
                  type="button"
                  title={`Open account menu (${currentRoleLabel})`}
                  aria-label={`Open account menu. Current role: ${currentRoleLabel}`}
                  aria-expanded={accountSwitcherOpen}
                  onClick={() => setAccountSwitcherOpen((prev) => !prev)}
                  className="fh-shell-control inline-flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--text-secondary)]"
                >
                  <CircleUserRound className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-full pt-14">
        <aside
          className={`fixed left-0 top-14 bottom-0 z-40 hidden transition-[width] duration-200 ease-out lg:block ${
            sidebarCollapsed ? "w-[84px]" : "w-[280px]"
          }`}
        >
          <Sidebar
            sections={sidebarSections}
            currentRole={shellRole}
            collapsed={sidebarCollapsed}
            currentPath={activeNavPath}
            onRoleSwitch={handleRoleSwitch}
            resolvePath={resolveNavPath}
            onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          />
        </aside>

        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            display: { lg: "none" },
            "& .MuiDrawer-paper": {
              width: "min(300px, 84vw)",
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
            },
          }}
        >
          <div className="h-full">
            <Sidebar
              sections={sidebarSections}
              currentRole={shellRole}
              currentPath={activeNavPath}
              onRoleSwitch={handleRoleSwitch}
              resolvePath={resolveNavPath}
              onNavigate={() => setMobileOpen(false)}
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </Drawer>

        <main
          className={`fh-scroll-region min-h-0 flex-1 overflow-y-auto px-6 py-6 ${sidebarWidthClass}`}
          onClickCapture={handlePageAction}
        >
          <div className="fh-app-content min-h-full">
            {showGivingCta ? <GiveSupportCTA role={shellRole} /> : null}
            <Outlet />
          </div>
        </main>
      </div>

      <AccountSwitcher
        isOpen={accountSwitcherOpen}
        colorMode={mode}
        onClose={() => setAccountSwitcherOpen(false)}
        onToggleColorMode={() => {
          toggle();
        }}
        onOpenProfileSettings={() => {
          navigateToPath(profileSettingsRouteByRole[shellRole]);
          setAccountSwitcherOpen(false);
        }}
        onLogout={() => {
          setUser(null);
          navigate(routes.public.access);
          setAccountSwitcherOpen(false);
        }}
      />
    </div>
  );
}
