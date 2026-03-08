// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Gift,
  HeartHandshake,
  PiggyBank,
  Receipt,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wallet,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const funds = [
  {
    id: 1,
    title: "General Giving",
    description: "Support the institutionâ€™s ongoing mission, operations, and weekly services.",
    raised: "$24,500",
    goal: "$40,000",
    progress: 61,
  },
  {
    id: 2,
    title: "Mission Outreach",
    description: "Fund external missions, travel, outreach materials, and community care.",
    raised: "$12,900",
    goal: "$20,000",
    progress: 64,
  },
  {
    id: 3,
    title: "Childrenâ€™s Ministry",
    description: "Equip learning materials, safe spaces, and youth support activities.",
    raised: "$8,700",
    goal: "$15,000",
    progress: 58,
  },
];

const donorWall = [
  { name: "Grace N.", amount: "$50", note: "Praying with the missions team." },
  { name: "Anonymous", amount: "$25", note: "Supporting youth growth." },
  { name: "Household of Peace", amount: "$100", note: "For the childrenâ€™s ministry." },
];

const supporterPerks = [
  "Members-only series and selected premium study resources",
  "Priority access to some limited-capacity live experiences",
  "Supporter badge in community and live engagement surfaces",
  "Exclusive institution updates and special event windows",
];

