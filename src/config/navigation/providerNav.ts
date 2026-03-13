import {
  ChartColumnBig,
  CircleDollarSign,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings2,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import type { EnterpriseNavItem } from "@/types/enterprise";

export const providerNav: EnterpriseNavItem[] = [
  {
    id: "p-overview",
    label: "Overview",
    route: "/app/provider/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "p-products",
    label: "Products",
    route: "/app/provider/series-builder",
    icon: Package,
    permission: "manage_catalog",
  },
  {
    id: "p-services",
    label: "Services",
    route: "/app/provider/episode-builder",
    icon: ShoppingBag,
    permission: "manage_catalog",
  },
  {
    id: "p-orders",
    label: "Orders",
    route: "/app/provider/events",
    icon: Ticket,
    permission: "manage_orders",
  },
  {
    id: "p-booths",
    label: "Booths",
    route: "/app/provider/live-builder",
    icon: ShoppingBag,
  },
  {
    id: "p-payouts",
    label: "Payouts",
    route: "/app/provider/funds",
    icon: CircleDollarSign,
    permission: "manage_orders",
  },
  {
    id: "p-messages",
    label: "Messages",
    route: "/app/provider/notifications",
    icon: MessageSquare,
    permission: "manage_notifications",
  },
  {
    id: "p-analytics",
    label: "Analytics",
    route: "/app/provider/live-ops",
    icon: ChartColumnBig,
    permission: "view_platform_analytics",
  },
  {
    id: "p-settings",
    label: "Settings",
    route: "/app/provider/onboarding",
    icon: Settings2,
    permission: "manage_settings",
  },
];
