import React, { useEffect, useMemo, useState } from "react";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Bell, CircleUserRound, Menu, Search } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import AccountSwitcher from "@/components/layout/AccountSwitcher";
import Sidebar from "@/components/layout/Sidebar";
import { useColorMode } from "@/theme/color-mode";
import { getRoutePatterns, pageRegistry, type PageRegistryItem, type RoleKey } from "@/config/pageRegistry";
import { buildUnifiedSidebarSections } from "@/config/sidebar";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";
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

function getCurrentRole(pathname: string): RoleKey {
  if (pathname.startsWith(routes.app.provider.base)) return "provider";
  if (pathname.startsWith(routes.app.admin.base)) return "admin";
  return "user";
}

function matchesPagePath(page: Pick<PageRegistryItem, "path" | "routePatterns">, pathname: string) {
  return getRoutePatterns(page).some((pattern) => Boolean(matchPath({ path: pattern, end: true }, pathname)));
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
  const [accountSwitcherOpen, setAccountSwitcherOpen] = useState(false);

  const sidebarSections = useMemo(
    () => buildUnifiedSidebarSections({ role: shellRole, query: navQuery }),
    [shellRole, navQuery],
  );

  const currentPage = pageRegistry.find((page) => matchesPagePath(page, location.pathname));
  const activeNavPath = currentPage?.path || location.pathname;
  const currentRoleLabel = roleTriggerLabel[shellRole];
  const sidebarWidthClass = sidebarCollapsed ? "lg:ml-[84px]" : "lg:ml-[280px]";

  const resolveNavPath = (path: string) => path;
  const navigateToPath = (path: string) => navigate(path);

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
      button.textContent ||
      "";
    const label = rawLabel.replace(/\s+/g, " ").trim();
    const actionPath = resolvePageButtonAction(currentPage?.path || location.pathname, label, actionId);
    if (!actionPath) return;
    event.preventDefault();
    navigateToPath(actionPath);
  };

  useEffect(() => {
    setAccountSwitcherOpen(false);
  }, [location.pathname]);

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
              <label className="fh-search-shell fh-shell-control mx-auto flex h-10 w-full max-w-[44rem] min-w-0 items-center gap-2 rounded-2xl px-3">
                <Search className="h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
                <input
                  type="search"
                  aria-label="Search navigation"
                  value={navQuery}
                  onChange={(event) => setNavQuery(event.target.value)}
                  placeholder="Search navigation"
                  className="h-8 w-full border-0 bg-transparent text-sm font-semibold text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted,#6B7280)]"
                />
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
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
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
            collapsed={sidebarCollapsed}
            currentPath={activeNavPath}
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
              currentPath={activeNavPath}
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
            <Outlet />
          </div>
        </main>
      </div>

      <AccountSwitcher
        isOpen={accountSwitcherOpen}
        currentRole={shellRole}
        colorMode={mode}
        onClose={() => setAccountSwitcherOpen(false)}
        onSwitchRole={(nextRole: Role, path: string) => {
          setRole(nextRole);
          navigateToPath(path);
          setAccountSwitcherOpen(false);
        }}
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
