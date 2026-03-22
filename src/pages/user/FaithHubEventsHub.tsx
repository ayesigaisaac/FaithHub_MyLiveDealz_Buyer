import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  MessageSquare,
  Sparkles,
  Tent,
  Ticket,
  Users,
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
import type { CalendarDay, EventItem } from "@/pages/user/events/types";

const eventFeed: EventItem[] = [
  {
    id: 1,
    title: "Youth Worship Camp",
    type: "Camp",
    audience: "Youth Church",
    venue: "Lake Victoria Retreat Centre",
    area: "Entebbe",
    start: "12 Aug",
    end: "15 Aug",
    time: "4 days",
    institution: "Kingdom Youth Movement",
    memberOnly: false,
    ticketed: true,
    rsvp: "Going",
    spotlight: "Registration closes in 3 days",
  },
  {
    id: 2,
    title: "Baptism Sunday",
    type: "Baptism",
    audience: "General Community",
    venue: "St. Marys Cathedral Grounds",
    area: "Kampala Central",
    start: "01 Sep",
    end: "01 Sep",
    time: "9:00 AM",
    institution: "St. Marys Cathedral",
    memberOnly: false,
    ticketed: false,
    rsvp: "Interested",
    spotlight: "Orientation class this Saturday",
  },
  {
    id: 3,
    title: "Women of Faith Retreat",
    type: "Conference",
    audience: "Women Fellowship",
    venue: "Mount Zion Convention Hall",
    area: "Mukono",
    start: "18 Sep",
    end: "20 Sep",
    time: "3 days",
    institution: "FaithHub Global Chapel",
    memberOnly: true,
    ticketed: true,
    rsvp: "Not yet",
    spotlight: "Members get early access today",
  },
];

const calendarDays: CalendarDay[] = [
  { day: "12", label: "Camp starts" },
  { day: "15", label: "Camp close" },
  { day: "22", label: "Market day" },
  { day: "01", label: "Baptism" },
];

