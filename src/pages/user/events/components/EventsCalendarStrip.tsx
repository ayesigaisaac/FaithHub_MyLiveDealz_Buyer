import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { CalendarDay } from "@/pages/user/events/types";

type EventsCalendarStripProps = {
  days: CalendarDay[];
};

export default function EventsCalendarStrip({ days }: EventsCalendarStripProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-4">
          <div className="text-lg font-semibold text-slate-900 sm:text-xl">Calendar highlights</div>
          <div className="text-sm text-slate-500">
            Key days this month with visible event markers.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {days.map((day) => (
            <div key={day.day} className="rounded-[20px] border border-slate-200 bg-[#f8fafc] p-4">
              <div className="fh-eyebrow text-slate-500">
                Day
              </div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{day.day}</div>
              <div className="mt-2 text-sm text-slate-600">{day.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

