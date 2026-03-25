import React, { useEffect, useMemo, useRef, useState } from "react";
import { matchPath, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import {
  Bell,
  ChevronDown,
  Landmark,
  Menu,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import RoleSwitcher from "@/components/layout/RoleSwitcher";
import { ColorModeToggle } from "@/theme/color-mode-toggle";
import {
  getRoutePatterns,
  pagesByRole,
  pageRegistry,
  type PageRegistryItem,
  type RoleKey,
} from "@/config/pageRegistry";
import { buildSidebarSections } from "@/config/sidebar";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

const mobileLabelByItemId: Record<string, string> = {
  "u-home": "Home",
  "u-discover": "Discover",
  "u-live-hub": "Live",
  "u-events": "Events",
  "u-giving": "Giving",
  "u-series-library": "Series",
  "u-profile": "Profile",
  "u-settings": "Settings",
  "p-dashboard": "Home",
  "p-onboarding": "Setup",
  "p-live-ops": "Live",
  "p-events-manager": "Events",
  "p-funds": "Funds",
  "a-overview": "Home",
  "a-live-mod": "Live",
  "a-finance": "Finance",
  "a-security": "Security",
};

const roleTriggerMeta: Record<RoleKey, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  user: { label: "Faith Member", icon: Users },
  provider: { label: "Provider Workspace", icon: Landmark },
  admin: { label: "Platform Admin", icon: ShieldCheck },
};

function getMobileNavLabel(item: { id: string; label: string }) {
  const mapped = mobileLabelByItemId[item.id];
  if (mapped) return mapped;
  const trimmed = item.label.trim();
  if (trimmed.length <= 9) return trimmed;
  const firstWord = trimmed.split(/\s+/)[0] || trimmed;
  if (firstWord.length >= 4 && firstWord.length <= 9) return firstWord;
  return trimmed.slice(0, 9);
}

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
  return path.includes("?") ? `${path}&admin=1` : `${path}?admin=1`;
}

