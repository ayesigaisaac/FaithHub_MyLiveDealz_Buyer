import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { defaultPageForRole } from "@/config/pageRegistry";
import { routes } from "@/constants/routes";
import type { Role } from "@/types/roles";

type ProtectedRouteProps = {
  roles?: Role[];
  children?: React.ReactNode;
};

export default function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { user, role, isAuthLoading } = useAuth();
  const storedUser = typeof window !== "undefined" ? window.localStorage.getItem("faithhub_user") : null;
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

  if (!user || !storedUser) {
    return (
      <Navigate
        to={routes.public.login}
        replace
        state={{
          reason: authNotice || "auth_required",
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
