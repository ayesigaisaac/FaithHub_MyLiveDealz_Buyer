// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  AudioLines,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe2,
  HeartHandshake,
  Languages,
  MessageSquare,
  Mic2,
  PlayCircle,
  BarChart3,
  Radio,
  RefreshCw,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const agenda = [
  { time: "00:00", title: "Opening music and welcome" },
  { time: "00:05", title: "Main teaching session" },
  { time: "00:35", title: "Prayer and reflection" },
  { time: "00:45", title: "Giving and announcements" },
  { time: "00:50", title: "Q&A / next steps" },
];

const rules = [
  "Be respectful in chat and avoid abusive language.",
  "Follow moderator directions during live prayer or Q&A moments.",
  "Use the report tools if anything feels unsafe or inappropriate.",
  "Supporters may receive early-access chat depending on session settings.",
];

const preChatMessages = [
  { name: "Naomi", badge: "Member", text: "Ready for tonights session. Really excited for the teaching." },
  { name: "David", badge: "Supporter", text: "Audio check is good here. Waiting room looks great." },
  { name: "Aisha", badge: "Moderator", text: "Prayer requests are open before the stream starts." },
];

const pollOptions = [
  { label: "Joining from home", votes: 54 },
  { label: "Joining with family", votes: 28 },
  { label: "Joining from work or travel", votes: 18 },
];

