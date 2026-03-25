// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Clapperboard,
  Globe2,
  KeyRound,
  Link2,
  PlayCircle,
  RadioTower,
  Save,
  Scissors,
  Share2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const platforms = [
  {
    name: "FaithHub Native",
    connected: true,
    profile: "Primary program route",
    broadcastId: "fh_native_928441",
    bitrate: "Adaptive internal ladder",
  },
  {
    name: "YouTube Live",
    connected: true,
    profile: "1080p / main audience",
    broadcastId: "yt_live_238914",
    bitrate: "6 Mbps target",
  },
  {
    name: "Facebook Live",
    connected: true,
    profile: "720p / social reach",
    broadcastId: "fb_live_824501",
    bitrate: "4 Mbps target",
  },
  {
    name: "TikTok Live",
    connected: false,
    profile: "Not linked",
    broadcastId: "-",
    bitrate: "Pending",
  },
  {
    name: "Instagram Live",
    connected: false,
    profile: "Not linked",
    broadcastId: "-",
    bitrate: "Pending",
  },
];

const bitrateProfiles = [
  {
    name: "High reach 1080p",
    detail: "Higher bitrate for flagship channels and primary event streams.",
  },
  {
    name: "Balanced social 720p",
    detail: "Optimized for stable distribution with lighter network demand.",
  },
  {
    name: "Low-bandwidth fallback",
    detail: "Safety profile for fragile connections or secondary destinations.",
  },
];

const clipPackages = [
  "Auto-create short highlight clips from marked moments",
  "Cross-post clips to connected social destinations after review",
  "Generate branded vertical and square variants for each approved clip",
];

export default function FaithHubStreamToPlatforms() {
  const [offlineMode, setOfflineMode] = useState(true);
  const [scheduledBroadcasts, setScheduledBroadcasts] = useState(true);
  const [premiumDistribution, setPremiumDistribution] = useState(true);
  const [autoClipping, setAutoClipping] = useState(true);
  const [crossPosting, setCrossPosting] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState("Balanced social 720p");

  const connectedCount = useMemo(
    () => platforms.filter((p) => p.connected).length,
    []
  );

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
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Stream-to-Platforms</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "View-only connection state" : `${connectedCount} destinations connected`}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
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
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <div className="mb-4">
                  <div className="hidden text-[#8ef0ca]">Distribution posture</div>
                  <div className="mt-2 text-xl font-semibold">Connect, map, and broadcast outward</div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setScheduledBroadcasts((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${scheduledBroadcasts ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Clapperboard className="h-4 w-4 text-[#8ef0ca]" /> Scheduled broadcasts
                    </div>
                    <div className="text-sm text-white/75">{scheduledBroadcasts ? "Pre-create destination broadcasts before go-live." : "Manual live destination start only."}</div>
                  </button>
                  <button
                    onClick={() => setPremiumDistribution((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${premiumDistribution ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <ShieldCheck className="h-4 w-4 text-[#8ef0ca]" /> Premium distribution pack
                    </div>
                    <div className="text-sm text-white/75">{premiumDistribution ? "Advanced routing, clipping, and cross-posting pack is enabled." : "Standard simulcast only."}</div>
                  </button>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-white/80">Bitrate profile</span>
                    <select
                      value={selectedProfile}
                      onChange={(e) => setSelectedProfile(e.target.value)}
                      className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none"
                    >
                      {bitrateProfiles.map((profile) => (
                        <option key={profile.name} className="text-slate-900">{profile.name}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4">
                  <div className="text-lg font-semibold text-slate-900">Per-destination profiles</div>
                  <div className="text-sm text-slate-500">Tune delivery quality based on platform behavior.</div>
                </div>
                <div className="space-y-3">
                  {bitrateProfiles.map((profile) => (
                    <div key={profile.name} className={`rounded-[24px] border p-4 ${selectedProfile === profile.name ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}>
                      <div className="text-sm font-semibold text-slate-900">{profile.name}</div>
                      <div className="mt-1 text-sm text-slate-600">{profile.detail}</div>
                    </div>
                  ))}
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
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Destination management</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Credentials, broadcasts, RTMP targets, clipping</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Multi-platform distribution</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Push the same faith broadcast everywhere it matters without losing control of quality or identity.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Connect platforms, store destination credentials, assign RTMP targets, create scheduled broadcasts, and turn premium clipping packages into a repeatable provider workflow.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Connected destinations</div>
                      <div className="mb-3 text-4xl font-semibold text-white">{connectedCount}</div>
                      <div className="h-2 rounded-full bg-white/20">
                        <div className="h-2 rounded-full bg-white" style={{ width: `${(connectedCount / platforms.length) * 100}%` }} />
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90" disabled={offlineMode}>
                          Connect new
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineMode((prev) => !prev)}
                        >
                          {offlineMode ? "Go online" : "View offline"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Connected platforms</div>
                    <div className="text-sm text-slate-500">Map credentials, broadcast IDs, and output profiles.</div>
                  </div>
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c] hover:bg-[#ecfff8]">
                    <Link2 className="mr-1 h-3.5 w-3.5" /> Routing map
                  </Badge>
                </div>
                <div className="space-y-3">
                  {platforms.map((platform) => (
                    <div key={platform.name} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{platform.name}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${platform.connected ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-slate-100 text-slate-700"}`}>
                          {platform.connected ? "Connected" : "Not connected"}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{platform.profile}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{platform.broadcastId}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{platform.bitrate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Scheduled broadcast creation</div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="fh-subcard-muted rounded-[24px] p-4">
                      Pre-create destination broadcasts so titles, privacy, thumbnails, and timing align before going live.
                    </div>
                    <div className="fh-subcard-muted rounded-[24px] p-4">
                      Store per-platform broadcast references and reuse them for repeat series episodes or recurring events.
                    </div>
                    <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                      <PlayCircle className="mr-2 h-4 w-4" /> Create scheduled broadcasts
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Premium cross-posting packages</div>
                  <div className="space-y-3">
                    <button
                      onClick={() => setAutoClipping((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${autoClipping ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Scissors className="h-4 w-4 text-[#03cd8c]" /> Automated clipping
                      </div>
                      <div className="text-sm text-slate-600">{autoClipping ? "Smart clip generation is enabled for approved moments." : "Clip generation is disabled."}</div>
                    </button>
                    <button
                      onClick={() => setCrossPosting((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${crossPosting ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <UploadCloud className="h-4 w-4 text-[#03cd8c]" /> Cross-posting package
                      </div>
                      <div className="text-sm text-slate-600">{crossPosting ? "Approved clips can be repackaged and distributed across destinations." : "Cross-posting is disabled."}</div>
                    </button>
                    <div className="space-y-2">
                      {clipPackages.map((item) => (
                        <div key={item} className="fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                          {item}
                        </div>
                      ))}
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



