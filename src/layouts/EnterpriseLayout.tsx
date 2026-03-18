import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  Menu,
  Search,
  ShieldAlert,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEnterpriseAccess } from "@/app/providers/EnterpriseAccessContext";
import { navigationByRole } from "@/config/navigation";
import { defaultRouteByRole, hasPermission, roleDisplayName } from "@/config/permissions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ColorModeToggle } from "@/theme/color-mode-toggle";
import type { AppRole } from "@/types/enterprise";

type EnterpriseLayoutProps = {
  role: AppRole;
  title: string;
  subtitle: string;
};

type StatusMetric = {
  id: string;
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone: "emerald" | "orange" | "slate";
};

const roleOptions: AppRole[] = ["super_admin", "tenant_admin", "ops", "moderator", "provider", "user"];

function isActive(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export default function EnterpriseLayout({ role, title, subtitle }: EnterpriseLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const { role: sessionRole, roleLabel, setRole, tenantId, setTenantId, tenants, activeTenant } =
    useEnterpriseAccess();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");

  const navItems = useMemo(
    () =>
      navigationByRole[role].filter((item) => !item.permission || hasPermission(sessionRole, item.permission)),
    [role, sessionRole],
  );

  const filteredNavItems = useMemo(() => {
    const normalized = navQuery.trim().toLowerCase();
    if (!normalized) return navItems;

    return navItems.filter((item) =>
      `${item.label} ${item.description || ""} ${item.route}`.toLowerCase().includes(normalized),
    );
  }, [navItems, navQuery]);

  const tenantSwitchEnabled = role !== "user" && role !== "super_admin";

  const statusMetrics: StatusMetric[] = useMemo(
    () => [
      {
        id: "modules",
        label: "Modules",
        value: String(filteredNavItems.length),
        hint: "Visible for this role scope",
        icon: Sparkles,
        tone: "emerald",
      },
      {
        id: "scope",
        label: "Scope",
        value: roleDisplayName[role],
        hint: `Active role: ${roleLabel}`,
        icon: ShieldAlert,
        tone: "slate",
      },
      {
        id: "tenant",
        label: "Tenant",
        value: activeTenant?.name || "Platform-wide",
        hint: activeTenant ? `${activeTenant.region} · ${activeTenant.plan}` : "Cross-tenant visibility",
        icon: Bell,
        tone: "orange",
      },
    ],
    [activeTenant, filteredNavItems.length, role, roleLabel],
  );

  const handleNavigate = (routePath: string) => {
    navigate(routePath);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="fh-shell-topbar sticky top-0 z-30 border-b border-[var(--border)] shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur">
        <div className="mx-auto max-w-[1860px] px-3 py-3 sm:px-4 lg:px-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="fh-pill fh-pill-emerald hover:bg-emerald-50">
                  {roleDisplayName[role]} scope
                </Badge>
                <Badge className="fh-pill fh-pill-slate hover:bg-slate-100">
                  Active role: {roleLabel}
                </Badge>
              </div>

              <div className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{title}</div>
              <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((prev) => !prev)}
                className="fh-shell-control inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 lg:hidden"
              >
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <button
                type="button"
                aria-label="Open notifications"
                className="fh-shell-control relative inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
              </button>
            </div>
          </div>

          <div className="mt-3 hidden flex-wrap items-center gap-2 lg:flex">
            <label className="fh-shell-control flex min-h-[44px] min-w-[280px] flex-1 items-center gap-2 rounded-2xl px-3 text-sm text-slate-500">
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="search"
                value={navQuery}
                onChange={(event) => setNavQuery(event.target.value)}
                placeholder="Search modules"
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            <label className="fh-shell-control rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Role
              <select
                aria-label="Select enterprise role"
                value={sessionRole}
                onChange={(event) => {
                  const nextRole = event.target.value as AppRole;
                  setRole(nextRole);
                  navigate(defaultRouteByRole[nextRole]);
                }}
                className="ml-2 rounded-lg border border-[var(--border)] bg-[color:var(--card)] px-2 py-1 text-sm font-medium tracking-normal text-slate-700"
              >
                {roleOptions.map((item) => (
                  <option key={item} value={item}>
                    {roleDisplayName[item]}
                  </option>
                ))}
              </select>
            </label>

            {tenantSwitchEnabled ? (
              <label className="fh-shell-control rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Tenant
                <select
                  aria-label="Select tenant"
                  value={tenantId || ""}
                  onChange={(event) => setTenantId(event.target.value || null)}
                  className="ml-2 rounded-lg border border-[var(--border)] bg-[color:var(--card)] px-2 py-1 text-sm font-medium tracking-normal text-slate-700"
                >
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <ColorModeToggle className="h-11 w-11 rounded-2xl" />
          </div>

          {mobileNavOpen ? (
            <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4 lg:hidden">
              <label className="fh-shell-control flex min-h-[42px] items-center gap-2 rounded-xl px-3 text-sm text-slate-500">
                <Search className="h-4 w-4 shrink-0" />
                <input
                  type="search"
                  value={navQuery}
                  onChange={(event) => setNavQuery(event.target.value)}
                  placeholder="Search modules"
                  className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="rounded-xl border border-[var(--border)] bg-[color:var(--card)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Role
                  <select
                    aria-label="Select enterprise role"
                    value={sessionRole}
                    onChange={(event) => {
                      const nextRole = event.target.value as AppRole;
                      setRole(nextRole);
                      setMobileNavOpen(false);
                      navigate(defaultRouteByRole[nextRole]);
                    }}
                    className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm font-medium tracking-normal text-slate-700"
                  >
                    {roleOptions.map((item) => (
                      <option key={item} value={item}>
                        {roleDisplayName[item]}
                      </option>
                    ))}
                  </select>
                </label>

                {tenantSwitchEnabled ? (
                  <label className="rounded-xl border border-[var(--border)] bg-[color:var(--card)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Tenant
                    <select
                      aria-label="Select tenant"
                      value={tenantId || ""}
                      onChange={(event) => setTenantId(event.target.value || null)}
                      className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm font-medium tracking-normal text-slate-700"
                    >
                      {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </div>

              <Card className="fh-panel-card overflow-hidden rounded-2xl">
                <CardContent className="p-2">
                  {filteredNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(location.pathname, item.route);

                    return (
                      <button
                        type="button"
                        key={item.id}
                        aria-current={active ? "page" : undefined}
                        onClick={() => handleNavigate(item.route)}
                        className={`mb-1 flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition last:mb-0 ${
                          active
                            ? "border-emerald-100 bg-emerald-50"
                            : "border-transparent bg-transparent hover:-translate-y-[1px] hover:border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className={`truncate text-sm ${active ? "font-semibold text-emerald-800" : "font-medium text-slate-800"}`}>
                            {item.label}
                          </div>
                          <div className="truncate text-xs text-slate-500">{item.route}</div>
                        </div>

                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1860px] gap-4 px-3 pb-10 pt-4 sm:px-4 lg:px-5">
        <aside className="hidden w-[310px] shrink-0 lg:block">
          <Card className="fh-panel-card overflow-hidden rounded-[26px]">
            <CardContent className="p-3">
              <div className="fh-hero-card rounded-2xl p-4">
                <div className="fh-label text-emerald-700">Workspace</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {activeTenant ? activeTenant.name : "Platform scope"}
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  {activeTenant ? `${activeTenant.region} · ${activeTenant.plan}` : "Global cross-tenant visibility"}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(location.pathname, item.route);

                  return (
                    <button
                      type="button"
                      key={item.id}
                      aria-current={active ? "page" : undefined}
                      onClick={() => navigate(item.route)}
                      className={`group flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
                        active
                          ? "border-emerald-100 bg-emerald-50"
                          : "border-transparent bg-transparent hover:-translate-y-[1px] hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500 group-hover:bg-white"
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

        <main className="min-w-0 flex-1 space-y-4">
          <Card className="fh-hero-card rounded-[26px]">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <div className="fh-eyebrow text-[#03cd8c]">Enterprise Command Surface</div>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]">{title}</h1>
                  <p className="mt-2 max-w-3xl text-sm text-slate-600">{subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {filteredNavItems.slice(0, 2).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(item.route)}
                      className="inline-flex min-h-[42px] items-center rounded-xl bg-[#ecfff8] px-4 text-sm font-semibold text-[#049e6d] transition hover:-translate-y-[1px] hover:bg-[#ddf9ef]"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {statusMetrics.map((metric) => (
              <EnterpriseMetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}

function EnterpriseMetricCard({ metric }: { metric: StatusMetric }) {
  return (
    <Card className="fh-panel-card rounded-2xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{metric.label}</div>
          <div
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
              metric.tone === "orange"
                ? "bg-[#fff3e8] text-[#cc6500]"
                : metric.tone === "slate"
                  ? "bg-slate-100 text-slate-600"
                  : "bg-[#ecfff8] text-[#049e6d]"
            }`}
          >
            <metric.icon className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-2 text-2xl font-bold leading-none text-slate-900">{metric.value}</div>
        <div className="mt-1 text-xs text-slate-500">{metric.hint}</div>
      </CardContent>
    </Card>
  );
}