export default function FaithHubLiveWaitingRoom() {
  const [offlineMode, setOfflineMode] = useState(false);
  const [audioOnlyFallback, setAudioOnlyFallback] = useState(true);
  const [captionsLanguage, setCaptionsLanguage] = useState("English");
  const [translationLanguage, setTranslationLanguage] = useState("None");
  const [bandwidthState, setBandwidthState] = useState("Good");
  const [supporterMode, setSupporterMode] = useState(true);
  const [prayerRequest, setPrayerRequest] = useState("Please pray for our family and for wisdom in our next season.");

  const countdown = useMemo(() => {
    return { hours: "00", minutes: "12", seconds: "46" };
  }, []);

  return (
    <div className="fh-page-canvas min-h-screen overflow-x-clip text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <TimerReset className="h-5 w-5" />
            </div>
            <div>
              <div className="fh-eyebrow text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Live Waiting Room</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Reconnect + audio fallback" : `Bandwidth ${bandwidthState.toLowerCase()}`}
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.34, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-hero-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Session starts soon</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Waiting room + audience prep</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.62fr_0.38fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Youth Impact Night</div>
                      <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                        Gather early, review the agenda, test the connection, and prepare your language and accessibility settings before the live session begins.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        The waiting room is the bridge between discovery and participation. Users can see countdowns, session rules, pre-chat, polls, prayer requests, sharing tools, and donation prompts before the stream opens.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Users className="h-4 w-4" />
                          1.1k already waiting
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Radio className="h-4 w-4" />
                          Youth Church audience
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <ShieldCheck className="h-4 w-4" />
                          Moderated session
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Countdown</div>
                      <div className="grid grid-cols-1 gap-3 text-center min-[420px]:grid-cols-3">
                        {[
                          { label: "Hours", value: countdown.hours },
                          { label: "Minutes", value: countdown.minutes },
                          { label: "Seconds", value: countdown.seconds },
                        ].map((item) => (
                          <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 px-3 py-4">
                            <div className="text-3xl font-semibold text-white">{item.value}</div>
                            <div className="mt-1 fh-kicker-muted text-white/70">{item.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Enter session</Button>
                        <Button variant="outline" className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15">
                          <Share2 className="mr-2 h-4 w-4" /> Share link
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
                  title="Agenda and session rules"
                  subtitle="Users know what comes next and how to participate safely."
                />
                <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr]">
                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Session agenda</div>
                    <div className="space-y-3">
                      {agenda.map((item) => (
                        <div key={item.time} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                          <div className="rounded-full bg-[#03cd8c]/10 px-3 py-1 text-xs font-semibold text-[#03cd8c]">{item.time}</div>
                          <div className="text-sm text-slate-700">{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Session rules</div>
                    <div className="space-y-3">
                      {rules.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                          <div className="fh-body-tight text-slate-600">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.34, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Pre-chat, polls, and prayer requests"
                  subtitle="Give the audience meaningful interaction before the session opens."
                />
                <div className="grid gap-4 xl:grid-cols-[0.52fr_0.48fr]">
                  <div className="space-y-3">
                    {preChatMessages.map((message) => (
                      <div key={`${message.name}-${message.text}`} className="fh-subcard rounded-[24px] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="text-sm font-semibold text-slate-900">{message.name}</div>
                          <span className="rounded-full bg-[#ecfff8] px-2.5 py-1 text-xs font-semibold text-[#03cd8c]">{message.badge}</span>
                        </div>
                        <div className="fh-body-tight text-slate-600">{message.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <BarChart3 className="h-4 w-4 text-[#03cd8c]" />
                        Live poll before start
                      </div>
                      <div className="space-y-3">
                        {pollOptions.map((item) => (
                          <div key={item.label} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                            <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                              <span>{item.label}</span>
                              <span className="font-semibold text-slate-900">{item.votes}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100">
                              <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: `${item.votes}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <MessageSquare className="h-4 w-4 text-[#03cd8c]" />
                        Prayer request before live begins
                      </div>
                      <textarea
                        value={prayerRequest}
                        onChange={(e) => setPrayerRequest(e.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                      />
                      <Button className="mt-3 rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                        <Send className="mr-2 h-4 w-4" /> Submit request
                      </Button>
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
              transition={{ delay: 0.22, duration: 0.32, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Language, captions, and connection"
                  subtitle="Tune accessibility and bandwidth before playback starts."
                  action="Advanced"
                />

                <div className="space-y-4">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <Languages className="h-4 w-4 text-[#8ef0ca]" /> Language and captions
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="fh-eyebrow text-white/60">Captions</span>
                        <select
                          value={captionsLanguage}
                          onChange={(e) => setCaptionsLanguage(e.target.value)}
                          className="h-11 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur"
                        >
                          <option className="text-slate-900">English</option>
                          <option className="text-slate-900">Arabic</option>
                          <option className="text-slate-900">French</option>
                        </select>
                      </label>
                      <label className="block space-y-2">
                        <span className="fh-eyebrow text-white/60">Live translation</span>
                        <select
                          value={translationLanguage}
                          onChange={(e) => setTranslationLanguage(e.target.value)}
                          className="h-11 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none backdrop-blur"
                        >
                          <option className="text-slate-900">None</option>
                          <option className="text-slate-900">French</option>
                          <option className="text-slate-900">Swahili</option>
                          <option className="text-slate-900">Arabic</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <AudioLines className="h-4 w-4 text-[#8ef0ca]" /> Bandwidth test
                    </div>
                    <div className="mb-3 text-sm text-white/75">Check whether full video, lower bitrate video, or audio-only will work best before the stream opens.</div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { label: "Excellent", active: bandwidthState === "Excellent" },
                        { label: "Good", active: bandwidthState === "Good" },
                        { label: "Low", active: bandwidthState === "Low" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setBandwidthState(item.label)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                            item.active
                              ? "border-white/25 bg-white/16 text-white"
                              : "border-white/10 bg-white/8 text-white/80 hover:bg-white/12"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                      <RefreshCw className="mr-2 h-4 w-4" /> Run bandwidth test
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setAudioOnlyFallback((prev) => !prev)}
                    >
                      {audioOnlyFallback ? "Audio-only fallback on" : "Enable audio-only"}
                    </Button>
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
            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="fh-eyebrow text-[#f77f00]">Supporter layer</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Early-access chat and supporter upsell</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setSupporterMode((prev) => !prev)}
                  >
                    {supporterMode ? "Supporter mode on" : "Preview supporter mode"}
                  </Button>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  {supporterMode ? (
                    <>
                      <div className="fh-subcard-accent rounded-[24px] p-4">
                        Supporters can access an early-access waiting room chat lane before the full audience opens.
                      </div>
                      <div className="fh-subcard-accent rounded-[24px] p-4">
                        Priority moderation responses and enhanced interaction options can be surfaced here for supporter tiers.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="fh-subcard-warm rounded-[24px] p-4">
                        Prompt supporters with a tasteful upgrade path for early-access chat and special interactive participation.
                      </div>
                      <div className="fh-subcard-warm rounded-[24px] p-4">
                        Donation prompts can appear without blocking the standard waiting room journey.
                      </div>
                    </>
                  )}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                      <HeartHandshake className="mr-2 h-4 w-4" /> Support this session
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      Learn supporter benefits
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.32, ease: "easeOut" }}
            >
            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Offline and reconnect behavior"
                  subtitle="Keep users calm if the network fails before the stream begins."
                  action="Connection help"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    If the stream cannot load, the waiting room can suggest reconnect, lower-bandwidth mode, or audio-only access where supported.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Session schedule, rules, and prayer request forms remain visible even when full playback is not yet available.
                  </div>
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-[#fff8ef] p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <AlertTriangle className="h-4 w-4 text-[#f77f00]" /> Reconnect state
                    </div>
                    <div className="text-sm text-slate-600">When network quality falls sharply, the UI should prompt auto-reconnect and surface audio-only fallback immediately.</div>
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

function SectionHeader({ title, subtitle, action = "See all" }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      <Button variant="ghost" className="shrink-0 rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}




