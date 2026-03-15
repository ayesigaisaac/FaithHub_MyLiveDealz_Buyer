// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AudioLines,
  Bell,
  Bookmark,
  Captions,
  ChevronRight,
  Clock3,
  Download,
  FileSearch,
  FileText,
  Highlighter,
  Languages,
  PlayCircle,
  Search,
  Share2,
  Sparkles,
  Timer,
  Volume2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const chapters = [
  { title: "Opening prayer", time: "00:00" },
  { title: "The core teaching", time: "05:14" },
  { title: "How wisdom becomes daily practice", time: "14:42" },
  { title: "Family application", time: "27:05" },
  { title: "Closing prayer and next steps", time: "39:18" },
];

const transcriptBlocks = [
  {
    time: "00:42",
    speaker: "Rev. Naomi",
    text: "Wisdom is not only what we know, it is what we repeatedly choose in public and in private.",
  },
  {
    time: "06:10",
    speaker: "Rev. Naomi",
    text: "The heart becomes steady when our daily patterns align with the truth we claim to follow.",
  },
  {
    time: "15:58",
    speaker: "Rev. Naomi",
    text: "Faith communities grow stronger when wisdom becomes visible in family decisions, not only in public speech.",
  },
  {
    time: "29:10",
    speaker: "Rev. Naomi",
    text: "Parents, youth leaders, and mentors all carry this teaching differently, but the principle is shared.",
  },
  {
    time: "40:05",
    speaker: "Rev. Naomi",
    text: "Take one action tonight, write it down, and let that become your first act of obedience.",
  },
];

const clips = [
  { title: "Wisdom becomes daily practice", range: "14:42  18:10" },
  { title: "Family application highlight", range: "27:05  30:12" },
  { title: "Closing prayer takeaway", range: "39:18  41:02" },
];

const notes = [
  "Key idea: wisdom must move from inspiration into routine.",
  "Family conversations are one of the strongest places to apply tonights message.",
  "Replay pairs well with the Walking in Wisdom reading plan and episode worksheet.",
];

