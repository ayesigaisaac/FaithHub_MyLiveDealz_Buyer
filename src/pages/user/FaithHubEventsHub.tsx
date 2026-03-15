import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Tent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import UserPageShell from "@/pages/user/shared/UserPageShell";
import UserPageHeader from "@/pages/user/shared/UserPageHeader";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import EventsHero from "@/pages/user/events/components/EventsHero";
import EventsCalendarStrip from "@/pages/user/events/components/EventsCalendarStrip";
import EventsFeed from "@/pages/user/events/components/EventsFeed";
import MyPassesCard from "@/pages/user/events/components/MyPassesCard";
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
  const [offlineMode] = useState(false);

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

  return (
    <UserPageShell
      header={
        <UserPageHeader
          icon={<Tent className="h-5 w-5" />}
          title="Events Hub"
          offline={offlineMode}
          offlineLabel="Cached events with RSVP queue"
        />
      }
      hero={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4"
        >
          <EventsHero
            query={query}
            onQueryChange={setQuery}
            showMap={showMap}
            onToggleView={() => setShowMap((prev) => !prev)}
          />
        </motion.div>
      }
      main={
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <EventsCalendarStrip days={calendarDays} />
          </motion.div>

          {showMap ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Event map</div>
                    <div className="text-sm text-slate-500">
                      Venue-aware view for quick location context.
                    </div>
                  </div>

                  <div className="relative h-[460px] overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:36px_36px]" />
                    <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                      Kampala and nearby venues
                    </div>

                    {filteredEvents.map((event, index) => (
                      <button
                        key={event.id}
                        type="button"
                        data-action-label="Open event"
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${20 + index * 25}%`,
                          top: `${35 + (index % 2) * 25}%`,
                        }}
                      >
                        <div className="group relative">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#03cd8c] shadow-lg">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                          <div className="absolute left-1/2 top-14 hidden w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-xl group-hover:block">
                            <div className="mb-1 text-sm font-semibold text-slate-900">{event.title}</div>
                            <div className="text-xs text-slate-500">{event.venue}</div>
                            <div className="mt-2 text-xs text-slate-600">
                              {event.start} - {event.time}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <EventsFeed events={filteredEvents} />
            </motion.div>
          )}
        </>
      }
      aside={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.4 }}
        >
          <MyPassesCard showMap={showMap} />
        </motion.div>
      }
      stickyFooter={
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
      }
    />
  );
}

