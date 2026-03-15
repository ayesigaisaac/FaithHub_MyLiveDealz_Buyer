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
  { label: "Upcoming sessions", value: "9", trend: "+3", icon: Radio },
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
    <div className="min-h-screen overflow-x-clip bg-[#f5f7f6] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="fh-eyebrow text-emerald-600">Provider workspace</div>
              <div className="text-lg font-semibold">Provider Dashboard</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-emerald-600" />}
              {offlineReadOnly ? "Read-only KPI cache" : "Live provider telemetry"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-200 hover:text-emerald-600">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfefd_100%)] shadow-sm">
              <CardContent className="p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.04),transparent_20%)]" />
                <div className="relative z-10 text-slate-900">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Operations overview</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-100">KPIs, live health, and alerts</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.63fr_0.37fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker-subtle text-emerald-600">Provider dashboard</div>
                      <h1 className="max-w-[18ch] text-[2rem] font-semibold leading-[1.08] sm:text-[2.25rem]">
                        See stream health, donations, alerts, and upcoming activity in one view.
                      </h1>
                      <p className="max-w-2xl fh-body text-slate-500 sm:text-base">
                        Track what is happening now, what needs attention next, and where the team should step in without scanning multiple screens.
                      </p>
                    </div>
                    <div className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-3 text-sm font-semibold text-slate-900">Alert posture</div>
                      <div className="space-y-3">
                        <div className="rounded-[16px] border border-emerald-100 bg-emerald-50 p-4">
                          <div className="fh-kicker-muted text-emerald-700">Real-time</div>
                          <div className="mt-1 text-2xl font-semibold text-slate-900">3 active anomalies</div>
                        </div>
                        <div className="grid gap-2 lg:grid-cols-2">
                          <Button className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-500">Open alerts</Button>
                          <Button
                            variant="outline"
                            className="rounded-xl border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:bg-emerald-50"
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

            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
              {kpis.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label} className="rounded-[16px] border border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="mt-1 text-3xl font-semibold text-slate-900">{item.value}</div>
                      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <ArrowUpRight className="h-3.5 w-3.5" /> {item.trend}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Real-time stream health</div>
                    <div className="text-sm text-slate-500">Monitor bitrate, latency, viewers, and attention risks.</div>
                  </div>
                  <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    <MonitorPlay className="mr-1 h-3.5 w-3.5" /> Live telemetry
                  </Badge>
                </div>
                <div className="space-y-3">
                  {liveHealth.map((stream) => (
                    <div key={stream.name} className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{stream.name}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stream.health === "Healthy" ? "bg-emerald-50 text-emerald-700" : stream.health === "Stable" ? "bg-slate-100 text-slate-700" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                          {stream.health}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2 2xl:grid-cols-4">
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
            <Card className="rounded-[20px] border border-slate-200 bg-white text-slate-900 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Upcoming sessions</div>
                    <div className="text-sm text-slate-500">What the institution needs to prepare next.</div>
                  </div>
                  <Button variant="outline" className="rounded-full border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:bg-emerald-50">
                    Open scheduler
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.title} className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200">
                      <div className="mb-1 text-base font-semibold text-slate-900">{session.title}</div>
                      <div className="text-sm text-slate-500">{session.channel}</div>
                      <div className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                        <Clock3 className="mr-2 h-4 w-4" /> {session.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Moderation queue</div>
                    <div className="text-sm text-slate-500">Items that require immediate or tracked action.</div>
                  </div>
                  <Badge className="rounded-full bg-[#fff8ef] text-[#f77f00] hover:bg-[#fff8ef]">Response queue</Badge>
                </div>
                <div className="space-y-3">
                  {moderationQueue.map((item) => (
                    <div key={item.item} className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200">
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

            <Card className="rounded-[20px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Anomaly alerts</div>
                    <div className="text-sm text-slate-500">Provider-side risk and performance warnings.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">World-class feature</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  {anomalyAlerts.map((alert) => (
                    <div key={alert} className="rounded-[16px] border border-[#f77f00]/15 bg-white p-6 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                        <AlertTriangle className="h-4 w-4 text-[#f77f00]" /> Anomaly detected
                      </div>
                      {alert}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Premium analytics pack</div>
                    <div className="text-sm text-slate-500">Exports, dashboards, and BI connectors for advanced institutions.</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50"
                    onClick={() => setAnalyticsPack((prev) => !prev)}
                  >
                    {analyticsPack ? "Analytics pack on" : "Preview pack"}
                  </Button>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[16px] border border-slate-200 bg-[#f8fafc] p-4">
                    Advanced institutions can export performance snapshots, donation flows, moderation metrics, and stream health history.
                  </div>
                  <button
                    onClick={() => setBiConnectors((prev) => !prev)}
                    className={`w-full rounded-[16px] border p-4 text-left transition ${biConnectors ? "border-emerald-100 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <Download className="h-4 w-4 text-emerald-600" /> BI connectors
                    </div>
                    <div>{biConnectors ? "BI connector preview enabled for enterprise deployment patterns." : "Enable BI connector preview for exported analytics workflows."}</div>
                  </button>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-500">Export analytics</Button>
                    <Button variant="outline" className="rounded-xl border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50">
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




