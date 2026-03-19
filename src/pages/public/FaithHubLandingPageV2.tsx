import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BellRing,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe2,
  Landmark,
  Layers3,
  LayoutGrid,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  MonitorSmartphone,
  PlayCircle,
  Radio,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ctaPriorityClass } from "@/constants/ctaStyles";
import { faithHubToneCopy } from "@/constants/faithHubTone";
import { ColorModeToggle } from "@/theme/color-mode-toggle";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

type QuickTone = "emerald" | "orange" | "slate";

type SidebarEntry = {
  title: string;
  detail: string;
  target?: string;
  highlighted?: boolean;
};

type SidebarModule = {
  id: string;
  label: string;
  icon: LucideIcon;
  entries: SidebarEntry[];
};

type OperatorRoleSection = "Platform Leadership" | "Worship & Content" | "Engagement & Trust";

type OperatorRole = {
  id: string;
  label: string;
  description: string;
  section: OperatorRoleSection;
  icon: LucideIcon;
  defaultRoute: string;
  baseRole: string;
  heroFocus: string;
  viewingAs: string;
  modules: SidebarModule[];
};

type RoleCard = {
  role: "User" | "Provider";
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  badgeTone: string;
  target: "/user" | "/provider";
};

type DeviceTab = {
  key: "desktop" | "tablet" | "mobile";
  label: string;
  title: string;
  text: string;
};

const operatorRoleSections: OperatorRoleSection[] = [
  "Platform Leadership",
  "Worship & Content",
  "Engagement & Trust",
];

