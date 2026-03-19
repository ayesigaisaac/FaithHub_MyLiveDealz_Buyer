import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SponsoredPanel() {
  return (
    <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="fh-eyebrow text-[#f77f00]">
              Sponsored placement
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              Featured institution listing
            </div>
          </div>
          <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">
            Sponsored
          </Badge>
        </div>

        <div className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Sparkles className="h-4 w-4 text-[#f77f00]" />
            FaithHub Global Chapel
          </div>
          <div className="fh-body-tight text-slate-600">
            Featured placements are clearly labeled and controlled through transparent promotion
            rules so discovery quality stays trustworthy.
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" data-action-label="Open profile">
              Explore profile
            </Button>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-medium text-[#03cd8c]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Transparent ad policy
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

