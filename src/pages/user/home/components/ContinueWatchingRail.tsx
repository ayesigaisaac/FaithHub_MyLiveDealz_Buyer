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
    <Card className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-900 sm:text-xl">Continue watching</div>
            <div className="text-sm text-slate-500">
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
              className="min-w-0 rounded-[16px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
            >
              <div className="mb-4 h-40 rounded-[20px] bg-gradient-to-br from-slate-100 to-slate-200" />
              <div className="mb-1 text-base font-semibold text-slate-900">{item.title}</div>
              <div className="text-sm text-slate-500">
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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:text-emerald-600"
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
