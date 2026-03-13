import type { ComponentType } from "react";

export type AppRole =
  | "super_admin"
  | "tenant_admin"
  | "provider"
  | "user"
  | "moderator"
  | "ops";

export type Permission =
  | "view_platform_analytics"
  | "manage_tenants"
  | "manage_users"
  | "manage_providers"
  | "manage_orders"
  | "manage_catalog"
  | "manage_incidents"
  | "manage_verification"
  | "view_billing"
  | "manage_settings"
  | "manage_events"
  | "manage_live_sessions"
  | "manage_moderation"
  | "view_audit_logs"
  | "manage_feature_flags"
  | "manage_branding"
  | "manage_notifications";

export interface EnterpriseNavItem {
  id: string;
  label: string;
  route: string;
  icon: ComponentType<{ className?: string }>;
  description?: string;
  permission?: Permission;
  badge?: string;
  children?: EnterpriseNavItem[];
}

export interface TenantSummary {
  id: string;
  name: string;
  slug: string;
  region: string;
  plan: "starter" | "growth" | "enterprise";
  status: "active" | "trial" | "suspended";
}
