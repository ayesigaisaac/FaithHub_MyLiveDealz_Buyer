import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  Download,
  Eye,
  Layers3,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type IconType = React.ComponentType<{ className?: string }>;

type IncidentSeverity = "Critical" | "High" | "Medium";
type ModuleState = "Nominal" | "Watch" | "Busy" | "Elevated";
type LiveHealth = "Healthy" | "Watch" | "Attention";
type SnapshotState = "good" | "watch" | "elevated";

interface KPIItem {
  label: string;
  value: string;
  delta: string;
  trendWidth: string;
  trendNote: string;
  icon: IconType;
}

interface LiveSessionItem {
  title: string;
  institution: string;
  region: string;
  viewers: string;
  health: LiveHealth;
}

interface IncidentItem {
  title: string;
  detail: string;
  severity: IncidentSeverity;
}

interface AnomalyItem {
  name: string;
  note: string;
  module: string;
}

interface ModuleItem {
  name: string;
  state: ModuleState;
}

interface AdminActionLink {
  title: string;
  detail: string;
  path: string;
}

interface OperationSnapshotItem {
  label: string;
  value: string;
  note: string;
  progress: string;
  state: SnapshotState;
}

const kpis: KPIItem[] = [
  {
    label: "Active live sessions",
    value: "26",
    delta: "+4",
    trendWidth: "72%",
    trendNote: "Peak period starts in 18 min",
    icon: Radio,
  },
  {
    label: "Institutions in system",
    value: "1,482",
    delta: "+38 this week",
    trendWidth: "66%",
    trendNote: "Verification throughput improving",
    icon: Building2,
  },
  {
    label: "Open incident alerts",
    value: "9",
    delta: "2 critical",
    trendWidth: "41%",
    trendNote: "Lower than previous 24h window",
    icon: ShieldAlert,
  },
  {
    label: "Daily active faith users",
    value: "184k",
    delta: "+11.8%",
    trendWidth: "78%",
    trendNote: "High engagement in live blocks",
    icon: Users,
  },
  {
    label: "Global moderation actions",
    value: "3,218",
    delta: "+7.2%",
    trendWidth: "57%",
    trendNote: "Auto-assist confidence stable",
    icon: ShieldCheck,
  },
  {
    label: "Cross-module revenue signals",
    value: "$82.4k",
    delta: "+14.3%",
    trendWidth: "69%",
    trendNote: "Donation conversion above baseline",
    icon: BarChart3,
  },
];

const liveSessions: LiveSessionItem[] = [
  {
    title: "Evening Prayer Revival",
    institution: "St. Mary's Cathedral",
    region: "Uganda",
    viewers: "4.2k",
    health: "Healthy",
  },
  {
    title: "Women Fellowship Reflection",
    institution: "Al Noor Community Centre",
    region: "Uganda",
    viewers: "920",
    health: "Watch",
  },
  {
    title: "Youth Impact Night",
    institution: "Kingdom Youth Movement",
    region: "Kenya",
    viewers: "1.8k",
    health: "Healthy",
  },
  {
    title: "Marketplace Day Launch",
    institution: "House of Grace",
    region: "Nigeria",
    viewers: "2.1k",
    health: "Attention",
  },
];

const incidents: IncidentItem[] = [
  {
    title: "Moderation spike across two live sessions",
    detail: "Comment velocity and report volume increased sharply in the last 7 minutes.",
    severity: "High",
  },
  {
    title: "Institution verification backlog rising",
    detail: "Pending compliance approvals exceed the target response window in three regions.",
    severity: "Medium",
  },
  {
    title: "Thumbnail moderation confidence mismatch",
    detail: "Automated media screening returned divergent scores for two uploads.",
    severity: "Critical",
  },
];

const anomalies: AnomalyItem[] = [
  {
    name: "Live churn anomaly",
    note: "Exit rate increased 2.3x above baseline during the first 3 minutes of one flagged session.",
    module: "Live Sessions",
  },
  {
    name: "Review brigading cluster",
    note: "Institution reviews show unusual timing and account-relationship patterns.",
    module: "Reviews",
  },
  {
    name: "Donation velocity irregularity",
    note: "One fund crossed historical conversion norms and requires finance confidence review.",
    module: "Giving",
  },
  {
    name: "Notification failure pocket",
    note: "Delivery drop was observed on one messaging lane after template rotation.",
    module: "Notifications",
  },
];

