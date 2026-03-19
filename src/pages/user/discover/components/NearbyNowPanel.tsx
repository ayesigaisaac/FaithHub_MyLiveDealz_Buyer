import React from "react";
import { CheckCircle2, Clock3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Institution } from "@/pages/user/discover/types";

type NearbyNowPanelProps = {
  institutions: Institution[];
};

export default function NearbyNowPanel({ institutions }: NearbyNowPanelProps) {
  return (
    <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
      <CardContent className="fh-pad-panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-white sm:text-xl">Near me now</div>
            <div className="text-sm text-white/70">
              Institutions with active or soon-starting services nearby.
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {institutions.map((institution) => (
            <div key={institution.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-base font-semibold text-white">{institution.name}</div>
                {institution.verified ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#8ef0ca]" />
                    Verified
                  </span>
                ) : null}
              </div>
              <div className="text-sm text-white/70">
                {institution.location} - {institution.distanceKm} km away
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-white/85">
                <Clock3 className="h-4 w-4 text-[#8ef0ca]" />
                {institution.serviceTime}
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
                  data-action-label="Open profile"
                >
                  Open profile
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/15 bg-transparent text-white hover:bg-white/10"
                  data-action-label="Join live"
                >
                  Join live
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

