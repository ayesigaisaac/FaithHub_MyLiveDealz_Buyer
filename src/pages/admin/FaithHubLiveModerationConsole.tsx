// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  Bell,
  Camera,
  CheckCircle2,
  EyeOff,
  Flag,
  Gavel,
  ImageOff,
  MessageSquareWarning,
  MonitorX,
  ScanEye,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  VideoOff,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const liveRooms = [
  {
    name: "Evening Prayer Revival",
    institution: "St. Marys Cathedral",
    reports: 14,
    status: "Watch",
    viewers: "4.2k",
  },
  {
    name: "Youth Impact Night",
    institution: "Kingdom Youth Movement",
    reports: 28,
    status: "Elevated",
    viewers: "1.8k",
  },
  {
    name: "Women Fellowship Reflection",
    institution: "Al Noor Community Centre",
    reports: 6,
    status: "Healthy",
    viewers: "920",
  },
];

const reportQueue = [
  {
    item: "Spam burst in live chat",
    source: "Chat",
    severity: "High",
    room: "Youth Impact Night",
  },
  {
    item: "Possible impersonation in comment stream",
    source: "Chat",
    severity: "Critical",
    room: "Evening Prayer Revival",
  },
  {
    item: "Unsafe thumbnail candidate",
    source: "Media",
    severity: "Medium",
    room: "Women Fellowship Reflection",
  },
  {
    item: "Repeated harassment reply chain",
    source: "Chat",
    severity: "High",
    room: "Youth Impact Night",
  },
];

const moderationActions = [
  {
    title: "Hide message",
    note: "Removes a single chat item from the visible stream while preserving audit trace.",
  },
  {
    title: "Temporary user ban",
    note: "Blocks chat or interaction rights for a defined period across the affected session.",
  },
  {
    title: "Stream takedown",
    note: "Immediately disables playback and interaction access for a live session.",
  },
  {
    title: "Escalate to human review",
    note: "Routes the case to a higher-trust moderation path with richer investigation tooling.",
  },
];

const mediaSignals = [
  {
    title: "Thumbnail safety scan",
    detail: "Automated image screening returned elevated adult/violence confidence and needs admin confirmation.",
    source: "Image moderation",
  },
  {
    title: "UGC clip review",
    detail: "Uploaded short clip triggered a borderline safety result and has been held from publishing.",
    source: "Video moderation",
  },
  {
    title: "Comment toxicity assist",
    detail: "A cluster of messages in one room carries repeated harmful-language patterns.",
    source: "Text moderation",
  },
];

const escalationSteps = [
  "Priority route to trust and safety lead",
  "Human moderation handoff with evidence bundle",
  "Institution-facing incident notice where appropriate",
  "Permanent or session-scoped enforcement if confirmed",
];

