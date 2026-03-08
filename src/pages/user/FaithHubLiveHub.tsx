// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  Crown,
  Download,
  Filter,
  Globe2,
  PlayCircle,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Video,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const filters = {
  institutions: ["All Institutions", "St. Marys Cathedral", "FaithHub Global Chapel", "Al Noor Community Centre", "Kingdom Youth Movement"],
  series: ["All Series", "Walking in Wisdom", "Mercy in Motion", "Women of Faith", "Raising Kingdom Leaders"],
  audiences: ["All Audiences", "General Community", "Youth Church", "Women Fellowship", "Family Ministry"],
};

const liveNow = [
  {
    id: 1,
    title: "Evening Prayer Revival",
    institution: "St. Marys Cathedral",
    series: "Walking in Wisdom",
    audience: "General Community",
    viewers: "3.4k watching",
    latency: "Low latency",
    status: "Live now",
    ticketed: false,
    memberPriority: false,
  },
  {
    id: 2,
    title: "Women Fellowship Reflection",
    institution: "Al Noor Community Centre",
    series: "Women of Faith",
    audience: "Women Fellowship",
    viewers: "920 watching",
    latency: "Ultra low latency",
    status: "Live now",
    ticketed: true,
    memberPriority: true,
  },
];

const upcoming = [
  {
    id: 1,
    title: "Youth Impact Night",
    institution: "Kingdom Youth Movement",
    series: "Raising Kingdom Leaders",
    audience: "Youth Church",
    time: "Today  8:00 PM",
    waitingRoom: true,
    ticketed: false,
  },
  {
    id: 2,
    title: "Mercy in Motion  Episode 5",
    institution: "FaithHub Global Chapel",
    series: "Mercy in Motion",
    audience: "Family Ministry",
    time: "Tomorrow  7:30 PM",
    waitingRoom: true,
    ticketed: true,
  },
  {
    id: 3,
    title: "Family Quran Reflection",
    institution: "Al Noor Community Centre",
    series: "Quiet Strength",
    audience: "Family Ministry",
    time: "Tomorrow  5:30 PM",
    waitingRoom: false,
    ticketed: false,
  },
];

const replays = [
  {
    id: 1,
    title: "Guarding the Heart Replay",
    institution: "St. Marys Cathedral",
    series: "Walking in Wisdom",
    audience: "General Community",
    duration: "43 min",
    cached: true,
  },
  {
    id: 2,
    title: "Mercy in Motion Catch-Up",
    institution: "FaithHub Global Chapel",
    series: "Mercy in Motion",
    audience: "Family Ministry",
    duration: "38 min",
    cached: true,
  },
  {
    id: 3,
    title: "Youth Worship Replay",
    institution: "Kingdom Youth Movement",
    series: "Raising Kingdom Leaders",
    audience: "Youth Church",
    duration: "51 min",
    cached: false,
  },
];