export default function FaithHubGiving() {
  const [selectedFund, setSelectedFund] = useState(funds[0]);
  const [amount, setAmount] = useState("25");
  const [frequency, setFrequency] = useState("One-time");
  const [receiptEmail, setReceiptEmail] = useState("naomi@faithhub.com");
  const [prayerNote, setPrayerNote] = useState("Please pray with us as we support families and upcoming outreach work.");
  const [roundUp, setRoundUp] = useState(true);
  const [donorWallOptIn, setDonorWallOptIn] = useState(false);
  const [taxReceipt, setTaxReceipt] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [supporterTier, setSupporterTier] = useState(true);

  const queueLabel = useMemo(() => {
    return offlineMode ? "Giving intent queued. Payment will continue only when online." : "Secure payment ready";
  }, [offlineMode]);

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-sm/20">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Giving</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Intent only, no payment capture
              </div>
            )}
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-card relative overflow-visible rounded-xl border border-slate-200 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white text-[#03cd8c] hover:bg-white">Giving + receipts + supporter tiers</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">One-time, recurring, round-up, donor wall</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.63fr_0.37fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Giving with care and clarity</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Support faith work with one-time gifts, recurring generosity, and optional supporter membership in one premium flow.
                      </h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        This page combines donation funds, payment intent, receipts, prayer notes, donor wall settings, round-up giving, and a supporter subscription tier that can unlock defined perks in compliant product flows.
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

                    <div className="rounded-xl border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Payment readiness</div>
                      <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                        <div className="mb-2 text-xs uppercase tracking-[0.18em] text-white/70">State</div>
                        <div className="text-2xl font-semibold text-white">{queueLabel}</div>
                        <div className="mt-3 text-sm text-white/80">Offline mode stores donation intent only and never captures payment until online.</div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white">Continue giving</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineMode((prev) => !prev)}
                        >
                          {offlineMode ? "Go online" : "Offline intent"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Donation funds"
                  subtitle="Choose the exact cause or institution fund you want to support."
                />
                <div className="grid gap-3 md:grid-cols-3">
                  {funds.map((fund) => (
                    <button
                      key={fund.id}
                      onClick={() => setSelectedFund(fund)}
                      className={`rounded-xl border p-4 text-left transition ${
                        selectedFund.id === fund.id
                          ? "border-[#03cd8c] bg-[#ecfff8] shadow-lg shadow-sm/10"
                          : "border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                      }`}
                    >
                      <div className="mb-2 text-base font-semibold text-slate-900">{fund.title}</div>
                      <div className="text-sm leading-6 text-slate-600">{fund.description}</div>
                      <div className="mt-4 text-sm text-slate-500">{fund.raised} raised Â· {fund.goal} goal</div>
                      <div className="mt-2 h-2 rounded-full bg-white/70 ring-1 ring-slate-200">
                        <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: `${fund.progress}%` }} />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Give now"
                  subtitle="One-time or recurring giving with a simple, confidence-building flow."
                />
                <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
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
                          onChange={(e) => setAmount(e.target.value)}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                        />
                      </label>

                      <div>
                        <div className="mb-2 text-sm font-medium text-slate-700">Frequency</div>
                        <div className="flex flex-wrap gap-2">
                          {['One-time', 'Weekly', 'Monthly', 'Quarterly'].map((item) => (
                            <button
                              key={item}
                              onClick={() => setFrequency(item)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                frequency === item
                                  ? 'border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-sm/20'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]'
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Receipts and prayer note</div>
                    <div className="space-y-4">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Receipt email</span>
                        <input
                          value={receiptEmail}
                          onChange={(e) => setReceiptEmail(e.target.value)}
                          className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                        />
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Pray-with-us note</span>
                        <textarea
                          value={prayerNote}
                          onChange={(e) => setPrayerNote(e.target.value)}
                          rows={4}
                          className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                        />
                      </label>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          onClick={() => setRoundUp((prev) => !prev)}
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            roundUp ? 'border-[#03cd8c]/20 bg-[#ecfff8]' : 'border-slate-200 bg-white hover:border-[#03cd8c]/35'
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <PiggyBank className="h-4 w-4 text-[#03cd8c]" /> Round-up giving
                          </div>
                          <div className="text-sm text-slate-600">{roundUp ? 'Enabled for eligible micro-rounding flows.' : 'Disabled for this contribution.'}</div>
                        </button>
                        <button
                          onClick={() => setDonorWallOptIn((prev) => !prev)}
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            donorWallOptIn ? 'border-[#03cd8c]/20 bg-[#ecfff8]' : 'border-slate-200 bg-white hover:border-[#03cd8c]/35'
                          }`}
                        >
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <Users className="h-4 w-4 text-[#03cd8c]" /> Donor wall opt-in
                          </div>
                          <div className="text-sm text-slate-600">{donorWallOptIn ? 'Your contribution may appear publicly.' : 'Stay private or anonymous.'}</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-card rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Donor wall and receipts"
                  subtitle="Public encouragement only when the giver opts in."
                  action="History"
                />
                <div className="space-y-3">
                  {donorWall.map((entry) => (
                    <div key={`${entry.name}-${entry.amount}`} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-white">{entry.name}</div>
                        <div className="text-sm font-semibold text-white">{entry.amount}</div>
                      </div>
                      <div className="text-sm text-white/75">{entry.note}</div>
                    </div>
                  ))}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button variant="outline" className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15">
                      <Receipt className="mr-2 h-4 w-4" /> View receipts
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                      onClick={() => setTaxReceipt((prev) => !prev)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {taxReceipt ? 'Tax receipt enabled' : 'Enable tax receipts'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f77f00]">Supporter subscription tier</div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Add recurring support with clear perks</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setSupporterTier((prev) => !prev)}
                  >
                    {supporterTier ? 'Supporter tier on' : 'Preview supporter tier'}
                  </Button>
                </div>

                <div className="space-y-3">
                  {supporterTier ? (
                    supporterPerks.map((perk) => (
                      <div key={perk} className="rounded-xl border border-[#f77f00]/15 bg-white p-4 shadow-sm text-sm text-slate-600">
                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                          <Star className="h-4 w-4 text-[#f77f00]" /> Supporter perk
                        </div>
                        {perk}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#f77f00]/20 bg-white p-6 text-center text-sm text-slate-600">
                      Supporter perks are hidden in this preview state.
                    </div>
                  )}
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                    <Gift className="mr-2 h-4 w-4" /> Join supporter tier
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Offline and payment behavior"
                  subtitle="Giving intent may queue, but payments must wait for connectivity."
                  action="Wallet"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                    Users can select a fund, choose amount and frequency, and queue their giving intent while offline.
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                    Payment capture is never attempted offline. The page resumes securely when the network returns.
                  </div>
                  <div className="rounded-xl border border-[#03cd8c]/15 bg-[#ecfff8] p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <ShieldCheck className="h-4 w-4 text-[#03cd8c]" /> Safe intent handling
                    </div>
                    <div>Offline mode stores the donorâ€™s choices and prayer note, but card or wallet authorization waits until the device reconnects.</div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                      <Wallet className="mr-2 h-4 w-4" /> Continue to payment
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <FileText className="mr-2 h-4 w-4 text-[#03cd8c]" /> Preview receipt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action = "See all" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      <Button variant="ghost" className="rounded-full text-[#03cd8c] hover:bg-[#03cd8c]/10 hover:text-[#03cd8c]">
        {action}
      </Button>
    </div>
  );
}


