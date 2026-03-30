// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  EyeOff,
  FileText,
  HeartHandshake,
  Layers3,
  PiggyBank,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/constants/routes";

const funds = [
  {
    title: "General Giving",
    target: "$40,000",
    recurring: true,
    privacy: "Optional donor wall",
    state: "Active",
  },
  {
    title: "Mission Outreach",
    target: "$20,000",
    recurring: true,
    privacy: "Private by default",
    state: "Active",
  },
  {
    title: "Childrens Ministry",
    target: "$15,000",
    recurring: false,
    privacy: "Named donors only on consent",
    state: "Draft",
  },
];

const donorSegments = [
  { name: "Recurring donors", count: "842" },
  { name: "One-time donors", count: "3,214" },
  { name: "High-value supporters", count: "114" },
  { name: "Anonymous donors", count: "289" },
];

const payoutSchedule = [
  { title: "Weekly settlement", note: "Every Friday at 5:00 PM" },
  { title: "Monthly reconciliation close", note: "Last day of month" },
  { title: "Emergency payout hold", note: "Manual approval required" },
];

const reconciliationItems = [
  { item: "Donation ledger vs payout batch", status: "Matched" },
  { item: "Receipt issuance audit", status: "Matched" },
  { item: "Pending dispute review", status: "Attention" },
  { item: "Tax export readiness", status: "Ready" },
];

export default function FaithHubDonationsFunds() {
  const navigate = useNavigate();
  const [offlineViewOnly, setOfflineViewOnly] = useState(true);
  const [recurringEnabled, setRecurringEnabled] = useState(true);
  const [donorPrivacyControls, setDonorPrivacyControls] = useState(true);
  const [payoutScheduling, setPayoutScheduling] = useState(true);
  const [instantPayouts, setInstantPayouts] = useState(true);
  const [advancedReconciliation, setAdvancedReconciliation] = useState(true);
  const [selectedFund, setSelectedFund] = useState("General Giving");

  const activeFund = useMemo(() => funds.find((fund) => fund.title === selectedFund), [selectedFund]);

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Donations & Funds</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineViewOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineViewOnly ? "View only while offline" : "Funds and payout tools live"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#20cf9c] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Fund and payout operations</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Recurring giving, receipts, segmentation, reconciliation</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Manage generosity with rigor</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Create giving funds, segment donors, manage payouts, and prepare premium-grade reconciliation from one command layer.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Donations & Funds supports provider-side fund creation, recurring settings, receipt fields, privacy controls, payout timing, and enterprise-grade fundraising enhancements like instant payouts and reconciliation tooling.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Selected fund</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Fund</div>
                        <div className="mt-1 text-2xl font-semibold text-white">{activeFund?.title}</div>
                        <div className="mt-2 text-sm text-white/80">Target {activeFund?.target}</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button
                          className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90"
                          onClick={() => navigate(routes.app.provider.fundCreate)}
                          data-no-nav
                        >
                          Create fund
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineViewOnly((prev) => !prev)}
                        >
                          {offlineViewOnly ? "View offline" : "Enable offline view"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Funds and campaigns"
                  subtitle="Create and manage institution giving destinations with recurring behavior and receipt readiness."
                />
                <div className="space-y-3">
                  {funds.map((fund) => (
                    <button
                      key={fund.title}
                      onClick={() => setSelectedFund(fund.title)}
                      className={`w-full rounded-[24px] border p-4 text-left shadow-sm transition ${selectedFund === fund.title ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{fund.title}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${fund.state === "Active" ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-slate-100 text-slate-700"}`}>
                          {fund.state}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Target {fund.target}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Recurring {fund.recurring ? "Enabled" : "Off"}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{fund.privacy}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr]">
              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Donor segmentation and privacy</div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {donorSegments.map((segment) => (
                        <div key={segment.name} className="fh-subcard rounded-[24px] p-4">
                          <div className="mb-1 text-sm font-semibold text-slate-900">{segment.name}</div>
                          <div className="text-2xl font-semibold text-slate-900">{segment.count}</div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setDonorPrivacyControls((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${donorPrivacyControls ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <EyeOff className="h-4 w-4 text-[#03cd8c]" /> Donor privacy controls
                      </div>
                      <div className="text-sm text-slate-600">{donorPrivacyControls ? "Anonymous, opt-in, and donor wall privacy rules are enabled." : "Basic visibility rules only."}</div>
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Recurring and receipts</div>
                  <div className="space-y-4">
                    <button
                      onClick={() => setRecurringEnabled((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${recurringEnabled ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <RefreshCw className="h-4 w-4 text-[#03cd8c]" /> Recurring giving options
                      </div>
                      <div className="text-sm text-slate-600">{recurringEnabled ? "Recurring donation intervals are enabled for selected funds." : "One-time giving only."}</div>
                    </button>
                    <div className="fh-subcard-muted rounded-[24px] p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Receipt className="h-4 w-4 text-[#03cd8c]" /> Receipt fields
                      </div>
                      <div className="text-sm text-slate-600">Configure email receipts, receipt IDs, tax fields, and donor-facing acknowledgment notes.</div>
                    </div>
                    <div className="fh-subcard-muted rounded-[24px] p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <FileText className="h-4 w-4 text-[#03cd8c]" /> Receipt output
                      </div>
                      <div className="text-sm text-slate-600">Receipts can include institution details, fund designation, frequency, and optional compliance fields.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Payout scheduling"
                  subtitle="Define how money leaves the platform into the institutions payout flow."
                  action="Finance"
                />
                <div className="space-y-3">
                  {payoutSchedule.map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-white/75">{item.note}</div>
                    </div>
                  ))}
                  <button
                    onClick={() => setPayoutScheduling((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${payoutScheduling ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <CalendarDays className="h-4 w-4 text-[#8ef0ca]" /> Scheduled payouts
                    </div>
                    <div className="text-sm text-white/75">{payoutScheduling ? "Automated payout cadence is enabled." : "Manual payout timing only."}</div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Premium fundraising suite"
                  subtitle="Advanced money movement and finance control for larger institutions."
                  action="Premium"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setInstantPayouts((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${instantPayouts ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Wallet className="h-4 w-4 text-[#03cd8c]" /> Instant payouts
                    </div>
                    <div className="text-sm text-slate-600">{instantPayouts ? "Instant payout capability is enabled where platform support exists." : "Standard payout timing only."}</div>
                  </button>
                  <button
                    onClick={() => setAdvancedReconciliation((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${advancedReconciliation ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Layers3 className="h-4 w-4 text-[#03cd8c]" /> Advanced reconciliation
                    </div>
                    <div className="text-sm text-slate-600">{advancedReconciliation ? "Ledger comparison, payout variance review, and audit matching are enabled." : "Basic reconciliation only."}</div>
                  </button>
                  <div className="space-y-3">
                    {reconciliationItems.map((item) => (
                      <div key={item.item} className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{item.item}</div>
                        <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Matched" || item.status === "Ready" ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Offline behavior"
                  subtitle="Fundraising operations stay visible, but edits require connection."
                  action="Read only"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    While offline, provider teams can review fund setup, donor segmentation, payout cadence, and reconciliation posture, but cannot modify records.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    This protects finance integrity while still supporting operational visibility in weak-network environments.
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineViewOnly}>
                    <CreditCard className="mr-2 h-4 w-4" /> Update payout rules
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


function SectionHeader({ title, subtitle, action = "View all" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}





