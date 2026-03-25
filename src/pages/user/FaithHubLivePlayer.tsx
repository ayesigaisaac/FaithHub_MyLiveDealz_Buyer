// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AudioLines,
  BadgeCheck,
  Bell,
  Captions,
  CheckCircle2,
  ChevronRight,
  Clapperboard,
  Flag,
  Globe2,
  HeartHandshake,
  Languages,
  MessageSquare,
  Mic2,
  PlayCircle,
  Save,
  Sparkles,
  Ticket,
  Users,
  Volume2,
  Wifi,
  WifiLow,
  WifiOff,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const chatMessages = [
  { user: "Naomi", badge: "Member", text: "The live captions are very clear tonight.", supporter: true },
  { user: "Aisha", badge: "Moderator", text: "Prayer requests are open in the sidebar queue.", supporter: false },
  { user: "David", badge: "Supporter", text: "Saved a clip marker at the prayer moment.", supporter: true },
  { user: "Miriam", badge: "Guest", text: "Joining from Nairobi. Translation helps a lot.", supporter: false },
];

const aiHighlights = [
  "Key takeaway: wisdom is practiced daily, not only discussed.",
  "Strong audience response during the guided prayer segment.",
  "Recommended clip moment at 23:10 for sharing later.",
  "Suggested next action: open the study guide after this replay.",
];

const qaQueue = [
  { question: "How can youth apply this teaching practically during the week?", tier: "Member-only queue" },
  { question: "Will the study guide be released tonight?", tier: "Priority Q&A" },
  { question: "Can this clip be saved into our family study playlist?", tier: "Supporter lane" },
];

function SectionHeader({ title, subtitle, action = "See all", inverse = false }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className={`text-lg font-semibold sm:text-xl ${inverse ? "text-white" : "text-slate-900"}`}>{title}</div>
      </div>
      <Button variant="ghost" className={`shrink-0 rounded-full ${inverse ? "text-white" : "text-[#03cd8c]"}`}>
        {action}
      </Button>
    </div>
  );
}

