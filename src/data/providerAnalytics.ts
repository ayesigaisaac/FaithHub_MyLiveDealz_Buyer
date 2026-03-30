import { getCommunityPosts } from "@/data/community";
import { getProviderFundSnapshot } from "@/data/funds";
import { getFaithHubResources } from "@/data/resources";

export interface ProviderAnalyticsSnapshot {
  totalViews: number;
  engagementRate: number;
  givingReceived: number;
  liveAttendance: number;
  topPerformingContent: string;
}

function round(value: number, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function getProviderAnalyticsSnapshot(): ProviderAnalyticsSnapshot {
  const providerPosts = getCommunityPosts().filter((post) => post.authorRole === "provider");
  const providerFunds = getProviderFundSnapshot();
  const resources = getFaithHubResources().filter((resource) => resource.uploader_role === "provider");

  const totalComments = providerPosts.reduce((sum, post) => sum + post.comments.length, 0);
  const totalReactions = providerPosts.reduce(
    (sum, post) => sum + post.reactions.like + post.reactions.pray + post.reactions.support,
    0,
  );
  const totalViews = 12000 + providerPosts.length * 420 + resources.length * 160;
  const engagementRate = totalViews > 0 ? round(((totalComments + totalReactions) / totalViews) * 100, 2) : 0;
  const givingReceived = providerFunds.reduce((sum, entry) => sum + entry.fund.current_amount, 0);
  const liveAttendance = 360 + providerPosts.length * 18;
  const topResource = resources
    .slice()
    .sort((a, b) => b.download_count - a.download_count)[0];

  return {
    totalViews,
    engagementRate,
    givingReceived,
    liveAttendance,
    topPerformingContent: topResource?.title || "Live Studio Equipment Campaign",
  };
}

