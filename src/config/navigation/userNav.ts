import {
  Bookmark,
  Home,
  MessageSquare,
  Settings2,
  Ticket,
  User,
  Bell,
} from "lucide-react";
import type { EnterpriseNavItem } from "@/types/enterprise";

export const userNav: EnterpriseNavItem[] = [
  {
    id: "u-home",
    label: "Home",
    route: "/app/user/home",
    icon: Home,
  },
  {
    id: "u-orders",
    label: "Orders",
    route: "/app/user/events/detail",
    icon: Ticket,
  },
  {
    id: "u-tickets",
    label: "Tickets",
    route: "/app/user/events",
    icon: Ticket,
  },
  {
    id: "u-saved",
    label: "Saved",
    route: "/app/user/series",
    icon: Bookmark,
  },
  {
    id: "u-messages",
    label: "Messages",
    route: "/app/user/live/chat",
    icon: MessageSquare,
  },
  {
    id: "u-notifications",
    label: "Notifications",
    route: "/app/user/profile",
    icon: Bell,
  },
  {
    id: "u-preferences",
    label: "Preferences",
    route: "/app/user/profile",
    icon: User,
  },
  {
    id: "u-settings",
    label: "Settings",
    route: "/app/user/settings",
    icon: Settings2,
  },
];
