import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarRange,
  ChevronRight,
  Clock3,
  MessageSquare,
  MonitorPlay,
  ShieldAlert,
  Sparkles,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import { ctaPriorityClass } from "@/constants/ctaStyles";
import { faithHubToneCopy } from "@/constants/faithHubTone";

type TimeWindow = "7d" | "30d" | "term";

type ModuleTile = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionId: string;
  icon: React.ComponentType<{ className?: string }>;
};

type ProgressMetric = {
  id: string;
  label: string;
  value: string;
  note: string;
  progress: number;
  tone: "emerald" | "orange" | "rose";
  badge: string;
};

type PulseMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  tone: "emerald" | "orange" | "slate";
};

type PriorityItem = {
  id: string;
  title: string;
  detail: string;
  actionLabel: string;
  actionId: string;
  tone?: "default" | "elevated";
};

type AgendaItem = {
  id: string;
  time: string;
  title: string;
  detail: string;
};

const modules: ModuleTile[] = [
  {
    id: "live-studio",
    title: "Live Studio",
    description: "Scene switching, host controls, and overlays.",
    actionLabel: "Open studio",
    actionId: "open-live-studio",
    icon: MonitorPlay,
  },
  {
    id: "schedule",
    title: "Schedule",
    description: "Session calendar, staffing, and reminders.",
    actionLabel: "Open scheduler",
    actionId: "open-live-schedule",
    icon: CalendarRange,
  },
  {
    id: "signals",
    title: "Giving Signals",
    description: "Track momentum, conversion, and payout readiness.",
    actionLabel: "Export analytics",
    actionId: "open-live-ops",
    icon: Wallet,
  },
  {
    id: "moderation",
    title: "Trust Moderation",
    description: "Review trust queue and escalation follow-up.",
    actionLabel: "Open trust queue",
    actionId: "open-reviews-moderation",
    icon: ShieldAlert,
  },
];

const progressMetrics: ProgressMetric[] = [
  {
    id: "sessions",
    label: "Upcoming live sessions",
    value: "9",
    note: "Two prime-time sessions still need final checks.",
    progress: 74,
    tone: "orange",
    badge: "In review",
  },
  {
    id: "queue",
    label: "Moderation queue",
    value: "14",
    note: "Three items are urgent and still inside SLA.",
    progress: 58,
    tone: "rose",
    badge: "Needs attention",
  },
  {
    id: "conversion",
    label: "Donation conversion",
    value: "64%",
    note: "Follow-up reminders are keeping conversion stable.",
    progress: 81,
    tone: "emerald",
    badge: "Stable",
  },
];

const pulseMetrics: PulseMetric[] = [
  { id: "in-review", label: "Sessions in review", value: "26", delta: "+12%", trend: "up", tone: "emerald" },
  { id: "missing-assets", label: "Missing assets", value: "6", delta: "-4%", trend: "down", tone: "orange" },
  { id: "pastoral-followups", label: "Pastoral follow-ups", value: "3", delta: "+0.0%", trend: "flat", tone: "slate" },
  { id: "conversion", label: "Conversion", value: "64%", delta: "+0.2%", trend: "up", tone: "emerald" },
];

const priorities: PriorityItem[] = [
  {
    id: "missing-assets",
    title: "Request missing stream assets",
    detail: "6 scheduled sessions still have incomplete artwork or metadata.",
    actionLabel: "Open scheduler",
    actionId: "open-live-schedule",
  },
  {
    id: "queue",
    title: "Process urgent trust queue",
    detail: "3 urgent moderation items are waiting for provider response.",
    actionLabel: "Open trust queue",
    actionId: "open-reviews-moderation",
    tone: "elevated",
  },
  {
    id: "notifications",
    title: "Notify pre-registered attendees",
    detail: "Audience reminders are due for tomorrow's headline session.",
    actionLabel: "Notify audience",
    actionId: "open-notifications",
  },
  {
    id: "signals",
    title: "Reconcile campaign fund snapshots",
    detail: "Export this week's donation and payout movement for finance ops.",
    actionLabel: "Export analytics",
    actionId: "open-live-ops",
  },
];

const agenda: AgendaItem[] = [
  {
    id: "doc-review",
    time: "09:15",
    title: "Stream metadata review",
    detail: "Verify titles, thumbnails, and publishing tags.",
  },
  {
    id: "rehearsal",
    time: "12:10",
    title: "Host rehearsal block",
    detail: "Scene transitions and backup audio checks.",
  },
  {
    id: "handoff",
    time: "16:20",
    title: "Moderator handoff",
    detail: "Finalize queue ownership before evening session.",
  },
];

