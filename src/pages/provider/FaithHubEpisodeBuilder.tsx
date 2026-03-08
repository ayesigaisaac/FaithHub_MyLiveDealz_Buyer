// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  Globe2,
  Lightbulb,
  Link2,
  Lock,
  Mic2,
  PlayCircle,
  Save,
  ShieldCheck,
  Sparkles,
  Upload,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const builderSteps = [
  { key: "basics", label: "Basics" },
  { key: "resources", label: "Resources" },
  { key: "live", label: "Live Links" },
  { key: "checklist", label: "Checklist" },
  { key: "gating", label: "Gating" },
];

const resources = [
  { title: "Episode notes PDF", type: "Document", gated: false },
  { title: "Study guide workbook", type: "Guide", gated: true },
  { title: "Audio replay", type: "Audio", gated: false },
  { title: "Leader facilitation pack", type: "Attachment", gated: true },
];

const liveLinks = [
  { title: "Guarding the Heart Live Session", state: "Scheduled", time: "Tonight Â· 7:30 PM" },
  { title: "Q&A Catch-up Session", state: "Planned", time: "Tomorrow Â· 6:00 PM" },
];

const aiOutline = [
  "Opening reflection on the episode theme",
  "Core scripture and teaching movement",
  "Practical application segment",
  "Prayer close and next-step invitation",
];

export default function FaithHubEpisodeBuilder() {
  const [activeStep, setActiveStep] = useState("basics");
  const [offlineDraft, setOfflineDraft] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [premiumGating, setPremiumGating] = useState(true);
  const [checkItems, setCheckItems] = useState({
    title: true,
    summary: true,
    scripture: false,
    resourceReview: true,
    moderationReview: false,
  });

  const completion = useMemo(() => {
    const done = Object.values(checkItems).filter(Boolean).length;
    return Math.round((done / Object.keys(checkItems).length) * 100);
  }, [checkItems]);

  const toggleCheck = (key) => {
    setCheckItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Episode Builder</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineDraft ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineDraft ? "Drafts saved locally" : "Builder synced live"}
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
            <Card className="fh-card rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ef0ca]">Builder flow</div>
                  <div className="mt-2 text-xl font-semibold">Episode construction with resource and live linking</div>
                </div>
                <div className="space-y-3">
                  {builderSteps.map((step, index) => {
                    const active = step.key === activeStep;
                    return (
                      <button
                        key={step.key}
                        onClick={() => setActiveStep(step.key)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${
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
                          <div className="text-xs text-white/60">Episode setup stage</div>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <div className="mb-4">
                  <div className="text-lg font-semibold text-slate-900">Episode checklist</div>
                  <div className="text-sm text-slate-500">World-class completeness before publication.</div>
                </div>
                <div className="mb-4 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                  <div className="mb-2 text-sm font-semibold text-slate-900">Completion</div>
                  <div className="text-3xl font-semibold text-slate-900">{completion}%</div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-[#03cd8c]" style={{ width: `${completion}%` }} />
                  </div>
                </div>
                <div className="space-y-3">
                  {Object.entries(checkItems).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key as any)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${
                        value ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"
                      }`}
                    >
                      <CheckCircle2 className={`h-4 w-4 ${value ? "text-[#03cd8c]" : "text-slate-400"}`} />
                      <div className="text-sm font-medium capitalize text-slate-900">{key.replace(/([A-Z])/g, " $1")}</div>
                    </button>
                  ))}
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
            <Card className="fh-card relative overflow-visible rounded-xl border border-slate-200 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white text-[#03cd8c] hover:bg-white">Episode setup and publishing</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">AI suggestions, resources, gating, live links</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">Current stage</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Episode Builder</h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        Build a polished episode with core content, resource attachments, linked live sessions, checklist validation, optional AI structuring, and premium attachment gating.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Draft state</div>
                      <div className="mb-3 text-4xl font-semibold text-white">Draft</div>
                      <div className="h-2 rounded-full bg-white/20">
                        <div className="h-2 rounded-full bg-white" style={{ width: "68%" }} />
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white">
                          <Save className="mr-2 h-4 w-4" /> Save
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineDraft((prev) => !prev)}
                        >
                          {offlineDraft ? "Offline draft" : "Online mode"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
              <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
                <CardContent className="fh-card-content p-5 sm:p-6">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Episode content</div>
                    <div className="text-sm text-slate-500">Create the teaching unit and attach support materials.</div>
                  </div>
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Episode title</span>
                      <input className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="Guarding the Heart" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Summary</span>
                      <textarea className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#03cd8c]" rows={5} defaultValue="An episode focused on wisdom, discernment, and protecting inner life through practical spiritual habits." />
                    </label>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Upload className="h-4 w-4 text-[#03cd8c]" /> Resources and attachments
                      </div>
                      <div className="space-y-3">
                        {resources.map((item) => (
                          <div key={item.title} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                              <div className="text-xs text-slate-500">{item.type}</div>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.gated ? "bg-slate-900 text-white" : "bg-[#ecfff8] text-[#03cd8c]"}`}>
                              {item.gated ? "Premium" : "Open"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
                  <CardContent className="fh-card-content p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-slate-900">Planned Live Sessionz</div>
                        <div className="text-sm text-slate-500">Connect the episode to future or past live moments.</div>
                      </div>
                      <Link2 className="h-5 w-5 text-[#03cd8c]" />
                    </div>
                    <div className="space-y-3">
                      {liveLinks.map((item) => (
                        <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="mb-1 text-sm font-semibold text-slate-900">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.state}</div>
                          <div className="mt-1 text-sm text-slate-600">{item.time}</div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <PlayCircle className="mr-2 h-4 w-4 text-[#03cd8c]" /> Link live session
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
                  <CardContent className="fh-card-content p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-slate-900">AI outline suggestions</div>
                        <div className="text-sm text-slate-500">Optional world-class scaffolding.</div>
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => setAiSuggestions((prev) => !prev)}
                      >
                        {aiSuggestions ? "AI on" : "Enable AI"}
                      </Button>
                    </div>
                    {aiSuggestions ? (
                      <div className="space-y-3">
                        {aiOutline.map((item) => (
                          <div key={item} className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                            <div className="flex items-start gap-3">
                              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#03cd8c]" />
                              <div className="text-sm text-slate-700">{item}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-[#f8fafc] p-6 text-center text-sm text-slate-600">
                        AI outline suggestions are hidden in this state.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="fh-card rounded-xl border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Premium attachments gating</div>
                    <div className="text-sm text-slate-500">Monetize deeper episode resources without blocking the core teaching.</div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setPremiumGating((prev) => !prev)}
                  >
                    {premiumGating ? "Premium gating on" : "Enable gating"}
                  </Button>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-xl border border-[#f77f00]/15 bg-white p-4">
                    Premium resources can include study guides, leader packs, advanced notes, or classroom-style follow-up material.
                  </div>
                  <div className="rounded-xl border border-[#03cd8c]/15 bg-[#ecfff8] p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <Lock className="h-4 w-4 text-[#03cd8c]" /> Gating mode
                    </div>
                    <div>{premiumGating ? "Selected attachments will be visible only to eligible supporters or subscribed members." : "All attachments are currently open access."}</div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                      <ShieldCheck className="mr-2 h-4 w-4" /> Save gating rules
                    </Button>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <Mic2 className="mr-2 h-4 w-4 text-[#03cd8c]" /> Review moderation status
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


