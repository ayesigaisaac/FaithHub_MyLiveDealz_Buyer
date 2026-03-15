import React from "react";
import { ChevronRight, Navigation, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GeoControlsPanel() {
  return (
    <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-slate-900 sm:text-xl">
              Geo and discovery controls
            </div>
            <div className="text-sm text-slate-500">
              Location-aware without losing consent clarity.
            </div>
          </div>
          <Button
            variant="ghost"
            className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]"
          >
            Manage
          </Button>
        </div>

        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-3 rounded-[24px] border border-slate-100 bg-[#f8fafc] p-4">
            <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
            <div>
              Geocoding and map search can surface nearby institutions, service schedules, and
              venue context with clear permission boundaries.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-[24px] border border-slate-100 bg-[#f8fafc] p-4">
            <SlidersHorizontal className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
            <div>
              Cache the last known nearby results to preserve useful discovery when connectivity is
              weak.
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-left font-semibold text-slate-900 transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
          >
            Open advanced filter drawer
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

