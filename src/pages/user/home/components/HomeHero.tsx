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
    <Card className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-[#f8fafc] via-[#f5f7fa] to-[#edf6f2] shadow-[0_16px_40px_-24px_rgba(15,23,42,0.28)]">
      <CardContent className="fh-pad-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_28%)]" />

        <div className="relative z-10 text-slate-900">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              Personalized for you
            </Badge>
            <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">
              {recommendationCount} suggested actions
            </Badge>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 fh-kicker text-slate-500">
              <Sparkles className="h-4 w-4 text-[#0ea5e9]" />
              FaithHub Home
            </div>
            <h1 className="max-w-[22ch] break-normal text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Continue your faith journey from one clear, action-ready home.
            </h1>
            <p className="max-w-2xl fh-body text-slate-600 sm:text-base">
              Move between live sessions, replays, events, and giving with consistent context and
              trust-forward navigation.
            </p>
          </div>

          <div className="mt-6 rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
            <div className="fh-eyebrow text-slate-500">
              Current focus
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{activeIntentTitle}</div>
            <div className="mt-1 text-sm text-slate-600">{activeIntentDescription}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


