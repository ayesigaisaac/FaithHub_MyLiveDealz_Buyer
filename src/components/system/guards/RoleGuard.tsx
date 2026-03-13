import React, { useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEnterpriseAccess } from "@/app/providers/EnterpriseAccessContext";
import { isAppRole } from "@/config/permissions";
import type { AppRole } from "@/types/enterprise";

type RoleGuardProps = {
  allowedRoles: AppRole[];
  redirectTo?: string;
  children: React.ReactElement;
};

export default function RoleGuard({
  allowedRoles,
  redirectTo = "/access",
  children,
}: RoleGuardProps) {
  const location = useLocation();
  const { role, setRole } = useEnterpriseAccess();

  const requestedRole = useMemo(() => {
    const queryRole = new URLSearchParams(location.search).get("as");
    return queryRole && isAppRole(queryRole) ? queryRole : null;
  }, [location.search]);

  useEffect(() => {
    if (requestedRole && requestedRole !== role) {
      setRole(requestedRole, { preserveTenant: true });
    }
  }, [requestedRole, role, setRole]);

  const effectiveRole = requestedRole || role;
  const isAllowed = effectiveRole === "super_admin" || allowedRoles.includes(effectiveRole);

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace state={{ from: `${location.pathname}${location.search}` }} />;
  }

  return children;
}
