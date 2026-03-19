// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Globe2,
  Landmark,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Upload,
  UserPlus,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const steps = [
  { key: "profile", label: "Institution Profile" },
  { key: "verification", label: "Verification" },
  { key: "taxonomy", label: "Denomination & Taxonomy" },
  { key: "locations", label: "Locations" },
  { key: "staff", label: "Staff & Roles" },
  { key: "premium", label: "Premium Setup" },
];

const staffMembers = [
  { name: "Naomi Kato", role: "Super Admin", status: "Verified" },
  { name: "Daniel Ssentamu", role: "Live Director", status: "Invited" },
  { name: "Aisha Nabirye", role: "Community Lead", status: "Verified" },
  { name: "Samuel Otema", role: "Finance Lead", status: "Pending ID check" },
];

const campuses = [
  {
    name: "Kampala Main Campus",
    address: "Millennium House, Kampala Central",
    status: "Verified location",
  },
  {
    name: "Entebbe Outreach Campus",
    address: "Lake Road, Entebbe",
    status: "Pending site validation",
  },
];

export default function FaithHubProviderOnboarding() {
  const [activeStep, setActiveStep] = useState("profile");
  const [offlineDraft, setOfflineDraft] = useState(true);
  const [multiCampus, setMultiCampus] = useState(true);
  const [multiBrand, setMultiBrand] = useState(false);
  const [customDomain, setCustomDomain] = useState(false);
  const [riskCheckPassed, setRiskCheckPassed] = useState(true);
  const [adminKycPassed, setAdminKycPassed] = useState(true);
  const [locationVerified, setLocationVerified] = useState(false);

  const activeStepLabel = useMemo(
    () => steps.find((step) => step.key === activeStep)?.label,
    [activeStep]
  );

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="fh-eyebrow text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Provider Onboarding</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineDraft ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineDraft ? "Draft mode enabled" : "Live onboarding sync"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[0.33fr_0.67fr]">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <div className="mb-4">
                  <div className="fh-eyebrow text-[#8ef0ca]">Onboarding flow</div>
                  <div className="mt-2 text-xl font-semibold">Build the institution foundation correctly</div>
                </div>
                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const active = step.key === activeStep;
                    return (
                      <button
                        key={step.key}
                        onClick={() => setActiveStep(step.key)}
                        className={`flex w-full items-center gap-3 rounded-[24px] border px-4 py-4 text-left transition ${
                          active
                            ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white"
                            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${active ? "bg-[#03cd8c] text-white" : "bg-white/10 text-white"}`}>
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold">{step.label}</div>
                          <div className="text-xs text-white/60">Configure and validate</div>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4">
                  <div className="text-lg font-semibold text-slate-900">Live onboarding posture</div>
                  <div className="text-sm text-slate-500">Critical checks before activation and payouts.</div>
                </div>
                <div className="space-y-3">
                  <div className={`rounded-[24px] border p-4 ${adminKycPassed ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-[#f77f00]/15 bg-[#fff8ef]"}`}>
                    <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <BadgeCheck className={`h-4 w-4 ${adminKycPassed ? "text-[#03cd8c]" : "text-[#f77f00]"}`} />
                      Admin identity verification
                    </div>
                    <div className="text-sm text-slate-600">{adminKycPassed ? "Primary admin identity has passed verification." : "Primary admin identity still requires action."}</div>
                  </div>
                  <div className={`rounded-[24px] border p-4 ${riskCheckPassed ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-[#f77f00]/15 bg-[#fff8ef]"}`}>
                    <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <ShieldCheck className={`h-4 w-4 ${riskCheckPassed ? "text-[#03cd8c]" : "text-[#f77f00]"}`} />
                      Risk screening
                    </div>
                    <div className="text-sm text-slate-600">{riskCheckPassed ? "Risk checks currently clear for setup continuation." : "Risk review has flagged additional review requirements."}</div>
                  </div>
                  <div className={`rounded-[24px] border p-4 ${locationVerified ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-[#f77f00]/15 bg-[#fff8ef]"}`}>
                    <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <MapPin className={`h-4 w-4 ${locationVerified ? "text-[#03cd8c]" : "text-[#f77f00]"}`} />
                      Location verification
                    </div>
                    <div className="text-sm text-slate-600">{locationVerified ? "Primary venue location has been verified." : "Venue verification is still pending."}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Institution-first onboarding</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Verification, taxonomy, staff, locations</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Current focus</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{activeStepLabel}</h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Provider onboarding establishes the institution identity, compliance posture, staff governance, denomination mapping, physical presence, and premium deployment options before public operations begin.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Landmark className="h-4 w-4" /> Legal profile ready
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Users className="h-4 w-4" /> Staff role mapping
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Network className="h-4 w-4" /> Future multi-campus support
                        </span>
                      </div>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Onboarding completion</div>
                      <div className="mb-3 text-4xl font-semibold text-white">72%</div>
                      <div className="h-2 rounded-full bg-white/20">
                        <div className="h-2 rounded-full bg-white" style={{ width: "72%" }} />
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Save draft</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineDraft((prev) => !prev)}
                        >
                          {offlineDraft ? "Draft offline" : "Sync live"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.54fr_0.46fr]">
              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Institution profile and verification</div>
                    <div className="text-sm text-slate-500">Create the institution record, legal identity, and validation stack.</div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Institution name</span>
                        <input className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="St. Marys Cathedral" />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Legal name</span>
                        <input className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="St. Marys Cathedral Ministries Ltd." />
                      </label>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Faith family</span>
                        <select className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          <option>Christianity</option>
                          <option>Islam</option>
                          <option>Judaism</option>
                          <option>Other</option>
                        </select>
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Denomination / tradition</span>
                        <select className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]">
                          <option>Catholic</option>
                          <option>Anglican</option>
                          <option>Pentecostal</option>
                          <option>Interfaith</option>
                        </select>
                      </label>
                    </div>
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Upload className="h-4 w-4 text-[#03cd8c]" /> Upload verification documents
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">Institution registration certificate</div>
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">Authorized admin identity documents</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Locations and staff</div>
                    <div className="text-sm text-slate-500">Map campuses, assign administrators, and invite operational teams.</div>
                  </div>
                  <div className="space-y-4">
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 text-sm font-semibold text-slate-900">Locations</div>
                      <div className="space-y-3">
                        {campuses.map((campus) => (
                          <div key={campus.name} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                            <div className="text-sm font-semibold text-slate-900">{campus.name}</div>
                            <div className="text-sm text-slate-500">{campus.address}</div>
                            <div className="mt-1 text-xs text-slate-600">{campus.status}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-900">Staff and roles</div>
                        <Button variant="outline" className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                          <UserPlus className="mr-2 h-4 w-4 text-[#03cd8c]" /> Invite staff
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {staffMembers.map((member) => (
                          <div key={member.name} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{member.name}</div>
                              <div className="text-xs text-slate-500">{member.role}</div>
                            </div>
                            <span className="rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-semibold text-[#03cd8c]">{member.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Premium rollout options</div>
                    <div className="text-sm text-slate-500">Enterprise-grade setup for complex institutions.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Premium</Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <button
                    onClick={() => setMultiCampus((prev) => !prev)}
                    className={`rounded-[24px] border p-4 text-left transition ${multiCampus ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Network className="h-4 w-4 text-[#03cd8c]" /> Multi-campus
                    </div>
                    <div className="text-sm text-slate-600">{multiCampus ? "Enabled for campus-based institution structure." : "Single campus mode."}</div>
                  </button>
                  <button
                    onClick={() => setMultiBrand((prev) => !prev)}
                    className={`rounded-[24px] border p-4 text-left transition ${multiBrand ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Globe2 className="h-4 w-4 text-[#03cd8c]" /> Multi-brand
                    </div>
                    <div className="text-sm text-slate-600">{multiBrand ? "Sub-brands or ministry identities are enabled." : "Single brand identity active."}</div>
                  </button>
                  <button
                    onClick={() => setCustomDomain((prev) => !prev)}
                    className={`rounded-[24px] border p-4 text-left transition ${customDomain ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <FileCheck2 className="h-4 w-4 text-[#03cd8c]" /> Custom domain
                    </div>
                    <div className="text-sm text-slate-600">{customDomain ? "Branded domain mapping is enabled for this institution." : "Default FaithHub routing in use."}</div>
                  </button>
                </div>
                <div className="mt-4 fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                  Enabling premium onboarding options prepares the institution for broader enterprise deployments, branded rollouts, advanced governance, and payout-ready operations.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



