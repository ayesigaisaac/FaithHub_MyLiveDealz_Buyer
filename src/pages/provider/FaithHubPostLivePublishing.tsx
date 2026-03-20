// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Captions,
  CheckCircle2,
  ChevronRight,
  Clapperboard,
  FileSearch,
  FileText,
  Globe2,
  Highlighter,
  Layers3,
  Link2,
  PlayCircle,
  Save,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const replayAssets = [
  { name: "Replay video", type: "Primary asset", state: "Ready" },
  { name: "Audio extraction", type: "Fallback asset", state: "Ready" },
  { name: "Transcript", type: "Text asset", state: "Processing" },
  { name: "Session notes", type: "Support resource", state: "Attached" },
];

const chapters = [
  { time: "00:00", label: "Opening reflection" },
  { time: "05:18", label: "Scripture reading" },
  { time: "13:44", label: "Main teaching movement" },
  { time: "26:02", label: "Prayer and response" },
  { time: "38:15", label: "Closing CTA" },
];

const clipJobs = [
  { title: "Prayer response moment", destination: "FaithHub + social cutdown", state: "Queued" },
  { title: "Main teaching highlight", destination: "Replay highlights shelf", state: "Ready" },
  { title: "Closing challenge short", destination: "Scheduled repost", state: "Draft" },
];

const highlights = [
  "Generate chapter labels automatically from transcript and event markers.",
  "Search within transcript for scripture, key quotes, and action prompts.",
  "Create highlight candidates from saved moments and audience engagement spikes.",
  "Package clips for replay shelves and future repost schedules.",
];

