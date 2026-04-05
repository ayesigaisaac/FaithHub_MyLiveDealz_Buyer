import React, { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clearAnalyticsEvents, getAnalyticsEvents } from "@/lib/analytics";

function formatTimestamp(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

export default function FaithHubAnalyticsDev() {
  const [refreshKey, setRefreshKey] = useState(0);
  const events = useMemo(() => getAnalyticsEvents().slice().reverse(), [refreshKey]);

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Developer Tools</div>
              <h1 className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">Analytics Events</h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Local frontend analytics log for debugging.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => setRefreshKey((prev) => prev + 1)}
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                className="fh-user-secondary-btn text-rose-500"
                onClick={() => {
                  clearAnalyticsEvents();
                  setRefreshKey((prev) => prev + 1);
                }}
              >
                <Trash2 className="h-4 w-4" />
                Clear events
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-4 sm:p-5">
          {!events.length ? (
            <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center">
              <div className="text-sm font-semibold text-[var(--text-primary)]">No analytics events yet</div>
              <div className="mt-1 text-xs text-[var(--text-secondary)]">
                Interact with the app and refresh this page.
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {events.map((event, index) => (
                <div
                  key={`${event.timestamp}-${event.name}-${index}`}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 font-semibold uppercase tracking-[0.08em]">
                      {event.category}
                    </span>
                    <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 font-semibold uppercase tracking-[0.08em]">
                      {event.role}
                    </span>
                    <span>{formatTimestamp(event.timestamp)}</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{event.name}</div>
                  <pre className="mt-2 overflow-x-auto rounded-lg bg-[var(--surface)] p-2 text-xs text-[var(--text-secondary)]">
                    {JSON.stringify(event.payload || {}, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

