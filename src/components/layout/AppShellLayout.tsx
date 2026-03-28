import React, { useEffect, useMemo, useRef, useState } from "react";
import { matchPath, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import {
  Bell,
  CircleUserRound,
  Menu,
  Search,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import RoleSwitcher from "@/components/layout/RoleSwitcher";
import { useColorMode } from "@/theme/color-mode";
import {
  getRoutePatterns,
  pagesByRole,
  pageRegistry,
  type PageRegistryItem,
  type RoleKey,
} from "@/config/pageRegistry";
import { buildSidebarSections } from "@/config/sidebar";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";
import { routes } from "@/constants/routes";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

const roleTriggerLabel: Record<RoleKey, string> = {
  user: "Faith Member",
  provider: "Provider Workspace",
  admin: "Admin Command",
};

const alertRouteByRole: Record<RoleKey, string> = {
  user: "/app/user/settings",
  provider: "/app/provider/notifications",
  admin: "/app/admin/live-moderation",
};

const profileSettingsRouteByRole: Record<RoleKey, string> = {
  user: "/app/user/profile",
  provider: "/app/provider/onboarding",
  admin: "/app/admin/overview",
};

function getCurrentRole(pathname: string): RoleKey {
  if (pathname.startsWith("/app/provider")) return "provider";
  if (pathname.startsWith("/app/admin")) return "admin";
  return "user";
}

function matchesPagePath(page: Pick<PageRegistryItem, "path" | "routePatterns">, pathname: string) {
  return getRoutePatterns(page).some((pattern) => Boolean(matchPath({ path: pattern, end: true }, pathname)));
}

function withAdminAccess(path: string, enabled: boolean) {
  if (!enabled || !path.startsWith("/app/")) return path;
  const [pathWithQuery, hashFragment] = path.split("#", 2);
  const [pathname, rawQuery = ""] = pathWithQuery.split("?", 2);
  const params = new URLSearchParams(rawQuery);
  params.set("admin", "1");
  const query = params.toString();
  const hash = hashFragment ? `#${hashFragment}` : "";
  return `${pathname}${query ? `?${query}` : ""}${hash}`;
}

export default function AppShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mode, toggle } = useColorMode();

  const routeRole = getCurrentRole(location.pathname);
  const adminAllAccess = routeRole === "admin" || searchParams.get("admin") === "1";
  const shellRole: RoleKey = adminAllAccess ? "admin" : routeRole;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const roleSwitcherRef = useRef<HTMLDivElement | null>(null);
  const roleSwitcherTriggerRef = useRef<HTMLButtonElement | null>(null);
  const shouldRestoreRoleSwitcherFocus = useRef(false);

  const pages = useMemo(
    () => (adminAllAccess ? pageRegistry : pagesByRole[routeRole] || []),
    [adminAllAccess, routeRole],
  );

  const baseSidebarSections = useMemo(
    () => buildSidebarSections({ role: routeRole, pages, adminAllAccess }),
    [adminAllAccess, pages, routeRole],
  );

  const filteredPages = useMemo(() => {
    const normalized = navQuery.trim().toLowerCase();
    if (!normalized) return pages;
    return pages.filter((page) =>
      `${page.label} ${page.section} ${page.navTag} ${page.description}`.toLowerCase().includes(normalized),
    );
  }, [pages, navQuery]);

  const sidebarSections = useMemo(
    () =>
      navQuery.trim()
        ? buildSidebarSections({ role: routeRole, pages: filteredPages, adminAllAccess })
        : baseSidebarSections,
    [adminAllAccess, baseSidebarSections, filteredPages, navQuery, routeRole],
  );

  const currentPage = pageRegistry.find((page) => matchesPagePath(page, location.pathname));
  const activeNavPath = currentPage?.path || location.pathname;
  const currentRoleLabel = roleTriggerLabel[shellRole];

  const resolveNavPath = (path: string) => withAdminAccess(path, adminAllAccess);
  const navigateToPath = (path: string) => navigate(resolveNavPath(path));

  const handlePageAction = (event: React.MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest("[data-no-nav]")) return;
    if (target.closest("a, [role='link'], input, textarea, select, option, label")) return;

    const button = target?.closest("button");
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
    setRoleSwitcherOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (roleSwitcherOpen) {
      shouldRestoreRoleSwitcherFocus.current = true;
      return;
    }
    if (!shouldRestoreRoleSwitcherFocus.current) return;
    shouldRestoreRoleSwitcherFocus.current = false;
    roleSwitcherTriggerRef.current?.focus();
  }, [roleSwitcherOpen]);

  useEffect(() => {
    if (!roleSwitcherOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickInsideMenu = roleSwitcherRef.current?.contains(target);
      const clickInsideTrigger = roleSwitcherTriggerRef.current?.contains(target);
      if (!clickInsideMenu && !clickInsideTrigger) {
        setRoleSwitcherOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setRoleSwitcherOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [roleSwitcherOpen]);

  return (
    <div className="fh-page-canvas flex h-[100dvh] flex-col overflow-hidden overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <header className="fh-shell-topbar sticky top-0 z-50 h-14 shrink-0 border-b border-zinc-200/85">
        <div className="h-full w-full px-2.5 sm:px-3 lg:px-4">
          <div className="flex h-full items-center gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                className="fh-shell-control inline-flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-700 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Go to FaithHub landing page"
                onClick={() => navigate("/")}
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
                <Search className="h-4 w-4 shrink-0 text-zinc-500" />
                <input
                  type="search"
                  aria-label="Search pages and modules"
                  value={navQuery}
                  onChange={(event) => setNavQuery(event.target.value)}
                  placeholder="Search pages and modules"
                  className="h-8 w-full border-0 bg-transparent text-sm font-semibold text-zinc-800 outline-none placeholder:text-zinc-400"
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
                className="fh-shell-control relative inline-flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-700"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white">
                  2
                </span>
              </button>
              <div className="relative">
                <button
                  ref={roleSwitcherTriggerRef}
                  type="button"
                  title={`Open account menu (${currentRoleLabel})`}
                  aria-label={`Open account menu. Current role: ${currentRoleLabel}`}
                  aria-expanded={roleSwitcherOpen}
                  onClick={() => setRoleSwitcherOpen((prev) => !prev)}
                  className="fh-shell-control inline-flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-700"
                >
                  <CircleUserRound className="h-5 w-5" />
                </button>

                {roleSwitcherOpen ? (
                  <div
                    ref={roleSwitcherRef}
                    className="fixed inset-x-2 top-[66px] z-[70] sm:absolute sm:right-0 sm:top-[calc(100%+10px)] sm:inset-x-auto"
                  >
                    <RoleSwitcher
                      isOpen={roleSwitcherOpen}
                      currentPath={location.pathname}
                      currentRole={shellRole}
                      colorMode={mode}
                      onClose={() => setRoleSwitcherOpen(false)}
                      onSwitch={(path) => {
                        navigateToPath(path);
                        setRoleSwitcherOpen(false);
                      }}
                      onToggleColorMode={() => {
                        toggle();
                        setRoleSwitcherOpen(false);
                      }}
                      onOpenProfileSettings={() => {
                        navigateToPath(profileSettingsRouteByRole[shellRole]);
                        setRoleSwitcherOpen(false);
                      }}
                      onLogout={() => {
                        navigate(routes.public.access);
                        setRoleSwitcherOpen(false);
                      }}
                      className="w-full sm:w-[22rem]"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex w-full min-h-0 min-w-0 flex-1 gap-2 overflow-hidden px-1 py-1.5 sm:px-2 lg:px-2.5 lg:pb-3">
        <aside
          className={`hidden min-h-0 shrink-0 transition-[width] duration-300 ease-out lg:block ${
            sidebarCollapsed ? "w-[84px] xl:w-[92px]" : "w-[248px] xl:w-[284px]"
          }`}
        >
          <div className="h-full min-h-0">
            <Sidebar
              sections={sidebarSections}
              collapsed={sidebarCollapsed}
              currentPath={activeNavPath}
              resolvePath={resolveNavPath}
              onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
            />
          </div>
        </aside>

        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            display: { lg: "none" },
            "& .MuiDrawer-paper": {
              width: "min(308px, 82vw)",
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
            },
          }}
        >
          <div className="fh-mobile-drawer-shell flex h-full min-h-0 flex-col border-r border-[var(--fh-nav-shell-border)] bg-[color:var(--fh-nav-shell-bg)]/95 shadow-[0_28px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl">
            <div className="min-h-0 flex-1">
              <Sidebar
                sections={sidebarSections}
                currentPath={activeNavPath}
                compactHeight
                resolvePath={resolveNavPath}
                onNavigate={() => setMobileOpen(false)}
                onClose={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </Drawer>
        <main
          className="fh-scroll-region fh-app-content min-h-0 min-w-0 flex-1 overflow-y-auto rounded-3xl border border-zinc-200/75 bg-white/65 p-2 pb-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:p-3 lg:p-4 lg:pb-4"
          onClickCapture={handlePageAction}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}


