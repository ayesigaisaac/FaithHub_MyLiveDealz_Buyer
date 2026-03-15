import React from "react";
import { CalendarDays, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UpcomingEventItem } from "@/pages/user/home/types";

type UpcomingEventsPreviewProps = {
  items: UpcomingEventItem[];
};

export default function UpcomingEventsPreview({ items }: UpcomingEventsPreviewProps) {
  return (
    <Card className="rounded-[20px] border border-slate-200 bg-white text-slate-900 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-2xl font-semibold leading-tight text-slate-900 sm:text-[2rem]">
              Upcoming sessions
            </div>
            <div className="mt-1 text-base leading-7 text-slate-500">
              From followed institutions and audience groups.
            </div>
          </div>
          <Button
            variant="ghost"
            uiSize="sm"
            className="rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            data-action-label="Open calendar"
          >
            Open calendar
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_14px_36px_-24px_rgba(16,185,129,0.45)]"
            >
              <div className="mb-1 text-[1.4rem] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
                {item.title}
              </div>
              <div className="text-sm text-slate-500">{item.institution}</div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 ring-1 ring-emerald-100">
                  <CalendarDays className="h-4 w-4 text-emerald-600" />
                  {item.time}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 ring-1 ring-emerald-100">
                  <Users className="h-4 w-4 text-emerald-600" />
                  {item.audience}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  className="rounded-xl bg-emerald-500 text-white hover:bg-emerald-500"
                  data-action-label="Open event"
                >
                  Open event
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-200 bg-white text-slate-900 hover:border-emerald-200 hover:bg-emerald-50"
                  data-action-label="Open calendar"
                >
                  Add reminder
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
