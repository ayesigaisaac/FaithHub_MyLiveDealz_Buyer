// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Captions,
  ChevronRight,
  Clapperboard,
  Copy,
  Flag,
  Globe2,
  ImagePlus,
  Link2,
  Lock,
  PlayCircle,
  Share2,
  Sparkles,
  Star,
  Tag,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const shareTargets = [
  { name: "FaithHub chat", tone: "bg-[#ecfff8] text-[#03cd8c] border-[#03cd8c]/15" },
  { name: "Status card", tone: "bg-slate-100 text-slate-700 border-slate-200" },
  { name: "Story export", tone: "bg-slate-100 text-slate-700 border-slate-200" },
  { name: "WhatsApp", tone: "bg-slate-100 text-slate-700 border-slate-200" },
  { name: "Telegram", tone: "bg-slate-100 text-slate-700 border-slate-200" },
  { name: "Copy deep link", tone: "bg-slate-100 text-slate-700 border-slate-200" },
];

const captionStyles = [
  { title: "Minimal burn-in", subtitle: "Simple social-safe subtitle strip" },
  { title: "Highlight quote", subtitle: "Emphasize one key line for virality" },
  { title: "Full accessibility", subtitle: "Readable caption blocks for silent viewers" },
];

const referralCards = [
  { title: "Watch full replay", subtitle: "Open the full sermon and continue from this moment" },
  { title: "Open series", subtitle: "See the full teaching journey surrounding this clip" },
  { title: "Unlock subscription", subtitle: "Access extended resources and protected content" },
];

export default function FaithHubClipViewer() {
  const [offlineMode, setOfflineMode] = useState(false);
  const [captionBurnIn, setCaptionBurnIn] = useState(true);
  const [watermarkControl, setWatermarkControl] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("Minimal burn-in");
  const [verifiedInstitutionMode, setVerifiedInstitutionMode] = useState(true);

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
              <Clapperboard className="h-5 w-5" />
            </div>
            <div>
              <div className="fh-eyebrow text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Clip Viewer</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Metadata cached only
              </div>
            )}
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
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Short-form clip experience</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Share, report, return to replay</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.66fr_0.34fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Family application highlight</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Turn a sermon moment into a clean, shareable clip without losing context, attribution, or trust.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        FaithHub clips help institutions and users share meaningful moments while still offering clear routes back to the full replay, the teaching series, and subscription or study layers.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <PlayCircle className="h-4 w-4" /> 00:38 clip
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Captions className="h-4 w-4" /> Captions supported
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Link2 className="h-4 w-4" /> Deep-linked to replay
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-4 h-40 rounded-[22px] bg-white/20" />
                      <div className="mb-3 text-sm font-semibold text-white">Clip state</div>
                      <div className="space-y-2 text-sm text-white/85">
                        <div className="flex items-center justify-between"><span>Caption burn-in</span><span>{captionBurnIn ? "On" : "Off"}</span></div>
                        <div className="flex items-center justify-between"><span>Watermark control</span><span>{watermarkControl ? "Enabled" : "Default"}</span></div>
                        <div className="flex items-center justify-between"><span>Share path</span><span>Multi-target</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Watch and share"
                  subtitle="The clip should stand on its own, then invite the viewer deeper into the experience."
                />
                <div className="space-y-4">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 h-[360px] rounded-[24px] bg-gradient-to-br from-slate-100 to-slate-200" />
                    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                        <Share2 className="mr-2 h-4 w-4" /> Share clip
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <PlayCircle className="mr-2 h-4 w-4 text-[#03cd8c]" /> Watch full replay
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <Flag className="mr-2 h-4 w-4 text-[#03cd8c]" /> Report clip
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => setOfflineMode((prev) => !prev)}
                      >
                        {offlineMode ? "Online mode" : "Offline cache"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[0.5fr_0.5fr]">
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 text-sm font-semibold text-slate-900">Share targets</div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {shareTargets.map((item) => (
                          <button key={item.name} className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition hover:shadow-sm ${item.tone}`}>
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 text-sm font-semibold text-slate-900">Caption burn-in for social shares</div>
                      <div className="space-y-3">
                        <button
                          onClick={() => setCaptionBurnIn((prev) => !prev)}
                          className={`w-full rounded-2xl border px-4 py-4 text-left transition ${captionBurnIn ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                        >
                          <div className="mb-1 flex items-center gap-2 font-semibold text-slate-900">
                            <Captions className="h-4 w-4 text-[#03cd8c]" /> Auto-caption burn-in
                          </div>
                          <div className="text-sm text-slate-600">{captionBurnIn ? "Enabled so exported clips stay readable in silent-view social contexts." : "Disabled, using metadata-only captions."}</div>
                        </button>

                        <div className="grid gap-2">
                          {captionStyles.map((item) => (
                            <button
                              key={item.title}
                              onClick={() => setSelectedStyle(item.title)}
                              className={`rounded-2xl border px-4 py-3 text-left transition ${selectedStyle === item.title ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                            >
                              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                              <div className="mt-1 text-sm text-slate-600">{item.subtitle}</div>
                            </button>
                          ))}
                        </div>
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
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Referral paths"
                  subtitle="Every clip should point back into the deeper faith journey."
                  action="Customize"
                />
                <div className="space-y-3">
                  {referralCards.map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 text-base font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-white/70">{item.subtitle}</div>
                      <Button className="mt-4 rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                        Open CTA
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="fh-eyebrow text-[#f77f00]">Premium institution controls</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Watermark flexibility for verified institutions</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Premium creator layer</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-warm rounded-[24px] p-4">
                    Verified institutions can receive premium watermark controls for cleaner exports or stronger branded attribution depending on channel strategy.
                  </div>
                  <button
                    onClick={() => setWatermarkControl((prev) => !prev)}
                    disabled={!verifiedInstitutionMode}
                    className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${watermarkControl ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"} ${!verifiedInstitutionMode ? "opacity-60" : ""}`}
                  >
                    <div className="mb-1 flex items-center gap-2 font-semibold text-slate-900">
                      <Tag className="h-4 w-4 text-[#03cd8c]" /> Watermark control
                    </div>
                    <div>{watermarkControl ? "Custom watermark behavior enabled for exports." : "Default institution watermark behavior in use."}</div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Offline state"
                  subtitle="Clip metadata can cache locally even when playback itself needs download support."
                  action="Downloads"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Titles, series context, share targets, and report options remain visible while offline.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Actual playback requires the clip to have been downloaded or cached previously.
                  </div>
                  <div className="fh-subcard-accent rounded-[24px] p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <ImagePlus className="h-4 w-4 text-[#03cd8c]" /> Social-safe metadata package
                    </div>
                    <div className="text-sm text-slate-600">Cached metadata lets users prepare shares and re-open the full replay later without losing context.</div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <Copy className="mr-2 h-4 w-4 text-[#03cd8c]" /> Copy clip link
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#03cd8c]" /> Open full replay
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




