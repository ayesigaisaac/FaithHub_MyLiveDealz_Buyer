import { getCommunityPosts } from "@/data/community";
import { getActiveFunds } from "@/data/funds";
import { getFaithHubResources } from "@/data/resources";
import { getWalletByRole } from "@/data/wallet";
import { routes } from "@/constants/routes";

export interface PersonalizedItem {
  id: string;
  title: string;
  detail: string;
  path: string;
}

export interface HomePersonalizationSnapshot {
  continueWatching: PersonalizedItem[];
  liveNow: PersonalizedItem[];
  recommendedContent: PersonalizedItem[];
  communityActivity: PersonalizedItem[];
  suggestedGiving: PersonalizedItem[];
}

const continueWatchingSeed = [
  {
    id: "mercy-in-motion-ep3",
    title: "Mercy in Motion - Episode 3",
    detail: "Resume at 18:42",
    path: routes.app.user.replayById("mercy-in-motion-ep3"),
  },
  {
    id: "family-altars-ep1",
    title: "Family Altars - Episode 1",
    detail: "Resume at 07:15",
    path: routes.app.user.replayById("family-altars-ep1"),
  },
];

const liveNowSeed = [
  {
    id: "live-evening-prayer",
    title: "Evening Prayer Revival",
    detail: "Live now - 430 watching",
    path: routes.app.user.liveHub,
  },
  {
    id: "live-youth-impact",
    title: "Youth Impact Night",
    detail: "Starts in 40 minutes",
    path: routes.app.user.liveHub,
  },
];

function toCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getHomePersonalizationSnapshot(): HomePersonalizationSnapshot {
  const recentResources = getFaithHubResources().slice(0, 3).map((resource) => ({
    id: resource.id,
    title: resource.title,
    detail: `${resource.category} - ${resource.author}`,
    path: routes.app.user.resourceDetailById(resource.id),
  }));

  const recentCommunity = getCommunityPosts().slice(0, 3).map((post) => ({
    id: post.id,
    title: post.authorRole === "provider" ? `${post.author.name} shared an update` : `${post.author.name} posted`,
    detail: post.content.slice(0, 70),
    path: routes.app.user.community,
  }));

  const activeFunds = getActiveFunds().slice(0, 3).map((fund) => ({
    id: fund.id,
    title: fund.title,
    detail: `${toCurrency(fund.current_amount)} of ${toCurrency(fund.target_amount)} raised`,
    path: `/fund/${fund.slug}`,
  }));

  const wallet = getWalletByRole("user");
  const suggestedGiving =
    wallet.transactions.some((transaction) => transaction.type === "donation")
      ? activeFunds
      : [
          {
            id: "giving-starter",
            title: "Start your first giving action",
            detail: "Support an active campaign in one tap",
            path: routes.app.user.giving,
          },
          ...activeFunds,
        ];

  return {
    continueWatching: continueWatchingSeed,
    liveNow: liveNowSeed,
    recommendedContent: recentResources,
    communityActivity: recentCommunity,
    suggestedGiving,
  };
}

