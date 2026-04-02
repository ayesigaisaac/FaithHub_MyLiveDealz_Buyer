import React, { useMemo, useState } from "react";
import { BellRing, CheckCircle2, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardContentCard } from "@/components/dashboard/DashboardContentCard";
import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import type { Role } from "@/types/roles";

export type DashboardTimeWindow = "today" | "week" | "month";

export interface RoleDashboardProfile {
  name: string;
  roleLabel: string;
  community: string;
  status: string;
}

export interface RoleDashboardNotification {
  id: string;
  title: string;
  detail: string;
  type: "live" | "event" | "reply" | "giving";
  path: string;
  window: DashboardTimeWindow;
}

export interface RoleDashboardResumeItem {
  id: string;
  label: string;
  detail: string;
  path: string;
}

export interface RoleDashboardCardAction {
  id: string;
  label: string;
  to?: string;
  variant?: "default" | "outline" | "ghost";
  behavior?: "navigate" | "save" | "share" | "donate";
}

export interface RoleDashboardCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  metadata: string[];
  category: "content" | "events" | "community" | "giving" | "operations" | "moderation" | "reports";
  window: DashboardTimeWindow;
  actions: RoleDashboardCardAction[];
  primaryPath?: string;
  donationPath?: string;
  highlight?: "default" | "accent" | "warning";
}

export interface RoleDashboardCommunityModule {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
}

export interface RoleDashboardStat {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone?: "emerald" | "orange" | "slate" | "rose";
}

interface RoleDashboardShellProps {
  role: Role;
  kicker: string;
  title: string;
  subtitle: string;
  profile: RoleDashboardProfile;
  notifications: RoleDashboardNotification[];
  resumeItems: RoleDashboardResumeItem[];
  cards: RoleDashboardCard[];
  communityModules: RoleDashboardCommunityModule[];
  stats: RoleDashboardStat[];
  defaultDonatePath: string;
}

const windowOptions: Array<{ id: DashboardTimeWindow; label: string }> = [
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
];

const categoryLabel: Record<RoleDashboardCard["category"], string> = {
  content: "Content",
  events: "Events",
  community: "Community",
  giving: "Giving",
  operations: "Operations",
  moderation: "Moderation",
  reports: "Reports",
};

function notificationTone(type: RoleDashboardNotification["type"]) {
  if (type === "live") return "fh-pill fh-pill-emerald";
  if (type === "event") return "fh-pill fh-pill-orange";
  if (type === "giving") return "fh-pill fh-pill-slate";
  return "rounded-full border border-[rgba(3,205,140,0.28)] bg-[rgba(3,205,140,0.14)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]";
}

function shareLink(path: string) {
  if (typeof window === "undefined") return;
  const fullLink = `${window.location.origin}${path}`;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(fullLink).catch(() => {
      window.prompt("Copy this link", fullLink);
    });
    return;
  }
  window.prompt("Copy this link", fullLink);
}

