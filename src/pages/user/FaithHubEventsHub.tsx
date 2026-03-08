// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  Compass,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Tent,
  Ticket,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const eventTypes = [
  "All",
  "Camp",
  "Trip",
  "Baptism",
  "Crusade",
  "Mission",
  "Marketplace Day",
  "Conference",
];

const audienceGroups = [
  "All",
  "General Community",
  "Youth Church",
  "Women Fellowship",
  "Family Ministry",
  "Members Only",
];

const events = [
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
    x: "26%",
    y: "42%",
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
    x: "48%",
    y: "34%",
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
    x: "67%",
    y: "46%",
    spotlight: "Members get early access today",
  },
  {
    id: 4,
    title: "Marketplace Day",
    type: "Marketplace Day",
    audience: "General Community",
    venue: "Community Square",
    area: "Ntinda",
    start: "22 Aug",
    end: "22 Aug",
    time: "10:00 AM",
    institution: "House of Grace",
    memberOnly: false,
    ticketed: true,
    rsvp: "Going",
    x: "58%",
    y: "61%",
    spotlight: "Vendor booths available in FaithMart",
  },
  {
    id: 5,
    title: "Mission Outreach Weekend",
    type: "Mission",
    audience: "Family Ministry",
    venue: "Rural Outreach Field",
    area: "Jinja",
    start: "05 Oct",
    end: "06 Oct",
    time: "2 days",
    institution: "Al Noor Community Centre",
    memberOnly: false,
    ticketed: false,
    rsvp: "Interested",
    x: "77%",
    y: "27%",
    spotlight: "Travel notes and kit checklist ready",
  },
];

