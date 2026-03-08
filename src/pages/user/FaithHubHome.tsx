// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bookmark,
  CalendarDays,
  ChevronRight,
  Download,
  Flame,
  HeartHandshake,
  Layers3,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const buckets = [
  {
    key: "watch",
    title: "Watch live",
    subtitle: "Join what is happening now or starting soon.",
    icon: PlayCircle,
  },
  {
    key: "catchup",
    title: "Catch up",
    subtitle: "Continue sermons, series, and saved replays.",
    icon: Layers3,
  },
  {
    key: "give",
    title: "Give",
    subtitle: "Support campaigns, missions, and community needs.",
    icon: HeartHandshake,
  },
  {
    key: "groups",
    title: "Join group",
    subtitle: "Find youth, women, family, and ministry circles.",
    icon: Users,
  },
];

const feedItems = [
  {
    id: 1,
    type: "live",
    title: "Evening Prayer Revival",
    institution: "St. Marys Cathedral",
    meta: "Live now  3.4k watching",
    badge: "Live",
    accent: "bg-rose-500",
  },
  {
    id: 2,
    type: "series",
    title: "Walking in Wisdom  Episode 4",
    institution: "FaithHub Global Chapel",
    meta: "Series update  42 min",
    badge: "Series",
    accent: "bg-[#03cd8c]",
  },
  {
    id: 3,
    type: "event",
    title: "Youth Worship Camp 2026",
    institution: "Kingdom Youth Movement",
    meta: "Registration open  5 days left",
    badge: "Event",
    accent: "bg-[#f77f00]",
  },
  {
    id: 4,
    type: "group",
    title: "Women Fellowship Prayer Circle",
    institution: "Al Noor Community Centre",
    meta: "Join group  Starts 7:00 PM",
    badge: "Group",
    accent: "bg-violet-500",
  },
];

const continueWatching = [
  {
    id: 1,
    title: "Wednesday Healing Service Replay",
    institution: "House of Grace",
    progress: 68,
    duration: "54 min",
  },
  {
    id: 2,
    title: "Mercy in Motion  Series Episode 2",
    institution: "FaithHub Global Chapel",
    progress: 41,
    duration: "39 min",
  },
];

const upcomingSessions = [
  {
    id: 1,
    title: "Sunrise Devotion",
    institution: "Light Community Church",
    time: "Today  6:00 AM",
    audience: "General community",
  },
  {
    id: 2,
    title: "Youth Impact Night",
    institution: "Kingdom Youth Movement",
    time: "Today  8:00 PM",
    audience: "Youth Church",
  },
  {
    id: 3,
    title: "Family Quran Reflection",
    institution: "Al Noor Community Centre",
    time: "Tomorrow  5:30 PM",
    audience: "Family circle",
  },
];

const downloadedSermons = [
  "Faith Over Fear  Audio",
  "Walking in Wisdom  Episode 3",
  "The Call to Serve  Notes + Transcript",
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

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 h-28 rounded-[20px] bg-slate-100" />
      <div className="mb-2 h-4 w-2/3 rounded bg-slate-100" />
      <div className="mb-4 h-3 w-1/2 rounded bg-slate-100" />
      <div className="h-3 w-1/3 rounded bg-slate-100" />
    </div>
  );
}

