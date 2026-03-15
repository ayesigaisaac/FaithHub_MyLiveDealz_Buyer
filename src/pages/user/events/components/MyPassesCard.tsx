import React from "react";
import { CheckCircle2, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type MyPassesCardProps = {
  showMap: boolean;
};

export default function MyPassesCard({ showMap }: MyPassesCardProps) {
  return (
    <>
      <Card className="rounded-[32px] border border-white/60 bg-slate-950 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)]">
        <CardContent className="fh-pad-panel">
          <div className="mb-4">
            <div className="text-lg font-semibold text-white sm:text-xl">
              {showMap ? "Event map context" : "Calendar context"}
            </div>
            <div className="text-sm text-white/70">
              Keep venue and schedule awareness while switching views.
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-sm font-semibold text-white">My passes and reminders</div>
            <div className="space-y-2 text-sm text-white/80">
              <div>- Youth Worship Camp pass downloaded</div>
              <div>- Baptism Sunday reminder active</div>
              <div>- Marketplace Day ticket pending payment</div>
            </div>
            <Button
              className="mt-4 rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
              data-action-label="Open event"
            >
              Open event pass
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[32px] border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
        <CardContent className="fh-pad-panel">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="fh-eyebrow text-[#f77f00]">
                Monetization
              </div>
              <div className="mt-2 text-xl font-semibold text-slate-900">
                FaithMart ticketing and event commerce
              </div>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-[24px] border border-[#f77f00]/15 bg-white p-4">
              Ticketed events can route into FaithMart for participant passes and package options.
            </div>
            <div className="rounded-[24px] border border-[#03cd8c]/15 bg-[#ecfff8] p-4">
              <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" />
                RSVP clarity
              </div>
              <div>Use Going, Interested, and Not yet states to keep participation visible.</div>
            </div>
            <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
              <Ticket className="mr-2 h-4 w-4" />
              Open ticketing workflows
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

