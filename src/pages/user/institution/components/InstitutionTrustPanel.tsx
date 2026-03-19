import React from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type InstitutionTrustPanelProps = {
  memberMode: boolean;
  onToggleMemberMode: () => void;
};

export default function InstitutionTrustPanel({
  memberMode,
  onToggleMemberMode,
}: InstitutionTrustPanelProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="fh-eyebrow text-[#03cd8c]">
              Members-only area
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">Private institution section</div>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
            onClick={onToggleMemberMode}
          >
            {memberMode ? "Member view on" : "Preview lock state"}
          </Button>
        </div>

        {!memberMode ? (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-[#f8fafc] p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
              <Lock className="h-6 w-6" />
            </div>
            <div className="mb-2 text-lg font-semibold text-slate-900">Members-only resources</div>
            <div className="mx-auto max-w-md fh-body-tight text-slate-600">
              Premium content may include private notes, internal replays, and exclusive community
              channels.
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" data-action-label="Unlock membership">
                Unlock membership
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                data-action-label="View benefits"
              >
                View benefits
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-[#03cd8c]/15 bg-[#ecfff8] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" />
              Membership active
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-white bg-white p-4">
                Private leader notes and replay extras
              </div>
              <div className="rounded-2xl border border-white bg-white p-4">
                Members-only event discounts and reserved ticket windows
              </div>
              <div className="rounded-2xl border border-white bg-white p-4">
                Internal announcements and deeper study library
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

