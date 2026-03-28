import {
  BookOpen,
  CircleDollarSign,
  type LucideIcon,
  LayoutDashboard,
  Radio,
  Settings2,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
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

interface SidebarItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  pathByRole: Record<RoleKey, string>;
  activePrefixesByRole?: Partial<Record<RoleKey, string[]>>;
}

interface SidebarSectionConfig {
  id: string;
  label: string;
  collapsible?: boolean;
  items: SidebarItemConfig[];
}

export const unifiedSidebarNavConfig: SidebarSectionConfig[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: LayoutDashboard,
        pathByRole: {
          user: routes.app.user.home,
          provider: routes.app.provider.dashboard,
          admin: routes.app.admin.overview,
        },
        activePrefixesByRole: {
          user: ["/app/user"],
          provider: ["/app/provider"],
          admin: ["/app/admin"],
        },
      },
    ],
  },
  {
    id: "core",
    label: "Core",
    collapsible: true,
    items: [
      {
        id: "core-home",
        label: "Home",
        icon: LayoutDashboard,
        pathByRole: {
          user: routes.app.user.home,
          provider: routes.app.provider.dashboard,
          admin: routes.app.user.home,
        },
        activePrefixesByRole: {
          user: [routes.app.user.home, routes.app.user.entry, routes.app.user.auth, routes.app.user.profile],
          provider: [routes.app.provider.dashboard, routes.app.provider.onboarding],
          admin: [routes.app.user.home],
        },
      },
      {
        id: "core-series",
        label: "Series",
        icon: BookOpen,
        pathByRole: {
          user: routes.app.user.series,
          provider: routes.app.provider.seriesBuilder,
          admin: routes.app.user.series,
        },
        activePrefixesByRole: {
          user: ["/app/user/series", "/app/user/episode", "/app/user/replay", "/app/user/clips"],
          provider: ["/app/provider/series-builder", "/app/provider/episode-builder", "/app/provider/post-live"],
          admin: ["/app/user/series", "/app/user/episode", "/app/user/replay", "/app/user/clips"],
        },
      },
      {
        id: "core-live",
        label: "Live",
        icon: Radio,
        pathByRole: {
          user: routes.app.user.liveHub,
          provider: routes.app.provider.liveOps,
          admin: routes.app.admin.liveModeration,
        },
        activePrefixesByRole: {
          user: ["/app/user/live"],
          provider: ["/app/provider/live-"],
          admin: [routes.app.admin.liveModeration],
        },
      },
      {
        id: "core-community",
        label: "Community",
        icon: Users,
        pathByRole: {
          user: routes.app.user.discover,
          provider: routes.app.provider.contacts,
          admin: routes.app.user.discover,
        },
        activePrefixesByRole: {
          user: ["/app/user/discover", "/app/user/institution", "/app/user/events", "/app/user/reviews"],
          provider: [
            "/app/provider/contacts",
            "/app/provider/notifications",
            "/app/provider/events",
            "/app/provider/reviews-moderation",
          ],
          admin: ["/app/user/discover", "/app/user/institution", "/app/user/events", "/app/user/reviews"],
        },
      },
    ],
  },
  {
    id: "management",
    label: "Management",
    collapsible: true,
    items: [
      {
        id: "management-policy",
        label: "Policy",
        icon: ShieldCheck,
        pathByRole: {
          user: routes.app.admin.policy,
          provider: routes.app.admin.policy,
          admin: routes.app.admin.policy,
        },
      },
      {
        id: "management-verification",
        label: "Verification",
        icon: ShieldCheck,
        pathByRole: {
          user: routes.app.admin.verification,
          provider: routes.app.admin.verification,
          admin: routes.app.admin.verification,
        },
      },
      {
        id: "management-security",
        label: "Security",
        icon: ShieldCheck,
        pathByRole: {
          user: routes.app.admin.security,
          provider: routes.app.admin.security,
          admin: routes.app.admin.security,
        },
      },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    collapsible: true,
    items: [
      {
        id: "commerce-finance",
        label: "Finance",
        icon: Wallet,
        pathByRole: {
          user: routes.app.user.giving,
          provider: routes.app.provider.funds,
          admin: routes.app.admin.finance,
        },
        activePrefixesByRole: {
          user: [routes.app.user.giving],
          provider: [routes.app.provider.funds],
          admin: [routes.app.admin.finance],
        },
      },
      {
        id: "commerce-giving",
        label: "Giving",
        icon: CircleDollarSign,
        pathByRole: {
          user: routes.app.user.giving,
          provider: routes.app.provider.funds,
          admin: routes.app.user.giving,
        },
        activePrefixesByRole: {
          user: [routes.app.user.giving, routes.app.user.membership],
          provider: [routes.app.provider.funds],
          admin: [routes.app.user.giving, routes.app.user.membership],
        },
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings2,
        pathByRole: {
          user: routes.app.user.settings,
          provider: routes.app.provider.notifications,
          admin: routes.app.admin.security,
        },
        activePrefixesByRole: {
          user: [routes.app.user.settings, routes.app.user.profile],
          provider: [routes.app.provider.notifications],
          admin: [routes.app.admin.security, routes.app.admin.channels],
        },
      },
    ],
  },
];

export function buildUnifiedSidebarSections({
  role,
  query = "",
}: {
  role: RoleKey;
  query?: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return unifiedSidebarNavConfig
    .map<SidebarSection>((section) => {
      const items = section.items
        .map<SidebarItem>((item) => {
          const path = item.pathByRole[role];
          const activePrefixes = item.activePrefixesByRole?.[role] || [path];
          return {
            id: item.id,
            label: item.label,
            title: item.label,
            path,
            icon: item.icon,
            activePrefixes,
          };
        })
        .filter((item) => {
          if (!normalizedQuery) return true;
          const searchable = `${section.label} ${item.label} ${item.path}`.toLowerCase();
          return searchable.includes(normalizedQuery);
        });

      return {
        id: section.id,
        label: section.label,
        collapsible: section.collapsible,
        items,
      };
    })
    .filter((section) => section.items.length > 0);
}

