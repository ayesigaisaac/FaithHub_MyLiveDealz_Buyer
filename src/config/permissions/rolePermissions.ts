import type { AppRole, Permission } from "@/types/enterprise";

const ROLE_SET = new Set<AppRole>([
  "super_admin",
  "tenant_admin",
  "provider",
  "user",
  "moderator",
  "ops",
]);

export const roleHierarchy: Record<AppRole, number> = {
  user: 10,
  provider: 20,
  moderator: 30,
  ops: 40,
  tenant_admin: 50,
  super_admin: 60,
};

export const roleDisplayName: Record<AppRole, string> = {
  super_admin: "Super Admin",
  tenant_admin: "Tenant Admin",
  provider: "Provider",
  user: "User",
  moderator: "Moderator",
  ops: "Ops",
};

export const defaultRouteByRole: Record<AppRole, string> = {
  super_admin: "/super-admin/overview",
  tenant_admin: "/tenant-admin/overview",
  provider: "/app/provider/dashboard",
  user: "/app/user/home",
  moderator: "/ops/incidents",
  ops: "/ops/incidents",
};

export const rolePermissions: Record<AppRole, Permission[]> = {
  super_admin: [
    "view_platform_analytics",
    "manage_tenants",
    "manage_users",
    "manage_providers",
    "manage_orders",
    "manage_catalog",
    "manage_incidents",
    "manage_verification",
    "view_billing",
    "manage_settings",
    "manage_events",
    "manage_live_sessions",
    "manage_moderation",
    "view_audit_logs",
    "manage_feature_flags",
    "manage_branding",
    "manage_notifications",
  ],
  tenant_admin: [
    "manage_users",
    "manage_providers",
    "manage_orders",
    "manage_events",
    "manage_live_sessions",
    "manage_moderation",
    "view_platform_analytics",
    "manage_branding",
    "manage_notifications",
    "manage_settings",
  ],
  provider: [
    "manage_catalog",
    "manage_orders",
    "manage_events",
    "manage_live_sessions",
    "manage_notifications",
    "view_platform_analytics",
  ],
  user: [],
  moderator: ["manage_incidents", "manage_verification", "manage_moderation", "view_audit_logs"],
  ops: ["manage_incidents", "manage_verification", "manage_moderation", "view_platform_analytics", "view_audit_logs"],
};

export function isAppRole(value: string): value is AppRole {
  return ROLE_SET.has(value as AppRole);
}

export function canAssumeRole(actor: AppRole, target: AppRole) {
  return roleHierarchy[actor] >= roleHierarchy[target];
}

export function hasPermission(role: AppRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function hasAllPermissions(role: AppRole, permissions: Permission[]) {
  return permissions.every((permission) => hasPermission(role, permission));
}

export function hasAnyPermission(role: AppRole, permissions: Permission[]) {
  return permissions.some((permission) => hasPermission(role, permission));
}
