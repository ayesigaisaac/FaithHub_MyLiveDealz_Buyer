import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  HeartHandshake,
  MonitorPlay,
  Radio,
  ShieldAlert,
  Sparkles,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type IconType = React.ComponentType<{ className?: string }>;

type StreamHealth = "Healthy" | "Stable" | "Watch";
type QueueSeverity = "Critical" | "High" | "Medium";
type SignalState = "good" | "watch" | "elevated";

interface KPIItem {
  label: string;
  value: string;
  trend: string;
  trendWidth: string;
  trendNote: string;
  icon: IconType;
}

interface LiveHealthItem {
  name: string;
  bitrate: string;
  latency: string;
  viewers: string;
  health: StreamHealth;
}

interface UpcomingSessionItem {
  title: string;
  time: string;
  channel: string;
}

interface ModerationQueueItem {
  item: string;
  severity: QueueSeverity;
  area: string;
  eta: string;
}

interface AnomalyAlertItem {
  title: string;
  detail: string;
  impact: string;
}

interface ProviderSignalItem {
  label: string;
  value: string;
  note: string;
  progress: string;
  state: SignalState;
}

const kpis: KPIItem[] = [
  {
    label: "Live viewers now",
    value: "4,280",
    trend: "+12%",
    trendWidth: "74%",
    trendNote: "Momentum rising in main channel",
    icon: Users,
  },
  {
    label: "Upcoming sessions",
    value: "9",
    trend: "+3",
    trendWidth: "63%",
    trendNote: "Weekend lineup now fully staffed",
    icon: Radio,
  },
  {
    label: "Recent donations",
    value: "$12.4k",
    trend: "+18%",
    trendWidth: "79%",
    trendNote: "Family ministry campaign strongest",
    icon: HeartHandshake,
  },
  {
    label: "Moderation queue",
    value: "14",
    trend: "2 urgent",
    trendWidth: "48%",
    trendNote: "Urgent items still within SLA",
    icon: ShieldAlert,
  },
];

const liveHealth: LiveHealthItem[] = [
  {
    name: "Main Sunday Stream",
    bitrate: "4.2 Mbps",
    latency: "Low",
    viewers: "2.8k",
    health: "Healthy",
  },
  {
    name: "Women Fellowship Reflection",
    bitrate: "3.1 Mbps",
    latency: "Normal",
    viewers: "920",
    health: "Stable",
  },
  {
    name: "Youth Rehearsal Feed",
    bitrate: "1.2 Mbps",
    latency: "Elevated",
    viewers: "230",
    health: "Watch",
  },
];

const upcomingSessions: UpcomingSessionItem[] = [
  { title: "Mercy in Motion Episode 5", time: "Tonight 7:30 PM", channel: "Main live channel" },
  { title: "Family Prayer Circle", time: "Tomorrow 6:00 PM", channel: "Family ministry channel" },
  { title: "Marketplace Day Launch", time: "Saturday 10:00 AM", channel: "Event live relay" },
];

const moderationQueue: ModerationQueueItem[] = [
  {
    item: "Live chat abuse report",
    severity: "High",
    area: "Youth Impact Night",
    eta: "Respond in 6 min",
  },
  {
    item: "Review flagged for brigading pattern",
    severity: "Medium",
    area: "Walking in Wisdom",
    eta: "Review in 18 min",
  },
  {
    item: "Prayer request escalation",
    severity: "High",
    area: "Women Fellowship Reflection",
    eta: "Respond in 9 min",
  },
  {
    item: "Suspicious payout detail change",
    severity: "Critical",
    area: "Finance controls",
    eta: "Immediate",
  },
];

const anomalyAlerts: AnomalyAlertItem[] = [
  {
    title: "Join/leave churn spike",
    detail: "Youth Rehearsal Feed showed a sharp join-exit pattern over the last 4 minutes.",
    impact: "Viewer drop risk",
  },
  {
    title: "Donation conversion outlier",
    detail: "Evening Prayer Revival recorded conversion velocity above historical range.",
    impact: "Finance verification",
  },
  {
    title: "Queue response drift",
    detail: "Moderation response time is trending above the target for two active sessions.",
    impact: "Trust operations",
  },
];

const providerSignals: ProviderSignalItem[] = [
  {
    label: "Stream uptime",
    value: "99.4%",
    note: "No ingest interruptions in 24h",
    progress: "94%",
    state: "good",
  },
  {
    label: "Moderation response SLA",
    value: "92%",
    note: "2 urgent items need follow-up",
    progress: "68%",
    state: "watch",
  },
  {
    label: "Donation processing confidence",
    value: "Stable",
    note: "No high-risk payout anomalies",
    progress: "82%",
    state: "good",
  },
];

const surfaceCardClass =
  "rounded-[28px] border border-white/75 bg-white/95 shadow-[0_16px_45px_-26px_rgba(15,23,42,0.34)]";
