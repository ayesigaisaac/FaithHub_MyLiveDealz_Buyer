import React from "react";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventItem } from "@/pages/user/events/types";

type EventCardProps = {
  event: EventItem;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="fh-subcard rounded-[24px] p-4 transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <div className="text-lg font-semibold text-slate-900">{event.title}</div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {event.type}
            </span>
            {event.memberOnly ? (
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                Members only
              </span>
            ) : null}
            {event.ticketed ? (
              <span className="rounded-full bg-[#fff8ef] px-2.5 py-1 text-xs font-semibold text-[#f77f00]">
                FaithMart ticketing
              </span>
            ) : null}
          </div>
          <div className="text-sm text-slate-500">{event.institution}</div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 ring-1 ring-slate-200">
              <CalendarDays className="h-4 w-4 text-[#03cd8c]" />
              {event.start}
              {event.end !== event.start ? ` - ${event.end}` : ""}
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
          <span
            className={`rounded-full px-3 py-2 text-xs font-semibold ${
              event.rsvp === "Going"
                ? "bg-[#ecfff8] text-[#03cd8c]"
                : event.rsvp === "Interested"
                  ? "bg-[#fff8ef] text-[#f77f00]"
                  : "bg-slate-100 text-slate-700"
            }`}
          >
            RSVP: {event.rsvp}
          </span>
          <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" data-action-label="Open event">
            Open event
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
            data-action-label="Join live"
          >
            Join live
          </Button>
        </div>
      </div>
    </div>
  );
}
