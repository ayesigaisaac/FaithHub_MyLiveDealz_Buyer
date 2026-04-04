import React, { useMemo, useState } from "react";
import { Clock3, Filter, LogOut, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthAuditRecords, clearAuthAuditRecords, type AuthAuditAction } from "@/data/authAudit";
import { useAuth } from "@/auth/AuthContext";

const actionOptions: Array<{ label: string; value: AuthAuditAction | "ALL" }> = [
  { label: "All actions", value: "ALL" },
  { label: "Login", value: "LOGIN_SUCCESS" },
  { label: "Social login", value: "LOGIN_SOCIAL" },
  { label: "Role switch", value: "ROLE_SWITCH_REQUESTED" },
  { label: "Auth redirect", value: "AUTH_REDIRECT_REQUIRED" },
  { label: "Session expired", value: "SESSION_EXPIRED" },
  { label: "Logout role", value: "LOGOUT_ROLE" },
  { label: "Logout all", value: "LOGOUT_ALL_ROLES" },
];

function prettyAction(action: AuthAuditAction) {
  return action
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function FaithHubAuthAuditLog() {
  const { role } = useAuth();
  const [filter, setFilter] = useState<AuthAuditAction | "ALL">("ALL");
  const [nonce, setNonce] = useState(0);

  const entries = useMemo(() => {
    const source = getAuthAuditRecords();
    if (filter === "ALL") return source;
    return source.filter((item) => item.action === filter);
  }, [filter, nonce]);

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Authentication</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Auth Audit Log</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Review sign-ins, role switch attempts, redirects, and session lifecycle events across the workspace.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">{role.toUpperCase()} workspace</Badge>
                <Badge className="fh-pill fh-pill-slate">{entries.length} records</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-secondary)]">
                <Filter className="h-4 w-4" />
                <select
                  value={filter}
                  onChange={(event) => setFilter(event.target.value as AuthAuditAction | "ALL")}
                  className="bg-transparent text-sm font-medium text-[var(--text-primary)] outline-none"
                >
                  {actionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <Button
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => setNonce((prev) => prev + 1)}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn text-rose-500"
                onClick={() => {
                  clearAuthAuditRecords();
                  setNonce((prev) => prev + 1);
                }}
              >
                <Trash2 className="h-4 w-4" />
                Clear log
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          {entries.length ? (
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-3 transition hover:bg-[var(--surface)]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="fh-pill fh-pill-slate">{prettyAction(entry.action)}</Badge>
                    <Badge className="fh-pill fh-pill-emerald">{entry.role}</Badge>
                    {entry.email ? <Badge className="fh-pill fh-pill-slate">{entry.email}</Badge> : null}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)]">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {new Date(entry.createdAt).toLocaleString()}
                    </span>
                    {entry.route ? (
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {entry.route}
                      </span>
                    ) : null}
                    {entry.detail ? (
                      <span className="inline-flex items-center gap-1">
                        <LogOut className="h-3.5 w-3.5" />
                        {entry.detail}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] px-4 py-8 text-center">
              <div className="text-base font-semibold text-[var(--text-primary)]">No auth audit records yet</div>
              <div className="mt-1 text-sm text-[var(--text-secondary)]">
                Sign-ins, redirects, and role switch events will appear here.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

