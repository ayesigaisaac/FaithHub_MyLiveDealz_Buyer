import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Copy,
  Gauge,
  KeyRound,
  LifeBuoy,
  MonitorUp,
  RadioTower,
  RefreshCcw,
  Router,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
  Signal,
  Sparkles,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type IconType = React.ComponentType<{ className?: string }>;

type AlertTone = "warning" | "info";
type IngestStatus = "Healthy" | "Standby" | "Connected";
type ModSeverity = "Critical" | "High" | "Medium";
type PostureState = "good" | "watch" | "elevated";

interface KPIItem {
  label: string;
  value: string;
  delta: string;
  trendWidth: string;
  trendNote: string;
  icon: IconType;
}

interface AlertItem {
  title: string;
  detail: string;
  tone: AlertTone;
}

interface IngestRow {
  name: string;
  protocol: string;
  status: IngestStatus;
  bitrate: string;
  latency: string;
  errors: string;
}

interface PresetItem {
  name: string;
  detail: string;
}

interface ModQueueItem {
  item: string;
  severity: ModSeverity;
  area: string;
  eta: string;
}

interface OperationPostureItem {
  label: string;
  value: string;
  note: string;
  progress: string;
  state: PostureState;
}

const kpis: KPIItem[] = [
  {
    label: "Concurrent viewers",
    value: "4,286",
    delta: "+9.4%",
    trendWidth: "76%",
    trendNote: "Prime-time audience still climbing",
    icon: Users,
  },
  {
    label: "Average bitrate",
    value: "4.2 Mbps",
    delta: "Stable",
    trendWidth: "68%",
    trendNote: "Encoder ladder within expected range",
    icon: Gauge,
  },
  {
    label: "Dropped frames",
    value: "0.18%",
    delta: "Low",
    trendWidth: "32%",
    trendNote: "Frame loss below alert threshold",
    icon: Signal,
  },
  {
    label: "Moderation queue",
    value: "12",
    delta: "3 urgent",
    trendWidth: "44%",
    trendNote: "Urgent items still inside SLA",
    icon: ShieldCheck,
  },
];

const alerts: AlertItem[] = [
  {
    title: "Backup ingest not armed",
    detail:
      "Primary RTMPS is healthy, but the backup ingest path has not yet received heartbeat packets.",
    tone: "warning",
  },
  {
    title: "Chat spike detected",
    detail:
      "Comment volume is 2.4x above baseline for the last 5 minutes. Consider adding another moderator.",
    tone: "info",
  },
  {
    title: "Encoder preset mismatch",
    detail:
      "Outgoing ladder differs from the recommended preset for current audience conditions.",
    tone: "warning",
  },
];

const ingestRows: IngestRow[] = [
  {
    name: "Primary RTMPS ingest",
    protocol: "RTMPS",
    status: "Healthy",
    bitrate: "4.4 Mbps",
    latency: "3.2 sec",
    errors: "0 critical",
  },
  {
    name: "Backup RTMPS ingest",
    protocol: "RTMPS",
    status: "Standby",
    bitrate: "0.0 Mbps",
    latency: "N/A",
    errors: "Waiting for connect",
  },
  {
    name: "SRT contribution feed",
    protocol: "SRT",
    status: "Connected",
    bitrate: "7.8 Mbps",
    latency: "1.1 sec",
    errors: "Minor jitter",
  },
];

const presets: PresetItem[] = [
  {
    name: "FaithHub Standard 1080p",
    detail:
      "1080p/30, ladder 1080p/720p/480p, balanced audience distribution.",
  },
  {
    name: "Low-bandwidth resilience",
    detail:
      "720p/30 with aggressive fallback and lower keyframe pressure for unstable regions.",
  },
  {
    name: "Interactive low latency",
    detail:
      "Tuned for faster response windows and tighter latency targets when engagement is prioritized.",
  },
];

const modQueue: ModQueueItem[] = [
  {
    item: "Abuse report in live chat",
    severity: "High",
    area: "Main session room",
    eta: "Respond in 7 min",
  },
  {
    item: "Spam link burst",
    severity: "Medium",
    area: "Public chat lane",
    eta: "Review in 15 min",
  },
  {
    item: "Prayer escalation request",
    severity: "High",
    area: "Prayer queue",
    eta: "Respond in 9 min",
  },
  {
    item: "Impersonation suspicion",
    severity: "Critical",
    area: "Comment identity",
    eta: "Immediate",
  },
];

