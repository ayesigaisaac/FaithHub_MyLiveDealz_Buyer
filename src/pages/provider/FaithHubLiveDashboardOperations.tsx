import React, { useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Copy,
  Gauge,
  KeyRound,
  MessageSquare,
  MonitorPlay,
  RadioTower,
  RefreshCcw,
  Router,
  ShieldAlert,
  ShieldCheck,
  Signal,
  Sparkles,
  TriangleAlert,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";

type TimeWindow = "7d" | "30d" | "term";

type OpsModule = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
};

type HealthItem = {
  id: string;
  label: string;
  value: string;
  progress: number;
  note: string;
  tone: "emerald" | "orange" | "rose";
  badge: string;
};

type IngestRow = {
  id: string;
  name: string;
  protocol: string;
  bitrate: string;
  latency: string;
  status: "Healthy" | "Standby" | "Watch";
};

type AgendaItem = {
  id: string;
  time: string;
  title: string;
  detail: string;
};

type ActionItem = {
  id: string;
  title: string;
  detail: string;
  actionLabel: string;
  tone?: "default" | "elevated";
};

const opsModules: OpsModule[] = [
  {
    id: "studio",
    title: "Live Studio",
    description: "Scenes, overlays, and host controls.",
    actionLabel: "Open studio",
  },
  {
    id: "destinations",
    title: "Stream Destinations",
    description: "Multicast and endpoint health.",
    actionLabel: "Stream destinations",
  },
  {
    id: "notifications",
    title: "Audience Notifications",
    description: "Reminder blasts and attendance nudges.",
    actionLabel: "Notify audience",
  },
  {
    id: "trust",
    title: "Trust Queue",
    description: "Chat incidents and moderation escalations.",
    actionLabel: "Open trust queue",
  },
];

const healthItems: HealthItem[] = [
  {
    id: "primary",
    label: "Primary ingest stability",
    value: "99.6%",
    progress: 92,
    note: "Heartbeat continuity remains healthy.",
    tone: "emerald",
    badge: "Healthy",
  },
  {
    id: "backup",
    label: "Backup route readiness",
    value: "58%",
    progress: 58,
    note: "Backup heartbeat still missing on one node.",
    tone: "orange",
    badge: "Watch",
  },
  {
    id: "moderation",
    label: "Moderation SLA",
    value: "92%",
    progress: 92,
    note: "3 urgent chat incidents still inside SLA.",
    tone: "rose",
    badge: "Urgent",
  },
];

const ingestRows: IngestRow[] = [
  {
    id: "primary-rtmps",
    name: "Primary RTMPS ingest",
    protocol: "RTMPS",
    bitrate: "4.4 Mbps",
    latency: "3.2 sec",
    status: "Healthy",
  },
  {
    id: "backup-rtmps",
    name: "Backup RTMPS ingest",
    protocol: "RTMPS",
    bitrate: "0.0 Mbps",
    latency: "N/A",
    status: "Standby",
  },
  {
    id: "srt-contrib",
    name: "SRT contribution feed",
    protocol: "SRT",
    bitrate: "7.8 Mbps",
    latency: "1.1 sec",
    status: "Watch",
  },
];

const agenda: AgendaItem[] = [
  {
    id: "0910",
    time: "09:10",
    title: "Ingest health check",
    detail: "Validate backup route and failover readiness.",
  },
  {
    id: "1230",
    time: "12:30",
    title: "Studio rehearsal",
    detail: "Host transition checks with scene overlays.",
  },
  {
    id: "1715",
    time: "17:15",
    title: "Pre-live launch review",
    detail: "Queue moderation staffing and reminder push.",
  },
];

const actionItems: ActionItem[] = [
  {
    id: "backup",
    title: "Arm backup ingest",
    detail: "Backup heartbeat is missing and needs operator attention.",
    actionLabel: "Open studio",
    tone: "elevated",
  },
  {
    id: "multicast",
    title: "Review stream destinations",
    detail: "Confirm endpoint health before evening peak.",
    actionLabel: "Stream destinations",
  },
  {
    id: "notify",
    title: "Send attendance reminders",
    detail: "Prime-time audience reminders due in 25 minutes.",
    actionLabel: "Notify audience",
  },
  {
    id: "queue",
    title: "Resolve trust queue",
    detail: "Escalate unresolved moderation reports.",
    actionLabel: "Open trust queue",
  },
];

function ingestToneClass(status: IngestRow["status"]) {
  if (status === "Healthy") return "bg-[#ecfff8] text-[#049e6d]";
  if (status === "Standby") return "bg-[#fff3e8] text-[#cc6500]";
  return "bg-rose-50 text-rose-600";
}

