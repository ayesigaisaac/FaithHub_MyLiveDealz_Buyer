// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Copy,
  Gauge,
  KeyRound,
  LifeBuoy,
  MonitorUp,
  RadioTower,
  RefreshCcw,
  Router,
  ServerCog,
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

const kpis = [
  { label: "Concurrent viewers", value: "4,286", delta: "+9.4%", icon: Users },
  { label: "Average bitrate", value: "4.2 Mbps", delta: "Stable", icon: Gauge },
  { label: "Dropped frames", value: "0.18%", delta: "Low", icon: Signal },
  { label: "Moderation queue", value: "12", delta: "3 urgent", icon: ShieldCheck },
];

const alerts = [
  {
    title: "Backup ingest not armed",
    detail: "Primary RTMPS is healthy, but the backup ingest path has not yet received heartbeat packets.",
    tone: "warning",
  },
  {
    title: "Chat spike detected",
    detail: "Comment volume is 2.4x above baseline for the last 5 minutes. Consider adding another moderator.",
    tone: "info",
  },
  {
    title: "Encoder preset mismatch",
    detail: "Outgoing ladder differs from the recommended preset for current audience conditions.",
    tone: "warning",
  },
];

const ingestRows = [
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

const presets = [
  {
    name: "FaithHub Standard 1080p",
    detail: "1080p/30, ladder 1080p/720p/480p, balanced audience distribution.",
  },
  {
    name: "Low-bandwidth Resilience",
    detail: "720p/30 with aggressive fallback and lower keyframe pressure for unstable regions.",
  },
  {
    name: "Interactive Low Latency",
    detail: "Tuned for faster response windows and tighter latency targets when engagement is prioritized.",
  },
];

const modQueue = [
  { item: "Abuse report in live chat", severity: "High", area: "Main session room" },
  { item: "Spam link burst", severity: "Medium", area: "Public chat lane" },
  { item: "Prayer escalation request", severity: "High", area: "Prayer queue" },
  { item: "Impersonation suspicion", severity: "Critical", area: "Comment identity" },
];

export default function FaithHubLiveDashboardOperations() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [copied, setCopied] = useState(false);
  const [primaryHealthy, setPrimaryHealthy] = useState(true);
  const [redundancyArmed, setRedundancyArmed] = useState(false);
  const [slaMonitoring, setSlaMonitoring] = useState(true);
  const [multiRoute, setMultiRoute] = useState(true);

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
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <MonitorUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Live Dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "Last known health only" : "Live telemetry active"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Operations command</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Ingest, viewers, health, moderation</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.62fr_0.38fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Provider-side reliability center</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Watch the live operation like an engineer, not just a broadcaster.
                      </h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        This dashboard tracks session status, viewer metrics, ingest health, chat pressure, and moderation load. It also prepares providers for premium routing, redundancy, and SLA-grade reliability operations.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <RadioTower className="h-4 w-4" /> RTMPS + SRT aware
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <ShieldCheck className="h-4 w-4" /> Auto health alerts
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Router className="h-4 w-4" /> Redundancy ready
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Session posture</div>
                      <div className="space-y-3">
                        <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                          <div className="text-xs uppercase tracking-[0.18em] text-white/70">Session</div>
                          <div className="mt-1 text-2xl font-semibold text-white">Evening Prayer Revival</div>
                          <div className="mt-2 text-sm text-white/80">Status: {primaryHealthy ? "Live and stable" : "Attention required"}</div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90" disabled={offlineReadOnly}>
                            Open controls
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                            onClick={() => setOfflineReadOnly((prev) => !prev)}
                          >
                            {offlineReadOnly ? "Go live" : "Read-only"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {kpis.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label} className="rounded-[28px] border border-white/60 bg-white/92 shadow-sm">
                    <CardContent className="p-5">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="mt-1 text-3xl font-semibold text-slate-900">{item.value}</div>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold text-[#03cd8c]">
                        {item.delta}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Ingest and encoder health</div>
                    <div className="text-sm text-slate-500">Track contribution paths, errors, and recommended presets.</div>
                  </div>
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">
                    <ServerCog className="mr-1 h-3.5 w-3.5" /> Live diagnostics
                  </Badge>
                </div>

                <div className="space-y-3">
                  {ingestRows.map((row) => (
                    <div key={row.name} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{row.name}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.status === "Healthy" ? "bg-[#ecfff8] text-[#03cd8c]" : row.status === "Connected" ? "bg-slate-100 text-slate-700" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                          {row.status}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-4">
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{row.protocol}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{row.bitrate}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{row.latency}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{row.errors}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {presets.map((preset) => (
                    <div key={preset.name} className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                      <div className="mb-2 text-sm font-semibold text-slate-900">{preset.name}</div>
                      <div className="text-sm leading-6 text-slate-600">{preset.detail}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-white sm:text-xl">Stream key and ingest guidance</div>
                    <div className="text-sm text-white/70">Operator-safe access and onboarding cues for encoders.</div>
                  </div>
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15">
                    <LifeBuoy className="mr-2 h-4 w-4" /> Help
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <KeyRound className="h-4 w-4 text-[#8ef0ca]" /> Stream key
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 font-mono text-sm text-white/90">
                      {streamKey}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90" onClick={copyKey} disabled={offlineReadOnly}>
                        <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied" : "Copy key"}
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15">
                        Rotate key
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 text-sm font-semibold text-white">Ingest guidance</div>
                    <div className="space-y-2 text-sm text-white/80">
                      <div> Use RTMPS for standard studio compatibility and a simpler managed path.</div>
                      <div> Use SRT when contribution reliability and network resilience are the priority.</div>
                      <div> Keep backup ingest warm for enterprise-grade continuity and fast failover.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Automatic health alerts</div>
                    <div className="text-sm text-slate-500">Escalate reliability issues before the audience notices.</div>
                  </div>
                  <Badge className="rounded-full bg-[#fff8ef] text-[#f77f00] hover:bg-[#fff8ef]">World-class feature</Badge>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.title} className={`rounded-[24px] border p-4 ${alert.tone === "warning" ? "border-[#f77f00]/15 bg-[#fffaf3]" : "border-slate-200 bg-[#f8fafc]"}`}>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        {alert.tone === "warning" ? <AlertTriangle className="h-4 w-4 text-[#f77f00]" /> : <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" />}
                        {alert.title}
                      </div>
                      <div className="text-sm text-slate-600">{alert.detail}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Enterprise reliability add-on</div>
                    <div className="text-sm text-slate-500">Premium routing, redundancy, and SLA monitoring.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Premium</Badge>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setMultiRoute((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${multiRoute ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Router className="h-4 w-4 text-[#03cd8c]" /> Multi-stream routing
                    </div>
                    <div className="text-sm text-slate-600">{multiRoute ? "Primary program can be routed to multiple internal distribution paths." : "Single route only."}</div>
                  </button>
                  <button
                    onClick={() => setRedundancyArmed((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${redundancyArmed ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <RefreshCcw className="h-4 w-4 text-[#03cd8c]" /> Primary/backup redundancy
                    </div>
                    <div className="text-sm text-slate-600">{redundancyArmed ? "Failover readiness is armed across ingest and output." : "Backup route is not currently armed."}</div>
                  </button>
                  <button
                    onClick={() => setSlaMonitoring((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${slaMonitoring ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <LifeBuoy className="h-4 w-4 text-[#03cd8c]" /> SLA monitoring
                    </div>
                    <div className="text-sm text-slate-600">{slaMonitoring ? "Availability and incident thresholds are being tracked." : "SLA visibility is disabled."}</div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 text-lg font-semibold text-slate-900">Chat and moderation pulse</div>
                <div className="space-y-3">
                  {modQueue.map((item) => (
                    <div key={item.item} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-1 text-sm font-semibold text-slate-900">{item.item}</div>
                      <div className="text-xs text-slate-500">{item.area}</div>
                      <div className="mt-2 inline-flex rounded-full bg-[#fff8ef] px-3 py-1 text-xs font-semibold text-[#f77f00]">
                        {item.severity}
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