const operatorRoles: OperatorRole[] = [
  {
    id: "platform-admin",
    label: "Platform Administrator",
    description: "Global control, governance, and role visibility",
    section: "Platform Leadership",
    icon: ShieldCheck,
    defaultRoute: "/app/admin/overview",
    baseRole: "FaithAdmin",
    heroFocus: "Global governance and multi-module oversight",
    viewingAs: "Platform Administrator",
    modules: [
      {
        id: "control",
        label: "Control",
        icon: LayoutGrid,
        entries: [
          { title: "Admin Overview", detail: "Global KPIs and command posture", target: "/app/admin/overview", highlighted: true },
          { title: "Policy & Taxonomy", detail: "Platform policy controls", target: "/app/admin/policy" },
          { title: "Institution Verification", detail: "Approval and compliance flow", target: "/app/admin/verification" },
        ],
      },
      {
        id: "security",
        label: "Security",
        icon: Lock,
        entries: [
          { title: "Security & Audit Logs", detail: "Evidence and compliance tracing", target: "/app/admin/security" },
          { title: "Live Moderation Console", detail: "Cross-network intervention control", target: "/app/admin/live-moderation" },
        ],
      },
      {
        id: "finance",
        label: "Finance",
        icon: Wallet,
        entries: [
          { title: "Payments & Disputes", detail: "Payouts, refunds, and risk controls", target: "/app/admin/finance" },
          { title: "Channels Registry", detail: "Deliverability and sender governance", target: "/app/admin/channels" },
        ],
      },
    ],
  },
  {
    id: "verification-lead",
    label: "Verification & Compliance Lead",
    description: "Institution approvals, checks, and escalations",
    section: "Platform Leadership",
    icon: BadgeCheck,
    defaultRoute: "/app/admin/verification",
    baseRole: "ComplianceLead",
    heroFocus: "Verification and trust governance operations",
    viewingAs: "Verification Lead",
    modules: [
      {
        id: "verification",
        label: "Verification",
        icon: BadgeCheck,
        entries: [
          { title: "Institution Verification", detail: "Review and approve institutions", target: "/app/admin/verification", highlighted: true },
          { title: "Provider Onboarding", detail: "Readiness and setup status", target: "/app/provider/onboarding" },
        ],
      },
      {
        id: "risk",
        label: "Risk",
        icon: ShieldCheck,
        entries: [
          { title: "Moderation Signals", detail: "Trust incidents and alerts", target: "/app/admin/live-moderation" },
          { title: "Policy Control Board", detail: "Localized policy decisions", target: "/app/admin/policy" },
        ],
      },
      {
        id: "audit",
        label: "Audit",
        icon: Lock,
        entries: [
          { title: "Security Logs", detail: "Evidence trails and posture", target: "/app/admin/security" },
          { title: "Compliance Finance Signals", detail: "Disputes and suspicious flows", target: "/app/admin/finance" },
        ],
      },
    ],
  },
  {
    id: "live-ops-director",
    label: "Live Operations Director",
    description: "Live schedule, studio, and stream operations",
    section: "Worship & Content",
    icon: Radio,
    defaultRoute: "/app/provider/live-ops",
    baseRole: "LiveOpsLead",
    heroFocus: "Live production readiness and stream reliability",
    viewingAs: "Live Operations",
    modules: [
      {
        id: "live-ops",
        label: "Live Ops",
        icon: Radio,
        entries: [
          { title: "Live Dashboard", detail: "Operational status and handoff", target: "/app/provider/live-ops", highlighted: true },
          { title: "Live Schedule", detail: "Run-of-show and staffing", target: "/app/provider/live-schedule" },
        ],
      },
      {
        id: "studio",
        label: "Studio",
        icon: MonitorSmartphone,
        entries: [
          { title: "Live Studio", detail: "Scenes, hosts, and overlays", target: "/app/provider/live-studio" },
          { title: "Stream Destinations", detail: "Simulcast and outbound routing", target: "/app/provider/stream-to-platforms" },
        ],
      },
      {
        id: "audience",
        label: "Audience",
        icon: BellRing,
        entries: [
          { title: "Audience Notifications", detail: "Pre-live and post-live messaging", target: "/app/provider/notifications" },
          { title: "Live Chat & Q&A", detail: "Community interaction lane", target: "/app/user/live/chat" },
        ],
      },
    ],
  },
  {
    id: "content-editor",
    label: "Series & Content Editor",
    description: "Series planning, episode creation, and publishing",
    section: "Worship & Content",
    icon: BookOpen,
    defaultRoute: "/app/provider/series-builder",
    baseRole: "ContentLead",
    heroFocus: "Content studio and publishing workflows",
    viewingAs: "Content Operations",
    modules: [
      {
        id: "library",
        label: "Library",
        icon: BookOpen,
        entries: [
          { title: "Series Builder", detail: "Program and season management", target: "/app/provider/series-builder", highlighted: true },
          { title: "Episode Builder", detail: "Episode production workspace", target: "/app/provider/episode-builder" },
        ],
      },
      {
        id: "publishing",
        label: "Publishing",
        icon: Layers3,
        entries: [
          { title: "Post-live Publishing", detail: "Replay and clip distribution", target: "/app/provider/post-live" },
          { title: "Provider Dashboard", detail: "Content KPIs and progress", target: "/app/provider/dashboard" },
        ],
      },
      {
        id: "distribution",
        label: "Distribution",
        icon: Sparkles,
        entries: [
          { title: "Audience Notifications", detail: "Broadcast and journey messaging", target: "/app/provider/notifications" },
          { title: "Series Library View", detail: "End-user consumption preview", target: "/app/user/series" },
        ],
      },
    ],
  },
  {
    id: "events-faithmart-manager",
    label: "Events & FaithMart",
    description: "Events operations, tickets, commerce, and funds",
    section: "Engagement & Trust",
    icon: CalendarDays,
    defaultRoute: "/app/provider/events",
    baseRole: "FaithMartOps",
    heroFocus: "Events and marketplace operations at scale",
    viewingAs: "Events & Commerce",
    modules: [
      {
        id: "events-core",
        label: "Events",
        icon: CalendarDays,
        entries: [
          { title: "Events Manager", detail: "Scheduling and event operations", target: "/app/provider/events", highlighted: true },
          { title: "Events Hub (User)", detail: "Member-facing event journey", target: "/app/user/events" },
        ],
      },
      {
        id: "commerce-core",
        label: "Commerce",
        icon: ShoppingBag,
        entries: [
          { title: "Giving Console", detail: "Funds and campaign operations", target: "/app/provider/funds" },
          { title: "User Giving View", detail: "Donor flow and checkout preview", target: "/app/user/giving" },
        ],
      },
      {
        id: "funds",
        label: "Trust",
        icon: Wallet,
        entries: [
          { title: "Finance & Disputes", detail: "Risk, disputes, and payout checks", target: "/app/admin/finance" },
          { title: "Reviews Moderation", detail: "Commerce trust and response workflow", target: "/app/provider/reviews-moderation" },
        ],
      },
    ],
  },
  {
    id: "community-care-coordinator",
    label: "Community Care Coordinator",
    description: "Messaging, care queues, and member engagement",
    section: "Engagement & Trust",
    icon: MessageSquare,
    defaultRoute: "/app/provider/contacts",
    baseRole: "CommunityCare",
    heroFocus: "Member communication and pastoral care operations",
    viewingAs: "Community Care",
    modules: [
      {
        id: "contacts",
        label: "Contacts",
        icon: MessageSquare,
        entries: [
          { title: "Contact Manager", detail: "Audience records and channels", target: "/app/provider/contacts", highlighted: true },
          { title: "Audience Notifications", detail: "Automated and manual sends", target: "/app/provider/notifications" },
        ],
      },
      {
        id: "community",
        label: "Community",
        icon: Users,
        entries: [
          { title: "FaithHub Home", detail: "Member dashboard experience", target: "/app/user/home" },
          { title: "Discover Institutions", detail: "Community and institution discovery", target: "/app/user/discover" },
        ],
      },
      {
        id: "care",
        label: "Care",
        icon: ShieldCheck,
        entries: [
          { title: "Live Chat & Q&A", detail: "Prayer and conversation lane", target: "/app/user/live/chat" },
          { title: "Reviews Oversight", detail: "Community trust and response", target: "/app/user/reviews" },
        ],
      },
    ],
  },
  {
    id: "trust-safety-reviewer",
    label: "Trust & Safety Reviewer",
    description: "Moderation incidents, policy, and safety posture",
    section: "Engagement & Trust",
    icon: Lock,
    defaultRoute: "/app/admin/live-moderation",
    baseRole: "TrustReviewer",
    heroFocus: "Trust posture and moderation response operations",
    viewingAs: "Trust & Safety",
    modules: [
      {
        id: "moderation",
        label: "Moderation",
        icon: ShieldCheck,
        entries: [
          { title: "Live Moderation Console", detail: "Incident response and enforcement", target: "/app/admin/live-moderation", highlighted: true },
          { title: "Policy Taxonomy", detail: "Rule sets and notices", target: "/app/admin/policy" },
        ],
      },
      {
        id: "evidence",
        label: "Evidence",
        icon: Lock,
        entries: [
          { title: "Security & Audit Logs", detail: "Investigations and traceability", target: "/app/admin/security" },
          { title: "Channels Deliverability", detail: "Abuse vectors and sender checks", target: "/app/admin/channels" },
        ],
      },
      {
        id: "resolution",
        label: "Resolution",
        icon: BellRing,
        entries: [
          { title: "Payments & Disputes", detail: "Finance-side trust incidents", target: "/app/admin/finance" },
          { title: "Provider Reviews Moderation", detail: "Public feedback management", target: "/app/provider/reviews-moderation" },
        ],
      },
    ],
  },
];

const cockpitTabs = ["7 days", "30 days", "This term"] as const;
type CockpitTab = (typeof cockpitTabs)[number];

const moduleShortcutCards = [
  { label: "Live Dashboard", icon: Radio, target: "/app/provider/live-ops" },
  { label: "Series Builder", icon: Layers3, target: "/app/provider/series-builder" },
  { label: "Events Manager", icon: CalendarDays, target: "/app/provider/events" },
  { label: "Contact Manager", icon: MessageSquare, target: "/app/provider/contacts" },
];

const progressCards = [
  {
    title: "Live readiness",
    value: "89%",
    note: "Most communities are stable for scheduled sessions.",
    tag: "In review",
    tone: "orange" as QuickTone,
    widthClass: "w-[58%]",
  },
  {
    title: "Engagement depth",
    value: "64%",
    note: "Participation and response rates are improving weekly.",
    tag: "Schedule",
    tone: "slate" as QuickTone,
    widthClass: "w-[44%]",
  },
  {
    title: "Trust posture",
    value: "92%",
    note: "Moderation and verification controls are healthy.",
    tag: "Stable",
    tone: "emerald" as QuickTone,
    widthClass: "w-[72%]",
  },
];

