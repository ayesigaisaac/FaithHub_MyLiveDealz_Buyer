// @ts-nocheck
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  HeartHandshake,
  Landmark,
  Layers3,
  Lock,
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
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { label: "Overview", id: "overview" },
  { label: "Experiences", id: "experiences" },
  { label: "Live Sessionz", id: "live" },
  { label: "FaithMart", id: "faithmart" },
  { label: "Trust & Safety", id: "trust" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
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
  const [activeRole, setActiveRole] = useState("User");
  const [activeDevice, setActiveDevice] = useState("desktop");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: "",
    institution: "",
    email: "",
    role: "Institution Leader",
    interest: "Full Platform Walkthrough",
    message: "",
  });

  const currentRole = useMemo(() => roleCards.find((item) => item.role === activeRole), [activeRole]);
  const currentDevice = useMemo(() => deviceTabs.find((item) => item.key === activeDevice), [activeDevice]);

  const submitDemo = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#f2f2f2]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={() => scrollToId("overview")} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">FaithHub</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-[#03cd8c]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
              onClick={() => setDemoOpen(true)}
            >
              Request Demo
            </Button>
            <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" onClick={() => scrollToId("contact")}>
              Start Building
            </Button>
          </div>

          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 sm:hidden"
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
              className="border-t border-slate-200 bg-white px-4 py-4 shadow-sm sm:hidden"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToId(item.id);
                      setMobileNavOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-left text-sm font-medium text-slate-700"
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white" onClick={() => { setDemoOpen(true); setMobileNavOpen(false); }}>
                    Request Demo
                  </Button>
                  <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" onClick={() => { scrollToId("contact"); setMobileNavOpen(false); }}>
                    Start Building
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="overview" className="relative overflow-visible">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_18%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.58fr_0.42fr] lg:px-8 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-[#ecfff8] px-3 py-1 text-[#03cd8c] hover:bg-[#ecfff8]">
                  A new digital faith infrastructure
                </Badge>
                <Badge className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-900">
                  Multi-faith, live-first, commerce-enabled
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl xl:text-7xl">
                  FaithHub is designed to become the most complete digital faith platform in the world.
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  FaithHub brings worship, teachings, Live Sessionz, events, giving, memberships, messaging,
                  marketplace experiences, trust systems, provider operations, and platform-grade governance into one
                  premium ecosystem inside the EVzone Super App.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl bg-[#03cd8c] px-5 py-6 text-base hover:bg-[#02b67c]" onClick={() => scrollToId("platform") }>
                  Explore the Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-base hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => scrollToId("experiences")}>
                  View Role Architecture
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
                  <div className="bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] p-5 text-white sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/90">FaithHub Snapshot</div>
                        <div className="mt-2 text-2xl font-semibold">A platform for users and institutions</div>
                      </div>
                      <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                        Website Landing Experience
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {roleCards.map((item) => (
                        <button
                          key={item.role}
                          onClick={() => setActiveRole(item.role)}
                          className={`rounded-xl border p-4 text-left transition ${
                            activeRole === item.role
                              ? "border-white/35 bg-white/18"
                              : "border-white/15 bg-white/10 hover:bg-white/14"
                          }`}
                        >
                          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="text-base font-semibold">{item.role}</div>
                          <div className="mt-1 text-sm text-white/80">{item.title}</div>
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {topHighlights.map((item) => (
              <Card key={item.title} className="rounded-2xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                  <div className="mt-2 text-sm leading-7 text-slate-600">{item.text}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mb-6 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">How the ecosystem works</div>
            <h2 className="mt-2 text-4xl font-semibold text-slate-900 sm:text-5xl">
              FaithHub is structured around a complete digital faith lifecycle.
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Every major pillar of digital faith is covered, from content and live participation to events,
              commerce, fundraising, trust, and institutional administration.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {featureGroups.map((group) => (
              <Card key={group.title} className="rounded-2xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6 sm:p-7">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <group.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-slate-900">{group.title}</div>
                      <div className="mt-1 text-sm text-slate-500">{group.subtitle}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                        <div className="text-sm leading-7 text-slate-700">{item}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="experiences" className="bg-white/50 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Role architecture</div>
              <h2 className="mt-2 text-4xl font-semibold text-slate-900 sm:text-5xl">
                One platform. Two public-facing experiences.
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">
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
                    <div className="text-2xl font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-3 text-sm leading-7 text-slate-600">{item.description}</div>
                    <div className="mt-5 space-y-3">
                      {item.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                          <div className="text-sm text-slate-700">{bullet}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="live" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-6 xl:grid-cols-[0.5fr_0.5fr]">
            <Card className="overflow-visible rounded-3xl border-slate-200 bg-white text-slate-900 shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <Radio className="h-5 w-5" />
                    </div>
                    <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Live Sessionz</div>
                      <div className="mt-1 text-3xl font-semibold">A premium live faith infrastructure</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                  {liveDetails.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                      <div className="min-w-0 break-words whitespace-normal text-sm leading-7 text-slate-700">{item}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" onClick={() => scrollToId("contact")}>
                    Request Live Walkthrough
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => scrollToId("trust")}>
                    See Trust Controls
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card id="faithmart" className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">FaithMart</div>
                    <div className="mt-1 text-3xl font-semibold text-slate-900">Commerce that actually belongs inside the experience</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {faithMartDetails.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                      <div className="text-sm leading-7 text-slate-700">{item}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" onClick={() => scrollToId("contact")}>
                    Discuss FaithMart Setup
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => scrollToId("platform")}>
                    Explore Platform Pillars
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-6 xl:grid-cols-[0.48fr_0.52fr]">
            <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <div className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Experience journey</div>
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
                <div className="bg-slate-950 p-6 text-white sm:p-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8ef0ca]">Built for every device</div>
                      <div className="mt-2 text-3xl font-semibold">Responsive across desktop, tablet, and mobile</div>
                    </div>
                    <MonitorSmartphone className="h-7 w-7 text-[#8ef0ca]" />
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {deviceTabs.map((item) => (
                      <button
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
                    <div className="mb-4 h-56 rounded-xl bg-white/10" />
                    <div className="text-xl font-semibold">{currentDevice?.title}</div>
                    <div className="mt-2 text-sm leading-7 text-white/80">{currentDevice?.text}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="trust" className="bg-white/50 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 xl:grid-cols-[0.52fr_0.48fr]">
              <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6 sm:p-7">
                  <div className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Trust and safety</div>
                  <div className="text-4xl font-semibold text-[#03cd8c] sm:text-5xl">
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
                <CardContent className="p-6 sm:p-7">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">What people will feel</div>
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

        <section id="faq" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-6 xl:grid-cols-[0.5fr_0.5fr]">
            <Card className="rounded-3xl border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <div className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Frequently asked questions</div>
                <div className="space-y-3">
                  {faq.map((item, index) => (
                    <button
                      key={item.q}
                      onClick={() => setFaqOpen(index === faqOpen ? -1 : index)}
                      className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 text-left"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-lg font-semibold text-slate-900">{item.q}</div>
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

            <Card id="contact" className="overflow-hidden rounded-3xl border-slate-200 bg-white text-slate-900 shadow-sm">
              <CardContent className="p-6 sm:p-7">
                <div className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">Take the next step</div>
                <div className="text-4xl font-semibold sm:text-5xl">
                  Bring FaithHub to life with a real strategy, not just a template.
                </div>
                <div className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                  Use this section as the public conversion area for demos, partnerships, technical walkthroughs,
                  implementation planning, or early institutional onboarding.
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-semibold">Platform Walkthrough</div>
                    <div className="mt-2 text-sm text-slate-600">See how the full FaithHub ecosystem fits together across users and providers.</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="text-lg font-semibold">Implementation Strategy</div>
                    <div className="mt-2 text-sm text-slate-600">Plan onboarding, launch sequencing, role setup, and product rollout around real operational needs.</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="rounded-2xl bg-[#03cd8c] px-5 py-6 text-base hover:bg-[#02b67c]" onClick={() => setDemoOpen(true)}>
                    Request a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-base hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => scrollToId("overview")}>
                    Back to Top
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
          <div>
            <button onClick={() => scrollToId("overview")} className="flex items-center gap-3 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
                <div className="text-lg font-semibold text-slate-900">FaithHub</div>
              </div>
            </button>
            <div className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
              A world-class digital faith ecosystem for communities and institutions, powered by the wider EVzone vision.
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-slate-900">Explore</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <button onClick={() => scrollToId("experiences")} className="block hover:text-[#03cd8c]">User Experience</button>
                <button onClick={() => scrollToId("experiences")} className="block hover:text-[#03cd8c]">Provider Workspace</button>
                <button onClick={() => scrollToId("platform")} className="block hover:text-[#03cd8c]">Platform Architecture</button>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Core Systems</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <button onClick={() => scrollToId("live")} className="block hover:text-[#03cd8c]">Live Sessionz</button>
                <button onClick={() => scrollToId("platform")} className="block hover:text-[#03cd8c]">Series & Teachings</button>
                <button onClick={() => scrollToId("faithmart")} className="block hover:text-[#03cd8c]">FaithMart</button>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Trust & Support</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <button onClick={() => scrollToId("trust")} className="block hover:text-[#03cd8c]">Trust & Safety</button>
                <button onClick={() => scrollToId("faq")} className="block hover:text-[#03cd8c]">FAQ</button>
                <button onClick={() => scrollToId("contact")} className="block hover:text-[#03cd8c]">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {demoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.42)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-[#ecfff8] to-white px-5 py-4 sm:px-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#03cd8c]">Request a demo</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">Tell us how you want to explore FaithHub</div>
                </div>
                <button onClick={() => { setDemoOpen(false); setDemoSubmitted(false); }} className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6">
                {!demoSubmitted ? (
                  <form onSubmit={submitDemo} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Full name</span>
                        <input
                          value={demoForm.name}
                          onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]"
                          placeholder="Your name"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Institution or organization</span>
                        <input
                          value={demoForm.institution}
                          onChange={(e) => setDemoForm({ ...demoForm, institution: e.target.value })}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]"
                          placeholder="Organization name"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Email address</span>
                        <input
                          type="email"
                          value={demoForm.email}
                          onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]"
                          placeholder="name@example.com"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Primary role</span>
                        <select
                          value={demoForm.role}
                          onChange={(e) => setDemoForm({ ...demoForm, role: e.target.value })}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]"
                        >
                          <option>Institution Leader</option>
                          <option>Operations Team</option>
                          <option>Digital Ministry Team</option>
                          <option>Technology Partner</option>
                          <option>Faith Community Organizer</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">What do you want to see?</span>
                        <select
                          value={demoForm.interest}
                          onChange={(e) => setDemoForm({ ...demoForm, interest: e.target.value })}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]"
                        >
                          <option>Full Platform Walkthrough</option>
                          <option>Live Sessionz Infrastructure</option>
                          <option>Provider Workspace</option>
                          <option>Events and FaithMart</option>
                          <option>Giving and Membership</option>
                        </select>
                      </label>
                      <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">
                        This form is wired for demo capture in the preview and can later be connected to your preferred backend or CRM flow.
                      </div>
                    </div>

                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Notes</span>
                      <textarea
                        value={demoForm.message}
                        onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                        rows={5}
                        className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#03cd8c]"
                        placeholder="Tell us what you want to focus on"
                      />
                    </label>

                    <div className="flex flex-wrap gap-3">
                      <Button type="submit" className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                        Submit Demo Request
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button type="button" variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => setDemoOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-[#03cd8c]/15 bg-[#ecfff8] p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#03cd8c] text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-semibold text-slate-900">Demo request captured</div>
                    <div className="mt-2 text-sm leading-7 text-slate-600">
                      Your request has been captured in this landing-page preview flow. This can now be wired into the real FaithHub website backend, CRM, or messaging process.
                    </div>
                    <div className="mt-5 flex justify-center gap-3">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" onClick={() => { setDemoOpen(false); setDemoSubmitted(false); }}>
                        Close
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" onClick={() => setDemoSubmitted(false)}>
                        Edit Request
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


