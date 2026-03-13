import React, { useMemo } from "react";
import { Bell, Search } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEnterpriseAccess } from "@/app/providers/EnterpriseAccessContext";
import { navigationByRole } from "@/config/navigation";
import { defaultRouteByRole, hasPermission, roleDisplayName } from "@/config/permissions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AppRole } from "@/types/enterprise";

type EnterpriseLayoutProps = {
  role: AppRole;
  title: string;
  subtitle: string;
};

const roleOptions: AppRole[] = ["super_admin", "tenant_admin", "ops", "moderator", "provider", "user"];

function isActive(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export default function EnterpriseLayout({ role, title, subtitle }: EnterpriseLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role: sessionRole, roleLabel, setRole, tenantId, setTenantId, tenants, activeTenant } = useEnterpriseAccess();

  const navItems = useMemo(
    () => navigationByRole[role].filter((item) => !item.permission || hasPermission(sessionRole, item.permission)),
    [role, sessionRole],
  );

  const tenantSwitchEnabled = role !== "user" && role !== "super_admin";

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-3 px-3 py-3 sm:px-4 lg:px-5">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                {roleDisplayName[role]} Scope
              </Badge>
              <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Active role: {roleLabel}</Badge>
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">{title}</div>
            <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
            <label className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Role
              <select
                aria-label="Select enterprise role"
                value={sessionRole}
                onChange={(event) => {
                  const nextRole = event.target.value as AppRole;
                  setRole(nextRole);
                  navigate(defaultRouteByRole[nextRole]);
                }}
                className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium tracking-normal text-slate-700"
              >
                {roleOptions.map((item) => (
                  <option key={item} value={item}>
                    {roleDisplayName[item]}
                  </option>
                ))}
              </select>
            </label>

            {tenantSwitchEnabled ? (
              <label className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Tenant
                <select
                  aria-label="Select tenant"
                  value={tenantId || ""}
                  onChange={(event) => setTenantId(event.target.value || null)}
                  className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm font-medium tracking-normal text-slate-700"
                >
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <button
              type="button"
              aria-label="Open notifications"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1800px] gap-5 px-3 pb-10 pt-4 sm:px-4 lg:px-5">
        <aside className="hidden w-[310px] lg:block">
          <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_-35px_rgba(15,23,42,0.35)]">
            <CardContent className="p-3">
              <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Workspace</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{activeTenant ? activeTenant.name : "Platform scope"}</div>
                <div className="mt-1 text-xs text-slate-500">
                  {activeTenant ? `${activeTenant.region} • ${activeTenant.plan}` : "Global cross-tenant visibility"}
                </div>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(location.pathname, item.route);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      aria-current={active ? "page" : undefined}
                      onClick={() => navigate(item.route)}
                      className={`group flex w-full items-center gap-3 rounded-[18px] border px-3 py-3 text-left transition ${
                        active
                          ? "border-emerald-100 bg-emerald-50"
                          : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                          active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-50 text-slate-500 ring-1 ring-slate-200 group-hover:bg-white"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`truncate text-sm ${active ? "font-semibold text-emerald-800" : "font-medium text-slate-900"}`}>
                          {item.label}
                        </div>
                        <div className="truncate text-xs text-slate-500">{item.route}</div>
                      </div>
                      {item.badge ? (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase text-slate-600">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="min-w-0 flex-1">
          <Card className="mb-5 rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Global Command Search</div>
                  <div className="mt-1 text-sm text-slate-600">Search pages, tenants, providers, users, incidents, and routes.</div>
                </div>
                <label className="flex min-h-[44px] min-w-[240px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-500">
                  <Search className="h-4 w-4" />
                  <input
                    type="search"
                    aria-label="Search"
                    placeholder="Search everything"
                    className="w-full border-0 bg-transparent outline-none placeholder:text-slate-400"
                  />
                </label>
              </div>
            </CardContent>
          </Card>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
