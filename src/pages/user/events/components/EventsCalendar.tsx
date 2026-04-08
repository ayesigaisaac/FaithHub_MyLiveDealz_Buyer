import React, { memo, useMemo } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CalendarEvent, CalendarView } from "@/types/events";

export type { CalendarEvent, CalendarView, EventAgendaItem } from "@/types/events";

type EventsCalendarProps = {
  events: CalendarEvent[];
  view: CalendarView;
  cursorDate: Date;
  selectedEventId?: string | null;
  onSelectEvent: (event: CalendarEvent) => void;
  onCursorDateChange: (date: Date) => void;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, delta: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}

function addMonths(date: Date, delta: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + delta);
  return next;
}

function startOfWeek(date: Date) {
  const normalized = startOfDay(date);
  const offset = normalized.getDay();
  return addDays(normalized, -offset);
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function eventBadgeClass(eventType?: CalendarEvent["eventType"]) {
  if (eventType === "urgent") return "border-[rgba(239,68,68,0.45)] bg-[rgba(239,68,68,0.14)] text-[#ef4444]";
  if (eventType === "conference")
    return "border-[rgba(247,127,0,0.38)] bg-[rgba(247,127,0,0.12)] text-[#f77f00]";
  if (eventType === "community")
    return "border-[rgba(3,205,140,0.35)] bg-[rgba(3,205,140,0.14)] text-[var(--accent)]";
  return "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]";
}

function calendarLabel(view: CalendarView, cursorDate: Date) {
  if (view === "day") {
    return cursorDate.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  if (view === "week") {
    const weekStart = startOfWeek(cursorDate);
    const weekEnd = addDays(weekStart, 6);
    return `${weekStart.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })} - ${weekEnd.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }

  return cursorDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function nextCursorDate(view: CalendarView, cursorDate: Date, direction: "prev" | "next") {
  const delta = direction === "next" ? 1 : -1;
  if (view === "day") return addDays(cursorDate, delta);
  if (view === "week") return addDays(cursorDate, 7 * delta);
  return addMonths(cursorDate, delta);
}

function EventsCalendarComponent({
  events,
  view,
  cursorDate,
  selectedEventId,
  onSelectEvent,
  onCursorDateChange,
}: EventsCalendarProps) {
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const key = event.date;
      const existing = map.get(key) || [];
      existing.push(event);
      existing.sort((a, b) => a.startTime.localeCompare(b.startTime));
      map.set(key, existing);
    }
    return map;
  }, [events]);

  const monthGridDays = useMemo(() => {
    if (view !== "month") return [];
    const firstOfMonth = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), 1);
    const gridStart = addDays(firstOfMonth, -firstOfMonth.getDay());
    return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  }, [cursorDate, view]);

  const weekDays = useMemo(() => {
    if (view !== "week") return [];
    const start = startOfWeek(cursorDate);
    return Array.from({ length: 7 }, (_, index) => addDays(start, index));
  }, [cursorDate, view]);

  const dayEvents = useMemo(() => {
    if (view !== "day") return [];
    return eventsByDate.get(formatDateKey(cursorDate)) || [];
  }, [cursorDate, eventsByDate, view]);

  const dayHeadings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="fh-surface-card rounded-[24px]">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="fh-label text-[var(--text-muted)]">Events Calendar</div>
            <div className="mt-1 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)]">
              <CalendarDays className="h-5 w-5 text-[var(--accent)]" />
              <span className="truncate">{calendarLabel(view, cursorDate)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              uiSize="sm"
              className="fh-user-secondary-btn"
              onClick={() => onCursorDateChange(nextCursorDate(view, cursorDate, "prev"))}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              variant="outline"
              uiSize="sm"
              className="fh-user-secondary-btn"
              onClick={() => onCursorDateChange(startOfDay(new Date()))}
            >
              Today
            </Button>
            <Button
              variant="outline"
              uiSize="sm"
              className="fh-user-secondary-btn"
              onClick={() => onCursorDateChange(nextCursorDate(view, cursorDate, "next"))}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 transition-all duration-200">
          {view === "month" ? (
            <div className="overflow-x-auto">
              <div className="grid min-w-[640px] grid-cols-7 gap-2 sm:min-w-[760px]">
                {dayHeadings.map((heading) => (
                  <div
                    key={heading}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-1.5 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)] sm:px-2 sm:text-xs"
                  >
                    {heading}
                  </div>
                ))}

                {monthGridDays.map((day) => {
                  const dayKey = formatDateKey(day);
                  const cellEvents = eventsByDate.get(dayKey) || [];
                  const isInMonth = day.getMonth() === cursorDate.getMonth();
                  const isToday = dayKey === formatDateKey(new Date());

                  return (
                    <div
                      key={dayKey}
                      className={`min-h-[96px] rounded-xl border p-2 transition sm:min-h-[130px] ${
                        isInMonth
                          ? "border-[var(--border)] bg-[var(--card)]"
                          : "border-[var(--border)] bg-[var(--surface)] opacity-70"
                      } ${isToday ? "ring-1 ring-[rgba(3,205,140,0.3)]" : ""}`}
                    >
                      <div className="mb-1 text-xs font-semibold text-[var(--text-secondary)]">{day.getDate()}</div>
                      <div className="space-y-1">
                        {cellEvents.slice(0, 3).map((event) => {
                          const isSelected = event.id === selectedEventId;
                          return (
                            <button
                              key={event.id}
                              type="button"
                              onClick={() => onSelectEvent(event)}
                              className={`w-full rounded-lg border px-1.5 py-0.5 text-left text-[10px] transition sm:px-2 sm:py-1 sm:text-xs ${eventBadgeClass(
                                event.eventType,
                              )} ${isSelected ? "ring-1 ring-[rgba(3,205,140,0.35)]" : ""}`}
                            >
                              <div className="truncate font-semibold">{event.title}</div>
                              <div className="truncate opacity-80">{event.startTime}</div>
                            </button>
                          );
                        })}
                        {cellEvents.length > 3 ? (
                          <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                            +{cellEvents.length - 3} more
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {view === "week" ? (
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {weekDays.map((day) => {
                const dayKey = formatDateKey(day);
                const dayEventsList = eventsByDate.get(dayKey) || [];
                return (
                  <div
                    key={dayKey}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 sm:p-3"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                      {day.toLocaleDateString(undefined, { weekday: "short" })}
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {day.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </div>

                    <div className="mt-2 space-y-1">
                      {dayEventsList.length ? (
                        dayEventsList.map((event) => {
                          const isSelected = event.id === selectedEventId;
                          return (
                            <button
                              key={event.id}
                              type="button"
                              onClick={() => onSelectEvent(event)}
                              className={`w-full rounded-lg border px-2 py-1.5 text-left text-[11px] transition sm:px-2.5 sm:py-2 sm:text-xs ${eventBadgeClass(
                                event.eventType,
                              )} ${isSelected ? "ring-1 ring-[rgba(3,205,140,0.35)]" : ""}`}
                            >
                              <div className="truncate font-semibold">{event.title}</div>
                              <div className="truncate opacity-80">
                                {event.startTime} - {event.endTime}
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <div className="rounded-lg border border-dashed border-[var(--border)] p-2 text-xs text-[var(--text-muted)]">
                          No events
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {view === "day" ? (
            <div className="space-y-2">
              {dayEvents.length ? (
                dayEvents.map((event) => {
                  const isSelected = event.id === selectedEventId;
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onSelectEvent(event)}
                      className={`w-full rounded-xl border px-3 py-2 text-left transition sm:py-3 ${eventBadgeClass(
                        event.eventType,
                      )} ${isSelected ? "ring-1 ring-[rgba(3,205,140,0.35)]" : ""}`}
                    >
                      <div className="text-sm font-semibold">{event.title}</div>
                      <div className="mt-1 text-xs opacity-90">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.location ? <div className="mt-1 text-xs opacity-80">{event.location}</div> : null}
                    </button>
                  );
                })
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">No events scheduled</div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">
                    Try changing the date or switching to week/month view.
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(EventsCalendarComponent);