export default function FaithHubReplaySermonPlayer() {
  const [search, setSearch] = useState("wisdom");
  const [captionsOn, setCaptionsOn] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.25x");
  const [offlineMode, setOfflineMode] = useState(false);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [audioDownloaded, setAudioDownloaded] = useState(true);
  const [videoDownloads, setVideoDownloads] = useState(false);
  const [showTranscriptOnlyMatches, setShowTranscriptOnlyMatches] = useState(false);

  const transcriptView = useMemo(() => {
    if (!search.trim()) return transcriptBlocks;
    return transcriptBlocks.filter((item) => item.text.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const visibleTranscript = showTranscriptOnlyMatches ? transcriptView : transcriptBlocks;

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
              <div className="fh-eyebrow text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Replay & Sermon Player</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Cached downloads available" : "Replay ready"}
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
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Replay-first learning</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Chapters, transcript, notes, downloads</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.66fr_0.34fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Walking in Wisdom  Episode Replay</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Replay sermons with structure, searchable understanding, and premium learning depth when needed.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        FaithHub treats replay as more than video-on-demand. Users can navigate chapters, search transcript text, highlight notes, adjust speed, download audio, and unlock offline video or study guides where supported.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Timer className="h-4 w-4" /> 43 min replay
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Captions className="h-4 w-4" /> Transcript available
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <AudioLines className="h-4 w-4" /> Audio download ready
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-4 h-40 rounded-[22px] bg-white/20" />
                      <div className="mb-3 text-sm font-semibold text-white">Quick controls</div>
                      <div className="space-y-2 text-sm text-white/85">
                        <div className="flex items-center justify-between"><span>Speed</span><span>{playbackSpeed}</span></div>
                        <div className="flex items-center justify-between"><span>Captions</span><span>{captionsOn ? "On" : "Off"}</span></div>
                        <div className="flex items-center justify-between"><span>Audio download</span><span>{audioDownloaded ? "Ready" : "Not queued"}</span></div>
                        <div className="flex items-center justify-between"><span>Offline video</span><span>{videoDownloads ? "Available" : "Premium"}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Replay controls"
                  subtitle="Move fluidly between playback, notes, clips, and download actions."
                />
                <div className="space-y-4">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 h-[360px] rounded-[24px] bg-gradient-to-br from-slate-100 to-slate-200" />
                    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
                      <select
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-700 outline-none focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                      >
                        <option>0.75x</option>
                        <option>1.0x</option>
                        <option>1.25x</option>
                        <option>1.5x</option>
                        <option>2.0x</option>
                      </select>

                      <button
                        onClick={() => setCaptionsOn((prev) => !prev)}
                        className={`h-12 rounded-2xl border text-sm font-semibold transition ${
                          captionsOn ? "border-[#03cd8c]/20 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35"
                        }`}
                      >
                        <Captions className="mr-2 inline h-4 w-4 text-[#03cd8c]" />
                        Captions {captionsOn ? "On" : "Off"}
                      </button>

                      <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <Share2 className="mr-2 h-4 w-4 text-[#03cd8c]" /> Share clip
                      </Button>

                      <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <Bookmark className="mr-2 h-4 w-4 text-[#03cd8c]" /> Save replay
                      </Button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      <Button
                        className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
                        onClick={() => setAudioDownloaded((prev) => !prev)}
                      >
                        <Volume2 className="mr-2 h-4 w-4" />
                        {audioDownloaded ? "Audio downloaded" : "Download audio"}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => setVideoDownloads((prev) => !prev)}
                      >
                        <Download className="mr-2 h-4 w-4 text-[#03cd8c]" />
                        {videoDownloads ? "Offline video ready" : "Enable video offline"}
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => setOfflineMode((prev) => !prev)}
                      >
                        {offlineMode ? "Online mode" : "Offline mode"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 text-sm font-semibold text-slate-900">Chapters</div>
                      <div className="space-y-3">
                        {chapters.map((item) => (
                          <div key={item.time} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] px-4 py-3">
                            <div className="text-sm text-slate-700">{item.title}</div>
                            <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">{item.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-900">Transcript</div>
                        <Button
                          variant="ghost"
                          className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]"
                          onClick={() => setShowTranscriptOnlyMatches((prev) => !prev)}
                        >
                          {showTranscriptOnlyMatches ? "Show full transcript" : "Show matches only"}
                        </Button>
                      </div>

                      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3">
                        <Search className="h-4 w-4 text-[#03cd8c]" />
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search transcript"
                          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                      </div>

                      <div className="space-y-3 max-h-[380px] overflow-auto pr-1">
                        {visibleTranscript.map((item) => {
                          const highlighted = search && item.text.toLowerCase().includes(search.toLowerCase());
                          return (
                            <div
                              key={`${item.time}-${item.text}`}
                              className={`rounded-2xl border p-4 ${highlighted ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-100 bg-[#f8fafc]"}`}
                            >
                              <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                                <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">{item.time}</span>
                                <span>{item.speaker}</span>
                              </div>
                              <div className="fh-body-tight text-slate-700">{item.text}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
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
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Searchable understanding"
                  subtitle="Transcript search and highlight notes help replay become study, not just playback."
                  action="Open note set"
                />
                <div className="space-y-3">
                  {notes.map((item) => (
                    <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                        <Highlighter className="h-4 w-4 text-[#8ef0ca]" /> Highlight note
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="fh-eyebrow text-[#f77f00]">Premium study layer</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Offline video and premium study guide</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setPremiumUnlocked((prev) => !prev)}
                  >
                    {premiumUnlocked ? "Premium preview on" : "Preview premium"}
                  </Button>
                </div>
                {!premiumUnlocked ? (
                  <div className="rounded-[28px] border border-dashed border-[#f77f00]/25 bg-white p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="mb-2 text-lg font-semibold text-slate-900">Premium replay extensions</div>
                    <div className="mx-auto max-w-md fh-body-tight text-slate-600">
                      Institutions can optionally unlock offline video downloads and a premium study guide for subscribers or members.
                    </div>
                    <div className="mt-5 flex justify-center gap-2">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Unlock study guide</Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">View benefits</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-[24px] border border-[#03cd8c]/15 bg-[#ecfff8] p-4 text-sm text-slate-700">
                      Premium replay video is now available for offline travel and low-connectivity environments.
                    </div>
                    <div className="rounded-[24px] border border-[#03cd8c]/15 bg-[#ecfff8] p-4 text-sm text-slate-700">
                      Study guide includes reflection questions, group prompts, scripture links, and action steps.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Clip sharing and cache state"
                  subtitle="Prepare short-form clip moments while keeping downloads organized."
                  action="Clip tools"
                />
                <div className="space-y-3">
                  {clips.map((item) => (
                    <div key={item.title} className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.range}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                    </div>
                  ))}

                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">
                    Cached downloads remain available offline. If sponsor mid-roll is enabled for compliant surfaces, it must stay clearly labeled and non-disruptive to the sermon experience.
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




