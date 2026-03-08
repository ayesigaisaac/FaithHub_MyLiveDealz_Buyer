import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  Globe2,
  Landmark,
  Layers3,
  LayoutGrid,
  Library,
  Lock,
  Menu,
  MonitorSmartphone,
  PanelsTopLeft,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Video,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Role = "User" | "Provider";
type RoleCard = { role: Role; title: string; description: string; bullets: string[]; icon: LucideIcon; tone: string };
type Stat = { label: string; value: string; note: string; icon: LucideIcon };
type Feature = { title: string; text: string; icon: LucideIcon };
type Faq = { q: string; a: string };

type DemoForm = { name: string; institution: string; email: string; role: string; interest: string; message: string };

const navItems = [
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
      "Personalized home, discovery, series libraries, Live Sessionz, events, giving, memberships, and settings designed for everyday spiritual engagement.",
    bullets: [
      "Live, replay, and waiting room experiences",
      "Series, episodes, notes, and premium resources",
      "Events, RSVP, FaithMart tickets, and giving",
    ],
    icon: Users,
    tone: "bg-[#ecfff8] text-[#03cd8c]",
  },
  {
    role: "Provider",
    title: "A full institution operating system",
    description:
      "Build series and episodes, run live operations, manage contacts and notifications, and handle events and funds in one premium workspace.",
    bullets: [
      "Builder flows, Live Studio, and operations dashboards",
      "Audience journeys, messaging, and post-live tools",
      "Events, ticketing, funds, and trust workflows",
    ],
    icon: Landmark,
    tone: "bg-[#fff8ef] text-[#f77f00]",
  },
];

const stats: Stat[] = [
  { label: "Public-facing roles", value: "2", note: "User and Provider", icon: Users },
  { label: "Page ecosystem", value: "50+", note: "Structured across architecture", icon: LayoutGrid },
  { label: "Core pillars", value: "6", note: "Live, Series, Events, Messaging, Commerce, Trust", icon: Layers3 },
  { label: "Device readiness", value: "100%", note: "Desktop, tablet, and mobile responsive", icon: MonitorSmartphone },
];

const features: Feature[] = [
  { title: "Multi-faith by design", text: "FaithHub supports many denominations and communities with flexible structures for teachings, events, and communication.", icon: Globe2 },
  { title: "Live-first digital faith", text: "Waiting rooms, live player, replays, clips, captions, translations, and giving are connected as one experience.", icon: Video },
  { title: "Commerce meets community", text: "FaithMart links events, merchandise, marketplace days, vendor booths, and institution commerce.", icon: ShoppingBag },
  { title: "Trust and safety at scale", text: "Verification, moderation, policy governance, and audit controls protect users and institutions.", icon: ShieldCheck },
];

const trustTiles = [
  { label: "Verified institutions", icon: ShieldCheck },
  { label: "Live moderation", icon: Radio },
  { label: "Policy governance", icon: Lock },
  { label: "Audit visibility", icon: Compass },
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
];

const faq: Faq[] = [
  {
    q: "What makes FaithHub different from a normal church website or streaming page?",
    a: "FaithHub is a full multi-role platform with user journeys, provider operations, live infrastructure, event commerce, giving, messaging, moderation, and governance in one connected system.",
  },
  {
    q: "Can it support multiple denominations and faith traditions?",
    a: "Yes. The structure is intentionally multi-faith and taxonomy-driven, so institutions can organize identity, teachings, events, audience groups, and policy flows flexibly.",
  },
  {
    q: "How does FaithMart fit into the project?",
    a: "FaithMart powers commerce around events, merchandise, marketplace days, vendor booths, and institution-driven products while staying integrated with the wider FaithHub experience.",
  },
];

function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-[92px] md:py-[108px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#03cd8c]/20 bg-[#ecfff8] text-[#03cd8c]">
      <Icon className="h-4 w-4" />
    </div>
  );
}

function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Card className={`fh-card rounded-3xl border-slate-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${className}`}>
      <CardContent className="fh-card-content p-6 md:p-7">{children}</CardContent>
    </Card>
  );
}

