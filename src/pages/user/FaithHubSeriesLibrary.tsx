// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BookMarked,
  BookOpen,
  Bookmark,
  CalendarDays,
  ChevronRight,
  Clock3,
  Download,
  Globe2,
  Languages,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const seriesItems = [
  {
    id: 1,
    title: "Walking in Wisdom",
    institution: "St. Marys Cathedral",
    topic: "Wisdom",
    language: "English",
    audience: "General Community",
    episodes: 8,
    progress: 62,
    trailer: true,
    readingPlan: true,
    premium: false,
    sponsored: false,
    updated: "Episode 5 tonight  7:30 PM",
  },
  {
    id: 2,
    title: "Mercy in Motion",
    institution: "FaithHub Global Chapel",
    topic: "Compassion",
    language: "English",
    audience: "Family Ministry",
    episodes: 6,
    progress: 41,
    trailer: true,
    readingPlan: true,
    premium: true,
    sponsored: false,
    updated: "Replay available  Episode 3",
  },
  {
    id: 3,
    title: "Raising Kingdom Leaders",
    institution: "Kingdom Youth Movement",
    topic: "Leadership",
    language: "English",
    audience: "Youth Church",
    episodes: 10,
    progress: 18,
    trailer: true,
    readingPlan: false,
    premium: false,
    sponsored: true,
    updated: "New episode this Friday",
  },
  {
    id: 4,
    title: "Women of Faith",
    institution: "Al Noor Community Centre",
    topic: "Community",
    language: "Arabic",
    audience: "Women Fellowship",
    episodes: 5,
    progress: 0,
    trailer: false,
    readingPlan: true,
    premium: true,
    sponsored: false,
    updated: "Starts next week",
  },
  {
    id: 5,
    title: "Faith That Builds",
    institution: "House of Grace",
    topic: "Growth",
    language: "English",
    audience: "General Community",
    episodes: 7,
    progress: 83,
    trailer: true,
    readingPlan: true,
    premium: false,
    sponsored: false,
    updated: "Reading plan refreshed today",
  },
  {
    id: 6,
    title: "Quiet Strength",
    institution: "Beth Shalom Fellowship",
    topic: "Healing",
    language: "English",
    audience: "General Community",
    episodes: 4,
    progress: 26,
    trailer: false,
    readingPlan: false,
    premium: false,
    sponsored: false,
    updated: "2 replays available",
  },
];

const downloadedAssets = [
  "Walking in Wisdom  Trailer",
  "Mercy in Motion  Study Notes",
  "Faith That Builds  Episode 6 audio",
  "Raising Kingdom Leaders  Reading Plan",
];

