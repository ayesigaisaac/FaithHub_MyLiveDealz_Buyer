import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, Plus, Search, X } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EventDetailsPanel from "@/pages/user/events/components/EventDetailsPanel";
import EventsCalendar from "@/pages/user/events/components/EventsCalendar";
import type { CalendarEvent, CalendarView, EventAgendaItem } from "@/types/events";
import { getEventsSync, saveEventsSync } from "@/data/services/eventsService";
import { trackEvent } from "@/data/tracker";

type EventFormState = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  eventType: NonNullable<CalendarEvent["eventType"]>;
  agendaText: string;
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, delta: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}

function startOfWeek(date: Date) {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return addDays(normalized, -normalized.getDay());
}

function defaultFormState(fromDate: Date): EventFormState {
  return {
    title: "",
    date: formatDateKey(fromDate),
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    description: "",
    eventType: "service",
    agendaText: "",
  };
}

function agendaToText(agenda: EventAgendaItem[] = []) {
  return agenda.map((item) => `${item.time}|${item.title}|${item.description || ""}`).join("\n");
}

function parseAgendaText(value: string) {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const agenda: EventAgendaItem[] = [];
  for (const line of lines) {
    const [timeRaw = "", titleRaw = "", descriptionRaw = ""] = line
      .split("|")
      .map((part) => part.trim());
    if (!timeRaw || !titleRaw) continue;
    agenda.push({
      time: timeRaw,
      title: titleRaw,
      description: descriptionRaw || undefined,
    });
  }

  return agenda.length ? agenda : undefined;
}

function isEventInRange(event: CalendarEvent, view: CalendarView, cursorDate: Date) {
  const eventDate = new Date(`${event.date}T00:00:00`);
  if (Number.isNaN(eventDate.getTime())) return false;

  if (view === "day") {
    return formatDateKey(eventDate) === formatDateKey(cursorDate);
  }

  if (view === "week") {
    const start = startOfWeek(cursorDate);
    const end = addDays(start, 6);
    return eventDate >= start && eventDate <= end;
  }

  return (
    eventDate.getMonth() === cursorDate.getMonth() &&
    eventDate.getFullYear() === cursorDate.getFullYear()
  );
}

