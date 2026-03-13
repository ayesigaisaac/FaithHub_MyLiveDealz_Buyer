import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Bell, Menu, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorModeToggle } from "@/theme/color-mode-toggle";
import {
  defaultPageForRole,
  pagesByRole,
  pageRegistry,
  type PageRegistryItem,
  type RoleKey,
} from "@/config/pageRegistry";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

const sectionLabelMap: Partial<Record<RoleKey, Record<string, string>>> = {
  user: {
    "Start & Identity": "Account",
    "Discovery & Institutions": "Explore",
    "Series & Content": "Library",
    "Live Sessionz": "Live",
    "Events, Giving & Membership": "Community",
    "Trust & Settings": "Preferences",
  },
  provider: {
    "Onboarding & Core HQ": "Workspace",
    "Content Studio": "Content",
    "Live Operations": "Live Ops",
    "Audience & Distribution": "Audience",
    "Commerce, Funds & Trust": "Revenue & Trust",
  },
  admin: {
    "Global Control": "Overview",
    "Verification & Trust": "Trust",
    "Finance & Channels": "Finance",
    "Security & Evidence": "Security",
  },
};

type GroupedPages = Record<string, PageRegistryItem[]>;

function getCurrentRole(pathname: string): RoleKey {
  if (pathname.startsWith('/app/provider')) return 'provider';
  if (pathname.startsWith('/app/admin')) return 'admin';
  return 'user';
}

function withAdminAccess(path: string, enabled: boolean) {
  if (!enabled || !path.startsWith("/app/")) return path;
  return path.includes("?") ? `${path}&admin=1` : `${path}?admin=1`;
}