export default function FaithHubLandingPageV2() {
  const [activeRole, setActiveRole] = useState<Role>("User");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoForm, setDemoForm] = useState<DemoForm>({ name: "", institution: "", email: "", role: "Institution Leader", interest: "Full Platform Walkthrough", message: "" });

  const currentRole = useMemo(() => roleCards.find((item) => item.role === activeRole), [activeRole]);

  const submitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f2f2f2] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollToId("overview")} className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03cd8c] text-white shadow-[0_8px_20px_rgba(3,205,140,0.3)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-[18px] font-semibold text-slate-900">FaithHub</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToId(item.id)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Button variant="outline" onClick={() => setDemoOpen(true)}>Request Demo</Button>
            <Button className="bg-[#03cd8c] text-[#07291f] shadow-[0_8px_20px_rgba(3,205,140,0.35)] hover:bg-[#02b67c]" onClick={() => scrollToId("contact")}>Start Building</Button>
          </div>

          <button onClick={() => setMobileNavOpen((prev) => !prev)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white sm:hidden">
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileNavOpen ? (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-slate-200 bg-white p-4 sm:hidden">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => { scrollToId(item.id); setMobileNavOpen(false); }} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700">
                    {item.label}
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <Section id="overview">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border border-[#03cd8c]/20 bg-[#ecfff8] px-3 py-1 text-[#03cd8c]">A new digital faith infrastructure</Badge>
                <Badge className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">Multi-faith, live-first, commerce-enabled</Badge>
              </div>
              <h1 className="max-w-4xl text-[48px] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-[56px] lg:text-[60px]">FaithHub is designed to become the most complete digital faith platform in the world.</h1>
              <p className="max-w-3xl text-[16px] leading-[1.75] text-slate-600">FaithHub brings worship, teachings, Live Sessionz, events, giving, memberships, messaging, marketplace experiences, trust systems, provider operations, and platform-grade governance into one premium ecosystem inside the EVzone Super App.</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="min-h-[48px] bg-[#03cd8c] px-5 text-[15px] font-semibold text-[#07291f] shadow-[0_8px_20px_rgba(3,205,140,0.35)] hover:bg-[#02b67c]" onClick={() => scrollToId("platform")}>
                  Explore the Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="min-h-[48px] px-5 text-[15px]" onClick={() => scrollToId("experiences")}>
                  View Role Architecture
                  <PanelsTopLeft className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <PremiumCard key={item.label} className="h-full transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                    <div className="flex h-full flex-col gap-3">
                      <IconChip icon={item.icon} />
                      <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</div>
                      <div className="text-[38px] font-semibold leading-none text-slate-900">{item.value}</div>
                      <div className="text-[15px] leading-relaxed text-slate-600">{item.note}</div>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>

            <PremiumCard className="w-full max-w-[420px]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">FaithHub Snapshot</div>
                <Badge className="rounded-full border border-[#03cd8c]/20 bg-[#ecfff8] px-3 py-1 text-xs text-[#03cd8c]">{activeRole}</Badge>
              </div>
              <h2 className="text-[30px] font-semibold leading-tight text-slate-900">A platform for users and institutions</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{currentRole?.description}</p>
              <div className="mt-6 grid gap-3">
                {roleCards.map((item) => (
                  <button key={item.role} onClick={() => setActiveRole(item.role)} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${activeRole === item.role ? "border-[#03cd8c]/30 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-600 hover:border-[#03cd8c]/25"}`}>
                    <span>{item.role} Experience</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><IconChip icon={Radio} /><div className="text-[15px] leading-relaxed text-slate-700">Live, replay, and waiting room experiences</div></div>
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><IconChip icon={Library} /><div className="text-[15px] leading-relaxed text-slate-700">Series, episodes, notes, and premium resources</div></div>
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><IconChip icon={Wallet} /><div className="text-[15px] leading-relaxed text-slate-700">Events, RSVP, FaithMart tickets, and giving</div></div>
              </div>
            </PremiumCard>
          </div>
        </Section>

        <Section id="experiences">
          <div className="mb-8"><div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">Role Architecture</div><h2 className="mt-2 text-[32px] font-semibold leading-tight text-slate-900">Built for users and institutions</h2></div>
          <div className="grid gap-6 md:grid-cols-2">
            {roleCards.map((item) => (
              <PremiumCard key={item.role} className="h-full">
                <div className="flex h-full flex-col gap-4">
                  <div className="flex items-center gap-3"><IconChip icon={item.icon} /><Badge className={`rounded-full px-3 py-1 ${item.tone}`}>{item.role}</Badge></div>
                  <h3 className="text-[20px] font-semibold leading-tight text-slate-900">{item.title}</h3>
                  <p className="text-[16px] leading-relaxed text-slate-600">{item.description}</p>
                  <ul className="space-y-2 text-[15px] leading-relaxed text-slate-600">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#03cd8c]" /><span>{bullet}</span></li>
                    ))}
                  </ul>
                </div>
              </PremiumCard>
            ))}
          </div>
        </Section>

        <Section id="platform">
          <div className="mb-8"><div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">Platform Highlights</div><h2 className="mt-2 text-[32px] font-semibold leading-tight text-slate-900">Core pillars of the FaithHub ecosystem</h2></div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => (
              <PremiumCard key={item.title} className="h-full transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <div className="flex h-full flex-col gap-3"><IconChip icon={item.icon} /><h3 className="text-[20px] font-semibold leading-tight text-slate-900">{item.title}</h3><p className="text-[15px] leading-relaxed text-slate-600">{item.text}</p></div>
              </PremiumCard>
            ))}
          </div>
        </Section>

        <Section id="trust">
          <div className="grid gap-6 xl:grid-cols-2">
            <PremiumCard>
              <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">Trust and Safety</div>
              <h2 className="text-[32px] font-semibold leading-tight text-slate-900">FaithHub is designed to be trusted at scale</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-slate-600">The platform includes institution verification, review and moderation flows, content policy controls, live moderation consoles, audit visibility, and payments oversight.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {trustTiles.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"><IconChip icon={item.icon} /><div className="text-[15px] font-semibold text-slate-900">{item.label}</div></div>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard>
              <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">What people will feel</div>
              <div className="grid gap-4">
                {testimonials.map((item) => (
                  <div key={item.quote} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="mb-3 flex gap-1 text-[#f77f00]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-[#f77f00] text-[#f77f00]" />)}</div>
                    <div className="text-[15px] leading-relaxed text-slate-700">"{item.quote}"</div>
                    <div className="mt-3 text-[15px] font-semibold text-slate-900">{item.name}</div>
                    <div className="text-[13px] text-slate-500">{item.title}</div>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </div>
        </Section>

        <Section id="faq">
          <div className="grid gap-6 xl:grid-cols-2">
            <PremiumCard>
              <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">Frequently Asked Questions</div>
              <h2 className="mb-6 text-[32px] font-semibold leading-tight text-slate-900">Common questions about FaithHub</h2>
              <div className="grid gap-3">
                {faq.map((item, index) => (
                  <button key={item.q} onClick={() => setFaqOpen(index === faqOpen ? -1 : index)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">
                    <div className="flex items-center justify-between gap-3"><div className="text-[18px] font-semibold leading-tight text-slate-900">{item.q}</div><ChevronDown className={`h-5 w-5 text-slate-400 transition ${faqOpen === index ? "rotate-180" : ""}`} /></div>
                    {faqOpen === index ? <div className="mt-3 text-[15px] leading-relaxed text-slate-600">{item.a}</div> : null}
                  </button>
                ))}
              </div>
            </PremiumCard>

            <Card id="contact" className="fh-card rounded-3xl border-slate-900 bg-slate-950 text-white shadow-[0_16px_36px_rgba(2,6,23,0.45)]">
              <CardContent className="fh-card-content p-6 md:p-7">
                <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8ef0ca]">Take the next step</div>
                <h2 className="text-[32px] font-semibold leading-tight text-white">Bring FaithHub to life with a real strategy, not just a template.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-white/80">Use this section as the public conversion area for demos, partnerships, technical walkthroughs, implementation planning, or early institutional onboarding.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="min-h-[48px] bg-[#03cd8c] px-5 text-[#07291f] hover:bg-[#02b67c]" onClick={() => setDemoOpen(true)}>Request a Demo<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <Button variant="outline" className="min-h-[48px] border-white/25 bg-transparent px-5 text-white hover:bg-white/10" onClick={() => scrollToId("overview")}>Back to Top</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200 bg-white/80"><div className="mx-auto max-w-7xl px-4 py-8 text-[15px] text-slate-600 sm:px-6 lg:px-8">A world-class digital faith ecosystem for communities and institutions, powered by the wider EVzone vision.</div></footer>

      <AnimatePresence>
        {demoOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.2 }} className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(2,6,23,0.18)]">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-5"><div><div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#03cd8c]">Request a demo</div><div className="mt-1 text-[28px] font-semibold leading-tight text-slate-900">Tell us how you want to explore FaithHub</div></div><button onClick={() => { setDemoOpen(false); setDemoSubmitted(false); }} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600"><X className="h-4 w-4" /></button></div>
              <div className="p-6">
                {!demoSubmitted ? (
                  <form onSubmit={submitDemo} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input value={demoForm.name} onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm" placeholder="Full name" />
                      <input value={demoForm.institution} onChange={(e) => setDemoForm({ ...demoForm, institution: e.target.value })} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm" placeholder="Institution" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input type="email" value={demoForm.email} onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm" placeholder="Email address" />
                      <select value={demoForm.role} onChange={(e) => setDemoForm({ ...demoForm, role: e.target.value })} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm"><option>Institution Leader</option><option>Operations Team</option><option>Digital Ministry Team</option></select>
                    </div>
                    <textarea value={demoForm.message} onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" placeholder="Tell us what you want to focus on" />
                    <div className="flex flex-wrap gap-3"><Button type="submit">Submit Demo Request</Button><Button type="button" variant="outline" onClick={() => setDemoOpen(false)}>Cancel</Button></div>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-[#03cd8c]/20 bg-[#ecfff8] p-6 text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#03cd8c] text-white"><CheckCircle2 className="h-6 w-6" /></div><div className="text-[24px] font-semibold text-slate-900">Demo request captured</div></div>
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
