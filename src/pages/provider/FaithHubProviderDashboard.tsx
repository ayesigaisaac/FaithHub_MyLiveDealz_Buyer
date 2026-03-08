// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  HeartHandshake,
  MonitorPlay,
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

const kpis = [
  { label: "Live viewers now", value: "4,280", trend: "+12%", icon: Users },
  { label: "Upcoming Live Sessionz", value: "9", trend: "+3", icon: Radio },
  { label: "Recent donations", value: "$12.4k", trend: "+18%", icon: HeartHandshake },
  { label: "Moderation queue", value: "14", trend: "2 urgent", icon: ShieldAlert },
];

const liveHealth = [
  { name: "Main Sunday Stream", bitrate: "4.2 Mbps", latency: "Low", viewers: "2.8k", health: "Healthy" },
  { name: "Women Fellowship Reflection", bitrate: "3.1 Mbps", latency: "Normal", viewers: "920", health: "Stable" },
  { name: "Youth Rehearsal Feed", bitrate: "1.2 Mbps", latency: "Elevated", viewers: "230", health: "Watch closely" },
];

const upcomingSessions = [
  { title: "Mercy in Motion  Episode 5", time: "Tonight  7:30 PM", channel: "Main live channel" },
  { title: "Family Prayer Circle", time: "Tomorrow  6:00 PM", channel: "Family ministry channel" },
  { title: "Marketplace Day Launch", time: "Saturday  10:00 AM", channel: "Event live relay" },
];

const moderationQueue = [
  { item: "Live chat abuse report", severity: "High", area: "Youth Impact Night" },
  { item: "Review flagged for brigading pattern", severity: "Medium", area: "Walking in Wisdom" },
  { item: "Prayer request escalation", severity: "High", area: "Women Fellowship Reflection" },
  { item: "Suspicious payout detail change", severity: "Critical", area: "Finance controls" },
];

const anomalyAlerts = [
  "Spike in join/leave rate on Youth Rehearsal Feed detected within 4 minutes.",
  "Donation conversion unusually high during final 7 minutes of Evening Prayer Revival.",
  "Moderation queue response time trending above target for two active sessions.",
];

export default function FaithHubProviderDashboard() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [analyticsPack, setAnalyticsPack] = useState(true);
  const [biConnectors, setBiConnectors] = useState(false);

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
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Provider Dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "Read-only KPI cache" : "Live provider telemetry"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Operational command center</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">KPIs, live health, donations, moderation</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.63fr_0.37fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">See the whole operation at once</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        A provider command dashboard for streaming health, donations, alerts, moderation, and growth visibility.
                      </h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        This dashboard gives institutions a live operating view of what is happening now, what is coming next, what needs intervention, and where premium analytics can deepen decision-making.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Alert posture</div>
                      <div className="space-y-3">
                        <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                          <div className="text-xs uppercase tracking-[0.18em] text-white/70">Real-time</div>
                          <div className="mt-1 text-2xl font-semibold text-white">3 active anomalies</div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open alerts</Button>
                          <Button
                            variant="outline"
                            className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                            onClick={() => setOfflineReadOnly((prev) => !prev)}
                          >
                            {offlineReadOnly ? "Go live" : "Read-only mode"}
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
                        <ArrowUpRight className="h-3.5 w-3.5" /> {item.trend}
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
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Real-time stream health</div>
                    <div className="text-sm text-slate-500">Monitor bitrate, latency, viewers, and attention risks.</div>
                  </div>
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">
                    <MonitorPlay className="mr-1 h-3.5 w-3.5" /> Live telemetry
                  </Badge>
                </div>
                <div className="space-y-3">
                  {liveHealth.map((stream) => (
                    <div key={stream.name} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{stream.name}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stream.health === "Healthy" ? "bg-[#ecfff8] text-[#03cd8c]" : stream.health === "Stable" ? "bg-slate-100 text-slate-700" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                          {stream.health}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-4">
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Bitrate: {stream.bitrate}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Latency: {stream.latency}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Viewers: {stream.viewers}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Health: {stream.health}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.09, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-white sm:text-xl">Upcoming Live Sessionz</div>
                    <div className="text-sm text-white/70">What the institution needs to prepare next.</div>
                  </div>
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15">
                    Open scheduler
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 text-base font-semibold text-white">{session.title}</div>
                      <div className="text-sm text-white/70">{session.time}</div>
                      <div className="mt-2 text-sm text-white/80">{session.channel}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Moderation queue</div>
                    <div className="text-sm text-slate-500">Items that require immediate or tracked action.</div>
                  </div>
                  <Badge className="rounded-full bg-[#fff8ef] text-[#f77f00] hover:bg-[#fff8ef]">Response queue</Badge>
                </div>
                <div className="space-y-3">
                  {moderationQueue.map((item) => (
                    <div key={item.item} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{item.item}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.severity === "Critical" ? "bg-rose-50 text-rose-600" : item.severity === "High" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                          {item.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{item.area}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Anomaly alerts</div>
                    <div className="text-sm text-slate-500">Provider-side risk and performance warnings.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">World-class feature</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  {anomalyAlerts.map((alert) => (
                    <div key={alert} className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                        <AlertTriangle className="h-4 w-4 text-[#f77f00]" /> Anomaly detected
                      </div>
                      {alert}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Premium analytics pack</div>
                    <div className="text-sm text-slate-500">Exports, dashboards, and BI connectors for advanced institutions.</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setAnalyticsPack((prev) => !prev)}
                  >
                    {analyticsPack ? "Analytics pack on" : "Preview pack"}
                  </Button>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                    Advanced institutions can export performance snapshots, donation flows, moderation metrics, and stream health history.
                  </div>
                  <button
                    onClick={() => setBiConnectors((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${biConnectors ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <Download className="h-4 w-4 text-[#03cd8c]" /> BI connectors
                    </div>
                    <div>{biConnectors ? "BI connector preview enabled for enterprise deployment patterns." : "Enable BI connector preview for exported analytics workflows."}</div>
                  </button>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Export analytics</Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      View connector map
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

