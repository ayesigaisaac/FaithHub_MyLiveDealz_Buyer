import React from "react";
import { Clock3 } from "lucide-react";
import type { EventAgendaItem } from "@/pages/user/events/components/EventsCalendar";

type AgendaListProps = {
  items: EventAgendaItem[];
};

export default function AgendaList({ items }: AgendaListProps) {
  return (
    <div className="space-y-2">
      {items.map((agendaItem, index) => (
        <div
          key={`${agendaItem.time}-${agendaItem.title}-${index}`}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
        >
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[rgba(3,205,140,0.12)] text-[var(--accent)]">
              <Clock3 className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                {agendaItem.time}
              </div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">{agendaItem.title}</div>
              {agendaItem.description ? (
                <div className="mt-0.5 text-xs text-[var(--text-secondary)]">{agendaItem.description}</div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
