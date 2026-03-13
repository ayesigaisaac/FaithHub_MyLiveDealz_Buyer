import {
  Brush,
  CalendarDays,
  ChartColumnBig,
  LayoutDashboard,
  MessageSquareWarning,
  MonitorPlay,
  Settings2,
  ShoppingBag,
  Users,
} from "lucide-react";
import type { EnterpriseNavItem } from "@/types/enterprise";

export const tenantAdminNav: EnterpriseNavItem[] = [
  {
    id: "ta-overview",
    label: "Overview",
    route: "/tenant-admin/overview",
    icon: LayoutDashboard,
    permission: "view_platform_analytics",
  },
  {
    id: "ta-members",
    label: "Members",
    route: "/tenant-admin/members",
    icon: Users,
    permission: "manage_users",
  },
  {
    id: "ta-events",
    label: "Events",
    route: "/tenant-admin/events",
    icon: CalendarDays,
    permission: "manage_events",
  },
  {
    id: "ta-live-sessions",
    label: "Live Sessions",
    route: "/tenant-admin/live-sessions",
    icon: MonitorPlay,
    permission: "manage_live_sessions",
  },
  {
    id: "ta-marketplace",
    label: "Marketplace",
    route: "/tenant-admin/marketplace",
    icon: ShoppingBag,
    permission: "manage_providers",
  },
  {
    id: "ta-moderation",
    label: "Moderation",
    route: "/tenant-admin/moderation",
    icon: MessageSquareWarning,
    permission: "manage_moderation",
  },
  {
    id: "ta-analytics",
    label: "Analytics",
    route: "/tenant-admin/analytics",
    icon: ChartColumnBig,
    permission: "view_platform_analytics",
  },
  {
    id: "ta-branding",
    label: "Branding",
    route: "/tenant-admin/branding",
    icon: Brush,
    permission: "manage_branding",
  },
  {
    id: "ta-settings",
    label: "Settings",
    route: "/tenant-admin/settings",
    icon: Settings2,
    permission: "manage_settings",
  },
];