export default function FaithHubLiveDashboardOperations() {
  const [windowView, setWindowView] = useState<TimeWindow>("7d");
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [multiRoute, setMultiRoute] = useState(true);
  const [redundancyArmed, setRedundancyArmed] = useState(false);
  const [slaMonitoring, setSlaMonitoring] = useState(true);
  const [copied, setCopied] = useState(false);

  const streamKey = useMemo(() => "fh_live_prod__9K7A", []);

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
    <div className="space-y-4">
      <Card className="fh-interactive-card overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(110deg,rgba(3,205,140,0.2),rgba(248,251,252,0.94)_36%,rgba(14,165,233,0.14))] shadow-[var(--shadow-soft)]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-slate-500">Provider reliability center</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Live Dashboard Operations</h2>
              <p className="mt-2 text-sm text-slate-600">Ingest, reliability, moderation, and audience pressure in one control surface.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  Session command
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-100">
                  RTMPS + SRT aware
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-white">
                  Fast escalation workflow
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[460px]">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setWindowView("7d")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      windowView === "7d" ? "bg-white border border-slate-200 text-slate-900 shadow-sm" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    7 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowView("30d")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      windowView === "30d" ? "bg-white border border-slate-200 text-slate-900 shadow-sm" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    30 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowView("term")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      windowView === "term" ? "bg-white border border-slate-200 text-slate-900 shadow-sm" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    This term
                  </button>
                </div>

                <Button
                  variant="outline"
                  data-action-label="Open studio"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Studio
                </Button>

                <Button
                  variant="outline"
                  data-action-label="Stream destinations"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Destinations
                </Button>

                <Button
                  data-action-label="Open trust queue"
                  className="h-10 rounded-xl bg-[#03cd8c] px-4 text-sm text-white hover:bg-[#03cd8c]"
                >
                  Trust Queue
                </Button>
              </div>

              <div className="flex items-center justify-end gap-2 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
                  {offlineReadOnly ? <WifiOff className="h-3.5 w-3.5 text-[#f77f00]" /> : <Wifi className="h-3.5 w-3.5 text-[#03cd8c]" />}
                  {offlineReadOnly ? "Read-only cache" : "Live telemetry active"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {opsModules.map((module) => (
              <button
                key={module.id}
                type="button"
                data-action-label={module.actionLabel}
                className="group w-full rounded-2xl border border-[var(--border)] bg-white/90 p-4 text-left transition hover:border-[#c8f0e0] hover:bg-white"
              >
                <div className="text-sm font-semibold text-slate-900">{module.title}</div>
                <div className="mt-1 text-xs text-slate-500">{module.description}</div>
                <div className="mt-3 inline-flex items-center text-xs font-semibold text-[#049e6d]">
                  Open <Sparkles className="ml-1.5 h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {healthItems.map((item) => (
              <DashboardStatCard
                key={item.id}
                label={item.label}
                value={item.value}
                badge={item.badge}
                hint={item.note}
                tone={item.tone}
                progress={item.progress}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Concurrent viewers"
          value="4,286"
          hint="Prime-time audience still climbing"
          tone="emerald"
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Average bitrate"
          value="4.2 Mbps"
          hint="Encoder ladder within expected range"
          tone="slate"
          icon={<Gauge className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Dropped frames"
          value="0.18%"
          hint="Frame loss remains below threshold"
          tone="orange"
          icon={<Signal className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Queue pressure"
          value="3 urgent"
          hint="Escalations still inside SLA"
          tone="rose"
          icon={<ShieldAlert className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_1fr]">
        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Ingest and Encoder Health"
              subtitle="Contribution paths and reliability posture"
              action={
                <button
                  type="button"
                  data-action-label="Open studio"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  Open controls
                </button>
              }
            />

            <div className="space-y-2">
              {ingestRows.map((row) => (
                <div key={row.id} className="rounded-xl border border-[var(--border)] bg-white p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-900">{row.name}</div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ingestToneClass(row.status)}`}>
                      {row.status}
                    </span>
                  </div>
                  <div className="grid gap-2 text-xs text-slate-600 sm:grid-cols-3">
                    <div className="rounded-lg bg-slate-100 px-2.5 py-1.5">Protocol: {row.protocol}</div>
                    <div className="rounded-lg bg-slate-100 px-2.5 py-1.5">Bitrate: {row.bitrate}</div>
                    <div className="rounded-lg bg-slate-100 px-2.5 py-1.5">Latency: {row.latency}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 fh-subcard-muted rounded-xl p-3">
              <div className="fh-label text-slate-400">Session</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Evening Prayer Revival</div>
              <div className="mt-1 text-xs text-slate-500">Status: live and stable. Backup route still pending heartbeat.</div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Ops Agenda"
              subtitle="Today's timeline"
              action={
                <button
                  type="button"
                  data-action-label="Notify audience"
                  className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Bell className="mr-1.5 h-3.5 w-3.5" />
                  Notify
                </button>
              }
            />

            <div className="space-y-2">
              {agenda.map((item) => (
                <div key={item.id} className="rounded-xl border border-[var(--border)] bg-white p-3">
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

            <div className="mt-3 fh-subcard-muted rounded-xl p-3">
              <div className="fh-label text-slate-400">Completion</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">58%</div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[58%] rounded-full bg-[#03cd8c]" />
              </div>
              <div className="mt-2 text-xs text-slate-500">Most delays are from backup path and queue handoff timing.</div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Top actions you can take now"
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

            <div className="space-y-2">
              {actionItems.map((item) => (
                <DashboardActionItem
                  key={item.id}
                  title={item.title}
                  detail={item.detail}
                  actionLabel={item.actionLabel}
                  tone={item.tone}
                />
              ))}
            </div>

            <div className="mt-3 fh-subcard-accent rounded-xl p-3">
              <div className="fh-label text-emerald-700">Smart insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Backup route health impacts conversion during spikes</div>
              <p className="mt-1 text-xs text-slate-600">Sessions with armed redundancy show lower drop-off and fewer moderation escalations.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Stream Key and Ingest Access"
              subtitle="Operator-safe controls for active broadcast sessions"
              action={
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                  aria-label="Open key settings"
                >
                  <KeyRound className="h-4 w-4" />
                </button>
              }
            />

            <div className="fh-subcard-muted rounded-xl p-3">
              <div className="fh-label text-slate-400">Stream key</div>
              <div className="mt-1 font-mono text-sm font-semibold text-slate-900">{streamKey}</div>
              <div className="mt-2 fh-actions-grid">
                <Button
                  className="h-10 rounded-xl bg-[#03cd8c] text-white hover:bg-[#03cd8c]"
                  onClick={copyKey}
                  disabled={offlineReadOnly}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied" : "Copy key"}
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  Rotate key
                </Button>
              </div>
            </div>

            <div className="mt-3 fh-actions-grid">
              <ToggleCard
                label="Multi-stream routing"
                description="Route program feed to multiple destinations."
                active={multiRoute}
                onToggle={() => setMultiRoute((prev) => !prev)}
                icon={<Router className="h-4 w-4" />}
              />
              <ToggleCard
                label="Primary/backup redundancy"
                description="Keep failover ready across ingest and output."
                active={redundancyArmed}
                onToggle={() => setRedundancyArmed((prev) => !prev)}
                icon={<RefreshCcw className="h-4 w-4" />}
              />
              <ToggleCard
                label="SLA monitoring"
                description="Track threshold breaches in real time."
                active={slaMonitoring}
                onToggle={() => setSlaMonitoring((prev) => !prev)}
                icon={<ShieldCheck className="h-4 w-4" />}
              />
              <ToggleCard
                label="Read-only mode"
                description="Freeze controls and observe telemetry only."
                active={offlineReadOnly}
                onToggle={() => setOfflineReadOnly((prev) => !prev)}
                icon={offlineReadOnly ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Reliability Pulse"
              subtitle="Incident signals and current posture"
              action={
                <button
                  type="button"
                  data-action-label="Open trust queue"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  View queue
                </button>
              }
            />

            <div className="space-y-2">
              <PulseItem
                icon={<TriangleAlert className="h-4 w-4 text-[#f77f00]" />}
                title="Backup ingest not armed"
                detail="Primary path is healthy, but backup heartbeat has not arrived."
                tone="elevated"
              />
              <PulseItem
                icon={<MessageSquare className="h-4 w-4 text-slate-500" />}
                title="Chat spike detected"
                detail="Comment volume is 2.4x baseline; add moderation support."
              />
              <PulseItem
                icon={<MonitorPlay className="h-4 w-4 text-[#03cd8c]" />}
                title="Encoder preset mismatch"
                detail="Current ladder differs from recommended evening profile."
                tone="elevated"
              />
            </div>

            <div className="mt-3 fh-subcard-accent rounded-xl p-3">
              <div className="fh-label text-emerald-700">Operational confidence</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Most systems are stable with one backup-path risk</div>
              <p className="mt-1 text-xs text-slate-600">Arm backup and keep moderation queue below 5 urgent items for green posture.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ToggleCard({
  label,
  description,
  active,
  onToggle,
  icon,
}: {
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-xl border p-3 text-left transition ${
        active ? "border-emerald-100 bg-[#ecfff8]" : "border-[var(--border)] bg-white hover:border-[#c8f0e0]"
      }`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          {icon}
          {label}
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          {active ? "On" : "Off"}
        </span>
      </div>
      <div className="text-xs text-slate-600">{description}</div>
    </button>
  );
}

function PulseItem({
  icon,
  title,
  detail,
  tone = "default",
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  tone?: "default" | "elevated";
}) {
  return (
    <div className={`rounded-xl border p-3 ${tone === "elevated" ? "border-amber-200 bg-[#fffaf3]" : "border-[var(--border)] bg-white"}`}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5">{icon}</span>
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-xs text-slate-500">{detail}</div>
        </div>
      </div>
    </div>
  );
}

