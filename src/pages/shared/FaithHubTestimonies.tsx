import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPrayerRequests, getTestimonies } from "@/data/repositories/prayerRepository";
import type { PrayerRequestRecord, Testimony } from "@/types/prayer";

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function FaithHubTestimonies() {
  const [isLoading, setIsLoading] = useState(true);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [prayersById, setPrayersById] = useState<Record<string, PrayerRequestRecord>>({});

  useEffect(() => {
    let mounted = true;
    Promise.all([getTestimonies(), getPrayerRequests()]).then(([testimonyRows, prayerRows]) => {
      if (!mounted) return;
      setTestimonies(testimonyRows);
      setPrayersById(
        prayerRows.reduce<Record<string, PrayerRequestRecord>>((acc, prayer) => {
          acc[prayer.id] = prayer;
          return acc;
        }, {}),
      );
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-5 sm:p-6">
          <div className="fh-label text-[var(--text-muted)]">Community</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Testimonies</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Celebrating answered prayers with clear before and after stories from the FaithHub community.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="fh-pill fh-pill-emerald">{testimonies.length} testimonies</Badge>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-6 text-center text-sm text-[var(--text-secondary)]">Loading testimonies...</CardContent>
        </Card>
      ) : testimonies.length ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {testimonies.map((testimony) => {
            const prayer = prayersById[testimony.linkedPrayerId];
            return (
              <Card key={testimony.id} className="fh-surface-card rounded-2xl border-[rgba(3,205,140,0.24)]">
                <CardContent className="space-y-3 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                      <Sparkles className="h-4 w-4" />
                      Answered Testimony
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">{formatDate(testimony.createdAt)}</div>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                      Before (Prayer Request)
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                      {prayer?.title || "Prayer request"}
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-secondary)]">
                      {prayer?.description || "Original prayer details unavailable."}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[rgba(3,205,140,0.24)] bg-[rgba(3,205,140,0.08)] p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                      After (Testimony)
                    </div>
                    <div className="mt-1 text-sm text-[var(--text-primary)]">{testimony.message}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-6 text-center text-sm text-[var(--text-secondary)]">
            No testimonies yet. Mark an answered prayer and add a testimony to start.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
