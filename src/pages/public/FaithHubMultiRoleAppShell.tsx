// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  Compass,
  FileText,
  Globe2,
  HeartHandshake,
  Home,
  KeyRound,
  Layers3,
  LayoutDashboard,
  Menu,
  MessageSquare,
  MonitorPlay,
  PanelLeftClose,
  PanelLeftOpen,
  Pin,
  Plus,
  Radio,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { defaultPageForRole, pageRegistry } from "@/config/pageRegistry";

const roleCatalog = {
  user: {
    label: "User",
    shortLabel: "User",
    workspace: "My Faith Space",
    subtitle: "Discovery, worship, series, live, events, and giving",
    heroTitle: "Role-aware FaithHub App Shell",
    heroText:
      "A premium shell for personal faith journeys with fast switching into provider mode, full route inventory access, strong discovery patterns, and a polished responsive experience across desktop, tablet, and phone.",
    primaryAction: "Go to Home",
    secondaryAction: "Join Live Hub",
    stats: [
      { label: "Assigned pages", value: "18", note: "User journey surfaces" },
      { label: "Live-ready modules", value: "6", note: "Waiting room to replay" },
      { label: "Commerce touchpoints", value: "4", note: "Events, giving, subscriptions" },
      { label: "Trust surfaces", value: "3", note: "Reviews, privacy, settings" },
    ],
    quickActions: [
      { label: "Join live", icon: Radio },
      { label: "Discover institutions", icon: Compass },
      { label: "Open giving", icon: HeartHandshake },
      { label: "View events", icon: CalendarDays },
    ],
    alerts: [
      { title: "Upcoming live reminder", detail: "Wisdom for the Next Season starts tonight at 7:30 PM.", tone: "success" },
      { title: "Downloaded sermons ready", detail: "3 offline assets synced to this device.", tone: "neutral" },
      { title: "Privacy settings updated", detail: "Your audience groups and visibility controls were saved recently.", tone: "neutral" },
    ],
    activity: [
      "Resumed Wednesday Healing Service replay",
      "Saved Youth Worship Camp event",
      "Set reminder for next live session",
      "Opened Family Ministry series",
    ],
    sections: [
      {
        title: "Start & Identity",
        items: [
          { id: "u-entry", label: "FaithHub Entry", route: "/faithhub/entry", template: "T2", description: "Minimal first-run entry with low-data prompts and resume state.", icon: Sparkles },
          { id: "u-auth", label: "Sign-in / Sign-up / Recovery", route: "/faithhub/auth", template: "T3", description: "Accessible auth with OTP, passkeys, trust, and recovery.", icon: KeyRound },
          { id: "u-profile", label: "Profile & Faith Preferences", route: "/faithhub/profile", template: "T3", description: "Identity, faith preferences, audience groups, and privacy control.", icon: Users },
        ],
      },
      {
        title: "Discovery & Institutions",
        items: [
          { id: "u-home", label: "Home", route: "/faithhub/home", template: "T1", description: "Personalized feed, continue watching, buckets, and data saver.", icon: Home },
          { id: "u-discover", label: "Discover Institutions", route: "/faithhub/discover", template: "T1", description: "Institution search with filters, map/list toggle, and nearby context.", icon: Compass },
          { id: "u-institution", label: "Institution Profile", route: "/faithhub/institution/:id", template: "T2", description: "Institution overview, channels, events, giving, and membership layers.", icon: Building2 },
        ],
      },
      {
        title: "Series & Content",
        items: [
          { id: "u-series-library", label: "Series Library", route: "/faithhub/series", template: "T1", description: "Series browsing, filtering, progress, reminders, and downloaded assets.", icon: BookOpen },
          { id: "u-series-detail", label: "Series Detail", route: "/faithhub/series/:seriesId", template: "T2", description: "Series overview, episode list, calendar sync, and merchandise tie-ins.", icon: Layers3 },
          { id: "u-episode-detail", label: "Episode Detail", route: "/faithhub/episodes/:episodeId", template: "T2", description: "Replay assets, notes, chapters, next-up autoplay, and premium resources.", icon: FileText },
        ],
      },
      {
        title: "Live Sessionz",
        items: [
          { id: "u-live-hub", label: "Live Hub", route: "/faithhub/live", template: "T1", description: "Now Live, Upcoming, Replays with institution, series, and audience filters.", icon: Radio },
          { id: "u-waiting-room", label: "Live Waiting Room", route: "/faithhub/live/waiting-room/:sessionId", template: "T2", description: "Countdown, pre-chat, prayer requests, and language settings before live starts.", icon: Clock3 },
          { id: "u-live-player", label: "Live Player", route: "/faithhub/live/:sessionId", template: "T5", description: "Playback, captions, translation, chat, reports, and donor/member engagement.", icon: MonitorPlay },
        ],
      },
      {
        title: "Events, Giving & Membership",
        items: [
          { id: "u-events-hub", label: "Events Hub", route: "/faithhub/events", template: "T1", description: "Faith events with map, calendar, RSVP, and FaithMart ticketing paths.", icon: CalendarDays },
          { id: "u-event-detail", label: "Event Detail", route: "/faithhub/events/:eventId", template: "T2", description: "Schedule, venue, speakers, tickets, waivers, and event chat.", icon: CalendarDays },
          { id: "u-giving", label: "Giving", route: "/faithhub/giving", template: "T2", description: "Funds, recurring gifts, receipts, round-up, and supporter memberships.", icon: HeartHandshake },
          { id: "u-membership", label: "Subscriptions & Membership", route: "/faithhub/membership", template: "T3", description: "Plans, entitlements, family sharing, and billing state.", icon: BadgeCheck },
        ],
      },
      {
        title: "Trust & Settings",
        items: [
          { id: "u-reviews", label: "Reviews", route: "/faithhub/reviews", template: "T7", description: "Structured reviews for sessions, series, and institutions with trust-aware moderation.", icon: MessageSquare },
          { id: "u-settings", label: "Settings", route: "/faithhub/settings", template: "T3", description: "Language, notifications, privacy, downloads, blocked users, and family-safe modes.", icon: Settings2 },
        ],
      },
    ],
  },
  provider: {
    label: "Provider",
    shortLabel: "Provider",
    workspace: "Institution Workspace",
    subtitle: "Institution operations, publishing, live control, messaging, and trust",
    heroTitle: "Provider-grade operating shell",
    heroText:
      "A premium shell for ministries, institutions, and faith organizations with role-aware navigation, content builders, live production tooling, operations dashboards, and audience management built into one workspace.",
    primaryAction: "Open Dashboard",
    secondaryAction: "Create Live Session",
    stats: [
      { label: "Assigned pages", value: "15", note: "Provider operations stack" },
      { label: "Studio & live ops", value: "6", note: "Builder to control room" },
      { label: "Audience systems", value: "3", note: "Notifications, contacts, publishing" },
      { label: "Commerce & trust", value: "3", note: "Events, funds, reviews" },
    ],
    quickActions: [
      { label: "New series", icon: BookOpen },
      { label: "Schedule live", icon: Radio },
      { label: "Create event", icon: CalendarDays },
      { label: "Open contacts", icon: Users },
    ],
    alerts: [
      { title: "Stream health watch", detail: "One rehearsal feed is above the preferred latency threshold.", tone: "warning" },
      { title: "Publishing queue", detail: "2 replay assets are waiting for final post-live approval.", tone: "neutral" },
      { title: "Audience journey ready", detail: "Pre-live to replay notification automation is configured for tonight.", tone: "success" },
    ],
    activity: [
      "Saved Series Builder draft",
      "Updated stream destinations",
      "Reviewed donor privacy settings",
      "Queued event check-in tokens",
    ],
    sections: [
      {
        title: "Onboarding & Core HQ",
        items: [
          { id: "p-onboarding", label: "Provider Onboarding", route: "/provider/onboarding", template: "T3", description: "Institution profile, verification docs, taxonomy, locations, and staff setup.", icon: Building2 },
          { id: "p-dashboard", label: "Provider Dashboard", route: "/provider/dashboard", template: "T1", description: "KPIs, live health, moderation queue, anomaly alerts, and premium analytics posture.", icon: LayoutDashboard },
        ],
      },
      {
        title: "Content Studio",
        items: [
          { id: "p-series-builder", label: "Series Builder", route: "/provider/series-builder", template: "T3", description: "Series creation, artwork, audience targets, localization, and premium publishing options.", icon: BookOpen },
          { id: "p-episode-builder", label: "Episode Builder", route: "/provider/episode-builder", template: "T3", description: "Episode content, resources, live links, AI outlines, and premium gating.", icon: FileText },
          { id: "p-post-live", label: "Post-live Publishing", route: "/provider/post-live", template: "T3", description: "Replay visibility, chapters, transcript search, clips, and repost workflows.", icon: FileText },
        ],
      },
      {
        title: "Live Operations",
        items: [
          { id: "p-live-builder", label: "Live Builder", route: "/provider/live-builder", template: "T3", description: "Series-aware or standalone live session setup with roster, routing, and monetization toggles.", icon: Radio },
          { id: "p-live-schedule", label: "Live Schedule", route: "/provider/live-schedule", template: "T4", description: "Calendar scheduling, conflicts, staff assignments, recurrence, and resource booking.", icon: CalendarDays },
          { id: "p-live-ops", label: "Live Dashboard", route: "/provider/live-ops", template: "T6", description: "Ingest health, stream key, bitrate, viewer metrics, and reliability add-ons.", icon: MonitorPlay },
          { id: "p-live-studio", label: "Live Studio", route: "/provider/live-studio", template: "T6", description: "Host controls, co-hosts, scenes, overlays, captions, and premium production tooling.", icon: MonitorPlay },
          { id: "p-stream-platforms", label: "Stream-to-Platforms", route: "/provider/stream-platforms", template: "T3", description: "Destination credentials, broadcast creation, bitrate profiles, and premium clipping packages.", icon: Send },
        ],
      },
      {
        title: "Audience & Distribution",
        items: [
          { id: "p-notifications", label: "Audience Notifications", route: "/provider/notifications", template: "T3", description: "Reminder plans, channel mix, localization, smart send time, and journey automation.", icon: Bell },
          { id: "p-contacts", label: "Channels & Contact Manager", route: "/provider/contacts", template: "T1", description: "Contacts, segments, opt-ins, sender lines, and template-aware channel governance.", icon: Users },
        ],
      },
      {
        title: "Commerce, Funds & Trust",
        items: [
          { id: "p-events", label: "Events Manager", route: "/provider/events", template: "T3", description: "Event setup, agenda, capacity, ticket links, check-in, and premium routing rules.", icon: CalendarDays },
          { id: "p-funds", label: "Donations & Funds", route: "/provider/funds", template: "T3", description: "Funds, donor segmentation, recurring options, payouts, and reconciliation posture.", icon: Wallet },
          { id: "p-reviews-mod", label: "Reviews & Moderation", route: "/provider/reviews-moderation", template: "T8", description: "Provider responses, hide/report flows, appeals, anti-brigade signals, and toxicity assist.", icon: ShieldCheck },
        ],
      },
    ],
  },
  admin: {
    label: "Admin",
    shortLabel: "Admin",
    workspace: "Global Control Tower",
    subtitle: "Verification, policy, moderation, finance, channels, and security",
    heroTitle: "Cross-platform admin control shell",
    heroText:
      "A premium shell for system-wide oversight with live incident visibility, institution verification, channel governance, finance supervision, and security telemetry across FaithHub and related EVzone modules.",
    primaryAction: "Open Admin Overview",
    secondaryAction: "Launch Moderation Console",
    stats: [
      { label: "Assigned pages", value: "7", note: "Global governance surfaces" },
      { label: "Trust-critical modules", value: "5", note: "Verification, moderation, policy, security, finance" },
      { label: "Live oversight points", value: "3", note: "Sessions, moderation, incidents" },
      { label: "Premium admin suites", value: "4", note: "BI, audit, policy sim, deliverability" },
    ],
    quickActions: [
      { label: "Open incidents", icon: Activity },
      { label: "Review providers", icon: Building2 },
      { label: "Open moderation", icon: ShieldCheck },
      { label: "Export audit", icon: FileText },
    ],
    alerts: [
      { title: "Critical moderation case", detail: "A high-severity live room requires immediate action review.", tone: "warning" },
      { title: "Verification backlog", detail: "Compliance queue is above target in two regions.", tone: "neutral" },
      { title: "Security checkpoint complete", detail: "Immutable audit snapshot completed successfully.", tone: "success" },
    ],
    activity: [
      "Opened live moderation console",
      "Reviewed payout dispute case",
      "Updated localized policy strings",
      "Exported audit bundle",
    ],
    sections: [
      {
        title: "Global Control",
        items: [
          { id: "a-overview", label: "Admin Overview", route: "/admin/overview", template: "T8", description: "Global KPIs, live sessions running, incident alerts, anomalies, and BI export posture.", icon: LayoutDashboard },
        ],
      },
      {
        title: "Verification & Trust",
        items: [
          { id: "a-verification", label: "Institution Verification & Compliance", route: "/admin/verification", template: "T8", description: "Provider approvals, badges, role disputes, identity workflows, and compliance packs.", icon: BadgeCheck },
          { id: "a-live-mod", label: "Live Moderation Console", route: "/admin/live-moderation", template: "T8", description: "Global live chat moderation, takedowns, bans, reporting queue, and media safety screening.", icon: ShieldCheck },
          { id: "a-policy", label: "Content Policy & Taxonomy", route: "/admin/policy", template: "T8", description: "Taxonomy, labels, prohibited content notices, localized strings, and country overrides.", icon: Sparkles },
        ],
      },
      {
        title: "Finance & Channels",
        items: [
          { id: "a-finance", label: "Payments, Donations & Disputes", route: "/admin/finance", template: "T8", description: "Fee reconciliation, refund workflows, payouts oversight, dispute handling, and risk scoring.", icon: Wallet },
          { id: "a-channels", label: "Channels Registry & Deliverability", route: "/admin/channels", template: "T8", description: "Allowed channel types, templates, sender reputation, and deliverability governance.", icon: Send },
        ],
      },
      {
        title: "Security & Evidence",
        items: [
          { id: "a-security", label: "Security & Audit Logs", route: "/admin/security", template: "T8", description: "Audit log explorer, immutable records, exports, and SIEM integration posture.", icon: Settings2 },
        ],
      },
    ],
  },
};