export default function FaithHubLiveModerationConsole() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Youth Impact Night");
  const [humanEscalations, setHumanEscalations] = useState(true);
  const [mediaModeration, setMediaModeration] = useState(true);
  const [query, setQuery] = useState("");

  const filteredQueue = useMemo(() => {
    return reportQueue.filter((item) => {
      const matchesRoom = selectedRoom === "All rooms" || item.room === selectedRoom;
      const matchesQuery =
        item.item.toLowerCase().includes(query.toLowerCase()) ||
        item.room.toLowerCase().includes(query.toLowerCase()) ||
        item.source.toLowerCase().includes(query.toLowerCase());
      return matchesRoom && matchesQuery;
    });
  }, [selectedRoom, query]);

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Live Moderation Console</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "View only, no live actions" : "Moderation controls active"}
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Global live moderation</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Chat, takedowns, bans, reports, media safety</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Protect live spaces in real time</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        A live trust console for chat control, stream enforcement, user bans, and automated media risk screening.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Admins can monitor active rooms, process reports, apply chat moderation, trigger stream takedowns, review automated media flags, and escalate complex incidents into dedicated human moderation lanes.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Current room focus</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Room</div>
                        <div className="mt-1 text-2xl font-semibold text-white">{selectedRoom}</div>
                        <div className="mt-2 text-sm text-white/80">{filteredQueue.length} queue items match current filter.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open room</Button>
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
                  title="Active live rooms"
                  subtitle="Understand where moderation pressure is rising before it becomes an incident."
                  action="Open ops"
                />
                <div className="space-y-3">
                  {liveRooms.map((room) => (
                    <button
                      key={room.name}
                      onClick={() => setSelectedRoom(room.name)}
                      className={`w-full rounded-[24px] border p-4 text-left shadow-sm transition ${selectedRoom === room.name ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-base font-semibold text-slate-900">{room.name}</div>
                          <div className="text-sm text-slate-500">{room.institution}</div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${room.status === "Healthy" ? "bg-[#ecfff8] text-[#03cd8c]" : room.status === "Watch" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-rose-50 text-rose-600"}`}>
                          {room.status}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Reports: {room.reports}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Viewers: {room.viewers}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Report queue and controls"
                  subtitle="Moderate live chat and session safety from a single response surface."
                />
                <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search report queue"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] pl-11 pr-4 text-sm outline-none focus:border-[#03cd8c]"
                    />
                  </div>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#03cd8c]"
                  >
                    <option>All rooms</option>
                    {liveRooms.map((room) => (
                      <option key={room.name}>{room.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  {filteredQueue.map((item) => (
                    <div key={`${item.item}-${item.room}`} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{item.item}</div>
                          <div className="text-xs text-slate-500">{item.room}  {item.source}</div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.severity === "Critical" ? "bg-rose-50 text-rose-600" : item.severity === "High" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                          {item.severity}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineReadOnly}>
                          <EyeOff className="mr-2 h-4 w-4" /> Hide item
                        </Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" disabled={offlineReadOnly}>
                          <Ban className="mr-2 h-4 w-4 text-[#03cd8c]" /> Ban user
                        </Button>
                        <Button variant="outline" className="rounded-2xl border-rose-200 bg-white hover:bg-rose-50" disabled={offlineReadOnly}>
                          <MonitorX className="mr-2 h-4 w-4 text-rose-500" /> Takedown stream
                        </Button>
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
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Automated media moderation"
                  subtitle="Screen thumbnails, clips, and user-generated uploads before they spread."
                  action="Media"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setMediaModeration((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${mediaModeration ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <ScanEye className="h-4 w-4 text-[#8ef0ca]" /> Media safety screening
                    </div>
                    <div className="text-sm text-white/75">{mediaModeration ? "Image and video moderation assistance is enabled." : "Media screening is disabled in preview."}</div>
                  </button>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur text-sm text-white/80">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                        <Camera className="h-4 w-4 text-[#8ef0ca]" /> Image screening
                      </div>
                      Review thumbnails, posters, and uploaded stills for moderation labels or unsafe visual patterns.
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur text-sm text-white/80">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                        <VideoOff className="h-4 w-4 text-[#8ef0ca]" /> Video screening
                      </div>
                      Hold back clips or user-submitted media when confidence thresholds indicate potential safety concerns.
                    </div>
                  </div>
                  <div className="space-y-3">
                    {mediaSignals.map((signal) => (
                      <div key={signal.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                        <div className="mb-1 text-sm font-semibold text-white">{signal.title}</div>
                        <div className="text-xs text-white/55">{signal.source}</div>
                        <div className="mt-2 text-sm text-white/75">{signal.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Escalation and human moderation"
                  subtitle="Premium trust and safety depth for high-risk or high-scale live environments."
                  action="Premium"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setHumanEscalations((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${humanEscalations ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Gavel className="h-4 w-4 text-[#03cd8c]" /> 24/7 escalation routing
                    </div>
                    <div className="text-sm text-slate-600">{humanEscalations ? "High-risk incidents can be routed into human moderation workflows at any hour." : "Escalation flow is disabled in preview."}</div>
                  </button>
                  <div className="space-y-2">
                    {escalationSteps.map((step) => (
                      <div key={step} className="fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                        {step}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineReadOnly}>
                    <MessageSquareWarning className="mr-2 h-4 w-4" /> Open human escalation panel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Offline posture"
                  subtitle="Keep admins informed even when live controls cannot be executed."
                  action="Status"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    When offline, admins can review the last known queue state, active rooms, and flagged media summaries, but no enforcement actions should be permitted.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    This avoids inconsistent moderation outcomes while still preserving operational awareness.
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineReadOnly}>
                    <Flag className="mr-2 h-4 w-4" /> Execute moderation action
                  </Button>
                </div>
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
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}