export default function FaithHubHome() {
  const [loading, setLoading] = useState(false);
  const [dataSaver, setDataSaver] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [activeBucket, setActiveBucket] = useState("watch");

  const filteredFeed = useMemo(() => {
    if (activeBucket === "watch") return feedItems.filter((item) => item.type === "live");
    if (activeBucket === "catchup") return feedItems.filter((item) => ["series"].includes(item.type));
    if (activeBucket === "give") return feedItems.filter((item) => ["event"].includes(item.type));
    if (activeBucket === "groups") return feedItems.filter((item) => ["group"].includes(item.type));
    return feedItems;
  }, [activeBucket]);

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
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">FaithHub</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Cached feed" : dataSaver ? "Data saver on" : "Full quality"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Search className="h-5 w-5" />
            </button>
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
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_20%)]" />
                <div className="relative z-10">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Personalized home</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Fast first paint</Badge>
                    {offlineMode && (
                      <Badge className="rounded-full bg-[#f77f00]/15 text-[#7a4a00] hover:bg-[#f77f00]/15">Offline cache in use</Badge>
                    )}
                  </div>

                  <div className="max-w-3xl space-y-3 text-white">
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">A smarter start every time</div>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                      Watch, catch up, give, and join the right faith communities from one intelligent home.
                    </h1>
                    <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                      Personalized around followed institutions, series episodes, upcoming Live Sessionz, events, and your saved progress. The experience remains fast on slow networks and helpful even offline.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {buckets.map((bucket) => {
                      const Icon = bucket.icon;
                      const active = activeBucket === bucket.key;
                      return (
                        <button
                          key={bucket.key}
                          onClick={() => setActiveBucket(bucket.key)}
                          className={`rounded-[24px] border p-4 text-left backdrop-blur transition ${
                            active
                              ? "border-white/60 bg-white/22 text-white shadow-lg"
                              : "border-white/20 bg-white/10 text-white/90 hover:bg-white/16"
                          }`}
                        >
                          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="text-base font-semibold">{bucket.title}</div>
                          <div className="mt-1 text-sm leading-6 text-white/80">{bucket.subtitle}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Continue watching"
                  subtitle="Resume where you left off across replays, series, and study sessions."
                />

                <div className="grid gap-3 lg:grid-cols-2">
                  {continueWatching.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10"
                    >
                      <div className="mb-4 h-40 rounded-[20px] bg-gradient-to-br from-slate-100 to-slate-200" />
                      <div className="mb-1 text-lg font-semibold text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-500">{item.institution}  {item.duration}</div>
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div
                            className="h-2 rounded-full bg-[#03cd8c]"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Resume</Button>
                        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Your personalized feed"
                  subtitle="Followed institutions, series updates, Live Sessionz, and faith events tailored to your intent."
                  action="Refresh"
                />

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Button
                    variant={loading ? "default" : "outline"}
                    className={`rounded-full ${loading ? "bg-[#03cd8c] hover:bg-[#02b67c]" : "border-slate-200 bg-white hover:border-[#03cd8c]/30 hover:bg-[#f7fffb]"}`}
                    onClick={() => setLoading((prev) => !prev)}
                  >
                    {loading ? "Stop skeleton state" : "Show skeleton loading"}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/30 hover:bg-[#f7fffb]"
                    onClick={() => setDataSaver((prev) => !prev)}
                  >
                    {dataSaver ? "Data saver on" : "Data saver off"}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/30 hover:bg-[#f7fffb]"
                    onClick={() => setOfflineMode((prev) => !prev)}
                  >
                    {offlineMode ? "Go online" : "View offline cache"}
                  </Button>
                </div>

                {loading ? (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                    {filteredFeed.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className={`h-28 flex-1 rounded-[20px] ${dataSaver ? "bg-slate-100" : "bg-gradient-to-br from-slate-100 to-slate-200"}`} />
                          <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">{item.badge}</Badge>
                        </div>
                        <div className="mb-1 text-lg font-semibold text-slate-900">{item.title}</div>
                        <div className="text-sm text-slate-500">{item.institution}</div>
                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                          <span className={`h-2.5 w-2.5 rounded-full ${item.accent}`} />
                          {item.meta}
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Open</Button>
                          <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                  title="Upcoming Live Sessionz"
                  subtitle="From followed institutions and your selected audience groups."
                  action="Open calendar"
                />
                <div className="space-y-3">
                  {upcomingSessions.map((item) => (
                    <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 text-base font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-white/70">{item.institution}</div>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/80">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                          <CalendarDays className="h-4 w-4 text-[#8ef0ca]" />
                          {item.time}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                          <Users className="h-4 w-4 text-[#8ef0ca]" />
                          {item.audience}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Set reminder</Button>
                        <Button variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/10">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Downloaded sermons"
                  subtitle="Available instantly when the network is weak or offline."
                  action="Manage"
                />
                <div className="space-y-3">
                  {downloadedSermons.map((item) => (
                    <div key={item} className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                          <Download className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">{item}</div>
                          <div className="text-xs text-slate-500">Offline-ready  Transcript cached</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f77f00]">Sponsored placement</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Featured institution series</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Sponsored</Badge>
                </div>
                <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Flame className="h-4 w-4 text-[#f77f00]" />
                    21 Days of Hope  Institution Spotlight
                  </div>
                  <div className="text-sm leading-6 text-slate-600">
                    Transparently labeled promoted series placement controlled through admin governance, with institution-safe promotion rules and policy-compliant surfacing.
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Explore series</Button>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-medium text-[#03cd8c]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Admin controlled
                    </span>
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