const roleOrder = ["user", "provider", "admin"];

const workspaceOptions = {
  user: ["My Faith Space", "Family View", "Following Feed"],
  provider: ["FaithHub Global Chapel", "Kampala Main Campus", "Entebbe Outreach Campus"],
  admin: ["Global Control Tower", "Verification Desk", "Live Trust Desk"],
};

const shellCapabilities = [
  { title: "Role-aware sidebar", detail: "Each role gets its own grouped route inventory with quick switching and pinned access." },
  { title: "Global command palette", detail: "Search every assigned page across User, Provider, and Admin from one control surface." },
  { title: "Workspace and identity layer", detail: "Context switching for personal space, institutional workspace, and global admin oversight." },
  { title: "Top bar actions", detail: "Unified search, alerts, quick actions, sync status, and role switching at all breakpoints." },
  { title: "Responsive navigation", detail: "Desktop sidebar, mobile drawer, and compact bottom dock for fast movement on any device." },
  { title: "Right rail intelligence", detail: "Pinned pages, activity, alerts, and operational context without overwhelming the main surface." },
];

const mobileDockItems = [
  { id: "dock-home", label: "Home", icon: Home },
  { id: "dock-live", label: "Live", icon: Radio },
  { id: "dock-actions", label: "Create", icon: Plus },
  { id: "dock-events", label: "Events", icon: CalendarDays },
  { id: "dock-settings", label: "Settings", icon: Settings2 },
];

