// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRightLeft,
  BadgeCheck,
  Bell,
  CheckCircle2,
  CreditCard,
  FileWarning,
  Globe2,
  HandCoins,
  Layers3,
  Receipt,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wallet,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const feeRows = [
  { title: "Marketplace fee reconciliation", value: "$18,420", status: "Matched" },
  { title: "Donation processing fees", value: "$4,812", status: "Matched" },
  { title: "Pending refund outflow", value: "$1,340", status: "In review" },
  { title: "Payout variance watchlist", value: "$620", status: "Attention" },
];

const disputes = [
  {
    caseId: "DSP-20419",
    type: "Charge dispute",
    entity: "FaithMart ticket purchase",
    risk: "High",
    note: "Cardholder claims unrecognized event transaction.",
  },
  {
    caseId: "DSP-20420",
    type: "Donation reversal inquiry",
    entity: "Mission Outreach fund",
    risk: "Medium",
    note: "Donor requests review of recurring payment authorization timing.",
  },
  {
    caseId: "DSP-20422",
    type: "Marketplace payout hold",
    entity: "Vendor booth settlement",
    risk: "High",
    note: "Settlement held after mismatch between registration and payout profile.",
  },
];

const payoutRails = [
  { rail: "Standard platform payout", state: "Active", note: "Default settlement flow" },
  { rail: "Custom regional bank rail", state: "Premium", note: "Institution-specific payout route" },
  { rail: "Fast payout lane", state: "Premium", note: "Priority settlement where enabled" },
];

const reconciliationItems = [
  "Compare marketplace orders against payout batches",
  "Review donation receipts versus ledger entries",
  "Track refunds and dispute-related reversals",
  "Export finance-ready audit bundles across modules",
];

export default function FaithHubPaymentsDonationsDisputes() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [riskScoring, setRiskScoring] = useState(true);
  const [customPayoutRails, setCustomPayoutRails] = useState(true);
  const [selectedCase, setSelectedCase] = useState("DSP-20419");

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="w-full">
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Financial oversight command</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Reconciliation, refunds, payouts, disputes, risk</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.63fr_0.37fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Protect money movement across the ecosystem</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Reconcile fees, oversee refunds, manage payout integrity, and investigate disputes with enterprise-grade control.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This admin finance console spans FaithMart ticketing, marketplace payouts, donation settlements, refunds, and dispute investigations. Premium tools add stronger risk scoring and custom payout infrastructure.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Finance posture</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Open disputes</div>
                        <div className="mt-1 text-3xl font-semibold text-white">{disputes.length}</div>
                        <div className="mt-2 text-sm text-white/80">One selected case under active admin review.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open finance desk</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineReadOnly((prev) => !prev)}
                        >
                          {offlineReadOnly ? "Go live" : "Read only"}
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
                  title="Fees and reconciliation"
                  subtitle="Follow money movement from order, donation, and payout into final finance truth."
                />
                <div className="space-y-3">
                  {feeRows.map((row) => (
                    <div key={row.title} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{row.title}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.status === "Matched" ? "bg-[#ecfff8] text-[#03cd8c]" : row.status === "In review" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-rose-50 text-rose-600"}`}>
                          {row.status}
                        </span>
                      </div>
                      <div className="text-2xl font-semibold text-slate-900">{row.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {reconciliationItems.map((item) => (
                    <div key={item} className="fh-subcard-muted rounded-[24px] p-4 text-sm text-slate-600">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  title="Disputes and risk scoring"
                  subtitle="Investigate claims, rank severity, and trigger the right financial response."
                  action="Cases"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setRiskScoring((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${riskScoring ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <ShieldAlert className="h-4 w-4 text-[#8ef0ca]" /> Risk scoring
                    </div>
                    <div className="text-sm text-white/75">{riskScoring ? "Case prioritization and confidence scoring are active." : "Manual case ranking only."}</div>
                  </button>
                  {disputes.map((item) => (
                    <button
                      key={item.caseId}
                      onClick={() => setSelectedCase(item.caseId)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${selectedCase === item.caseId ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"}`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold">{item.caseId}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.risk === "High" ? "bg-rose-500/20 text-rose-100" : "bg-[#f77f00]/20 text-[#fff1d6]"}`}>
                          {item.risk}
                        </span>
                      </div>
                      <div className="text-xs text-white/55">{item.type}  {item.entity}</div>
                      <div className="mt-2 text-sm text-white/75">{item.note}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Custom payout rails and settlement"
                  subtitle="Premium finance infrastructure for sophisticated institutions and regions."
                  action="Premium"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setCustomPayoutRails((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${customPayoutRails ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <ArrowRightLeft className="h-4 w-4 text-[#03cd8c]" /> Custom payout rails
                    </div>
                    <div className="text-sm text-slate-600">{customPayoutRails ? "Alternative settlement routes and custom payout handling are enabled." : "Standard platform settlement only."}</div>
                  </button>
                  <div className="space-y-3">
                    {payoutRails.map((rail) => (
                      <div key={rail.rail} className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <div className="text-sm font-semibold text-slate-900">{rail.rail}</div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${rail.state === "Active" ? "bg-[#ecfff8] text-[#03cd8c]" : rail.state === "Premium" ? "bg-slate-100 text-slate-700" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                            {rail.state}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">{rail.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Refund workflows and payout oversight"
                  subtitle="Protect both users and providers during reversals, holds, and settlement checks."
                  action="Finance ops"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Admins can oversee refund lifecycles for ticketing, merchandise, and donation-related reversals where policy allows.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Marketplace payout review can detect mismatches between event registration, booth ownership, and beneficiary payout destinations.
                  </div>
                  <div className="fh-subcard-accent rounded-[24px] p-4 text-slate-700">
                    Risk scoring and payout rail selection help route high-sensitivity cases into safer handling paths before settlement completes.
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineReadOnly}>
                    <HandCoins className="mr-2 h-4 w-4" /> Execute refund or hold action
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
