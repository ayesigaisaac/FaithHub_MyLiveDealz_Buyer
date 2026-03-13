import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isAppRole, roleDisplayName } from "@/config/permissions";
import type { AppRole, TenantSummary } from "@/types/enterprise";

type PersistedAccessState = {
  role: AppRole;
  tenantId: string | null;
};

type EnterpriseAccessContextValue = {
  role: AppRole;
  roleLabel: string;
  setRole: (role: AppRole, options?: { preserveTenant?: boolean }) => void;
  tenantId: string | null;
  setTenantId: (tenantId: string | null) => void;
  tenants: TenantSummary[];
  activeTenant: TenantSummary | null;
};

const STORAGE_KEY = "faithhub-enterprise-access";

const demoTenants: TenantSummary[] = [
  {
    id: "tenant-faithway",
    name: "FaithWay Cathedral",
    slug: "faithway-cathedral",
    region: "East Africa",
    plan: "enterprise",
    status: "active",
  },
  {
    id: "tenant-grace-hub",
    name: "Grace Hub Ministries",
    slug: "grace-hub-ministries",
    region: "North America",
    plan: "growth",
    status: "active",
  },
  {
    id: "tenant-hope-network",
    name: "Hope Network Events",
    slug: "hope-network-events",
    region: "Europe",
    plan: "starter",
    status: "trial",
  },
];

const EnterpriseAccessContext = createContext<EnterpriseAccessContextValue | undefined>(undefined);

function getFallbackTenantId() {
  return demoTenants[0]?.id || null;
}

function parseQueryState(): Partial<PersistedAccessState> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const as = params.get("as");
  const tenant = params.get("tenant");
  const next: Partial<PersistedAccessState> = {};
  if (as && isAppRole(as)) next.role = as;
  if (tenant && demoTenants.some((item) => item.id === tenant)) next.tenantId = tenant;
  return next;
}

function getInitialState(): PersistedAccessState {
  const fromQuery = parseQueryState();
  let role: AppRole = fromQuery.role || "user";
  let tenantId: string | null = fromQuery.tenantId ?? (role === "user" ? null : getFallbackTenantId());

  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedAccessState;
        if (!fromQuery.role && parsed?.role && isAppRole(parsed.role)) {
          role = parsed.role;
        }
        if (!fromQuery.tenantId && parsed?.tenantId && demoTenants.some((item) => item.id === parsed.tenantId)) {
          tenantId = parsed.tenantId;
        }
      }
    } catch {
      // Ignore storage parsing failures.
    }
  }

  if (role !== "user" && !tenantId) tenantId = getFallbackTenantId();
  return { role, tenantId };
}

export function EnterpriseAccessProvider({ children }: { children: React.ReactNode }) {
  const initialState = useMemo(() => getInitialState(), []);
  const [role, setRoleState] = useState<AppRole>(initialState.role);
  const [tenantId, setTenantIdState] = useState<string | null>(initialState.tenantId);

  const setTenantId = useCallback((nextTenantId: string | null) => {
    if (!nextTenantId) {
      setTenantIdState(null);
      return;
    }
    setTenantIdState(demoTenants.some((tenant) => tenant.id === nextTenantId) ? nextTenantId : getFallbackTenantId());
  }, []);

  const setRole = useCallback((nextRole: AppRole, options?: { preserveTenant?: boolean }) => {
    setRoleState(nextRole);
    if (nextRole === "user") {
      setTenantIdState(null);
      return;
    }
    setTenantIdState((currentTenantId) => {
      if (options?.preserveTenant && currentTenantId) return currentTenantId;
      if (currentTenantId && demoTenants.some((tenant) => tenant.id === currentTenantId)) return currentTenantId;
      return getFallbackTenantId();
    });
  }, []);

  const activeTenant = useMemo(
    () => (tenantId ? demoTenants.find((tenant) => tenant.id === tenantId) || null : null),
    [tenantId],
  );

  const value = useMemo(
    () => ({
      role,
      roleLabel: roleDisplayName[role],
      setRole,
      tenantId,
      setTenantId,
      tenants: demoTenants,
      activeTenant,
    }),
    [role, setRole, tenantId, setTenantId, activeTenant],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ role, tenantId }));
    } catch {
      // Ignore storage write failures.
    }
  }, [role, tenantId]);

  return <EnterpriseAccessContext.Provider value={value}>{children}</EnterpriseAccessContext.Provider>;
}

export function useEnterpriseAccess() {
  const context = useContext(EnterpriseAccessContext);
  if (!context) {
    return {
      role: "user" as AppRole,
      roleLabel: roleDisplayName.user,
      setRole: () => {},
      tenantId: null,
      setTenantId: () => {},
      tenants: demoTenants,
      activeTenant: null,
    };
  }
  return context;
}
