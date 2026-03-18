import React, { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Layers3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import type {
  InstitutionEventItem,
  InstitutionSeriesItem,
  LeaderItem,
  ServiceScheduleItem,
} from "@/pages/user/institution/types";

const serviceSchedule: ServiceScheduleItem[] = [
  {
    day: "Sunday",
    time: "8:00 AM - Main Service",
    note: "Wheelchair seating and quiet area available",
  },
  {
    day: "Wednesday",
    time: "6:30 PM - Midweek Teaching",
    note: "Live and in-person hybrid",
  },
  {
    day: "Friday",
    time: "7:30 PM - Youth Fellowship",
    note: "Youth and family participation",
  },
];

const leaders: LeaderItem[] = [
  {
    name: "Rev. Naomi Kato",
    role: "Lead Pastor",
    specialty: "Teaching, counseling, women fellowship",
  },
  {
    name: "Daniel Ssentamu",
    role: "Youth Director",
    specialty: "Youth programs and live worship nights",
  },
  {
    name: "Aisha Nabirye",
    role: "Community Care Lead",
    specialty: "Prayer support, missions, and family outreach",
  },
];

const series: InstitutionSeriesItem[] = [
  { title: "Walking in Wisdom", meta: "8 episodes - Episode 4 live tonight" },
  { title: "Mercy in Motion", meta: "6 episodes - Replay available" },
  { title: "Faith That Builds", meta: "New series - Starts next week" },
];

const events: InstitutionEventItem[] = [
  { title: "Youth Worship Camp", date: "12-15 Aug", type: "Camp", price: "FaithMart ticket" },
  { title: "Marketplace Day", date: "20 Aug", type: "Marketplace", price: "Vendor booths + merch" },
  { title: "Baptism Sunday", date: "01 Sep", type: "Baptism", price: "Free registration" },
];

export default function InstitutionProfile() {
  const [following, setFollowing] = useState(true);
  const [memberMode, setMemberMode] = useState(false);

  const verifiedLeaders = useMemo(() => leaders.length, []);
  const nextService = useMemo(() => serviceSchedule[0], []);

  return (
    <div className="space-y-4">
      <Card className="fh-hero-card overflow-hidden rounded-[24px]">
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-slate-500">Institution Profile</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">St. Marys Cathedral</h2>
              <p className="mt-2 text-sm text-slate-600">Community worship, live teaching, events, and giving in one trusted profile.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald hover:bg-emerald-50">
                  Verified institution
                </Badge>
                <Badge className="fh-pill fh-pill-slate hover:bg-slate-100">
                  {following ? "Following" : "Not following"}
                </Badge>
                <Badge className="fh-pill fh-pill-slate hover:bg-white">
                  {memberMode ? "Member mode" : "Public mode"}
                </Badge>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto xl:min-w-[420px]">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button
                  variant="outline"
                  data-action-label="Open series"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Series
                </Button>
                <Button
                  variant="outline"
                  data-action-label="Open event"
                  className="h-10 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Events
                </Button>
                <Button
                  data-action-label="Open live"
                  className="h-10 rounded-xl bg-[#03cd8c] px-4 text-sm text-white hover:bg-[#03cd8c]"
                >
                  Open live
                </Button>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFollowing((prev) => !prev)}
                  className={`inline-flex min-h-[38px] items-center rounded-xl border px-3 text-xs font-semibold transition ${
                    following
                      ? "border-emerald-200 bg-[#ecfff8] text-[#049e6d]"
                      : "border-slate-200 bg-white text-slate-600 hover:-translate-y-[1px] hover:bg-slate-50"
                  }`}
                >
                  {following ? "Following" : "Follow"}
                </button>
                <button
                  type="button"
                  onClick={() => setMemberMode((prev) => !prev)}
                  className={`inline-flex min-h-[38px] items-center rounded-xl border px-3 text-xs font-semibold transition ${
                    memberMode
                      ? "border-emerald-200 bg-[#ecfff8] text-[#049e6d]"
                      : "border-slate-200 bg-white text-slate-600 hover:-translate-y-[1px] hover:bg-slate-50"
                  }`}
                >
                  {memberMode ? "Member mode on" : "Member mode off"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <ModuleCard
              icon={<Video className="h-5 w-5" />}
              title="Join Live"
              description="Enter active sessions and waiting rooms"
              actionLabel="Join live"
            />
            <ModuleCard
              icon={<Layers3 className="h-5 w-5" />}
              title="Series Library"
              description="Open institution teaching journeys"
              actionLabel="Open series"
            />
            <ModuleCard
              icon={<CalendarDays className="h-5 w-5" />}
              title="Events"
              description="Track camps, worship nights, and ticketing"
              actionLabel="Open event"
            />
            <ModuleCard
              icon={<HeartHandshake className="h-5 w-5" />}
              title="Give"
              description="Support campaigns and community impact"
              actionLabel="Give now"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Leaders"
          value={String(verifiedLeaders)}
          hint="Core leadership team"
          tone="emerald"
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Service days"
          value={String(serviceSchedule.length)}
          hint="Weekly active schedule"
          tone="slate"
          icon={<CalendarDays className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Series"
          value={String(series.length)}
          hint="Published institution series"
          tone="orange"
          icon={<Layers3 className="h-4 w-4" />}
        />
        <DashboardStatCard
          label="Events"
          value={String(events.length)}
          hint="Upcoming community events"
          tone="emerald"
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_1fr]">
        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="About & Leaders"
              subtitle="Who leads this community and what they focus on"
              action={
                <button
                  type="button"
                  data-action-label="Open series"
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  Open series
                </button>
              }
            />

            <div className="space-y-2">
              {leaders.map((leader) => (
                <div key={leader.name} className="rounded-xl border border-[var(--border)] bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
                  <div className="text-sm font-semibold text-slate-900">{leader.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{leader.role}</div>
                  <div className="mt-1 text-xs text-slate-600">{leader.specialty}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Service Schedule"
              subtitle="Next gatherings and meeting windows"
              action={
                <button
                  type="button"
                  data-action-label="Join live"
                  className="inline-flex items-center rounded-xl border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  Join live
                </button>
              }
            />

            <div className="space-y-2">
              {serviceSchedule.map((item) => (
                <div key={`${item.day}-${item.time}`} className="rounded-xl border border-[var(--border)] bg-white p-3 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
                  <div className="text-sm font-semibold text-slate-900">{item.day}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.time}</div>
                  <div className="mt-1 text-xs text-slate-600">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-[var(--border)] bg-slate-50 p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Next service</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{nextService.day}</div>
              <div className="mt-1 text-xs text-slate-500">{nextService.time}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader
              title="Action Center"
              subtitle="Fast institution actions"
              action={
                <button
                  type="button"
                  aria-label="Open institution settings"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-slate-600"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              }
            />

            <div className="space-y-2">
              <DashboardActionItem
                title="Join current live session"
                detail="Enter the active stream with chat and Q&A enabled."
                actionLabel="Join live"
                tone="elevated"
              />
              <DashboardActionItem
                title="Open featured series"
                detail="Continue institution teaching progression."
                actionLabel="Open series"
              />
              <DashboardActionItem
                title="Give to this institution"
                detail="Support community campaigns and care programs."
                actionLabel="Give now"
              />
              <DashboardActionItem
                title="Unlock membership"
                detail="View premium benefits and member access."
                actionLabel="Unlock membership"
              />
              <DashboardActionItem
                title="Open upcoming event"
                detail="Check event details, schedule, and ticket options."
                actionLabel="Open event"
              />
            </div>

            <div className="mt-3 rounded-xl border border-emerald-100 bg-[#ecfff8] p-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Trust insight</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">Verified leadership and clear schedules improve live participation</div>
              <p className="mt-1 text-xs text-slate-600">
                Communities with transparent timing and leader profiles retain more returning users.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader title="Series Highlights" subtitle="Current institution content pathways" />
            <div className="space-y-2">
              {series.map((item) => (
                <DashboardActionItem
                  key={item.title}
                  title={item.title}
                  detail={item.meta}
                  actionLabel="Open series"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-panel-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <DashboardSectionHeader title="Event Highlights" subtitle="Institution events and access details" />
            <div className="space-y-2">
              {events.map((item) => (
                <DashboardActionItem
                  key={item.title}
                  title={item.title}
                  detail={`${item.date} · ${item.type} · ${item.price}`}
                  actionLabel="Open event"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <UserActionBar
        actions={[
          {
            id: "institution-join-live",
            label: "Join live",
            dataActionLabel: "Join live",
            variant: "default",
          },
          {
            id: "institution-open-series",
            label: "Series",
            dataActionLabel: "Open series",
          },
          {
            id: "institution-give",
            label: "Give",
            dataActionLabel: "Give now",
          },
        ]}
      />
    </div>
  );
}

function ModuleCard({
  icon,
  title,
  description,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
}) {
  return (
    <button
      type="button"
      data-action-label={actionLabel}
      className="group w-full rounded-2xl border border-[var(--border)] bg-white/90 p-4 text-left transition hover:-translate-y-[1px] hover:border-[#c8f0e0] hover:bg-white"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfff8] text-[#049e6d]">
        {icon}
      </div>
      <div className="mt-3 text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{description}</div>
    </button>
  );
}
