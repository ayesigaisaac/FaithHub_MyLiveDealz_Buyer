// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Blocks,
  BookTemplate,
  Brush,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  Languages,
  LayoutTemplate,
  MonitorSmartphone,
  PenSquare,
  Save,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const builderSteps = [
  { key: "basics", label: "Basics" },
  { key: "artwork", label: "Artwork" },
  { key: "audience", label: "Audience" },
  { key: "episodes", label: "Episodes" },
  { key: "publishing", label: "Publishing" },
];

const localeVariants = [
  { locale: "English", state: "Primary", landing: "Ready" },
  { locale: "Arabic", state: "Draft", landing: "Pending localization" },
  { locale: "French", state: "Planned", landing: "Not started" },
];

const episodeTemplates = [
  { name: "Standard sermon episode", note: "Title, summary, scripture, replay, notes" },
  { name: "Live-first episode", note: "Countdown, waiting room, replay, prayer CTA" },
  { name: "Study guide episode", note: "Reading path, notes, attachments, resources" },
];

const collaborators = [
  { name: "Naomi Kato", role: "Series Owner", state: "Editing" },
  { name: "Daniel Ssentamu", role: "Artwork Reviewer", state: "Reviewing A/B cover" },
  { name: "Aisha Nabirye", role: "Localization Lead", state: "Updating Arabic draft" },
];

