import React, { useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEnterpriseAccess } from "@/app/providers/EnterpriseAccessContext";
import type { AppRole } from "@/types/enterprise";

type TenantScopeGuardProps = {
  redirectTo?: string;
  enforceForRoles?: AppRole[];
  children: React.ReactElement;
};

const defaultScopedRoles: AppRole[] = ["tenant_admin", "provider", "moderator", "ops"];

export default function TenantScopeGuard({
  redirectTo = "/access",
  enforceForRoles = defaultScopedRoles,
  children,
}: TenantScopeGuardProps) {
  const location = useLocation();
  const { role, tenantId, tenants, setTenantId } = useEnterpriseAccess();

  const requestedTenantId = useMemo(() => {
    const tenant = new URLSearchParams(location.search).get("tenant");
    if (!tenant) return null;
    return tenants.some((item) => item.id === tenant) ? tenant : null;
  }, [location.search, tenants]);

  useEffect(() => {
    if (requestedTenantId && requestedTenantId !== tenantId) {
      setTenantId(requestedTenantId);
    }
  }, [requestedTenantId, tenantId, setTenantId]);

  const effectiveTenantId = requestedTenantId || tenantId;
  const requiresTenant = role !== "super_admin" && enforceForRoles.includes(role);

  if (requiresTenant && !effectiveTenantId) {
    return <Navigate to={redirectTo} replace state={{ from: `${location.pathname}${location.search}` }} />;
  }

  return children;
}
