import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { defaultPageForRole } from "@/config/pageRegistry";
import { routes } from "@/constants/routes";
import type { Role } from "@/types/roles";
import { addAuthAuditRecord } from "@/data/authAudit";
import { AUTH_NOTICE_REASONS, AUTH_STORAGE_KEYS, getRoleSessionStorageKey } from "@/constants/auth";
import { roleFromPath } from "@/auth/roleRouting";

type ProtectedRouteProps = {
  roles?: Role[];
  children?: React.ReactNode;
};

export default function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, role, currentRole, isAuthLoading } = useAuth();
  const requiredRole = roles?.[0] || roleFromPath(location.pathname) || currentRole;
  const roleSession =
    typeof window !== "undefined"
      ? window.localStorage.getItem(getRoleSessionStorageKey(requiredRole))
      : null;
  const authNotice =
    typeof window !== "undefined" ? window.sessionStorage.getItem(AUTH_STORAGE_KEYS.notice) : null;

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-5 text-sm text-[var(--text-secondary)]">
          Verifying your session...
        </div>
      </div>
    );
  }

  if (!user || !roleSession || user.role !== requiredRole) {
    addAuthAuditRecord({
      action: "AUTH_REDIRECT_REQUIRED",
      role: requiredRole,
      email: user?.email,
      detail: !user ? "Missing user session" : `Role mismatch or missing role session for ${requiredRole}`,
      route: location.pathname,
    });
    return (
      <Navigate
        to={routes.public.loginByRole(requiredRole)}
        replace
        state={{
          reason: authNotice || AUTH_NOTICE_REASONS.authRequired,
          requiredRole,
        }}
      />
    );
  }

  if (roles?.length && !roles.includes(role)) {
    return <Navigate to={defaultPageForRole[role]} replace />;
  }

  if (children) return <>{children}</>;
  return <Outlet />;
}
