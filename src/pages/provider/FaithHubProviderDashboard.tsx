import React, { useMemo } from "react";
import {
  BarChart3,
  BellRing,
  BookOpen,
  CalendarDays,
  HeartHandshake,
  MessageSquare,
  MonitorPlay,
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
import { getProviderFundSnapshot } from "@/data/funds";
import { getProviderAnalyticsSnapshot } from "@/data/providerAnalytics";
import { getWalletByRole } from "@/data/wallet";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function FaithHubProviderDashboard() {
  const { user } = useAuth();
  const analytics = useMemo(() => getProviderAnalyticsSnapshot(), []);
  const providerFunds = useMemo(() => getProviderFundSnapshot(), []);
  const providerWallet = useMemo(() => getWalletByRole("provider"), []);
  const communityPosts = useMemo(() => getCommunityPosts().filter((post) => post.authorRole === "provider"), []);

  const notifications = useMemo<RoleDashboardNotification[]>(() => {
    const urgentModeration = communityPosts.filter((post) => post.reported).length;

    return [
      {
        id: "provider-live-alert",
        title: "Live session starts in 35 minutes",
        detail: "Evening Prayer Revival requires final stream checks.",
        type: "live",
        path: routes.app.provider.liveSchedule,
        window: "today",
      },
      {
        id: "provider-event-reminder",
        title: "Event reminder: Youth Outreach",
        detail: "Volunteer confirmations are due before noon.",
        type: "event",
        path: routes.app.provider.events,
        window: "today",
      },
      {
        id: "provider-replies",
        title: "New audience replies",
        detail: "Members are engaging in your latest community thread.",
        type: "reply",
        path: routes.app.provider.community,
        window: "week",
      },
      {
        id: "provider-giving",
        title: "Giving alert",
        detail: `${formatCurrency(providerWallet.balance)} available for payout planning.`,
        type: "giving",
        path: routes.app.provider.wallet,
        window: "week",
      },
      {
        id: "provider-moderation",
        title: "Moderation follow-up",
        detail: `${urgentModeration} flagged conversations need provider review.`,
        type: "reply",
        path: routes.app.provider.reviewsModeration,
        window: "month",
      },
    ];
  }, [communityPosts, providerWallet.balance]);

  const resumeItems = useMemo<RoleDashboardResumeItem[]>(() => {
    const leadFund = providerFunds[0];
    return [
      {
        id: "resume-provider-content",
        label: "Content pipeline",
        detail: "Continue editing series drafts and scheduling assets.",
        path: routes.app.provider.seriesBuilder,
      },
      {
        id: "resume-provider-events",
        label: "Upcoming events",
        detail: "Review registrations, reminders, and host assignments.",
        path: routes.app.provider.events,
      },
      {
        id: "resume-provider-fund",
        label: "Fund progress",
        detail: leadFund
          ? `${leadFund.fund.title} - ${formatCurrency(leadFund.fund.current_amount)} raised`
          : "Create your first campaign fund",
        path: leadFund ? routes.app.provider.fundDetailBySlug(leadFund.fund.slug) : routes.app.provider.fundCreate,
      },
    ];
  }, [providerFunds]);

  const cards = useMemo<RoleDashboardCard[]>(() => {
    return [
      {
        id: "provider-card-live",
        icon: MonitorPlay,
        title: "Live production",
        description: "Launch and monitor live sessions with studio and operations controls.",
        metadata: ["Today", "Live", "Production"],
        category: "operations",
        window: "today",
        highlight: "accent",
        primaryPath: routes.app.provider.liveStudio,
        actions: [
          { id: "provider-go-live", label: "Join", behavior: "navigate", to: routes.app.provider.liveStudio, variant: "default" },
          { id: "provider-save-live", label: "Save", behavior: "save" },
          { id: "provider-share-live", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "provider-card-content",
        icon: BookOpen,
        title: "Manage series",
        description: "Create episodes, update lessons, and publish replay content.",
        metadata: ["This week", "Content", "Series builder"],
        category: "content",
        window: "week",
        primaryPath: routes.app.provider.seriesBuilder,
        actions: [
          { id: "provider-open-content", label: "Watch Now", behavior: "navigate", to: routes.app.provider.seriesBuilder },
          { id: "provider-save-content", label: "Save", behavior: "save" },
          { id: "provider-share-content", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "provider-card-events",
        icon: CalendarDays,
        title: "Manage events",
        description: "Coordinate registrations, check-in flow, and event communication.",
        metadata: ["This month", "Events", "Operations"],
        category: "events",
        window: "month",
        primaryPath: routes.app.provider.events,
        actions: [
          { id: "provider-open-events", label: "Join", behavior: "navigate", to: routes.app.provider.events },
          { id: "provider-save-events", label: "Save", behavior: "save" },
          { id: "provider-share-events", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "provider-card-analytics",
        icon: BarChart3,
        title: "Analytics cockpit",
        description: "Track views, engagement, attendance, and top-performing content.",
        metadata: ["Today", "Reports", "Insights"],
        category: "reports",
        window: "today",
        primaryPath: routes.app.provider.liveOps,
        actions: [
          { id: "provider-open-analytics", label: "Watch Now", behavior: "navigate", to: routes.app.provider.liveOps, variant: "default" },
          { id: "provider-save-analytics", label: "Save", behavior: "save" },
          { id: "provider-share-analytics", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "provider-card-community",
        icon: Users,
        title: "Community engagement",
        description: "Lead discussions, respond to members, and publish community guidance.",
        metadata: ["This week", "Community", "Audience"],
        category: "community",
        window: "week",
        primaryPath: routes.app.provider.community,
        actions: [
          { id: "provider-open-community", label: "Join", behavior: "navigate", to: routes.app.provider.community },
          { id: "provider-save-community", label: "Save", behavior: "save" },
          { id: "provider-share-community", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "provider-card-funds",
        icon: Wallet,
        title: "Earnings and payouts",
        description: "Monitor provider earnings, wallet movement, and withdrawal readiness.",
        metadata: ["This month", "Giving", "Payouts"],
        category: "giving",
        window: "month",
        highlight: "warning",
        primaryPath: routes.app.provider.wallet,
        donationPath: routes.app.provider.funds,
        actions: [
          { id: "provider-open-wallet", label: "Donate", behavior: "navigate", to: routes.app.provider.wallet, variant: "default" },
          { id: "provider-save-wallet", label: "Save", behavior: "save" },
          { id: "provider-share-wallet", label: "Share", behavior: "share" },
        ],
      },
    ];
  }, []);

  const communityModules = useMemo<RoleDashboardCommunityModule[]>(
    () => [
      {
        id: "provider-prayer",
        icon: HeartHandshake,
        title: "Prayer Requests",
        description: "Facilitate prayer threads and pastoral follow-ups.",
        path: routes.app.provider.community,
      },
      {
        id: "provider-testimonies",
        icon: MessageSquare,
        title: "Testimonies",
        description: "Highlight member stories and faith milestones.",
        path: routes.app.provider.community,
      },
      {
        id: "provider-noticeboard",
        icon: BellRing,
        title: "Announcements",
        description: "Publish ministry updates and event notices.",
        path: routes.app.provider.noticeboard,
      },
      {
        id: "provider-groups",
        icon: Users,
        title: "Small Groups",
        description: "Coordinate leaders and discussion circles.",
        path: routes.app.provider.community,
      },
      {
        id: "provider-feed",
        icon: ShieldCheck,
        title: "Community Feed",
        description: "Moderate ongoing conversations with context.",
        path: routes.app.provider.community,
      },
    ],
    [],
  );

  const stats = useMemo<RoleDashboardStat[]>(() => {
    const eventRegistrations = 142;
    const activeMembers = communityPosts.length * 48;

    return [
      {
        id: "provider-stat-attendance",
        label: "Live attendance",
        value: analytics.liveAttendance.toLocaleString(),
        hint: "Audience in recent live sessions",
        tone: "emerald",
      },
      {
        id: "provider-stat-giving",
        label: "Donations received",
        value: formatCurrency(analytics.givingReceived),
        hint: "Funds raised across active campaigns",
        tone: "orange",
      },
      {
        id: "provider-stat-events",
        label: "Event registrations",
        value: eventRegistrations.toLocaleString(),
        hint: "Registrations awaiting event day",
        tone: "slate",
      },
      {
        id: "provider-stat-members",
        label: "Active members",
        value: activeMembers.toLocaleString(),
        hint: "Engaged followers and participants",
        tone: "emerald",
      },
      {
        id: "provider-stat-views",
        label: "Content views",
        value: analytics.totalViews.toLocaleString(),
        hint: "Total views from series and live replays",
        tone: "slate",
      },
    ];
  }, [analytics, communityPosts.length]);

  return (
    <RoleDashboardShell
      role="provider"
      kicker="PROVIDER COMMAND"
      title="Run content, community, and giving from one provider dashboard"
      subtitle="Manage live operations, audience engagement, and financial growth with a single, role-aware workspace."
      profile={{
        name: user?.name || "Provider",
        roleLabel: "Provider",
        community: "FaithHub Provider Workspace",
        status: "Active",
      }}
      notifications={notifications}
      resumeItems={resumeItems}
      cards={cards}
      communityModules={communityModules}
      stats={stats}
      defaultDonatePath={routes.app.provider.funds}
    />
  );
}
