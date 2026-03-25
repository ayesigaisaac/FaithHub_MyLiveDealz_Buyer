import React, { useEffect, useMemo, useRef, useState } from "react";
import { matchPath, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import {
  Bell,
  Check,
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { ColorModeToggle } from "@/theme/color-mode-toggle";
import {
  defaultPageForRole,
  getRoutePatterns,
  pagesByRole,
  pageRegistry,
  type PageRegistryItem,
  type RoleKey,
} from "@/config/pageRegistry";
import { buildSidebarSections } from "@/config/sidebar";
import { routes } from "@/constants/routes";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const pages = useMemo(
    () => (adminAllAccess ? pageRegistry : pagesByRole[routeRole] || []),
    [adminAllAccess, routeRole],
  );

  const filteredPages = useMemo(() => {
    const normalized = navQuery.trim().toLowerCase();
    if (!normalized) return pages;
    return pages.filter((page) =>
      `${page.label} ${page.section} ${page.navTag} ${page.description}`.toLowerCase().includes(normalized),
    );
  }, [pages, navQuery]);

  const sidebarSections = useMemo(
    () => buildSidebarSections({ role: routeRole, pages: filteredPages, adminAllAccess }),
    [adminAllAccess, filteredPages, routeRole],
  );

  const currentPage = pageRegistry.find((page) => matchesPagePath(page, location.pathname));
  const activeNavPath = currentPage?.path || location.pathname;

  const navigateToPath = (path: string) => navigate(withAdminAccess(path, adminAllAccess));

  const quickActions = useMemo(() => {
    if (shellRole === "provider") {
      return {
        profile: routes.app.provider.onboarding,
        settings: routes.app.provider.dashboard,
        notifications: routes.app.provider.notifications,
      };
    }
    if (shellRole === "admin") {
      return {
        profile: routes.app.admin.overview,
        settings: routes.app.admin.security,
        notifications: routes.app.admin.channels,
      };
    }
    return {
      profile: routes.app.user.profile,
      settings: routes.app.user.settings,
      notifications: routes.app.user.liveChat,
    };
  }, [shellRole]);

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
    if (!profileMenuOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileMenuOpen]);

  return (
    <div className="fh-page-canvas flex h-[100dvh] flex-col overflow-hidden overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="fh-shell-topbar z-30 shrink-0 border-b border-[var(--border)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur">
        <div className="w-full px-3 py-2.5 sm:px-4 lg:px-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="fh-shell-control inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Go to FaithHub landing page"
              onClick={() => navigate("/")}
              className="fh-shell-control inline-flex h-12 min-w-0 items-center rounded-2xl px-3"
            >
              <img
                src={faithmartLogoLandscape}
                alt="FaithMart"
                className="h-9 w-auto max-w-[11rem] object-contain sm:h-10 sm:max-w-[12rem]"
              />
            </button>

            <label className="fh-search-shell fh-shell-control hidden min-w-0 flex-1 items-center gap-2 rounded-2xl px-3 py-2 md:flex">
              <Search className="h-4 w-4 shrink-0 text-slate-500" />
              <input
                type="search"
                value={navQuery}
                onChange={(event) => setNavQuery(event.target.value)}
                placeholder="Search pages and modules"
                className="h-8 w-full border-0 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="ml-auto flex items-center gap-2">
              <div ref={profileMenuRef} className="relative hidden md:block">
                <button
                  type="button"
                  aria-label="Open profile options"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="fh-shell-control fh-interactive-card inline-flex h-11 items-center gap-2 rounded-2xl px-3.5 text-left"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#111827] text-[11px] font-semibold text-white">
                    BM
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-slate-900">Brian M.</span>
                    <span className="block text-xs text-slate-500">Greenhill Community</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-slate-500 transition ${profileMenuOpen ? "rotate-180" : ""}`} />
                </button>
                {profileMenuOpen ? (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-[280px] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_44px_rgba(15,23,42,0.16)]">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="text-sm font-semibold text-slate-900">Brian M.</div>
                      <div className="text-xs text-slate-500">Greenhill Community</div>
                    </div>

                    <div className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Switch Role
                    </div>
                    {(["user", "provider", "admin"] as RoleKey[]).map((item) => {
                      const active = shellRole === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            navigate(withAdminAccess(defaultPageForRole[item], adminAllAccess || item === "admin"));
                            setProfileMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium ${
                            active ? "border border-slate-200 bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{item === "user" ? "User" : item === "provider" ? "Provider" : "Admin"}</span>
                          {active ? <Check className="h-4 w-4" /> : null}
                        </button>
                      );
                    })}

                    <div className="mx-2 my-2 h-px bg-slate-200" />

                    <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Quick Actions
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigateToPath(quickActions.profile);
                        setProfileMenuOpen(false);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigateToPath(quickActions.settings);
                        setProfileMenuOpen(false);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Settings
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigateToPath(quickActions.notifications);
                        setProfileMenuOpen(false);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Notifications
                    </button>

                    <div className="mx-2 my-2 h-px bg-slate-200" />

                    <button
                      type="button"
                      onClick={() => {
                        navigate(routes.public.landing);
                        setProfileMenuOpen(false);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="hidden xl:block">
                <ColorModeToggle className="h-11 w-11 rounded-2xl" />
              </div>
              <button
                type="button"
                aria-label="Open alerts"
                className="fh-shell-control fh-interactive-card relative inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
              </button>
            </div>
          </div>

          <label className="fh-search-shell fh-shell-control mt-3 flex items-center gap-2 rounded-2xl px-3 py-2 md:hidden">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="search"
              value={navQuery}
              onChange={(event) => setNavQuery(event.target.value)}
              placeholder="Search pages and modules"
              className="h-8 w-full border-0 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>
      </div>

      <div className="flex w-full min-h-0 min-w-0 flex-1 gap-2.5 overflow-hidden px-2.5 pb-2.5 pt-2 sm:gap-3 sm:px-3 lg:px-4">
        <aside className={`hidden min-h-0 shrink-0 xl:block ${sidebarCollapsed ? "w-16" : "w-60"}`}>
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

        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { xl: "none" } }}>
          <div className="w-[280px] max-w-[90vw] p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="fh-label text-slate-500">Navigation</div>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[color:var(--card)] text-slate-700"
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
        <main className="fh-scroll-region fh-app-content min-h-0 min-w-0 flex-1 overflow-y-auto pr-0.5 sm:pr-1" onClickCapture={handlePageAction}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}


