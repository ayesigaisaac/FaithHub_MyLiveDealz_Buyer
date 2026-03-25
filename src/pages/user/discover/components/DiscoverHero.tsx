import React from "react";
import { Globe2, MapPin, Search, WifiOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DiscoverViewMode } from "@/pages/user/discover/types";

type DiscoverHeroProps = {
  search: string;
  onSearchChange: (nextValue: string) => void;
  viewMode: DiscoverViewMode;
  onToggleView: () => void;
  offlineMode: boolean;
  onToggleOfflineMode: () => void;
  resultCount: number;
};

export default function DiscoverHero({
  search,
  onSearchChange,
  viewMode,
  onToggleView,
  offlineMode,
  onToggleOfflineMode,
  resultCount,
}: DiscoverHeroProps) {
  return (
    <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#ebfcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
      <CardContent className="fh-pad-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />

        <div className="relative z-10 text-white">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">
              Discover institutions with confidence
            </Badge>
            <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
              {resultCount} results
            </Badge>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 fh-kicker text-white/90">
              <Globe2 className="h-4 w-4" />
              Search, filter, and verify
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Explore faith institutions near you with trusted context.
            </h1>
            <p className="max-w-2xl fh-body text-white/90 sm:text-base">
              Find communities by faith family, denomination, language, and distance. Move between
              map and list views while keeping promoted placements transparent.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search institution or location"
                className="h-12 w-full rounded-2xl border border-white/20 bg-white/12 pl-11 pr-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:border-white/45 focus:bg-white/18"
              />
            </div>

            <Button
              variant="outline"
              className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
              onClick={onToggleView}
            >
              <MapPin className="mr-2 h-4 w-4" />
              {viewMode === "list" ? "Map view" : "List view"}
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/15"
              onClick={onToggleOfflineMode}
            >
              <WifiOff className="mr-2 h-4 w-4" />
              {offlineMode ? "Go online" : "Offline cache"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


