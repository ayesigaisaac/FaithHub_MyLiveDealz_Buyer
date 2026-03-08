// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Blocks,
  ChevronRight,
  Download,
  EyeOff,
  Globe2,
  Lock,
  MoonStar,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserMinus,
  Users,
  Volume2,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const blockedUsers = [
  { name: "Unknown Guest 24", reason: "Muted after repeated spam" },
  { name: "FaithChatter88", reason: "Blocked manually by user" },
  { name: "PromoLink Account", reason: "Reported and blocked" },
];

const languages = ["English", "Arabic", "French", "Swahili"];
const downloadModes = ["Wi-Fi only", "Wi-Fi + mobile", "Manual only"];

function ToggleCard({ active, title, description, onClick, icon: Icon, tone = "default" }) {
  const activeClasses =
    tone === "warning"
      ? "border-[#f77f00]/20 bg-[#fff8ef]"
      : "border-[#03cd8c]/20 bg-[#ecfff8]";

  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition ${
        active ? activeClasses : "border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
      }`}
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Icon className={`h-4 w-4 ${tone === "warning" ? "text-[#f77f00]" : "text-[#03cd8c]"}`} />
        {title}
      </div>
      <div className="text-sm leading-6 text-slate-600">{description}</div>
    </button>
  );
}

function SectionHeader({ title, subtitle, action = "Manage" }) {
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

export default function FaithHubSettings() {
  const [language, setLanguage] = useState("English");
  const [notificationsAll, setNotificationsAll] = useState(true);
  const [downloadMode, setDownloadMode] = useState("Wi-Fi only");
  const [privateProfile, setPrivateProfile] = useState(true);
  const [blockedOnlyMessages, setBlockedOnlyMessages] = useState(true);
  const [segmentYouth, setSegmentYouth] = useState(true);
  const [segmentWomen, setSegmentWomen] = useState(true);
  const [segmentFamily, setSegmentFamily] = useState(false);
  const [childMode, setChildMode] = useState(false);
  const [advancedParentalControls, setAdvancedParentalControls] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);

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
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Settings</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Settings queued for sync
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
            <Card className="fh-card relative overflow-visible rounded-xl border border-slate-200 bg-gradient-to-br from-[#03cd8c] via-[#20cf9c] to-[#eafcf6] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white text-[#03cd8c] hover:bg-white">Language, privacy, notifications, downloads</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Per-segment controls + parental tools</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.66fr_0.34fr]">
                    <div className="space-y-4">
                      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">A settings experience that respects faith context</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Control language, privacy, notifications, downloads, blocking, and family-safe behavior from one premium settings home.
                      </h1>
                      <p className="max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                        Settings in FaithHub go beyond generic toggles. They include per-segment notification behavior, guarded child-mode, blocked users, offline syncing, and advanced parental controls for supported family setups.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Globe2 className="h-4 w-4" />
                          I18N-ready preferences
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <ShieldCheck className="h-4 w-4" />
                          Privacy and safety controls
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <Users className="h-4 w-4" />
                          Family-aware management
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Sync state</div>
                      <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                        <div className="mb-1 text-xs uppercase tracking-[0.18em] text-white/70">Status</div>
                        <div className="text-2xl font-semibold text-white">{offlineMode ? "Queued locally" : "Synced"}</div>
                        <div className="mt-2 text-sm text-white/80">
                          {offlineMode ? "Changes will sync when connection returns." : "All settings are current across devices."}
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white">Save now</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineMode((prev) => !prev)}
                        >
                          {offlineMode ? "Go online" : "Work offline"}
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
                  title="Core preferences"
                  subtitle="Language, notification posture, and download behavior."
                />
                <div className="grid gap-4 lg:grid-cols-[0.46fr_0.54fr]">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Language</div>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((item) => (
                        <button
                          key={item}
                          onClick={() => setLanguage(item)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            language === item
                              ? 'border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-sm/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 text-sm font-semibold text-slate-900">Downloads</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {downloadModes.map((item) => (
                        <button
                          key={item}
                          onClick={() => setDownloadMode(item)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            downloadMode === item
                              ? 'border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-sm/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <ToggleCard
                      active={notificationsAll}
                      title="Notifications"
                      description={notificationsAll ? "General notifications are enabled across sessions, series, and events." : "General notifications are limited or muted."}
                      onClick={() => setNotificationsAll((prev) => !prev)}
                      icon={Bell}
                    />
                    <ToggleCard
                      active={privateProfile}
                      title="Private profile"
                      description={privateProfile ? "Profile visibility is restricted to safer defaults." : "Profile is more broadly discoverable."}
                      onClick={() => setPrivateProfile((prev) => !prev)}
                      icon={EyeOff}
                    />
                    <ToggleCard
                      active={blockedOnlyMessages}
                      title="Blocked-user protection"
                      description={blockedOnlyMessages ? "Blocked users cannot message or interact with this account." : "Message filters are relaxed."}
                      onClick={() => setBlockedOnlyMessages((prev) => !prev)}
                      icon={Lock}
                    />
                    <ToggleCard
                      active={offlineMode}
                      title="Offline settings editing"
                      description={offlineMode ? "Changes can be edited now and synced later." : "Changes sync instantly while online."}
                      onClick={() => setOfflineMode((prev) => !prev)}
                      icon={Download}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Per-segment notification controls"
                  subtitle="Tune notifications for specific ministries, groups, and community lanes."
                />
                <div className="grid gap-3 md:grid-cols-3">
                  <ToggleCard
                    active={segmentYouth}
                    title="Youth Church"
                    description={segmentYouth ? "Live nights, youth events, and youth series updates enabled." : "Youth-specific alerts muted."}
                    onClick={() => setSegmentYouth((prev) => !prev)}
                    icon={Users}
                  />
                  <ToggleCard
                    active={segmentWomen}
                    title="Women Fellowship"
                    description={segmentWomen ? "Women-focused gatherings and updates enabled." : "Women-focused alerts muted."}
                    onClick={() => setSegmentWomen((prev) => !prev)}
                    icon={Sparkles}
                  />
                  <ToggleCard
                    active={segmentFamily}
                    title="Family Ministry"
                    description={segmentFamily ? "Family devotionals, camps, and parenting updates enabled." : "Family-specific alerts muted."}
                    onClick={() => setSegmentFamily((prev) => !prev)}
                    icon={Blocks}
                  />
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
                  title="Child-mode and family safety"
                  subtitle="Guarded settings for younger users and family-linked accounts."
                  action="Guarded"
                />
                <div className="space-y-3">
                  <ToggleCard
                    active={childMode}
                    title="Child-mode"
                    description={childMode ? "Restricted profile visibility, safer chat defaults, and tighter discovery rules are active." : "Child-mode is currently off."}
                    onClick={() => setChildMode((prev) => !prev)}
                    icon={ShieldCheck}
                    tone="warning"
                  />
                  <ToggleCard
                    active={advancedParentalControls}
                    title="Advanced parental controls"
                    description={advancedParentalControls ? "Time windows, approval gates, and stronger event/content controls are active." : "Only basic parental controls are active."}
                    onClick={() => setAdvancedParentalControls((prev) => !prev)}
                    icon={Users}
                  />
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 backdrop-blur">
                    Child-mode should remain guarded and may require family role validation, guardian context, or additional confirmation before being switched.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Blocked users"
                  subtitle="A clear list of accounts this user has chosen to block."
                  action="Review"
                />
                <div className="space-y-3">
                  {blockedUsers.map((user) => (
                    <div key={user.name} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="min-w-0 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8fafc] text-slate-600 ring-1 ring-slate-200">
                          <UserMinus className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.reason}</div>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                        Unblock
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-[#f77f00]/20 bg-[#fffaf3] shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Advanced parental layer"
                  subtitle="Premium-style controls for families and guardians."
                  action="Preview"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-xl border border-[#f77f00]/15 bg-white p-4">
                    Approval requirements for child-joined groups, premium content, or sensitive event registration.
                  </div>
                  <div className="rounded-xl border border-[#f77f00]/15 bg-white p-4">
                    Download controls for minors and review visibility restrictions for youth-facing environments.
                  </div>
                  <div className="rounded-xl border border-[#f77f00]/15 bg-white p-4">
                    Per-segment notification management for parents following childrenâ€™s church, school faith clubs, or family events.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-card rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="fh-card-content p-5 sm:p-6">
                <SectionHeader
                  title="Sync and data posture"
                  subtitle="Editable offline, synchronized later, and always transparent to the user."
                  action="Diagnostics"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                    Language, privacy, download, and notification settings can be updated while offline and synchronized later.
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                    Guarded child-mode changes can remain pending until the platform completes any required validation or guardian confirmation.
                  </div>
                  <div className="rounded-xl border border-[#03cd8c]/15 bg-[#ecfff8] p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <MoonStar className="h-4 w-4 text-[#03cd8c]" /> Calm persistence
                    </div>
                    <div>The settings experience should preserve unfinished edits and clearly tell the user when sync is pending.</div>
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


