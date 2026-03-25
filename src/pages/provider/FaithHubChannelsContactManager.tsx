// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Filter,
  Globe2,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  SplitSquareVertical,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const contacts = [
  {
    id: 1,
    name: "Naomi Campbell",
    segment: "Youth Church",
    optIn: "WhatsApp + Push",
    channelPrefs: ["WhatsApp", "Push"],
    status: "Opted in",
    brandLine: "FaithHub Main",
  },
  {
    id: 2,
    name: "David Otema",
    segment: "Family Ministry",
    optIn: "Email + Push",
    channelPrefs: ["Email", "Push"],
    status: "Opted in",
    brandLine: "Family Line",
  },
  {
    id: 3,
    name: "Miriam A.",
    segment: "Women Fellowship",
    optIn: "WhatsApp",
    channelPrefs: ["WhatsApp"],
    status: "Template-required",
    brandLine: "Women Line",
  },
  {
    id: 4,
    name: "Samuel O.",
    segment: "General Community",
    optIn: "SMS + Push",
    channelPrefs: ["SMS", "Push"],
    status: "Opted in",
    brandLine: "FaithHub Main",
  },
  {
    id: 5,
    name: "Anonymous Member 18",
    segment: "Members only",
    optIn: "Email",
    channelPrefs: ["Email"],
    status: "Limited consent",
    brandLine: "Member Line",
  },
];

const optInTimeline = [
  {
    event: "WhatsApp consent captured",
    detail: "Naomi Campbell opted in through QR scan at live waiting room entry.",
    time: "Today  09:21",
  },
  {
    event: "Template eligibility window checked",
    detail: "Miriam A. moved to template-required state after service window expired.",
    time: "Today  09:08",
  },
  {
    event: "Family line preference updated",
    detail: "David Otema switched from SMS to Email + Push for family notifications.",
    time: "Yesterday  18:42",
  },
];

const messageTemplates = [
  {
    name: "Live reminder template",
    locale: "English",
    state: "Approved",
    usage: "Use when direct free-form messaging is not available.",
  },
  {
    name: "Replay available template",
    locale: "Arabic",
    state: "Approved",
    usage: "Used for post-live replay announcements after the messaging window closes.",
  },
  {
    name: "Event RSVP nudge",
    locale: "French",
    state: "Pending review",
    usage: "Designed for event reminders and confirmation follow-up.",
  },
];

const senderPools = [
  { line: "FaithHub Main", state: "Active", purpose: "General institution communications" },
  { line: "Family Line", state: "Active", purpose: "Family and household flows" },
  { line: "Women Line", state: "Draft", purpose: "Women fellowship and special campaigns" },
  { line: "Member Line", state: "Premium", purpose: "Members-only direct messaging lane" },
];

