// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  Blocks,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Crown,
  Download,
  Globe2,
  HeartHandshake,
  Layers3,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: "free",
    name: "FaithHub Free",
    price: "$0",
    cadence: "/month",
    description: "Core faith discovery, public live sessions, basic library access, and standard notifications.",
    features: [
      "Public institution profiles",
      "Standard live viewing",
      "Basic downloaded sermon access",
      "Standard event discovery",
    ],
    tone: "border-slate-200 bg-white",
  },
  {
    id: "supporter",
    name: "Supporter",
    price: "$9.99",
    cadence: "/month",
    description: "Unlock supporter perks, selected premium series, member badges, and deeper participation lanes.",
    features: [
      "Premium series and study resources",
      "Supporter badge in live/chat",
      "Priority access for some sessions",
      "Enhanced replay and series utilities",
    ],
    tone: "border-[#03cd8c] bg-[#ecfff8]",
    featured: true,
  },
  {
    id: "family",
    name: "Family Membership",
    price: "$16.99",
    cadence: "/month",
    description: "Shared access for households with family-safe settings and coordinated entitlements where supported.",
    features: [
      "Household entitlements",
      "Shared premium series access",
      "Parental and family controls",
      "Family event bundles",
    ],
    tone: "border-slate-200 bg-white",
  },
];

const entitlements = [
  {
    title: "Premium Series Access",
    detail: "Unlocked for selected institutions and supporter-gated teachings.",
    active: true,
  },
  {
    title: "Member-only Q&A Queue",
    detail: "Priority submission lane during supported live sessions.",
    active: true,
  },
  {
    title: "Family Sharing",
    detail: "Ready when supported by the active billing environment and account structure.",
    active: false,
  },
  {
    title: "Institution Group Membership",
    detail: "Available for managed group enrollments through enterprise or institution-admin flows.",
    active: false,
  },
];

const compareRows = [
  {
    label: "Premium series",
    free: "Limited",
    supporter: "Full",
    family: "Shared",
  },
  {
    label: "Live badges",
    free: "No",
    supporter: "Yes",
    family: "Yes",
  },
  {
    label: "Family sharing",
    free: "No",
    supporter: "No",
    family: "Supported",
  },
  {
    label: "Priority interactive access",
    free: "Standard",
    supporter: "Priority",
    family: "Priority",
  },
  {
    label: "Advanced parental tools",
    free: "Basic",
    supporter: "Basic",
    family: "Advanced",
  },
];

const billingTimeline = [
  { title: "Active subscription", detail: "Supporter plan renewed successfully.", time: "Today  09:14" },
  { title: "Entitlement refresh", detail: "Premium series and member queue updated on this device.", time: "Today  09:16" },
  { title: "Family sharing check", detail: "Awaiting platform support verification for current region/device combination.", time: "Today  09:17" },
];

