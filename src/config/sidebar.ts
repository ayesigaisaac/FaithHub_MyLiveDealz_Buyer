import { BarChart3, BookOpen, CalendarDays, type LucideIcon, LayoutDashboard, Radio, ShieldCheck, Users, Wallet } from "lucide-react";
import { routes } from "@/constants/routes";
import type { RoleKey } from "@/config/pageRegistry";

export interface SidebarItem {
  id: string;
  label: string;
  title: string;
  path: string;
  icon: LucideIcon;
  activePrefixes: string[];
}

export interface SidebarSection {
  id: string;
  label: string;
  collapsible?: boolean;
  items: SidebarItem[];
}

type SidebarItemTemplate = {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  activePrefixes?: string[];
};

type SidebarSectionTemplate = {
  id: string;
  label: string;
  items: SidebarItemTemplate[];
};

const sidebarSectionsByRole: Record<RoleKey, SidebarSectionTemplate[]> = {
  user: [
    {
      id: "user-core",
      label: "Core",
      items: [
        {
          id: "user-home",
          label: "Home",
          path: routes.app.user.home,
          icon: LayoutDashboard,
          activePrefixes: [routes.app.user.home, routes.app.user.entry, routes.app.user.auth, routes.app.user.profile],
        },
        {
          id: "user-series",
          label: "Series",
          path: routes.app.user.series,
          icon: BookOpen,
          activePrefixes: [routes.app.user.series, routes.app.user.episode, routes.app.user.replay, routes.app.user.clips],
        },
        {
          id: "user-live",
          label: "Live",
          path: routes.app.user.liveHub,
          icon: Radio,
          activePrefixes: ["/app/user/live"],
        },
        {
          id: "user-community",
          label: "Community",
          path: routes.app.user.discover,
          icon: Users,
          activePrefixes: [routes.app.user.discover, routes.app.user.institution, routes.app.user.events, routes.app.user.reviews],
        },
      ],
    },
  ],
  provider: [
    {
      id: "provider-core",
      label: "Provider",
      items: [
        {
          id: "provider-content",
          label: "Content",
          path: routes.app.provider.seriesBuilder,
          icon: BookOpen,
          activePrefixes: [routes.app.provider.seriesBuilder, routes.app.provider.episodeBuilder, routes.app.provider.postLive],
        },
        {
          id: "provider-analytics",
          label: "Analytics",
          path: routes.app.provider.dashboard,
          icon: BarChart3,
          activePrefixes: [routes.app.provider.dashboard, routes.app.provider.funds, routes.app.provider.liveOps],
        },
        {
          id: "provider-events",
          label: "Events",
          path: routes.app.provider.events,
          icon: CalendarDays,
          activePrefixes: [routes.app.provider.events, routes.app.provider.liveSchedule, routes.app.provider.liveStudio],
        },
        {
          id: "provider-audience",
          label: "Audience",
          path: routes.app.provider.contacts,
          icon: Users,
          activePrefixes: [routes.app.provider.contacts, routes.app.provider.notifications, routes.app.provider.reviewsModeration],
        },
      ],
    },
  ],
  admin: [
    {
      id: "admin-core",
      label: "Administration",
      items: [
        {
          id: "admin-overview",
          label: "Overview",
          path: routes.app.admin.overview,
          icon: LayoutDashboard,
          activePrefixes: [routes.app.admin.overview, routes.app.admin.channels, routes.app.admin.liveModeration],
        },
        {
          id: "admin-policy",
          label: "Policy",
          path: routes.app.admin.policy,
          icon: ShieldCheck,
          activePrefixes: [routes.app.admin.policy, routes.app.admin.verification],
        },
        {
          id: "admin-security",
          label: "Security",
          path: routes.app.admin.security,
          icon: ShieldCheck,
          activePrefixes: [routes.app.admin.security],
        },
        {
          id: "admin-finance",
          label: "Finance",
          path: routes.app.admin.finance,
          icon: Wallet,
          activePrefixes: [routes.app.admin.finance],
        },
      ],
    },
  ],
};

export function buildUnifiedSidebarSections({
  role,
  query = "",
}: {
  role: RoleKey;
  query?: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const sourceSections = sidebarSectionsByRole[role] || [];

  return sourceSections
    .map<SidebarSection>((section) => {
      const items = section.items
        .map<SidebarItem>((item) => ({
          id: item.id,
          label: item.label,
          title: item.label,
          path: item.path,
          icon: item.icon,
          activePrefixes: item.activePrefixes || [item.path],
        }))
        .filter((item) => {
          if (!normalizedQuery) return true;
          const searchable = `${section.label} ${item.label} ${item.path}`.toLowerCase();
          return searchable.includes(normalizedQuery);
        });

      return {
        id: section.id,
        label: section.label,
        items,
      };
    })
    .filter((section) => section.items.length > 0);
}