const miniStats = [
  {
    title: "Public-facing roles",
    value: String(operatorRoles.length),
    trend: "+0",
    tone: "emerald" as QuickTone,
    icon: Users,
    spark: "M2 12 L8 11 L14 9 L20 6 L26 5",
  },
  {
    title: "Page ecosystem",
    value: "50+",
    trend: "+4%",
    tone: "orange" as QuickTone,
    icon: BookOpen,
    spark: "M2 6 L8 7 L14 10 L20 11 L26 9",
  },
  {
    title: "Core pillars",
    value: "6",
    trend: "+0.0%",
    tone: "emerald" as QuickTone,
    icon: Layers3,
    spark: "M2 11 L8 11 L14 8 L20 4 L26 6",
  },
  {
    title: "Device readiness",
    value: "100%",
    trend: "+2%",
    tone: "orange" as QuickTone,
    icon: MonitorSmartphone,
    spark: "M2 11 L8 8 L14 6 L20 3 L26 4",
  },
];

const roleCards: RoleCard[] = [
  {
    role: "User",
    title: "A richer digital faith journey",
    description:
      "Personalized home, institution discovery, series libraries, Live Sessionz, events, giving, memberships, reviews, and settings designed for everyday spiritual engagement.",
    bullets: [
      "Live, replay, and waiting room experiences",
      "Series, episodes, notes, and premium resources",
      "Events, RSVP, FaithMart tickets, and giving",
    ],
    icon: Users,
    badgeTone: "border border-sky-200 bg-sky-50 text-sky-700",
    target: "/user",
  },
  {
    role: "Provider",
    title: "A full institution operating system",
    description:
      "Build series and episodes, schedule and run Live Sessionz, manage contacts, notifications, events, funds, and post-live publishing from one premium workspace.",
    bullets: [
      "Builder flows, Live Studio, and operations dashboards",
      "Audience journeys, messaging, and post-live tools",
      "Events, ticketing, funds, and trust workflows",
    ],
    icon: Landmark,
    badgeTone: "border border-slate-200 bg-slate-100 text-slate-700",
    target: "/provider",
  },
];

const topHighlights = [
  {
    title: "Multi-faith by design",
    text: "FaithHub is built to support many denominations and faith communities with flexible structures for teachings, events, groups, and communication.",
    icon: Globe2,
  },
  {
    title: "Live-first digital faith",
    text: "From waiting rooms to live player experiences, replays, clips, captions, translations, and giving, the platform is designed for modern digital ministry.",
    icon: Radio,
  },
  {
    title: "Commerce meets community",
    text: "FaithMart connects events, merchandise, marketplace days, vendor booths, tickets, and institution commerce into one unified ecosystem.",
    icon: ShoppingBag,
  },
  {
    title: "Trust and safety at scale",
    text: "Verification, moderation, policy governance, review systems, and audit-grade controls protect both users and institutions.",
    icon: ShieldCheck,
  },
];

const featureGroups = [
  {
    title: "Live Sessionz Infrastructure",
    subtitle: "The heartbeat of the platform",
    items: [
      "Live Hub, waiting rooms, premium player experience, captions, and translation",
      "Series-aware live scheduling and post-live replay publishing",
      "Provider Live Studio, stream routing, operations dashboards, and moderation oversight",
    ],
    icon: PlayCircle,
  },
  {
    title: "Series and Teachings",
    subtitle: "Structured digital teaching journeys",
    items: [
      "Series library, detail pages, and episode progression",
      "Standalone teachings and multi-episode teaching series",
      "AI-assisted outlines, premium resources, and post-live chaptering",
    ],
    icon: Layers3,
  },
  {
    title: "Events and FaithMart",
    subtitle: "Faith gatherings and commerce connected",
    items: [
      "Camps, trips, baptisms, crusades, missions, conferences, and marketplace days",
      "FaithMart ticketing, merchandise, booth access, and event-linked products",
      "Event chats, waivers, volunteer roles, and offline check-in token support",
    ],
    icon: CalendarDays,
  },
  {
    title: "Audience and Messaging",
    subtitle: "Reach the right people at the right time",
    items: [
      "Contacts, segments, opt-ins, channels, and sender line governance",
      "Localized templates, smart send time, and premium message automation",
      "Journey flows from pre-live to live to replay across multiple channels",
    ],
    icon: BellRing,
  },
  {
    title: "Giving and Membership",
    subtitle: "Sustainable support systems",
    items: [
      "Donations, recurring giving, receipts, donor privacy, and supporter tiers",
      "Membership plans, entitlements, family sharing, and institution group access",
      "Provider-side fund setup, payout scheduling, and reconciliation tools",
    ],
    icon: Wallet,
  },
  {
    title: "Trust and Governance Backbone",
    subtitle: "Confidence for institutions and communities",
    items: [
      "Institution verification, review and moderation systems, and role dispute handling",
      "Live moderation, content policy governance, and anomaly detection",
      "Payments oversight, channel registry, security logging, and audit exports",
    ],
    icon: Lock,
  },
];

const featuredPillars = [
  {
    id: "live",
    tag: "Live Sessionz",
    title: "A premium live faith infrastructure",
    description:
      "Deliver polished live sessions with calm moderation, audience participation, and replay-ready content built into one seamless flow.",
    icon: Radio,
    items: [
      { icon: MessageSquare, text: "Waiting rooms, pre-chat, polls, and prayer requests before each session begins." },
      { icon: Globe2, text: "Low-latency playback, live chat, captions, translation, and safe reporting tools." },
      { icon: PlayCircle, text: "Post-live replays, chapters, transcripts, highlights, and reusable teaching assets." },
    ],
  },
  {
    id: "faithmart",
    tag: "FaithMart",
    title: "Commerce that actually belongs inside the experience",
    description:
      "Unify tickets, merchandise, booths, and institution-led selling in a commerce layer that feels native, calm, and trustworthy.",
    icon: ShoppingBag,
    items: [
      { icon: CalendarDays, text: "Event tickets, vendor booths, branded merchandise, and marketplace-day selling." },
      { icon: Landmark, text: "Institution-linked product and service discovery for faith communities." },
      { icon: Wallet, text: "A connected commerce engine that supports sustainability without fragmenting the experience." },
    ],
  },
];

const trustTiles = [
  { label: "Verified institutions", icon: BadgeCheck },
  { label: "Live moderation", icon: ShieldCheck },
  { label: "Policy governance", icon: Lock },
  { label: "Audit visibility", icon: Search },
];

