import { readJsonVersioned, writeJsonVersioned } from "@/data/adapters/storage";
import type { EventsRepository } from "@/data/interfaces/events-repository";
import type { CalendarEvent } from "@/types/events";

const STORAGE_KEY = "faithhub.events.v1";
const SCHEMA_VERSION = 1;

export const seedEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Morning Prayer Gathering",
    date: "2026-04-03",
    startTime: "09:00",
    endTime: "11:30",
    location: "FaithHub Main Hall",
    description: "A guided prayer and worship session for all ministries.",
    eventType: "service",
    agenda: [
      { time: "09:00", title: "Opening Prayer" },
      { time: "10:00", title: "Worship Session" },
      { time: "11:00", title: "Scripture Reflection" },
    ],
  },
  {
    id: "event-2",
    title: "Youth Leadership Workshop",
    date: "2026-04-05",
    startTime: "14:00",
    endTime: "17:30",
    location: "Community Training Center",
    description: "Interactive workshop on mentorship, service, and leadership.",
    eventType: "conference",
    agenda: [
      { time: "14:00", title: "Welcome and Introductions" },
      { time: "15:00", title: "Team Building Session", description: "Facilitated breakout circles" },
      { time: "16:15", title: "Action Planning" },
    ],
  },
  {
    id: "event-3",
    title: "Neighborhood Outreach Drive",
    date: "2026-04-08",
    startTime: "10:30",
    endTime: "13:00",
    location: "Makindye Community Grounds",
    description: "Outreach activities with community support and prayer partners.",
    eventType: "community",
  },
  {
    id: "event-4",
    title: "Security Readiness Briefing",
    date: "2026-04-10",
    startTime: "08:00",
    endTime: "09:15",
    location: "Operations Room",
    description: "Urgent briefing for event coordinators and volunteer captains.",
    eventType: "urgent",
  },
];

function isCalendarEvent(candidate: unknown): candidate is CalendarEvent {
  if (!candidate || typeof candidate !== "object") return false;
  const event = candidate as CalendarEvent;
  return Boolean(event.id && event.title && event.date && event.startTime && event.endTime);
}

function reviveEvents(value: unknown): CalendarEvent[] | null {
  if (!Array.isArray(value)) return [];
  return value.filter(isCalendarEvent);
}

export function readEventsSync() {
  return readJsonVersioned(STORAGE_KEY, [] as CalendarEvent[], {
    currentVersion: SCHEMA_VERSION,
    reviveData: reviveEvents,
    migrate: (legacyData) => reviveEvents(legacyData),
  });
}

export function writeEventsSync(events: CalendarEvent[]) {
  writeJsonVersioned(STORAGE_KEY, events, SCHEMA_VERSION);
}

class MockEventsRepository implements EventsRepository {
  async getEvents() {
    return readEventsSync();
  }

  async saveEvents(events: CalendarEvent[]) {
    writeEventsSync(events);
    return readEventsSync();
  }
}

export const eventsRepository: EventsRepository = new MockEventsRepository();
