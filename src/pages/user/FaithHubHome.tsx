import React, { useMemo, useState } from "react";
import { Layers3, HeartHandshake, PlayCircle, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserPageShell from "@/pages/user/shared/UserPageShell";
import UserPageHeader from "@/pages/user/shared/UserPageHeader";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import HomeHero from "@/pages/user/home/components/HomeHero";
import IntentCards from "@/pages/user/home/components/IntentCards";
import ContinueWatchingRail from "@/pages/user/home/components/ContinueWatchingRail";
import UpcomingEventsPreview from "@/pages/user/home/components/UpcomingEventsPreview";
import type {
  ContinueWatchingItem,
  HomeIntent,
  UpcomingEventItem,
} from "@/pages/user/home/types";

const homeIntents: HomeIntent[] = [
  {
    id: "watch",
    title: "Watch Live",
    description: "Join sessions that are live or starting soon.",
    actionLabel: "Open watch live",
    icon: PlayCircle,
  },
  {
    id: "catchup",
    title: "Catch Up",
    description: "Resume sermons, series, and saved replays.",
    actionLabel: "Open catch up",
    icon: Layers3,
  },
  {
    id: "give",
    title: "Give",
    description: "Support campaigns, missions, and community impact.",
    actionLabel: "Open give",
    icon: HeartHandshake,
  },
  {
    id: "groups",
    title: "Join Group",
    description: "Find youth, women, family, and ministry circles.",
    actionLabel: "Open join group",
    icon: Users,
  },
];

const continueWatchingItems: ContinueWatchingItem[] = [
  {
    id: 1,
    title: "Wednesday Healing Service Replay",
    institution: "House of Grace",
    progress: 68,
    duration: "54 min",
  },
  {
    id: 2,
    title: "Mercy in Motion - Series Episode 2",
    institution: "FaithHub Global Chapel",
    progress: 41,
    duration: "39 min",
  },
];

const upcomingEvents: UpcomingEventItem[] = [
  {
    id: 1,
    title: "Sunrise Devotion",
    institution: "Light Community Church",
    time: "Today - 6:00 AM",
    audience: "General community",
  },
  {
    id: 2,
    title: "Youth Impact Night",
    institution: "Kingdom Youth Movement",
    time: "Today - 8:00 PM",
    audience: "Youth Church",
  },
  {
    id: 3,
    title: "Family Quran Reflection",
    institution: "Al Noor Community Centre",
    time: "Tomorrow - 5:30 PM",
    audience: "Family circle",
  },
];

export default function FaithHubHome() {
  const [offlineMode] = useState(false);
  const [activeIntentId, setActiveIntentId] = useState(homeIntents[0].id);

  const activeIntent = useMemo(
    () => homeIntents.find((intent) => intent.id === activeIntentId) || homeIntents[0],
    [activeIntentId],
  );

  return (
    <UserPageShell
      header={
        <UserPageHeader
          icon={<Sparkles className="h-5 w-5" />}
          title="FaithHub Home"
          offline={offlineMode}
          offlineLabel="Cached feed mode"
        />
      }
      hero={
        <HomeHero
          activeIntentTitle={activeIntent.title}
          activeIntentDescription={activeIntent.description}
          recommendationCount={homeIntents.length}
        />
      }
      main={
        <>
          <IntentCards
            intents={homeIntents}
            activeIntentId={activeIntentId}
            onSelect={setActiveIntentId}
          />
          <ContinueWatchingRail items={continueWatchingItems} />
        </>
      }
      aside={
        <>
          <UpcomingEventsPreview items={upcomingEvents} />

          <Card className="rounded-[20px] border border-[#f77f00]/20 bg-[linear-gradient(180deg,rgba(247,127,0,0.08),var(--surface))] shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="fh-eyebrow text-[#f77f00]">
                    Sponsored placement
                  </div>
                  <div className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                    Featured institution series
                  </div>
                </div>

                <Badge className="w-fit rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">
                  Sponsored
                </Badge>
              </div>

              <div className="rounded-[16px] border border-[#f77f00]/15 bg-[color:var(--card)] p-6 shadow-sm">
                <div className="fh-body-tight text-[var(--text-secondary)]">
                  Promoted placements are transparently labeled and governed by platform trust rules.
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    className="rounded-xl bg-emerald-500 hover:bg-emerald-500"
                    data-action-label="Open series"
                  >
                    Explore series
                  </Button>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#03cd8c]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    Admin controlled
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      }
      stickyFooter={
        <UserActionBar
          actions={[
            {
              id: "home-open-live",
              label: "Watch Live",
              dataActionLabel: "Open watch live",
              variant: "default",
            },
            {
              id: "home-open-catch-up",
              label: "Catch Up",
              dataActionLabel: "Open catch up",
            },
            {
              id: "home-open-give",
              label: "Give",
              dataActionLabel: "Open give",
            },
          ]}
        />
      }
    />
  );
}

