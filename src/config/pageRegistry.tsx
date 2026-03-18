import React, { lazy } from "react";
import { BadgeCheck, Building2, BookOpen, CalendarDays, Clock3, Compass, FileText, HeartHandshake, Home, KeyRound, Layers3, LayoutDashboard, MessageSquare, MonitorPlay, PlayCircle, Radio, Settings2, ShieldCheck, Sparkles, Users, Wallet, Bell, Send } from "lucide-react";
import { faithHubRouteAliases, routes } from "@/constants/routes";

export type RoleKey = "user" | "provider" | "admin";

const FaithHubEntry = lazy(() => import("@/pages/user/FaithHubEntry"));
const FaithHubAuthCenter = lazy(() => import("@/pages/user/FaithHubAuthCenter"));
const FaithHubProfilePreferences = lazy(() => import("@/pages/user/FaithHubProfilePreferences"));
const FaithHubHome = lazy(() => import("@/pages/user/FaithHubHome"));
const DiscoverInstitutions = lazy(() => import("@/pages/user/DiscoverInstitutions"));
const InstitutionProfile = lazy(() => import("@/pages/user/InstitutionProfile"));
const FaithHubSeriesLibrary = lazy(() => import("@/pages/user/FaithHubSeriesLibrary"));
const FaithHubSeriesDetail = lazy(() => import("@/pages/user/FaithHubSeriesDetail"));
const FaithHubEpisodeDetail = lazy(() => import("@/pages/user/FaithHubEpisodeDetail"));
const FaithHubReplaySermonPlayer = lazy(() => import("@/pages/user/FaithHubReplaySermonPlayer"));
const FaithHubClipViewer = lazy(() => import("@/pages/user/FaithHubClipViewer"));
const FaithHubLiveHub = lazy(() => import("@/pages/user/FaithHubLiveHub"));
const FaithHubLiveWaitingRoom = lazy(() => import("@/pages/user/FaithHubLiveWaitingRoom"));
const FaithHubLivePlayer = lazy(() => import("@/pages/user/FaithHubLivePlayer"));
const FaithHubLiveChatQA = lazy(() => import("@/pages/user/FaithHubLiveChatQA"));
const FaithHubEventsHub = lazy(() => import("@/pages/user/FaithHubEventsHub"));
const FaithHubEventDetail = lazy(() => import("@/pages/user/FaithHubEventDetail"));
const FaithHubGiving = lazy(() => import("@/pages/user/FaithHubGiving"));
const FaithHubSubscriptionsMembership = lazy(() => import("@/pages/user/FaithHubSubscriptionsMembership"));
const FaithHubReviews = lazy(() => import("@/pages/user/FaithHubReviews"));
const FaithHubSettings = lazy(() => import("@/pages/user/FaithHubSettings"));
const FaithHubProviderOnboarding = lazy(() => import("@/pages/provider/FaithHubProviderOnboarding"));
const FaithHubProviderDashboard = lazy(() => import("@/pages/provider/FaithHubProviderDashboard"));
const FaithHubSeriesBuilder = lazy(() => import("@/pages/provider/FaithHubSeriesBuilder"));
const FaithHubEpisodeBuilder = lazy(() => import("@/pages/provider/FaithHubEpisodeBuilder"));
const FaithHubPostLivePublishing = lazy(() => import("@/pages/provider/FaithHubPostLivePublishing"));
const FaithHubLiveBuilderSeriesAware = lazy(() => import("@/pages/provider/FaithHubLiveBuilderSeriesAware"));
const FaithHubLiveSchedule = lazy(() => import("@/pages/provider/FaithHubLiveSchedule"));
const FaithHubLiveDashboardOperations = lazy(() => import("@/pages/provider/FaithHubLiveDashboardOperations"));
const FaithHubLiveStudio = lazy(() => import("@/pages/provider/FaithHubLiveStudio"));
const FaithHubStreamToPlatforms = lazy(() => import("@/pages/provider/FaithHubStreamToPlatforms"));
const FaithHubAudienceNotifications = lazy(() => import("@/pages/provider/FaithHubAudienceNotifications"));
const FaithHubChannelsContactManager = lazy(() => import("@/pages/provider/FaithHubChannelsContactManager"));
const FaithHubEventsManager = lazy(() => import("@/pages/provider/FaithHubEventsManager"));
const FaithHubDonationsFunds = lazy(() => import("@/pages/provider/FaithHubDonationsFunds"));
const FaithHubReviewsModeration = lazy(() => import("@/pages/provider/FaithHubReviewsModeration"));
const FaithHubAdminOverview = lazy(() => import("@/pages/admin/FaithHubAdminOverview"));
const FaithHubInstitutionVerificationCompliance = lazy(() => import("@/pages/admin/FaithHubInstitutionVerificationCompliance"));
const FaithHubLiveModerationConsole = lazy(() => import("@/pages/admin/FaithHubLiveModerationConsole"));
const FaithHubContentPolicyTaxonomy = lazy(() => import("@/pages/admin/FaithHubContentPolicyTaxonomy"));
const FaithHubPaymentsDonationsDisputes = lazy(() => import("@/pages/admin/FaithHubPaymentsDonationsDisputes"));
const FaithHubChannelsRegistryDeliverability = lazy(() => import("@/pages/admin/FaithHubChannelsRegistryDeliverability"));
const FaithHubSecurityAuditLogs = lazy(() => import("@/pages/admin/FaithHubSecurityAuditLogs"));

