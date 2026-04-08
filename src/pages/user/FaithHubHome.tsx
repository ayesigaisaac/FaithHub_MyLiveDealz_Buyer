import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { routes } from "@/constants/routes";
import { getHomePersonalizationSnapshot } from "@/data/homePersonalization";
import LoadingState from "@/components/system/LoadingState";
import MediaCard from "@/pages/user/home/components/MediaCard";
import MediaRail from "@/pages/user/home/components/MediaRail";
import HomeHeroPremium from "@/pages/user/home/components/HomeHeroPremium";

export default function FaithHubHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const personalization = useMemo(() => getHomePersonalizationSnapshot(), []);
  const featured = personalization.liveNow[0] || personalization.recommendedContent[0];

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingState
        title="Loading your dashboard"
        message="Preparing personalized recommendations..."
      />
    );
  }

  return (
    <div className="space-y-6">
      <HomeHeroPremium
        name={user?.name || "Faith member"}
        featuredTitle={featured?.title || "Featured session"}
        featuredDetail={featured?.detail || "Join the latest FaithHub experience"}
        onPrimaryAction={() => navigate(featured?.path || routes.app.user.liveHub)}
      />

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
                { label: "Save", onClick: () => {}, variant: "outline" },
                { label: "Share", onClick: () => {}, variant: "outline" },
              ]}
            />
          ))}
        </MediaRail>
      </Suspense>

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
              { label: "Share", onClick: () => {}, variant: "outline" },
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
              { label: "Save", onClick: () => {}, variant: "outline" },
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
              { label: "Share", onClick: () => {}, variant: "outline" },
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
              { label: "Play", onClick: () => navigate(item.path) },
              { label: "Save", onClick: () => {}, variant: "outline" },
            ]}
          />
        ))}
      </MediaRail>
    </div>
  );
}