export default function AppShellLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const routeRole = getCurrentRole(location.pathname);
  const adminAllAccess = routeRole === "admin" || searchParams.get("admin") === "1";
  const shellRole: RoleKey = adminAllAccess ? "admin" : routeRole;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const roleSwitcherRef = useRef<HTMLDivElement | null>(null);
  const roleSwitcherTriggerRef = useRef<HTMLButtonElement | null>(null);

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
  const roleMeta = roleTriggerMeta[shellRole];
  const RoleIcon = roleMeta.icon;

  const navigateToPath = (path: string) => navigate(withAdminAccess(path, adminAllAccess));

  const mobilePrimaryItems = useMemo(() => {
    const seen = new Set<string>();
    return baseSidebarSections
      .flatMap((section) => section.items)
      .filter((item) => {
        if (seen.has(item.path)) return false;
        seen.add(item.path);
        return true;
      })
      .slice(0, 4);
  }, [baseSidebarSections]);

  const handlePageAction = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest("button");
    if (!button || button.hasAttribute("disabled")) return;
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
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [roleSwitcherOpen]);

  return (
    <div className="fh-page-canvas flex h-[100dvh] flex-col overflow-hidden overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <header className="fh-shell-topbar sticky top-0 z-50 shrink-0 border-b border-zinc-200/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="w-full px-2.5 py-2 sm:px-3 sm:py-3 lg:px-4">
          <div className="flex items-center gap-2">
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
              <label className="fh-search-shell fh-shell-control mx-auto flex w-full max-w-[44rem] min-w-0 items-center gap-2 rounded-2xl px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-zinc-500" />
                <input
                  type="search"
                  value={navQuery}
                  onChange={(event) => setNavQuery(event.target.value)}
                  placeholder="Search pages and modules"
                  className="h-8 w-full border-0 bg-transparent text-sm font-semibold text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              </label>
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2 md:ml-0">
              <div className="relative">
                <button
                  ref={roleSwitcherTriggerRef}
                  type="button"
                  aria-label="Switch role"
                  aria-expanded={roleSwitcherOpen}
                  onClick={() => setRoleSwitcherOpen((prev) => !prev)}
                  className="fh-shell-control inline-flex h-10 items-center gap-2 rounded-2xl px-2 text-zinc-700 sm:px-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                    <RoleIcon className="h-4 w-4" />
                  </span>
                  <span className="hidden max-w-[10.5rem] truncate text-xs font-semibold lg:inline">{roleMeta.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition ${roleSwitcherOpen ? "rotate-180" : ""}`}
                  />
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
                      onClose={() => setRoleSwitcherOpen(false)}
                      onSwitch={(path) => {
                        navigateToPath(path);
                        setRoleSwitcherOpen(false);
                      }}
                      onManageRoles={() => {
                        navigateToPath("/app/admin/overview");
                        setRoleSwitcherOpen(false);
                      }}
                      className="w-full sm:w-[22rem]"
                    />
                  </div>
                ) : null}
              </div>
              <div className="hidden xl:block">
                <ColorModeToggle className="h-10 w-10 rounded-2xl" />
              </div>
              <button
                type="button"
                aria-label="Open alerts"
                className="fh-shell-control relative inline-flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-700"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
              </button>
            </div>
          </div>

          <label className="fh-search-shell fh-shell-control mt-2 flex items-center gap-2 rounded-2xl px-3 py-2 md:hidden">
            <Search className="h-4 w-4 shrink-0 text-zinc-500" />
            <input
              type="search"
              value={navQuery}
              onChange={(event) => setNavQuery(event.target.value)}
              placeholder="Search pages and modules"
              className="h-8 w-full border-0 bg-transparent text-sm font-semibold text-zinc-800 outline-none placeholder:text-zinc-400"
            />
          </label>
        </div>
      </header>

      <div className="relative flex w-full min-h-0 min-w-0 flex-1 gap-2 overflow-hidden px-1 py-1.5 sm:px-2 lg:px-2.5 lg:pb-3">
        <aside className={`hidden min-h-0 shrink-0 lg:block ${sidebarCollapsed ? "w-[92px]" : "w-[284px]"}`}>
          <div className="h-full">
            <Sidebar
              role={shellRole}
              sections={sidebarSections}
              collapsed={sidebarCollapsed}
              currentPath={activeNavPath}
              onNavigate={navigateToPath}
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
              width: "min(344px, 86vw)",
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
            },
          }}
        >
          <div className="fh-mobile-drawer-shell h-full border-r border-zinc-200 bg-white shadow-2xl">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <div className="fh-label text-zinc-500">Navigation</div>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Sidebar
              role={shellRole}
              sections={sidebarSections}
              currentPath={activeNavPath}
              compactHeight
              onNavigate={(path) => {
                navigateToPath(path);
                setMobileOpen(false);
              }}
            />
          </div>
        </Drawer>
        <main
          className="fh-scroll-region fh-app-content min-h-0 min-w-0 flex-1 overflow-y-auto rounded-3xl border border-zinc-200/75 bg-white/65 p-2 pb-[5.8rem] shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:p-3 lg:p-4 lg:pb-4"
          onClickCapture={handlePageAction}
        >
          <Outlet />
        </main>
      </div>

      <nav className="fh-mobile-bottom-nav lg:hidden" aria-label="Primary mobile navigation">
        <div className="mx-auto grid max-w-none grid-cols-5 px-1.5 py-1 sm:px-2.5">
          {mobilePrimaryItems.map((item) => {
            const Icon = item.icon;
            const active = activeNavPath === item.path;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToPath(item.path)}
                className={`relative min-w-0 flex flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 text-[10px] font-semibold leading-tight sm:px-2 ${
                  active ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50"
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
                <span className="fh-mobile-nav-label w-full truncate text-center">{getMobileNavLabel(item)}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="relative min-w-0 flex flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 text-[10px] font-semibold leading-tight text-zinc-600 sm:px-2"
          >
            <Menu className="h-5 w-5" />
            <span className="fh-mobile-nav-label w-full truncate text-center">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
}


