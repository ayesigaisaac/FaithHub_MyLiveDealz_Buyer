// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Headphones,
  Layers3,
  Lock,
  Mic2,
  PlayCircle,
  Sparkles,
  Star,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const relatedSessions = [
  {
    title: "Guarding the Heart · Live replay",
    status: "Replay available",
    time: "43 min",
    type: "Past",
  },
  {
    title: "Wisdom for the Next Season",
    status: "Starts tonight · 7:30 PM",
    time: "Upcoming Live Sessionz",
    type: "Upcoming",
  },
  {
    title: "Series Q&A Reflection",
    status: "Community catch-up · Tomorrow 6:00 PM",
    time: "Upcoming discussion",
    type: "Upcoming",
  },
];

const attachments = [
  { title: "Replay video", subtitle: "Adaptive quality streaming", icon: PlayCircle },
  { title: "Episode notes", subtitle: "Offline-readable summary and verses", icon: FileText },
  { title: "Audio version", subtitle: "Low-data download option", icon: Headphones },
  { title: "Transcript", subtitle: "Searchable and chapter-linked", icon: Mic2 },
];

const resources = [
  { title: "Reflection questions", premium: false },
  { title: "Small group prompt sheet", premium: true },
  { title: "Leader study guide", premium: true },
  { title: "Verse memory card", premium: false },
];

const chapters = [
  { title: "Opening reflection", time: "00:00" },
  { title: "Understanding the heart", time: "04:20" },
  { title: "Wisdom in temptation", time: "12:45" },
  { title: "Practical next steps", time: "23:10" },
  { title: "Closing prayer", time: "34:05" },
];

function SectionHeader({ title, subtitle, action = "See all" }) {
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

export default function FaithHubEpisodeDetail() {
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [aiChapters, setAiChapters] = useState(true);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [audioDownloaded, setAudioDownloaded] = useState(true);

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
              <PlayCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Episode Detail</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Offline notes available
              </div>
            )}
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Episode experience</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Replay + notes + chapters</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.66fr_0.34fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Guarding the Heart</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        One episode, fully equipped for replay, notes, related sessions, and deeper premium resources.
                      </h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        Follow the episode details, open its replay or upcoming live counterparts, read notes offline, download audio for low-data use, and unlock deeper study attachments if the institution enables premium resources.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Clock3 className="h-4 w-4" />
                          45 min episode
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Layers3 className="h-4 w-4" />
                          Episode 4 of 8
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Sparkles className="h-4 w-4" />
                          Series-linked journey
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-4 h-36 rounded-[20px] bg-white/20" />
                      <div className="mb-3 text-sm font-semibold text-white">Playback behavior</div>
                      <div className="space-y-3 text-sm text-white/85">
                        <button
                          onClick={() => setAutoPlayNext((prev) => !prev)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                            autoPlayNext ? "border-white/25 bg-white/16" : "border-white/10 bg-white/8 hover:bg-white/12"
                          }`}
                        >
                          <div className="font-semibold text-white">Next up autoplay</div>
                          <div className="mt-1 text-white/75">{autoPlayNext ? "Enabled for the next episode or recommended replay." : "Disabled. Episode will stop when this one ends."}</div>
                        </button>
                        <button
                          onClick={() => setAiChapters((prev) => !prev)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                            aiChapters ? "border-white/25 bg-white/16" : "border-white/10 bg-white/8 hover:bg-white/12"
                          }`}
                        >
                          <div className="font-semibold text-white">AI chaptering</div>
                          <div className="mt-1 text-white/75">{aiChapters ? "Chapter markers available for quick navigation." : "Standard timeline only."}</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Replay attachments"
                  subtitle="Everything linked to this episode in one clean detail layer."
                  action="Open player"
                />
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                  {attachments.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-base font-semibold text-slate-900">{item.title}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-600">{item.subtitle}</div>
                        <Button variant="ghost" className="mt-4 rounded-full px-0 text-[#03cd8c] hover:bg-transparent hover:text-[#03cd8c]">
                          Open attachment
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Related Live Sessionz"
                  subtitle="Past and upcoming sessions connected to this episode."
                />
                <div className="space-y-3">
                  {relatedSessions.map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 text-base font-semibold text-slate-900">{item.title}</div>
                          <div className="text-sm text-slate-500">{item.status}</div>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                            <Clock3 className="h-3.5 w-3.5 text-[#03cd8c]" />
                            {item.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Open</Button>
                          <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
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
            transition={{ delay: 0.12, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="AI chaptering"
                  subtitle="Optional smart structure for quick episode navigation."
                  action="Tune"
                />
                <div className="space-y-3">
                  {chapters.map((item) => (
                    <div key={item.title} className="flex items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                      <div>
                        <div className="text-sm font-semibold text-white">{item.title}</div>
                        <div className="text-xs text-white/65">Jump point</div>
                      </div>
                      <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85">{item.time}</div>
                    </div>
                  ))}
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/75 backdrop-blur">
                    AI chaptering remains optional and can be disabled for a simpler playback experience.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Resources and premium attachments"
                  subtitle="Free and premium assets attached to the episode experience."
                  action="Download"
                />
                <div className="space-y-3">
                  {resources.map((item) => (
                    <div key={item.title} className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.premium ? "Premium resource" : "Included resource"}</div>
                      </div>
                      {item.premium ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                          <Lock className="h-3.5 w-3.5" /> Locked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfff8] px-2.5 py-1 text-xs font-semibold text-[#03cd8c]">
                          <Star className="h-3.5 w-3.5" /> Included
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Button
                    className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
                    onClick={() => setPremiumUnlocked((prev) => !prev)}
                  >
                    {premiumUnlocked ? "Premium preview unlocked" : "Unlock premium resources"}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setOfflineMode((prev) => !prev)}
                  >
                    {offlineMode ? "Go online" : "Open offline mode"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f77f00]">Offline behavior</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Notes and audio stay usable beyond the stream</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Low-data optimized</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Episode notes remain readable offline even if video playback is unavailable.
                  </div>
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Audio downloads give users a lighter replay path for weak networks or travel use.
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setAudioDownloaded((prev) => !prev)}
                  >
                    <Download className="mr-2 h-4 w-4 text-[#03cd8c]" />
                    {audioDownloaded ? "Audio download available offline" : "Queue audio download"}
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