const operationPosture: OperationPostureItem[] = [
  {
    label: "Primary ingest stability",
    value: "99.6%",
    note: "Heartbeat continuity healthy",
    progress: "92%",
    state: "good",
  },
  {
    label: "Backup route readiness",
    value: "Watch",
    note: "Backup heartbeat still missing",
    progress: "58%",
    state: "watch",
  },
  {
    label: "SLA incident exposure",
    value: "Low",
    note: "No session-impacting faults",
    progress: "84%",
    state: "good",
  },
];

const surfaceCardClass =
  "rounded-[28px] border border-white/75 bg-white/95 shadow-[0_16px_45px_-26px_rgba(15,23,42,0.34)]";
const panelItemClass = "rounded-[20px] border border-slate-200/95 bg-white p-4 shadow-sm";

function getIngestStatusPillClass(status: IngestStatus) {
  if (status === "Healthy") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }

  if (status === "Standby") {
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  }

  return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
}

function getAlertPanelClass(tone: AlertTone) {
  if (tone === "warning") {
    return "border-amber-100 bg-[#fffaf3]";
  }

  return "border-slate-200 bg-slate-50";
}

function getAlertIcon(tone: AlertTone) {
  return tone === "warning" ? (
    <AlertTriangle className="h-4 w-4 text-amber-600" />
  ) : (
    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
  );
}

function getSeverityPillClass(severity: ModSeverity) {
  if (severity === "Critical") {
    return "bg-rose-50 text-rose-600 ring-1 ring-rose-100";
  }

  if (severity === "High") {
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  }

  return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
}

function getSeverityRowClass(severity: ModSeverity) {
  if (severity === "Critical") {
    return "border-l-rose-400";
  }

  if (severity === "High") {
    return "border-l-amber-300";
  }

  return "border-l-slate-300";
}

function getPostureBarClass(state: PostureState) {
  if (state === "good") {
    return "bg-emerald-300";
  }

  if (state === "elevated") {
    return "bg-rose-300";
  }

  return "bg-amber-200";
}

function getPostureValueClass(state: PostureState) {
  if (state === "good") {
    return "text-emerald-700";
  }

  if (state === "elevated") {
    return "text-rose-700";
  }

  return "text-amber-700";
}

function getPostureValueClassInverse(state: PostureState) {
  if (state === "good") {
    return "text-emerald-100";
  }

  if (state === "elevated") {
    return "text-rose-100";
  }

  return "text-amber-100";
}

