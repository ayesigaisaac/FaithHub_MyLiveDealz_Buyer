import React, { useState } from "react";
import {
  Activity,
  Bell,
  Clock3,
  Layers3,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import { ctaPriorityClass } from "@/constants/ctaStyles";
import { faithHubToneCopy } from "@/constants/faithHubTone";

type TimeWindow = "7d" | "30d" | "term";

type ModuleItem = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionId: string;
};

type ProgressItem = {
  id: string;
  label: string;
  value: string;
  progress: number;
  note: string;
  tone: "emerald" | "orange" | "rose";
  badge: string;
};

type SignalCard = {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: "emerald" | "orange" | "slate";
  progress: number;
};

type PriorityItem = {
  id: string;
  title: string;
  detail: string;
  actionLabel: string;
  actionId: string;
  tone?: "default" | "elevated";
};

type TimelineItem = {
  id: string;
  time: string;
  title: string;
  detail: string;
};

const modules: ModuleItem[] = [
  {
    id: "moderation-console",
    title: "Moderation Console",
    description: "Review live reports, takedowns, and urgent trust escalations.",
    actionLabel: "Moderation console",
    actionId: "open-admin-live-moderation",
  },
  {
    id: "verification-queue",
    title: "Verification Queue",
    description: "Institution approvals and compliance decisions.",
    actionLabel: "Verification queue",
    actionId: "open-admin-verification",
  },
  {
    id: "provider-ops",
    title: "Provider Operations",
    description: "Inspect provider live operations under admin oversight.",
    actionLabel: "Provider operations",
    actionId: "open-live-ops",
  },
  {
    id: "user-experience",
    title: "User Experience",
    description: "Inspect user journeys without leaving admin scope.",
    actionLabel: "User experience",
    actionId: "open-discover",
  },
];

const progressItems: ProgressItem[] = [
  {
    id: "incidents",
    label: "Open incidents",
    value: "9",
    progress: 62,
    note: "2 critical incidents are active and under review.",
    tone: "rose",
    badge: "Critical",
  },
  {
    id: "verification",
    label: "Verification queue",
    value: "126",
    progress: 71,
    note: "Backlog is elevated in 3 regions.",
    tone: "orange",
    badge: "Watch",
  },
  {
    id: "sla",
    label: "Incident SLA",
    value: "96%",
    progress: 96,
    note: "Response targets remain within operational threshold.",
    tone: "emerald",
    badge: "Healthy",
  },
];

const signalCards: SignalCard[] = [
  { id: "sessions", label: "Active sessions", value: "26", delta: "+4", tone: "emerald", progress: 71 },
  { id: "providers", label: "Institutions", value: "1,482", delta: "+38", tone: "slate", progress: 64 },
  { id: "users", label: "Active members (DAU)", value: "184k", delta: "+11.8%", tone: "emerald", progress: 79 },
  { id: "revenue", label: "Giving and payout signals", value: "$82.4k", delta: "+14.3%", tone: "orange", progress: 68 },
];

const priorities: PriorityItem[] = [
  {
    id: "triage",
    title: "Triage two critical incidents",
    detail: "Moderation and media-classification signals require immediate admin follow-up.",
    actionLabel: "Open incident desk",
    actionId: "open-admin-live-moderation",
    tone: "elevated",
  },
  {
    id: "queue",
    title: "Reduce verification backlog",
    detail: "Three regions crossed the review wait threshold and need expedited processing.",
    actionLabel: "Verification queue",
    actionId: "open-admin-verification",
  },
  {
    id: "security",
    title: "Review security audit anomalies",
    detail: "Permission-change bursts triggered secondary review in the last hour.",
    actionLabel: "Open security",
    actionId: "open-admin-security",
  },
  {
    id: "provider",
    title: "Inspect provider reliability",
    detail: "Live reliability watch list grew for one high-traffic provider cluster.",
    actionLabel: "Provider operations",
    actionId: "open-live-ops",
  },
];

const timeline: TimelineItem[] = [
  {
    id: "0905",
    time: "09:05",
    title: "Critical incident standup",
    detail: "Moderation leads and trust team handoff.",
  },
  {
    id: "1210",
    time: "12:10",
    title: "Verification queue flush",
    detail: "Regional compliance reviewers clear aged cases.",
  },
  {
    id: "1600",
    time: "16:00",
    title: "Security posture review",
    detail: "Audit trail and permission drift checks.",
  },
];

const actionItems: PriorityItem[] = [
  {
    id: "anomaly",
    title: "Anomaly dashboards",
    detail: "Inspect cross-module drift and anomaly spikes.",
    actionLabel: "Open security",
    actionId: "open-admin-security",
    tone: "elevated",
  },
  {
    id: "moderation",
    title: "Moderation console",
    detail: "Process report volume spikes from live sessions.",
    actionLabel: "Moderation console",
    actionId: "open-admin-live-moderation",
  },
  {
    id: "verification",
    title: "Verification queue",
    detail: "Approve or escalate pending institution compliance.",
    actionLabel: "Verification queue",
    actionId: "open-admin-verification",
  },
];

function deltaToneClass(tone: SignalCard["tone"]) {
  if (tone === "orange") return "bg-[#fff3e8] text-[#cc6500]";
  if (tone === "slate") return "bg-slate-100 text-slate-700";
  return "bg-[#ecfff8] text-[#049e6d]";
}

function progressBarClass(tone: SignalCard["tone"]) {
  if (tone === "orange") return "bg-[#f77f00]/80";
  if (tone === "slate") return "bg-slate-400/80";
  return "bg-[#03cd8c]/80";
}

