import React from "react";
import { CalendarDays, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type EventsHeroProps = {
  query: string;
  onQueryChange: (nextValue: string) => void;
  showMap: boolean;
  onToggleView: () => void;
};

export default function EventsHero({
  query,
  onQueryChange,
  showMap,
  onToggleView,
}: EventsHeroProps) {
  return (
    <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
      <CardContent className="fh-pad-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />

        <div className="relative z-10 text-white">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">
              Camps, trips, baptisms, and conferences
            </Badge>
            <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">
              Calendar + map + RSVP
            </Badge>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="fh-kicker text-white/90">
              Faith events across institutions
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Discover events and move from RSVP to attendance with clear context.
            </h1>
            <p className="max-w-2xl fh-body text-white/90 sm:text-base">
              Browse by audience and event type, then open details, RSVP, and move into ticketing
              flows where applicable.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search event, venue, or institution"
                className="h-12 w-full rounded-2xl border border-white/20 bg-white/12 pl-11 pr-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:border-white/45 focus:bg-white/18"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
              onClick={onToggleView}
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {showMap ? "Calendar view" : "Map view"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