export default function FaithHubSeriesBuilder() {
  const [activeStep, setActiveStep] = useState("basics");
  const [offlineEdits, setOfflineEdits] = useState(true);
  const [abArtwork, setAbArtwork] = useState(true);
  const [collabMode, setCollabMode] = useState(true);
  const [paidSeries, setPaidSeries] = useState(true);
  const [multilingual, setMultilingual] = useState(true);
  const [localizedLandingPages, setLocalizedLandingPages] = useState(true);
  const [selectedAudience, setSelectedAudience] = useState(["General Community", "Youth Church"]);

  const activeStepLabel = useMemo(
    () => builderSteps.find((step) => step.key === activeStep)?.label,
    [activeStep]
  );

  const toggleAudience = (name) => {
    setSelectedAudience((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="w-full max-w-none px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <BookTemplate className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Series Builder</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineEdits ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineEdits ? "Edits queued locally" : "Builder fully online"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[0.34fr_0.66fr]">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <div className="mb-4">
                  <div className="hidden text-[#8ef0ca]">Builder flow</div>
                  <div className="mt-2 text-xl font-semibold">Create a series like a premium content product</div>
                </div>
                <div className="space-y-3">
                  {builderSteps.map((step, index) => {
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
                          <div className="text-xs text-white/60">Series construction</div>
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
                  <div className="text-lg font-semibold text-slate-900">Live collaboration</div>
                  <div className="text-sm text-slate-500">Observed Creator-style collaborative editing adapted for faith series workflows.</div>
                </div>
                <div className="space-y-3">
                  {collaborators.map((person) => (
                    <div key={person.name} className="fh-subcard rounded-[24px] p-4">
                      <div className="text-sm font-semibold text-slate-900">{person.name}</div>
                      <div className="text-xs text-slate-500">{person.role}</div>
                      <div className="mt-1 text-sm text-slate-600">{person.state}</div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setCollabMode((prev) => !prev)}
                  >
                    {collabMode ? "Collaborative editing on" : "Enable collaboration preview"}
                  </Button>
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Builder and publishing flow</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Templates, artwork, localization, premium options</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Current builder stage</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{activeStepLabel}</h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        The Series Builder mirrors strong Creator-style builder flows while adapting them for sermons, teaching arcs, audience segmentation, multilingual deployment, artwork testing, and paid series packaging.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Builder state</div>
                      <div className="mb-3 text-4xl font-semibold text-white">Draft</div>
                      <div className="h-2 rounded-full bg-white/20">
                        <div className="h-2 rounded-full bg-white" style={{ width: "66%" }} />
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Save draft</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineEdits((prev) => !prev)}
                        >
                          {offlineEdits ? "Queued edits" : "Online edits"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Series basics and audience targets</div>
                    <div className="text-sm text-slate-500">Set the core identity and who the series is meant for.</div>
                  </div>
                  <div className="space-y-4">
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Series title</span>
                      <input className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 text-sm outline-none focus:border-[#03cd8c]" defaultValue="Walking in Wisdom" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-700">Summary</span>
                      <textarea className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#03cd8c]" rows={5} defaultValue="A structured teaching journey on wisdom, discernment, and daily spiritual practice across multiple sessions." />
                    </label>
                    <div>
                      <div className="mb-2 text-sm font-medium text-slate-700">Audience targets</div>
                      <div className="flex flex-wrap gap-2">
                        {["General Community", "Youth Church", "Women Fellowship", "Family Ministry"].map((audience) => (
                          <button
                            key={audience}
                            onClick={() => toggleAudience(audience)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                              selectedAudience.includes(audience)
                                ? "border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20"
                                : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                            }`}
                          >
                            {audience}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <FileText className="h-4 w-4 text-[#03cd8c]" /> Publishing model
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setPaidSeries((prev) => !prev)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${paidSeries ? "border-[#03cd8c] bg-[#03cd8c] text-white" : "border-slate-200 bg-white text-slate-700"}`}
                        >
                          {paidSeries ? "Paid / premium series" : "Free series"}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Artwork and episode scaffolding</div>
                    <div className="text-sm text-slate-500">Premium content packaging with creator-style flexibility.</div>
                  </div>
                  <div className="space-y-4">
                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Upload className="h-4 w-4 text-[#03cd8c]" /> Series artwork
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">Primary artwork</div>
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">Cover backup / alternate</div>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => setAbArtwork((prev) => !prev)}
                      >
                        <Brush className="mr-2 h-4 w-4 text-[#03cd8c]" />
                        {abArtwork ? "A/B artwork test on" : "Enable A/B artwork test"}
                      </Button>
                    </div>

                    <div className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <LayoutTemplate className="h-4 w-4 text-[#03cd8c]" /> Episode templates
                      </div>
                      <div className="space-y-3">
                        {episodeTemplates.map((template) => (
                          <div key={template.name} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                            <div className="text-sm font-semibold text-slate-900">{template.name}</div>
                            <div className="mt-1 text-sm text-slate-600">{template.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr]">
              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Locales and landing pages</div>
                    <div className="text-sm text-slate-500">Premium localization for multi-faith, multi-language delivery.</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setMultilingual((prev) => !prev)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${multilingual ? "border-[#03cd8c] bg-[#03cd8c] text-white" : "border-slate-200 bg-white text-slate-700"}`}
                      >
                        <Languages className="mr-2 inline h-4 w-4" /> {multilingual ? "Multi-language enabled" : "Enable multi-language"}
                      </button>
                      <button
                        onClick={() => setLocalizedLandingPages((prev) => !prev)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${localizedLandingPages ? "border-[#03cd8c] bg-[#03cd8c] text-white" : "border-slate-200 bg-white text-slate-700"}`}
                      >
                        <MonitorSmartphone className="mr-2 inline h-4 w-4" /> {localizedLandingPages ? "Localized landing pages on" : "Enable localized pages"}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {localeVariants.map((variant) => (
                        <div key={variant.locale} className="fh-subcard rounded-[24px] p-4">
                          <div className="mb-1 text-sm font-semibold text-slate-900">{variant.locale}</div>
                          <div className="text-xs text-slate-500">{variant.state}</div>
                          <div className="mt-1 text-sm text-slate-600">Landing page: {variant.landing}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4">
                    <div className="text-lg font-semibold text-slate-900">Publication and premium controls</div>
                    <div className="text-sm text-slate-500">Queue edits locally, but require live network to publish.</div>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="fh-subcard-warm rounded-[24px] p-4">
                      Collaborative edits and artwork changes can queue while offline, then merge when the connection is restored.
                    </div>
                    <div className="fh-subcard-warm rounded-[24px] p-4">
                      Publish and localization deployment require live validation, moderation checks, and current entitlement confirmation.
                    </div>
                    <div className="fh-subcard-accent rounded-[24px] p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-[#03cd8c]" /> Paid series path
                      </div>
                      <div>Series can be packaged as premium offerings with gated episodes, study attachments, or enhanced landing experiences.</div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                        <Save className="mr-2 h-4 w-4" /> Save builder draft
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        <PenSquare className="mr-2 h-4 w-4 text-[#03cd8c]" /> Publish series
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



