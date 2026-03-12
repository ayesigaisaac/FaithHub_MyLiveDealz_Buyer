// @ts-nocheck
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  Globe2,
  HelpCircle,
  HeartHandshake,
  Landmark,
  Layers3,
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
  Star,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorModeToggle } from "@/theme/color-mode-toggle";

const faithmartLogoLandscape = "/faithmart-logo-landscape.png";

const navItems = [
  { label: "Overview", id: "overview", icon: Compass },
  { label: "Experiences", id: "experiences", icon: Users },
  { label: "Live Sessionz", id: "live", icon: Radio },
  { label: "FaithMart", id: "faithmart", icon: ShoppingBag },
  { label: "Trust & Safety", id: "trust", icon: ShieldCheck },
  { label: "FAQ", id: "faq", icon: HelpCircle },
  { label: "Contact", id: "contact", icon: Mail },
];

const roleCards = [
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
    badgeTone: "bg-[#ecfff8] text-[#03cd8c]",
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
    badgeTone: "bg-[#fff8ef] text-[#f77f00]",
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

const liveDetails = [
  "Waiting rooms, pre-chat, polls, and prayer requests before the session begins",
  "Low-latency playback, live chat, captions, translation, and safe reporting tools",
  "Post-live replays, chapters, transcripts, highlights, and reusable teaching assets",
];

const faithMartDetails = [
  "Event tickets, vendor booths, branded merchandise, and marketplace-day selling",
  "Institution-linked product and service discovery for faith communities",
  "A connected commerce engine that supports sustainability without fragmenting the experience",
];

const stats = [
  { label: "Public-facing roles", value: "2", note: "User and Provider", icon: Users },
  { label: "Page ecosystem", value: "50+", note: "Structured across the project architecture", icon: BookOpen },
  { label: "Core pillars", value: "6", note: "Live, Series, Events, Messaging, Commerce, Trust", icon: Layers3 },
  { label: "Device readiness", value: "100%", note: "Desktop, tablet, and mobile responsive", icon: MonitorSmartphone },
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

const deviceTabs = [
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

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      {action ? (
        <Button variant="ghost" onClick={onAction} className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
          {action}
        </Button>
      ) : null}
    </div>
  );
}

export default function FaithHubLandingPageV2() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("User");
  const [activeDevice, setActiveDevice] = useState("desktop");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  const currentRole = useMemo(() => roleCards.find((item) => item.role === activeRole), [activeRole]);
  const currentDevice = useMemo(() => deviceTabs.find((item) => item.key === activeDevice), [activeDevice]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-[var(--bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8 2xl:max-w-[110rem] 2xl:px-10">
          <button type="button" onClick={() => scrollToId("overview")} className="flex shrink-0 items-center gap-3 text-left">
            <img src={faithmartLogoLandscape} alt="FaithMart" className="h-12 w-auto max-w-[15rem] object-contain sm:h-14 sm:max-w-[18rem]" />
          </button>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-200 hover:bg-white hover:text-[#03cd8c] hover:shadow-sm 2xl:px-4"
              >
                <item.icon className="h-4 w-4 text-slate-400 transition group-hover:text-[#03cd8c]" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:flex-nowrap">
            <ColorModeToggle className="hidden 2xl:inline-flex" />
            <Button
              variant="outline"
              className="shrink-0 whitespace-nowrap rounded-2xl border-slate-200 bg-white px-5 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
              onClick={() => navigate("/user")}
            >
              Enter FaithHub
            </Button>
            <Button className="shrink-0 whitespace-nowrap rounded-2xl bg-[#03cd8c] px-5 hover:bg-[#02b67c]" onClick={() => navigate("/provider")}>
              Start Building
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
            aria-controls="faithhub-mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              id="faithhub-mobile-nav"
              className="border-t border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      scrollToId(item.id);
                      setMobileNavOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-left text-sm font-medium text-slate-700"
                  >
                    <span className="inline-flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-[#03cd8c]" />
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
                <div className="pt-2">
                  <ColorModeToggle className="w-full justify-between" />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white" onClick={() => { navigate("/user"); setMobileNavOpen(false); }}>
                    Enter FaithHub
                  </Button>
                  <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" onClick={() => { navigate("/provider"); setMobileNavOpen(false); }}>
                    Start Building
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="overview" className="relative overflow-hidden scroll-mt-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_18%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.58fr_0.42fr] lg:px-8 lg:py-16 2xl:max-w-[110rem] 2xl:grid-cols-[0.6fr_0.4fr] 2xl:gap-14 2xl:px-10 2xl:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-4 py-1.5 text-[12px] font-semibold tracking-[0.14em] text-[var(--accent)] shadow-[var(--shadow-soft)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  A new digital faith infrastructure
                </div>
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-900/95 px-4 py-1.5 text-[12px] font-semibold tracking-[0.14em] text-white shadow-[var(--shadow-soft)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="text-white">Multi-faith, live-first, commerce-enabled</span>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:max-w-5xl 2xl:text-8xl">
                  FaithHub is designed to become the most complete digital faith platform in the world.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg 2xl:max-w-4xl">
                  FaithHub brings worship, teachings, Live Sessionz, events, giving, memberships, messaging,
                  marketplace experiences, trust systems, provider operations, and platform-grade governance into one
                  premium ecosystem inside the EVzone Super App.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button className="w-full rounded-2xl bg-[#03cd8c] px-5 py-5 text-base hover:bg-[#02b67c] sm:w-auto sm:py-6" onClick={() => navigate("/user") }>
                  Enter FaithHub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full rounded-2xl border-slate-200 bg-white px-5 py-5 text-base hover:border-[#03cd8c]/35 hover:bg-[#f7fffb] sm:w-auto sm:py-6" onClick={() => navigate("/provider")}>
                  Start Building
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <Card key={item.label} className="rounded-2xl border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex h-full min-h-[170px] flex-col gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfff8] text-[#03cd8c]">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#03cd8c]">{item.label}</div>
                        <div className="text-4xl font-semibold leading-none text-slate-900">{item.value}</div>
                        <div className="min-w-0 text-sm leading-6 text-slate-600">{item.note}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="relative z-10"
            >
              <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.32)]">
                <CardContent className="p-0">
                  <div className="border-b border-[#03cd8c]/20 bg-[#ecfff8] p-6 text-slate-900 sm:p-7">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">FaithHub Snapshot</div>
                        <div className="mt-2 text-3xl font-semibold leading-tight text-[#03cd8c]">A platform for users and institutions</div>
                      </div>
                      <div className="rounded-full border border-[#03cd8c]/25 bg-white px-3 py-1 text-xs font-semibold text-[#03cd8c]">
                        Website Landing Experience
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {roleCards.map((item) => (
                        <button
                          type="button"
                          key={item.role}
                          onClick={() => setActiveRole(item.role)}
                          className={`rounded-xl border p-4 text-left transition ${
                            activeRole === item.role
                              ? "border-[#03cd8c]/35 bg-white shadow-sm"
                              : "border-[#03cd8c]/20 bg-white hover:border-[#03cd8c]/35"
                          }`}
                        >
                          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="text-base font-semibold text-slate-900">{item.role}</div>
                          <div className="mt-1 text-sm text-slate-600">{item.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Current focus</div>
                        <div className="mt-1 text-2xl font-semibold text-slate-900">{currentRole?.title}</div>
                      </div>
                      <span className={`rounded-full px-3 py-2 text-xs font-semibold ${currentRole?.badgeTone}`}>
                        {currentRole?.role}
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-slate-600">{currentRole?.description}</p>

                    <div className="space-y-3">
                      {currentRole?.bullets.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                          <div className="text-sm text-slate-700">{item}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
                        onClick={() => navigate(currentRole?.role === "Provider" ? "/provider" : "/user")}
                      >
                        {currentRole?.role === "Provider" ? "Open Provider Workspace" : "Open User Experience"}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => scrollToId("experiences")}
                      >
                        Compare Roles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10 2xl:max-w-[110rem] 2xl:px-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {topHighlights.map((item) => (
              <Card key={item.title} className="h-full rounded-2xl border-slate-200 bg-white shadow-sm">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-balance text-lg font-semibold leading-snug text-slate-900">{item.title}</div>
                  <div className="mt-2 text-pretty text-sm leading-7 text-slate-600">{item.text}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-[110rem] 2xl:px-10">
          <div className="mb-6 max-w-3xl">
            <div className="text-base font-semibold uppercase tracking-[0.18em] text-[#03cd8c]">How the ecosystem works</div>
            <h2 className="mt-2 text-5xl font-semibold text-slate-900 sm:text-6xl leading-tight">
              FaithHub is structured around a complete digital faith lifecycle.
            </h2>
            <p className="mt-4 text-lg leading-9 text-slate-600">
              Every major pillar of digital faith is covered, from content and live participation to events,
              commerce, fundraising, trust, and institutional administration.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {featureGroups.map((group) => (
              <Card key={group.title} className="rounded-2xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-7 sm:p-8">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <group.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-semibold leading-tight text-[#03cd8c]">{group.title}</div>
                      <div className="mt-1 text-lg text-slate-500">{group.subtitle}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#03cd8c]" />
                        <div className="text-lg leading-8 text-slate-700">{item}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="experiences" className="bg-white/50 scroll-mt-24 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[110rem] 2xl:px-10">
            <div className="mb-6 max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Role architecture</div>
              <h2 className="mt-2 text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl">
                One platform. Two public-facing experiences.
              </h2>
              <p className="mt-4 text-lg leading-9 text-slate-600">
                FaithHub publicly presents a user experience and a provider experience, while stronger governance
                and operational control remain embedded in the platform backbone.
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {roleCards.map((item) => (
                <Card key={item.role} className="rounded-2xl border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6 sm:p-7">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded-full px-3 py-2 text-xs font-semibold ${item.badgeTone}`}>
                        {item.role}
                      </span>
                    </div>
                    <div className="text-4xl font-semibold leading-tight text-[#03cd8c]">{item.title}</div>
                    <div className="mt-3 text-lg leading-8 text-slate-600">{item.description}</div>
                    <div className="mt-5 space-y-3">
                      {item.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                          <div className="text-sm text-slate-700">{bullet}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
                        onClick={() => navigate(item.role === "Provider" ? "/provider" : "/user")}
                      >
                        {item.role === "Provider" ? "Open Provider Workspace" : "Enter FaithHub"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="live" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-[110rem] 2xl:px-10">
          <div className="grid gap-6 xl:grid-cols-[0.5fr_0.5fr]">
            <Card className="overflow-visible rounded-3xl border-slate-200 bg-white text-slate-900 shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <Radio className="h-6 w-6" />
                    </div>
                    <div>
                    <div className="text-base font-semibold uppercase tracking-[0.18em] text-[#03cd8c]">Live Sessionz</div>
                      <div className="mt-1 text-4xl font-semibold leading-tight">A premium live faith infrastructure</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                  {liveDetails.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#03cd8c]" />
                      <div className="min-w-0 break-words whitespace-normal text-lg leading-8 text-slate-700">{item}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button className="rounded-2xl bg-[#03cd8c] px-5 py-6 text-base hover:bg-[#02b67c]" onClick={() => navigate("/provider")}>
                    Start Building
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-base hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => scrollToId("trust")}>
                    See Trust Controls
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card id="faithmart" className="scroll-mt-24 rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-base font-semibold uppercase tracking-[0.18em] text-[#03cd8c]">FaithMart</div>
                    <div className="mt-1 text-4xl font-semibold leading-tight text-slate-900">Commerce that actually belongs inside the experience</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {faithMartDetails.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#03cd8c]" />
                      <div className="text-lg leading-8 text-slate-700">{item}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button className="rounded-2xl bg-[#03cd8c] px-5 py-6 text-base hover:bg-[#02b67c]" onClick={() => scrollToId("contact")}>
                    Discuss FaithMart Setup
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-base hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => scrollToId("platform")}>
                    Explore Platform Pillars
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-[110rem] 2xl:px-10">
          <div className="grid gap-6 xl:grid-cols-[0.48fr_0.52fr]">
            <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-7 sm:p-8">
                <div className="mb-6 inline-flex items-center rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#03cd8c]">
                  Experience journey
                </div>
                <div className="space-y-5">
                  {timelineSteps.map((step, index) => (
                    <div key={step.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#f8fafc] p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#03cd8c] text-base font-semibold text-white">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-2xl font-semibold leading-tight text-slate-900">{step.title}</div>
                        <div className="mt-3 text-base leading-8 text-slate-600">{step.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-0">
                <div className="bg-slate-950 p-5 text-white sm:p-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8ef0ca]">Built for every device</div>
                      <div className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">Responsive across desktop, tablet, and mobile</div>
                    </div>
                    <MonitorSmartphone className="h-7 w-7 text-[#8ef0ca]" />
                  </div>

                  <div className="mb-5 flex w-full flex-wrap gap-2">
                    {deviceTabs.map((item) => (
                      <button
                        type="button"
                        key={item.key}
                        onClick={() => setActiveDevice(item.key)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          activeDevice === item.key
                            ? "bg-white text-slate-900"
                            : "bg-white/10 text-white hover:bg-white/15"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <div className="mb-4 aspect-video w-full rounded-xl bg-white/10" />
                    <div className="text-xl font-semibold">{currentDevice?.title}</div>
                    <div className="mt-2 text-sm leading-7 text-white/80">{currentDevice?.text}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="trust" className="bg-white/50 scroll-mt-24 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[110rem] 2xl:px-10">
            <div className="grid gap-6 xl:grid-cols-[0.52fr_0.48fr]">
              <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-7 sm:p-8">
                  <div className="mb-6 inline-flex items-center rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#03cd8c]">
                    Trust and safety
                  </div>
                  <div className="text-4xl font-semibold text-slate-900 sm:text-5xl">
                    FaithHub is designed to be trusted by users, institutions, and platform operators.
                  </div>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                    <p>
                      The platform includes institution verification, review and moderation flows, content policy
                      controls, live moderation consoles, audit visibility, and payments oversight.
                    </p>
                    <p>
                      This is essential for a digital faith platform that aims to move far beyond the limitations of
                      simple live streaming or brochure-style ministry websites.
                    </p>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {trustTiles.map((item) => (
                      <div key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-semibold text-[#03cd8c]">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-7 sm:p-8">
                  <div className="mb-3 inline-flex items-center rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#03cd8c]">
                    What people will feel
                  </div>
                  <div className="mb-5 text-base font-semibold leading-tight text-slate-900">Real feedback from the FaithHub product vision</div>
                  <div className="space-y-4">
                    {testimonials.map((item) => (
                      <div key={item.quote} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                        <div className="mb-4 flex gap-1 text-[#f77f00]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-[#f77f00] text-[#f77f00]" />
                          ))}
                        </div>
                        <div className="min-w-0 break-words whitespace-normal text-base leading-8 text-slate-700">"{item.quote}"</div>
                        <div className="mt-4 text-sm font-semibold text-[#03cd8c]">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.title}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16 2xl:max-w-[110rem] 2xl:px-10">
          <div className="grid gap-6 xl:grid-cols-[0.52fr_0.48fr]">
            <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 inline-flex items-center rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#03cd8c]">
                  Frequently asked questions
                </div>
                <div className="space-y-3">
                  {faq.map((item, index) => (
                    <button
                      type="button"
                      key={item.q}
                      onClick={() => setFaqOpen(index === faqOpen ? -1 : index)}
                      className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 text-left"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xl font-semibold leading-tight text-slate-900">{item.q}</div>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition ${faqOpen === index ? "rotate-180" : ""}`} />
                      </div>
                      {faqOpen === index ? (
                        <div className="mt-4 text-sm leading-7 text-slate-600">{item.a}</div>
                      ) : null}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="contact" className="scroll-mt-24 overflow-hidden rounded-3xl border-slate-200 bg-white text-slate-900 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6 inline-flex items-center rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#03cd8c]">
                  Take the next step
                </div>
                <div className="max-w-[20ch] text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-[2.5rem]">
                  Open the right workspace and move straight into the product.
                </div>
                <div className="mt-4 max-w-[52ch] text-base leading-8 text-slate-600">
                  Keep the public experience focused on real entry points: the user journey and the provider workspace.
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => navigate("/user")}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 text-left transition hover:border-[#03cd8c]/30 hover:bg-[#f7fffb]"
                  >
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-semibold">Enter FaithHub</div>
                    <div className="mt-2 text-base leading-7 text-slate-600">Open the user experience for discovery, live sessions, giving, events, and community engagement.</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/provider")}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 text-left transition hover:border-[#03cd8c]/30 hover:bg-[#f7fffb]"
                  >
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-semibold">Start Building</div>
                    <div className="mt-2 text-base leading-7 text-slate-600">Open the provider workspace for dashboards, live operations, publishing, messaging, and institution tools.</div>
                  </button>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button className="rounded-2xl bg-[#03cd8c] px-5 py-6 text-base hover:bg-[#02b67c]" onClick={() => navigate("/user")}>
                    Enter FaithHub
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-base hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => navigate("/provider")}>
                    Start Building
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8 2xl:max-w-[110rem] 2xl:px-10">
          <div>
            <button type="button" onClick={() => scrollToId("overview")} className="flex items-center gap-3 text-left">
              <img src={faithmartLogoLandscape} alt="FaithMart" className="h-12 w-auto max-w-[15rem] object-contain sm:h-14 sm:max-w-[18rem]" />
            </button>
            <div className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
              A world-class digital faith ecosystem for communities and institutions, powered by the wider EVzone vision.
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-slate-900">Explore</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <button type="button" onClick={() => scrollToId("experiences")} className="block hover:text-[#03cd8c]">User Experience</button>
                <button type="button" onClick={() => scrollToId("experiences")} className="block hover:text-[#03cd8c]">Provider Workspace</button>
                <button type="button" onClick={() => scrollToId("platform")} className="block hover:text-[#03cd8c]">Platform Architecture</button>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Core Systems</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <button type="button" onClick={() => scrollToId("live")} className="block hover:text-[#03cd8c]">Live Sessionz</button>
                <button type="button" onClick={() => scrollToId("platform")} className="block hover:text-[#03cd8c]">Series & Teachings</button>
                <button type="button" onClick={() => scrollToId("faithmart")} className="block hover:text-[#03cd8c]">FaithMart</button>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Trust & Support</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <button type="button" onClick={() => scrollToId("trust")} className="block hover:text-[#03cd8c]">Trust & Safety</button>
                <button type="button" onClick={() => scrollToId("faq")} className="block hover:text-[#03cd8c]">FAQ</button>
                <button type="button" onClick={() => scrollToId("contact")} className="block hover:text-[#03cd8c]">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}


