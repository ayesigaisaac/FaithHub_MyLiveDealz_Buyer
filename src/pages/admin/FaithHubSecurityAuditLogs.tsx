// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  DatabaseBackup,
  Download,
  Eye,
  FileLock2,
  Globe2,
  History,
  KeyRound,
  Lock,
  ShieldCheck,
  ShieldEllipsis,
  Sparkles,
  TerminalSquare,
  UserCog,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const auditEvents = [
  {
    id: "AUD-10912",
    actor: "Admin Naomi",
    action: "Changed provider verification status",
    target: "St. Marys Cathedral",
    module: "Verification",
    time: "Today  09:14",
    risk: "Normal",
  },
  {
    id: "AUD-10908",
    actor: "System",
    action: "Rotated live stream key",
    target: "Evening Prayer Revival",
    module: "Live Ops",
    time: "Today  08:52",
    risk: "Sensitive",
  },
  {
    id: "AUD-10897",
    actor: "Admin Daniel",
    action: "Updated global notification template",
    target: "Replay available template",
    module: "Channels",
    time: "Today  08:21",
    risk: "Normal",
  },
  {
    id: "AUD-10870",
    actor: "Admin Aisha",
    action: "Applied user ban in live room",
    target: "Youth Impact Night",
    module: "Moderation",
    time: "Yesterday  22:14",
    risk: "Sensitive",
  },
  {
    id: "AUD-10812",
    actor: "System",
    action: "Immutable archive checkpoint completed",
    target: "Audit ledger",
    module: "Security",
    time: "Yesterday  18:00",
    risk: "Normal",
  },
];

const criticalActions = [
  "Role changes and privilege escalation",
  "Provider verification approvals and reversals",
  "Live stream takedown and ban enforcement",
  "Payout setting updates and financial overrides",
  "Template publication and sender reputation changes",
];

const exportOptions = [
  { title: "CSV export", note: "Quick audit review for internal analysis" },
  { title: "Signed archive bundle", note: "Formal evidence package with timestamps" },
  { title: "Immutable ledger snapshot", note: "Point-in-time export for compliance storage" },
];

const siemSignals = [
  { title: "Suspicious admin login cluster", note: "Two high-privilege logins originated from new device fingerprints within 12 minutes." },
  { title: "Repeated permission edits", note: "Privilege changes exceeded the normal threshold in one admin shift window." },
  { title: "Sensitive action burst", note: "Multiple takedowns, bans, and payout updates occurred in rapid succession." },
];

export default function FaithHubSecurityAuditLogs() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [immutableLogs, setImmutableLogs] = useState(true);
  const [siemIntegration, setSiemIntegration] = useState(true);
  const [moduleFilter, setModuleFilter] = useState("All modules");

  const visibleEvents = useMemo(() => {
    if (moduleFilter === "All modules") return auditEvents;
    return auditEvents.filter((item) => item.module === moduleFilter);
  }, [moduleFilter]);

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <History className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Security & Audit Logs</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "Cached security view only" : "Security logging live"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#20cf9c] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Security governance and evidence trail</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Audit logs, immutable records, exports, SIEM integration</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Every sensitive action should leave a durable trace</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Watch admin behavior, preserve critical actions, and export trustworthy evidence for internal or external review.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This page covers core security visibility across role changes, privileged operations, moderation actions, finance mutations, and system-generated checkpoints. Premium layers add immutable logs and SIEM integrations.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Audit posture</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Critical actions logged</div>
                        <div className="mt-1 text-3xl font-semibold text-white">{auditEvents.length}</div>
                        <div className="mt-2 text-sm text-white/80">Immutable chain {immutableLogs ? "enabled" : "disabled"} in preview.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open audit explorer</Button>
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

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Admin audit trail"
                  subtitle="Filter high-trust actions across modules and users."
                />
                <div className="mb-4 flex flex-wrap gap-2">
                  {["All modules", "Verification", "Live Ops", "Channels", "Moderation", "Security"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setModuleFilter(item)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${moduleFilter === item ? "border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20" : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {visibleEvents.map((event) => (
                    <div key={event.id} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{event.action}</div>
                          <div className="text-xs text-slate-500">{event.id}  {event.module}</div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.risk === "Sensitive" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-[#ecfff8] text-[#03cd8c]"}`}>
                          {event.risk}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{event.actor}  {event.target}</div>
                      <div className="mt-2 text-xs text-slate-500">{event.time}</div>
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
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Critical action coverage"
                  subtitle="Protect the events that matter most in a multi-role admin system."
                  action="Coverage"
                />
                <div className="space-y-3">
                  {criticalActions.map((item) => (
                    <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Immutable logs and exports"
                  subtitle="World-class record durability for high-trust environments."
                  action="Exports"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setImmutableLogs((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${immutableLogs ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <FileLock2 className="h-4 w-4 text-[#03cd8c]" /> Immutable logging
                    </div>
                    <div className="text-sm text-slate-600">{immutableLogs ? "Critical log records are protected in a tamper-resistant trail." : "Standard editable log storage only."}</div>
                  </button>
                  {exportOptions.map((item) => (
                    <div key={item.title} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-600">{item.note}</div>
                    </div>
                  ))}
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                    <Download className="mr-2 h-4 w-4" /> Export audit package
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="SIEM integration"
                  subtitle="Premium external security event forwarding and enterprise visibility."
                  action="Premium"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setSiemIntegration((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${siemIntegration ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <TerminalSquare className="h-4 w-4 text-[#03cd8c]" /> SIEM connector
                    </div>
                    <div className="text-sm text-slate-600">{siemIntegration ? "Premium external event streaming is enabled in preview." : "Local audit review only."}</div>
                  </button>
                  <div className="space-y-3">
                    {siemSignals.map((item) => (
                      <div key={item.title} className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                        <div className="text-sm text-slate-600">{item.note}</div>
                      </div>
                    ))}
                  </div>
                  <div className="fh-subcard-accent rounded-[24px] p-4 text-sm text-slate-700">
                    SIEM export can help enterprise operators centralize admin activity, suspicious behavior, and high-risk events beyond the app itself.
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

function SectionHeader({ title, subtitle, action = "Manage" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}