function FilterChip({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#03cd8c] bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20"
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

export default function FaithHubChannelsContactManager() {
  const [offlineReadOnly, setOfflineReadOnly] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState("All contacts");
  const [query, setQuery] = useState("");
  const [multiBrandLines, setMultiBrandLines] = useState(true);
  const [senderPoolsEnabled, setSenderPoolsEnabled] = useState(true);
  const [templateManagerOpen, setTemplateManagerOpen] = useState(true);

  const visibleContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSegment = selectedSegment === "All contacts" || contact.segment === selectedSegment;
      const matchesQuery =
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.segment.toLowerCase().includes(query.toLowerCase()) ||
        contact.brandLine.toLowerCase().includes(query.toLowerCase());
      return matchesSegment && matchesQuery;
    });
  }, [selectedSegment, query]);

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
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#03cd8c] text-white shadow-lg shadow-[#03cd8c]/20">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Channels & Contact Manager</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineReadOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineReadOnly ? "Contacts cached, edits queued" : "Contacts and channels live"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-[#03cd8c]/30 hover:text-[#03cd8c]">
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Contacts, segments, channels, consent</Badge>
                    <Badge className="rounded-full bg-slate-900/85 text-white hover:bg-slate-900">Template readiness and sender governance</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Messaging operations at provider scale</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Manage people, consent, segments, and channel readiness from one premium communication hub.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This page gives providers a unified contact view with channel preference awareness, consent audit trails, messaging readiness, and premium multi-brand or sender-pool controls for scaled communications.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Contact posture</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Visible contacts</div>
                        <div className="mt-1 text-3xl font-semibold text-white">{visibleContacts.length}</div>
                        <div className="mt-2 text-sm text-white/80">Segment filtered for {selectedSegment}.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Add contact</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineReadOnly((prev) => !prev)}
                        >
                          {offlineReadOnly ? "Queue edits" : "Sync live"}
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
                  title="Contacts and segments"
                  subtitle="Search, filter, and understand opt-in posture before messaging."
                />
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search contacts, segments, or brand lines"
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] pl-11 pr-4 text-sm outline-none focus:border-[#03cd8c]"
                      />
                    </div>
                    <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                      <Filter className="mr-2 h-4 w-4 text-[#03cd8c]" /> Filters
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["All contacts", "Youth Church", "Women Fellowship", "Family Ministry", "Members only"].map((segment) => (
                      <FilterChip
                        key={segment}
                        label={segment}
                        active={selectedSegment === segment}
                        onClick={() => setSelectedSegment(segment)}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    {visibleContacts.map((contact) => (
                      <div key={contact.id} className="fh-subcard rounded-[24px] p-4">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-base font-semibold text-slate-900">{contact.name}</div>
                            <div className="text-sm text-slate-500">{contact.segment}  {contact.brandLine}</div>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${contact.status === "Opted in" ? "bg-[#ecfff8] text-[#03cd8c]" : contact.status === "Template-required" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-slate-100 text-slate-700"}`}>
                            {contact.status}
                          </span>
                        </div>
                        <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                          <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Opt-in: {contact.optIn}</div>
                          <div className="rounded-2xl bg-[#f8fafc] px-3 py-2">Channels: {contact.channelPrefs.join(", ")}</div>
                        </div>
                      </div>
                    ))}
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
                  title="Consent audit trail"
                  subtitle="Trace how and when users granted contact permissions."
                  action="Export"
                />
                <div className="space-y-3">
                  {optInTimeline.map((item) => (
                    <div key={item.event} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                      <div className="mb-1 text-sm font-semibold text-white">{item.event}</div>
                      <div className="text-sm text-white/75">{item.detail}</div>
                      <div className="mt-2 text-xs text-white/55">{item.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Template management"
                  subtitle="Use approved templates when direct free-form messaging is not available."
                  action="Templates"
                />
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setTemplateManagerOpen((prev) => !prev)}
                  >
                    {templateManagerOpen ? "Template panel open" : "Open template panel"}
                  </Button>

                  {templateManagerOpen ? (
                    <div className="space-y-3">
                      {messageTemplates.map((template) => (
                        <div key={template.name} className="fh-subcard rounded-[24px] p-4">
                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{template.name}</div>
                              <div className="text-xs text-slate-500">{template.locale}</div>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${template.state === "Approved" ? "bg-[#ecfff8] text-[#03cd8c]" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                              {template.state}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">{template.usage}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[24px] border border-dashed border-slate-200 bg-[#f8fafc] p-6 text-center text-sm text-slate-600">
                      Template management preview is hidden in this state.
                    </div>
                  )}

                  <div className="fh-subcard-accent rounded-[24px] p-4 text-sm text-slate-700">
                    When direct message windows are closed, approved templates should take over for compliant outreach, reminders, and replay notifications.
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr]">
              <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Premium messaging infrastructure</div>
                  <div className="space-y-3">
                    <button
                      onClick={() => setMultiBrandLines((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${multiBrandLines ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <SplitSquareVertical className="h-4 w-4 text-[#03cd8c]" /> Multi-brand lines
                      </div>
                      <div className="text-sm text-slate-600">{multiBrandLines ? "Distinct ministry or institution lines are enabled." : "Single message identity only."}</div>
                    </button>
                    <button
                      onClick={() => setSenderPoolsEnabled((prev) => !prev)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${senderPoolsEnabled ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Phone className="h-4 w-4 text-[#03cd8c]" /> Dedicated sender pools
                      </div>
                      <div className="text-sm text-slate-600">{senderPoolsEnabled ? "Sender pools are available for routing load and identity separation." : "Shared sender path only."}</div>
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
                <CardContent className="fh-pad-panel">
                  <div className="mb-4 text-lg font-semibold text-slate-900">Messaging lines and sender pools</div>
                  <div className="space-y-3">
                    {senderPools.map((item) => (
                      <div key={item.line} className="fh-subcard rounded-[24px] p-4">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <div className="text-sm font-semibold text-slate-900">{item.line}</div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.state === "Active" ? "bg-[#ecfff8] text-[#03cd8c]" : item.state === "Premium" ? "bg-slate-900 text-white" : "bg-[#fff8ef] text-[#f77f00]"}`}>
                            {item.state}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">{item.purpose}</div>
                      </div>
                    ))}
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