const modules: ModuleItem[] = [
  { name: "FaithHub Core", state: "Nominal" },
  { name: "Live Sessions", state: "Watch" },
  { name: "FaithMart", state: "Nominal" },
  { name: "Messaging Channels", state: "Watch" },
  { name: "Verification & Compliance", state: "Busy" },
  { name: "Reviews & Moderation", state: "Elevated" },
];

const adminActionLinks: AdminActionLink[] = [
  {
    title: "Moderation Console",
    detail: "Review live reports, takedowns, bans, and urgent trust cases.",
    path: "/app/admin/live-moderation",
  },
  {
    title: "Verification Queue",
    detail: "Open provider approvals and institution compliance decisions.",
    path: "/app/admin/verification",
  },
  {
    title: "Provider Operations",
    detail: "Jump into provider live operations with admin oversight enabled.",
    path: "/app/provider/live-ops?admin=1",
  },
  {
    title: "User Experience",
    detail: "Inspect the user home experience without losing admin access.",
    path: "/app/user/home?admin=1",
  },
];

const operationSnapshot: OperationSnapshotItem[] = [
  {
    label: "Incident response SLA",
    value: "96%",
    note: "Within 15-minute target",
    progress: "96%",
    state: "good",
  },
  {
    label: "Live ingest reliability",
    value: "99.2%",
    note: "No critical packet drops",
    progress: "92%",
    state: "good",
  },
  {
    label: "Verification queue pressure",
    value: "Watch",
    note: "Backlog growing in 3 regions",
    progress: "62%",
    state: "watch",
  },
];

const moduleFilterOptions = [
  "All modules",
  "FaithHub Core",
  "Live Sessions",
  "FaithMart",
  "Messaging Channels",
  "Verification & Compliance",
  "Reviews & Moderation",
] as const;

const surfaceCardClass =
  "rounded-[24px] border border-slate-200 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04)]";
const panelItemClass =
  "rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4 shadow-[0_4px_12px_rgba(15,23,42,0.03)]";

function getSeverityPillClass(severity: IncidentSeverity) {
  if (severity === "Critical") {
    return "bg-rose-500/20 text-rose-100 ring-1 ring-rose-300/35";
  }

  if (severity === "High") {
    return "bg-amber-400/20 text-amber-100 ring-1 ring-amber-200/35";
  }

  return "bg-white/10 text-slate-100 ring-1 ring-white/20";
}

function getSeverityPanelClass(severity: IncidentSeverity) {
  if (severity === "Critical") {
    return "border-l-rose-400";
  }

  if (severity === "High") {
    return "border-l-amber-300";
  }

  return "border-l-slate-400";
}

function getModuleStatePillClass(state: ModuleState) {
  if (state === "Nominal") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }

  if (state === "Elevated") {
    return "bg-rose-50 text-rose-600 ring-1 ring-rose-100";
  }

  return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
}

function getSessionHealthPillClass(health: LiveHealth) {
  if (health === "Healthy") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }

  if (health === "Attention") {
    return "bg-rose-50 text-rose-600 ring-1 ring-rose-100";
  }

  return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
}

function getSnapshotBarClass(state: SnapshotState) {
  if (state === "good") {
    return "bg-emerald-500";
  }

  if (state === "elevated") {
    return "bg-rose-500";
  }

  return "bg-amber-400";
}

function getSnapshotValueClass(state: SnapshotState) {
  if (state === "good") {
    return "text-emerald-700";
  }

  if (state === "elevated") {
    return "text-rose-700";
  }

  return "text-amber-700";
}

