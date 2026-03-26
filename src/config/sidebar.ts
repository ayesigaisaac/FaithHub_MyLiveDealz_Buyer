import {
  BookOpen,
  BriefcaseBusiness,
  Clock3,
  LayoutGrid,
  ShieldAlert,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { pagesByRole, type PageRegistryItem, type RoleKey } from "@/config/pageRegistry";

export interface SidebarItem {
  id: string;
  label: string;
  subtitle?: string;
  title: string;
  path: string;
  icon: PageRegistryItem["icon"];
  role: RoleKey;
}

export interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
  items: SidebarItem[];
}

const sectionLabelMap: Partial<Record<RoleKey, Record<string, string>>> = {
  user: {
    "Start & Identity": "Account",
    "Discovery & Institutions": "Home",
    "Series & Content": "Series",
    "Live Sessionz": "Live",
    "Events, Giving & Membership": "Community",
    "Trust & Settings": "Settings",
  },
  provider: {
    "Onboarding & Core HQ": "Dashboard",
    "Content Studio": "Content",
    "Live Operations": "Live",
    "Audience & Distribution": "Audience",
    "Commerce, Funds & Trust": "Funds",
  },
  admin: {
    "Global Control": "Control",
    "Verification & Trust": "Control",
    "Finance & Channels": "Finance",
    "Security & Evidence": "Security",
  },
};

const itemLabelMap: Partial<Record<string, string>> = {
  "u-discover": "Discover",
  "u-institution": "Institution",
  "u-membership": "Membership",
  "p-onboarding": "Onboarding",
  "p-dashboard": "Dashboard",
  "p-post-live": "Post-live",
  "p-live-ops": "Live Dashboard",
  "p-stream-platforms": "Stream Platforms",
  "p-notifications": "Notifications",
  "p-contacts": "Contact Manager",
  "p-funds": "Funds",
  "p-reviews-mod": "Moderation",
  "a-verification": "Verification",
  "a-live-mod": "Moderation",
  "a-policy": "Policy & Taxonomy",
  "a-finance": "Finance",
  "a-channels": "Channels",
  "a-security": "Security",
};

const itemSubtitleMap: Partial<Record<string, string | null>> = {
  "a-overview": null,
  "a-policy": "Platform policy controls",
  "a-verification": "Approval and compliance flow",
  "a-live-mod": "Cross-network intervention control",
  "a-security": "Evidence and compliance tracing",
  "a-finance": "Payouts, refunds, and risk controls",
  "a-channels": "Deliverability and sender governance",
};

const sectionSortOrderByRole: Partial<Record<RoleKey, string[]>> = {
  admin: ["Control", "Security", "Finance"],
};

const rolePrefixLabel: Record<RoleKey, string> = {
  user: "User",
  provider: "Provider",
  admin: "Admin",
};

function getSectionLabel(role: RoleKey, section: string) {
  return sectionLabelMap[role]?.[section] || section;
}

function getSectionIcon(sectionLabel: string): LucideIcon {
  const value = sectionLabel.toLowerCase();
  if (value.includes("finance") || value.includes("revenue") || value.includes("fund")) return Wallet;
  if (value.includes("security") || value.includes("trust") || value.includes("settings") || value.includes("account")) return ShieldAlert;
  if (value.includes("series") || value.includes("content")) return BookOpen;
  if (value.includes("audience")) return BriefcaseBusiness;
  if (value.includes("live")) return Clock3;
  if (value.includes("community") || value.includes("discover")) return Sparkles;
  return LayoutGrid;
}

function getSidebarItemLabel(item: Pick<PageRegistryItem, "id" | "label">) {
  return itemLabelMap[item.id] || item.label;
}

function getSidebarItemSubtitle(item: Pick<PageRegistryItem, "id" | "description">) {
  if (item.id in itemSubtitleMap) {
    const mapped = itemSubtitleMap[item.id];
    return mapped || undefined;
  }
  return item.description;
}

export function buildSidebarSections({
  role,
  pages,
  adminAllAccess = false,
}: {
  role: RoleKey;
  pages: PageRegistryItem[];
  adminAllAccess?: boolean;
}) {
  const preferredOrder = sectionSortOrderByRole[role] || [];
  const sectionSortIndex = new Map(preferredOrder.map((label, index) => [label.toLowerCase(), index]));

  const sectionMap = new Map<string, SidebarSection>();

  for (const page of pages) {
    const pageRole = adminAllAccess ? page.role : role;
    const labelBase = getSectionLabel(pageRole, page.section);
    const sectionId = adminAllAccess ? `${page.role}:${labelBase}` : labelBase;
    const label = adminAllAccess ? `${rolePrefixLabel[page.role]} - ${labelBase}` : labelBase;

    if (!sectionMap.has(sectionId)) {
      sectionMap.set(sectionId, {
        id: sectionId,
        label,
        icon: getSectionIcon(labelBase),
        items: [],
      });
    }

    sectionMap.get(sectionId)?.items.push({
      id: page.id,
      label: getSidebarItemLabel(page),
      subtitle: getSidebarItemSubtitle(page),
      title: page.label,
      path: page.path,
      icon: page.icon,
      role: page.role,
    });
  }

  const sections = Array.from(sectionMap.values());
  if (!adminAllAccess && preferredOrder.length > 0) {
    sections.sort((left, right) => {
      const leftRank = sectionSortIndex.get(left.label.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
      const rightRank = sectionSortIndex.get(right.label.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
      return leftRank - rightRank;
    });
  }

  return sections;
}

export const sidebarConfig: Record<RoleKey, SidebarSection[]> = {
  user: buildSidebarSections({ role: "user", pages: pagesByRole.user || [] }),
  provider: buildSidebarSections({ role: "provider", pages: pagesByRole.provider || [] }),
  admin: buildSidebarSections({ role: "admin", pages: pagesByRole.admin || [] }),
};
