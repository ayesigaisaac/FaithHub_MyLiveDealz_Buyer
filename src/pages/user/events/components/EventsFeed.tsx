import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import EventCard from "@/pages/user/events/components/EventCard";
import type { EventItem } from "@/pages/user/events/types";

type EventsFeedProps = {
  events: EventItem[];
};

export default function EventsFeed({ events }: EventsFeedProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-4">
          <div className="text-lg font-semibold text-slate-900 sm:text-xl">Events list</div>
          <div className="text-sm text-slate-500">
            Responsive cards with RSVP state, access level, and ticketing readiness.
          </div>
        </div>

        <div className="space-y-3">
          {events.length ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="rounded-[24px] border border-dashed border-slate-200 bg-[#f8fafc] p-8 text-center">
              <div className="text-lg font-semibold text-slate-900">No events matched</div>
              <div className="mt-2 text-sm text-slate-500">
                Try broadening your search or changing an event filter.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