const testimonials = [
  {
    quote:
      "FaithHub feels like more than a streaming platform. It feels like a full digital ministry ecosystem where worship, communication, giving, and events finally work together.",
    name: "Prototype Feedback",
    title: "Institution Strategy Perspective",
  },
  {
    quote:
      "The biggest strength is the depth. It supports the believer, the institution, and the operational team in one connected environment.",
    name: "Platform Review",
    title: "Digital Transformation Perspective",
  },
  {
    quote:
      "FaithMart integration makes the project especially powerful because events, merchandise, and community commerce do not feel bolted on.",
    name: "Commerce Review",
    title: "Ecosystem Perspective",
  },
];

const timelineSteps = [
  {
    title: "Discover and belong",
    text: "Users find institutions, follow communities, join audience groups, and personalize their spiritual journey.",
  },
  {
    title: "Watch and participate",
    text: "Live Sessionz, waiting rooms, replays, translations, reactions, notes, and safe engagement bring teachings to life.",
  },
  {
    title: "Give, attend, and buy",
    text: "Events, tickets, giving, merchandise, and FaithMart marketplace experiences create economic sustainability.",
  },
  {
    title: "Operate and scale",
    text: "Providers build content, schedule live sessions, manage audiences, and use institution-grade controls to grow digitally.",
  },
];

const deviceTabs: DeviceTab[] = [
  {
    key: "desktop",
    label: "Desktop",
    title: "Control-rich workspace",
    text: "Premium dashboards, route-dense navigation, live operations, moderation, and builder flows thrive in the desktop experience.",
  },
  {
    key: "tablet",
    label: "Tablet",
    title: "Touch-optimized productivity",
    text: "Ideal for event desks, moderation workflows, stage-side support, and hybrid provider operations on the move.",
  },
  {
    key: "mobile",
    label: "Mobile",
    title: "Faith everywhere",
    text: "Users can worship, join live sessions, give, RSVP, chat, and manage spiritual routines from a polished mobile-first interface.",
  },
];

const faq = [
  {
    q: "What makes FaithHub different from a normal church website or streaming page?",
    a: "FaithHub is not just a website. It is a full multi-role platform with user journeys, provider operations, live infrastructure, event commerce, giving, messaging, moderation, and governance built into one connected system.",
  },
  {
    q: "Can it support multiple denominations and faith traditions?",
    a: "Yes. The structure is intentionally multi-faith and taxonomy-driven, so institutions can organize identity, teachings, events, audience groups, and policy flows in flexible ways.",
  },
  {
    q: "How does FaithMart fit into the project?",
    a: "FaithMart powers commerce around events, merchandise, marketplace days, vendor booths, and institution-driven products, while still staying integrated with the wider FaithHub experience.",
  },
  {
    q: "Who is this website page primarily for?",
    a: "This public-facing landing page is focused on two main experiences: the User experience and the Provider experience. Governance and admin systems still exist in the platform backbone, but they are not presented here as a public role.",
  },
];

