// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  Gift,
  HeartHandshake,
  Lock,
  PlayCircle,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
  Users,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const episodes = [
  { id: 1, title: "Foundations of Wisdom", status: "Completed", length: "34 min", progress: 100, replay: true },
  { id: 2, title: "Wisdom in Daily Decisions", status: "Completed", length: "41 min", progress: 100, replay: true },
  { id: 3, title: "Discernment in Community", status: "Completed", length: "39 min", progress: 100, replay: true },
  { id: 4, title: "Guarding the Heart", status: "In progress", length: "45 min", progress: 62, replay: true },
  { id: 5, title: "Wisdom for the Next Season", status: "Upcoming Live Sessionz", length: "Starts tonight  7:30 PM", progress: 0, replay: false },
  { id: 6, title: "Living What We Learned", status: "Locked until release", length: "Next week", progress: 0, replay: false },
];

const ctaLinks = [
  { title: "Add series to calendar", subtitle: "Upcoming episodes and key checkpoints", icon: CalendarDays },
  { title: "Share series card", subtitle: "Create a branded share card with progress snapshot", icon: Share2 },
  { title: "Series notifications", subtitle: "Smart reminders for upcoming and unfinished episodes", icon: Bell },
];

const merchAndTickets = [
  { title: "Series notebook bundle", meta: "FaithMart merch", icon: ShoppingBag },
  { title: "Live experience ticket", meta: "Special session access", icon: Ticket },
  { title: "Giving and mission support", meta: "Optional contribution", icon: HeartHandshake },
];

const shareOptions = ["Message", "Status card", "Story card", "Institution invite", "Copy deep link"];

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

export default function FaithHubSeriesDetail() {
  const [following, setFollowing] = useState(true);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [downloadQueued, setDownloadQueued] = useState(true);

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
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="fh-eyebrow text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Series Detail</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Metadata cached
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
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Series overview</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Calendar + share + merch</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Walking in Wisdom</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        A structured teaching journey with episode progress, reminders, series sharing, and premium extensions.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Follow the series, track each sermon episode, add the journey to your calendar, and connect it to FaithMart merchandise or special live experiences where available.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Users className="h-4 w-4" />
                          8 episodes
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Clock3 className="h-4 w-4" />
                          Updated tonight
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Sparkles className="h-4 w-4" />
                          Reading plan available
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 h-36 rounded-[20px] bg-white/20" />
                      <div className="mb-2 text-sm font-semibold text-white">Your series progress</div>
                      <div className="mb-2 text-2xl font-semibold text-white">57%</div>
                      <div className="h-2 rounded-full bg-white/20">
                        <div className="h-2 rounded-full bg-white" style={{ width: "57%" }} />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          className="flex-1 rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
                          onClick={() => setFollowing((prev) => !prev)}
                        >
                          {following ? "Following" : "Follow series"}
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineMode((prev) => !prev)}
                        >
                          {offlineMode ? "Online" : "Offline"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Episode journey"
                  subtitle="Track progress episode by episode across replays, live checkpoints, and future releases."
                  action="Open library"
                />
                <div className="space-y-3">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 text-base font-semibold text-slate-900">{episode.title}</div>
                          <div className="text-sm text-slate-500">{episode.status}  {episode.length}</div>
                          <div className="mt-3">
                            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                              <span>Progress</span>
                              <span>{episode.progress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100">
                              <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: `${episode.progress}%` }} />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {episode.replay ? (
                            <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Open episode</Button>
                          ) : (
                            <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                              Set reminder
                            </Button>
                          )}
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

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Series actions"
                  subtitle="Calendar sync, share card, and series communication tools."
                />
                <div className="grid gap-3 md:grid-cols-3">
                  {ctaLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-base font-semibold text-slate-900">{item.title}</div>
                        <div className="mt-1 fh-body-tight text-slate-600">{item.subtitle}</div>
                        <Button variant="ghost" className="mt-4 rounded-full px-0 text-[#03cd8c] hover:bg-transparent hover:text-[#03cd8c]">
                          Open action
                        </Button>
                      </div>
                    );
                  })}
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
                  title="Share series card"
                  subtitle="Invite others with a beautiful, branded snapshot of the series."
                  action="Customize"
                />
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="mb-4 h-48 rounded-[24px] bg-gradient-to-br from-white/20 to-white/10" />
                  <div className="mb-3 text-lg font-semibold text-white">Walking in Wisdom</div>
                  <div className="text-sm text-white/70">5 of 8 episodes complete  Next live episode tonight</div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {shareOptions.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/20 px-3 py-2 text-sm text-white/85">
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button className="mt-4 w-full rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                    <Share2 className="mr-2 h-4 w-4" />
                    Create share card
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="fh-eyebrow text-[#f77f00]">Premium series access</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Unlock deeper study and bundled experiences</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setPremiumUnlocked((prev) => !prev)}
                  >
                    {premiumUnlocked ? "Premium preview on" : "Preview paywall"}
                  </Button>
                </div>

                {!premiumUnlocked ? (
                  <div className="rounded-[28px] border border-dashed border-[#f77f00]/25 bg-white p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div className="mb-2 text-lg font-semibold text-slate-900">Premium series layer</div>
                    <div className="mx-auto max-w-md fh-body-tight text-slate-600">
                      Some series can be gated at the series level, unlocking exclusive attachments, guided plans, bonus sessions, and bundled institution offerings.
                    </div>
                    <div className="mt-5 flex justify-center gap-2">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Unlock premium</Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        View bundle options
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-[24px] border border-[#03cd8c]/15 bg-[#ecfff8] p-4">
                      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" /> Premium resources unlocked
                      </div>
                      <div className="text-sm text-slate-600">Advanced study notes, leader reflections, reading checkpoints, and private series discussions are now visible.</div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {merchAndTickets.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                            <div className="mt-1 text-sm text-slate-600">{item.meta}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Offline and queue behavior"
                  subtitle="Metadata stays visible and replay downloads can queue safely."
                  action="Downloads"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                    Series metadata, progress, and episode order remain accessible from cache when offline.
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                    Replay downloads can be queued now and completed later when network conditions improve.
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setDownloadQueued((prev) => !prev)}
                  >
                    <Download className="mr-2 h-4 w-4 text-[#03cd8c]" />
                    {downloadQueued ? "Replay download queued" : "Queue replay download"}
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