export default function FaithHubSubscriptionsMembership() {
  const [selectedPlan, setSelectedPlan] = useState("supporter");
  const [currentPlan, setCurrentPlan] = useState("supporter");
  const [offlineMode, setOfflineMode] = useState(false);
  const [familySharing, setFamilySharing] = useState(true);
  const [groupMembershipPreview, setGroupMembershipPreview] = useState(true);
  const [annualBilling, setAnnualBilling] = useState(false);

  const currentPlanData = useMemo(() => plans.find((p) => p.id === currentPlan), [currentPlan]);
  const selectedPlanData = useMemo(() => plans.find((p) => p.id === selectedPlan), [selectedPlan]);

  const prorationLabel = useMemo(() => {
    if (selectedPlan === currentPlan) return "You are already on this plan.";
    if (annualBilling) return "Estimated prorated change applies to annual billing cycle.";
    return "Estimated prorated change applies to the current monthly cycle.";
  }, [selectedPlan, currentPlan, annualBilling]);

  return (
    <div className="min-h-0 overflow-x-clip bg-[#f2f2f2] text-slate-900">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[1.95rem] font-semibold leading-tight text-slate-900">Subscriptions & Membership</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineMode ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineMode ? "Entitlement cache in use" : "Billing and entitlements synced"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-[#bdeedb] bg-gradient-to-br from-[#e9fbf4] via-[#f3fdf9] to-white shadow-[0_20px_54px_-34px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-slate-900">
                  <div className="grid gap-5 lg:grid-cols-[0.65fr_0.35fr]">
                    <div className="space-y-4">
                      <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
                        Compare plans, manage billing, understand entitlements, and prepare for family or institution-wide membership in one calm experience.
                      </h1>
                      <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                        This page is built for clarity around subscriptions and memberships. Users can compare plans, see entitlement effects, understand proration, and view cached access when offline.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe9de] bg-white px-3 py-1">
                          <CreditCard className="h-4 w-4" />
                          Platform billing ready
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe9de] bg-white px-3 py-1">
                          <Layers3 className="h-4 w-4" />
                          Entitlement-aware UI
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe9de] bg-white px-3 py-1">
                          <Users className="h-4 w-4" />
                          Family and group models
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#cde8dd] bg-white/90 p-4">
                      <div className="mb-3 text-sm font-semibold text-slate-700">Current plan</div>
                      <div className="rounded-[24px] border border-[#d8e7df] bg-[#f8fdfb] p-4">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Active</div>
                        <div className="text-2xl font-semibold text-slate-900">{currentPlanData?.name}</div>
                        <div className="mt-2 text-sm text-slate-600">{annualBilling ? "Annual billing" : "Monthly billing"}</div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-1">
                        <Button className="w-full rounded-2xl bg-[#03cd8c] text-white">Manage plan</Button>
                        <Button
                          variant="outline"
                          className="w-full rounded-2xl border-slate-200 bg-white text-slate-700"
                          onClick={() => setOfflineMode((prev) => !prev)}
                        >
                          {offlineMode ? "Online sync" : "Offline cache"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Available plans</div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-slate-200 bg-white sm:w-auto"
                    onClick={() => setAnnualBilling((prev) => !prev)}
                  >
                    {annualBilling ? "Annual billing" : "Monthly billing"}
                  </Button>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`rounded-[24px] border p-4 text-left shadow-sm ${selectedPlan === plan.id ? "border-slate-200 bg-white shadow-sm" : plan.tone}`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <div className="text-base font-semibold text-slate-900">{plan.name}</div>
                        {plan.featured && (
                          <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">Popular</span>
                        )}
                      </div>
                      <div className="mb-3 flex items-end gap-1">
                        <div className="text-3xl font-semibold text-slate-900">{plan.price}</div>
                        <div className="pb-1 text-sm text-slate-500">{plan.cadence}</div>
                      </div>
                      <div className="fh-body-tight text-slate-600">{plan.description}</div>
                      <div className="mt-4 space-y-2 text-sm text-slate-600">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-5 fh-subcard-muted rounded-[24px] p-4">
                  <div className="mb-2 text-sm font-semibold text-slate-900">Proration preview</div>
                  <div className="text-sm text-slate-600">{prorationLabel}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button className="rounded-2xl bg-[#03cd8c]">Subscribe / Switch</Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white">
                      Cancel membership
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Plan comparison</div>
                  </div>
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c]">
                    <Blocks className="mr-1 h-3.5 w-3.5" /> Structured view
                  </Badge>
                </div>
                <div className="fh-data-grid">
                  <div className="fh-data-grid-head hidden grid-cols-4 px-4 py-3 text-sm font-semibold text-white sm:grid">
                    <div>Feature</div>
                    <div>Free</div>
                    <div>Supporter</div>
                    <div>Family</div>
                  </div>
                  {compareRows.map((row, index) => (
                    <div key={row.label} className={`fh-data-grid-row grid gap-3 px-4 py-4 text-sm sm:grid-cols-4 sm:gap-0 sm:py-3 ${index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}>
                      <div className="font-medium text-slate-900">{row.label}</div>
                      <div className="grid gap-2 sm:contents">
                        <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-3 py-2 sm:block sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0">
                          <span className="font-medium text-slate-500 sm:hidden">Free</span>
                          <span className="text-slate-600">{row.free}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-3 py-2 sm:block sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0">
                          <span className="font-medium text-slate-500 sm:hidden">Supporter</span>
                          <span className="text-slate-600">{row.supporter}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-3 py-2 sm:block sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0">
                          <span className="font-medium text-slate-500 sm:hidden">Family</span>
                          <span className="text-slate-600">{row.family}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-white sm:text-xl">Entitlements</div>
                  </div>
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-white">
                    <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                  </Button>
                </div>
                <div className="space-y-3">
                  {entitlements.map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 flex items-center gap-2">
                        {item.active ? (
                          <CheckCircle2 className="h-4 w-4 text-[#8ef0ca]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-white/60" />
                        )}
                        <div className="text-sm font-semibold text-white">{item.title}</div>
                      </div>
                      <div className="text-sm text-white/70">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Family and group memberships</div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-slate-200 bg-white sm:w-auto"
                    onClick={() => setGroupMembershipPreview((prev) => !prev)}
                  >
                    {groupMembershipPreview ? "Preview on" : "Preview off"}
                  </Button>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setFamilySharing((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left ${
                      familySharing ? "border-[#03cd8c]/20 bg-[#ecfff8]" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Users className="h-4 w-4 text-[#03cd8c]" /> Family sharing
                    </div>
                    <div className="text-sm text-slate-600">
                      {familySharing ? "Family sharing is ready to apply where platform and regional support allow." : "Family sharing is currently disabled in this preview state."}
                    </div>
                  </button>

                  {groupMembershipPreview ? (
                    <div className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Building2 className="h-4 w-4 text-[#f77f00]" /> Enterprise group memberships
                      </div>
                      <div className="text-sm text-slate-600">
                        Churches, ministries, and institutions can provision shared memberships across approved users, with central billing, managed access, and synchronized entitlements.
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[24px] border border-dashed border-[#f77f00]/20 bg-white p-5 text-center text-sm text-slate-600">
                      Group membership preview is hidden in this state.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Billing state and sync history</div>
                  </div>
                  <Badge className="rounded-full bg-[#ecfff8] text-[#03cd8c]">
                    <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Safe cache
                  </Badge>
                </div>

                <div className="space-y-3">
                  {billingTimeline.map((item) => (
                    <div key={item.title} className="fh-subcard-muted rounded-[24px] p-4">
                      <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-600">{item.detail}</div>
                      <div className="mt-2 text-xs text-slate-500">{item.time}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 fh-subcard rounded-[24px] p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Download className="h-4 w-4 text-[#03cd8c]" /> Offline entitlement cache
                  </div>
                  <div className="text-sm text-slate-600">
                    Users can still view their active entitlements and current plan state while offline. Billing changes sync automatically once the connection is restored.
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