const panelItemClass = "rounded-[20px] border border-slate-200/95 bg-white p-4 shadow-sm";

function getStreamHealthPillClass(health: StreamHealth) {
  if (health === "Healthy") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }

  if (health === "Watch") {
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  }

  return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
}

function getQueueSeverityPillClass(severity: QueueSeverity) {
  if (severity === "Critical") {
    return "bg-rose-50 text-rose-600 ring-1 ring-rose-100";
  }

  if (severity === "High") {
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  }

  return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
}

function getQueueSeverityRowClass(severity: QueueSeverity) {
  if (severity === "Critical") {
    return "border-l-rose-400";
  }

  if (severity === "High") {
    return "border-l-amber-300";
  }

  return "border-l-slate-300";
}

function getSignalBarClass(state: SignalState) {
  if (state === "good") {
    return "bg-emerald-300";
  }

  if (state === "elevated") {
    return "bg-rose-300";
  }

  return "bg-amber-200";
}

function getSignalValueClass(state: SignalState) {
  if (state === "good") {
    return "text-emerald-700";
  }

  if (state === "elevated") {
    return "text-rose-700";
  }

  return "text-amber-700";
}

export default function FaithHubProviderDashboard() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [analyticsPack, setAnalyticsPack] = useState(true);
  const [biConnectors, setBiConnectors] = useState(false);

  const watchStreams = useMemo(
    () => liveHealth.filter((stream) => stream.health !== "Healthy").length,
    [],
  );
  const urgentQueueCount = useMemo(
    () => moderationQueue.filter((item) => item.severity !== "Medium").length,
    [],
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5f7f6] text-slate-900">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-200/75 bg-white/90 px-4 py-3.5 shadow-sm backdrop-blur"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="fh-eyebrow text-emerald-600">Provider workspace</div>
              <div className="truncate text-lg font-semibold tracking-tight text-slate-900">
                Provider Dashboard
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? (
                <WifiOff className="h-4 w-4 text-amber-600" />
              ) : (
                <Wifi className="h-4 w-4 text-emerald-600" />
              )}
              {offlineReadOnly ? "Read-only KPI cache" : "Live provider telemetry"}
            </div>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-200 hover:text-emerald-600"
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid items-start gap-5 xl:grid-cols-[1.14fr_0.86fr]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04, duration: 0.26 }}
            className="space-y-5"
          >
            <Card className="relative overflow-hidden rounded-[30px] border border-white/65 bg-gradient-to-br from-white via-[#f6fdf9] to-[#ebfbf4] shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_28%)]" />

                <div className="relative z-10 text-slate-900">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      Operations overview
                    </Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-100">
                      KPIs, live health, and alerts
                    </Badge>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker-subtle text-emerald-600">Provider dashboard</div>
                      <h1 className="max-w-[21ch] break-normal text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.6rem]">
                        Stream, donations, alerts, and upcoming sessions in one professional control view.
                      </h1>
                      <p className="max-w-2xl break-normal fh-body text-slate-600 sm:text-base">
                        See what is healthy now, where attention is needed next, and how your team can act
                        without switching between dashboards.
                      </p>

                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
                          <div className="fh-kicker-muted text-emerald-700">Streams at watch level</div>
                          <div className="mt-1 text-2xl font-semibold text-slate-900">{watchStreams}</div>
                        </div>
                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-3">
                          <div className="fh-kicker-muted text-amber-700">Urgent queue items</div>
                          <div className="mt-1 text-2xl font-semibold text-slate-900">{urgentQueueCount}</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">Alert posture</div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                          Active
                        </span>
                      </div>

                      <div className="rounded-[18px] border border-emerald-100 bg-emerald-50 p-4">
                        <div className="fh-kicker-muted text-emerald-700">Real-time</div>
                        <div className="mt-1 text-2xl font-semibold text-slate-900">3 active anomalies</div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {providerSignals.map((signal) => (
                          <div key={signal.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <div className="mb-1 flex items-center justify-between gap-2 text-sm text-slate-700">
                              <span>{signal.label}</span>
                              <span className={`font-semibold ${getSignalValueClass(signal.state)}`}>
                                {signal.value}
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-200">
                              <div
                                className={`h-full rounded-full ${getSignalBarClass(signal.state)}`}
                                style={{ width: signal.progress }}
                              />
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{signal.note}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-2 2xl:grid-cols-2">
                        <Button
                          className="h-11 w-full min-w-0 rounded-2xl bg-emerald-500 px-4 text-sm hover:bg-emerald-600"
                          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                        >
                          Open alerts
                        </Button>
                        <Button
                          variant="outline"
                          className="h-11 w-full min-w-0 rounded-2xl border-slate-200 bg-white px-4 text-sm text-slate-900 hover:border-emerald-200 hover:bg-emerald-50"
                          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                          onClick={() => setOfflineReadOnly((prev) => !prev)}
                        >
                          {offlineReadOnly ? "Go live" : "Read only"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
              {kpis.map((item) => {
                const Icon = item.icon;

                return (
                  <Card key={item.label} className={surfaceCardClass}>
                    <CardContent className="p-5">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{item.value}</div>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        <ArrowUpRight className="h-3.5 w-3.5" /> {item.trend}
                      </div>
                      <div className="mt-3 h-1.5 rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: item.trendWidth }} />
                      </div>
                      <div className="mt-2 text-xs text-slate-500">{item.trendNote}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Real-time stream health"
                  subtitle="Monitor bitrate, latency, viewers, and attention risks."
                  action={
                    <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      <MonitorPlay className="mr-1 h-3.5 w-3.5" /> Live telemetry
                    </Badge>
                  }
                />

                <div className="space-y-3">
                  {liveHealth.map((stream) => (
                    <div key={stream.name} className={panelItemClass}>
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{stream.name}</div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStreamHealthPillClass(stream.health)}`}
                        >
                          {stream.health}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 2xl:grid-cols-4">
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">Bitrate: {stream.bitrate}</div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">Latency: {stream.latency}</div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">Viewers: {stream.viewers}</div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2 inline-flex items-center gap-2">
                          <Eye className="h-3.5 w-3.5 text-emerald-600" /> Health signal live
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.26 }}
            className="space-y-5"
          >
            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Upcoming sessions"
                  subtitle="What the institution needs to prepare next."
                  action={
                    <Button
                      variant="outline"
                      className="rounded-full border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:bg-emerald-50"
                    >
                      Open scheduler
                    </Button>
                  }
                />

                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.title} className={panelItemClass}>
                      <div className="mb-1 text-base font-semibold text-slate-900">{session.title}</div>
                      <div className="text-sm text-slate-500">{session.channel}</div>
                      <div className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
                        <Clock3 className="mr-2 h-4 w-4" /> {session.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Moderation queue"
                  subtitle="Items that require immediate or tracked action."
                  action={
                    <Badge className="rounded-full bg-amber-50 text-amber-700 hover:bg-amber-50">
                      {urgentQueueCount} urgent
                    </Badge>
                  }
                />

                <div className="space-y-3">
                  {moderationQueue.map((item) => (
                    <div
                      key={item.item}
                      className={`rounded-[20px] border border-slate-200 border-l-4 bg-white p-4 shadow-sm ${getQueueSeverityRowClass(item.severity)}`}
                    >
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{item.item}</div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getQueueSeverityPillClass(item.severity)}`}
                        >
                          {item.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{item.area}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.eta}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border border-amber-200/55 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Anomaly alerts"
                  subtitle="Provider-side risk and performance warnings."
                  action={
                    <Badge className="rounded-full bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Adaptive anomaly watch
                    </Badge>
                  }
                />

                <div className="space-y-3">
                  {anomalyAlerts.map((alert) => (
                    <div key={alert.title} className="rounded-[20px] border border-amber-100 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                        <AlertTriangle className="h-4 w-4 text-amber-600" /> {alert.title}
                      </div>
                      <div className="text-sm text-slate-600">{alert.detail}</div>
                      <div className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                        {alert.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Premium analytics pack"
                  subtitle="Exports, dashboards, and BI connectors for advanced institutions."
                  action={
                    <Button
                      variant="outline"
                      className="rounded-full border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50"
                      onClick={() => setAnalyticsPack((prev) => !prev)}
                    >
                      {analyticsPack ? "Analytics pack on" : "Preview pack"}
                    </Button>
                  }
                />

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4 leading-6">
                    Export performance snapshots, donation flows, moderation metrics, and stream health
                    history for institutional intelligence teams.
                  </div>

                  <button
                    type="button"
                    onClick={() => setBiConnectors((prev) => !prev)}
                    className={`w-full rounded-[16px] border p-4 text-left transition ${biConnectors ? "border-emerald-100 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <Download className="h-4 w-4 text-emerald-600" /> BI connectors
                    </div>
                    <div>
                      {biConnectors
                        ? "BI connector preview enabled for enterprise deployment patterns."
                        : "Enable BI connector preview for exported analytics workflows."}
                    </div>
                  </button>

                  <div className="grid gap-3 2xl:grid-cols-2">
                    <Button
                      className="w-full min-w-0 rounded-xl bg-emerald-500 px-4 text-sm hover:bg-emerald-600"
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      Export analytics
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full min-w-0 rounded-xl border-slate-200 bg-white px-4 text-sm hover:border-emerald-200 hover:bg-emerald-50"
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" /> View connector map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type PanelHeaderProps = {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
};

function PanelHeader({ title, subtitle, action }: PanelHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="break-normal text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
