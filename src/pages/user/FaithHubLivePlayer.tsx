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
              <div className="text-lg font-semibold">Live Player</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              <ConnectionIcon className={`h-4 w-4 ${networkState === "Stable" ? "text-[#03cd8c]" : networkState === "Low" ? "text-[#f77f00]" : "text-rose-500"}`} />
              {networkState === "Stable" ? "Stable connection" : networkState === "Low" ? "Lower bitrate recommended" : "Reconnect in progress"}
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Live playback experience</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Chat, captions, translation, clips</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.66fr_0.34fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Youth Impact Night  Live now</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        A full live faith experience with playback control, translation, interaction, moderation, clips, and premium engagement lanes.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        The live player is where FaithHub becomes truly interactive. Users can tune quality, captions, translation, reactions, reporting, donations, membership lanes, and AI-powered highlights while the stream continues in real time.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Zap className="h-4 w-4" />
                          {lowLatency ? "Low-latency mode on" : "Standard latency"}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Users className="h-4 w-4" />
                          3.8k viewers
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Ticket className="h-4 w-4" />
                          Ticket validated
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-4 h-40 rounded-[22px] bg-white/20" />
                      <div className="mb-3 text-sm font-semibold text-white">Quick playback state</div>
                      <div className="space-y-2 text-sm text-white/85">
                        <div className="flex items-center justify-between"><span>Quality</span><span>{quality}</span></div>
                        <div className="flex items-center justify-between"><span>Captions</span><span>{captions ? "On" : "Off"}</span></div>
                        <div className="flex items-center justify-between"><span>Translation</span><span>{translation}</span></div>
                        <div className="flex items-center justify-between"><span>Audio-only</span><span>{audioOnly ? "Enabled" : "Off"}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Player and controls"
                  subtitle="Core playback, accessibility, reporting, and giving actions."
                />

                <div className="space-y-4">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 h-[360px] rounded-[24px] bg-gradient-to-br from-slate-100 to-slate-200" />
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
                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
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

                    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="AI highlights and takeaways"
                  subtitle="Subscriber-grade summary intelligence during live or replay playback."
                  action="Expand"
                />
                <div className="space-y-3">
                  {aiPanelOpen ? (
                    aiHighlights.map((item) => (
                      <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
                        <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                          <Sparkles className="h-4 w-4 text-[#8ef0ca]" /> AI highlight
                        </div>
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/75 backdrop-blur">
                      AI highlights are collapsed. Open them again for live or post-session takeaways.
                    </div>
                  )}
                  <Button
                    className="w-full rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
                    onClick={() => setAiPanelOpen((prev) => !prev)}
                  >
                    {aiPanelOpen ? "Hide AI highlights" : "Show AI highlights"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="fh-eyebrow text-[#f77f00]">Premium engagement</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Badges, member lanes, and ticket validation</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Monetized live layer</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Paid membership badges can visually identify supporters and subscribers in chat without disrupting the main stream experience.
                  </div>
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Ticket validation and member-only Q&A lanes help support more structured premium or event-based live experiences.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Auto-retry and fallback"
                  subtitle="The live player should keep serving the user even when the connection weakens."
                  action="Diagnostics"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                    If the connection drops, the player should auto-retry, reduce bitrate, and preserve the current state where possible.
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
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
        </div>
      </div>
    </div>
  );
}




