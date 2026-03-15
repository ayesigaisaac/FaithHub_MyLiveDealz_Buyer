import React from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type HomeHeroProps = {
  activeIntentTitle: string;
  activeIntentDescription: string;
  recommendationCount: number;
};

export default function HomeHero({
  activeIntentTitle,
  activeIntentDescription,
  recommendationCount,
}: HomeHeroProps) {
  return (
    <Card className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#ebfcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
      <CardContent className="fh-pad-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_22%)]" />

        <div className="relative z-10 text-white">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">
              Personalized for you
            </Badge>
            <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">
              {recommendationCount} suggested actions
            </Badge>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 fh-kicker text-white/90">
              <Sparkles className="h-4 w-4" />
              FaithHub home
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Continue your faith journey from one clear, action-ready home.
            </h1>
            <p className="max-w-2xl fh-body text-white/90 sm:text-base">
              Move between live sessions, replays, events, and giving with consistent context and
              trust-forward navigation.
            </p>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/20 bg-white/12 p-4 backdrop-blur">
            <div className="fh-eyebrow text-white/80">
              Current focus
            </div>
            <div className="mt-2 text-xl font-semibold text-white">{activeIntentTitle}</div>
            <div className="mt-1 text-sm text-white/85">{activeIntentDescription}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


