import {
  BarChart3,
  BookOpen,
  CalendarDays,
  type LucideIcon,
  LayoutDashboard,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { routes } from "@/constants/routes";
import type { RoleKey } from "@/config/pageRegistry";

export type SidebarItemType = "internal" | "external";
export type ExternalOpenMode = "new_tab" | "iframe";

type SidebarItemBase = {
  id: string;
  label: string;
  title: string;
  icon: LucideIcon;
  type: SidebarItemType;
};

export interface InternalSidebarItem extends SidebarItemBase {
  type: "internal";
  path: string;
  activePrefixes: string[];
}

export interface ExternalSidebarItem extends SidebarItemBase {
  type: "external";
  url: string;
  activePrefixes: string[];
  openMode: ExternalOpenMode;
  integration: {
    key: string;
    sso: "planned" | "none";
    iframePath: string | null;
  };
}

export type SidebarItem = InternalSidebarItem | ExternalSidebarItem;

export interface SidebarSection {
  id: string;
  label: string;
  collapsible?: boolean;
  items: SidebarItem[];
}

type InternalSidebarItemTemplate = {
  id: string;
  label: string;
  title?: string;
  type?: "internal";
  path: string;
  icon: LucideIcon;
  activePrefixes?: string[];
};

type ExternalSidebarItemTemplate = {
  id: string;
  label: string;
  title?: string;
  type: "external";
  url: string;
  icon: LucideIcon;
  activePrefixes?: string[];
  openMode?: ExternalOpenMode;
  integration?: {
    key: string;
    sso?: "planned" | "none";
    iframePath?: string | null;
  };
};

type SidebarItemTemplate = InternalSidebarItemTemplate | ExternalSidebarItemTemplate;

type SidebarSectionTemplate = {
  id: string;
  label: string;
  items: SidebarItemTemplate[];
};

const faithMartUrl = (import.meta.env.VITE_FAITHMART_URL as string | undefined) || "https://faithmart.app";

const faithMartSidebarItem: ExternalSidebarItemTemplate = {
  id: "faithmart-global",
  label: "FaithMart",
  title: "Open FaithMart (external)",
  type: "external",
  url: faithMartUrl,
  icon: ShoppingBag,
  openMode: "new_tab",
  integration: {
    key: "faithmart",
    sso: "planned",
    iframePath: null,
  },
};

function createFaithMartSection(sectionId: string): SidebarSectionTemplate {
  return {
    id: sectionId,
    label: "External Modules",
    items: [faithMartSidebarItem],
  };
}

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
    createFaithMartSection("user-external"),
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
    createFaithMartSection("provider-external"),
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
    createFaithMartSection("admin-external"),
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
        .map<SidebarItem>((item) => {
          if (item.type === "external") {
            return {
              id: item.id,
              label: item.label,
              title: item.title || item.label,
              type: "external",
              url: item.url,
              icon: item.icon,
              activePrefixes: item.activePrefixes || [],
              openMode: item.openMode || "new_tab",
              integration: {
                key: item.integration?.key || item.id,
                sso: item.integration?.sso || "planned",
                iframePath: item.integration?.iframePath ?? null,
              },
            };
          }

          return {
            id: item.id,
            label: item.label,
            title: item.title || item.label,
            type: "internal",
            path: item.path,
            icon: item.icon,
            activePrefixes: item.activePrefixes || [item.path],
          };
        })
        .filter((item) => {
          if (!normalizedQuery) return true;
          const searchable =
            item.type === "external"
              ? `${section.label} ${item.label} ${item.url}`.toLowerCase()
              : `${section.label} ${item.label} ${item.path}`.toLowerCase();
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