export default function FaithHubPostLivePublishing() {
  const [offlineDraft, setOfflineDraft] = useState(true);
  const [replayVisibility, setReplayVisibility] = useState("Followers only");
  const [publishToEpisode, setPublishToEpisode] = useState(true);
  const [autoChapters, setAutoChapters] = useState(true);
  const [transcriptSearch, setTranscriptSearch] = useState(true);
  const [highlightGenerator, setHighlightGenerator] = useState(true);
  const [advancedClipEditor, setAdvancedClipEditor] = useState(true);
  const [scheduledReposts, setScheduledReposts] = useState(true);
  const [transcriptQuery, setTranscriptQuery] = useState("wisdom");

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
              <PlayCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Post-live Publishing</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineDraft ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineDraft ? "Replay drafts stored locally" : "Publishing sync active"}
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Replay and clip publishing</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Chapters, transcripts, highlights, reposts</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Turn a live broadcast into durable content</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Publish the replay, shape the transcript, attach resources, and turn moments into reusable assets.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Post-live Publishing gives providers a polished flow for replay visibility, note and resource attachment, episode linking, auto-chapters, transcript search, and premium editing tools for clips and repost schedules.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Replay state</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Visibility</div>
                        <div className="mt-1 text-2xl font-semibold text-white">{replayVisibility}</div>
                        <div className="mt-2 text-sm text-white/80">Linked to episode: {publishToEpisode ? "Yes" : "No"}</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Publish replay</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineDraft((prev) => !prev)}
                        >
                          {offlineDraft ? "Draft mode" : "Sync live"}
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
                  title="Replay visibility and assets"
                  subtitle="Set visibility, attach resources, and connect the replay into the right content lane."
                />
                <div className="grid gap-4 lg:grid-cols-[0.46fr_0.54fr]">
                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Visibility and linking</div>
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Replay visibility</span>
                        <select
                          value={replayVisibility}
                          onChange={(e) => setReplayVisibility(e.target.value)}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]"
                        >
                          <option>Public</option>
                          <option>Followers only</option>
                          <option>Members only</option>
                        </select>
                      </label>
                      <button
                        onClick={() => setPublishToEpisode((prev) => !prev)}
                        className={`w-full rounded-[24px] border p-4 text-left transition ${publishToEpisode ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                      >
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <Link2 className="h-4 w-4 text-[#03cd8c]" /> Add replay to series episode
                        </div>
                        <div className="text-sm text-slate-600">{publishToEpisode ? "Replay will attach directly to the selected episode." : "Replay remains standalone for now."}</div>
                      </button>
                    </div>
                  </div>

                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Assets and resources</div>
                    <div className="space-y-3">
                      {replayAssets.map((asset) => (
                        <div key={asset.name} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{asset.name}</div>
                            <div className="text-xs text-slate-500">{asset.type}</div>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${asset.state === "Ready" || asset.state === "Attached" ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                            {asset.state}
                          </span>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <Upload className="mr-2 h-4 w-4 text-[#03cd8c]" /> Attach more resources
                      </Button>
                    </div>
                  </div>
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
                  title="Chapters and transcript intelligence"
                  subtitle="Speed up replay usability with search and structure."
                  action="Review"
                />
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <button
                      onClick={() => setAutoChapters((prev) => !prev)}
                      className={`rounded-[24px] border p-4 text-left transition ${autoChapters ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Captions className="h-4 w-4 text-[#8ef0ca]" /> Auto-chapters
                      </div>
                      <div className="text-sm text-white/75">{autoChapters ? "Enabled" : "Off"}</div>
                    </button>
                    <button
                      onClick={() => setTranscriptSearch((prev) => !prev)}
                      className={`rounded-[24px] border p-4 text-left transition ${transcriptSearch ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Search className="h-4 w-4 text-[#8ef0ca]" /> Transcript search
                      </div>
                      <div className="text-sm text-white/75">{transcriptSearch ? "Enabled" : "Off"}</div>
                    </button>
                    <button
                      onClick={() => setHighlightGenerator((prev) => !prev)}
                      className={`rounded-[24px] border p-4 text-left transition ${highlightGenerator ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                        <Highlighter className="h-4 w-4 text-[#8ef0ca]" /> Highlights
                      </div>
                      <div className="text-sm text-white/75">{highlightGenerator ? "Enabled" : "Off"}</div>
                    </button>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-3 text-sm font-semibold text-white">Auto-generated chapters</div>
                    <div className="space-y-3">
                      {chapters.map((chapter) => (
                        <div key={chapter.time} className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-sm text-white/85">
                          <div className="font-semibold text-white">{chapter.time}</div>
                          <div className="mt-1">{chapter.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-3 text-sm font-semibold text-white">Transcript search</div>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                      <input
                        value={transcriptQuery}
                        onChange={(e) => setTranscriptQuery(e.target.value)}
                        placeholder="Search transcript"
                        className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/60 outline-none"
                      />
                    </div>
                    <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/20 p-4 text-sm text-white/80">
                      Search term {transcriptQuery} appears in 6 transcript moments and 2 chapter labels.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Clip publishing"
                  subtitle="Move moments from replay into clips, shelves, and repost flows."
                  action="Queue"
                />
                <div className="space-y-3">
                  {clipJobs.map((job) => (
                    <div key={job.title} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-1 text-sm font-semibold text-slate-900">{job.title}</div>
                      <div className="text-xs text-slate-500">{job.destination}</div>
                      <div className="mt-2 inline-flex rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold text-[#03cd8c]">
                        {job.state}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Premium replay tools</div>
                    <div className="text-sm text-slate-500">Advanced editing and scheduled reposting for higher-value publishing workflows.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Premium</Badge>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setAdvancedClipEditor((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${advancedClipEditor ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Scissors className="h-4 w-4 text-[#03cd8c]" /> Advanced clip editor
                    </div>
                    <div className="text-sm text-slate-600">{advancedClipEditor ? "Trim, reframe, caption, and package clips with more control." : "Basic clip generation only."}</div>
                  </button>
                  <button
                    onClick={() => setScheduledReposts((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${scheduledReposts ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Layers3 className="h-4 w-4 text-[#03cd8c]" /> Scheduled reposting
                    </div>
                    <div className="text-sm text-slate-600">{scheduledReposts ? "Approved clips can be scheduled for future republication." : "Manual reposting only."}</div>
                  </button>
                  <div className="space-y-2">
                    {highlights.map((item) => (
                      <div key={item} className="fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                    <Save className="mr-2 h-4 w-4" /> Save publishing draft
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