export default function EventsPage() {
  const { role } = useAuth();
  const canManage = role === "admin" || role === "provider";

  const [view, setView] = useState<CalendarView>("month");
  const [cursorDate, setCursorDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(() => getEventsSync());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(() => getEventsSync()[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EventFormState>(() => defaultFormState(new Date()));

  const setAndPersistEvents = useCallback(
    (updater: CalendarEvent[] | ((previous: CalendarEvent[]) => CalendarEvent[])) => {
      setEvents((previous) => {
        const next = typeof updater === "function" ? updater(previous) : updater;
        saveEventsSync(next);
        return next;
      });
    },
    [],
  );

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return events;
    return events.filter((event) => {
      const haystack = `${event.title} ${event.description || ""} ${event.location || ""}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [events, searchQuery]);

  const eventsInView = useMemo(() => {
    return filteredEvents
      .filter((event) => isEventInRange(event, view, cursorDate))
      .slice()
      .sort((a, b) => {
        const aDate = `${a.date}T${a.startTime}`;
        const bDate = `${b.date}T${b.startTime}`;
        return aDate.localeCompare(bDate);
      });
  }, [cursorDate, filteredEvents, view]);

  const selectedEvent = useMemo(
    () => filteredEvents.find((event) => event.id === selectedEventId) || null,
    [filteredEvents, selectedEventId],
  );

  useEffect(() => {
    if (selectedEvent) return;
    if (filteredEvents.length) {
      setSelectedEventId(filteredEvents[0].id);
    }
  }, [filteredEvents, selectedEvent]);

  const openCreate = useCallback(() => {
    setEditingEventId(null);
    setDraft(defaultFormState(cursorDate));
    setEditorOpen(true);
  }, [cursorDate]);

  const openEdit = useCallback((event: CalendarEvent) => {
    setEditingEventId(event.id);
    setDraft({
      title: event.title,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location || "",
      description: event.description || "",
      eventType: event.eventType || "service",
      agendaText: agendaToText(event.agenda),
    });
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setEditingEventId(null);
  }, []);

  const saveDraft = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) return;

    const nextEvent: CalendarEvent = {
      id: editingEventId || `event-${Date.now()}`,
      title,
      date: draft.date,
      startTime: draft.startTime,
      endTime: draft.endTime,
      location: draft.location.trim() || undefined,
      description: draft.description.trim() || undefined,
      eventType: draft.eventType,
      agenda: parseAgendaText(draft.agendaText),
    };

    setAndPersistEvents((previous) => {
      if (!editingEventId) return [nextEvent, ...previous];
      return previous.map((existing) => (existing.id === editingEventId ? nextEvent : existing));
    });
    trackEvent(
      "CLICK_BUTTON",
      {
        id: editingEventId ? "event-save" : "event-create",
        label: nextEvent.title,
        location: "events-editor",
      },
      { role },
    );
    setSelectedEventId(nextEvent.id);
    setCursorDate(new Date(`${nextEvent.date}T00:00:00`));
    closeEditor();
  };

  const selectEvent = useCallback((event: CalendarEvent) => {
    setSelectedEventId(event.id);
    setCursorDate(new Date(`${event.date}T00:00:00`));
  }, []);

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-[var(--text-muted)]">Events Hub</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Events & Calendar
              </h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Plan, browse, and track events through day, week, and month views with full event context.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-slate">{filteredEvents.length} total events</Badge>
                <Badge className="fh-pill fh-pill-emerald">{eventsInView.length} in current view</Badge>
                <Badge className="fh-pill fh-pill-slate">{view.toUpperCase()} view</Badge>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_auto]">
              <label className="fh-user-input">
                <Search className="h-4 w-4 text-[var(--text-secondary)]" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search events, location, or description"
                  className="w-full"
                />
              </label>

              {canManage ? (
                <Button className="fh-user-primary-btn" onClick={openCreate}>
                  <Plus className="h-4 w-4" />
                  Create Event
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(["day", "week", "month"] as CalendarView[]).map((viewKey) => {
              const active = view === viewKey;
              return (
                <button
                  key={viewKey}
                  type="button"
                  onClick={() => setView(viewKey)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "border-[rgba(3,205,140,0.35)] bg-[rgba(3,205,140,0.14)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                  }`}
                >
                  {viewKey.charAt(0).toUpperCase() + viewKey.slice(1)}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <EventsCalendar
            events={filteredEvents}
            view={view}
            cursorDate={cursorDate}
            selectedEventId={selectedEventId}
            onSelectEvent={selectEvent}
            onCursorDateChange={setCursorDate}
          />

          <Card className="fh-surface-card rounded-[24px]">
            <CardContent className="p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[var(--accent)]" />
                <div className="text-sm font-semibold text-[var(--text-primary)]">Events In Current View</div>
              </div>

              {eventsInView.length ? (
                <div className="space-y-2">
                  {eventsInView.map((eventItem) => {
                    const isSelected = selectedEventId === eventItem.id;
                    return (
                      <button
                        key={eventItem.id}
                        type="button"
                        onClick={() => selectEvent(eventItem)}
                        className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                          isSelected
                            ? "border-[rgba(3,205,140,0.35)] bg-[rgba(3,205,140,0.12)]"
                            : "border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface)]"
                        }`}
                      >
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{eventItem.title}</div>
                        <div className="mt-1 text-xs text-[var(--text-secondary)]">
                          {eventItem.date} | {eventItem.startTime} - {eventItem.endTime}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">No events in this view</div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">
                    Switch calendar view or adjust your search query.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <EventDetailsPanel
          event={selectedEvent}
          canManage={canManage}
          onEditEvent={canManage ? openEdit : undefined}
        />
      </div>

      {canManage && editorOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
          <Card className="fh-surface-card w-full max-w-2xl rounded-2xl">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="fh-label text-[var(--text-muted)]">
                    {editingEventId ? "Edit Event" : "Create Event"}
                  </div>
                  <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                    {editingEventId ? "Update event details" : "Create a new calendar event"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                  aria-label="Close event editor"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form className="mt-4 space-y-3" onSubmit={saveDraft}>
                <label className="fh-user-filter">
                  Event Title
                  <input
                    value={draft.title}
                    onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    placeholder="Title"
                    required
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="fh-user-filter">
                    Date
                    <input
                      type="date"
                      value={draft.date}
                      onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                      required
                    />
                  </label>
                  <label className="fh-user-filter">
                    Start
                    <input
                      type="time"
                      value={draft.startTime}
                      onChange={(event) => setDraft((prev) => ({ ...prev, startTime: event.target.value }))}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                      required
                    />
                  </label>
                  <label className="fh-user-filter">
                    End
                    <input
                      type="time"
                      value={draft.endTime}
                      onChange={(event) => setDraft((prev) => ({ ...prev, endTime: event.target.value }))}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="fh-user-filter">
                    Location
                    <input
                      value={draft.location}
                      onChange={(event) => setDraft((prev) => ({ ...prev, location: event.target.value }))}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                      placeholder="Location"
                    />
                  </label>
                  <label className="fh-user-filter">
                    Type
                    <select
                      value={draft.eventType}
                      onChange={(event) =>
                        setDraft((prev) => ({
                          ...prev,
                          eventType: event.target.value as EventFormState["eventType"],
                        }))
                      }
                      className="w-full"
                    >
                      <option value="service">Service</option>
                      <option value="conference">Conference</option>
                      <option value="community">Community</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </label>
                </div>

                <label className="fh-user-filter">
                  Description
                  <textarea
                    value={draft.description}
                    onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
                    rows={3}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    placeholder="Description"
                  />
                </label>

                <label className="fh-user-filter">
                  Agenda (one item per line: `time|title|description`)
                  <textarea
                    value={draft.agendaText}
                    onChange={(event) => setDraft((prev) => ({ ...prev, agendaText: event.target.value }))}
                    rows={4}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    placeholder={"09:00|Opening Prayer|\n10:00|Worship Session|\n11:30|Teaching|Main hall"}
                  />
                </label>

                <div className="flex flex-wrap justify-end gap-2 pt-1">
                  <Button type="button" variant="outline" className="fh-user-secondary-btn" onClick={closeEditor}>
                    Cancel
                  </Button>
                  <Button type="submit" className="fh-user-primary-btn">
                    {editingEventId ? "Save Changes" : "Create Event"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