const calendarDays = [
  { day: "12", active: true, label: "Camp" },
  { day: "15", active: true, label: "Camp close" },
  { day: "22", active: true, label: "Market" },
  { day: "01", active: true, label: "Baptism" },
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

export default function FaithHubEventsHub() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [mapMode, setMapMode] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showMembersOnly, setShowMembersOnly] = useState(true);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery =
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.venue.toLowerCase().includes(query.toLowerCase()) ||
        event.institution.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === "All" || event.type === typeFilter;
      const matchesAudience = audienceFilter === "All" || event.audience === audienceFilter;
      const matchesMemberVisibility = showMembersOnly ? true : !event.memberOnly;
      return matchesQuery && matchesType && matchesAudience && matchesMemberVisibility;
    });
  }, [query, typeFilter, audienceFilter, showMembersOnly]);

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
              <Tent className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Events Hub</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Cached events  RSVP queued" : "Live calendar + map"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Camps, trips, baptisms, missions, marketplace days</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Map + calendar + RSVP</Badge>
                  </div>

                  <div className="max-w-3xl space-y-3">
                    <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Faith events across institutions</div>
                    <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                      Discover the next gathering, plan it on your calendar, and move from RSVP to ticketing without losing context.
                    </h1>
                    <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                      The events hub brings together camps, trips, baptisms, crusades, missions, conferences, and marketplace days in one responsive experience with map context, calendar visibility, and FaithMart ticketing.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search event, venue, or institution"
                        className="h-12 w-full rounded-2xl border border-white/20 bg-white/12 pl-11 pr-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:border-white/45 focus:bg-white/18"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setMapMode((prev) => !prev)}
                    >
                      <Compass className="mr-2 h-4 w-4" />
                      {mapMode ? "Calendar view" : "Map view"}
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
                  subtitle="Narrow the hub by event type and audience group."
                  action="Reset"
                />
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Event type</div>
                    <div className="flex flex-wrap gap-2">
                      {eventTypes.map((item) => (
                        <FilterChip key={item} label={item} active={typeFilter === item} onClick={() => setTypeFilter(item)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Audience group</div>
                    <div className="flex flex-wrap gap-2">
                      {audienceGroups.map((item) => (
                        <FilterChip key={item} label={item} active={audienceFilter === item} onClick={() => setAudienceFilter(item)} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={showMembersOnly ? "outline" : "default"}
                      className={showMembersOnly ? "rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" : "rounded-full bg-[#03cd8c] hover:bg-[#02b67c]"}
                      onClick={() => setShowMembersOnly((prev) => !prev)}
                    >
                      {showMembersOnly ? "Hide members-only events" : "Show members-only events"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="Events list"
                  subtitle="Responsive cards with RSVP state, access level, and FaithMart readiness."
                />
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <div className="text-lg font-semibold text-slate-900">{event.title}</div>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{event.type}</span>
                            {event.memberOnly && (
                              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">Members only</span>
                            )}
                            {event.ticketed && (
                              <span className="rounded-full bg-[#fff8ef] px-2.5 py-1 text-xs font-semibold text-[#f77f00]">FaithMart ticketing</span>
                            )}
                          </div>
                          <div className="text-sm text-slate-500">{event.institution}</div>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                              <CalendarDays className="h-4 w-4 text-[#03cd8c]" />
                              {event.start} {event.end !== event.start ? `- ${event.end}` : ""}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                              <Clock3 className="h-4 w-4 text-[#03cd8c]" />
                              {event.time}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
                              <MapPin className="h-4 w-4 text-[#03cd8c]" />
                              {event.area}
                            </span>
                          </div>
                          <div className="mt-3 text-sm text-slate-600">{event.spotlight}</div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-2 text-xs font-semibold ${event.rsvp === "Going" ? "bg-[#ecfff8] text-[#03cd8c]" : event.rsvp === "Interested" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                            RSVP: {event.rsvp}
                          </span>
                          <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Open</Button>
                          <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                            Add to calendar
                          </Button>
                        </div>
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
                  title={mapMode ? "Event map" : "Event calendar"}
                  subtitle={mapMode ? "Visualize where gatherings are happening." : "Key dates across the current month."}
                  action="Expand"
                />

                {mapMode ? (
                  <div className="relative h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-white/10 backdrop-blur">
                    <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
                    <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                      Kampala region and surrounding venues
                    </div>
                    {filteredEvents.map((event) => (
                      <button
                        key={event.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: event.x, top: event.y }}
                      >
                        <div className="group relative">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-white shadow-lg ${event.memberOnly ? "bg-slate-900" : event.ticketed ? "bg-[#f77f00]" : "bg-[#03cd8c]"}`}>
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                          <div className="absolute left-1/2 top-14 hidden w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-xl group-hover:block">
                            <div className="mb-1 text-sm font-semibold text-slate-900">{event.title}</div>
                            <div className="text-xs text-slate-500">{event.venue}</div>
                            <div className="mt-2 text-xs text-slate-600">{event.start}  {event.time}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <div className="mb-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day}>{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 35 }).map((_, index) => {
                        const dayNumber = index - 2;
                        const activeDay = calendarDays.find((item) => item.day === String(dayNumber).padStart(2, '0'));
                        return (
                          <div
                            key={index}
                            className={`min-h-[68px] rounded-2xl border p-2 text-sm ${activeDay ? 'border-white/25 bg-white/15 text-white' : 'border-white/10 bg-white/5 text-white/50'}`}
                          >
                            {dayNumber > 0 && dayNumber <= 31 ? (
                              <>
                                <div className="font-semibold">{dayNumber}</div>
                                {activeDay && <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/80">{activeDay.label}</div>}
                              </>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <SectionHeader
                  title="RSVP and calendar behavior"
                  subtitle="RSVPs can queue offline while calendar actions stay visible."
                  action="Manage"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                    Users can respond as Going, Interested, or Not Going, and queued RSVP changes can sync automatically once connectivity returns.
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-4">
                    Add-to-calendar actions can generate event objects compatible with standard calendar apps and calendar syncing workflows.
                  </div>
                  <div className="rounded-[24px] border border-[#03cd8c]/15 bg-[#ecfff8] p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" /> Queue state
                    </div>
                    <div>When offline mode is active, RSVP actions are staged and clearly marked until they are submitted online.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f77f00]">Monetization</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">FaithMart ticketing and event commerce</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">FaithMart linked</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Ticketed events can route into FaithMart for participant passes, camp packages, and vendor booth reservations.
                  </div>
                  <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
                    Member-only events can remain visible but clearly marked, with access unlocked through membership or institution approval.
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                    <Ticket className="mr-2 h-4 w-4" /> Open ticketing workflows
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

