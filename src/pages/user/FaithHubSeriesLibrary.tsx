import React, { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Bookmark,
  CalendarDays,
  Download,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import UserActionBar from "@/pages/user/shared/UserActionBar";

type SeriesItem = {
  id: number;
  title: string;
  institution: string;
  topic: string;
  language: string;
  audience: string;
  episodes: number;
  progress: number;
  trailer: boolean;
  readingPlan: boolean;
  premium: boolean;
  sponsored: boolean;
  updated: string;
};

const seriesItems: SeriesItem[] = [
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
    updated: "Episode 5 tonight - 7:30 PM",
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
    updated: "Replay available - Episode 3",
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
  "Walking in Wisdom - Trailer",
  "Mercy in Motion - Study Notes",
  "Faith That Builds - Episode 6 audio",
  "Raising Kingdom Leaders - Reading Plan",
];

const topicOptions = ["All", "Wisdom", "Compassion", "Leadership", "Growth", "Healing", "Community"];
const languageOptions = ["All", "English", "Arabic", "French"];
const audienceOptions = ["All", "General Community", "Youth Church", "Women Fellowship", "Family Ministry"];

export default function FaithHubSeriesLibrary() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [language, setLanguage] = useState("All");
  const [audience, setAudience] = useState("All");
  const [offlineMode, setOfflineMode] = useState(false);
  const [smartReminders, setSmartReminders] = useState(true);

  const filteredSeries = useMemo(() => {
    return seriesItems.filter((item) => {
      const query = search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.institution.toLowerCase().includes(query);
      const matchesTopic = topic === "All" || item.topic === topic;
      const matchesLanguage = language === "All" || item.language === language;
      const matchesAudience = audience === "All" || item.audience === audience;

      return matchesSearch && matchesTopic && matchesLanguage && matchesAudience;
    });
  }, [search, topic, language, audience]);

  const premiumCount = useMemo(
    () => filteredSeries.filter((item) => item.premium).length,
    [filteredSeries],
  );

  const sponsoredCount = useMemo(
    () => filteredSeries.filter((item) => item.sponsored).length,
    [filteredSeries],
  );

  return (
    <div className="space-y-4">
      <Card className="fh-interactive-card fh-hero-card overflow-hidden rounded-[24px]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label fh-user-kicker">Series Library</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">FaithHub Series</h2>
              <p className="mt-2 text-base text-[var(--text-secondary)]">Discover and continue structured teaching journeys across institutions.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">
                  {filteredSeries.length} series visible
                </Badge>
                <Badge className="fh-pill fh-pill-slate">
                  {premiumCount} premium
                </Badge>
                <Badge className="fh-pill fh-pill-orange">
                  {sponsoredCount} sponsored
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[360px] 2xl:min-w-[430px]">
              <label className="fh-user-input text-base">
                <Search className="h-4 w-4 shrink-0" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search series or institution"
                  className="w-full text-base"
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button
                  variant="outline"
                  className="fh-user-secondary-btn h-10 rounded-xl px-4 text-base"
                  onClick={() => setSmartReminders((prev) => !prev)}
                >
                  <CalendarDays className="mr-1.5 h-4 w-4" />
                  {smartReminders ? "Reminders on" : "Reminders off"}
                </Button>
                <Button
                  variant="outline"
                  className="fh-user-secondary-btn h-10 rounded-xl px-4 text-base"
                  onClick={() => setOfflineMode((prev) => !prev)}
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  {offlineMode ? "Go online" : "Offline assets"}
                </Button>
                <Button
                  data-action-label="Open series"
                  className="fh-user-primary-btn h-10 rounded-xl px-4 text-base"
                >
                  Open series
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <SelectFilter label="Topic" value={topic} options={topicOptions} onChange={setTopic} />
            <SelectFilter label="Language" value={language} options={languageOptions} onChange={setLanguage} />
            <SelectFilter label="Audience" value={audience} options={audienceOptions} onChange={setAudience} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Filtered"
          value={String(filteredSeries.length)}
          hint="Results match your filters"
          tone="emerald"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Premium"
          value={String(premiumCount)}
          hint="Membership-enabled access"
          tone="orange"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Sponsored"
          value={String(sponsoredCount)}
          hint="Clearly labeled placements"
          tone="slate"
          icon={<Star className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Offline"
          value={offlineMode ? "On" : "Off"}
          hint={offlineMode ? "Using cached assets" : "Live catalog mode"}
          tone={offlineMode ? "orange" : "emerald"}
          icon={offlineMode ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="fh-interactive-card fh-surface-card rounded-2xl xl:col-span-8">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Series Results"
              subtitle="Progress, updates, and access labels"
              action={
                <button
                  type="button"
                  data-action-label="Open series"
                  className="text-base font-semibold text-[var(--text-secondary)]"
                >
                  Open series
                </button>
              }
            />

            <div className="grid gap-2 sm:grid-cols-2">
              {filteredSeries.map((item) => (
                <div key={item.id} className="fh-subcard rounded-xl p-3">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-base font-semibold text-[var(--text-primary)]">{item.title}</div>
                      <div className="mt-1 text-sm text-[var(--text-secondary)]">{item.institution}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {item.premium ? (
                        <span className="fh-pill fh-pill-slate">Premium</span>
                      ) : null}
                      {item.sponsored ? (
                        <span className="fh-pill fh-pill-orange">Sponsored</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="text-sm text-[var(--text-secondary)]">{item.topic} - {item.language} - {item.audience}</div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">{item.updated}</div>

                  <div className="mt-2 h-1.5 rounded-full bg-[color-mix(in_srgb,var(--border)_78%,transparent_22%)]">
                    <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${item.progress}%` }} />
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-secondary)]">Progress {item.progress}% - {item.episodes} episodes</div>

                  <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                    {item.trailer ? (
                      <span className="fh-pill fh-pill-emerald inline-flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" /> Trailer
                      </span>
                    ) : null}
                    {item.readingPlan ? (
                      <span className="fh-pill fh-pill-emerald inline-flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> Plan
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <Button
                      data-action-label="Open series"
                      className="fh-user-primary-btn h-9 rounded-xl px-3 text-sm font-semibold"
                    >
                      Open series
                    </Button>
                    <button
                      type="button"
                      className="fh-user-secondary-btn inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)]"
                      aria-label="Bookmark series"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid content-start gap-4 xl:col-span-4">
          <Card className="fh-interactive-card fh-surface-card rounded-2xl">
            <CardContent className="p-4 sm:p-5">
              <DashboardSectionHeader
                title="Downloaded Assets"
                subtitle="Continue learning while offline"
              />

              <div className="space-y-2">
                {downloadedAssets.map((item) => (
                  <div key={item} className="fh-subcard rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <span className="fh-user-icon-badge">
                        <Download className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-base font-semibold text-[var(--text-primary)]">{item}</div>
                        <div className="mt-1 text-sm text-[var(--text-secondary)]">Offline ready - Cached successfully</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 fh-subcard-muted rounded-xl p-3">
                <div className="fh-label text-[var(--text-muted)]">Smart reminders</div>
                <div className="mt-1 text-base font-semibold text-[var(--text-primary)]">{smartReminders ? "Enabled" : "Disabled"}</div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">Get nudges based on your watch progression and reading plan checkpoints.</div>
              </div>
            </CardContent>
          </Card>

          <Card className="fh-interactive-card fh-surface-card rounded-2xl">
            <CardContent className="p-4 sm:p-5">
              <DashboardSectionHeader
                title="Action Center"
                subtitle="Fast actions for series exploration"
                action={
                <button
                  type="button"
                  aria-label="Open series settings"
                  className="fh-user-secondary-btn inline-flex h-8 w-8 items-center justify-center rounded-lg"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
                }
              />

              <div className="space-y-2">
                <DashboardActionItem
                  title="Open featured series"
                  detail="Jump directly into the highest engagement series."
                  actionLabel="Open series"
                  tone="elevated"
                />
                <DashboardActionItem
                  title="Unlock premium access"
                  detail="Access deeper study paths and exclusive attachments."
                  actionLabel="Unlock premium"
                />
                <DashboardActionItem
                  title="View membership benefits"
                  detail="Compare premium series benefits and support options."
                  actionLabel="View benefits"
                />
                <DashboardActionItem
                  title="Continue watching"
                  detail="Resume where you stopped in your latest replay."
                  actionLabel="Open series"
                />
              </div>

              <div className="mt-3 fh-subcard-accent rounded-xl p-3">
                <div className="fh-label text-[var(--accent)]">Insight</div>
                <div className="mt-1 text-base font-semibold text-[var(--text-primary)]">Series with reading plans retain more returning viewers</div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Enabling reminders around reading checkpoints improves replay completion.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Notifications"
          value={smartReminders ? "On" : "Off"}
          hint="Reminder automation state"
          tone={smartReminders ? "emerald" : "slate"}
          icon={<Bell className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Languages"
          value="2"
          hint="English and Arabic coverage"
          tone="slate"
          icon={<Languages className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Faith topics"
          value="6"
          hint="Current discovery categories"
          tone="orange"
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Trust"
          value="Verified"
          hint="Series come from verified institutions"
          tone="emerald"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
      </div>

      <UserActionBar
        actions={[
          {
            id: "series-open-series",
            label: "Open Series",
            dataActionLabel: "Open series",
            variant: "default",
          },
          {
            id: "series-unlock",
            label: "Unlock",
            dataActionLabel: "Unlock premium",
          },
          {
            id: "series-benefits",
            label: "Benefits",
            dataActionLabel: "View benefits",
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
    <label className="fh-user-filter">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full"
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

