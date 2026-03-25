import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Compass,
  HeartHandshake,
  Layers3,
  MessageSquare,
  PlayCircle,
  Sparkles,
  Users,
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
import { routes } from "@/constants/routes";
import UserActionBar from "@/pages/user/shared/UserActionBar";

type TimeWindow = "today" | "week" | "month";

type HomeModule = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionId: string;
  icon: React.ComponentType<{ className?: string }>;
};

type FocusMetric = {
  id: string;
  label: string;
  value: string;
  progress: number;
  note: string;
  tone: "emerald" | "orange" | "slate";
  badge: string;
};

type SignalMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "orange" | "slate";
  trend: "up" | "down" | "flat";
};

type PriorityItem = {
  id: string;
  title: string;
  detail: string;
  actionLabel: string;
  actionId: string;
  entityPath?: string;
  tone?: "default" | "elevated";
};

type AgendaItem = {
  id: string;
  time: string;
  title: string;
  detail: string;
};

const modules: HomeModule[] = [
  {
    id: "watch-live",
    title: "Join Live Session",
    description: "Enter worship sessions happening now or starting soon.",
    actionLabel: "Open watch live",
    actionId: "open-live-hub",
    icon: PlayCircle,
  },
  {
    id: "catch-up",
    title: "Continue Series",
    description: "Resume teachings and pick up exactly where you paused.",
    actionLabel: "Open catch up",
    actionId: "open-replay-player",
    icon: Layers3,
  },
  {
    id: "giving",
    title: "Give & Support",
    description: "Support missions, causes, and community-led campaigns.",
    actionLabel: "Open give",
    actionId: "open-giving",
    icon: HeartHandshake,
  },
  {
    id: "groups",
    title: "Find Community",
    description: "Discover trusted faith communities and nearby institutions.",
    actionLabel: "Open join group",
    actionId: "open-discover",
    icon: Users,
  },
];

const focusMetrics: FocusMetric[] = [
  {
    id: "upcoming",
    label: "Upcoming events",
    value: "12",
    progress: 72,
    note: "Three events start within the next 24 hours.",
    tone: "orange",
    badge: "Soon",
  },
  {
    id: "continue",
    label: "Continue watching",
    value: "2",
    progress: 56,
    note: "You have 2 replays in progress.",
    tone: "emerald",
    badge: "Ready",
  },
  {
    id: "giving",
    label: "Giving momentum",
    value: "64%",
    progress: 64,
    note: "Campaign reminders increased completion.",
    tone: "slate",
    badge: "Stable",
  },
];

const signalMetrics: SignalMetric[] = [
  { id: "discover", label: "New institutions", value: "18", delta: "+4", tone: "emerald", trend: "up" },
  { id: "live-now", label: "Live now", value: "7", delta: "+1", tone: "orange", trend: "up" },
  { id: "saved", label: "Saved items", value: "14", delta: "+0", tone: "slate", trend: "flat" },
  { id: "events", label: "Event RSVPs", value: "9", delta: "-2", tone: "orange", trend: "down" },
];

const priorities: PriorityItem[] = [
  {
    id: "event-seat",
    title: "Reserve a seat for Youth Impact Night",
    detail: "Ticket availability is dropping for the evening session.",
    actionLabel: "Open event",
    actionId: "open-event-detail",
    entityPath: routes.app.user.eventDetailById("youth-impact-night"),
    tone: "elevated",
  },
  {
    id: "continue-series",
    title: "Continue Mercy in Motion",
    detail: "Episode 3 is ready with notes and study guide.",
    actionLabel: "Open series",
    actionId: "open-series-detail",
    entityPath: routes.app.user.seriesDetailById("mercy-in-motion"),
  },
  {
    id: "give-campaign",
    title: "Complete this week's giving plan",
    detail: "Your recurring campaign reminder is due today.",
    actionLabel: "Open give",
    actionId: "open-giving",
  },
  {
    id: "calendar",
    title: "Review community calendar",
    detail: "4 events match your saved ministry interests.",
    actionLabel: "Open calendar",
    actionId: "open-events",
  },
];