const actionCenterItems: PriorityItem[] = [
  {
    id: "forms",
    title: "Missing campaign forms",
    detail: "Most common publishing blocker in this window.",
    actionLabel: "Open scheduler",
    actionId: "open-live-schedule",
    tone: "elevated",
  },
  {
    id: "contacts",
    title: "Follow-up queue",
    detail: "3 pastoral follow-ups still need schedule confirmation.",
    actionLabel: "Open contacts",
    actionId: "open-contacts",
  },
  {
    id: "queue-action",
    title: "Moderation follow-up",
    detail: "Resolve trust queue items before session launch.",
    actionLabel: "Open trust queue",
    actionId: "open-reviews-moderation",
  },
];

function pulseToneClass(tone: PulseMetric["tone"]) {
  if (tone === "orange") return "bg-[#fff3e8] text-[#cc6500]";
  if (tone === "slate") return "bg-slate-100 text-slate-700";
  return "bg-[#ecfff8] text-[#049e6d]";
}

function pulseBarClass(metric: PulseMetric) {
  if (metric.trend === "down") return "w-[38%] bg-[#f77f00]/75";
  if (metric.trend === "flat") return "w-[54%] bg-slate-400/70";
  return "w-[70%] bg-[#03cd8c]/75";
}

export default function FaithHubProviderDashboard() {
  const [windowView, setWindowView] = useState<TimeWindow>("7d");
  const copy = faithHubToneCopy.providerDashboard;

  const topActions = useMemo(
    () => [
      {
        id: "messages",
        label: copy.ctas.openInbox,
        actionLabel: "Open contacts",
        actionId: "open-contacts",
        variant: "outline" as const,
        priority: "secondary" as const,
      },
      {
        id: "explore",
        label: copy.ctas.openSchedule,
        actionLabel: "Open scheduler",
        actionId: "open-live-schedule",
        variant: "default" as const,
        priority: "primary" as const,
      },
      {
        id: "support",
        label: copy.ctas.openTrustQueue,
        actionLabel: "Open trust queue",
        actionId: "open-reviews-moderation",
        variant: "outline" as const,
        priority: "secondary" as const,
      },
    ],
    [copy.ctas.openInbox, copy.ctas.openSchedule, copy.ctas.openTrustQueue],
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="fh-interactive-card fh-hero-card overflow-hidden rounded-[28px] border border-[var(--border)] bg-[linear-gradient(108deg,rgba(3,205,140,0.12),rgba(248,251,252,0.92)_34%,rgba(247,127,0,0.1))] shadow-[var(--shadow-soft)]">
          <CardContent className="fh-pad-hero">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="fh-label text-slate-500">{copy.hero.kicker}</div>
                <h2 className="mt-2 text-[1.9rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[2.35rem]">
                  {copy.hero.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                  {copy.hero.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="rounded-full border-[#f6d5b0] bg-[#fff3e8] text-[#cc6500] hover:bg-[#fff3e8]">
                    {copy.badges.primary}
                  </Badge>
                  <Badge className="rounded-full border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-100">
                    {copy.badges.secondary}
                  </Badge>
                  <Badge className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-white">
                    {copy.badges.tertiary}
                  </Badge>
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-3 xl:w-auto xl:min-w-[420px]">
                <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
                  <div className="fh-inline-action inline-flex items-center rounded-xl border border-[var(--border)] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setWindowView("7d")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        windowView === "7d" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      7 days
                    </button>
                    <button
                      type="button"
                      onClick={() => setWindowView("30d")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        windowView === "30d" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      30 days
                    </button>
                    <button
                      type="button"
                      onClick={() => setWindowView("term")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        windowView === "term" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      This term
                    </button>
                  </div>

                  {topActions.map((item) => (
                    <Button
                      key={item.id}
                      variant={item.variant}
                      data-action-label={item.actionLabel}
                      data-action-id={item.actionId}
                      className={`fh-interactive-card h-10 rounded-xl px-4 text-sm ${
                        item.priority === "secondary" ? "hidden sm:inline-flex" : "inline-flex w-full sm:w-auto"
                      } ${ctaPriorityClass(item.priority)}`}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.button
                    key={module.id}
                    type="button"
                    data-action-label={module.actionLabel}
                    data-action-id={module.actionId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.05, duration: 0.28, ease: "easeOut" }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.996 }}
                    className="fh-interactive-card fh-subcard group min-h-[132px] w-full rounded-2xl p-3.5 text-left transition hover:border-[#c8f0e0] hover:bg-white sm:min-h-[146px] sm:p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfff8] text-[#049e6d]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5" />
                    </div>

                    <div className="mt-3 text-base font-semibold leading-tight text-slate-900">{module.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-slate-500">{module.description}</div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {progressMetrics.map((metric) => (
                <DashboardStatCard
                  key={metric.id}
                  label={metric.label}
                  value={metric.value}
                  badge={metric.badge}
                  hint={metric.note}
                  tone={metric.tone}
                  progress={metric.progress}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
        className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
      >
        {pulseMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 + index * 0.04, duration: 0.24, ease: "easeOut" }}
          >
            <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
              <CardContent className="p-3.5 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="fh-label text-slate-500">{metric.label}</div>
                    <div className="mt-2 text-3xl font-bold leading-none text-slate-900">{metric.value}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pulseToneClass(metric.tone)}`}>
                    {metric.delta}
                  </span>
                </div>

                <div className="mt-3 h-8 rounded-xl bg-slate-100/90 p-1">
                  <div className={`h-full rounded-lg ${pulseBarClass(metric)}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.19, duration: 0.34, ease: "easeOut" }}
        className="grid gap-4 xl:grid-cols-[1.1fr_1.05fr_1.1fr]"
      >
        <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Provider Priorities"
              subtitle="Move high-impact tasks through the workflow"
              action={
                <button
                  type="button"
                  data-action-label="Open scheduler"
                  data-action-id="open-live-schedule"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  {copy.ctas.openFullList}
                </button>
              }
            />

            <div className="space-y-2.5">
              {priorities.map((item) => (
                <DashboardActionItem
                  key={item.id}
                  title={item.title}
                  detail={item.detail}
                  actionLabel={item.actionLabel}
                  actionId={item.actionId}
                  tone={item.tone}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Agenda"
              subtitle="Broadcast and community-care timeline for today"
              action={
                <button
                  type="button"
                  data-action-label="Open scheduler"
                  data-action-id="open-live-schedule"
                  className="fh-inline-action inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600"
                >
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  {copy.ctas.openScheduleInline}
                </button>
              }
            />

            <div className="space-y-2.5">
              {agenda.map((item) => (
                <div key={item.id} className="fh-subcard rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-7 min-w-[2.6rem] items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-semibold text-slate-600">
                      {item.time}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fh-subcard-muted mt-3 rounded-xl p-3">
              <div className="fh-label text-slate-400">Completion</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">58%</div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[58%] rounded-full bg-[#03cd8c]" />
              </div>
              <div className="mt-2 text-xs text-slate-500">Keep workflows moving. Most delays are from missing assets.</div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Alerts, recommendations, and fast actions"
              action={
                <button
                  type="button"
                  aria-label="Open action center settings"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              }
            />

            <div className="fh-subcard-muted rounded-xl p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="fh-label text-slate-400">Highlights</div>
                <MessageSquare className="h-4 w-4 text-slate-400" />
              </div>

              <div className="space-y-2.5">
                {actionCenterItems.map((item) => (
                  <DashboardActionItem
                    key={item.id}
                    title={item.title}
                    detail={item.detail}
                    actionLabel={item.actionLabel}
                    actionId={item.actionId}
                    tone={item.tone}
                  />
                ))}
              </div>
            </div>

            <div className="fh-subcard-accent mt-3 rounded-xl p-3">
              <div className="fh-label text-emerald-700">Smart insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Practical signals for better decisions</div>
              <p className="mt-1 text-xs text-slate-600">
                Funnel optimization improves when attendee reminders are sent within 20 minutes.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.32, ease: "easeOut" }}
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <DashboardStatCard
          label="Trust queue"
          value="14"
          hint="3 urgent items"
          tone="rose"
          icon={<TriangleAlert className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Live readiness"
          value="92%"
          hint="Crew and assets prepared"
          tone="emerald"
          icon={<MonitorPlay className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Next launch"
          value="2h 18m"
          hint="Evening Prayer Revival"
          tone="orange"
          icon={<Clock3 className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Giving"
          value="$12.4k"
          hint="Current 24h signal"
          tone="slate"
          icon={<Wallet className="h-4 w-4" />}
        />
      </motion.div>
    </div>
  );
}
