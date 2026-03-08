import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  Globe2,
  Landmark,
  Layers3,
  Lock,
  Menu,
  PlayCircle,
  Radio,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type NavItem = { label: string; id: string };
type RoleCard = { role: string; title: string; description: string; bullets: string[]; icon: LucideIcon; badgeTone: string };
type Highlight = { title: string; text: string; icon: LucideIcon };
type FeatureGroup = { title: string; subtitle: string; items: string[]; icon: LucideIcon };
type Stat = { label: string; value: string; note: string };
type TrustTile = { label: string; icon: LucideIcon };
type Testimonial = { quote: string; name: string; title: string };
type DeviceTab = { key: "desktop" | "tablet" | "mobile"; label: string; title: string; text: string };
type Faq = { q: string; a: string };

const navItems: NavItem[] = [
  { label: "Overview", id: "overview" },
  { label: "Experiences", id: "experiences" },
  { label: "Platform", id: "platform" },
  { label: "Trust & Safety", id: "trust" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const roleCards: RoleCard[] = [
  {
    role: "User",
    title: "A richer digital faith journey",
    description:
      "Discovery, series, live participation, events, giving, memberships, and settings designed for everyday spiritual engagement.",
    bullets: [
      "Live, replay, and waiting room experiences",
      "Series, episodes, notes, and premium resources",
      "Events, ticketing, and giving in one flow",
    ],
    icon: Users,
    badgeTone: "bg-[#ecfff8] text-[#03cd8c]",
  },
  {
    role: "Provider",
    title: "A full institution operating system",
    description:
      "Build and schedule content, run live operations, message audiences, and manage events and funds from one workspace.",
    bullets: [
      "Builders, Studio, and live operations dashboards",
      "Audience journeys and post-live publishing",
      "Events, ticketing, and trust workflows",
    ],
    icon: Landmark,
    badgeTone: "bg-[#fff8ef] text-[#f77f00]",
  },
];

const topHighlights: Highlight[] = [
  {
    title: "Multi-faith by design",
    text: "Support many denominations and faith communities with flexible structures for teachings, events, groups, and communication.",
    icon: Globe2,
  },
  {
    title: "Live-first digital faith",
    text: "Waiting rooms, live player, replays, clips, captions, translation, and giving are designed as one connected experience.",
    icon: Radio,
  },
  {
    title: "Commerce meets community",
    text: "FaithMart links events, merchandise, marketplace days, vendor booths, and institution commerce in one ecosystem.",
    icon: ShoppingBag,
  },
  {
    title: "Trust and safety at scale",
    text: "Verification, moderation, policy governance, and audit controls protect both users and institutions.",
    icon: ShieldCheck,
  },
];

const featureGroups: FeatureGroup[] = [
  {
    title: "Live Sessionz Infrastructure",
    subtitle: "The heartbeat of the platform",
    items: [
      "Live Hub, waiting rooms, premium player, captions, and translation",
      "Series-aware scheduling and post-live replay publishing",
      "Studio controls, stream routing, and operations dashboards",
    ],
    icon: PlayCircle,
  },
  {
    title: "Series and Teachings",
    subtitle: "Structured digital journeys",
    items: [
      "Series library, detail pages, and episode progression",
      "Standalone teachings and multi-episode flows",
      "AI-assisted outlines, resources, and chaptering",
    ],
    icon: Layers3,
  },
  {
    title: "Events and FaithMart",
    subtitle: "Gatherings and commerce connected",
    items: [
      "Camps, conferences, missions, and marketplace events",
      "Ticketing, merchandise, and booth access",
      "Event chat, waivers, and offline check-in support",
    ],
    icon: CalendarDays,
  },
  {
    title: "Giving and Membership",
    subtitle: "Sustainable support systems",
    items: [
      "Donations, recurring giving, and receipts",
      "Membership plans, entitlements, and family sharing",
      "Fund setup, payouts, and reconciliation tools",
    ],
    icon: Wallet,
  },
];

const stats: Stat[] = [
  { label: "Public-facing roles", value: "2", note: "User and Provider" },
  { label: "Page ecosystem", value: "50+", note: "Structured across architecture" },
  { label: "Core pillars", value: "6", note: "Live, Series, Events, Messaging, Commerce, Trust" },
  { label: "Device readiness", value: "100%", note: "Desktop, tablet, and mobile responsive" },
];

const trustTiles: TrustTile[] = [
  { label: "Verified institutions", icon: ShieldCheck },
  { label: "Live moderation", icon: Search },
  { label: "Policy governance", icon: Lock },
  { label: "Audit visibility", icon: CheckCircle2 },
];

const testimonials: Testimonial[] = [
  {
    quote: "FaithHub feels like a full digital ministry ecosystem where worship, communication, giving, and events finally work together.",
    name: "Prototype Feedback",
    title: "Institution Strategy Perspective",
  },
  {
    quote: "Its strength is depth: it supports the believer, institution, and operational team in one connected environment.",
    name: "Platform Review",
    title: "Digital Transformation Perspective",
  },
];

const deviceTabs: DeviceTab[] = [
  {
    key: "desktop",
    label: "Desktop",
    title: "Control-rich workspace",
    text: "Premium dashboards, route-dense navigation, moderation, and builder flows thrive on desktop.",
  },
  {
    key: "tablet",
    label: "Tablet",
    title: "Touch-optimized productivity",
    text: "Ideal for event desks, moderation workflows, and stage-side provider operations.",
  },
  {
    key: "mobile",
    label: "Mobile",
    title: "Faith everywhere",
    text: "Users can worship, join live sessions, give, RSVP, and manage spiritual routines on mobile.",
  },
];

const faq: Faq[] = [
  {
    q: "What makes FaithHub different from a normal church website?",
    a: "FaithHub is a full multi-role platform with user journeys, provider operations, live infrastructure, event commerce, messaging, and governance in one system.",
  },
  {
    q: "Can it support multiple denominations and faith traditions?",
    a: "Yes. It is designed as a multi-faith, taxonomy-driven platform for identity, teachings, events, and policy workflows.",
  },
  {
    q: "How does FaithMart fit in?",
    a: "FaithMart powers event ticketing, merchandise, marketplace days, and institution commerce in the same product experience.",
  },
];

type DemoForm = {
  name: string;
  institution: string;
  email: string;
  role: string;
  interest: string;
  message: string;
};

function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function SectionContainer({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecfff8] text-[#03cd8c]">
      <Icon className="h-4 w-4" />
    </div>
  );
}

function StatCard({ item }: { item: Stat }) {
  return (
    <Card className="fh-card">
      <CardContent className="fh-card-content p-6">
        <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</div>
        <div className="mt-2 text-4xl font-semibold leading-tight text-slate-900">{item.value}</div>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{item.note}</p>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ feature }: { feature: FeatureGroup }) {
  return (
    <Card className="fh-card">
      <CardContent className="fh-card-content flex h-full flex-col gap-3 p-6">
        <IconChip icon={feature.icon} />
        <h3 className="text-[20px] font-semibold leading-tight text-slate-900">{feature.title}</h3>
        <p className="text-[15px] leading-relaxed text-slate-600">{feature.subtitle}</p>
        <ul className="mt-1 space-y-2 text-[15px] leading-relaxed text-slate-600">
          {feature.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#03cd8c]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function FaithHubLandingPageV2() {
  const [activeRole, setActiveRole] = useState<RoleCard["role"]>("User");
  const [activeDevice, setActiveDevice] = useState<DeviceTab["key"]>("desktop");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number>(0);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState<DemoForm>({
    name: "",
    institution: "",
    email: "",
    role: "Institution Leader",
    interest: "Full Platform Walkthrough",
    message: "",
  });

  const currentRole = useMemo(() => roleCards.find((item) => item.role === activeRole), [activeRole]);
  const currentDevice = useMemo(() => deviceTabs.find((item) => item.key === activeDevice), [activeDevice]);

  const submitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f2f2f2] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollToId("overview")} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#03cd8c] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-[18px] font-semibold text-slate-900">FaithHub</div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-lg px-3 py-2 text-[14px] font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Button variant="outline" className="font-semibold" onClick={() => setDemoOpen(true)}>
              Request Demo
            </Button>
            <Button className="bg-[#03cd8c] font-semibold text-[#07291f] hover:bg-[#02b67c]" onClick={() => scrollToId("contact")}>
              Start Building
            </Button>
          </div>

          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 sm:hidden"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileNavOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-slate-200 bg-white p-4 sm:hidden"
            >
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToId(item.id);
                      setMobileNavOpen(false);
                    }}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700"
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button variant="outline" onClick={() => { setDemoOpen(true); setMobileNavOpen(false); }}>Request Demo</Button>
                  <Button onClick={() => { scrollToId("contact"); setMobileNavOpen(false); }}>Start Building</Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <SectionContainer id="overview">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-lg bg-[#ecfff8] px-3 py-1 text-[#03cd8c]">A new digital faith infrastructure</Badge>
                <Badge className="rounded-lg bg-slate-900 px-3 py-1 text-white">Multi-faith, live-first, commerce-enabled</Badge>
              </div>

              <h1 className="text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-slate-900 sm:text-[56px] lg:text-[60px]">
                FaithHub is designed to be the most complete digital faith platform in the world.
              </h1>
              <p className="max-w-4xl text-[16px] leading-relaxed text-slate-600">
                FaithHub brings worship, teachings, Live Sessionz, events, giving, memberships, messaging, commerce, and trust systems into one premium ecosystem inside EVzone.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#03cd8c] px-5 py-3 text-[15px] font-semibold text-[#07291f] hover:bg-[#02b67c]" onClick={() => scrollToId("platform")}>
                  Explore the Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="px-5 py-3 text-[15px]" onClick={() => scrollToId("experiences")}>
                  View Role Architecture
                </Button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <StatCard key={item.label} item={item} />
                ))}
              </div>
            </div>

            <Card className="fh-card mx-auto w-full max-w-[420px]">
              <CardContent className="fh-card-content p-8">
                <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">FaithHub Snapshot</div>
                <h2 className="text-[32px] font-semibold leading-tight text-slate-900">Platform for users and institutions</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{currentRole?.description}</p>
                <div className="mt-5 grid gap-2">
                  {roleCards.map((item) => (
                    <button
                      key={item.role}
                      onClick={() => setActiveRole(item.role)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                        activeRole === item.role ? "border-[#03cd8c]/35 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-600 hover:border-[#03cd8c]/30"
                      }`}
                    >
                      {item.role}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionContainer>

        <SectionContainer id="experiences">
          <h2 className="mb-8 text-[32px] font-semibold leading-tight text-slate-900">Role Experiences</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {roleCards.map((item) => (
              <Card key={item.role} className="fh-card">
                <CardContent className="fh-card-content p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <IconChip icon={item.icon} />
                    <Badge className={`rounded-lg px-3 py-1 ${item.badgeTone}`}>{item.role}</Badge>
                  </div>
                  <h3 className="text-[20px] font-semibold leading-tight text-slate-900">{item.title}</h3>
                  <p className="text-[16px] leading-relaxed text-slate-600">{item.description}</p>
                  <ul className="space-y-2 pt-1 text-[15px] leading-relaxed text-slate-600">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#03cd8c]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer id="platform">
          <h2 className="mb-8 text-[32px] font-semibold leading-tight text-slate-900">Platform Highlights</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {topHighlights.map((item) => (
              <Card key={item.title} className="fh-card">
                <CardContent className="fh-card-content p-6">
                  <IconChip icon={item.icon} />
                  <h3 className="text-[20px] font-semibold leading-tight text-slate-900">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-slate-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {featureGroups.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </SectionContainer>

        <SectionContainer id="trust">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="fh-card">
              <CardContent className="fh-card-content p-6">
                <h2 className="text-[32px] font-semibold leading-tight text-slate-900">Trust and safety at platform scale</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
                  FaithHub combines verification, moderation, policy controls, and audit-ready oversight so institutions and users operate with confidence.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {trustTiles.map((item) => (
                    <div key={item.label} className="fh-card-like flex items-center gap-3">
                      <IconChip icon={item.icon} />
                      <span className="text-[15px] font-semibold text-slate-900">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card">
              <CardContent className="fh-card-content p-6">
                <h3 className="text-[20px] font-semibold text-slate-900">Platform sentiment</h3>
                <div className="mt-4 grid gap-4">
                  {testimonials.map((item) => (
                    <div key={item.quote} className="fh-card-like">
                      <p className="text-[15px] leading-relaxed text-slate-700">"{item.quote}"</p>
                      <div className="mt-3 text-[15px] font-semibold text-slate-900">{item.name}</div>
                      <div className="text-[13px] text-slate-500">{item.title}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionContainer>

        <SectionContainer>
          <Card className="fh-card">
            <CardContent className="fh-card-content p-6">
              <h2 className="text-[32px] font-semibold leading-tight text-slate-900">Device experience</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {deviceTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveDevice(tab.key)}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                      activeDevice === tab.key ? "border-[#03cd8c]/35 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="mt-5 fh-card-like">
                <div className="text-[20px] font-semibold text-slate-900">{currentDevice?.title}</div>
                <div className="mt-2 text-[15px] leading-relaxed text-slate-600">{currentDevice?.text}</div>
              </div>
            </CardContent>
          </Card>
        </SectionContainer>

        <SectionContainer id="faq">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="fh-card">
              <CardContent className="fh-card-content p-6">
                <h2 className="text-[32px] font-semibold leading-tight text-slate-900">Frequently asked questions</h2>
                <div className="mt-6 grid gap-3">
                  {faq.map((item, index) => (
                    <button
                      key={item.q}
                      onClick={() => setFaqOpen(index === faqOpen ? -1 : index)}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-left"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[18px] font-semibold leading-tight text-slate-900">{item.q}</div>
                        <ChevronDown className={`h-5 w-5 text-slate-400 transition ${faqOpen === index ? "rotate-180" : ""}`} />
                      </div>
                      {faqOpen === index ? <div className="mt-3 text-[15px] leading-relaxed text-slate-600">{item.a}</div> : null}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="contact" className="fh-card bg-slate-900 text-white">
              <CardContent className="fh-card-content p-6">
                <h2 className="text-[32px] font-semibold leading-tight text-white">Bring FaithHub to life with a real strategy.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-white/80">
                  Use this conversion area for demos, partnerships, implementation planning, and institutional onboarding.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/15 bg-white/10 p-5">
                    <IconChip icon={Compass} />
                    <div className="mt-3 text-[18px] font-semibold text-white">Platform Walkthrough</div>
                    <div className="mt-2 text-[15px] leading-relaxed text-white/80">See the full FaithHub ecosystem across users and providers.</div>
                  </div>
                  <div className="rounded-lg border border-white/15 bg-white/10 p-5">
                    <IconChip icon={Zap} />
                    <div className="mt-3 text-[18px] font-semibold text-white">Implementation Strategy</div>
                    <div className="mt-2 text-[15px] leading-relaxed text-white/80">Plan onboarding, rollout, and operations around real needs.</div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="bg-[#03cd8c] text-[#07291f] hover:bg-[#02b67c]" onClick={() => setDemoOpen(true)}>
                    Request a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10" onClick={() => scrollToId("overview")}>
                    Back to Top
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionContainer>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#03cd8c] text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#03cd8c]">EVzone Super App</div>
                <div className="text-[18px] font-semibold text-slate-900">FaithHub</div>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
              A world-class digital faith ecosystem for communities and institutions, powered by the wider EVzone vision.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToId(item.id)} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-[#03cd8c]/30">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {demoOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">Request a demo</div>
                  <div className="mt-1 text-[28px] font-semibold leading-tight text-slate-900">Tell us how you want to explore FaithHub</div>
                </div>
                <button onClick={() => { setDemoOpen(false); setDemoSubmitted(false); }} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6">
                {!demoSubmitted ? (
                  <form onSubmit={submitDemo} className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input value={demoForm.name} onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })} className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm" placeholder="Full name" />
                      <input value={demoForm.institution} onChange={(e) => setDemoForm({ ...demoForm, institution: e.target.value })} className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm" placeholder="Institution" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input type="email" value={demoForm.email} onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })} className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm" placeholder="Email address" />
                      <select value={demoForm.role} onChange={(e) => setDemoForm({ ...demoForm, role: e.target.value })} className="h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm">
                        <option>Institution Leader</option>
                        <option>Operations Team</option>
                        <option>Digital Ministry Team</option>
                      </select>
                    </div>
                    <textarea value={demoForm.message} onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })} rows={4} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm" placeholder="Tell us what you want to focus on" />
                    <div className="flex flex-wrap gap-3">
                      <Button type="submit">Submit Demo Request</Button>
                      <Button type="button" variant="outline" onClick={() => setDemoOpen(false)}>Cancel</Button>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-xl border border-[#03cd8c]/20 bg-[#ecfff8] p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#03cd8c] text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="text-[24px] font-semibold text-slate-900">Demo request captured</div>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">Your request has been captured in this landing-page preview flow.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
