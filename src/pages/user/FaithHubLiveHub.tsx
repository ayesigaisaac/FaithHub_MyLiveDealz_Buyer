import React, { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Clock3,
  Download,
  MapPin,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import UserActionBar from "@/pages/user/shared/UserActionBar";

type LiveItem = {
  id: number;
  title: string;
  institution: string;
  series: string;
  audience: string;
  viewers: string;
  latency: string;
  ticketed: boolean;
};

type UpcomingItem = {
  id: number;
  title: string;
  institution: string;
  series: string;
  audience: string;
  time: string;
  waitingRoom: boolean;
  ticketed: boolean;
};

type ReplayItem = {
  id: number;
  title: string;
  institution: string;
  series: string;
  audience: string;
  duration: string;
  cached: boolean;
};

const institutionOptions = [
  "All Institutions",
  "St. Marys Cathedral",
  "FaithHub Global Chapel",
  "Al Noor Community Centre",
  "Kingdom Youth Movement",
];

const seriesOptions = [
  "All Series",
  "Walking in Wisdom",
  "Mercy in Motion",
  "Women of Faith",
  "Raising Kingdom Leaders",
];

const audienceOptions = [
  "All Audiences",
  "General Community",
  "Youth Church",
  "Women Fellowship",
  "Family Ministry",
];

const liveNow: LiveItem[] = [
  {
    id: 1,
    title: "Evening Prayer Revival",
    institution: "St. Marys Cathedral",
    series: "Walking in Wisdom",
    audience: "General Community",
    viewers: "3.4k watching",
    latency: "Low latency",
    ticketed: false,
  },
  {
    id: 2,
    title: "Women Fellowship Reflection",
    institution: "Al Noor Community Centre",
    series: "Women of Faith",
    audience: "Women Fellowship",
    viewers: "920 watching",
    latency: "Ultra low latency",
    ticketed: true,
  },
];

const upcoming: UpcomingItem[] = [
  {
    id: 1,
    title: "Youth Impact Night",
    institution: "Kingdom Youth Movement",
    series: "Raising Kingdom Leaders",
    audience: "Youth Church",
    time: "Today - 8:00 PM",
    waitingRoom: true,
    ticketed: false,
  },
  {
    id: 2,
    title: "Mercy in Motion - Episode 5",
    institution: "FaithHub Global Chapel",
    series: "Mercy in Motion",
    audience: "Family Ministry",
    time: "Tomorrow - 7:30 PM",
    waitingRoom: true,
    ticketed: true,
  },
  {
    id: 3,
    title: "Family Quran Reflection",
    institution: "Al Noor Community Centre",
    series: "Quiet Strength",
    audience: "Family Ministry",
    time: "Tomorrow - 5:30 PM",
    waitingRoom: false,
    ticketed: false,
  },
];

const replays: ReplayItem[] = [
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

export default function FaithHubLiveHub() {
  const [query, setQuery] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState("All Institutions");
  const [seriesFilter, setSeriesFilter] = useState("All Series");
  const [audienceFilter, setAudienceFilter] = useState("All Audiences");
  const [offlineMode, setOfflineMode] = useState(false);
  const [dataSaver, setDataSaver] = useState(true);

  const matchesFilters = (
    item: {
      title: string;
      institution: string;
      series: string;
      audience: string;
    },
  ) => {
    const q = query.toLowerCase();
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.institution.toLowerCase().includes(q) ||
      item.series.toLowerCase().includes(q);
    const matchesInstitution =
      institutionFilter === "All Institutions" || item.institution === institutionFilter;
    const matchesSeries = seriesFilter === "All Series" || item.series === seriesFilter;
    const matchesAudience = audienceFilter === "All Audiences" || item.audience === audienceFilter;
    return matchesQuery && matchesInstitution && matchesSeries && matchesAudience;
  };

  const filteredLiveNow = useMemo(() => liveNow.filter(matchesFilters), [query, institutionFilter, seriesFilter, audienceFilter]);
  const filteredUpcoming = useMemo(() => upcoming.filter(matchesFilters), [query, institutionFilter, seriesFilter, audienceFilter]);
  const filteredReplays = useMemo(() => replays.filter(matchesFilters), [query, institutionFilter, seriesFilter, audienceFilter]);

  return (
    <div className="space-y-4">
      <Card className="fh-hero-card overflow-hidden rounded-[24px]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-slate-500">Live Hub</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">FaithHub Live Sessionz</h2>
              <p className="mt-2 text-sm text-slate-600">Now live, upcoming rooms, and replay continuity in one surface.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald hover:bg-emerald-50">
                  {filteredLiveNow.length} live now
                </Badge>
                <Badge className="fh-pill fh-pill-orange hover:bg-slate-100">
                  {filteredUpcoming.length} upcoming
                </Badge>
                <Badge className="fh-pill fh-pill-slate hover:bg-white">
                  {filteredReplays.length} replays
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[440px]">
              <label className="flex min-h-[42px] items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-slate-500">
                <Search className="h-4 w-4 shrink-0" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search sessions, institutions, or series"
                  className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button
                  variant="outline"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setDataSaver((prev) => !prev)}
                >
                  <Video className="mr-1.5 h-4 w-4" />
                  {dataSaver ? "Data saver" : "Full previews"}
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setOfflineMode((prev) => !prev)}
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  {offlineMode ? "Go online" : "Offline cache"}
                </Button>
                <Button
                  data-action-label="Join live"
                  className="h-10 rounded-xl bg-[#03cd8c] px-4 text-sm text-white hover:bg-[#03cd8c]"
                >
                  Join live
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <SelectFilter
              label="Institution"
              value={institutionFilter}
              options={institutionOptions}
              onChange={setInstitutionFilter}
            />
            <SelectFilter
              label="Series"
              value={seriesFilter}
              options={seriesOptions}
              onChange={setSeriesFilter}
            />
            <SelectFilter
              label="Audience"
              value={audienceFilter}
              options={audienceOptions}
              onChange={setAudienceFilter}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Live now"
          value={String(filteredLiveNow.length)}
          hint="Sessions currently streaming"
          tone="emerald"
          icon={<Radio className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Upcoming"
          value={String(filteredUpcoming.length)}
          hint="Sessions opening soon"
          tone="orange"
          icon={<CalendarDays className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Replays"
          value={String(filteredReplays.length)}
          hint="Catch-up sessions available"
          tone="slate"
          icon={<Video className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Network"
          value={offlineMode ? "Offline" : "Online"}
          hint={offlineMode ? "Schedules + cached replays" : dataSaver ? "Data saver active" : "Full quality mode"}
          tone={offlineMode ? "orange" : "emerald"}
          icon={offlineMode ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_1fr]">
        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Now Live"
              subtitle="Join active sessions with quality and audience context"
              action={
                <button
                  type="button"
                  data-action-label="Join live"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  Join live
                </button>
              }
            />

            <div className="space-y-2">
              {filteredLiveNow.map((item) => (
                <div key={item.id} className="rounded-xl border border-[var(--border)] bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.institution} · {item.series}</div>
                    </div>
                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">Live</span>
                  </div>

                  <div className="text-xs text-slate-500">{item.audience} · {item.viewers} · {item.latency}</div>

                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      data-action-label="Join live"
                      className="h-9 rounded-xl bg-[#03cd8c] px-3 text-xs font-semibold text-white hover:bg-[#03cd8c]"
                    >
                      Join live
                    </Button>
                    {item.ticketed ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#fff3e8] px-2 py-0.5 text-[11px] font-semibold text-[#cc6500]">
                        <Ticket className="h-3 w-3" /> Ticketed
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Upcoming Sessions"
              subtitle="Plan ahead and enter waiting rooms"
              action={
                <button
                  type="button"
                  data-action-label="Open room"
                  className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  Open room
                </button>
              }
            />

            <div className="space-y-2">
              {filteredUpcoming.map((item) => (
                <div key={item.id} className="rounded-xl border border-[var(--border)] bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.institution} · {item.series}</div>
                  <div className="mt-1 text-xs text-slate-600">{item.time} · {item.audience}</div>

                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      data-action-label={item.waitingRoom ? "Open room" : "Join live"}
                      className="h-9 rounded-xl bg-[#03cd8c] px-3 text-xs font-semibold text-white hover:bg-[#03cd8c]"
                    >
                      {item.waitingRoom ? "Open room" : "Join live"}
                    </Button>
                    {item.ticketed ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#fff3e8] px-2 py-0.5 text-[11px] font-semibold text-[#cc6500]">
                        <Ticket className="h-3 w-3" /> Ticketed
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-[var(--border)] bg-slate-50 p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Next launch</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{filteredUpcoming[0]?.title || "No upcoming sessions"}</div>
              <div className="mt-1 text-xs text-slate-500">{filteredUpcoming[0]?.time || "Check filters"}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Replay and live continuity actions"
              action={
                <button
                  type="button"
                  aria-label="Open live settings"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              }
            />

            <div className="space-y-2">
              <DashboardActionItem
                title="Open waiting room"
                detail="Enter pre-live agenda and interaction lane."
                actionLabel="Open room"
                tone="elevated"
              />
              <DashboardActionItem
                title="Join active session"
                detail="Jump into a current stream immediately."
                actionLabel="Join live"
              />
              <DashboardActionItem
                title="Watch replay"
                detail="Resume a cached or online replay session."
                actionLabel="Watch replay"
              />
            </div>

            <div className="mt-3 rounded-xl border border-emerald-100 bg-[#ecfff8] p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Live insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Early waiting-room entry improves completion and chat participation</div>
              <p className="mt-1 text-xs text-slate-600">
                Users entering before start time stay longer and return for replay at higher rates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader title="Replay Library" subtitle="Continue from recent sessions" />
            <div className="space-y-2">
              {filteredReplays.map((item) => (
                <DashboardActionItem
                  key={item.id}
                  title={item.title}
                  detail={`${item.institution} · ${item.duration} · ${item.cached ? "Cached" : "Online"}`}
                  actionLabel="Watch replay"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader title="Session Signals" subtitle="Readiness and trust posture" />
            <div className="grid grid-cols-2 gap-2">
              <SignalCard title="Latency" value={dataSaver ? "Optimized" : "Full quality"} icon={<Video className="h-4 w-4" />} />
              <SignalCard title="Trust" value="Moderated" icon={<ShieldCheck className="h-4 w-4" />} />
              <SignalCard title="Audience" value="Growing" icon={<Users className="h-4 w-4" />} />
              <SignalCard title="Venue" value="Mapped" icon={<MapPin className="h-4 w-4" />} />
            </div>
          </CardContent>
        </Card>
      </div>

      <UserActionBar
        actions={[
          {
            id: "livehub-join-live",
            label: "Join Live",
            dataActionLabel: "Join live",
            variant: "default",
          },
          {
            id: "livehub-open-room",
            label: "Open Room",
            dataActionLabel: "Open room",
          },
          {
            id: "livehub-watch-replay",
            label: "Replay",
            dataActionLabel: "Watch replay",
          },
        ]}
      />
    </div>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium tracking-normal text-slate-700"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SignalCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-slate-50 p-3">
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {icon}
        {title}
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}
