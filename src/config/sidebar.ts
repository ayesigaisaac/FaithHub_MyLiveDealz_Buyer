import {
  BarChart3,
  BellRing,
  BookOpen,
  CalendarDays,
  HeartHandshake,
  Library,
  NotebookPen,
  type LucideIcon,
  LayoutDashboard,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Users,
  Wallet,
  Settings2,
  MessageSquare,
  MonitorPlay,
  Compass,
  Sparkles,
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
  collapsible?: boolean;
  items: SidebarItemTemplate[];
};

const faithMartUrl = (import.meta.env.VITE_FAITHMART_URL as string | undefined) || "https://faithmart.app";

function buildFaithMartItem(itemId: string): ExternalSidebarItemTemplate {
  return {
    id: itemId,
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
}

const sidebarSectionsByRole: Record<RoleKey, SidebarSectionTemplate[]> = {
  user: [
    {
      id: "user-home",
      label: "Home",
      items: [
        {
          id: "user-home-main",
          label: "Home",
          path: routes.app.user.home,
          icon: LayoutDashboard,
          activePrefixes: [routes.app.user.home, routes.app.user.entry, routes.app.user.auth],
        },
        {
          id: "user-discover",
          label: "Discover",
          path: routes.app.user.discover,
          icon: Compass,
          activePrefixes: [routes.app.user.discover, routes.app.user.institution],
        },
      ],
    },
    {
      id: "user-content",
      label: "Content",
      items: [
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
          id: "user-resources",
          label: "Books",
          path: routes.app.user.resources,
          icon: Library,
          activePrefixes: [routes.app.user.resources],
        },
      ],
    },
    {
      id: "user-community",
      label: "Community",
      items: [
        {
          id: "user-community-feed",
          label: "Community",
          path: routes.app.user.community,
          icon: Users,
          activePrefixes: [routes.app.user.community],
        },
        {
          id: "user-noticeboard",
          label: "Noticeboard",
          path: routes.app.user.noticeboard,
          icon: BellRing,
          activePrefixes: [routes.app.user.noticeboard],
        },
        {
          id: "user-prayer",
          label: "Prayer",
          path: routes.app.user.prayer,
          icon: HeartHandshake,
          activePrefixes: [routes.app.user.prayer],
        },
        {
          id: "user-journal",
          label: "Journal",
          path: routes.app.user.journal,
          icon: NotebookPen,
          activePrefixes: [routes.app.user.journal],
        },
        {
          id: "user-testimonies",
          label: "Testimonies",
          path: routes.app.user.testimonies,
          icon: Sparkles,
          activePrefixes: [routes.app.user.testimonies],
        },
      ],
    },
    {
      id: "user-giving",
      label: "Giving",
      items: [
        {
          id: "user-giving-main",
          label: "Give",
          path: routes.app.user.giving,
          icon: HeartHandshake,
          activePrefixes: [routes.app.user.giving, routes.app.user.fundDetail],
        },
        {
          id: "user-wallet",
          label: "Wallet",
          path: routes.app.user.wallet,
          icon: Wallet,
          activePrefixes: [routes.app.user.wallet],
        },
      ],
    },
    {
      id: "user-settings",
      label: "Settings",
      items: [
        {
          id: "user-settings-main",
          label: "Settings",
          path: routes.app.user.settings,
          icon: Settings2,
          activePrefixes: [routes.app.user.settings, routes.app.user.profile],
        },
      ],
    },
  ],
  provider: [
    {
      id: "provider-home",
      label: "Home",
      items: [
        {
          id: "provider-dashboard",
          label: "Dashboard",
          path: routes.app.provider.dashboard,
          icon: LayoutDashboard,
          activePrefixes: [routes.app.provider.dashboard],
        },
      ],
    },
    {
      id: "provider-content",
      label: "Content",
      collapsible: true,
      items: [
        {
          id: "provider-series",
          label: "Content Studio",
          path: routes.app.provider.seriesBuilder,
          icon: BookOpen,
          activePrefixes: [routes.app.provider.seriesBuilder, routes.app.provider.episodeBuilder, routes.app.provider.postLive],
        },
        {
          id: "provider-live",
          label: "Live Operations",
          path: routes.app.provider.liveSchedule,
          icon: MonitorPlay,
          activePrefixes: [routes.app.provider.liveSchedule, routes.app.provider.liveStudio, routes.app.provider.liveOps, routes.app.provider.streamToPlatforms, routes.app.provider.liveBuilder],
        },
        {
          id: "provider-events",
          label: "Events",
          path: routes.app.provider.events,
          icon: CalendarDays,
          activePrefixes: [routes.app.provider.events],
        },
        {
          id: "provider-resources",
          label: "Books & Resources",
          path: routes.app.provider.resources,
          icon: Library,
          activePrefixes: [routes.app.provider.resources],
        },
      ],
    },
    {
      id: "provider-community",
      label: "Community",
      collapsible: true,
      items: [
        {
          id: "provider-community-feed",
          label: "Community",
          path: routes.app.provider.community,
          icon: Users,
          activePrefixes: [routes.app.provider.community],
        },
        {
          id: "provider-audience",
          label: "Audience",
          path: routes.app.provider.contacts,
          icon: MessageSquare,
          activePrefixes: [routes.app.provider.contacts, routes.app.provider.notifications],
        },
        {
          id: "provider-noticeboard",
          label: "Noticeboard",
          path: routes.app.provider.noticeboard,
          icon: BellRing,
          activePrefixes: [routes.app.provider.noticeboard],
        },
        {
          id: "provider-prayer",
          label: "Prayer",
          path: routes.app.provider.prayer,
          icon: HeartHandshake,
          activePrefixes: [routes.app.provider.prayer],
        },
        {
          id: "provider-journal",
          label: "Journal",
          path: routes.app.provider.journal,
          icon: NotebookPen,
          activePrefixes: [routes.app.provider.journal],
        },
        {
          id: "provider-testimonies",
          label: "Testimonies",
          path: routes.app.provider.testimonies,
          icon: Sparkles,
          activePrefixes: [routes.app.provider.testimonies],
        },
        {
          id: "provider-counseling",
          label: "Counseling",
          path: routes.app.provider.counseling,
          icon: Stethoscope,
          activePrefixes: [routes.app.provider.counseling],
        },
      ],
    },
    {
      id: "provider-giving",
      label: "Giving",
      collapsible: true,
      items: [
        {
          id: "provider-wallet",
          label: "Wallet",
          path: routes.app.provider.wallet,
          icon: Wallet,
          activePrefixes: [routes.app.provider.wallet],
        },
        {
          id: "provider-funds",
          label: "Earnings & Payouts",
          path: routes.app.provider.funds,
          icon: HeartHandshake,
          activePrefixes: [routes.app.provider.funds, routes.app.provider.fundDetail],
        },
        {
          id: "provider-create-fund",
          label: "Create Fund",
          path: routes.app.provider.fundCreate,
          icon: Wallet,
          activePrefixes: [routes.app.provider.fundCreate],
        },
        buildFaithMartItem("provider-faithmart"),
      ],
    },
    {
      id: "provider-settings",
      label: "Settings",
      collapsible: true,
      items: [
        {
          id: "provider-onboarding",
          label: "Workspace Settings",
          path: routes.app.provider.onboarding,
          icon: Settings2,
          activePrefixes: [routes.app.provider.onboarding],
        },
        {
          id: "provider-moderation",
          label: "Moderation",
          path: routes.app.provider.reviewsModeration,
          icon: ShieldCheck,
          activePrefixes: [routes.app.provider.reviewsModeration],
        },
        {
          id: "provider-auth-audit",
          label: "Auth Audit",
          path: routes.app.provider.authAudit,
          icon: ShieldCheck,
          activePrefixes: [routes.app.provider.authAudit],
        },
        {
          id: "provider-qa",
          label: "QA Center",
          path: routes.app.provider.qa,
          icon: ShieldCheck,
          activePrefixes: [routes.app.provider.qa],
        },
      ],
    },
  ],
  admin: [
    {
      id: "admin-home",
      label: "Home",
      items: [
        {
          id: "admin-overview",
          label: "Overview",
          path: routes.app.admin.overview,
          icon: LayoutDashboard,
          activePrefixes: [routes.app.admin.overview],
        },
      ],
    },
    {
      id: "admin-content",
      label: "Content",
      collapsible: true,
      items: [
        {
          id: "admin-policy",
          label: "Policy",
          path: routes.app.admin.policy,
          icon: BookOpen,
          activePrefixes: [routes.app.admin.policy],
        },
        {
          id: "admin-channels",
          label: "Channels",
          path: routes.app.admin.channels,
          icon: BarChart3,
          activePrefixes: [routes.app.admin.channels],
        },
        {
          id: "admin-verification",
          label: "Verification",
          path: routes.app.admin.verification,
          icon: CalendarDays,
          activePrefixes: [routes.app.admin.verification],
        },
      ],
    },
    {
      id: "admin-community",
      label: "Community",
      collapsible: true,
      items: [
        {
          id: "admin-moderation",
          label: "Live Moderation",
          path: routes.app.admin.liveModeration,
          icon: ShieldCheck,
          activePrefixes: [routes.app.admin.liveModeration],
        },
        {
          id: "admin-noticeboard",
          label: "Noticeboard",
          path: routes.app.admin.noticeboard,
          icon: BellRing,
          activePrefixes: [routes.app.admin.noticeboard],
        },
        {
          id: "admin-counseling",
          label: "Counseling",
          path: routes.app.admin.counseling,
          icon: Stethoscope,
          activePrefixes: [routes.app.admin.counseling],
        },
      ],
    },
    {
      id: "admin-giving",
      label: "Giving",
      collapsible: true,
      items: [
        {
          id: "admin-finance",
          label: "Finance",
          path: routes.app.admin.finance,
          icon: Wallet,
          activePrefixes: [routes.app.admin.finance],
        },
        buildFaithMartItem("admin-faithmart"),
      ],
    },
    {
      id: "admin-settings",
      label: "Settings",
      collapsible: true,
      items: [
        {
          id: "admin-security",
          label: "Security",
          path: routes.app.admin.security,
          icon: Settings2,
          activePrefixes: [routes.app.admin.security],
        },
        {
          id: "admin-auth-audit",
          label: "Auth Audit",
          path: routes.app.admin.authAudit,
          icon: ShieldCheck,
          activePrefixes: [routes.app.admin.authAudit],
        },
        {
          id: "admin-qa",
          label: "QA Center",
          path: routes.app.admin.qa,
          icon: ShieldCheck,
          activePrefixes: [routes.app.admin.qa],
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
        collapsible: section.collapsible,
        items,
      };
    })
    .filter((section) => section.items.length > 0);
}
