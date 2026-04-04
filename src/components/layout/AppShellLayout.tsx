import React, { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { useAuth } from "@/auth/AuthContext";
import AccountSwitcher from "@/components/layout/AccountSwitcher";
import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/Sidebar";
import GiveSupportCTA from "@/components/giving/GiveSupportCTA";
import { useColorMode } from "@/theme/color-mode";
import { getRoutePatterns, pageRegistry, type PageRegistryItem, type RoleKey } from "@/config/pageRegistry";
import { buildUnifiedSidebarSections } from "@/config/sidebar";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";
import { searchGlobalContent } from "@/data/globalSearch";
import { trackEvent } from "@/data/tracker";
import { routes } from "@/constants/routes";
import type { Role } from "@/types/roles";

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

function parseRoleFromSearch(search: string): RoleKey | null {
  const params = new URLSearchParams(search);
  const as = (params.get("as") || "").toLowerCase();
  if (as === "admin" || as === "super_admin" || as === "tenant_admin" || as === "ops") return "admin";
  if (as === "provider") return "provider";
  if (as === "user") return "user";
  return null;
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
  const { currentRole, setRole, logout } = useAuth();
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
  const navigateToPath = (path: string) => {
    trackEvent(
      "NAVIGATE_PAGE",
      {
        from: location.pathname,
        to: path,
        source: "app-shell",
      },
      { role: shellRole },
    );
    navigate(path);
  };
  const handleRoleSwitch = (nextRole: Role, path: string) => {
    trackEvent(
      "ROLE_SWITCH",
      {
        fromRole: shellRole,
        toRole: nextRole,
        trigger: "sidebar",
      },
      { role: shellRole },
    );
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
    trackEvent(
      "CLICK_BUTTON",
      {
        id: actionId || "shell-action",
        label,
        location: currentPage?.path || location.pathname,
      },
      { role: shellRole },
    );
    navigateToPath(actionPath);
  };

  useEffect(() => {
    setAccountSwitcherOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const requestedRole = parseRoleFromSearch(location.search);
    if (!requestedRole || requestedRole === currentRole) return;
    setRole(requestedRole);
  }, [currentRole, location.search, setRole]);

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
      <AppHeader
        mobileOpen={mobileOpen}
        navQuery={navQuery}
        searchOpen={searchOpen}
        accountSwitcherOpen={accountSwitcherOpen}
        currentRoleLabel={currentRoleLabel}
        alertPath={alertRouteByRole[shellRole]}
        searchResults={globalSearchResults}
        searchContainerRef={searchContainerRef}
        onOpenMobileMenu={() => setMobileOpen(true)}
        onGoToLanding={() => navigate(routes.public.landing)}
        onChangeQuery={setNavQuery}
        onToggleSearchOpen={setSearchOpen}
        onNavigate={navigateToPath}
        onToggleAccountSwitcher={() => setAccountSwitcherOpen((prev) => !prev)}
      />

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
          logout();
          navigate(routes.public.login);
          setAccountSwitcherOpen(false);
        }}
      />
    </div>
  );
}
