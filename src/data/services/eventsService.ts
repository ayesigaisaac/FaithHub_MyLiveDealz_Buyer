import { repositoryFactory } from "@/data/repositories/factory";
import { readEventsSync, seedEvents, writeEventsSync } from "@/data/repositories/eventsRepository";
import { simulateLatency } from "@/data/services/runtime";
import type { CalendarEvent } from "@/types/events";

function sortEvents(events: CalendarEvent[]) {
  return events.slice().sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`));
}

function mergeSeedEvents(events: CalendarEvent[]) {
  const byId = new Map<string, CalendarEvent>();
  for (const event of [...seedEvents, ...events]) {
    byId.set(event.id, event);
  }
  return sortEvents(Array.from(byId.values()));
}

export function getEventsSync() {
  return mergeSeedEvents(readEventsSync());
}

export function saveEventsSync(events: CalendarEvent[]) {
  writeEventsSync(events);
  return getEventsSync();
}

export async function getEvents() {
  await simulateLatency();
  const events = await repositoryFactory.events.getEvents();
  return mergeSeedEvents(events);
}

export async function saveEvents(events: CalendarEvent[]) {
  await simulateLatency();
  await repositoryFactory.events.saveEvents(events);
  return getEvents();
}
