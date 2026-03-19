import React from "react";
import { BookOpen, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { InstitutionEventItem, InstitutionSeriesItem } from "@/pages/user/institution/types";

type InstitutionContentTabsProps = {
  series: InstitutionSeriesItem[];
  events: InstitutionEventItem[];
};

export default function InstitutionContentTabs({ series, events }: InstitutionContentTabsProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-slate-900 sm:text-xl">
              Series and events
            </div>
            <div className="text-sm text-slate-500">
              Explore ongoing teaching series and event journeys.
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="fh-subcard rounded-[24px] p-4">
            <div className="mb-3 text-sm font-semibold text-slate-900">Teaching series</div>
            <div className="space-y-3">
              {series.map((seriesItem) => (
                <div key={seriesItem.title} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{seriesItem.title}</div>
                      <div className="mt-1 text-sm text-slate-600">{seriesItem.meta}</div>
                    </div>
                    <BookOpen className="h-4 w-4 text-[#03cd8c]" />
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-4 rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
              data-action-label="Open series"
            >
              Open series
            </Button>
          </div>

          <div className="fh-subcard rounded-[24px] p-4">
            <div className="mb-3 text-sm font-semibold text-slate-900">Faith events</div>
            <div className="space-y-3">
              {events.map((eventItem) => (
                <div key={eventItem.title} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{eventItem.title}</div>
                      <div className="text-sm text-slate-500">
                        {eventItem.date} - {eventItem.type}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">{eventItem.price}</div>
                    </div>
                    <Ticket className="h-4 w-4 text-[#f77f00]" />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-4 rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
              data-action-label="Open event"
            >
              Open event
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

