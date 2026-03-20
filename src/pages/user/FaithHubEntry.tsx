// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Globe2,
  HeartHandshake,
  Languages,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  User,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const languages = [
  { code: "en-UG", label: "English" },
  { code: "sw-UG", label: "Kiswahili" },
  { code: "fr-FR", label: "Franais" },
  { code: "ar", label: "" },
  { code: "hi", label: "" },
  { code: "pt", label: "Portugus" },
];

const destinations = [
  {
    title: "Community",
    subtitle: "Prayer circles, inspirations, ministries, and safe engagement.",
    icon: HeartHandshake,
  },
  {
    title: "Live Sessionz",
    subtitle: "Join live teachings, replays, waiting rooms, and real-time giving.",
    icon: PlayCircle,
  },
  {
    title: "Faith Library",
    subtitle: "Books, devotionals, study notes, transcripts, and saved content.",
    icon: BookOpen,
  },
  {
    title: "Profile & Preferences",
    subtitle: "Set language, interests, privacy, and audience group preferences.",
    icon: User,
  },
];

function LanguageChip({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/25"
          : "border-white/30 bg-white/70 text-slate-700 hover:border-[#03cd8c]/40 hover:bg-white"
      }`}
    >
      {label}
    </button>
  );
}

function StatPill({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/70">
      <Icon className="h-4 w-4 text-[#03cd8c]" />
      <span>{label}</span>
    </div>
  );
}

export default function FaithHubEntry() {
  const [selectedLanguage, setSelectedLanguage] = useState("en-UG");
  const [slowNetwork, setSlowNetwork] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(true);
  const [resumeLastSession, setResumeLastSession] = useState(true);
  const [guestAllowed] = useState(true);

  const currentLanguage = useMemo(
    () => languages.find((item) => item.code === selectedLanguage),
    [selectedLanguage]
  );

  return (
    <div className="fh-page-canvas min-h-screen text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex items-center justify-between rounded-[28px] border border-white/70 bg-white/85 px-4 py-3 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">
                EVzone Super App
              </div>
              <div className="text-lg font-semibold">FaithHub Entry</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:flex">
              <Globe2 className="h-4 w-4 text-[#03cd8c]" />
              {currentLanguage?.label}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid flex-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#24d5a1] to-[#f2f2f2] p-5 shadow-[0_24px_80px_-24px_rgba(3,205,140,0.45)] sm:p-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.14),transparent_22%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full bg-white/90 px-3 py-1 text-[#03cd8c] hover:bg-white">
                    First-run entry experience
                  </Badge>
                  <Badge className="rounded-full bg-slate-900/85 px-3 py-1 text-white hover:bg-slate-900">
                    No paywall at entry
                  </Badge>
                </div>

                <div className="max-w-2xl space-y-4">
                  <div className="fh-kicker-wide text-white/90">
                    Welcome into FaithHub
                  </div>
                  <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                    A gentle, low-friction entry into a world-class digital faith experience.
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-white/90 sm:text-lg">
                    Start with the right language, continue with your EVzone account, or enter as a guest
                    where allowed. FaithHub adapts to the user, resumes where they left off, and respects
                    slow networks without placing a barrier before discovery.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatPill icon={ShieldCheck} label="Safe, inclusive and privacy-aware" />
                  <StatPill icon={Languages} label="Multi-faith and multilingual" />
                  <StatPill icon={slowNetwork ? WifiOff : Wifi} label={slowNetwork ? "Slow network detected" : "Stable network detected"} />
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
                <Card className="fh-interactive-card rounded-[28px] border-white/65 bg-white/88 shadow-xl shadow-black/5 backdrop-blur">
                  <CardContent className="fh-pad-panel">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <div className="hidden text-[#03cd8c]">
                          Entry actions
                        </div>
                        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Choose how you want to enter</h2>
                      </div>
                      <div className="hidden rounded-2xl bg-[#f2f2f2] px-3 py-2 text-xs font-medium text-slate-600 sm:block">
                        Adaptive onboarding ready
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button className="h-14 w-full justify-between rounded-2xl bg-[#03cd8c] px-5 text-base shadow-lg shadow-[#03cd8c]/25 hover:bg-[#02b67c]">
                        Continue with EVzone account
                        <ArrowRight className="h-5 w-5" />
                      </Button>

                      {guestAllowed && (
                        <Button
                          variant="outline"
                          className="h-14 w-full justify-between rounded-2xl border-slate-200 bg-white px-5 text-base text-slate-800 hover:border-[#03cd8c]/40 hover:bg-[#ecfff8]"
                        >
                          Continue as guest
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      )}

                      <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Pick your language</div>
                            <div className="text-xs text-slate-500">This can be changed later in Settings.</div>
                          </div>
                          <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                            {currentLanguage?.code}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {languages.map((item) => (
                            <LanguageChip
                              key={item.code}
                              label={item.label}
                              active={item.code === selectedLanguage}
                              onClick={() => setSelectedLanguage(item.code)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          onClick={() => setSlowNetwork((prev) => !prev)}
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-[#03cd8c]/40 hover:bg-[#f7fffb]"
                        >
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                            {slowNetwork ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
                            Network hint
                          </div>
                          <div className="text-sm text-slate-600">
                            {slowNetwork ? "Slow or unstable connection" : "Stable connection available"}
                          </div>
                        </button>

                        <button
                          onClick={() => setResumeLastSession((prev) => !prev)}
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-[#03cd8c]/40 hover:bg-[#f7fffb]"
                        >
                          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                            <PlayCircle className="h-4 w-4 text-[#03cd8c]" />
                            Last session
                          </div>
                          <div className="text-sm text-slate-600">
                            {resumeLastSession ? "Resume previous live replay and notes" : "Start fresh without resume"}
                          </div>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                  <Card className="fh-interactive-card rounded-[28px] border-white/70 bg-slate-950/90 text-white shadow-xl shadow-black/15">
                    <CardContent className="fh-pad-panel">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <div className="hidden text-[#03cd8c]">
                            Smart entry state
                          </div>
                          <h3 className="mt-2 text-xl font-semibold">Adaptive onboarding</h3>
                        </div>
                        <Badge className="rounded-full bg-[#03cd8c]/15 text-[#8ef0ca] hover:bg-[#03cd8c]/15">
                          Skip if already engaged
                        </Badge>
                      </div>

                      <div className="space-y-3 text-sm text-white/80">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="mb-1 fh-kicker-muted text-white/50">Followed institutions</div>
                          <div className="text-lg font-semibold text-white">3 already followed</div>
                          <div className="mt-2 text-white/70">
                            Saint Marys Cathedral, Al Massira Community, FaithHub Youth Network.
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="mb-1 fh-kicker-muted text-white/50">Resume suggestion</div>
                          <div className="text-lg font-semibold text-white">Wednesday Prayer Replay</div>
                          <div className="mt-2 text-white/70">Continue from 18:42 with transcript and giving note restored.</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="fh-interactive-card rounded-[28px] border border-white/70 bg-white/90 shadow-xl shadow-black/5">
                    <CardContent className="fh-pad-panel">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="hidden text-[#03cd8c]">
                            Data aware experience
                          </div>
                          <div className="mt-2 text-xl font-semibold text-slate-900">Low-data mode prompt</div>
                        </div>
                        <button
                          onClick={() => setLowDataMode((prev) => !prev)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            lowDataMode ? "bg-[#03cd8c] text-white" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {lowDataMode ? "Enabled" : "Disabled"}
                        </button>
                      </div>

                      <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">
                        {lowDataMode ? (
                          <>
                            <div className="font-semibold text-slate-900">Audio-first entry enabled</div>
                            <div className="mt-2">
                              Smaller thumbnails, compressed artwork, replay resume, and offline welcome cache are prioritized.
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-slate-900">Full visual entry enabled</div>
                            <div className="mt-2">
                              Standard imagery, preview cards, and richer transitions are available for stronger discovery.
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <Card className="fh-interactive-card overflow-hidden rounded-[32px] border border-white/60 bg-white/90 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)]">
              <CardContent className="p-0">
                <div className="border-b border-slate-100 bg-gradient-to-r from-[#ecfff8] to-white px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="hidden text-[#03cd8c]">
                        Experience preview
                      </div>
                      <div className="mt-1 text-xl font-semibold text-slate-900">What opens next</div>
                    </div>
                    <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">
                      Responsive for phone, tablet, desktop
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {destinations.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + index * 0.06, duration: 0.35 }}
                        className="fh-subcard rounded-[24px] p-4 transition hover:-translate-y-0.5 hover:border-[#03cd8c]/35 hover:shadow-lg hover:shadow-[#03cd8c]/10"
                      >
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c]/10 text-[#03cd8c]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-base font-semibold text-slate-900">{item.title}</div>
                        <div className="mt-2 fh-body-tight text-slate-600">{item.subtitle}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card rounded-[32px] border border-white/60 bg-slate-900 text-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.55)]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="hidden text-[#8ef0ca]">
                      Offline and continuity
                    </div>
                    <div className="mt-2 text-xl font-semibold">FaithHub never starts cold</div>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                    Cached welcome + resume
                  </div>
                </div>

                <div className="space-y-3 text-sm text-white/80">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-sm font-semibold text-white">Offline welcome</div>
                    <div>
                      When connectivity drops, users still see the branded welcome, last-used language, and the last known safe entry path.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-sm font-semibold text-white">Last session resume</div>
                    <div>
                      Resume replay, transcript position, or the last viewed institution profile as soon as the network returns.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 text-sm font-semibold text-white">Gentle upsell later</div>
                    <div>
                      Entry stays clear of payment pressure. Subscription, donation, and premium invitations appear only after trust is earned.
                    </div>
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



