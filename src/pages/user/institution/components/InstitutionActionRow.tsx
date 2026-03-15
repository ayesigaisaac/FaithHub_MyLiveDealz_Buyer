import React from "react";
import { Button } from "@/components/ui/button";

export default function InstitutionActionRow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
      <Button
        className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
        data-action-label="Join live"
      >
        Join live
      </Button>
      <Button
        variant="outline"
        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
        data-action-label="Open series"
      >
        Open series
      </Button>
      <Button
        variant="outline"
        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
        data-action-label="Open event"
      >
        Open event
      </Button>
      <Button
        variant="outline"
        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
        data-action-label="Give now"
      >
        Give now
      </Button>
    </div>
  );
}

