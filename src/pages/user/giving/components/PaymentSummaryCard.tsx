import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DonationModeToggle from "@/pages/user/giving/components/DonationModeToggle";
import type { DonationMode, GivingFund } from "@/pages/user/giving/types";

type PaymentSummaryCardProps = {
  selectedFund: GivingFund;
  amount: string;
  onAmountChange: (nextAmount: string) => void;
  mode: DonationMode;
  onModeChange: (nextMode: DonationMode) => void;
  receiptEmail: string;
  onReceiptEmailChange: (nextEmail: string) => void;
};

export default function PaymentSummaryCard({
  selectedFund,
  amount,
  onAmountChange,
  mode,
  onModeChange,
  receiptEmail,
  onReceiptEmailChange,
}: PaymentSummaryCardProps) {
  return (
    <Card className="rounded-[32px] border border-white/60 bg-white/92 shadow-sm">
      <CardContent className="fh-pad-panel">
        <div className="mb-4">
          <div className="text-lg font-semibold text-slate-900 sm:text-xl">Give now</div>
          <div className="text-sm text-slate-500">
            One-time or recurring giving with a confidence-building flow.
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-900">Selected fund</div>
            <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
              <div className="text-base font-semibold text-slate-900">{selectedFund.title}</div>
              <div className="mt-1 text-sm text-slate-600">{selectedFund.description}</div>
            </div>

            <div className="mt-4 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Amount</span>
                <input
                  value={amount}
                  onChange={(event) => onAmountChange(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                />
              </label>

              <DonationModeToggle mode={mode} onChange={onModeChange} />
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-900">Receipts</div>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Receipt email</span>
              <input
                value={receiptEmail}
                onChange={(event) => onReceiptEmailChange(event.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
              />
            </label>

            <div className="mt-6 space-y-3">
              <Button
                className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]"
                data-action-label="Continue to payment"
              >
                Continue to payment
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                data-action-label="Manage plan"
              >
                Manage plan
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

