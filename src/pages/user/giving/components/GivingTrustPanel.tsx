import React from "react";
import { CheckCircle2, ShieldCheck, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GivingTrustPanelProps = {
  supporterTier: boolean;
  onToggleSupporterTier: () => void;
};

export default function GivingTrustPanel({
  supporterTier,
  onToggleSupporterTier,
}: GivingTrustPanelProps) {
  return (
    <>
      <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
        <CardContent className="fh-pad-panel">
          <div className="mb-4">
            <div className="text-lg font-semibold text-white sm:text-xl">Donor trust and visibility</div>
            <div className="text-sm text-white/70">Public recognition only when a donor opts in.</div>
          </div>
          <div className="space-y-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Users className="h-4 w-4 text-[#8ef0ca]" />
                Donor wall controls
              </div>
              <div className="text-sm text-white/80">
                Keep giving private by default and opt in only when preferred.
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
              data-action-label="Open institution"
            >
              Open institution
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
        <CardContent className="fh-pad-panel">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="hidden text-[#f77f00]">
                Supporter subscription tier
              </div>
              <div className="mt-2 text-xl font-semibold text-slate-900">
                Add recurring support with clear perks
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
              onClick={onToggleSupporterTier}
            >
              {supporterTier ? "Supporter tier on" : "Preview supporter tier"}
            </Button>
          </div>

          <div className="space-y-3 text-sm text-slate-600">
            {supporterTier ? (
              <>
                <div className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                    <Star className="h-4 w-4 text-[#f77f00]" /> Supporter perk
                  </div>
                  Members-only series and selected premium study resources.
                </div>
                <div className="fh-subcard-accent rounded-[24px] p-4">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" />
                    Membership clarity
                  </div>
                  Perks and upgrade paths are explicit and easy to manage.
                </div>
              </>
            ) : (
              <div className="rounded-[24px] border border-dashed border-[#f77f00]/20 bg-white p-6 text-center">
                Supporter perks are hidden in preview mode.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
        <CardContent className="fh-pad-panel">
          <div className="mb-4">
            <div className="text-lg font-semibold text-slate-900 sm:text-xl">
              Offline and payment behavior
            </div>
            <div className="text-sm text-slate-500">
              Giving intent can queue, but payment capture waits for connectivity.
            </div>
          </div>
          <div className="fh-subcard-accent rounded-[24px] p-4 text-sm text-slate-600">
            <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-[#03cd8c]" />
              Safe intent handling
            </div>
            Offline mode stores donor choices and resumes securely when the network returns.
          </div>
        </CardContent>
      </Card>
    </>
  );
}

