// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Blocks,
  FileWarning,
  Flag,
  Globe2,
  Languages,
  MapPinned,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  TestTube2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const taxonomyGroups = [
  {
    group: "Faith Families",
    items: ["Christianity", "Islam", "Judaism", "Buddhism", "Hinduism", "Interfaith"],
  },
  {
    group: "Audience Segments",
    items: ["General Community", "Children", "Youth", "Women Fellowship", "Men Fellowship", "Family Ministry"],
  },
  {
    group: "Content Types",
    items: ["Live Session", "Series", "Episode", "Event", "Prayer Request", "Marketplace Day"],
  },
  {
    group: "Policy Labels",
    items: ["Safe", "Needs Review", "Restricted", "Prohibited", "Sensitive Topic", "Members Only"],
  },
];

const prohibitedNotices = [
  {
    title: "Hate, abuse, and targeted harassment",
    detail: "Content that attacks protected or vulnerable groups, incites hostility, or coordinates abuse is prohibited.",
    severity: "Critical",
  },
  {
    title: "Graphic or exploitative imagery",
    detail: "Unsafe thumbnails, violent imagery, exploitative media, and inappropriate live visuals require removal or hard review.",
    severity: "High",
  },
  {
    title: "Fraudulent fundraising or deceptive claims",
    detail: "False donation campaigns, misleading miracle claims tied to payment, or unauthorized collections trigger enforcement.",
    severity: "High",
  },
  {
    title: "Minor safety violations",
    detail: "Improper exposure of minors, unsafe youth contact patterns, or policy-breaching child content is escalated immediately.",
    severity: "Critical",
  },
];

const localizedPolicies = [
  {
    locale: "English",
    status: "Ready",
    note: "Primary policy language for global admin review.",
  },
  {
    locale: "Arabic",
    status: "Ready",
    note: "Localized notices for Arabic-speaking institutions and users.",
  },
  {
    locale: "French",
    status: "Draft",
    note: "Needs final review for moderation terminology consistency.",
  },
  {
    locale: "Swahili",
    status: "Planned",
    note: "Pending full localized policy string set.",
  },
];

const countryOverrides = [
  {
    country: "Uganda",
    state: "Active",
    note: "Local compliance note enabled for fundraising and youth event guidance.",
  },
  {
    country: "Kenya",
    state: "Draft",
    note: "Localized event and data handling notices prepared for review.",
  },
  {
    country: "Nigeria",
    state: "Active",
    note: "Marketplace and payout language override enabled.",
  },
  {
    country: "Rwanda",
    state: "Planned",
    note: "No active override yet.",
  },
];

const simulations = [
  {
    title: "Live thumbnail test",
    note: "Simulate how a flagged thumbnail would be labeled, queued, and restricted.",
  },
  {
    title: "Localized notice test",
    note: "Preview how a policy notice appears by locale and region before rollout.",
  },
  {
    title: "Taxonomy routing test",
    note: "Check whether series, events, and audience labels route content into the correct discovery lanes.",
  },
];

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

export default function FaithHubContentPolicyTaxonomy() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(false);
  const [simulationMode, setSimulationMode] = useState(true);
  const [selectedLocale, setSelectedLocale] = useState("English");
  const [selectedCountry, setSelectedCountry] = useState("Uganda");
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    return taxonomyGroups.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    }));
  }, [query]);

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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Global policy governance</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Taxonomy, localized strings, country overrides, simulation</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Taxonomy is platform power</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Govern how FaithHub names, routes, restricts, and explains content across faiths, audiences, and regions.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Admins can define core taxonomy structures, prohibited content notices, localized policy strings, and regional override behavior. Premium simulation tools help test policy outcomes before rollout.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Policy status</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Locale</div>
                        <div className="mt-1 text-2xl font-semibold text-white">{selectedLocale}</div>
                        <div className="mt-2 text-sm text-white/80">Override region: {selectedCountry}</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Edit policy</Button>
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
                  title="Taxonomy registry"
                  subtitle="Manage labels, families, segments, and moderation routing tags."
                />
                <div className="mb-4 relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search taxonomy labels"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] pl-11 pr-4 text-sm outline-none focus:border-[#03cd8c]"
                  />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {filteredGroups.map((group) => (
                    <div key={group.group} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 text-sm font-semibold text-slate-900">{group.group}</div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.length > 0 ? group.items.map((item) => (
                          <span key={item} className="rounded-full bg-[#f8fafc] px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                            {item}
                          </span>
                        )) : <span className="text-sm text-slate-500">No matches</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Prohibited content notices"
                  subtitle="Global policy notices for what cannot be uploaded, streamed, or promoted."
                />
                <div className="space-y-3">
                  {prohibitedNotices.map((item) => (
                    <div key={item.title} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.severity === "Critical" ? "bg-rose-50 text-rose-600" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                          {item.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{item.detail}</div>
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
                  title="Localized policy strings"
                  subtitle="Localize how policy is explained without changing the enforcement core."
                  action="Locales"
                />
                <div className="space-y-3">
                  {localizedPolicies.map((item) => (
                    <button
                      key={item.locale}
                      onClick={() => setSelectedLocale(item.locale)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${selectedLocale === item.locale ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"}`}
                    >
                      <div className="mb-1 text-sm font-semibold">{item.locale}</div>
                      <div className="text-xs text-white/55">{item.status}</div>
                      <div className="mt-2 text-sm text-white/75">{item.note}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Per-country overrides"
                  subtitle="Allow regional notice differences where operations require them."
                  action="Overrides"
                />
                <div className="space-y-3">
                  {countryOverrides.map((item) => (
                    <button
                      key={item.country}
                      onClick={() => setSelectedCountry(item.country)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${selectedCountry === item.country ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"}`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">{item.country}</div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.state === "Active" ? "bg-[#ecfff8] text-[#03cd8c]" : item.state === "Draft" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                          {item.state}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">{item.note}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Policy simulation and testing"
                  subtitle="Premium validation before global rollout."
                  action="Simulate"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setSimulationMode((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${simulationMode ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <TestTube2 className="h-4 w-4 text-[#03cd8c]" /> Policy simulation
                    </div>
                    <div className="text-sm text-slate-600">{simulationMode ? "Simulation mode is enabled for policy testing." : "Policy testing is disabled."}</div>
                  </button>
                  <div className="space-y-3">
                    {simulations.map((item) => (
                      <div key={item.title} className="fh-subcard-warm rounded-[24px] p-4 shadow-sm">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                        <div className="text-sm text-slate-600">{item.note}</div>
                      </div>
                    ))}
                  </div>
                  <div className="fh-subcard-accent rounded-[24px] p-4 text-sm text-slate-700">
                    Simulation helps admins preview moderation paths, strings, and taxonomy routing before content policy changes affect live systems.
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
