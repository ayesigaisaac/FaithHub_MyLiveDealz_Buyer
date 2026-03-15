import React from "react";
import { Clock3, MapPin, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type InstitutionHeroProps = {
  following: boolean;
  onToggleFollow: () => void;
};

export default function InstitutionHero({ following, onToggleFollow }: InstitutionHeroProps) {
  return (
    <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#21d29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
      <CardContent className="fh-pad-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.1),transparent_22%)]" />

        <div className="relative z-10 text-white">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">
              Verified institution
            </Badge>
            <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">
              Live + series + events + giving
            </Badge>
          </div>

          <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">St. Marys Cathedral</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                A multi-generational faith institution with live services, structured teaching series,
                events, counseling, and community engagement.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                  <MapPin className="h-4 w-4" />
                  Kampala Central
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                  <Clock3 className="h-4 w-4" />
                  Sunday 8:00 AM - Wednesday 6:30 PM
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                  <Users className="h-4 w-4" />
                  18.2k followers
                </span>
              </div>
            </div>

            <Button
              className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
              onClick={onToggleFollow}
              data-action-label="Open profile"
            >
              {following ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