export default function FaithHubAdminOverview() {
  const navigate = useNavigate();
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [biExports, setBiExports] = useState(true);
  const [moduleFilter, setModuleFilter] = useState<(typeof moduleFilterOptions)[number]>("All modules");

  const criticalIncidentCount = incidents.filter((item) => item.severity === "Critical").length;
  const activeWatchCount = liveSessions.filter((session) => session.health !== "Healthy").length;

  const filteredModules = useMemo(() => {
    if (moduleFilter === "All modules") {
      return modules;
    }

    return modules.filter((module) => module.name === moduleFilter);
  }, [moduleFilter]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5f7fa] text-slate-900">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-200/75 bg-white/90 px-4 py-3.5 shadow-sm backdrop-blur"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <Layers3 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="fh-eyebrow text-emerald-600">EVzone Super App</div>
              <div className="truncate text-lg font-semibold tracking-tight text-slate-900">
                FaithHub Admin Overview
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-amber-600" /> : <Wifi className="h-4 w-4 text-emerald-600" />}
              {offlineReadOnly ? "Cached overview only" : "Global admin telemetry live"}
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
            <Card className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#f8fafc] via-[#f5f7fa] to-[#eef6f2] shadow-[0_16px_38px_-24px_rgba(15,23,42,0.3)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.09),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_32%)]" />

                <div className="relative z-10 text-slate-900">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                      Admin command center
                    </Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">
                      KPIs, incidents, anomaly dashboards
                    </Badge>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-slate-500">System-wide oversight</div>
                      <h1 className="max-w-[22ch] break-normal text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
                        Professional control surface for live operations, trust, and platform health.
                      </h1>
                      <p className="max-w-2xl break-normal fh-body text-slate-600 sm:text-base">
                        Monitor critical signals across FaithHub, Live Sessions, FaithMart, messaging,
                        verification, and moderation so your team can respond early and decisively.
                      </p>

                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <div className="fh-kicker-muted text-slate-500">Live sessions at watch level</div>
                          <div className="mt-1 text-2xl font-semibold text-slate-900">{activeWatchCount}</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                          <div className="fh-kicker-muted text-slate-500">Critical incidents now</div>
                          <div className="mt-1 text-2xl font-semibold text-slate-900">{criticalIncidentCount}</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-slate-200 bg-white p-4 sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">Global posture</div>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                          Watch
                        </span>
                      </div>

                      <div className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4">
                        <div className="fh-kicker-muted text-slate-500">Overall state</div>
                        <div className="mt-1 text-3xl font-semibold text-slate-900">Watch</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">
                          9 active incidents and 4 anomaly panels need review.
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {operationSnapshot.map((item) => (
                          <div key={item.label} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-3">
                            <div className="mb-1 flex items-center justify-between gap-2 text-sm text-slate-700">
                              <span>{item.label}</span>
                              <span className={`font-semibold ${getSnapshotValueClass(item.state)}`}>{item.value}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-200">
                              <div
                                className={`h-full rounded-full ${getSnapshotBarClass(item.state)}`}
                                style={{ width: item.progress }}
                              />
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{item.note}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-2 2xl:grid-cols-2">
                        <Button
                          className="h-11 w-full min-w-0 rounded-2xl bg-slate-900 px-4 text-sm text-white hover:bg-slate-800"
                          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                          onClick={() => navigate("/app/admin/live-moderation")}
                        >
                          Open incident desk
                        </Button>
                        <Button
                          variant="outline"
                          className="h-11 w-full min-w-0 rounded-2xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
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

            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
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
                        <ArrowUpRight className="h-3.5 w-3.5" /> {item.delta}
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
                <SectionHeader
                  title="Live sessions running now"
                  subtitle="High-signal sessions with viewer context and health state."
                  action="Open live ops"
                  onAction={() => navigate("/app/provider/live-ops?admin=1")}
                />

                <div className="space-y-3">
                  {liveSessions.map((session) => (
                    <div key={session.title} className={panelItemClass}>
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="break-normal text-base font-semibold text-slate-900">
                            {session.title}
                          </div>
                          <div className="text-sm text-slate-500">
                            {session.institution} · {session.region}
                          </div>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getSessionHealthPillClass(session.health)}`}
                        >
                          {session.health}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Eye className="h-4 w-4 text-emerald-600" />
                        {session.viewers} viewers right now
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Admin jump points"
                  subtitle="Cross-role entry points that keep admin oversight active."
                  action="Open security"
                  onAction={() => navigate("/app/admin/security")}
                />

                <div className="grid gap-3 md:grid-cols-2">
                  {adminActionLinks.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => navigate(item.path)}
                      className="group relative overflow-hidden rounded-[20px] border border-slate-200/90 bg-slate-50 p-4 text-left transition hover:border-emerald-200 hover:bg-white"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/65 to-emerald-500/0 opacity-0 transition group-hover:opacity-100" />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                          <div className="mt-2 fh-body-tight text-slate-600">{item.detail}</div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-emerald-600" />
                      </div>
                    </button>
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
            <Card className="rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.58)]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Incident alerts"
                  subtitle="Issues that require immediate admin attention."
                  action="Escalate"
                  tone="inverse"
                />

                <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Sparkles className="h-4 w-4 text-amber-200" />
                    AI triage suggests immediate review for 2 incidents.
                  </div>
                </div>

                <div className="space-y-3">
                  {incidents.map((incident) => (
                    <div
                      key={incident.title}
                      className={`rounded-[20px] border border-white/12 border-l-4 bg-white/[0.06] p-4 backdrop-blur ${getSeverityPanelClass(incident.severity)}`}
                    >
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <div className="max-w-[34ch] break-normal text-sm font-semibold leading-6 text-white">
                          {incident.title}
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityPillClass(incident.severity)}`}
                        >
                          {incident.severity}
                        </span>
                      </div>
                      <div className="text-sm leading-6 text-white/75">{incident.detail}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border border-amber-200/55 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Anomaly detection dashboards"
                  subtitle="Cross-module drift and irregularity tracking."
                  action="Inspect"
                />

                <div className="space-y-3">
                  {anomalies.map((item) => (
                    <div key={item.name} className="rounded-[20px] border border-amber-100 bg-white p-4 shadow-sm">
                      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <AlertTriangle className="h-4 w-4 text-amber-600" /> {item.name}
                      </div>
                      <div className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-100">
                        {item.module}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{item.note}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="break-normal text-lg font-semibold text-slate-900 sm:text-xl">
                      Cross-module status and BI exports
                    </div>
                    <div className="text-sm text-slate-500">System control and premium data export posture.</div>
                  </div>

                  <select
                    value={moduleFilter}
                    onChange={(event) => setModuleFilter(event.target.value as (typeof moduleFilterOptions)[number])}
                    className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 sm:w-auto"
                  >
                    {moduleFilterOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  {filteredModules.map((module) => (
                    <div key={module.name} className={panelItemClass}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-900">{module.name}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getModuleStatePillClass(module.state)}`}>
                          {module.state}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  Premium admin analytics expose exportable signals for institution health, moderation
                  volume, revenue behavior, and live reliability trends.
                </div>

                <Button
                  className={`mt-4 h-11 w-full rounded-2xl ${biExports ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-900 hover:bg-slate-800"}`}
                  onClick={() => setBiExports((prev) => !prev)}
                >
                  <Download className="mr-2 h-4 w-4" /> {biExports ? "BI exports enabled" : "Enable BI exports"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type SectionHeaderTone = "default" | "inverse";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  action?: string;
  onAction?: () => void;
  tone?: SectionHeaderTone;
};

function SectionHeader({
  title,
  subtitle,
  action = "View all",
  onAction,
  tone = "default",
}: SectionHeaderProps) {
  const inverse = tone === "inverse";

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <div className={`break-normal text-lg font-semibold sm:text-xl ${inverse ? "text-white" : "text-slate-900"}`}>
          {title}
        </div>
        <div className={`text-sm ${inverse ? "text-white/70" : "text-slate-500"}`}>{subtitle}</div>
      </div>

      <Button
        type="button"
        variant="ghost"
        className={`rounded-full ${inverse ? "text-amber-100 hover:bg-white/10 hover:text-white" : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"}`}
        onClick={onAction}
      >
        {action}
      </Button>
    </div>
  );
}