const agenda: AgendaItem[] = [
  {
    id: "0615",
    time: "06:15",
    title: "Sunrise devotion",
    detail: "Light Community Church live stream starts soon.",
  },
  {
    id: "1310",
    time: "13:10",
    title: "Series catch-up",
    detail: "Continue your in-progress replay session.",
  },
  {
    id: "2000",
    time: "20:00",
    title: "Youth Impact Night",
    detail: "Live Q&A and prayer room open.",
  },
];

const actionItems: PriorityItem[] = [
  {
    id: "live-room",
    title: "Enter live waiting room",
    detail: "Join early and see the session agenda.",
    actionLabel: "Open watch live",
    actionId: "open-live-hub",
    tone: "elevated",
  },
  {
    id: "discover",
    title: "Explore nearby institutions",
    detail: "Find ministries with events this week.",
    actionLabel: "Open join group",
    actionId: "open-discover",
  },
  {
    id: "calendar",
    title: "Open events calendar",
    detail: "Track your RSVPs and upcoming reminders.",
    actionLabel: "Open calendar",
    actionId: "open-events",
  },
];

function signalToneClass(tone: SignalMetric["tone"]) {
  if (tone === "orange") return "bg-[#fff3e8] text-[#cc6500]";
  if (tone === "slate") return "bg-slate-100 text-slate-700";
  return "bg-[#ecfff8] text-[#049e6d]";
}

function signalBarClass(metric: SignalMetric) {
  if (metric.trend === "down") return "w-[42%] bg-[#f77f00]/75";
  if (metric.trend === "flat") return "w-[56%] bg-slate-400/70";
  return "w-[72%] bg-[#03cd8c]/75";
}

