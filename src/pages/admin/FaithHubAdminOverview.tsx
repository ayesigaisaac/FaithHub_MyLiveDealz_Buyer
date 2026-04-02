import React, { useMemo } from "react";
import {
  BarChart3,
  BellRing,
  CalendarDays,
  FileCheck,
  HeartHandshake,
  MessageSquare,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import {
  RoleDashboardShell,
  type RoleDashboardCard,
  type RoleDashboardCommunityModule,
  type RoleDashboardNotification,
  type RoleDashboardResumeItem,
  type RoleDashboardStat,
} from "@/components/dashboard";
import { routes } from "@/constants/routes";
import { getCommunityPosts } from "@/data/community";
import { getFinanceLedgerEntries } from "@/data/financeLedger";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function FaithHubAdminOverview() {
  const { user } = useAuth();
  const communityPosts = useMemo(() => getCommunityPosts(), []);
  const ledger = useMemo(() => getFinanceLedgerEntries(), []);

  const notifications = useMemo<RoleDashboardNotification[]>(() => {
    const flaggedPosts = communityPosts.filter((post) => post.reported).length;
    return [
      {
        id: "admin-live-alert",
        title: "Live moderation desk is active",
        detail: "Two high-volume live sessions require admin oversight.",
        type: "live",
        path: routes.app.admin.liveModeration,
        window: "today",
      },
      {
        id: "admin-event-reminder",
        title: "Compliance review due",
        detail: "Institution verification queue crossed the review threshold.",
        type: "event",
        path: routes.app.admin.verification,
        window: "today",
      },
      {
        id: "admin-replies",
        title: "Community escalation",
        detail: `${flaggedPosts} flagged community threads need resolution.`,
        type: "reply",
        path: routes.app.admin.noticeboard,
        window: "week",
      },
      {
        id: "admin-giving",
        title: "Finance anomaly check",
        detail: "Audit payout and giving transactions for drift and risk.",
        type: "giving",
        path: routes.app.admin.finance,
        window: "week",
      },
      {
        id: "admin-monthly-report",
        title: "Monthly controls report",
        detail: "System posture and moderation coverage report is ready.",
        type: "event",
        path: routes.app.admin.security,
        window: "month",
      },
    ];
  }, [communityPosts]);

  const resumeItems = useMemo<RoleDashboardResumeItem[]>(() => {
    return [
      {
        id: "admin-resume-moderation",
        label: "Moderation workflow",
        detail: "Continue triaging incidents and high-priority reports.",
        path: routes.app.admin.liveModeration,
      },
      {
        id: "admin-resume-security",
        label: "Security posture",
        detail: "Review audit logs and permission drift alerts.",
        path: routes.app.admin.security,
      },
      {
        id: "admin-resume-finance",
        label: "Finance controls",
        detail: "Validate payout and donation ledger movement.",
        path: routes.app.admin.finance,
      },
    ];
  }, []);

  const cards = useMemo<RoleDashboardCard[]>(() => {
    return [
      {
        id: "admin-card-moderation",
        icon: ShieldCheck,
        title: "Moderation tools",
        description: "Review incidents, reports, and trust escalations with full controls.",
        metadata: ["Today", "Moderation", "Critical queue"],
        category: "moderation",
        window: "today",
        highlight: "warning",
        primaryPath: routes.app.admin.liveModeration,
        actions: [
          { id: "admin-open-moderation", label: "Join", behavior: "navigate", to: routes.app.admin.liveModeration, variant: "default" },
          { id: "admin-save-moderation", label: "Save", behavior: "save" },
          { id: "admin-share-moderation", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "admin-card-users",
        icon: Users,
        title: "User management",
        description: "Monitor community behavior, leadership activity, and role-based access.",
        metadata: ["This week", "Community", "User controls"],
        category: "community",
        window: "week",
        primaryPath: routes.app.admin.noticeboard,
        actions: [
          { id: "admin-open-users", label: "Watch Now", behavior: "navigate", to: routes.app.admin.noticeboard },
          { id: "admin-save-users", label: "Save", behavior: "save" },
          { id: "admin-share-users", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "admin-card-reports",
        icon: BarChart3,
        title: "Reports and analytics",
        description: "Track attendance, donations, activity, and system reliability metrics.",
        metadata: ["This month", "Reports", "KPIs"],
        category: "reports",
        window: "month",
        primaryPath: routes.app.admin.overview,
        actions: [
          { id: "admin-open-reports", label: "Join", behavior: "navigate", to: routes.app.admin.overview },
          { id: "admin-save-reports", label: "Save", behavior: "save" },
          { id: "admin-share-reports", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "admin-card-controls",
        icon: FileCheck,
        title: "System controls",
        description: "Manage policy, verification, security, and operational safeguards.",
        metadata: ["Today", "Controls", "Governance"],
        category: "operations",
        window: "today",
        highlight: "accent",
        primaryPath: routes.app.admin.policy,
        actions: [
          { id: "admin-open-controls", label: "Watch Now", behavior: "navigate", to: routes.app.admin.policy, variant: "default" },
          { id: "admin-save-controls", label: "Save", behavior: "save" },
          { id: "admin-share-controls", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "admin-card-finance",
        icon: Wallet,
        title: "Finance operations",
        description: "Audit wallet movement, disputes, and provider payout performance.",
        metadata: ["This week", "Giving", "Finance"],
        category: "giving",
        window: "week",
        primaryPath: routes.app.admin.finance,
        donationPath: routes.app.admin.finance,
        actions: [
          { id: "admin-open-finance", label: "Donate", behavior: "navigate", to: routes.app.admin.finance, variant: "default" },
          { id: "admin-save-finance", label: "Save", behavior: "save" },
          { id: "admin-share-finance", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "admin-card-verification",
        icon: CalendarDays,
        title: "Verification planning",
        description: "Prioritize provider approvals and compliance deadlines.",
        metadata: ["This month", "Events", "Compliance"],
        category: "events",
        window: "month",
        primaryPath: routes.app.admin.verification,
        actions: [
          { id: "admin-open-verification", label: "Join", behavior: "navigate", to: routes.app.admin.verification },
          { id: "admin-save-verification", label: "Save", behavior: "save" },
          { id: "admin-share-verification", label: "Share", behavior: "share" },
        ],
      },
    ];
  }, []);

  const communityModules = useMemo<RoleDashboardCommunityModule[]>(
    () => [
      {
        id: "admin-prayer",
        icon: HeartHandshake,
        title: "Prayer Requests",
        description: "Observe prayer support trends and escalation patterns.",
        path: routes.app.admin.noticeboard,
      },
      {
        id: "admin-testimonies",
        icon: MessageSquare,
        title: "Testimonies",
        description: "Review testimony quality and moderation outcomes.",
        path: routes.app.admin.noticeboard,
      },
      {
        id: "admin-announcements",
        icon: BellRing,
        title: "Announcements",
        description: "Publish trusted platform notices and advisories.",
        path: routes.app.admin.noticeboard,
      },
      {
        id: "admin-groups",
        icon: Users,
        title: "Small Groups",
        description: "Audit participation and leadership coverage.",
        path: routes.app.admin.overview,
      },
      {
        id: "admin-feed",
        icon: ShieldCheck,
        title: "Community Feed",
        description: "Monitor global community activity and trust posture.",
        path: routes.app.admin.liveModeration,
      },
    ],
    [],
  );

  const stats = useMemo<RoleDashboardStat[]>(() => {
    const donations = ledger
      .filter((entry) => entry.type === "donation")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const eventRegistrations = 312;
    const activeMembers = communityPosts.length * 76;

    return [
      {
        id: "admin-stat-live",
        label: "Live attendance",
        value: "2,184",
        hint: "Aggregate concurrent attendance signals",
        tone: "emerald",
      },
      {
        id: "admin-stat-donations",
        label: "Donations received",
        value: formatCurrency(donations),
        hint: "Ledger-backed giving volume",
        tone: "orange",
      },
      {
        id: "admin-stat-events",
        label: "Event registrations",
        value: eventRegistrations.toLocaleString(),
        hint: "Cross-provider event registration total",
        tone: "slate",
      },
      {
        id: "admin-stat-members",
        label: "Active members",
        value: activeMembers.toLocaleString(),
        hint: "Active members and participant signals",
        tone: "emerald",
      },
      {
        id: "admin-stat-views",
        label: "Content views",
        value: "184k",
        hint: "Global content consumption this cycle",
        tone: "slate",
      },
    ];
  }, [communityPosts.length, ledger]);

  return (
    <RoleDashboardShell
      role="admin"
      kicker="ADMIN COMMAND"
      title="Control moderation, governance, and platform operations"
      subtitle="Operate FaithHub as one integrated SaaS command center with role-aware insights and trusted controls."
      profile={{
        name: user?.name || "Admin",
        roleLabel: "Admin",
        community: "FaithHub Command Center",
        status: "Active",
      }}
      notifications={notifications}
      resumeItems={resumeItems}
      cards={cards}
      communityModules={communityModules}
      stats={stats}
      defaultDonatePath={routes.app.admin.finance}
    />
  );
}