export default function FaithHubAdminOverview() {
  const [windowView, setWindowView] = useState<TimeWindow>("7d");
  const copy = faithHubToneCopy.adminOverview;

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-[linear-gradient(112deg,rgba(14,165,233,0.11),rgba(248,251,252,0.94)_38%,rgba(3,205,140,0.12))] shadow-[var(--shadow-soft)]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-slate-500">{copy.hero.kicker}</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{copy.hero.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{copy.hero.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                  {copy.badges.primary}
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-100">
                  {copy.badges.secondary}
                </Badge>
                <Badge className="rounded-full border-slate-200 bg-white text-slate-600 hover:bg-white">
                  {copy.badges.tertiary}
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[420px]">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setWindowView("7d")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      windowView === "7d" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    7 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowView("30d")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      windowView === "30d" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    30 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowView("term")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      windowView === "term" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    This term
                  </button>
                </div>

                <Button
                  variant="outline"
                  data-action-label="Open security"
                  data-action-id="open-admin-security"
                  className={`h-10 rounded-xl px-4 text-sm ${ctaPriorityClass("secondary")}`}
                >
                  {copy.ctas.openSecurity}
                </Button>
                <Button
                  variant="outline"
                  data-action-label="Moderation console"
                  data-action-id="open-admin-live-moderation"
                  className={`h-10 rounded-xl px-4 text-sm ${ctaPriorityClass("secondary")}`}
                >
                  {copy.ctas.openModeration}
                </Button>
                <Button
                  data-action-label="Open incident desk"
                  data-action-id="open-admin-live-moderation"
                  className={`h-10 rounded-xl px-4 text-sm ${ctaPriorityClass("primary")}`}
                >
                  {copy.ctas.openIncidentDesk}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((module) => (
              <button
                key={module.id}
                type="button"
                data-action-label={module.actionLabel}
                data-action-id={module.actionId}
                className="group w-full rounded-2xl border border-[var(--border)] bg-white/90 p-4 text-left transition hover:border-[#c8f0e0] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{module.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{module.description}</div>
                  </div>
                  <ArrowBadge />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {progressItems.map((item) => (
              <DashboardStatCard
                key={item.id}
                label={item.label}
                value={item.value}
                badge={item.badge}
                hint={item.note}
                tone={item.tone}
                progress={item.progress}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {signalCards.map((card) => (
          <Card key={card.id} className="rounded-2xl border border-[var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{card.label}</div>
                  <div className="mt-2 text-3xl font-bold leading-none text-slate-900">{card.value}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${deltaToneClass(card.tone)}`}>
                  {card.delta}
                </span>
              </div>

              <div className="mt-3 h-1.5 rounded-full bg-slate-200">
                <div className={`h-full rounded-full ${progressBarClass(card.tone)}`} style={{ width: `${card.progress}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1.05fr_1.1fr]">
        <Card className="rounded-2xl border border-[var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Priority Queue"
              subtitle="Highest-impact admin actions for this window"
              action={
                <button
                  type="button"
                  data-action-label="Open incident desk"
                  data-action-id="open-admin-live-moderation"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  {copy.ctas.openFullQueue}
                </button>
              }
            />

            <div className="space-y-2">
              {priorities.map((item) => (
                <DashboardActionItem
                  key={item.id}
                  title={item.title}
                  detail={item.detail}
                  actionLabel={item.actionLabel}
                  actionId={item.actionId}
                  tone={item.tone}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Ops Agenda"
              subtitle="Platform timeline and escalation checkpoints"
              action={
                <button
                  type="button"
                  data-action-label="Provider operations"
                  data-action-id="open-live-ops"
                  className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Bell className="mr-1.5 h-3.5 w-3.5" />
                  {copy.ctas.openProviderLiveOps}
                </button>
              }
            />

            <div className="space-y-2">
              {timeline.map((item) => (
                <div key={item.id} className="rounded-xl border border-[var(--border)] bg-white p-3">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-7 min-w-[2.6rem] items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-semibold text-slate-600">
                      {item.time}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-[var(--border)] bg-slate-50 p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Completion</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">63%</div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                <div className="h-full w-[63%] rounded-full bg-[#03cd8c]" />
              </div>
              <div className="mt-2 text-xs text-slate-500">Most pending work is in verification and security follow-up.</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-soft)]">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Fast cross-module actions"
              action={
                <button
                  type="button"
                  aria-label="Open action center settings"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              }
            />

            <div className="rounded-xl border border-[var(--border)] bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Highlights</div>
                <MessageSquare className="h-4 w-4 text-slate-400" />
              </div>

              <div className="space-y-2">
                {actionItems.map((item) => (
                  <DashboardActionItem
                    key={item.id}
                    title={item.title}
                    detail={item.detail}
                    actionLabel={item.actionLabel}
                    actionId={item.actionId}
                    tone={item.tone}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-emerald-100 bg-[#ecfff8] p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Smart insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Trust posture improves with faster escalation loops</div>
              <p className="mt-1 text-xs text-slate-600">
                Incidents resolved under 10 minutes have significantly lower recurrence risk.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard label="Incidents" value="9" hint="2 critical" tone="rose" icon={<TriangleAlert className="h-4 w-4" />} />
        <DashboardStatCard label="Moderation actions" value="3,218" hint="Automated assist stable" tone="emerald" icon={<ShieldAlert className="h-4 w-4" />} />
        <DashboardStatCard label="Live sessions" value="26" hint="4 at watch state" tone="orange" icon={<Activity className="h-4 w-4" />} />
        <DashboardStatCard label="Giving & payout signals" value="$82.4k" hint="Conversion above baseline" tone="slate" icon={<Wallet className="h-4 w-4" />} />
      </div>
    </div>
  );
}

function ArrowBadge() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
      <Layers3 className="h-3.5 w-3.5" />
    </span>
  );
}

