// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlarmClockCheck,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock3,
  Globe2,
  Languages,
  Mail,
  MessageCircle,
  PlayCircle,
  Radio,
  Save,
  Send,
  Smartphone,
  Sparkles,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const audienceGroups = [
  "All followers",
  "General community",
  "Youth Church",
  "Women Fellowship",
  "Family Ministry",
  "Members only",
];

const channels = [
  { key: "push", label: "In-app Push", icon: Bell },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { key: "email", label: "Email", icon: Mail },
  { key: "sms", label: "SMS", icon: Smartphone },
];

const localeTemplates = [
  {
    locale: "English",
    title: "Your live session begins soon",
    body: "Join us in 20 minutes for Wisdom for the Next Season. Tap to enter the waiting room.",
    status: "Ready",
  },
  {
    locale: "Arabic",
    title: "   ",
    body: "          .",
    status: "Ready",
  },
  {
    locale: "French",
    title: "Votre diffusion commence bientt",
    body: "Rejoignez la salle dattente dans 20 minutes pour la session en direct.",
    status: "Draft",
  },
];

const automationSteps = [
  {
    title: "Pre-live reminder",
    time: "20 min before",
    note: "Waiting room entry, countdown, and agenda preview.",
  },
  {
    title: "Live now alert",
    time: "At start",
    note: "Instant join link with language-aware messaging.",
  },
  {
    title: "Replay available",
    time: "35 min after end",
    note: "Replay access, notes, and next action CTA.",
  },
];

const deliveryStats = [
  { label: "Queued", value: "18.2k" },
  { label: "Delivered", value: "16.7k" },
  { label: "Opened", value: "11.4k" },
  { label: "Failed", value: "184" },
];

function ToggleChip({ active, label, onClick }) {
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

export default function FaithHubAudienceNotifications() {
  const [offlineDraft, setOfflineDraft] = useState(true);
  const [journeyAutomation, setJourneyAutomation] = useState(true);
  const [smartSend, setSmartSend] = useState(true);
  const [selectedAudience, setSelectedAudience] = useState("All followers");
  const [selectedChannels, setSelectedChannels] = useState(["push", "whatsapp", "email"]);
  const [selectedLocale, setSelectedLocale] = useState("English");

  const selectedTemplate = useMemo(
    () => localeTemplates.find((item) => item.locale === selectedLocale),
    [selectedLocale]
  );

  const toggleChannel = (key) => {
    setSelectedChannels((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
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
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Audience Notifications</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineDraft ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineDraft ? "Drafts saved locally" : "Live notification sync"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Send className="h-5 w-5" />
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
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#1fd29d] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Reminder orchestration</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Channels, localization, delivery intelligence</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Pre-live to replay journey</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Build notification journeys that reach the right audience at the right time on the right channel.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        Provider teams can configure reminders, pick channel mix, localize templates, test sends, and monitor delivery. Premium automation extends the journey from pre-live to replay without manual repetition.
                      </p>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Notification mode</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Selected audience</div>
                        <div className="mt-1 text-2xl font-semibold text-white">{selectedAudience}</div>
                        <div className="mt-2 text-sm text-white/80">{selectedChannels.length} channels active for this plan.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Send test</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineDraft((prev) => !prev)}
                        >
                          {offlineDraft ? "Draft mode" : "Sync live"}
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
                  title="Notification plan builder"
                  subtitle="Choose audience, channels, and the message journey for this campaign."
                />
                <div className="space-y-5">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Audience filter</div>
                    <div className="flex flex-wrap gap-2">
                      {audienceGroups.map((group) => (
                        <ToggleChip
                          key={group}
                          label={group}
                          active={selectedAudience === group}
                          onClick={() => setSelectedAudience(group)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-900">Channel mix</div>
                    <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                      {channels.map((channel) => {
                        const Icon = channel.icon;
                        const active = selectedChannels.includes(channel.key);
                        return (
                          <button
                            key={channel.key}
                            onClick={() => toggleChannel(channel.key)}
                            className={`rounded-[24px] border p-4 text-left transition ${
                              active ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white hover:border-[#03cd8c]/35"
                            }`}
                          >
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-semibold text-slate-900">{channel.label}</div>
                            <div className="mt-1 text-xs text-slate-500">{active ? "Selected" : "Tap to include"}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <AlarmClockCheck className="h-4 w-4 text-[#03cd8c]" /> Journey timing
                    </div>
                    <div className="space-y-3">
                      {automationSteps.map((step) => (
                        <div key={step.title} className="fh-subcard rounded-[24px] p-4">
                          <div className="mb-1 text-sm font-semibold text-slate-900">{step.title}</div>
                          <div className="text-xs text-slate-500">{step.time}</div>
                          <div className="mt-1 text-sm text-slate-600">{step.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  title="Localized templates"
                  subtitle="Adapt tone and language while keeping the same intent structure."
                  action="Preview"
                />
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {localeTemplates.map((item) => (
                      <button
                        key={item.locale}
                        onClick={() => setSelectedLocale(item.locale)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          selectedLocale === item.locale
                            ? "border-white/40 bg-white/20 text-white"
                            : "border-white/15 bg-white/10 text-white/85 hover:bg-white/15"
                        }`}
                      >
                        {item.locale}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="text-base font-semibold text-white">{selectedTemplate?.title}</div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{selectedTemplate?.status}</span>
                    </div>
                    <div className="mb-4 text-sm text-white/75">{selectedTemplate?.body}</div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">
                        <Languages className="mr-2 h-4 w-4" /> Edit locale
                      </Button>
                      <Button variant="outline" className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15">
                        <Globe2 className="mr-2 h-4 w-4" /> Duplicate template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Smart send and delivery dashboard"
                  subtitle="See the best send window and what happened after launch."
                />
                <div className="grid gap-4 lg:grid-cols-[0.44fr_0.56fr]">
                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Sparkles className="h-4 w-4 text-[#03cd8c]" /> Smart send time
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                      <div className="text-3xl font-semibold text-slate-900">6:45 PM</div>
                      <div className="mt-1 text-sm text-slate-600">Best projected open rate for this audience today.</div>
                    </div>
                    <div className="mt-4 text-sm text-slate-600">
                      {smartSend ? "Optimization is active across selected channels and locales." : "Manual send time will be used."}
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                      onClick={() => setSmartSend((prev) => !prev)}
                    >
                      {smartSend ? "Smart send on" : "Enable smart send"}
                    </Button>
                  </div>

                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <BarChart3 className="h-4 w-4 text-[#03cd8c]" /> Delivery status
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {deliveryStats.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4">
                          <div className="text-sm text-slate-500">{item.label}</div>
                          <div className="mt-1 text-3xl font-semibold text-slate-900">{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-2xl border border-[#03cd8c]/15 bg-[#ecfff8] p-4 text-sm text-slate-700">
                      Channel-by-channel delivery and template performance can be reviewed here before the next send cycle.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Premium automation</div>
                    <div className="text-sm text-slate-500">Turn reminders into a full pre-live to replay lifecycle.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Premium</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <button
                    onClick={() => setJourneyAutomation((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${journeyAutomation ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900">
                      <PlayCircle className="h-4 w-4 text-[#03cd8c]" /> Journey automation
                    </div>
                    <div>{journeyAutomation ? "Pre-live, live-now, and replay journeys are automated." : "Manual sends only."}</div>
                  </button>
                  <div className="fh-subcard-warm rounded-[24px] p-4">
                    Enterprise messaging programs can apply per-message cost models and deeper delivery automation.
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">
                    <Save className="mr-2 h-4 w-4" /> Save notification journey
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}




