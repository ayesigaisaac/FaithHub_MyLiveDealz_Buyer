import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { GivingFund } from "@/pages/user/giving/types";

type FundSelectorProps = {
  funds: GivingFund[];
  selectedFundId: number;
  onSelectFund: (fundId: number) => void;
};

export default function FundSelector({
  funds,
  selectedFundId,
  onSelectFund,
}: FundSelectorProps) {
  return (
    <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
      <CardContent className="fh-pad-panel">
        <div className="mb-4">
          <div className="text-lg font-semibold text-slate-900 sm:text-xl">Donation funds</div>
          <div className="text-sm text-slate-500">
            Choose the exact cause or institution fund you want to support.
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {funds.map((fund) => (
            <button
              key={fund.id}
              type="button"
              onClick={() => onSelectFund(fund.id)}
              className={`rounded-[24px] border p-4 text-left transition ${
                selectedFundId === fund.id
                  ? "border-slate-200 bg-white shadow-sm"
                  : "border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
              }`}
            >
              <div className="mb-2 text-base font-semibold text-slate-900">{fund.title}</div>
              <div className="fh-body-tight text-slate-600">{fund.description}</div>
              <div className="mt-4 text-sm text-slate-500">
                {fund.raised} raised - {fund.goal} goal
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/70 ring-1 ring-slate-200">
                <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: `${fund.progress}%` }} />
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

