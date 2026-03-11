import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Bell, Menu, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorModeToggle } from "@/theme/color-mode-toggle";
import { defaultPageForRole, pagesByRole, pageRegistry, type RoleKey } from "@/config/pageRegistry";
import { resolvePageButtonAction } from "@/config/pageActionRegistry";
import faithhubMark from "@/assets/faithhub-mark.svg";

function getCurrentRole(pathname: string): RoleKey {
  if (pathname.startsWith('/app/provider')) return 'provider';
  if (pathname.startsWith('/app/admin')) return 'admin';
  return 'user';
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
  const pages = useMemo(() => (adminAllAccess ? pageRegistry : pagesByRole[routeRole] || []), [adminAllAccess, routeRole]);
  const grouped = useMemo(() => {
    const keyFor = (page: any) => {
      if (!adminAllAccess) return page.section;
      const roleLabel = page.role === "provider" ? "Provider" : page.role === "admin" ? "Admin" : "User";
      return `${roleLabel} · ${page.section}`;
    };
    return pages.reduce((acc, page) => {
      const key = keyFor(page);
      (acc[key] ||= []).push(page);
      return acc;
    }, {} as Record<string, typeof pages>);
  }, [adminAllAccess, pages]);
  const currentPage = pageRegistry.find((page) => page.path === location.pathname);
  const navigateToPath = (path: string) => navigate(withAdminAccess(path, adminAllAccess));
  const exitAdminView = () => navigate(location.pathname, { replace: true });
  const handlePageAction = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest("button");
    if (!button || button.hasAttribute("disabled")) return;
    const label = (button.textContent || button.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
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
            <button type="button" onClick={() => setMobileOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"><Menu className="h-5 w-5" /></button>
            <button type="button" onClick={() => setSidebarCollapsed((prev) => !prev)} className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:flex">{sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}</button>
            <button type="button" onClick={() => navigate('/')} className="flex min-w-0 items-center gap-3 rounded-[20px] border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-200">
                <img src={faithhubMark} alt="FaithHub" className="h-8 w-8" />
              </div>
              <div className="hidden min-w-0 sm:block"><div className="truncate text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div><div className="truncate text-base font-semibold text-slate-900">FaithHub</div></div>
            </button>
          </div>

          <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-500 shadow-sm xl:flex">
            <Search className="h-4 w-4 shrink-0 text-[#03cd8c]" />
            <span className="truncate">Search routed FaithHub pages</span>
            <span className="ml-auto rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">{pages.length} pages</span>
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
            <ColorModeToggle className="hidden xl:inline-flex" />
            <RoleSwitcher role={shellRole} onChange={(nextRole) => navigate(withAdminAccess(defaultPageForRole[nextRole], adminAllAccess || nextRole === "admin"))} />
            {adminAllAccess && routeRole !== "admin" ? (
              <button
                type="button"
                onClick={exitAdminView}
                className="hidden rounded-[18px] border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c] xl:inline-flex"
              >
                Exit admin view
              </button>
            ) : null}
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm"><Bell className="h-5 w-5" /></button>
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
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#03cd8c]">FaithHub Workspace</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">{currentPage?.label || "FaithHub"}</div>
                  <div className="mt-1 text-sm text-slate-600">{currentPage?.description || "Routed workspace"}</div>
                </div>
                <div className="flex min-w-0 flex-wrap gap-2">
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">
                    {adminAllAccess ? "ADMIN · ALL ACCESS" : routeRole.toUpperCase()}
                  </Badge>
                  {currentPage?.template ? <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">{currentPage.template}</Badge> : null}
                  <Badge className="max-w-full truncate rounded-full bg-[#f8fafc] text-slate-600 ring-1 ring-slate-200 hover:bg-[#f8fafc] sm:max-w-[24rem]">{location.pathname}</Badge>
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
    <div className="flex max-w-full flex-wrap items-center gap-1 rounded-[24px] border border-slate-200 bg-white p-1 shadow-sm">
      {roles.map((item) => {
        const active = role === item;
        return (
          <button type="button" key={item} onClick={() => onChange(item)} className={`rounded-[18px] px-2.5 py-2 text-sm font-semibold transition sm:px-3 ${active ? item === 'provider' ? 'bg-[#fff8ef] text-[#f77f00]' : item === 'admin' ? 'bg-slate-900 text-white' : 'bg-[#03cd8c] text-white' : 'text-slate-600 hover:bg-[#f8fafc]'}`}>
            {item === 'user' ? 'User' : item === 'provider' ? 'Provider' : 'Admin'}
          </button>
        );
      })}
    </div>
  );
}

function SidebarCard({ collapsed, role, grouped, currentPath, navigate }: any) {
  return (
    <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_-35px_rgba(15,23,42,0.35)]">
      <CardContent className="p-3">
        <div className="mb-3 rounded-[20px] border border-[#03cd8c]/20 bg-[#ecfff8] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">{role} workspace</div>
          {!collapsed ? <><div className="mt-2 text-xl font-semibold text-slate-900">{role === 'user' ? 'My Faith Space' : role === 'provider' ? 'Institution Workspace' : 'Global Control Tower'}</div><div className="mt-1 text-sm text-slate-600">{role === 'user' ? 'Discovery, Live Sessionz, events, giving' : role === 'provider' ? 'Builders, live ops, messaging, events, funds' : 'Verification, moderation, policy, security'}</div></> : null}
        </div>
        <div className="space-y-4">
          {Object.entries(grouped).map(([section, items]: any) => (
            <div key={section} className="space-y-2">
              {!collapsed ? <div className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{section}</div> : null}
              <div className="space-y-1">
                {items.map((item: any) => {
                  const Icon = item.icon;
                  const active = item.path === currentPath;
                  return (
                    <button type="button" key={item.id} onClick={() => navigate(item.path)} className={`group flex w-full items-center gap-3 rounded-[20px] border px-3 py-3 text-left transition ${active ? 'border-[#03cd8c]/25 bg-[#ecfff8]' : 'border-transparent bg-white hover:border-slate-200 hover:bg-[#f8fafc]'}`}>
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? 'bg-[#03cd8c] text-white' : 'bg-[#f8fafc] text-slate-600 ring-1 ring-slate-200'}`}><Icon className="h-5 w-5" /></div>
                      {!collapsed ? <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-slate-900">{item.label}</div><div className="truncate text-xs text-slate-500">{item.template} | {item.path}</div></div> : null}
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



