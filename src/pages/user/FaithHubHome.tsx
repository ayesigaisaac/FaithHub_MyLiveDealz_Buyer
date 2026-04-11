import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { routes } from "@/constants/routes";
import { getHomePersonalizationSnapshot } from "@/data/homePersonalization";
import type { PersonalizedItem } from "@/data/homePersonalization";
import { trackEvent } from "@/data/tracker";
import LoadingState from "@/components/system/LoadingState";
import MediaCard from "@/pages/user/home/components/MediaCard";
import MediaRail from "@/pages/user/home/components/MediaRail";
import HomeHeroPremium from "@/pages/user/home/components/HomeHeroPremium";
import ContinueWatchingBanner from "@/pages/user/home/components/ContinueWatchingBanner";

export default function FaithHubHome() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savedContent, setSavedContent] = useState<PersonalizedItem[]>([]);

  const personalization = useMemo(() => getHomePersonalizationSnapshot(), []);
  const featured = personalization.liveNow[0] || personalization.recommendedContent[0];
  const continueWatching = personalization.continueWatching[0];
  const continueProgress = continueWatching ? 56 : 0;

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("faithhub_saved_content");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Array<{ id?: string; title?: string; path?: string; savedAt?: string }>;
      const cleaned = parsed
        .filter((item) => item && item.id && item.title && item.path)
        .slice(0, 6)
        .map((item) => ({
          id: item.id as string,
          title: item.title as string,
          detail: item.savedAt ? `Saved ${new Date(item.savedAt).toLocaleDateString()}` : "Saved for later",
          path: item.path as string,
        }));
      setSavedContent(cleaned);
    } catch {
      setSavedContent([]);
    }
  }, []);

  const handleSaveItem = (item: { id: string; title: string; path: string }) => {
    try {
      const key = "faithhub_saved_content";
      const existing = JSON.parse(localStorage.getItem(key) || "[]") as Array<{ id: string } & Record<string, string>>;
      if (!existing.some((entry) => entry.id === item.id)) {
        localStorage.setItem(key, JSON.stringify([{ ...item, savedAt: new Date().toISOString() }, ...existing]));
      }
      trackEvent(
        "CLICK_BUTTON",
        { id: "save-content", label: item.title, location: routes.app.user.home },
        { role },
      );
    } catch {
      // no-op
    }
  };

  const handleShareItem = async (item: { title: string; path: string }) => {
    const shareUrl = `${window.location.origin}${item.path}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title, url: shareUrl, text: item.title });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      trackEvent(
        "CLICK_BUTTON",
        { id: "share-content", label: item.title, location: routes.app.user.home },
        { role },
      );
    } catch {
      // ignore share errors
    }
  };

  const handleDonate = (item: { title: string; path: string }) => {
    trackEvent(
      "CLICK_BUTTON",
      { id: "donate-action", label: item.title, location: routes.app.user.home },
      { role },
    );
    navigate(item.path || routes.app.user.giving);
  };

  if (loading) {
    return (
      <LoadingState
        title="Loading your dashboard"
        message="Preparing personalized recommendations..."
      />
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <HomeHeroPremium
        name={user?.name || "Faith member"}
        featuredTitle={featured?.title || "Featured session"}
        featuredDetail={featured?.detail || "Join the latest FaithHub experience"}
        onPrimaryAction={() => navigate(featured?.path || routes.app.user.liveHub)}
      />

      {continueWatching ? (
        <ContinueWatchingBanner
          title={continueWatching.title}
          detail={continueWatching.detail}
          progress={continueProgress}
          onContinue={() => navigate(continueWatching.path)}
          onSave={() => handleSaveItem(continueWatching)}
          onShare={() => handleShareItem(continueWatching)}
        />
      ) : null}

      <Suspense fallback={<div className="h-40 animate-pulse rounded-[24px] bg-[var(--surface)]" />}>
        <MediaRail
          title="Continue watching"
          subtitle="Pick up right where you left off."
          actionLabel="Open queue"
          onAction={() => navigate(routes.app.user.replay)}
        >
          {personalization.continueWatching.map((item, index) => (
            <MediaCard
              key={item.id}
              title={item.title}
              subtitle={item.detail}
              meta="Replay • 18 min"
              badge="Continue"
              progress={40 + index * 20}
              actions={[
                { label: "Play", onClick: () => navigate(item.path) },
                { label: "Save", onClick: () => handleSaveItem(item), variant: "outline" },
                { label: "Share", onClick: () => handleShareItem(item), variant: "outline" },
              ]}
            />
          ))}
        </MediaRail>
      </Suspense>

      {savedContent.length ? (
        <MediaRail
          title="Saved for later"
          subtitle="Quick access to items you bookmarked."
          actionLabel="View saved"
          onAction={() => navigate(routes.app.user.series)}
        >
          {savedContent.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title}
              subtitle={item.detail}
              meta="Saved"
              badge="Saved"
              actions={[
                { label: "Play", onClick: () => navigate(item.path) },
                { label: "Share", onClick: () => handleShareItem(item), variant: "outline" },
              ]}
            />
          ))}
        </MediaRail>
      ) : null}

      <MediaRail
        title="Live now"
        subtitle="Jump into sessions happening right now."
        actionLabel="See all live"
        onAction={() => navigate(routes.app.user.liveHub)}
      >
        {personalization.liveNow.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={item.detail}
            meta="Live • FaithHub"
            badge="Live"
            actions={[
              { label: "Play", onClick: () => navigate(item.path) },
              { label: "Share", onClick: () => handleShareItem(item), variant: "outline" },
            ]}
          />
        ))}
      </MediaRail>

      <MediaRail
        title="Recommended for you"
        subtitle="Curated sermons and devotionals based on your activity."
        actionLabel="Browse series"
        onAction={() => navigate(routes.app.user.series)}
      >
        {personalization.recommendedContent.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={item.detail}
            meta="Series • 24 min"
            badge="Recommended"
            actions={[
              { label: "Play", onClick: () => navigate(item.path) },
              { label: "Save", onClick: () => handleSaveItem(item), variant: "outline" },
            ]}
          />
        ))}
      </MediaRail>

      <MediaRail
        title="Community highlights"
        subtitle="Updates from your faith circles and leaders."
        actionLabel="Open community"
        onAction={() => navigate(routes.app.user.community)}
      >
        {personalization.communityActivity.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={item.detail}
            meta="Community • Today"
            badge="Highlights"
            actions={[
              { label: "Play", onClick: () => navigate(routes.app.user.community) },
              { label: "Share", onClick: () => handleShareItem(item), variant: "outline" },
            ]}
          />
        ))}
      </MediaRail>

      <MediaRail
        title="Giving and support"
        subtitle="Support causes and missions that matter to you."
        actionLabel="Open giving"
        onAction={() => navigate(routes.app.user.giving)}
      >
        {personalization.suggestedGiving.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={item.detail}
            meta="Charity • FaithHub"
            badge="Support"
            actions={[
              { label: "Donate", onClick: () => handleDonate(item) },
              { label: "Save", onClick: () => handleSaveItem(item), variant: "outline" },
            ]}
          />
        ))}
      </MediaRail>
    </div>
  );
}