function flattenPages(catalog) {
  return Object.entries(catalog).flatMap(([roleKey, roleData]) =>
    roleData.sections.flatMap((section) =>
      section.items.map((item) => ({
        ...item,
        role: roleKey,
        roleLabel: roleData.label,
        sectionTitle: section.title,
      }))
    )
  );
}

const allPages = flattenPages(roleCatalog);

function getRoleAccent(role) {
  if (role === "provider") return "text-[#f77f00]";
  if (role === "admin") return "text-slate-900";
  return "text-[#03cd8c]";
}

function getRoleBadge(role) {
  if (role === "provider") return "bg-[#fff8ef] text-[#f77f00]";
  if (role === "admin") return "bg-slate-900 text-white";
  return "bg-[#ecfff8] text-[#03cd8c]";
}

export default function FaithHubMultiRoleAppShell() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [workspace, setWorkspace] = useState(workspaceOptions.user[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [recent, setRecent] = useState(["u-home", "p-dashboard", "a-overview"]);
  const [pinned, setPinned] = useState(["u-home", "p-dashboard", "a-overview", "p-live-studio"]);
  const [activePages, setActivePages] = useState({
    user: "u-home",
    provider: "p-dashboard",
    admin: "a-overview",
  });

  const roleData = roleCatalog[role];
  const currentPageId = activePages[role];
  const currentPage = roleData.sections.flatMap((section) => section.items).find((item) => item.id === currentPageId);
  const currentSection = roleData.sections.find((section) => section.items.some((item) => item.id === currentPageId));
  const routeById = useMemo(() => Object.fromEntries(pageRegistry.map((page) => [page.id, page.path])), []);

  const paletteResults = useMemo(() => {
    const term = paletteQuery.trim().toLowerCase();
    if (!term) return allPages;
    return allPages.filter((page) => {
      return (
        page.label.toLowerCase().includes(term) ||
        page.route.toLowerCase().includes(term) ||
        page.description.toLowerCase().includes(term) ||
        page.roleLabel.toLowerCase().includes(term) ||
        page.sectionTitle.toLowerCase().includes(term)
      );
    });
  }, [paletteQuery]);

  const rolePinned = pinned
    .map((id) => allPages.find((page) => page.id === id))
    .filter(Boolean)
    .slice(0, 5);

  const handleRoleSwitch = (nextRole) => {
    setRole(nextRole);
    setWorkspace(workspaceOptions[nextRole][0]);
    setPaletteQuery("");
    setMobileNavOpen(false);
  };

  const goToPage = (targetRole, pageId) => {
    setActivePages((prev) => ({ ...prev, [targetRole]: pageId }));
    setRole(targetRole);
    setWorkspace(workspaceOptions[targetRole][0]);
    setPaletteOpen(false);
    setMobileNavOpen(false);
    setRecent((prev) => {
      const next = [pageId, ...prev.filter((item) => item !== pageId)];
      return next.slice(0, 8);
    });

    const resolvedRoute = routeById[pageId];
    if (resolvedRoute) {
      navigate(resolvedRoute);
      return;
    }

    // If a page isn't wired in the real router yet, keep the shell-preview behaviour.
  };

  const togglePin = (pageId) => {
    setPinned((prev) =>
      prev.includes(pageId) ? prev.filter((item) => item !== pageId) : [pageId, ...prev].slice(0, 8)
    );
  };

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <TopBar
        role={role}
        roleData={roleData}
        workspace={workspace}
        setWorkspace={setWorkspace}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        setMobileNavOpen={setMobileNavOpen}
        setPaletteOpen={setPaletteOpen}
        handleRoleSwitch={handleRoleSwitch}
      />

      <div className="mx-auto flex max-w-[1800px] gap-4 px-3 pb-24 pt-2 sm:px-4 lg:px-5">
        <DesktopSidebar
          role={role}
          roleData={roleData}
          currentPageId={currentPageId}
          sidebarCollapsed={sidebarCollapsed}
          goToPage={goToPage}
          togglePin={togglePin}
          pinned={pinned}
        />

        <AnimatePresence>
          {mobileNavOpen && (
            <MobileSidebar
              role={role}
              roleData={roleData}
              currentPageId={currentPageId}
              close={() => setMobileNavOpen(false)}
              handleRoleSwitch={handleRoleSwitch}
              goToPage={goToPage}
            />
          )}
        </AnimatePresence>

        <main className="min-w-0 flex-1 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            <HeroShellCard
              role={role}
              roleData={roleData}
              currentPage={currentPage}
              currentSection={currentSection}
              handleRoleSwitch={handleRoleSwitch}
              setPaletteOpen={setPaletteOpen}
            />

            <StatsGrid stats={roleData.stats} role={role} />

            <div className="grid gap-4 2xl:grid-cols-[1.12fr_0.88fr] xl:grid-cols-[1.12fr_0.88fr]">
              <div className="space-y-4">
                <PageSurfacePreview
                  role={role}
                  roleData={roleData}
                  currentPage={currentPage}
                  currentSection={currentSection}
                  pinned={pinned}
                  togglePin={togglePin}
                />
                <RouteInventoryGrid
                  roleData={roleData}
                  currentPageId={currentPageId}
                  goToPage={goToPage}
                />
                <ShellCapabilitiesCard />
              </div>

              <div className="space-y-4">
                <QuickSwitchCard role={role} handleRoleSwitch={handleRoleSwitch} />
                <QuickActionsCard role={role} roleData={roleData} setPaletteOpen={setPaletteOpen} />
                <AlertsCard role={role} roleData={roleData} />
                <PinnedAndRecentCard role={role} rolePinned={rolePinned} recent={recent} goToPage={goToPage} />
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <MobileBottomDock />

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            query={paletteQuery}
            setQuery={setPaletteQuery}
            results={paletteResults}
            close={() => setPaletteOpen(false)}
            goToPage={goToPage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TopBar({
  role,
  roleData,
  workspace,
  setWorkspace,
  sidebarCollapsed,
  setSidebarCollapsed,
  setMobileNavOpen,
  setPaletteOpen,
  handleRoleSwitch,
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/70 bg-[#f2f2f2]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:flex"
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-3 rounded-[24px] border border-white/70 bg-white px-3 py-2 shadow-sm sm:px-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <div className="fh-eyebrow text-[#03cd8c]">EVzone Super App</div>
              <div className="text-base font-semibold text-slate-900">FaithHub AppShell</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setPaletteOpen(true)}
          className="hidden min-w-0 flex-1 items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-500 shadow-sm md:flex"
        >
          <Search className="h-4 w-4 shrink-0 text-[#03cd8c]" />
          <span className="truncate">Search pages, routes, modules, roles, and workspaces</span>
          <span className="ml-auto rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
            Command palette
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <RoleToggle role={role} handleRoleSwitch={handleRoleSwitch} compact />

          <div className="hidden items-center gap-2 rounded-[24px] border border-slate-200 bg-white px-3 py-2 shadow-sm xl:flex">
            <Globe2 className="h-4 w-4 text-[#03cd8c]" />
            <select
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 outline-none"
            >
              {workspaceOptions[role].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function RoleToggle({ role, handleRoleSwitch, compact = false }) {
  return (
    <div className={`flex items-center gap-1 rounded-[24px] border border-slate-200 bg-white p-1 shadow-sm ${compact ? "" : "w-full"}`}>
      {roleOrder.map((item) => {
        const active = role === item;
        const prominent = item === "user" || item === "provider";
        return (
          <button
            key={item}
            onClick={() => handleRoleSwitch(item)}
            className={`rounded-[18px] px-3 py-2 text-sm font-semibold transition ${
              active
                ? item === "provider"
                  ? "bg-[#fff8ef] text-[#f77f00]"
                  : item === "admin"
                  ? "bg-slate-900 text-white"
                  : "bg-[#03cd8c] text-white"
                : prominent
                ? "text-slate-600 hover:bg-[#f8fafc]"
                : "text-slate-500 hover:bg-[#f8fafc]"
            }`}
          >
            {roleCatalog[item].shortLabel}
          </button>
        );
      })}
    </div>
  );
}

function DesktopSidebar({ role, roleData, currentPageId, sidebarCollapsed, goToPage, togglePin, pinned }) {
  return (
    <aside className={`hidden lg:block ${sidebarCollapsed ? "w-[92px]" : "w-[320px]"}`}>
      <div className="sticky top-[88px] space-y-4">
        <Card className="fh-interactive-card overflow-hidden rounded-[32px] border border-white/70 bg-white/92 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.25)]">
          <CardContent className="p-3">
            <div className="mb-3 rounded-[24px] bg-gradient-to-br from-[#03cd8c] to-[#20cf9c] p-4 text-white">
              <div className="fh-eyebrow text-white/90">{roleData.label} role</div>
              {!sidebarCollapsed && (
                <>
                  <div className="mt-2 text-xl font-semibold">{roleData.workspace}</div>
                  <div className="mt-1 text-sm text-white/85">{roleData.subtitle}</div>
                </>
              )}
            </div>

            <div className="space-y-3">
              {roleData.sections.map((section) => (
                <div key={section.title} className="space-y-2">
                  {!sidebarCollapsed && (
                    <div className="px-2 fh-eyebrow text-slate-500">
                      {section.title}
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const active = item.id === currentPageId;
                      const Icon = item.icon;
                      const isPinned = pinned.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => goToPage(role, item.id)}
                          className={`group flex w-full items-center gap-3 rounded-[24px] border px-3 py-3 text-left transition ${
                            active
                              ? "border-[#03cd8c]/15 bg-[#ecfff8]"
                              : "border-transparent bg-white hover:border-slate-200 hover:bg-[#f8fafc]"
                          }`}
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-[#03cd8c] text-white" : "bg-[#f8fafc] text-slate-600 ring-1 ring-slate-200"}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          {!sidebarCollapsed && (
                            <>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-semibold text-slate-900">{item.label}</div>
                                <div className="truncate text-xs text-slate-500">{item.route}</div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePin(item.id);
                                }}
                                className={`rounded-full p-2 ${isPinned ? "text-[#f77f00]" : "text-slate-400 opacity-0 group-hover:opacity-100"}`}
                              >
                                <Pin className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}

function MobileSidebar({ role, roleData, currentPageId, close, handleRoleSwitch, goToPage }) {
  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={close} />
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="absolute left-0 top-0 h-full w-[88vw] max-w-[360px] overflow-y-auto border-r border-white/60 bg-white"
      >
        <div className="space-y-4 p-4">
          <div className="rounded-[28px] bg-gradient-to-br from-[#03cd8c] to-[#20cf9c] p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="fh-eyebrow text-white/90">FaithHub AppShell</div>
                <div className="mt-2 text-xl font-semibold">{roleData.workspace}</div>
              </div>
              <button onClick={close} className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
                Close
              </button>
            </div>
            <div className="mt-4">
              <RoleToggle role={role} handleRoleSwitch={handleRoleSwitch} />
            </div>
          </div>

          {roleData.sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <div className="px-2 fh-eyebrow text-slate-500">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = item.id === currentPageId;
                return (
                  <button
                    key={item.id}
                    onClick={() => goToPage(role, item.id)}
                    className={`flex w-full items-center gap-3 rounded-[24px] border px-3 py-3 text-left ${active ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-[#03cd8c] text-white" : "bg-[#f8fafc] text-slate-600 ring-1 ring-slate-200"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-slate-900">{item.label}</div>
                      <div className="truncate text-xs text-slate-500">{item.route}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function HeroShellCard({ role, roleData, currentPage, currentSection, handleRoleSwitch, setPaletteOpen }) {
  return (
    <Card className="fh-interactive-card overflow-hidden rounded-[36px] border border-white/70 bg-white/92 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.28)]">
      <CardContent className="p-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#03cd8c] via-[#21d29d] to-[#ebfcf6] fh-pad-hero">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
          <div className="relative z-10 grid gap-5 xl:grid-cols-[0.66fr_0.34fr]">
            <div className="space-y-4 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-white/90 px-3 py-1 text-[#03cd8c] hover:bg-white">Multi-role AppShell</Badge>
                <Badge className={`rounded-full px-3 py-1 hover:bg-transparent ${getRoleBadge(role)}`}>{roleData.label} lane active</Badge>
              </div>
              <div>
                <div className="fh-eyebrow text-white/90">FaithHub foundation</div>
                <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                  {roleData.heroTitle}
                </h1>
                <p className="mt-3 max-w-3xl fh-body text-white/90 sm:text-base">
                  {roleData.heroText}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-white/90">
                <span className="rounded-full bg-white/12 px-3 py-2">Current section: {currentSection?.title}</span>
                <span className="rounded-full bg-white/12 px-3 py-2">Current route: {currentPage?.route}</span>
                <span className="rounded-full bg-white/12 px-3 py-2">Template: {currentPage?.template}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-white px-5 text-[#03cd8c] hover:bg-white/90">{roleData.primaryAction}</Button>
                <Button variant="outline" className="rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15">
                  {roleData.secondaryAction}
                </Button>
                <Button variant="outline" className="rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15" onClick={() => setPaletteOpen(true)}>
                  Open command palette
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/20 bg-white/12 p-4 text-white backdrop-blur">
                <div className="mb-3 text-sm font-semibold">Quick role switch</div>
                <RoleToggle role={role} handleRoleSwitch={handleRoleSwitch} />
                <div className="mt-3 text-xs text-white/75">
                  User and Provider are optimized for fast lane-switching. Admin stays available when elevated oversight is needed.
                </div>
              </div>

              <div className="rounded-[28px] border border-white/20 bg-slate-950/20 p-4 text-white backdrop-blur">
                <div className="mb-2 text-sm font-semibold">Active page</div>
                <div className="text-2xl font-semibold">{currentPage?.label}</div>
                <div className="mt-2 text-sm text-white/80">{currentPage?.description}</div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 px-3 py-3 text-sm">Role-aware top bar</div>
                  <div className="rounded-2xl bg-white/10 px-3 py-3 text-sm">Pinned context rail</div>
                  <div className="rounded-2xl bg-white/10 px-3 py-3 text-sm">Responsive navigation</div>
                  <div className="rounded-2xl bg-white/10 px-3 py-3 text-sm">Cross-role continuity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsGrid({ stats, role }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
      {stats.map((item) => (
        <Card key={item.label} className="rounded-[28px] border border-white/70 bg-white/92 shadow-sm">
          <CardContent className="p-5">
            <div className={`fh-eyebrow-wide ${getRoleAccent(role)}`}>{item.label}</div>
            <div className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</div>
            <div className="mt-2 text-sm text-slate-500">{item.note}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PageSurfacePreview({ role, roleData, currentPage, currentSection, pinned, togglePin }) {
  const connectedRole = role === "user" ? "provider" : role === "provider" ? "admin" : "provider";
  const connectedLabel = roleCatalog[connectedRole].label;

  return (
    <Card className="fh-interactive-card rounded-[32px] border border-white/70 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <SectionHeader
          title="Page surface preview"
          subtitle="The shell surrounds every page with structured actions, metadata, and contextual intelligence."
        />
        <div className="grid gap-4 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-[#f8fafc] p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">{currentSection?.title}</Badge>
                <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">{currentPage?.template}</Badge>
              </div>
              <div className="text-2xl font-semibold text-slate-900">{currentPage?.label}</div>
              <div className="mt-2 fh-body text-slate-600">{currentPage?.description}</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Breadcrumbs + route identity</div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Primary and secondary page actions</div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Top filters and search hooks</div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Right rail context and alerts</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Primary page CTA</Button>
                <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                  Secondary action
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                  onClick={() => togglePin(currentPage.id)}
                >
                  <Pin className="mr-2 h-4 w-4 text-[#f77f00]" /> {pinned.includes(currentPage.id) ? "Unpin page" : "Pin page"}
                </Button>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 text-lg font-semibold text-slate-900">Cross-role handoff</div>
              <div className="fh-body text-slate-600">
                This shell supports a clean handoff between roles. A {roleData.label.toLowerCase()} page can surface a linked {connectedLabel.toLowerCase()} destination without collapsing context or breaking workspace identity.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#f8fafc] px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">Shared command palette</span>
                <span className="rounded-full bg-[#f8fafc] px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">Role-preserved recent pages</span>
                <span className="rounded-full bg-[#f8fafc] px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">Contextual workspace carry-over</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 text-lg font-semibold text-slate-900">Shell slots</div>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">Global search and command palette entry</div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">Role-aware workspace switcher</div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">Page tabs, filters, and quick actions</div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">Right rail for alerts, tasks, and recent state</div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">Mobile drawer and bottom dock behavior</div>
              </div>
            </div>
            <div className="rounded-[28px] border border-[#f77f00]/15 bg-[#fffaf3] p-5 shadow-sm">
              <div className="mb-2 text-lg font-semibold text-slate-900">Premium shell standards</div>
              <div className="space-y-2 text-sm text-slate-600">
                <div> Persistent role switch between User and Provider</div>
                <div> Multi-tenant workspace context for Provider and Admin</div>
                <div> Fully responsive nav with mobile-first fallbacks</div>
                <div> Command palette access to all routes</div>
                <div> Premium EVzone visual system with green as primary</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RouteInventoryGrid({ roleData, currentPageId, goToPage }) {
  return (
    <Card className="fh-interactive-card rounded-[32px] border border-white/70 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <SectionHeader
          title="Route inventory"
          subtitle="Every assigned page for the current role is already mapped into the shell.
"
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {roleData.sections.map((section) => (
            <div key={section.title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 text-lg font-semibold text-slate-900">{section.title}</div>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const active = item.id === currentPageId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => goToPage(roleData.label.toLowerCase(), item.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                        active ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-[#f8fafc] hover:border-[#03cd8c]/35 hover:bg-white"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-slate-900">{item.label}</div>
                        <div className="truncate text-xs text-slate-500">{item.route}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                          {item.template}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ShellCapabilitiesCard() {
  return (
    <Card className="fh-interactive-card rounded-[32px] border border-white/70 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <SectionHeader
          title="Shell capabilities"
          subtitle="The shell is built to scale with the full FaithHub architecture across all roles."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shellCapabilities.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-[#f8fafc] p-5">
              <div className="mb-2 text-base font-semibold text-slate-900">{item.title}</div>
              <div className="fh-body-tight text-slate-600">{item.detail}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickSwitchCard({ role, handleRoleSwitch }) {
  return (
    <Card className="fh-interactive-card rounded-[32px] border border-white/70 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <SectionHeader title="Role switch" subtitle="Fast switching between User and Provider with Admin always available." action="Role logic" />
        <RoleToggle role={role} handleRoleSwitch={handleRoleSwitch} />
        <div className="mt-4 fh-subcard-muted rounded-[24px] p-4 text-sm text-slate-600">
          User and Provider page states are preserved independently, so switching lanes does not lose your place.
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard({ role, roleData, setPaletteOpen }) {
  return (
    <Card className="fh-interactive-card rounded-[32px] border border-white/70 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <SectionHeader title="Quick actions" subtitle="High-frequency moves surfaced at shell level for the active role." action="Create" />
        <div className="grid gap-3 sm:grid-cols-2">
          {roleData.quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => setPaletteOpen(true)}
                className="rounded-[24px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-slate-900">{action.label}</div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertsCard({ roleData }) {
  return (
    <Card className="fh-interactive-card rounded-[32px] border border-white/70 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <SectionHeader title="Alerts and activity" subtitle="Contextual signals that stay visible without overwhelming the main page." action="Inbox" />
        <div className="space-y-3">
          {roleData.alerts.map((alert) => (
            <div key={alert.title} className={`rounded-[24px] border p-4 ${alert.tone === "warning" ? "border-[#f77f00]/15 bg-[#fffaf3]" : alert.tone === "success" ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-[#f8fafc]"}`}>
              <div className="mb-1 text-sm font-semibold text-slate-900">{alert.title}</div>
              <div className="text-sm text-slate-600">{alert.detail}</div>
            </div>
          ))}
          <div className="fh-subcard rounded-[24px] p-4">
            <div className="mb-2 text-sm font-semibold text-slate-900">Recent activity</div>
            <div className="space-y-2">
              {roleData.activity.map((item) => (
                <div key={item} className="text-sm text-slate-600"> {item}</div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PinnedAndRecentCard({ role, rolePinned, recent, goToPage }) {
  return (
    <Card className="fh-interactive-card rounded-[32px] border border-white/70 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <SectionHeader title="Pinned and recent" subtitle="Fast return paths across roles and contexts." action="Library" />
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm font-semibold text-slate-900">Pinned pages</div>
            <div className="space-y-2">
              {rolePinned.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goToPage(item.role, item.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.roleLabel}  {item.route}</div>
                  </div>
                  <Pin className="h-4 w-4 text-[#f77f00]" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-slate-900">Recent pages</div>
            <div className="space-y-2">
              {recent.map((id) => {
                const page = allPages.find((item) => item.id === id);
                if (!page) return null;
                return (
                  <button
                    key={id}
                    onClick={() => goToPage(page.role, page.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-left transition hover:border-[#03cd8c]/35 hover:bg-white"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{page.label}</div>
                      <div className="text-xs text-slate-500">{page.roleLabel}  {page.sectionTitle}</div>
                    </div>
                    <Clock3 className="h-4 w-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MobileBottomDock() {
  return (
    <div className="fixed bottom-3 left-1/2 z-20 w-[calc(100%-20px)] max-w-md -translate-x-1/2 rounded-[28px] border border-white/70 bg-white/95 px-3 py-2 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-2">
        {mobileDockItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-slate-600 transition hover:bg-[#f8fafc] hover:text-[#03cd8c]">
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CommandPalette({ query, setQuery, results, close, goToPage }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 pt-10 backdrop-blur-sm sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_32px_120px_-40px_rgba(15,23,42,0.45)]"
      >
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-[#f8fafc] px-4 py-3">
            <Search className="h-5 w-5 text-[#03cd8c]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search every FaithHub page, role, route, or module"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <button onClick={close} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
              Close
            </button>
          </div>
        </div>
        <div className="max-h-[72vh] overflow-y-auto p-4 sm:p-5">
          <div className="mb-3 fh-eyebrow-wide text-slate-500">
            {results.length} results
          </div>
          <div className="grid gap-3">
            {results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => goToPage(item.role, item.id)}
                  className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getRoleBadge(item.role)}`}>{item.roleLabel}</span>
                      <span className="rounded-full bg-[#f8fafc] px-2.5 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">
                        {item.template}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{item.sectionTitle}  {item.route}</div>
                    <div className="mt-2 fh-body-tight text-slate-600">{item.description}</div>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action = "Explore" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}