export function RoleDashboardShell({
  role,
  kicker,
  title,
  subtitle,
  profile,
  notifications,
  resumeItems,
  cards,
  communityModules,
  stats,
  defaultDonatePath,
}: RoleDashboardShellProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [windowFilter, setWindowFilter] = useState<DashboardTimeWindow>("today");
  const [categoryFilter, setCategoryFilter] = useState<"all" | RoleDashboardCard["category"]>("all");
  const [savedCardIds, setSavedCardIds] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => {
    const unique = new Set<RoleDashboardCard["category"]>();
    for (const card of cards) unique.add(card.category);
    return Array.from(unique);
  }, [cards]);

  const filteredCards = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesWindow = card.window === windowFilter;
      const matchesCategory = categoryFilter === "all" || card.category === categoryFilter;
      if (!matchesWindow || !matchesCategory) return false;
      if (!normalizedSearch) return true;

      const searchableText = [card.title, card.description, ...card.metadata, categoryLabel[card.category]]
        .join(" ")
        .toLowerCase();
      return searchableText.includes(normalizedSearch);
    });
  }, [cards, categoryFilter, searchQuery, windowFilter]);

  const filteredNotifications = useMemo(
    () => notifications.filter((item) => item.window === windowFilter),
    [notifications, windowFilter],
  );

  const onCardAction = (card: RoleDashboardCard, action: RoleDashboardCardAction) => {
    const behavior = action.behavior || "navigate";
    if (behavior === "save") {
      setSavedCardIds((prev) => ({ ...prev, [card.id]: !prev[card.id] }));
      return;
    }

    if (behavior === "share") {
      shareLink(action.to || card.primaryPath || defaultDonatePath);
      return;
    }

    if (behavior === "donate") {
      navigate(action.to || card.donationPath || defaultDonatePath);
      return;
    }

    navigate(action.to || card.primaryPath || defaultDonatePath);
  };

  const totalPinnedNotifications = filteredNotifications.length;

  return (
    <div className="space-y-4 sm:space-y-5">
      <Card className="fh-interactive-card fh-hero-card rounded-[24px]">
        <CardContent className="fh-pad-panel space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="fh-label text-[var(--text-secondary)]">{kicker}</div>
              <h1 className="mt-1 max-w-3xl text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-[2.2rem]">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">{subtitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">{profile.roleLabel}</Badge>
                <Badge className="fh-pill fh-pill-slate">{profile.community}</Badge>
                <Badge className="fh-pill fh-pill-orange">{profile.status}</Badge>
              </div>
            </div>

            <Card className="fh-surface-card w-full max-w-[27rem] rounded-2xl border border-[var(--border)]">
              <CardContent className="space-y-2.5 p-4">
                <div className="fh-label text-[var(--text-secondary)]">Profile summary</div>
                <div className="text-lg font-semibold text-[var(--text-primary)]">{profile.name}</div>
                <div className="text-sm text-[var(--text-secondary)]">{profile.roleLabel}</div>
                <div className="text-sm text-[var(--text-secondary)]">{profile.community}</div>
                <div className="inline-flex items-center rounded-full bg-[rgba(3,205,140,0.14)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  {profile.status}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Notifications"
              subtitle="Live sessions, reminders, replies, and giving alerts"
              action={
                <Badge className="fh-pill fh-pill-slate">{totalPinnedNotifications} active</Badge>
              }
            />

            <div className="space-y-2.5">
              {filteredNotifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => navigate(notification.path)}
                  className="fh-subcard w-full rounded-xl px-3 py-3 text-left transition hover:border-[rgba(3,205,140,0.3)]"
                  data-no-nav
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{notification.title}</div>
                      <div className="mt-1 text-xs text-[var(--text-secondary)]">{notification.detail}</div>
                    </div>
                    <span className={notificationTone(notification.type)}>{notification.type}</span>
                  </div>
                </button>
              ))}

              {!filteredNotifications.length ? (
                <div className="rounded-xl border border-dashed border-[var(--border)] px-3 py-4 text-sm text-[var(--text-secondary)]">
                  No alerts in this timeframe.
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="fh-pad-panel">
            <DashboardSectionHeader
              title="Continue where you left off"
              subtitle="Resume your latest journey across content and community"
            />

            <div className="space-y-2.5">
              {resumeItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="fh-subcard w-full rounded-xl px-3 py-3 text-left transition hover:border-[rgba(3,205,140,0.3)]"
                  data-no-nav
                >
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{item.label}</div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">{item.detail}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="fh-interactive-card fh-surface-card rounded-2xl">
        <CardContent className="fh-pad-panel">
          <DashboardSectionHeader
            title="Search and filter"
            subtitle="Find sermons, events, and community moments faster"
          />

          <div className="grid gap-2.5 md:grid-cols-[minmax(0,1fr)_auto_auto]">
            <label className="fh-shell-control flex h-11 items-center gap-2 rounded-xl px-3">
              <Search className="h-4 w-4 text-[var(--text-secondary)]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search sermons, events, community posts"
                className="h-full w-full border-0 bg-transparent text-sm font-medium text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </label>

            <div className="fh-shell-control flex h-11 items-center rounded-xl px-3">
              <select
                value={windowFilter}
                onChange={(event) => setWindowFilter(event.target.value as DashboardTimeWindow)}
                className="h-full border-0 bg-transparent text-sm font-semibold text-[var(--text-primary)] outline-none"
              >
                {windowOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="fh-shell-control flex h-11 items-center rounded-xl px-3">
              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value as "all" | RoleDashboardCard["category"])
                }
                className="h-full border-0 bg-transparent text-sm font-semibold text-[var(--text-primary)] outline-none"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabel[category]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCards.map((card) => (
          <DashboardContentCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            metadata={card.metadata}
            highlight={card.highlight}
            actions={card.actions.map((action) => {
              const isSaveAction = (action.behavior || "navigate") === "save";
              return {
                id: action.id,
                label: isSaveAction && savedCardIds[card.id] ? "Saved" : action.label,
                variant: action.variant,
                onClick: () => onCardAction(card, action),
              };
            })}
          />
        ))}
      </div>

      {!filteredCards.length ? (
        <Card className="fh-interactive-card fh-surface-card rounded-2xl">
          <CardContent className="flex items-center justify-center gap-2.5 px-4 py-10 text-center text-sm text-[var(--text-secondary)]">
            <Search className="h-4 w-4" />
            No cards match your current filters.
          </CardContent>
        </Card>
      ) : null}

      <Card className="fh-interactive-card fh-surface-card rounded-2xl">
        <CardContent className="fh-pad-panel">
          <DashboardSectionHeader
            title="Community features"
            subtitle="Prayer requests, testimonies, noticeboard, small groups, and community feed"
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {communityModules.map((module) => (
              <button
                key={module.id}
                type="button"
                onClick={() => navigate(module.path)}
                className="fh-subcard flex h-full flex-col items-start rounded-xl p-3 text-left transition hover:border-[rgba(3,205,140,0.3)]"
                data-no-nav
              >
                <module.icon className="h-4.5 w-4.5 text-[var(--accent)]" />
                <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{module.title}</div>
                <div className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{module.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="fh-interactive-card fh-surface-card rounded-2xl">
        <CardContent className="fh-pad-panel">
          <DashboardSectionHeader
            title="Analytics"
            subtitle="Live attendance, donations, registrations, active members, and content views"
            action={
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                <BellRing className="mr-1.5 h-3.5 w-3.5" />
                Role: {role}
              </span>
            }
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((item) => (
              <DashboardStatCard
                key={item.id}
                label={item.label}
                value={item.value}
                hint={item.hint}
                tone={item.tone || "slate"}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