export interface PageRegistryItem {
  id: string;
  role: RoleKey;
  section: string;
  label: string;
  navTag: string;
  path: string;
  routePatterns: string[];
  template: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  element: React.LazyExoticComponent<React.ComponentType>;
}

type BasePageRegistryItem = Omit<PageRegistryItem, "navTag" | "routePatterns">;

const basePageRegistry: BasePageRegistryItem[] = [
  { id: "u-entry", role: "user", section: "Start & Identity", label: "FaithHub Entry", path: "/app/user/entry", template: "T2", description: "First-run entry and low-data welcome.", icon: Sparkles, element: FaithHubEntry },
  { id: "u-auth", role: "user", section: "Start & Identity", label: "Sign-in / Sign-up / Recovery", path: "/app/user/auth", template: "T3", description: "Authentication and account recovery.", icon: KeyRound, element: FaithHubAuthCenter },
  { id: "u-profile", role: "user", section: "Start & Identity", label: "Profile & Faith Preferences", path: "/app/user/profile", template: "T3", description: "Profile, faith preferences, privacy, and audience groups.", icon: Users, element: FaithHubProfilePreferences },
  { id: "u-home", role: "user", section: "Discovery & Institutions", label: "Home", path: "/app/user/home", template: "T1", description: "Personalized feed, continue watching, and intent buckets.", icon: Home, element: FaithHubHome },
  { id: "u-discover", role: "user", section: "Discovery & Institutions", label: "Discover Institutions", path: "/app/user/discover", template: "T1", description: "Institution search, list, and map discovery.", icon: Compass, element: DiscoverInstitutions },
  { id: "u-institution", role: "user", section: "Discovery & Institutions", label: "Institution Profile", path: "/app/user/institution", template: "T2", description: "Institution detail, channels, series, and giving.", icon: Building2, element: InstitutionProfile },
  { id: "u-series-library", role: "user", section: "Series & Content", label: "Series Library", path: "/app/user/series", template: "T1", description: "Series browsing and filtering.", icon: BookOpen, element: FaithHubSeriesLibrary },
  { id: "u-series-detail", role: "user", section: "Series & Content", label: "Series Detail", path: "/app/user/series/detail", template: "T2", description: "Series overview and episode progression.", icon: Layers3, element: FaithHubSeriesDetail },
  { id: "u-episode-detail", role: "user", section: "Series & Content", label: "Episode Detail", path: "/app/user/episode", template: "T2", description: "Episode replay, resources, and notes.", icon: FileText, element: FaithHubEpisodeDetail },
  { id: "u-replay-player", role: "user", section: "Series & Content", label: "Replay & Sermon Player", path: "/app/user/replay", template: "T5", description: "Replay player with chapters and transcript awareness.", icon: PlayCircle, element: FaithHubReplaySermonPlayer },
  { id: "u-clip-viewer", role: "user", section: "Series & Content", label: "Clip Viewer", path: "/app/user/clips", template: "T2", description: "Short clip consumption and sharing.", icon: PlayCircle, element: FaithHubClipViewer },
  { id: "u-live-hub", role: "user", section: "Live Sessionz", label: "Live Hub", path: "/app/user/live", template: "T1", description: "Now Live, Upcoming, Replays.", icon: Radio, element: FaithHubLiveHub },
  { id: "u-waiting-room", role: "user", section: "Live Sessionz", label: "Live Waiting Room", path: "/app/user/live/waiting-room", template: "T2", description: "Countdown, agenda, and pre-live interaction.", icon: Clock3, element: FaithHubLiveWaitingRoom },
  { id: "u-live-player", role: "user", section: "Live Sessionz", label: "Live Player", path: "/app/user/live/player", template: "T5", description: "Live playback, chat, and interaction.", icon: MonitorPlay, element: FaithHubLivePlayer },
  { id: "u-live-chat", role: "user", section: "Live Sessionz", label: "Live Chat & Q&A", path: "/app/user/live/chat", template: "T7", description: "Chat and moderated Q&A lane.", icon: MessageSquare, element: FaithHubLiveChatQA },
  { id: "u-events-hub", role: "user", section: "Events, Giving & Membership", label: "Events Hub", path: "/app/user/events", template: "T1", description: "Faith events discovery and RSVP.", icon: CalendarDays, element: FaithHubEventsHub },
  { id: "u-event-detail", role: "user", section: "Events, Giving & Membership", label: "Event Detail", path: "/app/user/events/detail", template: "T2", description: "Event schedule, tickets, and venue details.", icon: CalendarDays, element: FaithHubEventDetail },
  { id: "u-giving", role: "user", section: "Events, Giving & Membership", label: "Giving", path: "/app/user/giving", template: "T2", description: "Funds, recurring gifts, and receipts.", icon: HeartHandshake, element: FaithHubGiving },
  { id: "u-membership", role: "user", section: "Events, Giving & Membership", label: "Subscriptions & Membership", path: "/app/user/membership", template: "T3", description: "Plan comparison and entitlements.", icon: BadgeCheck, element: FaithHubSubscriptionsMembership },
  { id: "u-reviews", role: "user", section: "Trust & Settings", label: "Reviews", path: "/app/user/reviews", template: "T7", description: "Structured reviews and abuse reporting.", icon: MessageSquare, element: FaithHubReviews },
  { id: "u-settings", role: "user", section: "Trust & Settings", label: "Settings", path: "/app/user/settings", template: "T3", description: "Language, notifications, privacy, and downloads.", icon: Settings2, element: FaithHubSettings },
  { id: "p-onboarding", role: "provider", section: "Onboarding & Core HQ", label: "Provider Onboarding", path: "/app/provider/onboarding", template: "T3", description: "Institution onboarding and verification setup.", icon: Building2, element: FaithHubProviderOnboarding },
  { id: "p-dashboard", role: "provider", section: "Onboarding & Core HQ", label: "Provider Dashboard", path: "/app/provider/dashboard", template: "T1", description: "Operations, KPIs, and live health.", icon: LayoutDashboard, element: FaithHubProviderDashboard },
  { id: "p-series-builder", role: "provider", section: "Content Studio", label: "Series Builder", path: "/app/provider/series-builder", template: "T3", description: "Create and manage series.", icon: BookOpen, element: FaithHubSeriesBuilder },
  { id: "p-episode-builder", role: "provider", section: "Content Studio", label: "Episode Builder", path: "/app/provider/episode-builder", template: "T3", description: "Build episodes, resources, and live links.", icon: FileText, element: FaithHubEpisodeBuilder },
  { id: "p-post-live", role: "provider", section: "Content Studio", label: "Post-live Publishing", path: "/app/provider/post-live", template: "T3", description: "Replay publishing, clips, and transcript flows.", icon: FileText, element: FaithHubPostLivePublishing },
  { id: "p-live-builder", role: "provider", section: "Live Operations", label: "Live Builder", path: "/app/provider/live-builder", template: "T3", description: "Schedule and configure live sessions.", icon: Radio, element: FaithHubLiveBuilderSeriesAware },
  { id: "p-live-schedule", role: "provider", section: "Live Operations", label: "Live Schedule", path: "/app/provider/live-schedule", template: "T4", description: "Calendar scheduling, staffing, and readiness workflows.", icon: CalendarDays, element: FaithHubLiveSchedule },
  { id: "p-live-ops", role: "provider", section: "Live Operations", label: "Live Dashboard", path: "/app/provider/live-ops", template: "T6", description: "Ingest health, stream key, and operations metrics.", icon: MonitorPlay, element: FaithHubLiveDashboardOperations },
  { id: "p-live-studio", role: "provider", section: "Live Operations", label: "Live Studio", path: "/app/provider/live-studio", template: "T6", description: "Host controls, scenes, captions, and co-host management.", icon: MonitorPlay, element: FaithHubLiveStudio },
  { id: "p-stream-platforms", role: "provider", section: "Live Operations", label: "Stream-to-Platforms", path: "/app/provider/stream-to-platforms", template: "T3", description: "Destinations, broadcasts, and simulcast configuration.", icon: Send, element: FaithHubStreamToPlatforms },
  { id: "p-notifications", role: "provider", section: "Audience & Distribution", label: "Audience Notifications", path: "/app/provider/notifications", template: "T3", description: "Reminder plans and notification journeys.", icon: Bell, element: FaithHubAudienceNotifications },
  { id: "p-contacts", role: "provider", section: "Audience & Distribution", label: "Channels & Contact Manager", path: "/app/provider/contacts", template: "T1", description: "Contacts, consent, channels, and sender lines.", icon: Users, element: FaithHubChannelsContactManager },
  { id: "p-events", role: "provider", section: "Commerce, Funds & Trust", label: "Events Manager", path: "/app/provider/events", template: "T3", description: "Event operations, tickets, volunteers, and check-in.", icon: CalendarDays, element: FaithHubEventsManager },
  { id: "p-funds", role: "provider", section: "Commerce, Funds & Trust", label: "Donations & Funds", path: "/app/provider/funds", template: "T3", description: "Funds, donor segmentation, and payouts.", icon: Wallet, element: FaithHubDonationsFunds },
  { id: "p-reviews-mod", role: "provider", section: "Commerce, Funds & Trust", label: "Reviews & Moderation", path: "/app/provider/reviews-moderation", template: "T8", description: "Provider-side review response and moderation workflows.", icon: ShieldCheck, element: FaithHubReviewsModeration },
  { id: "a-overview", role: "admin", section: "Global Control", label: "Admin Overview", path: "/app/admin/overview", template: "T8", description: "Global KPIs, incidents, and anomalies.", icon: LayoutDashboard, element: FaithHubAdminOverview },
  { id: "a-verification", role: "admin", section: "Verification & Trust", label: "Institution Verification & Compliance", path: "/app/admin/verification", template: "T8", description: "Provider approvals, badges, and disputes.", icon: BadgeCheck, element: FaithHubInstitutionVerificationCompliance },
  { id: "a-live-mod", role: "admin", section: "Verification & Trust", label: "Live Moderation Console", path: "/app/admin/live-moderation", template: "T8", description: "Global live moderation and takedown operations.", icon: ShieldCheck, element: FaithHubLiveModerationConsole },
  { id: "a-policy", role: "admin", section: "Verification & Trust", label: "Content Policy & Taxonomy", path: "/app/admin/policy", template: "T8", description: "Taxonomy, policy notices, and localized overrides.", icon: Sparkles, element: FaithHubContentPolicyTaxonomy },
  { id: "a-finance", role: "admin", section: "Finance & Channels", label: "Payments, Donations & Disputes", path: "/app/admin/finance", template: "T8", description: "Fees, disputes, refunds, payouts, and risk scoring.", icon: Wallet, element: FaithHubPaymentsDonationsDisputes },
  { id: "a-channels", role: "admin", section: "Finance & Channels", label: "Channels Registry & Deliverability", path: "/app/admin/channels", template: "T8", description: "Templates, sender reputation, and deliverability oversight.", icon: Send, element: FaithHubChannelsRegistryDeliverability },
  { id: "a-security", role: "admin", section: "Security & Evidence", label: "Security & Audit Logs", path: "/app/admin/security", template: "T8", description: "Audit trails, immutable logs, and SIEM posture.", icon: Settings2, element: FaithHubSecurityAuditLogs },
];

