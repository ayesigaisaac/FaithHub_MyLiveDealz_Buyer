// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CloudOff,
  Globe2,
  HeartHandshake,
  Lock,
  NotebookPen,
  Shield,
  Sparkles,
  UserCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const faithFamilies = [
  "Christianity",
  "Islam",
  "Judaism",
  "Buddhism",
  "Hinduism",
  "Other / Prefer not to say",
];

const denominations = [
  "Catholic",
  "Anglican",
  "Pentecostal",
  "Muslim Community",
  "Interfaith",
  "Undisclosed",
];

const topics = [
  "Prayer",
  "Family",
  "Worship",
  "Giving",
  "Youth Mentorship",
  "Scripture Study",
  "Leadership",
  "Healing",
  "Marriage",
  "Community Care",
];

const groups = [
  { key: "children", label: "Childrens Church", tone: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { key: "youth", label: "Youth Church", tone: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { key: "women", label: "Women Fellowship", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  { key: "men", label: "Men Fellowship", tone: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: "family", label: "Family Ministry", tone: "bg-violet-50 text-violet-700 border-violet-200" },
  { key: "general", label: "General Faith Community", tone: "bg-slate-100 text-slate-700 border-slate-200" },
];

const consentHistory = [
  {
    title: "Privacy preferences saved",
    detail: "Visibility restricted to followers only for faith-specific interests.",
    time: "Today  09:42",
  },
  {
    title: "Audience group consent recorded",
    detail: "Youth Church and Family Ministry enrollment approved.",
    time: "Today  09:39",
  },
  {
    title: "Sensitive field review",
    detail: "Denomination set as optional and hidden from public profile.",
    time: "Today  09:35",
  },
];

function Pill({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-slate-200 bg-white text-slate-900 shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
      }`}
    >
      {label}
    </button>
  );
}

export default function FaithHubProfilePreferences() {
  const [displayName, setDisplayName] = useState("Naomi Campbell");
  const [selectedFaith, setSelectedFaith] = useState("Christianity");
  const [selectedDenomination, setSelectedDenomination] = useState("Catholic");
  const [selectedTopics, setSelectedTopics] = useState(["Prayer", "Family", "Youth Mentorship", "Scripture Study"]);
  const [selectedGroups, setSelectedGroups] = useState(["youth", "family", "general"]);
  const [ageBand, setAgeBand] = useState("18-24");
  const [publicProfile, setPublicProfile] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  const [minorSafeDefaults, setMinorSafeDefaults] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState(true);
  const [parentalMode, setParentalMode] = useState(false);

  const isMinor = useMemo(() => ["Under 13", "13-17"].includes(ageBand), [ageBand]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
  };

  const toggleGroup = (groupKey) => {
    setSelectedGroups((prev) =>
      prev.includes(groupKey) ? prev.filter((item) => item !== groupKey) : [...prev, groupKey]
    );
  };

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="flex min-h-0 w-full max-w-none flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">
                EVzone Super App
              </div>
              <div className="text-lg font-semibold">FaithHub Profile & Faith Preferences</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="hidden rounded-full bg-[#03cd8c]/10 px-3 py-1 text-[#03cd8c] hover:bg-[#03cd8c]/10 sm:flex">
              Progressive disclosure + privacy-first
            </Badge>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/92 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)] xl:col-span-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(3,205,140,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.08),transparent_22%)]" />
            <div className="relative z-10 fh-pad-hero">
              <div className="mb-6 flex flex-col gap-3 rounded-[28px] bg-gradient-to-r from-[#03cd8c] to-[#20cf9c] p-5 text-white shadow-[0_24px_80px_-36px_rgba(3,205,140,0.5)] sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl space-y-3">
                    <div className="hidden text-white/90">FH-U-003</div>
                    <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                      Shape your profile, faith preferences, audience groups, and privacy in one calm place.
                    </h1>
                    <p className="fh-body text-white/85 sm:text-base">
                      Sensitive fields stay optional. Minor-safe defaults, consent journaling, and family account readiness keep the experience inclusive, adaptable, and trustworthy across denominations.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="h-11 rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                      Save changes
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 rounded-2xl border-white/30 bg-transparent text-white hover:bg-white/10"
                      onClick={() => setOfflineQueue((prev) => !prev)}
                    >
                      {offlineQueue ? "Queue offline edits" : "Sync live only"}
                    </Button>
                  </div>
                </div>

                {offlineQueue && (
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
                    Changes will queue safely if the network drops. Age-sensitive updates may still require live verification before publishing.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Card className="fh-interactive-card rounded-[28px] border-slate-200 bg-white shadow-sm">
                  <CardContent className="fh-pad-panel">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="hidden text-[#03cd8c]">
                          Identity basics
                        </div>
                        <div className="mt-2 text-xl font-semibold text-slate-900">Profile presence</div>
                      </div>
                      <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">
                        Public display name only
                      </Badge>
                    </div>

                    <div className="grid gap-5 2xl:grid-cols-[0.36fr_0.64fr]">
                      <div className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5 text-center">
                        <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#03cd8c] to-[#20cf9c] text-white shadow-sm shadow-[#03cd8c]/20">
                          <UserCircle2 className="h-14 w-14" />
                          <button className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#f77f00] text-white shadow-sm shadow-[#f77f00]/25">
                            <Camera className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">Avatar / profile photo</div>
                        <div className="mt-1 text-xs leading-5 text-slate-500">
                          Used for public and community-facing identity where allowed by privacy settings.
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block space-y-2 sm:col-span-2">
                          <span className="text-sm font-medium text-slate-700">Display name</span>
                          <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#03cd8c] focus:bg-white focus:ring-4 focus:ring-[#03cd8c]/10"
                          />
                        </label>

                        <label className="block space-y-2">
                          <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            Faith family
                            <Badge className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-100">Optional</Badge>
                          </span>
                          <select
                            value={selectedFaith}
                            onChange={(e) => setSelectedFaith(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#03cd8c] focus:bg-white focus:ring-4 focus:ring-[#03cd8c]/10"
                          >
                            {faithFamilies.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block space-y-2">
                          <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            Denomination / tradition
                            <Badge className="rounded-full bg-slate-100 text-slate-600 hover:bg-slate-100">Optional</Badge>
                          </span>
                          <select
                            value={selectedDenomination}
                            onChange={(e) => setSelectedDenomination(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#03cd8c] focus:bg-white focus:ring-4 focus:ring-[#03cd8c]/10"
                          >
                            {denominations.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="fh-interactive-card rounded-[28px] border-slate-200 bg-white shadow-sm">
                  <CardContent className="fh-pad-panel">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="hidden text-[#03cd8c]">
                          Topics and discovery
                        </div>
                        <div className="mt-2 text-xl font-semibold text-slate-900">What should FaithHub surface more often?</div>
                      </div>
                      <div className="rounded-full bg-[#ecfff8] px-3 py-1 text-xs font-medium text-[#03cd8c] ring-1 ring-[#03cd8c]/10">
                        Personalization signals
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {topics.map((topic) => (
                        <Pill
                          key={topic}
                          label={topic}
                          active={selectedTopics.includes(topic)}
                          onClick={() => toggleTopic(topic)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="fh-interactive-card rounded-[28px] border-slate-200 bg-white shadow-sm">
                  <CardContent className="fh-pad-panel">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="hidden text-[#03cd8c]">
                          Audience groups
                        </div>
                        <div className="mt-2 text-xl font-semibold text-slate-900">Enrollment preferences and smaller faith communities</div>
                      </div>
                      <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Safe defaults enabled</Badge>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
                      {groups.map((group) => {
                        const selected = selectedGroups.includes(group.key);
                        return (
                          <button
                            key={group.key}
                            onClick={() => toggleGroup(group.key)}
                            className={`rounded-[24px] border p-4 text-left transition ${selected ? group.tone : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"}`}
                          >
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <div className="text-sm font-semibold">{group.label}</div>
                              {selected && <CheckCircle2 className="h-4 w-4" />}
                            </div>
                            <div className="text-xs leading-5 opacity-90">
                              Used for feed tailoring, event invitations, and audience-aware live session recommendations.
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="fh-interactive-card rounded-[28px] border-slate-200 bg-white shadow-sm">
                  <CardContent className="fh-pad-panel">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="hidden text-[#03cd8c]">
                          Privacy, safety and age band
                        </div>
                        <div className="mt-2 text-xl font-semibold text-slate-900">Control who sees what, and how safeguards apply</div>
                      </div>
                      <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">
                        Sensitive fields clearly optional
                      </Badge>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[0.7fr_0.3fr]">
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <button
                            onClick={() => setPublicProfile((prev) => !prev)}
                            className={`rounded-2xl border px-4 py-4 text-left transition ${
                              publicProfile
                                ? "border-[#03cd8c]/20 bg-[#ecfff8]"
                                : "border-slate-200 bg-white hover:border-[#03cd8c]/35"
                            }`}
                          >
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                              <Globe2 className="h-4 w-4 text-[#03cd8c]" />
                              Public profile discoverability
                            </div>
                            <div className="text-sm text-slate-600">
                              {publicProfile ? "Enabled for public search and profile links." : "Limited to followers and approved contexts."}
                            </div>
                          </button>

                          <button
                            onClick={() => setAllowMessages((prev) => !prev)}
                            className={`rounded-2xl border px-4 py-4 text-left transition ${
                              allowMessages
                                ? "border-[#03cd8c]/20 bg-[#ecfff8]"
                                : "border-slate-200 bg-white hover:border-[#03cd8c]/35"
                            }`}
                          >
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                              <HeartHandshake className="h-4 w-4 text-[#03cd8c]" />
                              Messages and prayer requests
                            </div>
                            <div className="text-sm text-slate-600">
                              {allowMessages ? "Accept messages from trusted members and institutions." : "Allow requests only through moderated or leader-approved flows."}
                            </div>
                          </button>
                        </div>

                        <div className="fh-subcard-muted rounded-[24px] p-4">
                          <div className="mb-3 text-sm font-semibold text-slate-900">Age band</div>
                          <div className="flex flex-wrap gap-2">
                            {["Under 13", "13-17", "18-24", "25-34", "35+"] .map((item) => (
                              <Pill
                                key={item}
                                label={item}
                                active={ageBand === item}
                                onClick={() => setAgeBand(item)}
                              />
                            ))}
                          </div>
                        </div>

                        {(isMinor || minorSafeDefaults) && (
                          <div className="rounded-[24px] border border-[#f77f00]/20 bg-[#fff8ef] p-4">
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                              <AlertTriangle className="h-4 w-4 text-[#f77f00]" />
                              Minor-safe defaults
                            </div>
                            <div className="fh-body-tight text-slate-600">
                              Age-sensitive accounts use reduced public discoverability, limited direct messaging, safer live chat defaults, and stricter moderation rules until appropriate verification or guardian approval is complete.
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                        <div className="mb-3 text-sm font-semibold text-slate-900">Guardian and family tools</div>
                        <div className="space-y-3 text-sm text-slate-600">
                          <button
                            onClick={() => setParentalMode((prev) => !prev)}
                            className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                              parentalMode
                                ? "border-[#03cd8c]/20 bg-[#ecfff8]"
                                : "border-slate-200 bg-[#f8fafc] hover:border-[#03cd8c]/35"
                            }`}
                          >
                            <div className="mb-1 flex items-center gap-2 font-semibold text-slate-900">
                              <Users className="h-4 w-4 text-[#03cd8c]" />
                              Family account mode
                            </div>
                            <div>Link parent, guardian, or dependent dashboards when available in EVzone.</div>
                          </button>
                          <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8fafc] px-4 py-3">
                            Guardian approval flows can be required before high-sensitivity visibility changes.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="flex flex-col gap-4 xl:col-span-4"
          >
            <Card className="fh-interactive-card overflow-hidden fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="hidden text-[#8ef0ca]">
                      Live preview
                    </div>
                    <div className="mt-2 text-xl font-semibold">How this profile behaves in FaithHub</div>
                  </div>
                  <Shield className="h-5 w-5 text-[#8ef0ca]" />
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm border border-slate-200">
                      <UserCircle2 className="h-9 w-9" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{displayName}</div>
                      <div className="text-sm text-white/70">{selectedFaith}  {selectedDenomination}</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-white/80">
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/15 p-4">
                      <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8ef0ca]" />
                      <div>
                        <div className="font-semibold text-white">Visibility</div>
                        <div className="mt-1">{publicProfile ? "Public profile enabled with controlled faith metadata." : "Public profile limited. Sensitive faith metadata stays hidden."}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/15 p-4">
                      <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-[#8ef0ca]" />
                      <div>
                        <div className="font-semibold text-white">Audience group alignment</div>
                        <div className="mt-1">{selectedGroups.length} selected groups influence feed cards, event reminders, and live recommendations.</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/15 p-4">
                      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#8ef0ca]" />
                      <div>
                        <div className="font-semibold text-white">Privacy-safe defaults</div>
                        <div className="mt-1">Sensitive fields remain optional, and policy-aware safeguards can intensify automatically for minors.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <div className="hidden text-[#03cd8c]">
                      Consent journaling
                    </div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Recent privacy and preference history</div>
                  </div>
                  <NotebookPen className="h-5 w-5 text-[#03cd8c]" />
                </div>

                <div className="space-y-3">
                  {consentHistory.map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-[24px] border border-slate-100 bg-[#f8fafc] p-4">
                      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                        <div className="mt-1 fh-body-tight text-slate-600">{item.detail}</div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Clock3 className="h-3.5 w-3.5" />
                          {item.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card rounded-[32px] border border-[#f77f00]/15 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="hidden text-[#f77f00]">
                      Offline and verification states
                    </div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">Queued edits and extra checks</div>
                  </div>
                  <CloudOff className="h-5 w-5 text-[#f77f00]" />
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-[#f77f00]/15 bg-white p-4">
                    Profile and topic updates can queue safely while offline, then sync when connectivity returns.
                  </div>
                  <div className="rounded-2xl border border-[#f77f00]/15 bg-white p-4">
                    Age-band shifts, guardian linking, and some public visibility changes can require live verification before publication.
                  </div>
                  <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left font-semibold text-slate-900 transition hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                    Open verification details
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



