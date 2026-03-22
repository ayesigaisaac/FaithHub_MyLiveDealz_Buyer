import React from "react";
import { Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ContinueWatchingItem } from "@/pages/user/home/types";

type ContinueWatchingRailProps = {
  items: ContinueWatchingItem[];
};

export default function ContinueWatchingRail({ items }: ContinueWatchingRailProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[24px]">
      <CardContent className="p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="fh-section-title text-slate-900">Continue watching</div>
            <div className="fh-section-subtitle text-slate-500">
              Resume where you left off across replays and series.
            </div>
          </div>
          <Button
            variant="ghost"
            className="rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            data-action-label="Open catch up"
          >
            Open catch up
          </Button>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="fh-interactive-card fh-subcard min-w-0 rounded-[18px] p-5"
            >
              <div className="mb-4 aspect-video overflow-hidden rounded-[20px] border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="relative h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.14),transparent_45%),linear-gradient(150deg,#f8fafc_0%,#e8eef5_100%)]">
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                    Replay preview
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/20 to-transparent px-3 pb-3 pt-5">
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-600">{item.duration}</div>
                  </div>
                </div>
              </div>
              <div className="mb-1 text-base font-semibold tracking-tight text-slate-900">{item.title}</div>
              <div className="fh-body-tight text-slate-500">
                {item.institution} - {item.duration}
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${item.progress}%` }} />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Button
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-500"
                  data-action-label="Open catch up"
                >
                  Resume
                </Button>
                <button
                  type="button"
                  className="fh-inline-action flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-slate-600 hover:text-emerald-600"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