export default function FaithHubEventsHub() {
  const [query, setQuery] = useState("");
  const [showMap, setShowMap] = useState(false);

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return eventFeed;

    return eventFeed.filter((event) => {
      return (
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.venue.toLowerCase().includes(normalizedQuery) ||
        event.institution.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  const ticketedCount = useMemo(
    () => filteredEvents.filter((event) => event.ticketed).length,
    [filteredEvents],
  );

  const goingCount = useMemo(
    () => filteredEvents.filter((event) => event.rsvp === "Going").length,
    [filteredEvents],
  );

  return (
    <div className="space-y-4">
      <Card className="fh-interactive-card overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(108deg,rgba(3,205,140,0.1),rgba(248,251,252,0.94)_34%,rgba(247,127,0,0.12))] shadow-[var(--shadow-soft)]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-slate-500">Events Hub</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">FaithHub Events</h2>
              <p className="mt-2 text-sm text-slate-600">Track worship events, RSVP status, tickets, and live entry points.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  {filteredEvents.length} events found
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-100">
                  {ticketedCount} ticketed
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-white">
                  {goingCount} marked going
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[430px]">
              <label className="flex min-h-[42px] items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-slate-500">
                <Sparkles className="h-4 w-4 shrink-0" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search events or venue"
                  className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setShowMap(false)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      !showMap ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      showMap ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Map
                  </button>
                </div>

                <Button
                  variant="outline"
                  data-action-label="Open event"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Open event
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

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <ModuleCard
              icon={<Tent className="h-5 w-5" />}
              title="Featured Event"
              description="Open spotlight event details and schedule"
              actionLabel="Open event"
            />
            <ModuleCard
              icon={<Ticket className="h-5 w-5" />}
              title="My Passes"
              description="View passes and confirmations"
              actionLabel="Open event"
            />
            <ModuleCard
              icon={<CalendarDays className="h-5 w-5" />}
              title="Event Calendar"
              description="Switch to timeline-based planning"
              actionLabel="Open event"
            />
            <ModuleCard
              icon={<Users className="h-5 w-5" />}
              title="Join Live"
              description="Enter live waiting room for active events"
              actionLabel="Join live"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Events"
          value={String(filteredEvents.length)}
          hint="Matched current query"
          tone="emerald"
          icon={<CalendarDays className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Ticketed"
          value={String(ticketedCount)}
          hint="Requires pass or registration"
          tone="orange"
          icon={<Ticket className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Going"
          value={String(goingCount)}
          hint="Already RSVPed"
          tone="slate"
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Map Mode"
          value={showMap ? "On" : "Off"}
          hint="Venue-aware event context"
          tone="emerald"
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_1fr]">
        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title={showMap ? "Event Map Markers" : "Event Feed"}
              subtitle={showMap ? "Venue distribution and quick event open" : "Current and upcoming events for your circles"}
              action={
                <button
                  type="button"
                  data-action-label="Open event"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  View event
                </button>
              }
            />

            {showMap ? (
              <div className="relative h-[300px] overflow-hidden rounded-xl border border-[var(--border)] bg-[linear-gradient(145deg,#f8fbfc,#eef3f7)] sm:h-[340px]">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:34px_34px]" />

                {filteredEvents.map((event, index) => (
                  <button
                    key={event.id}
                    type="button"
                    data-action-label="Open event"
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${22 + index * 25}%`, top: `${35 + (index % 2) * 25}%` }}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#03cd8c] text-white shadow-sm">
                      <MapPin className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    data-action-label="Open event"
                    className="group w-full rounded-xl border border-[var(--border)] bg-white p-3 text-left transition hover:border-[#c8f0e0]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{event.title}</div>
                        <div className="mt-1 text-xs text-slate-500">{event.institution} · {event.venue}</div>
                        <div className="mt-1 text-xs text-slate-500">{event.start} · {event.time}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          {event.rsvp}
                        </span>
                        {event.ticketed ? (
                          <span className="rounded-full bg-[#fff3e8] px-2 py-0.5 text-[11px] font-semibold text-[#cc6500]">
                            Ticketed
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Event Timeline"
              subtitle="Upcoming day markers and quick context"
              action={
                <button
                  type="button"
                  data-action-label="Open event"
                  className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  Open event
                </button>
              }
            />

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
              {calendarDays.map((day) => (
                <div key={day.day} className="fh-subcard-muted rounded-xl p-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Day</div>
                  <div className="mt-1 text-xl font-bold text-slate-900">{day.day}</div>
                  <div className="mt-1 text-xs text-slate-500">{day.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 fh-subcard-muted rounded-xl p-3">
              <div className="fh-label text-slate-400">Session readiness</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">67%</div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[67%] rounded-full bg-[#03cd8c]" />
              </div>
              <div className="mt-2 text-xs text-slate-500">Most sessions are ready; ticket reminders still pending.</div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Fast event actions"
              action={
                <button
                  type="button"
                  aria-label="Open event settings"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              }
            />

            <div className="space-y-2">
              <DashboardActionItem
                title="Open featured event"
                detail="Jump into the spotlight event details and RSVP actions."
                actionLabel="Open event"
                tone="elevated"
              />
              <DashboardActionItem
                title="Join live session"
                detail="Enter the active waiting room and chat lane."
                actionLabel="Join live"
              />
              <DashboardActionItem
                title="Review passes"
                detail="Check confirmed seats and access status."
                actionLabel="Open event"
              />
            </div>

            <div className="mt-3 fh-subcard-accent rounded-xl p-3">
              <div className="fh-label text-emerald-700">Smart insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Events with reminders see stronger attendance completion</div>
              <p className="mt-1 text-xs text-slate-600">
                Sending reminders within 45 minutes of start time increases confirmed attendance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Now"
          value="2 live"
          hint="Events currently active"
          tone="emerald"
          icon={<Tent className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Next start"
          value="2h 10m"
          hint="Youth Impact Night"
          tone="orange"
          icon={<Clock3 className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Audience"
          value="Growing"
          hint="RSVP trend remains positive"
          tone="slate"
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Messages"
          value="On"
          hint="Reminder channel active"
          tone="emerald"
          icon={<MessageSquare className="h-4 w-4" />}
        />
      </div>

      <UserActionBar
        actions={[
          {
            id: "events-open-event",
            label: "Open event",
            dataActionLabel: "Open event",
            variant: "default",
          },
          {
            id: "events-join-live",
            label: "Join live",
            dataActionLabel: "Join live",
          },
        ]}
      />
    </div>
  );
}

function ModuleCard({
  icon,
  title,
  description,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
}) {
  return (
    <button
      type="button"
      data-action-label={actionLabel}
      className="group w-full rounded-2xl border border-[var(--border)] bg-white/90 p-4 text-left transition hover:border-[#c8f0e0] hover:bg-white"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfff8] text-[#049e6d]">
        {icon}
      </div>
      <div className="mt-3 text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{description}</div>
    </button>
  );
}

