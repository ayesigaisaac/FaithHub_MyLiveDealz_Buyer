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
    <Card className="fh-interactive-card fh-surface-card rounded-[24px] text-[var(--text-primary)]">
      <CardContent className="p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-2xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-[2rem]">
              Upcoming sessions
            </div>
            <div className="mt-1 fh-body text-[var(--text-secondary)]">
              From followed institutions and audience groups.
            </div>
          </div>
          <Button
            variant="ghost"
            uiSize="sm"
            className="rounded-full text-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-strong)]"
            data-action-label="Open calendar"
          >
            Open calendar
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="fh-interactive-card fh-subcard rounded-[20px] p-5"
            >
              <div className="mb-1 text-[1.4rem] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
                {item.title}
              </div>
              <div className="fh-body-tight text-[var(--text-secondary)]">{item.institution}</div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 ring-1 ring-[color:color-mix(in_srgb,var(--accent)_28%,transparent_72%)]">
                  <CalendarDays className="h-4 w-4 text-[var(--accent)]" />
                  {item.time}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 ring-1 ring-[color:color-mix(in_srgb,var(--accent)_28%,transparent_72%)]">
                  <Users className="h-4 w-4 text-[var(--accent)]" />
                  {item.audience}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  className="fh-user-primary-btn rounded-xl"
                  data-action-label="Open event"
                >
                  Open event
                </Button>
                <Button
                  variant="outline"
                  className="fh-user-secondary-btn rounded-xl text-[var(--text-primary)] hover:bg-[var(--accent-soft)]"
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