export default function FaithHubHome() {
  const [windowView, setWindowView] = useState<TimeWindow>("today");
  const navigate = useNavigate();
  const copy = faithHubToneCopy.userHome;

  const topActions = useMemo(
    () => [
      {
        id: "calendar",
        label: copy.ctas.openCalendar,
        actionLabel: "Open calendar",
        actionId: "open-events",
        variant: "outline" as const,
        priority: "secondary" as const,
      },
      {
        id: "series",
        label: copy.ctas.openSeries,
        actionLabel: "Open series",
        actionId: "open-series-detail",
        variant: "outline" as const,
        priority: "secondary" as const,
      },
      {
        id: "live",
        label: copy.ctas.joinLive,
        actionLabel: "Open watch live",
        actionId: "open-live-hub",
        variant: "default" as const,
        priority: "primary" as const,
      },
    ],
    [copy.ctas.joinLive, copy.ctas.openCalendar, copy.ctas.openSeries],
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        <Card className="fh-interactive-card fh-hero-card overflow-hidden rounded-[28px]">
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
                  <Badge className="fh-pill fh-pill-emerald hover:bg-emerald-50">
                    {copy.badges.primary}
                  </Badge>
                  <Badge className="fh-pill fh-pill-slate hover:bg-slate-100">
                    {copy.badges.secondary}
                  </Badge>
                  <Badge className="fh-pill fh-pill-slate hover:bg-white">
                    {copy.badges.tertiary}
                  </Badge>
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-3 xl:w-auto xl:min-w-[420px]">
                <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
                  <div className="fh-inline-action inline-flex items-center rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setWindowView("today")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        windowView === "today" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => setWindowView("week")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        windowView === "week" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      This week
                    </button>
                    <button
                      type="button"
                      onClick={() => setWindowView("month")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        windowView === "month" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      This month
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
                      <Sparkles className="h-4 w-4 text-slate-400 transition group-hover:text-[#049e6d]" />
                    </div>

                    <div className="mt-3 text-base font-semibold leading-tight text-slate-900">{module.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-slate-500">{module.description}</div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {focusMetrics.map((metric) => (
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
        transition={{ delay: 0.14, duration: 0.35, ease: "easeOut" }}
        className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
      >
        {signalMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + index * 0.04, duration: 0.24, ease: "easeOut" }}
          >
            <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
              <CardContent className="p-3.5 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="fh-label text-slate-500">{metric.label}</div>
                    <div className="mt-2 text-3xl font-bold leading-none text-slate-900">{metric.value}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${signalToneClass(metric.tone)}`}>
                    {metric.delta}
                  </span>
                </div>

                <div className="mt-3 h-8 rounded-xl bg-slate-100/90 p-1">
                  <div className={`h-full rounded-lg ${signalBarClass(metric)}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.34, ease: "easeOut" }}
        className="grid gap-4 xl:grid-cols-[1.1fr_1.05fr_1.1fr]"
      >
        <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Your Priorities"
              subtitle="What needs your attention today"
              action={
                <button
                  type="button"
                  data-action-label="Open calendar"
                  data-action-id="open-events"
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
                  actionLabel={item.entityPath ? undefined : item.actionLabel}
                  actionId={item.entityPath ? undefined : item.actionId}
                  onClick={item.entityPath ? () => navigate(item.entityPath) : undefined}
                  tone={item.tone}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Today's Agenda"
              subtitle="Timeline of worship and community moments"
              action={
                <button
                  type="button"
                  data-action-label="Open calendar"
                  data-action-id="open-events"
                  className="fh-inline-action inline-flex items-center rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600"
                >
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  Open calendar
                </button>
              }
            />

            <div className="fh-data-grid">
              <div className="fh-data-grid-head hidden grid-cols-[78px_minmax(0,1fr)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white sm:grid">
                <div>Time</div>
                <div>Session</div>
              </div>
              {agenda.map((item) => (
                <div key={item.id} className="fh-data-grid-row grid gap-2 px-3 py-3 sm:grid-cols-[78px_minmax(0,1fr)] sm:items-start">
                  <div className="inline-flex h-7 w-fit items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-semibold text-slate-600">
                    {item.time}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fh-subcard-muted mt-3 rounded-xl p-3">
              <div className="fh-label text-slate-400">Completion</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">61%</div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[61%] rounded-full bg-[#03cd8c]" />
              </div>
              <div className="mt-2 text-xs text-slate-500">You are on track with live, replay, and event milestones.</div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Fast actions and guided next steps"
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
                {actionItems.map((item) => (
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
              <div className="mt-1 text-sm font-semibold text-slate-900">Live sessions with early joiners retain higher engagement</div>
              <p className="mt-1 text-xs text-slate-600">
                Joining a waiting room 10 minutes early increases completion and chat participation.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.32, ease: "easeOut" }}
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <DashboardStatCard
          label="Live sessions"
          value="7"
          hint="Now streaming"
          tone="emerald"
          icon={<PlayCircle className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Communities"
          value="18"
          hint="New to discover"
          tone="slate"
          icon={<Compass className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Next event"
          value="Tonight 8PM"
          hint="Youth Impact Night"
          tone="orange"
          icon={<Clock3 className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Giving"
          value="On track"
          hint="Recurring plan active"
          tone="emerald"
          icon={<HeartHandshake className="h-4 w-4" />}
        />
      </motion.div>

      <UserActionBar
        actions={[
          {
            id: "home-open-live",
            label: "Watch Live",
            dataActionLabel: "Open watch live",
            dataActionId: "open-live-hub",
            variant: "default",
          },
          {
            id: "home-open-catch-up",
            label: "Catch Up",
            dataActionLabel: "Open catch up",
            dataActionId: "open-replay-player",
          },
          {
            id: "home-open-give",
            label: "Give",
            dataActionLabel: "Open give",
            dataActionId: "open-giving",
          },
        ]}
      />
    </div>
  );
}