const mobileJumpLinks = [
  { label: "Overview", target: "overview", icon: Compass },
  { label: "Experiences", target: "experiences", icon: Users },
  { label: "Live", target: "live", icon: Radio },
  { label: "Commerce", target: "faithmart", icon: ShoppingBag },
  { label: "Trust", target: "trust", icon: ShieldCheck },
  { label: "FAQ", target: "faq", icon: ChevronDown },
  { label: "Contact", target: "contact", icon: Mail },
];

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function FaithHubLandingPageV2() {
  const navigate = useNavigate();
  const copy = faithHubToneCopy.publicShell;
  const fallbackOperatorRole = operatorRoles[0]!;
  const [activeRole, setActiveRole] = useState<RoleCard["role"]>("User");
  const [activeOperatorRoleId, setActiveOperatorRoleId] = useState(fallbackOperatorRole.id);
  const [activeDevice, setActiveDevice] = useState<DeviceTab["key"]>("desktop");
  const [faqOpen, setFaqOpen] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openModule, setOpenModule] = useState(fallbackOperatorRole.modules[0]?.id || "");
  const [operatorMenuOpen, setOperatorMenuOpen] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState<CockpitTab>("7 days");
  const [profileHintOpen, setProfileHintOpen] = useState(false);
  const operatorMenuRef = useRef<HTMLDivElement | null>(null);
  const operatorTriggerRef = useRef<HTMLButtonElement | null>(null);
  const profileHintRef = useRef<HTMLDivElement | null>(null);

  const currentRole = useMemo(() => roleCards.find((item) => item.role === activeRole), [activeRole]);
  const currentDevice = useMemo(() => deviceTabs.find((item) => item.key === activeDevice), [activeDevice]);
  const activeOperatorRole = useMemo(
    () => operatorRoles.find((role) => role.id === activeOperatorRoleId) || fallbackOperatorRole,
    [activeOperatorRoleId, fallbackOperatorRole],
  );
  const activeSidebarModules = useMemo(() => activeOperatorRole.modules, [activeOperatorRole]);
  const roleSwitcherGroups = useMemo(
    () =>
      operatorRoleSections
        .map((section) => ({
          section,
          roles: operatorRoles.filter((role) => role.section === section),
        }))
        .filter((group) => group.roles.length > 0),
    [],
  );
  const shortcutCards = useMemo(() => {
    const roleCards = activeSidebarModules
      .flatMap((module) =>
        module.entries
          .filter((entry) => Boolean(entry.target))
          .map((entry) => ({
            label: entry.title,
            icon: module.icon,
            target: entry.target || "overview",
          })),
      )
      .slice(0, 4);
    return roleCards.length > 0 ? roleCards : moduleShortcutCards;
  }, [activeSidebarModules]);
  const viewingLabel = `Viewing as ${activeOperatorRole.viewingAs}`;

  useEffect(() => {
    if (!profileHintOpen) return;
    const timeoutId = window.setTimeout(() => setProfileHintOpen(false), 2400);
    return () => window.clearTimeout(timeoutId);
  }, [profileHintOpen]);

  useEffect(() => {
    if (!activeSidebarModules.some((module) => module.id === openModule)) {
      setOpenModule(activeSidebarModules[0]?.id || "");
    }
  }, [activeSidebarModules, openModule]);

  useEffect(() => {
    if (!profileHintOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!profileHintRef.current?.contains(event.target as Node)) {
        setProfileHintOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileHintOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileHintOpen]);

  useEffect(() => {
    if (!operatorMenuOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickInsideMenu = operatorMenuRef.current?.contains(target);
      const clickInsideTrigger = operatorTriggerRef.current?.contains(target);
      if (!clickInsideMenu && !clickInsideTrigger) {
        setOperatorMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOperatorMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [operatorMenuOpen]);

  const handleOperatorRoleSelect = (roleId: string) => {
    const selectedRole = operatorRoles.find((role) => role.id === roleId);
    if (!selectedRole) return;
    setActiveOperatorRoleId(roleId);
    setOpenModule(selectedRole.modules[0]?.id || "");
    setOperatorMenuOpen(false);
    setMobileNavOpen(false);
    navigate(selectedRole.defaultRoute);
  };

  const runTarget = (target: string) => {
    if (target.startsWith("/")) {
      navigate(target);
      return;
    }
    scrollToId(target);
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[color:var(--bg)] text-[color:var(--text-primary)]">
      <header className="fh-shell-topbar z-40 shrink-0 border-b border-[color:var(--border)]">
        <div className="mx-auto flex max-w-[1860px] items-center gap-2 px-2 py-3 sm:px-4 lg:px-5">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
            className="fh-shell-control inline-flex h-11 w-11 items-center justify-center rounded-2xl lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollToId("overview")}
            aria-label="Go to overview"
            className="fh-shell-control inline-flex min-w-0 items-center rounded-2xl px-2.5 py-1.5"
          >
            <img
              src={faithmartLogoLandscape}
              alt="FaithMart"
              className="h-9 w-auto max-w-[11.5rem] object-contain sm:h-10 sm:max-w-[12.8rem]"
            />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <button
                ref={operatorTriggerRef}
                type="button"
                aria-label="Switch FaithHub operator role"
                aria-expanded={operatorMenuOpen}
                onClick={() => setOperatorMenuOpen((prev) => !prev)}
                className="fh-shell-control inline-flex h-11 items-center gap-2 rounded-2xl px-3 text-xs font-semibold text-slate-700"
              >
                <activeOperatorRole.icon className="h-4 w-4" />
                <span>{activeOperatorRole.label}</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition ${operatorMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <TopChip icon={Landmark} label="SMC" className="hidden lg:inline-flex" />
            <div ref={profileHintRef} className="relative hidden sm:block">
              <button
                type="button"
                aria-label="Open profile options"
                onClick={() => setProfileHintOpen((prev) => !prev)}
                className="fh-shell-control inline-flex h-11 items-center gap-2 rounded-2xl px-3 text-left"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#111827] text-[11px] font-semibold text-white">
                  BM
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-semibold text-slate-900">Brian M.</span>
                  <span className="block text-[11px] text-slate-500">Greenhill Community - Member</span>
                </span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>
              {profileHintOpen ? (
                <div className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-10 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                  <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900" />
                  Community: Greenhill Community
                </div>
              ) : null}
            </div>
            <label className="fh-shell-control hidden h-11 items-center gap-2 rounded-2xl px-3 xl:flex">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                type="search"
                placeholder="Search..."
                className="w-[9rem] border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>
            <ColorModeToggle className="h-11 w-11 rounded-2xl" />
            <button
              type="button"
              aria-label="Open alerts"
              className="fh-shell-control relative inline-flex h-11 w-11 items-center justify-center rounded-2xl"
            >
              <Bell className="h-5 w-5 text-slate-700" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
            </button>
            <button
              type="button"
              aria-label="Open quick navigation"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="fh-shell-control inline-flex h-11 w-11 items-center justify-center rounded-2xl lg:hidden"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {operatorMenuOpen ? (
          <>
            <button
              type="button"
              aria-label="Close role switcher"
              onClick={() => setOperatorMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[1px]"
            />
            <div
              ref={operatorMenuRef}
              className="fixed inset-x-3 top-[88px] z-50 max-h-[76vh] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[color:var(--card)] shadow-[0_26px_70px_rgba(15,23,42,0.35)] sm:inset-x-auto sm:right-5 sm:top-[74px] sm:w-[460px]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <div className="text-xl font-semibold text-slate-900">Switch role</div>
                <button
                  type="button"
                  aria-label="Close role switcher"
                  onClick={() => setOperatorMenuOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[color:var(--surface)] text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="fh-scroll-region max-h-[calc(76vh-122px)] space-y-4 overflow-y-auto px-3 py-3">
                {roleSwitcherGroups.map((group) => (
                  <div key={group.section}>
                    <div className="px-1 fh-label text-slate-500">{group.section}</div>
                    <div className="mt-2 space-y-2">
                      {group.roles.map((role) => {
                        const active = role.id === activeOperatorRole.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => handleOperatorRoleSelect(role.id)}
                            className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                              active
                                ? "border-[#a2e2cd] bg-[#ecfff8]"
                                : "border-[var(--border)] bg-[color:var(--surface)] hover:-translate-y-[1px] hover:border-[#a2e2cd] hover:bg-[#f7fffb]"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                  active ? "bg-[#03cd8c] text-white" : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                <role.icon className="h-5 w-5" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-xl font-semibold leading-[1.2] text-slate-900">
                                  Switch to {role.label}
                                </span>
                                <span className="mt-0.5 block text-sm text-slate-600">{role.description}</span>
                              </span>
                              {active ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#03cd8c]" /> : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border)] p-3">
                <button
                  type="button"
                  onClick={() => {
                    setOperatorMenuOpen(false);
                    navigate("/app/admin/overview");
                  }}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--border)] bg-[color:var(--surface)] px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f7fffb] hover:text-[#049e6d]"
                >
                  Manage roles & permissions
                </button>
              </div>
            </div>
          </>
        ) : null}

        {mobileNavOpen ? (
          <div className="border-t border-[color:var(--border)] bg-[color:var(--card)] px-3 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setOperatorMenuOpen(true)}
              className="mb-2 flex w-full items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-left text-sm font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                <activeOperatorRole.icon className="h-4 w-4 text-[#03cd8c]" />
                {activeOperatorRole.label}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
            <div className="grid gap-2 sm:grid-cols-2">
              {mobileJumpLinks.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => {
                    scrollToId(item.target);
                    setMobileNavOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-left text-sm font-semibold"
                >
                  <span className="inline-flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-[#03cd8c]" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <div className="mx-auto flex max-w-[1860px] min-h-0 flex-1 gap-3 overflow-hidden px-2 pb-3 pt-3 sm:px-3 lg:px-4">
        <aside className={`hidden min-h-0 shrink-0 lg:block ${sidebarCollapsed ? "w-[84px]" : "w-[248px]"}`}>
          <div className="h-full">
            {sidebarCollapsed ? (
              <LandingSidebarRail
                modules={activeSidebarModules}
                activeModule={openModule}
                onModuleSelect={setOpenModule}
                onExpand={() => setSidebarCollapsed(false)}
              />
            ) : (
              <LandingSidebarPanel
                modules={activeSidebarModules}
                openModule={openModule}
                onModuleToggle={setOpenModule}
                onAction={runTarget}
                onCollapse={() => setSidebarCollapsed(true)}
              />
            )}
          </div>
        </aside>

        {mobileSidebarOpen ? (
          <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-[1px] lg:hidden">
            <div className="h-full w-[320px] max-w-[88vw] bg-[color:var(--bg)] p-3 shadow-2xl">
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <div className="text-sm font-semibold">Navigation</div>
                  <div className="text-xs text-[color:var(--text-secondary)]">Modules</div>
                </div>
                <button
                  type="button"
                  aria-label="Close sidebar"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--card)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <LandingSidebarPanel
                modules={activeSidebarModules}
                openModule={openModule}
                onModuleToggle={setOpenModule}
                onAction={(target) => {
                  runTarget(target);
                  setMobileSidebarOpen(false);
                }}
                compactHeight
              />
            </div>
          </div>
        ) : null}

        <main className="fh-scroll-region min-h-0 min-w-0 flex-1 space-y-3 overflow-y-auto pr-1">
          <section
            id="overview"
            className="overflow-hidden rounded-[24px] border border-[color:var(--fh-hero-border)] shadow-[0_18px_34px_rgba(15,23,42,0.1)]"
            style={{ background: "var(--fh-hero-grad)" }}
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0">
                  <div className="text-xs text-slate-500">FaithHub Platform</div>
                  <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]">{copy.hero.title}</h1>
                  <p className="mt-2 max-w-3xl text-sm text-slate-600">
                    FaithHub brings worship, teachings, Live Sessionz, events, giving, memberships, messaging,
                    marketplace experiences, trust systems, provider operations, and platform-grade governance into one
                    premium ecosystem inside the EVzone Super App.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge className="rounded-full border border-[#f5d39b] bg-[#fff8ef] text-[#cc6500] hover:bg-[#fff2e2]">
                      {activeOperatorRole.label}
                    </Badge>
                    <Badge className="rounded-full border border-slate-200 bg-[color:var(--card)] text-slate-700 hover:bg-[color:var(--surface)]">
                      Base role: {activeOperatorRole.baseRole}
                    </Badge>
                    <Badge className="rounded-full border border-slate-200 bg-[color:var(--card)] text-slate-700 hover:bg-[color:var(--surface)]">
                      {activeOperatorRole.heroFocus}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                  <TopChip icon={Users} label={viewingLabel} />
                  <div className="inline-flex rounded-xl border border-slate-200 bg-[color:var(--card)] p-1">
                    {cockpitTabs.map((windowLabel) => (
                      <button
                        key={windowLabel}
                        type="button"
                        onClick={() => setSelectedWindow(windowLabel)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          selectedWindow === windowLabel
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:bg-[color:var(--surface)]"
                        }`}
                      >
                        {windowLabel}
                      </button>
                    ))}
                  </div>
                  <TopChip icon={MessageSquare} label={copy.hero.openMessages} />
                  <Button
                    className={`h-9 rounded-xl px-4 text-xs font-semibold ${ctaPriorityClass("primary")}`}
                    onClick={() => navigate("/user")}
                  >
                    {copy.ctas.openUserApp}
                  </Button>
                  <Button
                    className={`h-9 rounded-xl px-4 text-xs font-semibold ${ctaPriorityClass("accent")}`}
                    onClick={() => navigate("/provider")}
                  >
                    {copy.ctas.openProviderApp}
                  </Button>
                </div>
              </div>

              <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                {shortcutCards.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => runTarget(item.target)}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-[color:var(--card)] px-3 py-2 text-left transition hover:-translate-y-[1px]"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="truncate text-sm font-semibold text-slate-900">{item.label}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600" />
                  </button>
                ))}
              </div>

              <div className="mt-3 grid gap-2 lg:grid-cols-3">
                {progressCards.map((item) => (
                  <Card key={item.title} className="rounded-xl border-slate-200 bg-[color:var(--card)]/95">
                    <CardContent className="p-3">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="text-xs text-slate-500">{item.title}</div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pillToneClass(item.tone)}`}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="text-3xl font-bold leading-none text-slate-900">{item.value}</div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                        <div className={`h-full rounded-full ${item.widthClass} ${progressToneClass(item.tone)}`} />
                      </div>
                      <p className="mt-1 text-xs text-slate-600">{item.note}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {miniStats.map((item) => (
              <Card key={item.title} className="rounded-2xl border-slate-200 bg-[color:var(--card)]">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecfff8] text-[#049e6d]">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pillToneClass(item.tone)}`}>
                      {item.trend}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{item.title}</div>
                  <div className="text-3xl font-bold leading-none text-slate-900">{item.value}</div>
                  <svg viewBox="0 0 28 14" className="mt-2 h-6 w-full text-[#03cd8c]" fill="none" aria-hidden>
                    <path d={item.spark} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-3 xl:grid-cols-[1.05fr_1.05fr_1fr]">
            <Card className="fh-interactive-card rounded-2xl border-slate-200 bg-[color:var(--card)]">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">FaithHub priorities</div>
                    <div className="text-sm text-slate-500">Move platform capabilities forward</div>
                  </div>
                  <button type="button" className="text-sm font-semibold text-slate-500">
                    {copy.ctas.openFullList}
                  </button>
                </div>
                <div className="space-y-2">
                  {featureGroups.slice(0, 3).map((group) => (
                    <button
                      key={group.title}
                      type="button"
                      onClick={() => runTarget("platform")}
                      className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-[color:var(--surface)] px-3 py-3 text-left"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900">{group.title}</div>
                        <div className="truncate text-xs text-slate-500">{group.subtitle}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card rounded-2xl border-slate-200 bg-[color:var(--card)]">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Agenda</div>
                    <div className="text-sm text-slate-500">Today's timeline</div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-[color:var(--card)] px-2.5 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    <CalendarDays className="h-3.5 w-3.5" />
                    {copy.ctas.openSchedule}
                  </button>
                </div>
                <div className="space-y-2">
                  {timelineSteps.slice(0, 3).map((step, index) => (
                    <div key={step.title} className="rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3">
                      <div className="flex items-start gap-2">
                        <div className="inline-flex h-7 min-w-[2.2rem] items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-semibold text-slate-600">
                          {index === 0 ? "09:15" : index === 1 ? "12:10" : "16:20"}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{step.title}</div>
                          <div className="mt-1 text-xs text-slate-500">{step.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3">
                  <div className="mb-1 text-xs text-slate-500">Completion</div>
                  <div className="text-2xl font-bold leading-none text-slate-900">58%</div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                    <div className="h-full w-[58%] rounded-full bg-[#f77f00]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card id="trust" className="rounded-2xl border-slate-200 bg-[color:var(--card)]">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Action Center</div>
                    <div className="text-sm text-slate-500">Notifications, insights and fast actions</div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-[color:var(--card)] text-slate-600"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {trustTiles.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-[color:var(--surface)] px-3 py-2 text-left"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#ecfff8] text-[#049e6d]">
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600" />
                    </button>
                  ))}
                </div>

                <div className="mt-3 fh-subcard-accent rounded-xl p-3">
                  <div className="fh-label text-emerald-700">Smart insights</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">Practical signals for better decisions</div>
                  <div className="mt-1 text-xs text-slate-600">{topHighlights[0].text}</div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="experiences" className="grid gap-3 lg:grid-cols-2">
            {roleCards.map((role) => (
              <Card key={role.role} className="rounded-2xl border-slate-200 bg-[color:var(--card)]">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfff8] text-[#03cd8c]">
                      <role.icon className="h-5 w-5" />
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${role.badgeTone}`}>{role.role}</span>
                  </div>
                  <div className="text-xl font-semibold text-slate-900">{role.title}</div>
                  <p className="mt-2 text-sm text-slate-600">{role.description}</p>
                  <div className="mt-3 space-y-1.5">
                    {role.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-[color:var(--surface)] p-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#03cd8c]" />
                        <div className="text-xs text-slate-700">{bullet}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      className="h-9 rounded-xl bg-[#03cd8c] px-3 text-xs font-semibold hover:bg-[#02b67c]"
                      onClick={() => navigate(role.target)}
                    >
                      {role.role === "Provider" ? "Open Provider Workspace" : "Enter FaithHub"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 rounded-xl border-slate-200 bg-[color:var(--card)] px-3 text-xs font-semibold"
                      onClick={() => setActiveRole(role.role)}
                    >
                      Set focus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <section id="platform" className="grid gap-3 xl:grid-cols-2">
            <Card className="fh-interactive-card rounded-2xl border-slate-200 bg-[color:var(--card)]">
              <CardContent className="p-4">
                <div className="mb-3 text-lg font-semibold text-slate-900">Platform architecture</div>
                <div className="space-y-2">
                  {featureGroups.map((group) => (
                    <div key={group.title} className="rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <group.icon className="h-4 w-4 text-[#03cd8c]" />
                        {group.title}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">{group.subtitle}</div>
                      <div className="mt-2 space-y-1">
                        {group.items.map((entry) => (
                          <div key={entry} className="text-xs text-slate-600">
                            - {entry}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="live" className="rounded-2xl border-slate-200 bg-[color:var(--card)]">
              <CardContent className="p-4">
                <div className="mb-3 text-lg font-semibold text-slate-900">Live and commerce pillars</div>
                <div className="space-y-2">
                  {featuredPillars.map((panel) => (
                    <div
                      key={panel.id}
                      id={panel.id === "faithmart" ? "faithmart" : undefined}
                      className="rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3"
                    >
                      <div className="mb-2 inline-flex rounded-full bg-[#ecfff8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#049e6d]">
                        {panel.tag}
                      </div>
                      <div className="text-sm font-semibold text-slate-900">{panel.title}</div>
                      <div className="mt-1 text-xs text-slate-600">{panel.description}</div>
                      <div className="mt-2 space-y-1">
                        {panel.items.map((item) => (
                          <div key={item.text} className="flex items-start gap-2 text-xs text-slate-700">
                            <item.icon className="mt-0.5 h-3.5 w-3.5 text-[#03cd8c]" />
                            {item.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="faq" className="grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="fh-interactive-card rounded-2xl border-slate-200 bg-[color:var(--card)]">
              <CardContent className="p-4">
                <div className="mb-3 text-lg font-semibold text-slate-900">FAQ</div>
                <div className="space-y-2">
                  {faq.map((item, index) => (
                    <button
                      key={item.q}
                      type="button"
                      onClick={() => setFaqOpen((prev) => (prev === index ? -1 : index))}
                      className="w-full rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3 text-left"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{item.q}</div>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${faqOpen === index ? "rotate-180" : ""}`} />
                      </div>
                      {faqOpen === index ? <div className="mt-2 text-xs text-slate-600">{item.a}</div> : null}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="contact" className="rounded-2xl border-slate-200 bg-[color:var(--card)]">
              <CardContent className="p-4">
                <div className="mb-3 text-lg font-semibold text-slate-900">Signals and reviews</div>
                <div className="space-y-2">
                  {testimonials.map((item) => (
                    <div key={item.quote} className="rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3">
                      <div className="mb-1 flex gap-1 text-[#f77f00]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3.5 w-3.5 fill-[#f77f00] text-[#f77f00]" />
                        ))}
                      </div>
                      <div className="text-xs text-slate-700">"{item.quote}"</div>
                      <div className="mt-2 text-xs font-semibold text-[#049e6d]">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.title}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3">
                  <div className="fh-label text-slate-500">Device readiness</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {deviceTabs.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveDevice(item.key)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          activeDevice === item.key
                            ? "bg-slate-900 text-white"
                            : "border border-slate-200 bg-[color:var(--card)] text-slate-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">{currentDevice?.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{currentDevice?.text}</div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button
                    onClick={() => navigate("/user")}
                    className="h-10 rounded-xl bg-[#03cd8c] px-4 text-xs font-semibold hover:bg-[#02b67c]"
                  >
                    Enter FaithHub
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                  <Button
                    onClick={() => navigate("/provider")}
                    variant="outline"
                    className="h-10 rounded-xl border-slate-200 bg-[color:var(--card)] px-4 text-xs font-semibold"
                  >
                    Start Building
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="fh-interactive-card rounded-2xl border-slate-200 bg-[color:var(--card)]">
            <CardContent className="p-4">
              <div className="mb-3 text-lg font-semibold text-slate-900">Current focus context</div>
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                <FocusTile icon={Users} label="Role focus" value={currentRole?.role ?? "User"} detail={currentRole?.title ?? ""} />
                <FocusTile icon={Compass} label="Digital posture" value="Live-first" detail={topHighlights[1].title} />
                <FocusTile icon={ShoppingBag} label="Commerce posture" value="FaithMart ready" detail={topHighlights[2].title} />
                <FocusTile icon={ShieldCheck} label="Trust posture" value="Policy-ready" detail={topHighlights[3].title} />
              </div>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
}

function TopChip({ icon: Icon, label, className = "" }: { icon: LucideIcon; label: string; className?: string }) {
  return (
    <button
      type="button"
      className={`fh-shell-control inline-flex h-11 items-center gap-2 rounded-2xl px-3 text-xs font-semibold text-slate-700 ${className}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function LandingSidebarPanel({
  modules,
  openModule,
  onModuleToggle,
  onAction,
  onCollapse,
  compactHeight = false,
}: {
  modules: SidebarModule[];
  openModule: string;
  onModuleToggle: (id: string) => void;
  onAction: (target: string) => void;
  onCollapse?: () => void;
  compactHeight?: boolean;
}) {
  return (
    <Card className="fh-interactive-card h-full overflow-hidden rounded-[20px] border border-[var(--fh-nav-shell-border)] bg-[color:var(--fh-nav-shell-bg)] shadow-[0_20px_40px_rgba(2,8,20,0.18)]">
      <CardContent
        className={`flex min-h-0 flex-col gap-2.5 p-2.5 ${compactHeight ? "max-h-[78vh]" : "h-full"}`}
      >
        <div className="flex items-start justify-between px-0.5">
          <div>
            <div className="text-sm font-semibold text-[var(--fh-nav-title)]">Navigation</div>
            <div className="text-xs text-[var(--fh-nav-muted)]">Modules</div>
          </div>
          {onCollapse ? (
            <button
              type="button"
              aria-label="Minimize sidebar"
              onClick={onCollapse}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="fh-scroll-region min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {modules.map((module) => {
            const expanded = openModule === module.id;
            return (
              <div key={module.id} className="rounded-xl border border-[var(--fh-nav-section-border)] bg-[color:var(--fh-nav-section-bg)]">
                <button
                  type="button"
                  onClick={() => onModuleToggle(expanded ? "" : module.id)}
                  className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--fh-nav-section-icon-bg)] text-[var(--fh-nav-section-icon-fg)]">
                    <module.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--fh-nav-muted)]">
                    {module.label}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 text-[var(--fh-nav-item-chevron)] transition ${expanded ? "rotate-90" : ""}`}
                  />
                </button>

                {expanded && module.entries.length > 0 ? (
                  <div className="space-y-1 border-t border-[var(--fh-nav-section-divider)] px-2 pb-2 pt-2">
                    {module.entries.map((entry) => (
                      <button
                        key={entry.title}
                        type="button"
                        onClick={() => (entry.target ? onAction(entry.target) : undefined)}
                        className={`w-full rounded-lg border px-2.5 py-2 text-left transition ${
                          entry.highlighted
                            ? "border-[#69d3b2] bg-[#03cd8c] text-white"
                            : "border-transparent bg-[color:var(--fh-nav-item-bg)] text-[var(--fh-nav-item-title)] hover:border-[var(--fh-nav-item-hover-border)]"
                        }`}
                      >
                        <div className="text-sm font-semibold">{entry.title}</div>
                        <div className={`text-xs ${entry.highlighted ? "text-white/90" : "text-[var(--fh-nav-item-sub)]"}`}>
                          {entry.detail}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

      </CardContent>
    </Card>
  );
}

function LandingSidebarRail({
  modules,
  activeModule,
  onModuleSelect,
  onExpand,
}: {
  modules: SidebarModule[];
  activeModule: string;
  onModuleSelect: (id: string) => void;
  onExpand: () => void;
}) {
  return (
    <Card className="fh-interactive-card h-full overflow-hidden rounded-[20px] border border-[var(--fh-nav-shell-border)] bg-[color:var(--fh-nav-shell-bg)] shadow-[0_20px_40px_rgba(2,8,20,0.18)]">
      <CardContent className="flex h-full min-h-0 flex-col items-center gap-1.5 p-1.5">
        <button
          type="button"
          aria-label="Expand sidebar"
          onClick={onExpand}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--fh-nav-ghost-btn-border)] bg-[color:var(--fh-nav-ghost-btn-bg)] text-[var(--fh-nav-title)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="mt-0.5 flex w-full flex-col items-center gap-1.5">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              aria-label={module.label}
              title={module.label}
              onClick={() => onModuleSelect(module.id)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                activeModule === module.id
                  ? "border-[var(--fh-nav-rail-active-border)] bg-[color:var(--fh-nav-rail-active-bg)] text-[var(--fh-nav-rail-active-fg)]"
                  : "border-[var(--fh-nav-rail-icon-border)] bg-[color:var(--fh-nav-rail-icon-bg)] text-[var(--fh-nav-rail-icon-fg)]"
              }`}
            >
              <module.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FocusTile({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-[color:var(--surface)] p-3">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecfff8] text-[#049e6d]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-600">{detail}</div>
    </div>
  );
}

function pillToneClass(tone: QuickTone) {
  if (tone === "orange") return "bg-[#fff3e8] text-[#cc6500]";
  if (tone === "slate") return "bg-slate-100 text-slate-600";
  return "bg-[#ecfff8] text-[#049e6d]";
}

function progressToneClass(tone: QuickTone) {
  if (tone === "orange") return "bg-[#f77f00]";
  if (tone === "slate") return "bg-[#3b82f6]";
  return "bg-[#10b981]";
}