function getSectionLabel(role: RoleKey, section: string) {
  return sectionLabelMap[role]?.[section] || section;
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
  const pages = useMemo(() => (adminAllAccess ? pageRegistry : pagesByRole[routeRole] || []), [adminAllAccess, routeRole]);
  const grouped = useMemo<GroupedPages>(() => {
    const keyFor = (page: PageRegistryItem) => {
      if (!adminAllAccess) return getSectionLabel(routeRole, page.section);
      const roleLabel = page.role === "provider" ? "Provider" : page.role === "admin" ? "Admin" : "User";
      return `${roleLabel} · ${getSectionLabel(page.role, page.section)}`;
    };
    return pages.reduce((acc, page) => {
      const key = keyFor(page);
      (acc[key] ||= []).push(page);
      return acc;
    }, {} as GroupedPages);
  }, [adminAllAccess, pages, routeRole]);
  const currentPage = pageRegistry.find((page) => page.path === location.pathname);
  const navigateToPath = (path: string) => navigate(withAdminAccess(path, adminAllAccess));
  const exitAdminView = () => navigate(location.pathname, { replace: true });
  const handlePageAction = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest("button");
    if (!button || button.hasAttribute("disabled")) return;
    const rawLabel = button.getAttribute("data-action-label") || button.getAttribute("aria-label") || button.textContent || "";
    const label = rawLabel.replace(/\s+/g, " ").trim();
    const actionPath = resolvePageButtonAction(location.pathname, label);
    if (!actionPath) return;
    event.preventDefault();
    navigateToPath(actionPath);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={sidebarCollapsed}
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:flex"
            >
              {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </button>
            <button
              type="button"
              aria-label="Go to FaithHub landing page"
              onClick={() => navigate('/')}
              className="flex min-w-0 items-center rounded-[20px] border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4"
            >
              <img src={faithmartLogoLandscape} alt="FaithMart" className="h-10 w-auto max-w-[11rem] object-contain sm:h-11 sm:max-w-[12rem]" />
            </button>
          </div>

          <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-left shadow-sm lg:flex">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Search className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Search</div>
              <div className="truncate text-sm text-slate-500">Pages, institutions, routes, and workspace tools</div>
            </div>
            <span className="ml-auto rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">{pages.length} pages</span>
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-[20px] border border-slate-200 bg-white px-2 py-1.5 shadow-sm xl:flex">
              <span className="px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Display</span>
              <ColorModeToggle className="inline-flex" />
            </div>
            <RoleSwitcher role={shellRole} onChange={(nextRole) => navigate(withAdminAccess(defaultPageForRole[nextRole], adminAllAccess || nextRole === "admin"))} />
            {adminAllAccess && routeRole !== "admin" ? (
              <button
                type="button"
                onClick={exitAdminView}
                className="hidden rounded-[18px] border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600 xl:inline-flex"
              >
                Exit admin view
              </button>
            ) : null}
            <div className="flex items-center gap-2 rounded-[20px] border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
              <span className="hidden px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:inline">Alerts</span>
              <button
                type="button"
                aria-label="Open alerts"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1800px] min-w-0 gap-5 px-3 pb-10 pt-4 sm:px-4 lg:px-5">
        <aside className={`hidden lg:block ${sidebarCollapsed ? 'w-[92px]' : 'w-[320px]'}`}>
          <SidebarCard collapsed={sidebarCollapsed} role={shellRole} grouped={grouped} currentPath={location.pathname} navigate={navigateToPath} />
        </aside>

        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { lg: 'none' } }}>
          <div className="w-[320px] max-w-[86vw] p-4">
            <SidebarCard collapsed={false} role={shellRole} grouped={grouped} currentPath={location.pathname} navigate={(path) => { navigateToPath(path); setMobileOpen(false); }} />
          </div>
        </Drawer>

        <main className="min-w-0 flex-1" onClickCapture={handlePageAction}>
          <Card className="mb-5 rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <div className="text-[28px] font-bold leading-none text-slate-900">{currentPage?.label || "FaithHub"}</div>
                  <div className="mt-2 max-w-2xl text-sm text-slate-500">{currentPage?.description || "Routed workspace"}</div>
                </div>
                <div className="flex min-w-0 flex-wrap gap-2">
                  <Badge className="rounded-full border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    {adminAllAccess ? "ADMIN · ALL ACCESS" : routeRole.toUpperCase()}
                  </Badge>
                  <Badge className="max-w-full truncate rounded-full bg-slate-50 text-slate-500 hover:bg-slate-50 sm:max-w-[24rem]">{location.pathname}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function RoleSwitcher({ role, onChange }: { role: RoleKey; onChange: (role: RoleKey) => void }) {
  const roles: RoleKey[] = ['user', 'provider', 'admin'];
  return (
    <div aria-label="Switch workspace role" className="flex max-w-full flex-wrap items-center gap-1 rounded-[20px] border border-slate-200 bg-white p-1.5 shadow-sm">
      {roles.map((item) => {
        const active = role === item;
        return (
          <button
            type="button"
            key={item}
            aria-pressed={active}
            onClick={() => onChange(item)}
            className={`rounded-[14px] px-3 py-2 text-sm font-semibold transition ${
              active
                ? item === 'provider'
                  ? 'bg-[#fff7ed] text-[#c2410c]'
                  : item === 'admin'
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-50 text-emerald-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {item === 'user' ? 'User' : item === 'provider' ? 'Provider' : 'Admin'}
          </button>
        );
      })}
    </div>
  );
}

function SidebarCard({ collapsed, role, grouped, currentPath, navigate }: { collapsed: boolean; role: RoleKey; grouped: GroupedPages; currentPath: string; navigate: (path: string) => void }) {
  return (
    <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_-35px_rgba(15,23,42,0.35)]">
      <CardContent className="p-3">
        <div className="mb-4 rounded-[20px] border border-emerald-100 bg-emerald-50 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Workspace</div>
          {!collapsed ? <><div className="mt-2 text-xl font-semibold text-slate-900">{role === 'user' ? 'My Faith Space' : role === 'provider' ? 'Institution Workspace' : 'Global Control Tower'}</div><div className="mt-1 text-sm leading-6 text-slate-500">{role === 'user' ? 'Discovery, live sessions, events, and giving in one place.' : role === 'provider' ? 'Operations, audiences, events, and revenue in one workspace.' : 'Verification, moderation, policy, and security oversight.'}</div></> : null}
        </div>
        <div className="space-y-4">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="space-y-2">
              {!collapsed ? <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{section}</div> : null}
              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = item.path === currentPath;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      aria-current={active ? "page" : undefined}
                      onClick={() => navigate(item.path)}
                      className={`group flex w-full items-center gap-3 rounded-[18px] border px-3 py-3 text-left transition ${active ? 'border-emerald-100 bg-emerald-50' : 'border-transparent bg-white hover:border-slate-200 hover:bg-slate-50'}`}
                    >
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-500 ring-1 ring-slate-200 group-hover:bg-white'}`}><Icon className="h-5 w-5" /></div>
                      {!collapsed ? <div className="min-w-0 flex-1"><div className={`truncate text-sm ${active ? 'font-semibold text-emerald-800' : 'font-medium text-slate-900'}`}>{item.label}</div><div className="truncate text-xs text-slate-500">{item.path}</div></div> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}



