// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  Download,
  Eye,
  Globe2,
  Layers3,
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
  { label: "Active live sessions", value: "26", delta: "+4", icon: Radio },
  { label: "Institutions in system", value: "1,482", delta: "+38 this week", icon: Building2 },
  { label: "Open incident alerts", value: "9", delta: "2 critical", icon: ShieldAlert },
  { label: "Daily active faith users", value: "184k", delta: "+11.8%", icon: Users },
  { label: "Global moderation actions", value: "3,218", delta: "+7.2%", icon: ShieldCheck },
  { label: "Cross-module revenue signals", value: "$82.4k", delta: "+14.3%", icon: BarChart3 },
];

const liveSessions = [
  {
    title: "Evening Prayer Revival",
    institution: "St. Marys Cathedral",
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

const incidents = [
  {
    title: "Moderation spike across two live sessions",
    detail: "Comment velocity and report volume increased sharply in the last 7 minutes.",
    severity: "High",
  },
  {
    title: "Institution verification backlog rising",
    detail: "Pending compliance approvals exceed target response window in three regions.",
    severity: "Medium",
  },
  {
    title: "Thumbnail moderation confidence mismatch",
    detail: "Automated media screening returned divergent scores for two uploads.",
    severity: "Critical",
  },
];

const anomalies = [
  {
    name: "Live churn anomaly",
    note: "Exit rate increased 2.3x above baseline during the first 3 minutes of one flagged session.",
    module: "Live Sessionz",
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
    note: "Delivery drop observed on one messaging lane after template rotation.",
    module: "Notifications",
  },
];

const modules = [
  { name: "FaithHub Core", state: "Nominal" },
  { name: "Live Sessionz", state: "Watch" },
  { name: "FaithMart", state: "Nominal" },
  { name: "Messaging Channels", state: "Watch" },
  { name: "Verification & Compliance", state: "Busy" },
  { name: "Reviews & Moderation", state: "Elevated" },
];

export default function FaithHubAdminOverview() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [biExports, setBiExports] = useState(true);
  const [moduleFilter, setModuleFilter] = useState("All modules");

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
              <Layers3 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">FaithHub Admin Overview</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "Cached overview only" : "Global admin telemetry live"}
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
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#20cf9c] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Global command layer</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">KPIs, live oversight, incidents, anomaly dashboards</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Watch the entire system</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        A premium admin overview for live operations, verification pressure, incidents, and cross-module system behavior.
                      </h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        This page gives admins a true system-wide view across FaithHub, Live Sessionz, FaithMart, messaging, verification, and moderation. It highlights what needs attention now and where trends are drifting out of normal range.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Global posture</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-white/70">Overall state</div>
                        <div className="mt-1 text-3xl font-semibold text-white">Watch</div>
                        <div className="mt-2 text-sm text-white/80">9 active incidents and 4 anomaly panels need review.</div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open incident desk</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
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

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
                        <ArrowUpRight className="h-3.5 w-3.5" /> {item.delta}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Live sessions running now"
                  subtitle="Global visibility into high-signal live sessions and health state."
                  action="Open live ops"
                />
                <div className="space-y-3">
                  {liveSessions.map((session) => (
                    <div key={session.title} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-base font-semibold text-slate-900">{session.title}</div>
                          <div className="text-sm text-slate-500">{session.institution}  {session.region}</div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${session.health === "Healthy" ? "bg-[#ecfff8] text-[#03cd8c]" : session.health === "Watch" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-rose-50 text-rose-600"}`}>
                          {session.health}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Eye className="h-4 w-4 text-[#03cd8c]" />
                        {session.viewers} viewers right now
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
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Incident alerts"
                  subtitle="The issues that require immediate admin attention."
                  action="Escalate"
                />
                <div className="space-y-3">
                  {incidents.map((incident) => (
                    <div key={incident.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-white">{incident.title}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${incident.severity === "Critical" ? "bg-rose-500/20 text-rose-100" : incident.severity === "High" ? "bg-[#f77f00]/20 text-[#fff1d6]" : "bg-white/10 text-white"}`}>
                          {incident.severity}
                        </span>
                      </div>
                      <div className="text-sm text-white/75">{incident.detail}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Anomaly detection dashboards"
                  subtitle="World-class cross-module drift and irregularity tracking."
                  action="Inspect"
                />
                <div className="space-y-3">
                  {anomalies.map((item) => (
                    <div key={item.name} className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4 shadow-sm">
                      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <AlertTriangle className="h-4 w-4 text-[#f77f00]" /> {item.name}
                      </div>
                      <div className="text-xs text-slate-500">{item.module}</div>
                      <div className="mt-2 text-sm text-slate-600">{item.note}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Cross-module status and BI exports</div>
                    <div className="text-sm text-slate-500">System control plus premium data export posture.</div>
                  </div>
                  <select
                    value={moduleFilter}
                    onChange={(e) => setModuleFilter(e.target.value)}
                    className="h-10 rounded-2xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#03cd8c]"
                  >
                    <option>All modules</option>
                    <option>FaithHub Core</option>
                    <option>Live Sessionz</option>
                    <option>FaithMart</option>
                    <option>Messaging Channels</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {modules.map((module) => (
                    <div key={module.name} className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="text-sm font-semibold text-slate-900">{module.name}</div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${module.state === "Nominal" ? "bg-[#ecfff8] text-[#03cd8c]" : module.state === "Busy" || module.state === "Watch" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-rose-50 text-rose-600"}`}>
                        {module.state}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">
                  Premium admin analytics can expose cross-module BI exports for institution health, moderation volume, revenue behavior, and live reliability trends.
                </div>
                <Button
                  className="mt-4 w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
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


function SectionHeader({ title, subtitle, action = "View all" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}

