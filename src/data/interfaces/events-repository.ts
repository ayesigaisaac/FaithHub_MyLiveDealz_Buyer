import type { CalendarEvent } from "@/types/events";

export interface EventsRepository {
  getEvents(): Promise<CalendarEvent[]>;
  saveEvents(events: CalendarEvent[]): Promise<CalendarEvent[]>;
}
