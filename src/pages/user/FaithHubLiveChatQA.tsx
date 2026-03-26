// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Bookmark,
  Bot,
  Flag,
  Gauge,
  MessageCircle,
  MessageSquareText,
  Pin,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TimerReset,
  TriangleAlert,
  UserMinus,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pinnedMessages = [
  {
    title: "Moderator notice",
    body: "Please stay respectful, avoid spam, and use the prayer request lane for personal ministry needs.",
  },
  {
    title: "Slow mode active",
    body: "One message every 20 seconds helps keep the discussion readable during peak attendance.",
  },
];

const chatMessages = [
  {
    id: 1,
    author: "Naomi",
    role: "Member",
    message: "The teaching on wisdom in daily decisions is really practical tonight.",
    time: "7:42 PM",
    priority: false,
    flagged: false,
  },
  {
    id: 2,
    author: "Moderator Sarah",
    role: "Moderator",
    message: "Prayer requests are open. Please keep requests concise so the team can serve more people.",
    time: "7:43 PM",
    priority: true,
    flagged: false,
  },
  {
    id: 3,
    author: "David",
    role: "Supporter",
    message: "Can the replay keep the same live captions after the session ends?",
    time: "7:44 PM",
    priority: false,
    flagged: false,
  },
  {
    id: 4,
    author: "Guest 204",
    role: "Guest",
    message: "Im joining from a weak connection but the audio-only option is working well.",
    time: "7:45 PM",
    priority: false,
    flagged: false,
  },
  {
    id: 5,
    author: "Amina",
    role: "Community Mod",
    message: "We removed one off-topic thread and kept the main Q&A focused. Thanks everyone.",
    time: "7:46 PM",
    priority: true,
    flagged: false,
  },
];

const qnaItems = [
  {
    id: 1,
    question: "How can youth apply this teaching throughout the week?",
    by: "Naomi",
    status: "Queued for host",
    threadedReplies: 3,
    priority: false,
  },
  {
    id: 2,
    question: "Will the study guide be posted after the replay?",
    by: "Anonymous to moderators",
    status: "Answered by moderator",
    threadedReplies: 2,
    priority: true,
  },
  {
    id: 3,
    question: "Can family groups create follow-up circles around this episode?",
    by: "David",
    status: "Community replies active",
    threadedReplies: 5,
    priority: false,
  },
];

const moderationEvents = [
  { label: "1 message held for review", tone: "text-[#f77f00] bg-[#fff8ef] border-[#f77f00]/20" },
  { label: "Slow mode: 20 seconds", tone: "text-[#03cd8c] bg-[#ecfff8] border-[#03cd8c]/20" },
  { label: "Toxicity assist active", tone: "text-slate-700 bg-slate-100 border-slate-200" },
];