function FilterChip({ active, label, onClick }) {
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

export default function FaithHubLiveHub() {
  const [query, setQuery] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState("All Institutions");
  const [seriesFilter, setSeriesFilter] = useState("All Series");
  const [audienceFilter, setAudienceFilter] = useState("All Audiences");
  const [offlineMode, setOfflineMode] = useState(false);
  const [dataSaver, setDataSaver] = useState(true);

  const applyFilters = (items) =>
    items.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.institution.toLowerCase().includes(query.toLowerCase()) ||
        item.series.toLowerCase().includes(query.toLowerCase());
      const matchesInstitution = institutionFilter === "All Institutions" || item.institution === institutionFilter;
      const matchesSeries = seriesFilter === "All Series" || item.series === seriesFilter;
      const matchesAudience = audienceFilter === "All Audiences" || item.audience === audienceFilter;
      return matchesQuery && matchesInstitution && matchesSeries && matchesAudience;
    });

  const filteredLiveNow = useMemo(() => applyFilters(liveNow), [query, institutionFilter, seriesFilter, audienceFilter]);
  const filteredUpcoming = useMemo(() => applyFilters(upcoming), [query, institutionFilter, seriesFilter, audienceFilter]);
  const filteredReplays = useMemo(() => applyFilters(replays), [query, institutionFilter, seriesFilter, audienceFilter]);

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
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Live Hub</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Schedule + cached replays" : dataSaver ? "Data saver on" : "Full stream previews"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Now Live, Upcoming, Replays</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Series-aware live discovery</Badge>
                  </div>

                  <div className="max-w-3xl space-y-3">
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Live-first faith infrastructure</div>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                      Step into live worship, upcoming sessions, and replays with the right filters, the right speed, and the right access path.
                    </h1>
                    <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                      Discover Live Sessionz by institution, series, and audience group. See low-latency indicators, jump into waiting rooms early, and stay productive even offline with cached replays and full schedules.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search live sessions, institutions, or series"
                        className="h-12 w-full rounded-2xl border border-white/20 bg-white/12 pl-11 pr-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:border-white/45 focus:bg-white/18"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setDataSaver((prev) => !prev)}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      {dataSaver ? "Data saver" : "Full previews"}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setOfflineMode((prev) => !prev)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {offlineMode ? "Go online" : "Offline cache"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Filters"
                  subtitle="Refine by institution, series, and audience group."
                  action="Reset"
                />
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Filter className="h-4 w-4 text-[#03cd8c]" /> Institution
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filters.institutions.map((item) => (
                        <FilterChip key={item} label={item} active={institutionFilter === item} onClick={() => setInstitutionFilter(item)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Series</div>
                    <div className="flex flex-wrap gap-2">
                      {filters.series.map((item) => (
                        <FilterChip key={item} label={item} active={seriesFilter === item} onClick={() => setSeriesFilter(item)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Audience Group</div>
                    <div className="flex flex-wrap gap-2">
                      {filters.audiences.map((item) => (
                        <FilterChip key={item} label={item} active={audienceFilter === item} onClick={() => setAudienceFilter(item)} />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Now Live"
                  subtitle="Join current live sessions with quality context and access cues."
                />
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                  {filteredLiveNow.map((item) => (
                    <div key={item.id} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10">
                      <div className="mb-4 h-40 rounded-[20px] bg-gradient-to-br from-slate-100 to-slate-200" />
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                          <Radio className="h-3.5 w-3.5" /> {item.status}
                        </span>
                        {item.ticketed && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#fff8ef] px-2.5 py-1 text-xs font-semibold text-[#f77f00]">
                            <Ticket className="h-3.5 w-3.5" /> Ticketed
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500">{item.institution}  {item.series}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">{item.audience}</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfff8] px-3 py-1 font-medium text-[#03cd8c]">
                          <Wifi className="h-3.5 w-3.5" /> {item.latency}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                        <Users className="h-4 w-4 text-[#03cd8c]" />
                        {item.viewers}
                      </div>
                      {item.memberPriority && (
                        <div className="mt-4 rounded-2xl border border-[#03cd8c]/15 bg-[#ecfff8] p-3 text-sm text-slate-700">
                          Priority access available for limited-capacity interactive participation.
                        </div>
                      )}
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Join Live</Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                          Details
                        </Button>
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
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Upcoming"
                  subtitle="Plan ahead and enter waiting rooms before session start."
                  action="Open calendar"
                />
                <div className="space-y-3">
                  {filteredUpcoming.map((item) => (
                    <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 text-base font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-white/70">{item.institution}  {item.series}</div>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/85">
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
                        {item.waitingRoom ? (
                          <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Join waiting room</Button>
                        ) : (
                          <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Set reminder</Button>
                        )}
                        {item.ticketed && (
                          <Button variant="outline" className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/10">
                            <Crown className="mr-2 h-4 w-4" />
                            Priority access
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Replays"
                  subtitle="Resume cached replays when live is over or connectivity is poor."
                  action="Library"
                />
                <div className="space-y-3">
                  {filteredReplays.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                          {item.cached ? <Download className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.institution}  {item.duration}</div>
                          <div className="mt-1 text-xs text-slate-600">{item.series}  {item.audience}</div>
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
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f77f00]">Monetization</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Ticketed sessions and memberships</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Policy-aware</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Limited-capacity interactive sessions can offer priority access for supporters or verified ticket holders.
                  </div>
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Session discovery can surface ticketed and subscription-backed live experiences without hiding standard free access.
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

