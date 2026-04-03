import React, { useMemo } from "react";
import { CheckCircle2, ExternalLink, RefreshCw, Route, ShieldCheck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pagesByRole } from "@/config/pageRegistry";
import { routes } from "@/constants/routes";

const roleHomeRoute = {
  user: routes.app.user.home,
  provider: routes.app.provider.dashboard,
  admin: routes.app.admin.overview,
} as const;

const roleCoreChecks = {
  user: [routes.app.user.home, routes.app.user.community, routes.app.user.giving, routes.app.user.wallet],
  provider: [
    routes.app.provider.dashboard,
    routes.app.provider.events,
    routes.app.provider.funds,
    routes.app.provider.wallet,
  ],
  admin: [routes.app.admin.overview, routes.app.admin.policy, routes.app.admin.security, routes.app.admin.finance],
} as const;

export default function FaithHubQaCenter() {
  const navigate = useNavigate();
  const { role, switchRole } = useAuth();

  const rolePages = pagesByRole[role] || [];
  const allRoutesCount = useMemo(
    () => Object.values(pagesByRole).reduce((sum, entries) => sum + entries.length, 0),
    [],
  );

  const coreChecks = roleCoreChecks[role];

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">QA Center</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Frontend Route & Interaction Checks
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Validate role switching, route accessibility, and critical button paths without leaving the app shell.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">{role.toUpperCase()} role active</Badge>
                <Badge className="fh-pill fh-pill-slate">{rolePages.length} routes for this role</Badge>
                <Badge className="fh-pill fh-pill-slate">{allRoutesCount} total registered routes</Badge>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <Button
                className="fh-user-primary-btn"
                onClick={() => {
                  switchRole("user");
                  navigate(roleHomeRoute.user);
                }}
              >
                <UserRound className="h-4 w-4" />
                User
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => {
                  switchRole("provider");
                  navigate(roleHomeRoute.provider);
                }}
              >
                <ShieldCheck className="h-4 w-4" />
                Provider
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => {
                  switchRole("admin");
                  navigate(roleHomeRoute.admin);
                }}
              >
                <Route className="h-4 w-4" />
                Admin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="mb-3 text-base font-semibold text-[var(--text-primary)]">Critical route checks</div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {coreChecks.map((path) => (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-3 text-left transition hover:bg-[var(--surface)]"
              >
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Expected: reachable
                </div>
                <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{path}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="mb-3 text-base font-semibold text-[var(--text-primary)]">Current role route inventory</div>
          <div className="space-y-2">
            {rolePages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => navigate(page.path)}
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left transition hover:bg-[var(--surface)]"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[var(--text-primary)]">{page.label}</div>
                  <div className="truncate text-xs text-[var(--text-secondary)]">{page.path}</div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <RefreshCw className="h-4 w-4 text-[var(--accent)]" />
            Manual QA checklist
          </div>
          <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
            <li>1. Switch role and verify sidebar items update immediately.</li>
            <li>2. Navigate to 3-4 routes and confirm no double header/sidebar appears.</li>
            <li>3. Test top search keyboard flow: ArrowUp/ArrowDown/Enter.</li>
            <li>4. Validate wallet and giving actions update balances in-place.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

