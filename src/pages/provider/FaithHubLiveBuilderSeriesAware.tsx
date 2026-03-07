// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Globe2,
  Layers3,
  Mic2,
  PlayCircle,
  Radio,
  Save,
  Share2,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const builderModes = [
  { key: "series", label: "Series-linked" },
  { key: "standalone", label: "Standalone" },
];

const runOfShowTemplates = [
  { name: "Standard teaching night", sections: "Welcome, sermon, prayer, giving, announcements" },
  { name: "Live worship session", sections: "Opening, worship, testimony, prayer, close" },
  { name: "Event relay", sections: "Countdown, host intro, main stage, Q&A, wrap-up" },
];

const speakers = [
  { name: "Naomi Kato", role: "Lead speaker", status: "Confirmed" },
  { name: "Daniel Ssentamu", role: "Co-host", status: "Tentative" },
  { name: "Aisha Nabirye", role: "Prayer lead", status: "Confirmed" },
];

const streamPlatforms = [
  { name: "FaithHub native", state: true },
  { name: "YouTube Live", state: true },
  { name: "Facebook Live", state: false },
  { name: "TikTok Live", state: false },
  { name: "Instagram Live", state: false },
];

export default function FaithHubLiveBuilderSeriesAware() {
  const [mode, setMode] = useState("series");
  const [offlineDraft, setOfflineDraft] = useState(true);
  const [batchSchedule, setBatchSchedule] = useState(true);
  const [advancedTargeting, setAdvancedTargeting] = useState(true);
  const [ticketed, setTicketed] = useState(false);
  const [subscriptionOnly, setSubscriptionOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Standard teaching night");
  const [capacity, setCapacity] = useState("500");
  const [privacy, setPrivacy] = useState("Followers only");

  const selectedTemplateData = useMemo(
    () => runOfShowTemplates.find((t) => t.name === selectedTemplate),
    [selectedTemplate]
  );

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
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Live Builder</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineDraft ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineDraft ? "Schedule drafts queued" : "Ready to publish live"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[0.35fr_0.65fr]">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0ca]">Session mode</div>
                  <div className="mt-2 text-xl font-semibold">Series-aware live construction</div>
                </div>
                <div className="space-y-3">
                  {builderModes.map((item) => {
                    const active = mode === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setMode(item.key)}
                        className={`flex w-full items-center justify-between gap-3 rounded-[24px] border px-4 py-4 text-left transition ${
                          active ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold">{item.label}</div>
                          <div className="text-xs text-white/60">{item.key === "series" ? "Attach to a series and episode" : "Independent live session"}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4">
                  <div className="text-lg font-semibold text-slate-900">Premium live controls</div>
                  <div className="text-sm text-slate-500">Advanced provider options for high-scale scheduling.</div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setBatchSchedule((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${batchSchedule ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <CalendarDays className="h-4 w-4 text-[#03cd8c]" /> Batch schedule
                    </div>
                    <div className="text-sm text-slate-600">{batchSchedule ? "Multiple live sessions can be scheduled from one builder run." : "Single-session scheduling mode is active."}</div>
                  </button>
                  <button
                    onClick={() => setAdvancedTargeting((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${advancedTargeting ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Users className="h-4 w-4 text-[#03cd8c]" /> Advanced audience targeting
                    </div>
                    <div className="text-sm text-slate-600">{advancedTargeting ? "Audience groups, segments, and special lanes are available." : "Basic audience selection only."}</div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Series and standalone live setup</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Run-of-show, roster, platforms, monetization</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Live builder overview</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Build a live session around the content strategy, not just the stream.</h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        Providers can schedule a live session under a Series and Episode or create it standalone, then enrich it with speakers, RSVP rules, privacy, run-of-show, platforms, and monetization settings.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Publishing state</div>
                      <div className="mb-3 text-4xl font-semibold text-white">Draft</div>
                      <div className="h-2 rounded-full bg-white/20">
                        <div className="h-2 rounded-full bg-white" style={{ width: "63%" }} />
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                          <Save className="mr-2 h-4 w-4" /> Save
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineDraft((prev) => !prev)}
                        >
                          {offlineDraft ? "Queued" : "Publish ready"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.5fr_0.5fr]">
              <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Session setup</div>
                    <div className="text-sm text-slate-500">Core session identity, linkage, and access rules.</div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Series</span>
                        <select className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          <option>Walking in Wisdom</option>
                          <option>Mercy in Motion</option>
                          <option>Standalone session</option>
                        </select>
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Episode</span>
                        <select className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          <option>Episode 5: Wisdom for the Next Season</option>
                          <option>Episode 4: Guarding the Heart</option>
                        </select>
                      </label>
                    </div>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Live session title</span>
                      <input className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="Wisdom for the Next Season" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Description</span>
                      <textarea className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#03cd8c]" rows={4} defaultValue="A live continuation of the series with guided prayer, practical wisdom, and Q&A support." />
                    </label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Privacy</span>
                        <select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          <option>Followers only</option>
                          <option>Public</option>
                          <option>Members only</option>
                        </select>
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">RSVP</span>
                        <select className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          <option>Enabled</option>
                          <option>Hidden</option>
                        </select>
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Capacity</span>
                        <input value={capacity} onChange={(e) => setCapacity(e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
                  <CardContent className="p-5 sm:p-6">
                    <div className="mb-4">
                      <div className="text-lg font-semibold text-slate-900">Run of show and speaker roster</div>
                      <div className="text-sm text-slate-500">World-class orchestration for polished live delivery.</div>
                    </div>
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Run-of-show template</span>
                        <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          {runOfShowTemplates.map((template) => (
                            <option key={template.name}>{template.name}</option>
                          ))}
                        </select>
                      </label>
                      <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <ClipboardList className="h-4 w-4 text-[#03cd8c]" /> Active run of show
                        </div>
                        <div className="text-sm text-slate-600">{selectedTemplateData?.sections}</div>
                      </div>
                      <div className="space-y-3">
                        {speakers.map((speaker) => (
                          <div key={speaker.name} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="text-sm font-semibold text-slate-900">{speaker.name}</div>
                            <div className="text-xs text-slate-500">{speaker.role}</div>
                            <div className="mt-1 text-sm text-slate-600">{speaker.status}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.5fr_0.5fr]">
              <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Stream-to-platforms presets</div>
                    <div className="text-sm text-slate-500">Reuse platform routing patterns across repeated sessions.</div>
                  </div>
                  <div className="space-y-3">
                    {streamPlatforms.map((platform) => (
                      <button
                        key={platform.name}
                        className={`flex w-full items-center justify-between gap-3 rounded-[24px] border px-4 py-4 text-left transition ${platform.state ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{platform.name}</div>
                          <div className="text-xs text-slate-500">Preset connection state</div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${platform.state ? "bg-[#03cd8c] text-white" : "bg-slate-100 text-slate-700"}`}>
                          {platform.state ? "Connected" : "Off"}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Monetization and advanced targeting</div>
                    <div className="text-sm text-slate-500">Provider-side revenue and audience controls.</div>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => setTicketed((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${ticketed ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Ticket className="h-4 w-4 text-[#03cd8c]" /> Ticketed session
                      </div>
                      <div className="text-sm text-slate-600">{ticketed ? "FaithMart ticketing toggle is active for this live session." : "Session is not currently ticketed."}</div>
                    </button>
                    <button
                      onClick={() => setSubscriptionOnly((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${subscriptionOnly ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <ShieldCheck className="h-4 w-4 text-[#03cd8c]" /> Subscription access
                      </div>
                      <div className="text-sm text-slate-600">{subscriptionOnly ? "Only eligible subscribed members may enter this session." : "Session remains open to standard audience rules."}</div>
                    </button>
                    <div className="rounded-[24px] border border-[#03cd8c]/15 bg-[#ecfff8] p-4 text-sm text-slate-700">
                      Advanced targeting can combine audience groups, segment rules, language targets, and supporter tiers for higher-precision live distribution.
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                        <CalendarDays className="mr-2 h-4 w-4" /> Save schedule draft
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <Share2 className="mr-2 h-4 w-4 text-[#03cd8c]" /> Publish later
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
