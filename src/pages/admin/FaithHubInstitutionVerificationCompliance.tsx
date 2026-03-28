// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Fingerprint,
  Globe2,
  MapPin,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const providers = [
  {
    name: "St. Marys Cathedral",
    region: "Uganda",
    state: "Pending approval",
    identity: "Verified admin ID",
    location: "Primary campus verified",
    risk: "Low",
  },
  {
    name: "Kingdom Youth Movement",
    region: "Kenya",
    state: "Badge review",
    identity: "Pending step-up check",
    location: "Venue verification in progress",
    risk: "Medium",
  },
  {
    name: "House of Grace",
    region: "Nigeria",
    state: "Approved",
    identity: "Identity complete",
    location: "Verified",
    risk: "Low",
  },
  {
    name: "FaithHub Global Chapel",
    region: "Rwanda",
    state: "Role dispute",
    identity: "Manual review",
    location: "Verified",
    risk: "Elevated",
  },
];

const disputes = [
  {
    title: "Competing super-admin claim",
    detail: "Two staff accounts submitted contradictory ownership claims for institutional control.",
    severity: "High",
  },
  {
    title: "Campus leadership mismatch",
    detail: "Entebbe campus role hierarchy differs between submitted forms and current account mapping.",
    severity: "Medium",
  },
];

const auditPack = [
  "Identity check history and timestamps",
  "Badge assignment and revocation log",
  "Role dispute resolution chain",
  "Location and venue verification evidence trail",
  "Provider compliance review outcomes",
];

export default function FaithHubInstitutionVerificationCompliance() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [complianceAutomation, setComplianceAutomation] = useState(true);
  const [auditPacks, setAuditPacks] = useState(true);
  const [identitySessions, setIdentitySessions] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All providers");

  const visibleProviders = providers.filter((provider) => {
    if (selectedFilter === "All providers") return true;
    if (selectedFilter === "Pending") return provider.state === "Pending approval" || provider.state === "Badge review";
    if (selectedFilter === "Disputes") return provider.state === "Role dispute";
    return provider.state === "Approved";
  });

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 xl:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4 xl:col-span-7 2xl:col-span-8"
          >
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#20cf9c] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Provider approvals and compliance control</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Badges, disputes, identity, automation</Badge>
                  </div>
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Trust starts with provider legitimacy</div>
                      <h1 className="text-[clamp(2.1rem,4.2vw,3.45rem)] font-semibold leading-[1.06]">
                        Approve institutions, validate administrators, resolve role disputes, and issue verified trust signals with rigor.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This page centralizes provider approval, badge management, staff-role disputes, location checks, and identity workflows. Premium tools add compliance automation and exportable audit packs for formal review environments.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Verification posture</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Pending actions</div>
                        <div className="mt-1 text-3xl font-semibold text-white">6</div>
                        <div className="mt-2 text-sm text-white/80">Providers, badges, and disputes currently awaiting review.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open review queue</Button>
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
                  title="Provider approval queue"
                  subtitle="Approve institutions, manage badges, and identify exceptions quickly."
                />
                <div className="mb-4 flex flex-wrap gap-2">
                  {[
                    { key: "All providers", label: "All providers" },
                    { key: "Pending", label: "Pending" },
                    { key: "Disputes", label: "Disputes" },
                    { key: "Approved", label: "Approved" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setSelectedFilter(item.key)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedFilter === item.key ? "border-slate-200 bg-white text-slate-900 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {visibleProviders.map((provider) => (
                    <div key={provider.name} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-base font-semibold text-slate-900">{provider.name}</div>
                          <div className="text-sm text-slate-500">{provider.region}</div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${provider.state === "Approved" ? "bg-[#ecfff8] text-[#03cd8c]" : provider.state === "Role dispute" ? "bg-rose-50 text-rose-600" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                          {provider.state}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{provider.identity}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">{provider.location}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Risk: {provider.risk}</div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineReadOnly}>Approve</Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" disabled={offlineReadOnly}>Manage badge</Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50" disabled={offlineReadOnly}>Escalate</Button>
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
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4 xl:col-span-5 2xl:col-span-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Identity verification workflow"
                  subtitle="Stronger trust checks for admins and sensitive provider actions."
                  action="Identity"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setIdentitySessions((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${identitySessions ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Fingerprint className="h-4 w-4 text-[#8ef0ca]" /> Identity session workflow
                    </div>
                    <div className="text-sm text-white/75">{identitySessions ? "Identity verification sessions are enabled for high-trust provider approval." : "Basic document review only."}</div>
                  </button>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur text-sm text-white/80">
                    Identity workflows can validate administrator identity before approval, badge issuance, payout activation, or sensitive role escalation.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                      <div className="mb-2 font-semibold text-white">Location confidence</div>
                      Venue address, campus mapping, and operational presence can be checked before final provider activation.
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                      <div className="mb-2 font-semibold text-white">Role safety</div>
                      High-privilege account claims can be forced through stronger identity confirmation.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Staff role disputes"
                  subtitle="Resolve conflicts over administrative access and role hierarchy."
                  action="Disputes"
                />
                <div className="space-y-3">
                  {disputes.map((dispute) => (
                    <div key={dispute.title} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{dispute.title}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${dispute.severity === "High" ? "bg-rose-50 text-rose-600" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                          {dispute.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{dispute.detail}</div>
                      <div className="mt-3 flex gap-2">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineReadOnly}>Open case</Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" disabled={offlineReadOnly}>Request evidence</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Compliance automation and audit packs"
                  subtitle="Premium controls for deeper governance and formal review trails."
                  action="Premium"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setComplianceAutomation((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${complianceAutomation ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <ShieldCheck className="h-4 w-4 text-[#03cd8c]" /> Compliance automation
                    </div>
                    <div className="text-sm text-slate-600">{complianceAutomation ? "Risk thresholds, reminders, and exception routing are automated." : "Manual compliance handling only."}</div>
                  </button>
                  <button
                    onClick={() => setAuditPacks((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${auditPacks ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <FileCheck2 className="h-4 w-4 text-[#03cd8c]" /> Audit packs
                    </div>
                    <div className="text-sm text-slate-600">{auditPacks ? "Compliance evidence bundles and review exports are available." : "Basic logs only."}</div>
                  </button>
                  <div className="space-y-2">
                    {auditPack.map((item) => (
                      <div key={item} className="fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                        {item}
                      </div>
                    ))}
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
