import React from "react";
import { HeartHandshake, Receipt, Repeat2, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type GivingHeroProps = {
  offlineMode: boolean;
  onToggleOfflineMode: () => void;
};

export default function GivingHero({ offlineMode, onToggleOfflineMode }: GivingHeroProps) {
  return (
    <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
      <CardContent className="fh-pad-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />

        <div className="relative z-10 text-white">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">
              Giving + receipts + supporter tiers
            </Badge>
            <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">
              One-time, recurring, and transparent funds
            </Badge>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.63fr_0.37fr]">
            <div className="space-y-4">
              <div className="fh-kicker text-white/90">
                Giving with care and clarity
              </div>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Support faith work with one-time gifts and recurring generosity in one flow.
              </h1>
              <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                Choose a fund, set giving frequency, manage receipts, and optionally join supporter
                membership tiers with clear trust messaging.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                  <Receipt className="h-4 w-4" />
                  Receipts and downloads
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                  <Repeat2 className="h-4 w-4" />
                  One-time or recurring
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                  <Star className="h-4 w-4" />
                  Supporter membership option
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
              <div className="mb-3 text-sm font-semibold text-white">Payment readiness</div>
              <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                <div className="mb-2 fh-kicker-muted text-white/70">State</div>
                <div className="text-xl font-semibold text-white">
                  {offlineMode ? "Intent queued until online" : "Secure payment ready"}
                </div>
                <div className="mt-3 text-sm text-white/80">
                  Offline mode stores intent only and does not capture payment.
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Button
                  className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
                  data-action-label="Continue to payment"
                >
                  Continue giving
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                  onClick={onToggleOfflineMode}
                >
                  {offlineMode ? "Go online" : "Offline intent"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


