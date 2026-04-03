import React, { memo } from "react";
import { CalendarDays, Clock3, MapPin, PencilLine } from "lucide-react";
import AgendaList from "@/pages/user/events/components/AgendaList";
import type { CalendarEvent } from "@/types/events";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type EventDetailsPanelProps = {
  event: CalendarEvent | null;
  canManage: boolean;
  onEditEvent?: (event: CalendarEvent) => void;
};

function eventTypeBadgeClass(eventType?: CalendarEvent["eventType"]) {
  if (eventType === "urgent") return "fh-pill fh-pill-orange";
  if (eventType === "conference") return "fh-pill fh-pill-slate";
  if (eventType === "community") return "fh-pill fh-pill-emerald";
  return "fh-pill fh-pill-slate";
}

function formatEventDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EventDetailsPanelComponent({ event, canManage, onEditEvent }: EventDetailsPanelProps) {
  if (!event) {
    return (
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-4 sm:p-5">
          <div className="fh-label text-[var(--text-muted)]">Event Details</div>
          <div className="mt-3 rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <div className="text-sm font-semibold text-[var(--text-primary)]">No event selected</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)]">
              Select an event in the calendar to see full details.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fh-surface-card rounded-[24px]">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="fh-label text-[var(--text-muted)]">Event Details</div>
            <h3 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">{event.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className={eventTypeBadgeClass(event.eventType)}>{event.eventType || "service"}</Badge>
            </div>
          </div>

          {canManage && onEditEvent ? (
            <Button
              variant="outline"
              uiSize="sm"
              className="fh-user-secondary-btn"
              onClick={() => onEditEvent(event)}
            >
              <PencilLine className="h-4 w-4" />
              Edit
            </Button>
          ) : null}
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
            <CalendarDays className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <span className="text-[var(--text-secondary)]">{formatEventDate(event.date)}</span>
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
            <Clock3 className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <span className="text-[var(--text-secondary)]">
              {event.startTime} - {event.endTime}
            </span>
          </div>
          {event.location ? (
            <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <MapPin className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
              <span className="text-[var(--text-secondary)]">{event.location}</span>
            </div>
          ) : null}
        </div>

        {event.description ? (
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Description
            </div>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{event.description}</p>
          </div>
        ) : null}

        {event.agenda && event.agenda.length > 0 ? (
          <div className="mt-4">
            <div className="mb-2 text-sm font-semibold text-[var(--text-primary)]">Agenda</div>
            <AgendaList items={event.agenda} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default memo(EventDetailsPanelComponent);