function SectionHeader({ title, subtitle, action = "See all" }) {
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

export default function FaithHubLiveChatQA() {
  const [message, setMessage] = useState("Id like to know whether the reading plan will include family discussion prompts.");
  const [search, setSearch] = useState("");
  const [offlineMode, setOfflineMode] = useState(false);
  const [anonymousToModerators, setAnonymousToModerators] = useState(true);
  const [priorityRouting, setPriorityRouting] = useState(false);
  const [threadedView, setThreadedView] = useState(true);
  const [communityModeration, setCommunityModeration] = useState(true);
  const [composeQueued, setComposeQueued] = useState(true);
  const [toxicityAssistScore, setToxicityAssistScore] = useState(12);

  const filteredMessages = useMemo(() => {
    if (!search.trim()) return chatMessages;
    return chatMessages.filter(
      (item) =>
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Live Chat & Q&A</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Compose queue active" : "Live session connected"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Live conversation layer</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Chat, threaded Q&A, moderation</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.66fr_0.34fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Audience interaction done right</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Keep the live conversation helpful, safe, structured, and resilient even when the network fails.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        FaithHub separates fast chat from structured Q&A, supports slow mode and reporting, adds community moderation and toxicity assist, and lets the audience keep composing even while offline.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Users className="h-4 w-4" /> 3.8k in session
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <TimerReset className="h-4 w-4" /> Slow mode enabled
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <ShieldCheck className="h-4 w-4" /> Moderation live
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Session controls</div>
                      <div className="space-y-3 text-sm text-white/85">
                        <button
                          onClick={() => setThreadedView((prev) => !prev)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${threadedView ? "border-white/25 bg-white/16" : "border-white/10 bg-white/8 hover:bg-white/12"}`}
                        >
                          <div className="font-semibold text-white">Threaded Q&A</div>
                          <div className="mt-1 text-white/75">{threadedView ? "Replies grouped under each question." : "Flat list mode for faster scanning."}</div>
                        </button>
                        <button
                          onClick={() => setCommunityModeration((prev) => !prev)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${communityModeration ? "border-white/25 bg-white/16" : "border-white/10 bg-white/8 hover:bg-white/12"}`}
                        >
                          <div className="font-semibold text-white">Community moderation</div>
                          <div className="mt-1 text-white/75">{communityModeration ? "Trusted members can help surface quality questions." : "Only official moderators are ranking items."}</div>
                        </button>
                        <button
                          onClick={() => setOfflineMode((prev) => !prev)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${offlineMode ? "border-white/25 bg-white/16" : "border-white/10 bg-white/8 hover:bg-white/12"}`}
                        >
                          <div className="font-semibold text-white">Compose queue</div>
                          <div className="mt-1 text-white/75">{offlineMode ? "Messages will send automatically on reconnect." : "Currently sending in real time."}</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Pinned messages and live chat"
                  subtitle="Keep the room readable while still letting the community engage naturally."
                  action="Moderation tools"
                />

                <div className="mb-4 grid gap-3 lg:grid-cols-2">
                  {pinnedMessages.map((item) => (
                    <div key={item.title} className="fh-subcard-accent rounded-[24px] p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Pin className="h-4 w-4 text-[#03cd8c]" /> {item.title}
                      </div>
                      <div className="fh-body-tight text-slate-600">{item.body}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Search className="h-4 w-4 text-[#03cd8c]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search live chat"
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-3">
                  {filteredMessages.map((item) => (
                    <div key={item.id} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold text-slate-900">{item.author}</div>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.priority ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-slate-100 text-slate-600"}`}>
                          {item.role}
                        </span>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>
                      <div className="fh-body-tight text-slate-600">{item.message}</div>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="ghost" className="rounded-full px-3 text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">Reply</Button>
                        <Button variant="ghost" className="rounded-full px-3 text-slate-600 hover:bg-slate-100">Block</Button>
                        <Button variant="ghost" className="rounded-full px-3 text-slate-600 hover:bg-slate-100">Report</Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[28px] border border-slate-200 bg-[#f8fafc] p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Compose message</div>
                      <div className="text-xs text-slate-500">Messages queue on reconnect if the session drops.</div>
                    </div>
                    {composeQueued && (
                      <Badge className="rounded-full bg-[#fff8ef] text-[#f77f00] hover:bg-[#fff8ef]">Queued on reconnect</Badge>
                    )}
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                  />
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {offlineMode ? <WifiOff className="h-3.5 w-3.5 text-[#f77f00]" /> : <Wifi className="h-3.5 w-3.5 text-[#03cd8c]" />}
                      {offlineMode ? "Offline compose state active" : "Sending in real time"}
                    </div>
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                      <Send className="mr-2 h-4 w-4" /> Send message
                    </Button>
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
                  title="Q&A queue"
                  subtitle="Structured questions remain separate from fast chat so hosts and moderators can respond well."
                  action="Rank items"
                />
                <div className="space-y-3">
                  {qnaItems.map((item) => (
                    <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold text-white">{item.by}</div>
                        {item.priority && (
                          <span className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white">Priority routed</span>
                        )}
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/80">{item.status}</span>
                      </div>
                      <div className="fh-body-tight text-white/80">{item.question}</div>
                      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/65">
                        <span>{threadedView ? `${item.threadedReplies} threaded replies` : `${item.threadedReplies} community replies`}</span>
                        <Button variant="ghost" className="rounded-full text-[#8ef0ca] hover:bg-white/10 hover:text-[#8ef0ca]">
                          Open thread
                        </Button>
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
                    <div className="hidden text-[#f77f00]">Premium interaction controls</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Anonymous moderator route and priority handling</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">No pay-to-speak abuse</Badge>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <button
                    onClick={() => setAnonymousToModerators((prev) => !prev)}
                    className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${anonymousToModerators ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                  >
                    <div className="mb-1 flex items-center gap-2 font-semibold text-slate-900">
                      <Shield className="h-4 w-4 text-[#03cd8c]" /> Ask anonymously to moderators
                    </div>
                    <div>{anonymousToModerators ? "Enabled. Identity stays hidden from the public queue while moderators still receive the request." : "Disabled. Questions appear with public identity cues."}</div>
                  </button>

                  <button
                    onClick={() => setPriorityRouting((prev) => !prev)}
                    className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${priorityRouting ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                  >
                    <div className="mb-1 flex items-center gap-2 font-semibold text-slate-900">
                      <Sparkles className="h-4 w-4 text-[#03cd8c]" /> Message priority routing
                    </div>
                    <div>
                      {priorityRouting
                        ? "Priority handling is active for approved session rules, without turning the conversation into a pay-to-speak environment."
                        : "Priority routing is off. All items follow the standard moderation and queue order."}
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Moderation assist"
                  subtitle="Human-first controls supported by healthy-risk indicators."
                  action="Policy"
                />
                <div className="space-y-3">
                  {moderationEvents.map((item) => (
                    <div key={item.label} className={`rounded-[24px] border px-4 py-3 text-sm font-medium ${item.tone}`}>
                      {item.label}
                    </div>
                  ))}

                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Gauge className="h-4 w-4 text-[#03cd8c]" /> Toxicity assist signal
                      </div>
                      <span className="rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold text-[#03cd8c]">{toxicityAssistScore}% risk</span>
                    </div>
                    <div className="mb-3 h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: `${toxicityAssistScore}%` }} />
                    </div>
                    <div className="fh-body-tight text-slate-600">
                      Assistive scoring helps moderators spot likely harmful phrasing sooner, but human review remains the final decision point.
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <ShieldAlert className="mr-2 h-4 w-4 text-[#03cd8c]" /> Review flagged items
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <UserMinus className="mr-2 h-4 w-4 text-[#03cd8c]" /> Block or mute user
                    </Button>
                  </div>

                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-[#fff8ef] p-4 text-sm text-slate-600">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <TriangleAlert className="h-4 w-4 text-[#f77f00]" /> Safety note
                    </div>
                    Live interaction should never become a pay-to-speak pattern. Premium tools can shape privacy and routing, but core voice access stays moderation-led and abuse-resistant.
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





