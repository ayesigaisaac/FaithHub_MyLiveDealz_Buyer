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
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to={routes.public.access} replace />;
  }

  if (roles?.length && !roles.includes(role)) {
    return <Navigate to={defaultPageForRole[role]} replace />;
  }

  if (children) return <>{children}</>;
  return <Outlet />;
}
