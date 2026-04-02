import React, { useMemo } from "react";
import {
  BellRing,
  BookOpen,
  CalendarDays,
  Compass,
  HeartHandshake,
  MessageSquare,
  PlayCircle,
  Users,
} from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { RoleDashboardShell, type RoleDashboardCard, type RoleDashboardCommunityModule, type RoleDashboardNotification, type RoleDashboardResumeItem, type RoleDashboardStat } from "@/components/dashboard";
import { routes } from "@/constants/routes";
import { getCommunityPosts } from "@/data/community";
import { getHomePersonalizationSnapshot } from "@/data/homePersonalization";
import { getWalletByRole } from "@/data/wallet";

export default function FaithHubHome() {
  const { user } = useAuth();

  const personalization = useMemo(() => getHomePersonalizationSnapshot(), []);
  const communityPosts = useMemo(() => getCommunityPosts(), []);
  const wallet = useMemo(() => getWalletByRole("user"), []);

  const notifications = useMemo<RoleDashboardNotification[]>(() => {
    const totalReplies = communityPosts.reduce((count, post) => count + post.comments.length, 0);
    return [
      {
        id: "live-alert",
        title: "Live now: Evening Prayer Revival",
        detail: "Join the stream and prayer room before the first segment starts.",
        type: "live",
        path: routes.app.user.liveHub,
        window: "today",
      },
      {
        id: "event-reminder",
        title: "Event reminder: Youth Impact Night",
        detail: "Your RSVP is confirmed for tonight at 8:00 PM.",
        type: "event",
        path: routes.app.user.events,
        window: "today",
      },
      {
        id: "community-replies",
        title: `${totalReplies} new community replies`,
        detail: "Provider leaders and members responded to your recent posts.",
        type: "reply",
        path: routes.app.user.community,
        window: "week",
      },
      {
        id: "giving-alert",
        title: "Giving plan reminder",
        detail: `Wallet balance: $${wallet.balance.toFixed(2)}. Continue your support journey this week.`,
        type: "giving",
        path: routes.app.user.giving,
        window: "week",
      },
      {
        id: "monthly-community",
        title: "Monthly community highlight",
        detail: "Small groups and prayer circles increased attendance this month.",
        type: "event",
        path: routes.app.user.community,
        window: "month",
      },
    ];
  }, [communityPosts, wallet.balance]);

  const resumeItems = useMemo<RoleDashboardResumeItem[]>(() => {
    const firstContinue = personalization.continueWatching[0];
    const firstSeries = personalization.recommendedContent[0];
    const nextEvent = personalization.liveNow[1];

    return [
      {
        id: "resume-sermon",
        label: "Last watched sermon",
        detail: firstContinue ? `${firstContinue.title} - ${firstContinue.detail}` : "Open your replay queue",
        path: firstContinue?.path || routes.app.user.replay,
      },
      {
        id: "resume-series",
        label: "Saved series",
        detail: firstSeries ? `${firstSeries.title} - ${firstSeries.detail}` : "Continue your saved series",
        path: firstSeries?.path || routes.app.user.series,
      },
      {
        id: "resume-event",
        label: "Upcoming events",
        detail: nextEvent ? `${nextEvent.title} - ${nextEvent.detail}` : "Check events happening this week",
        path: routes.app.user.events,
      },
    ];
  }, [personalization]);

  const cards = useMemo<RoleDashboardCard[]>(() => {
    return [
      {
        id: "card-live-session",
        icon: PlayCircle,
        title: "Live sessions",
        description: "Join active sessions and upcoming live worship streams with one tap.",
        metadata: ["Today", "8:00 PM", "Pastor Anna"],
        category: "events",
        window: "today",
        highlight: "accent",
        primaryPath: routes.app.user.liveHub,
        donationPath: routes.app.user.giving,
        actions: [
          { id: "watch-now", label: "Watch Now", behavior: "navigate", to: routes.app.user.liveHub, variant: "default" },
          { id: "join", label: "Join", behavior: "navigate", to: routes.app.user.liveWaitingRoom },
          { id: "save", label: "Save", behavior: "save" },
          { id: "share", label: "Share", behavior: "share" },
          { id: "donate", label: "Donate", behavior: "donate", to: routes.app.user.giving },
        ],
      },
      {
        id: "card-series",
        icon: BookOpen,
        title: "Saved content",
        description: "Continue the series and teachings you bookmarked for your growth journey.",
        metadata: ["This week", "Series", "FaithHub Library"],
        category: "content",
        window: "week",
        primaryPath: routes.app.user.series,
        actions: [
          { id: "watch-series", label: "Watch Now", behavior: "navigate", to: routes.app.user.series },
          { id: "save-series", label: "Save", behavior: "save" },
          { id: "share-series", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "card-events",
        icon: CalendarDays,
        title: "Upcoming events",
        description: "Track registrations, reminders, and event details in one calendar flow.",
        metadata: ["This month", "Event", "Community"],
        category: "events",
        window: "month",
        primaryPath: routes.app.user.events,
        actions: [
          { id: "join-event", label: "Join", behavior: "navigate", to: routes.app.user.events },
          { id: "save-event", label: "Save", behavior: "save" },
          { id: "share-event", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "card-community",
        icon: Users,
        title: "Community feed",
        description: "Read testimonies, prayer requests, and announcements from your circles.",
        metadata: ["Today", "Community", "Replies"],
        category: "community",
        window: "today",
        primaryPath: routes.app.user.community,
        actions: [
          { id: "open-community", label: "Join", behavior: "navigate", to: routes.app.user.community, variant: "default" },
          { id: "save-community", label: "Save", behavior: "save" },
          { id: "share-community", label: "Share", behavior: "share" },
        ],
      },
      {
        id: "card-giving",
        icon: HeartHandshake,
        title: "Suggested giving",
        description: "Support active campaigns and missions aligned with your faith journey.",
        metadata: ["This week", "Giving", "FaithMart + Wallet"],
        category: "giving",
        window: "week",
        highlight: "warning",
        primaryPath: routes.app.user.giving,
        donationPath: routes.app.user.giving,
        actions: [
          { id: "donate-now", label: "Donate", behavior: "donate", to: routes.app.user.giving, variant: "default" },
          { id: "save-giving", label: "Save", behavior: "save" },
          { id: "share-giving", label: "Share", behavior: "share" },
        ],
      },
    ];
  }, []);

  const communityModules = useMemo<RoleDashboardCommunityModule[]>(
    () => [
      {
        id: "community-prayer",
        icon: HeartHandshake,
        title: "Prayer Requests",
        description: "Post and respond to prayer needs from your groups.",
        path: routes.app.user.community,
      },
      {
        id: "community-testimonies",
        icon: MessageSquare,
        title: "Testimonies",
        description: "Share growth stories and encourage members.",
        path: routes.app.user.community,
      },
      {
        id: "community-announcements",
        icon: BellRing,
        title: "Announcements",
        description: "Read trusted community and provider updates.",
        path: routes.app.user.noticeboard,
      },
      {
        id: "community-groups",
        icon: Users,
        title: "Small Groups",
        description: "Join focused circles by location and purpose.",
        path: routes.app.user.community,
      },
      {
        id: "community-feed",
        icon: Compass,
        title: "Community Feed",
        description: "Follow active conversations and shared moments.",
        path: routes.app.user.community,
      },
    ],
    [],
  );

  const stats = useMemo<RoleDashboardStat[]>(() => {
    const activeMembers = communityPosts.length * 52;
    const registrations = 9;
    const liveAttendance = 430;
    const donations = wallet.transactions
      .filter((item) => item.type === "donation")
      .reduce((sum, item) => sum + item.amount, 0);

    return [
      {
        id: "stat-live-attendance",
        label: "Live attendance",
        value: `${liveAttendance}`,
        hint: "Members currently in live experiences",
        tone: "emerald",
      },
      {
        id: "stat-donations",
        label: "Donations received",
        value: `$${donations.toFixed(0)}`,
        hint: "Wallet-backed support this period",
        tone: "orange",
      },
      {
        id: "stat-registrations",
        label: "Event registrations",
        value: `${registrations}`,
        hint: "Upcoming event RSVPs",
        tone: "slate",
      },
      {
        id: "stat-members",
        label: "Active members",
        value: `${activeMembers}`,
        hint: "Community participation across modules",
        tone: "emerald",
      },
      {
        id: "stat-content-views",
        label: "Content views",
        value: "12.4k",
        hint: "Replay and series engagement",
        tone: "slate",
      },
    ];
  }, [communityPosts.length, wallet.transactions]);

  return (
    <RoleDashboardShell
      role="user"
      kicker="MEMBER JOURNEY"
      title="Welcome back to your FaithHub dashboard"
      subtitle="Discover sessions, stay engaged with your community, and support active missions from one connected workspace."
      profile={{
        name: user?.name || "Faith member",
        roleLabel: "User",
        community: "FaithHub Community",
        status: "Active",
      }}
      notifications={notifications}
      resumeItems={resumeItems}
      cards={cards}
      communityModules={communityModules}
      stats={stats}
      defaultDonatePath={routes.app.user.giving}
    />
  );
}
