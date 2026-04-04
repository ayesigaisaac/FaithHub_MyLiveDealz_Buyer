import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { defaultPageForRole } from "@/config/pageRegistry";
import { routes } from "@/constants/routes";
import type { Role } from "@/types/roles";

type ProtectedRouteProps = {
  roles?: Role[];
  children?: React.ReactNode;
};

function roleFromPath(pathname: string): Role | null {
  if (pathname.startsWith("/app/admin") || pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/app/provider") || pathname.startsWith("/provider")) return "provider";
  if (pathname.startsWith("/app/user") || pathname.startsWith("/user") || pathname === "/home") return "user";
  return null;
}

export default function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, role, currentRole, isAuthLoading } = useAuth();
  const requiredRole = roles?.[0] || roleFromPath(location.pathname) || currentRole;
  const roleSession =
    typeof window !== "undefined"
      ? window.localStorage.getItem(`faithhub_session_${requiredRole}`)
      : null;
  const authNotice =
    typeof window !== "undefined" ? window.sessionStorage.getItem("faithhub_auth_notice") : null;

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
    return (
      <Navigate
        to={routes.public.loginByRole(requiredRole)}
        replace
        state={{
          reason: authNotice || "auth_required",
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