function Chip({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
      }`}
    >
      {label}
    </button>
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

export default function FaithHubSeriesLibrary() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [language, setLanguage] = useState("All");
  const [audience, setAudience] = useState("All");
  const [offlineMode, setOfflineMode] = useState(false);
  const [smartReminders, setSmartReminders] = useState(true);

  const filteredSeries = useMemo(() => {
    return seriesItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.institution.toLowerCase().includes(search.toLowerCase());
      const matchesTopic = topic === "All" || item.topic === topic;
      const matchesLanguage = language === "All" || item.language === language;
      const matchesAudience = audience === "All" || item.audience === audience;
      return matchesSearch && matchesTopic && matchesLanguage && matchesAudience;
    });
  }, [search, topic, language, audience]);

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
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <div className="fh-eyebrow text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Series Library</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Offline series cache" : smartReminders ? "Smart reminders on" : "Reminders off"}
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">All followed institutions</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Series-first discovery</Badge>
                  </div>

                  <div className="max-w-3xl space-y-3">
                    <div className="fh-kicker text-white/90">Organized teachings at scale</div>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                      Browse every series, filter by what matters, and continue your learning journey with precision.
                    </h1>
                    <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                      Discover sermon series from institutions you follow, segmented by topic, language, and audience. FaithHub adds trailers, reading plans, progress, reminders, premium access, and downloaded assets for low-connectivity users.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search series or institution"
                        className="h-12 w-full rounded-2xl border border-white/20 bg-white/12 pl-11 pr-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:border-white/45 focus:bg-white/18"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setSmartReminders((prev) => !prev)}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {smartReminders ? "Reminders on" : "Reminders off"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setOfflineMode((prev) => !prev)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {offlineMode ? "Go online" : "Offline assets"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Filters"
                  subtitle="Tune series discovery by topic, language, and audience groups."
                  action="Reset"
                />

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Topic</div>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Wisdom", "Compassion", "Leadership", "Growth", "Healing", "Community"].map((item) => (
                        <Chip key={item} label={item} active={topic === item} onClick={() => setTopic(item)} />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Languages className="h-4 w-4 text-[#03cd8c]" />
                        Language
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["All", "English", "Arabic", "French"].map((item) => (
                          <Chip key={item} label={item} active={language === item} onClick={() => setLanguage(item)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Users className="h-4 w-4 text-[#03cd8c]" />
                        Audience
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["All", "General Community", "Youth Church", "Women Fellowship", "Family Ministry"].map((item) => (
                          <Chip key={item} label={item} active={audience === item} onClick={() => setAudience(item)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Series results"
                  subtitle="Trailers, reading plans, progress, premium access, and sponsor labels all in one clean library."
                />

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                  {filteredSeries.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10"
                    >
                      <div className="mb-4 h-40 rounded-[20px] bg-gradient-to-br from-slate-100 to-slate-200" />
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                        {item.premium && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                            <LockIcon /> Premium
                          </span>
                        )}
                        {item.sponsored && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#fff8ef] px-2.5 py-1 text-xs font-semibold text-[#f77f00]">
                            <Star className="h-3.5 w-3.5" /> Sponsored
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500">{item.institution}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{item.topic}</span>
                        <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{item.language}</span>
                        <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{item.audience}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                        <Clock3 className="h-4 w-4 text-[#03cd8c]" />
                        {item.updated}
                      </div>
                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                        {item.trailer && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfff8] px-3 py-1 font-medium text-[#03cd8c]">
                            <PlayCircle className="h-3.5 w-3.5" /> Trailer
                          </span>
                        )}
                        {item.readingPlan && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfff8] px-3 py-1 font-medium text-[#03cd8c]">
                            <BookOpen className="h-3.5 w-3.5" /> Reading plan
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Open series</Button>
                        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
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
                  title="Smart reminder intelligence"
                  subtitle="Remind the user when the next relevant episode is likely to matter most."
                  action="Adjust"
                />
                <div className="space-y-3 text-sm text-white/80">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 text-base font-semibold text-white">Tonights likely best match</div>
                    <div>Walking in Wisdom  Episode 5 fits your current progress and your recent Wednesday viewing behavior.</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 text-base font-semibold text-white">Reading plan sync</div>
                    <div>Mercy in Motion has a study guide checkpoint tomorrow morning and a replay download available for low-data mode.</div>
                  </div>
                  <Button className="w-full rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Schedule reminders
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Downloaded series assets"
                  subtitle="Keep learning even when the connection is weak."
                  action="Manage"
                />
                <div className="space-y-3">
                  {downloadedAssets.map((item) => (
                    <div key={item} className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                          <Download className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">{item}</div>
                          <div className="text-xs text-slate-500">Offline ready  Cached successfully</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="fh-eyebrow text-[#f77f00]">Monetization</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Premium and sponsored series</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Transparent labels</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Premium series can unlock deeper series access, study paths, and exclusive attachments through compliant subscription products.
                  </div>
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Sponsored series placement remains clearly labeled so institutions can gain visibility without confusing organic discovery.
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

function LockIcon() {
  return <span className="inline-block h-3.5 w-3.5 rounded-full bg-white/20" />;
}




