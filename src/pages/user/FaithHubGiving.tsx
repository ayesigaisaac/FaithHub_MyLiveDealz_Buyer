import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  HeartHandshake,
  Lock,
  Receipt,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import type { DonationMode, GivingFund } from "@/pages/user/giving/types";

const givingFunds: GivingFund[] = [
  {
    id: 1,
    title: "General Giving",
    description: "Support weekly services, operations, and care programs.",
    raised: "$24,500",
    goal: "$40,000",
    progress: 61,
  },
  {
    id: 2,
    title: "Mission Outreach",
    description: "Fund missions, travel, materials, and community support.",
    raised: "$12,900",
    goal: "$20,000",
    progress: 64,
  },
  {
    id: 3,
    title: "Childrens Ministry",
    description: "Equip learning spaces and youth support activities.",
    raised: "$8,700",
    goal: "$15,000",
    progress: 58,
  },
];

export default function FaithHubGiving() {
  const [selectedFundId, setSelectedFundId] = useState(givingFunds[0].id);
  const [amount, setAmount] = useState("25");
  const [mode, setMode] = useState<DonationMode>("One-time");
  const [receiptEmail, setReceiptEmail] = useState("naomi@faithhub.com");
  const [offlineMode, setOfflineMode] = useState(false);
  const [supporterTier, setSupporterTier] = useState(true);

  const selectedFund = useMemo(
    () => givingFunds.find((fund) => fund.id === selectedFundId) || givingFunds[0],
    [selectedFundId],
  );

  return (
    <div className="space-y-4">
      <Card className="fh-interactive-card overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(108deg,rgba(247,127,0,0.12),rgba(248,251,252,0.94)_34%,rgba(3,205,140,0.12))] shadow-[var(--shadow-soft)]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-slate-500">Giving</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">FaithHub Giving</h2>
              <p className="mt-2 text-sm text-slate-600">Secure giving, transparent progress, and clear receipt tracking.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  {selectedFund.title}
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-100">
                  Mode: {mode}
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-white">
                  {offlineMode ? "Intent mode" : "Payment ready"}
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[410px]">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button
                  variant="outline"
                  data-action-label="Manage plan"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Manage plan
                </Button>
                <Button
                  variant="outline"
                  data-action-label="Open institution"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Institution
                </Button>
                <Button
                  data-action-label="Continue to payment"
                  className="h-10 rounded-xl bg-[#03cd8c] px-4 text-sm text-white hover:bg-[#03cd8c]"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <FundSummaryCard
              title="Selected fund"
              value={selectedFund.title}
              note={`${selectedFund.raised} raised of ${selectedFund.goal}`}
            />
            <FundSummaryCard title="Amount" value={`$${amount}`} note="Editable before payment" />
            <FundSummaryCard title="Mode" value={mode} note="Recurring or one-time" />
            <FundSummaryCard
              title="Trust"
              value={supporterTier ? "Supporter tier" : "Standard"}
              note="Tax-compliant receipt flow"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Fund progress"
          value={`${selectedFund.progress}%`}
          hint={`${selectedFund.raised} of ${selectedFund.goal}`}
          tone="emerald"
          icon={<HeartHandshake className="h-4 w-4" />}
          progress={selectedFund.progress}
        />
        <DashboardStatCard
          label="Processing"
          value={offlineMode ? "Paused" : "Active"}
          hint={offlineMode ? "Intent-only mode" : "Ready for payment capture"}
          tone={offlineMode ? "orange" : "slate"}
          icon={<Wallet className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Receipt"
          value="Enabled"
          hint={receiptEmail}
          tone="slate"
          icon={<Receipt className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Security"
          value="Protected"
          hint="Encryption and trust checks active"
          tone="emerald"
          icon={<Lock className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1.05fr_1.1fr]">
        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Fund Selector"
              subtitle="Choose where your giving should go"
              action={
                <button
                  type="button"
                  data-action-label="Open institution"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  Open institution
                </button>
              }
            />

            <div className="space-y-2">
              {givingFunds.map((fund) => {
                const active = fund.id === selectedFundId;
                return (
                  <button
                    key={fund.id}
                    type="button"
                    onClick={() => setSelectedFundId(fund.id)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-emerald-200 bg-[#ecfff8]"
                        : "border-[var(--border)] bg-white hover:border-[#c8f0e0]"
                    }`}
                  >
                    <div className="text-sm font-semibold text-slate-900">{fund.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{fund.description}</div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-[#03cd8c]" style={{ width: `${fund.progress}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Payment Summary"
              subtitle="Review amount and mode before confirming"
              action={
                <button
                  type="button"
                  data-action-label="Continue to payment"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  Continue to payment
                </button>
              }
            />

            <div className="space-y-3">
              <Field label="Amount (USD)">
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="h-10 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-slate-700 outline-none"
                />
              </Field>

              <Field label="Mode">
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value as DonationMode)}
                  className="h-10 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-slate-700 outline-none"
                >
                  <option>One-time</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </Field>

              <Field label="Receipt email">
                <input
                  value={receiptEmail}
                  onChange={(event) => setReceiptEmail(event.target.value)}
                  className="h-10 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-slate-700 outline-none"
                />
              </Field>

              <Button
                data-action-label="Continue to payment"
                className="h-11 w-full rounded-xl bg-[#03cd8c] text-white hover:bg-[#03cd8c]"
              >
                Continue to payment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Trust & Actions"
              subtitle="Security, plans, and support signals"
              action={
                <button
                  type="button"
                  aria-label="Open giving settings"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              }
            />

            <div className="space-y-2">
              <DashboardActionItem
                title="Manage membership plan"
                detail="View or change recurring giving commitments."
                actionLabel="Manage plan"
              />
              <DashboardActionItem
                title="Open institution profile"
                detail="Review impact stories and fund transparency."
                actionLabel="Open institution"
              />
              <DashboardActionItem
                title={supporterTier ? "Supporter tier active" : "Enable supporter tier"}
                detail="Unlock deeper giving insights and milestone updates."
                onClick={() => setSupporterTier((prev) => !prev)}
                tone="elevated"
              />
              <DashboardActionItem
                title={offlineMode ? "Switch to live payments" : "Switch to intent mode"}
                detail="Toggle payment capture for planning and review sessions."
                onClick={() => setOfflineMode((prev) => !prev)}
              />
            </div>

            <div className="mt-3 fh-subcard-accent rounded-xl p-3">
              <div className="fh-label text-emerald-700">Trust insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Transparent funds improve recurring commitment</div>
              <p className="mt-1 text-xs text-slate-600">
                Users who review fund progress before payment are more likely to continue monthly support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Receipt status"
          value="Ready"
          hint="Email confirmation enabled"
          tone="slate"
          icon={<Receipt className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Trust score"
          value="High"
          hint="Institution verification complete"
          tone="emerald"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Mode"
          value={offlineMode ? "Intent" : "Live"}
          hint="Payment capture state"
          tone={offlineMode ? "orange" : "emerald"}
          icon={<Wallet className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Completion"
          value="64%"
          hint="Users completing suggested amount"
          tone="orange"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
      </div>

      <UserActionBar
        actions={[
          {
            id: "giving-pay",
            label: "Pay",
            dataActionLabel: "Continue to payment",
            variant: "default",
          },
          {
            id: "giving-manage-plan",
            label: "Manage plan",
            dataActionLabel: "Manage plan",
          },
          {
            id: "giving-open-institution",
            label: "Institution",
            dataActionLabel: "Open institution",
          },
        ]}
      />
    </div>
  );
}

function FundSummaryCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white/90 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{title}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{note}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