export default function FaithHubLivePlayer() {
  const [quality, setQuality] = useState("Auto 720p");
  const [captions, setCaptions] = useState(true);
  const [translation, setTranslation] = useState("Off");
  const [lowLatency, setLowLatency] = useState(true);
  const [audioOnly, setAudioOnly] = useState(false);
  const [networkState, setNetworkState] = useState("Stable");
  const [subscriberBadges, setSubscriberBadges] = useState(true);
  const [memberQueue, setMemberQueue] = useState(true);
  const [aiPanelOpen, setAiPanelOpen] = useState(true);

  const connectionIcon = useMemo(() => {
    if (networkState === "Offline") return WifiOff;
    if (networkState === "Low") return WifiLow;
    return Wifi;
  }, [networkState]);

  const ConnectionIcon = connectionIcon;

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="w-full max-w-none px-4 py-3 sm:px-6 lg:px-6 xl:px-7">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-3 flex min-h-[64px] flex-wrap items-center justify-between gap-2.5 rounded-[24px] px-4 py-2"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <PlayCircle className="h-4 w-4" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-base font-semibold sm:text-lg">Live Player</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] font-medium text-slate-600 md:flex">
              <ConnectionIcon className={`h-4 w-4 ${networkState === "Stable" ? "text-[#03cd8c]" : networkState === "Low" ? "text-[#f77f00]" : "text-rose-500"}`} />
              {networkState === "Stable" ? "Stable connection" : networkState === "Low" ? "Lower bitrate recommended" : "Reconnect in progress"}
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_304px] xl:gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.34, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-hero-card relative overflow-hidden rounded-[30px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_22px_66px_-30px_rgba(3,205,140,0.45)]">
              <CardContent className="p-4 sm:p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Live playback experience</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Chat, captions, translation, clips</Badge>
                    <Badge className="rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/10">
                      LIVE NOW
                    </Badge>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                    <div className="space-y-3">
                      <div className="aspect-video overflow-hidden rounded-[22px] border border-white/20 bg-slate-950/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                        <div className="relative h-full w-full bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.22),transparent_38%),linear-gradient(160deg,#111827_0%,#0b1220_70%,#0f172a_100%)]">
                          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-rose-300/35 bg-rose-500/20 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-rose-100">
                            <span className="h-2 w-2 rounded-full bg-rose-300" />
                            LIVE NOW
                          </div>
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3.5">
                            <div className="flex items-end justify-between gap-3">
                              <div>
                                <div className="text-base font-semibold text-white">Youth Impact Night</div>
                                <div className="mt-1 text-xs text-slate-200">1,245 watching now</div>
                              </div>
                              <Button uiSize="sm" className="rounded-xl bg-[#03cd8c] px-3 text-white hover:bg-[#02b67c]">
                                <PlayCircle className="mr-1.5 h-4 w-4" /> Play
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-2 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white/90">
                          <div className="text-xs text-white/70">Connection</div>
                          <div className="mt-1 font-semibold">Stable</div>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white/90">
                          <div className="text-xs text-white/70">Quality</div>
                          <div className="mt-1 font-semibold">{quality}</div>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white/90">
                          <div className="text-xs text-white/70">Latency</div>
                          <div className="mt-1 font-semibold">{lowLatency ? "Low" : "Standard"}</div>
                        </div>
                      </div>

                      <div className="fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                          <MessageSquare className="mr-2 h-4 w-4" /> Open chat
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setAudioOnly((prev) => !prev)}
                        >
                          <Volume2 className="mr-2 h-4 w-4" />
                          {audioOnly ? "Audio-only on" : "Audio only"}
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/15 bg-white/12 p-3.5 backdrop-blur">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
                        Live context
                      </div>
                      <div className="space-y-2 text-sm text-white/90">
                        <div className="flex items-center justify-between"><span>Event</span><span>Youth Impact Night</span></div>
                        <div className="flex items-center justify-between"><span>Viewers</span><span>1,245</span></div>
                        <div className="flex items-center justify-between"><span>Translation</span><span>{translation}</span></div>
                        <div className="flex items-center justify-between"><span>Captions</span><span>{captions ? "On" : "Off"}</span></div>
                      </div>
                      <div className="mt-3 fh-actions-grid">
                        <Button
                          variant="outline"
                          className="rounded-xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setLowLatency((prev) => !prev)}
                        >
                          {lowLatency ? "Low latency on" : "Enable low latency"}
                        </Button>
                        <Button variant="outline" className="rounded-xl border-white/25 bg-white/10 text-white hover:bg-white/15">
                          <Clapperboard className="mr-2 h-4 w-4" /> Studio handoff
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.34, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Player and controls"
                  subtitle="Core playback, accessibility, reporting, and giving actions."
                />

                <div className="space-y-4">
                  <div className="fh-subcard rounded-[28px] p-4">
                    <div className="mb-4 aspect-video overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
                      <div className="relative h-full w-full bg-[radial-gradient(circle_at_top,rgba(3,205,140,0.12),transparent_42%),linear-gradient(160deg,#f8fafc_0%,#e8eef5_100%)]">
                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Player canvas
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/55 to-transparent p-3.5">
                          <div className="flex items-center justify-between gap-3 text-white">
                            <div>
                              <div className="text-sm font-semibold">Youth Impact Night</div>
                              <div className="text-xs text-white/85">Live playback controls active</div>
                            </div>
                            <Button uiSize="sm" className="rounded-xl bg-[#03cd8c] text-white hover:bg-[#02b67c]">
                              <PlayCircle className="mr-1.5 h-4 w-4" /> Watch
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
                      <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-700 outline-none focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                      >
                        <option>Auto 720p</option>
                        <option>1080p</option>
                        <option>480p</option>
                        <option>240p</option>
                      </select>

                      <button
                        onClick={() => setCaptions((prev) => !prev)}
                        className={`h-12 rounded-2xl border text-sm font-semibold transition ${
                          captions ? "border-[#03cd8c]/20 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35"
                        }`}
                      >
                        <Captions className="mr-2 inline h-4 w-4 text-[#03cd8c]" />
                        Captions {captions ? "On" : "Off"}
                      </button>

                      <select
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        className="h-12 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-700 outline-none focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                      >
                        <option>Off</option>
                        <option>French</option>
                        <option>Swahili</option>
                        <option>Arabic</option>
                      </select>

                      <button
                        onClick={() => setLowLatency((prev) => !prev)}
                        className={`h-12 rounded-2xl border text-sm font-semibold transition ${
                          lowLatency ? "border-[#03cd8c]/20 bg-[#ecfff8] text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35"
                        }`}
                      >
                        <Zap className="mr-2 inline h-4 w-4 text-[#03cd8c]" />
                        {lowLatency ? "Low-latency on" : "Low-latency off"}
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                        <HeartHandshake className="mr-2 h-4 w-4" /> Donate
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <Save className="mr-2 h-4 w-4 text-[#03cd8c]" /> Save moment
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <Flag className="mr-2 h-4 w-4 text-[#03cd8c]" /> Report
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => setAudioOnly((prev) => !prev)}
                      >
                        <Volume2 className="mr-2 h-4 w-4 text-[#03cd8c]" />
                        {audioOnly ? "Audio-only on" : "Audio only"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <MessageSquare className="h-4 w-4 text-[#03cd8c]" /> Live chat
                      </div>
                      <div className="space-y-3">
                        {chatMessages.map((message) => (
                          <div key={`${message.user}-${message.text}`} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                            <div className="mb-1 flex items-center gap-2">
                              <div className="text-sm font-semibold text-slate-900">{message.user}</div>
                              {subscriberBadges && (
                                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${message.supporter ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-slate-100 text-slate-600"}`}>
                                  {message.badge}
                                </span>
                              )}
                            </div>
                            <div className="fh-body-tight text-slate-600">{message.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <BadgeCheck className="h-4 w-4 text-[#03cd8c]" /> Member-only Q&A queue
                      </div>
                      <div className="space-y-3">
                        {qaQueue.map((item) => (
                          <div key={item.question} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                            <div className="mb-1 text-sm font-semibold text-slate-900">{item.question}</div>
                            <div className="text-xs text-slate-500">{memberQueue ? item.tier : "Preview only while member queue is disabled"}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Button
                          variant="outline"
                          className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                          onClick={() => setSubscriberBadges((prev) => !prev)}
                        >
                          {subscriberBadges ? "Hide badges" : "Show badges"}
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                          onClick={() => setMemberQueue((prev) => !prev)}
                        >
                          {memberQueue ? "Member queue on" : "Member queue off"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.32, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="p-4">
                <SectionHeader
                  title="AI highlights and takeaways"
                  subtitle="Subscriber-grade summary intelligence during live or replay playback."
                  action="Expand"
                  inverse
                />
                <div className="space-y-3">
                  <div className="fh-scroll-region max-h-[400px] space-y-2.5 overflow-y-auto pr-1">
                    {aiPanelOpen ? (
                      aiHighlights.map((item) => (
                        <div key={item} className="rounded-[20px] border border-white/10 bg-white/5 p-3.5 text-sm text-white/80 backdrop-blur">
                          <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                            <Sparkles className="h-4 w-4 text-[#8ef0ca]" /> AI highlight
                          </div>
                          {item}
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[20px] border border-white/10 bg-white/5 p-3.5 text-sm text-white/75 backdrop-blur">
                        AI highlights are collapsed. Open them again for live or post-session takeaways.
                      </div>
                    )}
                  </div>
                  <Button
                    uiSize="sm"
                    className="w-full rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
                    onClick={() => setAiPanelOpen((prev) => !prev)}
                  >
                    {aiPanelOpen ? "Hide AI highlights" : "Show AI highlights"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.32, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="hidden text-[#f77f00]">Premium engagement</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Badges, member lanes, and ticket validation</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Monetized live layer</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-warm rounded-[24px] p-4">
                    Paid membership badges can visually identify supporters and subscribers in chat without disrupting the main stream experience.
                  </div>
                  <div className="fh-subcard-warm rounded-[24px] p-4">
                    Ticket validation and member-only Q&A lanes help support more structured premium or event-based live experiences.
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.32, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="p-4">
                <SectionHeader
                  title="Auto-retry and fallback"
                  subtitle="The live player should keep serving the user even when the connection weakens."
                  action="Diagnostics"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    If the connection drops, the player should auto-retry, reduce bitrate, and preserve the current state where possible.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Users should be able to switch into audio-only mode at any time without leaving the session.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Stable", icon: Wifi },
                      { label: "Low", icon: WifiLow },
                      { label: "Offline", icon: WifiOff },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => setNetworkState(item.label)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                            networkState === item.label
                              ? "border-[#03cd8c]/20 bg-[#ecfff8] text-slate-900"
                              : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35"
                          }`}
                        >
                          <Icon className="mr-2 inline h-4 w-4 text-[#03cd8c]" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