const navTagById: Record<string, string> = {
  "u-entry": "Start",
  "u-auth": "Access",
  "u-profile": "Profile",
  "u-home": "Home",
  "u-discover": "Discover",
  "u-institution": "Institution",
  "u-series-library": "Series",
  "u-series-detail": "Series",
  "u-episode-detail": "Episode",
  "u-replay-player": "Replay",
  "u-clip-viewer": "Clips",
  "u-live-hub": "Live",
  "u-waiting-room": "Waiting",
  "u-live-player": "Player",
  "u-live-chat": "Chat",
  "u-events-hub": "Events",
  "u-event-detail": "Event",
  "u-giving": "Giving",
  "u-membership": "Member",
  "u-reviews": "Reviews",
  "u-settings": "Settings",
  "p-onboarding": "Onboard",
  "p-dashboard": "Dashboard",
  "p-series-builder": "Builder",
  "p-episode-builder": "Episode",
  "p-post-live": "Publish",
  "p-live-builder": "Live",
  "p-live-schedule": "Schedule",
  "p-live-ops": "Ops",
  "p-live-studio": "Studio",
  "p-stream-platforms": "Stream",
  "p-notifications": "Notify",
  "p-contacts": "Contacts",
  "p-events": "Events",
  "p-funds": "Funds",
  "p-reviews-mod": "Moderate",
  "a-overview": "Overview",
  "a-verification": "Verify",
  "a-live-mod": "Moderate",
  "a-policy": "Policy",
  "a-finance": "Finance",
  "a-channels": "Channels",
  "a-security": "Security",
};

function resolveNavTag(page: BasePageRegistryItem) {
  const explicitTag = navTagById[page.id];
  if (explicitTag) return explicitTag;
  return page.label.match(/[A-Za-z0-9]+/)?.[0] || "Page";
}

export const pageRegistry: PageRegistryItem[] = basePageRegistry.map((page) => ({
  ...page,
  navTag: resolveNavTag(page),
  routePatterns: [page.path, ...(faithHubRouteAliases[page.path] || [])],
}));

export function getRoutePatterns(page: Pick<PageRegistryItem, "path" | "routePatterns">) {
  if (page.routePatterns?.length) return page.routePatterns;
  return [page.path];
}

export const defaultPageForRole: Record<RoleKey, string> = {
  user: routes.app.user.home,
  provider: routes.app.provider.dashboard,
  admin: routes.app.admin.overview,
};

export const pagesByRole = pageRegistry.reduce((acc, page) => { (acc[page.role] ||= []).push(page); return acc; }, {} as Record<RoleKey, PageRegistryItem[]>);





