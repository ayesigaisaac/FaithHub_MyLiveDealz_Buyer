// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  CheckCircle2,
  Globe2,
  Mail,
  MessageCircle,
  Phone,
  RadioTower,
  Search,
  ShieldCheck,
  Signal,
  Sparkles,
  SplitSquareVertical,
  UploadCloud,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const channelTypes = [
  { name: "In-app Push", state: "Allowed", reputation: "Healthy" },
  { name: "Email", state: "Allowed", reputation: "Watch" },
  { name: "WhatsApp", state: "Allowed", reputation: "Healthy" },
  { name: "SMS", state: "Allowed", reputation: "Healthy" },
  { name: "RCS", state: "Pilot", reputation: "N/A" },
];

const templates = [
  {
    name: "Live reminder",
    channel: "WhatsApp",
    locale: "English",
    status: "Approved",
    quality: "High",
  },
  {
    name: "Replay available",
    channel: "WhatsApp",
    locale: "Arabic",
    status: "Approved",
    quality: "High",
  },
  {
    name: "Event RSVP nudge",
    channel: "WhatsApp",
    locale: "French",
    status: "Pending review",
    quality: "Watch",
  },
  {
    name: "Member update",
    channel: "Email",
    locale: "English",
    status: "Active",
    quality: "Healthy",
  },
];

const senderMetrics = [
  { name: "FaithHub Main", sent: "182k", delivery: "96.2%", reputation: "Healthy" },
  { name: "Family Line", sent: "48k", delivery: "94.8%", reputation: "Healthy" },
  { name: "Women Line", sent: "16k", delivery: "88.4%", reputation: "Watch" },
  { name: "Member Line", sent: "12k", delivery: "97.1%", reputation: "Premium" },
];

const templateAlerts = [
  {
    title: "Template quality warning",
    detail: "One French RSVP template is approaching a lower quality band and should be revised before suspension risk increases.",
  },
  {
    title: "Deliverability dip",
    detail: "Email open and delivery rates dipped on one campaign segment after sender-line rotation.",
  },
];

export default function FaithHubChannelsRegistryDeliverability() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [enterpriseDeliverability, setEnterpriseDeliverability] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All templates");
  const [query, setQuery] = useState("");

  const visibleTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesFilter = selectedFilter === "All templates" || template.channel === selectedFilter;
      const matchesQuery =
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.locale.toLowerCase().includes(query.toLowerCase()) ||
        template.channel.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [selectedFilter, query]);

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <RadioTower className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Channels Registry & Deliverability</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "Registry read-only" : "Deliverability controls active"}
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Global channel governance</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Templates, sender reputation, deliverability operations</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Protect reach and trust</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Govern every global messaging channel with sender health, template control, and delivery insight.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This admin workspace controls allowed channel types, global templates, sender-line reputation, and WhatsApp-style template oversight. Premium tooling extends into enterprise deliverability services and stronger sender infrastructure.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Registry posture</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Allowed channels</div>
                        <div className="mt-1 text-3xl font-semibold text-white">{channelTypes.length}</div>
                        <div className="mt-2 text-sm text-white/80">Global template and sender policies under active governance.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open registry</Button>
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
                  title="Allowed channel types"
                  subtitle="Control which communication rails are globally enabled and how they are performing."
                />
                <div className="space-y-3">
                  {channelTypes.map((item) => (
                    <div key={item.name} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-semibold text-slate-900">{item.name}</div>
                        <div className="flex gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.state === "Allowed" ? "bg-[#ecfff8] text-[#03cd8c]" : item.state === "Pilot" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                            {item.state}
                          </span>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.reputation === "Healthy" ? "bg-[#ecfff8] text-[#03cd8c]" : item.reputation === "Watch" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                            {item.reputation}
                          </span>
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
            transition={{ delay: 0.08, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Global templates and status"
                  subtitle="Track approval, quality state, and delivery risk across template-driven channels."
                  action="Templates"
                />
                <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search templates"
                      className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/60 outline-none"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="h-12 rounded-2xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none"
                  >
                    <option className="text-slate-900">All templates</option>
                    <option className="text-slate-900">WhatsApp</option>
                    <option className="text-slate-900">Email</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {visibleTemplates.map((template) => (
                    <div key={`${template.name}-${template.locale}`} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold text-white">{template.name}</div>
                          <div className="text-xs text-white/55">{template.channel}  {template.locale}</div>
                        </div>
                        <div className="flex gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${template.status === "Approved" || template.status === "Active" ? "bg-[#03cd8c]/20 text-[#d9fff0]" : "bg-[#f77f00]/20 text-[#fff1d6]"}`}>
                            {template.status}
                          </span>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${template.quality === "High" || template.quality === "Healthy" ? "bg-[#03cd8c]/20 text-[#d9fff0]" : "bg-[#f77f00]/20 text-[#fff1d6]"}`}>
                            {template.quality}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Sender reputation metrics"
                  subtitle="Measure sender-line health before campaigns degrade."
                  action="Reputation"
                />
                <div className="space-y-3">
                  {senderMetrics.map((item) => (
                    <div key={item.name} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.reputation === "Healthy" ? "bg-[#ecfff8] text-[#03cd8c]" : item.reputation === "Watch" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                          {item.reputation}
                        </span>
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Sent: {item.sent}</div>
                        <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Delivery: {item.delivery}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Enterprise deliverability service"
                  subtitle="Premium sender protection and higher-volume messaging control."
                  action="Premium"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setEnterpriseDeliverability((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${enterpriseDeliverability ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Signal className="h-4 w-4 text-[#03cd8c]" /> Deliverability service
                    </div>
                    <div className="text-sm text-slate-600">{enterpriseDeliverability ? "Premium monitoring and sender-protection tooling is enabled." : "Standard deliverability only."}</div>
                  </button>
                  <div className="space-y-3">
                    {templateAlerts.map((item) => (
                      <div key={item.title} className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                        <div className="text-sm text-slate-600">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                  <div className="fh-subcard-accent rounded-[24px] p-4 text-sm text-slate-700">
                    Enterprise deliverability extends into sender reputation defense, template monitoring, and campaign-quality protection before failures scale.
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

function SectionHeader({ title, subtitle, action = "Manage" }) {
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