export default function FaithHubLiveDashboardOperations() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [copied, setCopied] = useState(false);
  const [primaryHealthy, setPrimaryHealthy] = useState(true);
  const [redundancyArmed, setRedundancyArmed] = useState(false);
  const [slaMonitoring, setSlaMonitoring] = useState(true);
  const [multiRoute, setMultiRoute] = useState(true);

  const streamKey = useMemo(() => "fh_live_prod__9K7A", []);
  const urgentQueueCount = useMemo(
    () => modQueue.filter((item) => item.severity !== "Medium").length,
    [],
  );

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText("fh_live_prod_example_key_9K7A");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-slate-200/75 bg-white/90 px-4 py-3.5 shadow-sm backdrop-blur"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <MonitorUp className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="fh-eyebrow text-emerald-600">EVzone Super App</div>
              <div className="truncate text-lg font-semibold tracking-tight text-slate-900">
                Live Dashboard Operations
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? (
                <WifiOff className="h-4 w-4 text-amber-600" />
              ) : (
                <Wifi className="h-4 w-4 text-emerald-600" />
              )}
              {offlineReadOnly ? "Last known health only" : "Live telemetry active"}
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
            <Card className="relative overflow-hidden rounded-[30px] border border-white/65 bg-gradient-to-br from-emerald-500 via-[#20c98f] to-[#e9fbf3] shadow-[0_24px_82px_-30px_rgba(16,185,129,0.46)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.1),transparent_24%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-emerald-600 hover:bg-white">
                      Operations command
                    </Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">
                      Ingest, viewers, health, moderation
                    </Badge>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Provider reliability center</div>
                      <h1 className="max-w-[22ch] break-normal text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.65rem]">
                        Operate live reliability like an engineering command deck.
                      </h1>
                      <p className="max-w-2xl break-normal fh-body text-white/90 sm:text-base">
                        Track session health, viewer pressure, ingest readiness, chat risk, and redundancy
                        posture in one surface built for fast operational decisions.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">
                          <RadioTower className="h-4 w-4" /> RTMPS + SRT aware
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">
                          <ShieldCheck className="h-4 w-4" /> Auto health alerts
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">
                          <Router className="h-4 w-4" /> Redundancy ready
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/20 bg-white/14 p-4 backdrop-blur sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-white">Session posture</div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${primaryHealthy ? "bg-emerald-300/25 text-emerald-50 ring-emerald-200/30" : "bg-amber-300/25 text-amber-50 ring-amber-200/35"}`}
                        >
                          {primaryHealthy ? "Stable" : "Watch"}
                        </span>
                      </div>

                      <div className="rounded-[18px] border border-white/20 bg-white/12 p-4">
                        <div className="fh-kicker-muted text-white/75">Session</div>
                        <div className="mt-1 text-2xl font-semibold text-white">Evening Prayer Revival</div>
                        <div className="mt-2 text-sm leading-6 text-white/85">
                          Status: {primaryHealthy ? "Live and stable" : "Attention required"}
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {operationPosture.map((item) => (
                          <div key={item.label} className="rounded-2xl border border-white/15 bg-black/10 p-3">
                            <div className="mb-1 flex items-center justify-between gap-2 text-sm text-white/85">
                              <span>{item.label}</span>
                              <span className={`font-semibold ${getPostureValueClassInverse(item.state)}`}>
                                {item.value}
                              </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-white/20">
                              <div
                                className={`h-full rounded-full ${getPostureBarClass(item.state)}`}
                                style={{ width: item.progress }}
                              />
                            </div>
                            <div className="mt-1 text-xs text-white/70">{item.note}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-2 2xl:grid-cols-2">
                        <Button
                          className="h-11 w-full min-w-0 rounded-2xl bg-white px-4 text-sm text-emerald-600 hover:bg-white/90"
                          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                          disabled={offlineReadOnly}
                        >
                          Open controls
                        </Button>
                        <Button
                          variant="outline"
                          className="h-11 w-full min-w-0 rounded-2xl border-white/25 bg-white/12 px-4 text-sm text-white hover:bg-white/15"
                          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                          onClick={() => setOfflineReadOnly((prev) => !prev)}
                        >
                          {offlineReadOnly ? "Go live" : "Read-only"}
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        className="mt-2 w-full rounded-2xl text-white hover:bg-white/10 hover:text-white"
                        onClick={() => setPrimaryHealthy((prev) => !prev)}
                      >
                        Simulate health check
                      </Button>
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
                      <div className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                        {item.value}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        {item.delta}
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
                  title="Ingest and encoder health"
                  subtitle="Track contribution paths, errors, and recommended presets."
                  action={
                    <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      <ServerCog className="mr-1 h-3.5 w-3.5" /> Live diagnostics
                    </Badge>
                  }
                />

                <div className="space-y-3">
                  {ingestRows.map((row) => (
                    <div key={row.name} className={panelItemClass}>
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{row.name}</div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getIngestStatusPillClass(row.status)}`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-4">
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">{row.protocol}</div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">{row.bitrate}</div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">{row.latency}</div>
                        <div className="rounded-2xl bg-slate-50 px-3 py-2">{row.errors}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {presets.map((preset) => (
                    <div key={preset.name} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 text-sm font-semibold text-slate-900">{preset.name}</div>
                      <div className="fh-body-tight text-slate-600">{preset.detail}</div>
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
            <Card className="rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.58)]">
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Stream key and ingest guidance"
                  subtitle="Operator-safe access and encoder onboarding guidance."
                  tone="inverse"
                  action={
                    <Button
                      variant="outline"
                      className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15"
                    >
                      <LifeBuoy className="mr-2 h-4 w-4" /> Help
                    </Button>
                  }
                />

                <div className="space-y-3">
                  <div className="rounded-[20px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <KeyRound className="h-4 w-4 text-emerald-200" /> Stream key
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 font-mono text-sm text-white/90">
                      {streamKey}
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <Button
                        className="rounded-2xl bg-white text-emerald-600 hover:bg-white/90"
                        onClick={copyKey}
                        disabled={offlineReadOnly}
                      >
                        <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied" : "Copy key"}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                      >
                        Rotate key
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur">
                    <div className="mb-2 text-sm font-semibold text-white">Ingest guidance</div>
                    <div className="space-y-2 text-sm text-white/80">
                      <div>Use RTMPS for standard studio compatibility and a simpler managed path.</div>
                      <div>Use SRT when contribution reliability and network resilience are the priority.</div>
                      <div>Keep backup ingest warm for fast failover continuity.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Automatic health alerts"
                  subtitle="Escalate reliability issues before the audience notices."
                  action={
                    <Badge className="rounded-full bg-amber-50 text-amber-700 hover:bg-amber-50">
                      Adaptive detection
                    </Badge>
                  }
                />
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.title} className={`rounded-[20px] border p-4 ${getAlertPanelClass(alert.tone)}`}>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        {getAlertIcon(alert.tone)}
                        {alert.title}
                      </div>
                      <div className="text-sm text-slate-600">{alert.detail}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border border-amber-200/55 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Enterprise reliability add-on"
                  subtitle="Premium routing, redundancy, and SLA monitoring."
                  action={
                    <Badge className="rounded-full bg-amber-100 text-amber-700 hover:bg-amber-100">
                      Premium
                    </Badge>
                  }
                />
                <div className="space-y-3">
                  <TogglePanel
                    icon={<Router className="h-4 w-4 text-emerald-600" />}
                    title="Multi-stream routing"
                    description={
                      multiRoute
                        ? "Primary program can route to multiple internal distribution paths."
                        : "Single route only."
                    }
                    active={multiRoute}
                    onToggle={() => setMultiRoute((prev) => !prev)}
                  />
                  <TogglePanel
                    icon={<RefreshCcw className="h-4 w-4 text-emerald-600" />}
                    title="Primary/backup redundancy"
                    description={
                      redundancyArmed
                        ? "Failover readiness is armed across ingest and output."
                        : "Backup route is not currently armed."
                    }
                    active={redundancyArmed}
                    onToggle={() => setRedundancyArmed((prev) => !prev)}
                  />
                  <TogglePanel
                    icon={<LifeBuoy className="h-4 w-4 text-emerald-600" />}
                    title="SLA monitoring"
                    description={
                      slaMonitoring
                        ? "Availability and incident thresholds are being tracked."
                        : "SLA visibility is disabled."
                    }
                    active={slaMonitoring}
                    onToggle={() => setSlaMonitoring((prev) => !prev)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={surfaceCardClass}>
              <CardContent className="fh-pad-panel">
                <PanelHeader
                  title="Chat and moderation pulse"
                  subtitle="Live queue pressure and trust signals."
                  action={
                    <Badge className="rounded-full bg-amber-50 text-amber-700 hover:bg-amber-50">
                      {urgentQueueCount} urgent
                    </Badge>
                  }
                />
                <div className="space-y-3">
                  {modQueue.map((item) => (
                    <div
                      key={item.item}
                      className={`rounded-[20px] border border-slate-200 border-l-4 bg-white p-4 shadow-sm ${getSeverityRowClass(item.severity)}`}
                    >
                      <div className="mb-1 text-sm font-semibold text-slate-900">{item.item}</div>
                      <div className="text-xs text-slate-500">{item.area}</div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityPillClass(item.severity)}`}>
                          {item.severity}
                        </span>
                        <span className="text-xs text-slate-500">{item.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type PanelHeaderTone = "default" | "inverse";

type PanelHeaderProps = {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  tone?: PanelHeaderTone;
};

function PanelHeader({ title, subtitle, action, tone = "default" }: PanelHeaderProps) {
  const inverse = tone === "inverse";

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <div className={`break-normal text-lg font-semibold sm:text-xl ${inverse ? "text-white" : "text-slate-900"}`}>
          {title}
        </div>
        <div className={`text-sm ${inverse ? "text-white/70" : "text-slate-500"}`}>{subtitle}</div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type TogglePanelProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  onToggle: () => void;
};

function TogglePanel({ icon, title, description, active, onToggle }: TogglePanelProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-[20px] border p-4 text-left transition ${active ? "border-emerald-100 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          {icon} {title}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
        >
          {active ? "Enabled" : "Disabled"}
        </span>
      </div>
      <div className="text-sm text-slate-600">{description}</div>
    </button>
  );
}
