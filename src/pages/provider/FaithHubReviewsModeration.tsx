// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChevronRight,
  EyeOff,
  FileWarning,
  Flag,
  Gavel,
  MessageSquareText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reviews = [
  {
    id: 1,
    title: "Evening Prayer Revival",
    source: "Session",
    author: "Naomi",
    rating: 5,
    text: "Very clear stream and excellent moderation throughout the live experience.",
    signal: "Healthy",
    actionState: "Needs response",
    verified: true,
  },
  {
    id: 2,
    title: "Walking in Wisdom",
    source: "Series",
    author: "David",
    rating: 4,
    text: "The series is strong overall, but more downloadable resources would help later episodes.",
    signal: "Healthy",
    actionState: "Open",
    verified: true,
  },
  {
    id: 3,
    title: "Youth Impact Night",
    source: "Session",
    author: "Miriam",
    rating: 2,
    text: "Chat became noisy early on and stream stability was uneven for the first few minutes.",
    signal: "Watch",
    actionState: "Flagged",
    verified: true,
  },
  {
    id: 4,
    title: "St. Marys Cathedral",
    source: "Institution",
    author: "Anonymous",
    rating: 3,
    text: "Good venue guidance, but event reminders arrived too late for me this time.",
    signal: "Brigade risk",
    actionState: "Under review",
    verified: false,
  },
];

const appeals = [
  {
    item: "Removed review on Youth Impact Night",
    state: "Awaiting provider response",
    note: "Reviewer disputes the removal and requests human re-check.",
  },
  {
    item: "Hidden institution rating burst",
    state: "Escalated",
    note: "Potential coordinated activity under trust review.",
  },
];

const signals = [
  {
    title: "Velocity anomaly",
    detail: "Multiple negative reviews arrived within 4 minutes from closely related device/network patterns.",
  },
  {
    title: "Language toxicity signal",
    detail: "Reply draft shows elevated hostility risk and should be softened before sending.",
  },
  {
    title: "Brigade confidence",
    detail: "Institution-level ratings show unusual clustering inconsistent with historical review behavior.",
  },
];

export default function FaithHubReviewsModeration() {
  const [offlineViewOnly, setOfflineViewOnly] = useState(true);
  const [toxicityAssist, setToxicityAssist] = useState(true);
  const [antiBrigadeSignals, setAntiBrigadeSignals] = useState(true);
  const [enterpriseModeration, setEnterpriseModeration] = useState(true);
  const [selectedTab, setSelectedTab] = useState("open");
  const [responseDraft, setResponseDraft] = useState(
    "Thank you for this feedback. We are reviewing the moderation flow and stream setup for this session so we can improve the next live experience."
  );

  const visibleReviews = useMemo(() => {
    if (selectedTab === "flagged") return reviews.filter((review) => ["Flagged", "Under review"].includes(review.actionState));
    if (selectedTab === "respond") return reviews.filter((review) => review.actionState === "Needs response");
    return reviews;
  }, [selectedTab]);

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
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Reviews & Moderation</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
              {offlineViewOnly ? <WifiOff className="h-4 w-4 text-[#f77f00]" /> : <Wifi className="h-4 w-4 text-[#03cd8c]" />}
              {offlineViewOnly ? "Review console in read-only mode" : "Live moderation controls active"}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
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
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Review response and trust operations</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Brigade defense, toxicity assist, appeals</Badge>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[0.64fr_0.36fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Trust and safety for large communities</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Respond to real feedback while protecting the institution from abuse, brigading, and harmful escalation.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This moderation console supports provider replies, review hiding, abuse reporting, and appeals, while adding world-class signals for coordinated attacks and language toxicity. Premium tooling strengthens control for large institutions.
                      </p>
                    </div>
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Moderation posture</div>
                      <div className="rounded-[24px] border border-white/15 bg-white/10 p-4">
                        <div className="fh-kicker-muted text-white/70">Open queue</div>
                        <div className="mt-1 text-3xl font-semibold text-white">{visibleReviews.length}</div>
                        <div className="mt-2 text-sm text-white/80">Filtered by {selectedTab} workflow.</div>
                      </div>
                      <div className="mt-4 fh-actions-grid">
                        <Button className="rounded-2xl bg-white text-[#03cd8c] hover:bg-white/90">Open trust queue</Button>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setOfflineViewOnly((prev) => !prev)}
                        >
                          {offlineViewOnly ? "Read only" : "Enable live actions"}
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
                  title="Review response queue"
                  subtitle="Respond, hide, escalate, and document review decisions."
                />
                <div className="mb-4 flex flex-wrap gap-2">
                  {[
                    { key: "open", label: "All open" },
                    { key: "respond", label: "Needs response" },
                    { key: "flagged", label: "Flagged / review" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedTab(tab.key)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedTab === tab.key ? "border-slate-200 bg-white text-slate-900 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {visibleReviews.map((review) => (
                    <div key={review.id} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-base font-semibold text-slate-900">{review.title}</div>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{review.source}</span>
                            {review.verified && (
                              <span className="rounded-full bg-[#ecfff8] px-2.5 py-1 text-xs font-semibold text-[#03cd8c]">Verified member</span>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">by {review.author}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "fill-[#f77f00] text-[#f77f00]" : "text-slate-300"}`} />
                          ))}
                        </div>
                      </div>
                      <div className="mb-3 fh-body-tight text-slate-600">{review.text}</div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${review.signal === "Healthy" ? "bg-[#ecfff8] text-[#03cd8c]" : review.signal === "Watch" ? "bg-[#fff8ef] text-[#f77f00]" : "bg-rose-50 text-rose-600"}`}>
                          {review.signal}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {review.actionState}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineViewOnly}>Respond</Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" disabled={offlineViewOnly}>
                          <EyeOff className="mr-2 h-4 w-4 text-[#03cd8c]" /> Hide
                        </Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50" disabled={offlineViewOnly}>
                          <Flag className="mr-2 h-4 w-4 text-rose-500" /> Report
                        </Button>
                      </div>
                    </div>
                  ))}
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
                  title="Trust signals and assistive moderation"
                  subtitle="Spot harmful patterns early and make safer moderation decisions."
                  action="Signals"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setAntiBrigadeSignals((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${antiBrigadeSignals ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <ShieldAlert className="h-4 w-4 text-[#8ef0ca]" /> Anti-brigade signals
                    </div>
                    <div className="text-sm text-white/75">{antiBrigadeSignals ? "Velocity and clustering signals are active." : "Signal layer disabled in preview."}</div>
                  </button>
                  <button
                    onClick={() => setToxicityAssist((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${toxicityAssist ? "border-[#03cd8c]/30 bg-[#03cd8c]/15 text-white" : "border-white/10 bg-white/5 text-white/80"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles className="h-4 w-4 text-[#8ef0ca]" /> Toxicity assist
                    </div>
                    <div className="text-sm text-white/75">{toxicityAssist ? "Reply guidance and tone warnings are active." : "No reply assistance."}</div>
                  </button>
                  <div className="space-y-3">
                    {signals.map((signal) => (
                      <div key={signal.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                        <div className="mb-1 text-sm font-semibold text-white">{signal.title}</div>
                        <div className="text-sm text-white/75">{signal.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Appeals workflow"
                  subtitle="Support reversals, reconsiderations, and documented moderation outcomes."
                  action="Appeals"
                />
                <div className="space-y-3">
                  {appeals.map((appeal) => (
                    <div key={appeal.item} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-1 text-sm font-semibold text-slate-900">{appeal.item}</div>
                      <div className="text-xs text-slate-500">{appeal.state}</div>
                      <div className="mt-2 text-sm text-slate-600">{appeal.note}</div>
                      <div className="mt-3 flex gap-2">
                        <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineViewOnly}>Open case</Button>
                        <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]" disabled={offlineViewOnly}>
                          <Gavel className="mr-2 h-4 w-4 text-[#03cd8c]" /> Review decision
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Enterprise moderation suite"
                  subtitle="Premium moderation depth for large institutions and high-volume communities."
                  action="Enterprise"
                />
                <div className="space-y-3">
                  <button
                    onClick={() => setEnterpriseModeration((prev) => !prev)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${enterpriseModeration ? "border-[#03cd8c]/15 bg-[#ecfff8]" : "border-slate-200 bg-white"}`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Users className="h-4 w-4 text-[#03cd8c]" /> Dedicated moderation tooling
                    </div>
                    <div className="text-sm text-slate-600">{enterpriseModeration ? "Advanced moderation queues, team roles, and trust workflows are enabled." : "Standard moderation view only."}</div>
                  </button>
                  <div className="fh-subcard-warm rounded-[24px] p-4 text-sm text-slate-600">
                    Large institutions can benefit from expanded queue segmentation, escalations, policy packs, and team-based moderation roles.
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineViewOnly}>
                    <FileWarning className="mr-2 h-4 w-4" /> Open enterprise moderation tools
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Response drafting"
                  subtitle="Provider-safe response crafting with optional tone assist."
                  action="Compose"
                />
                <div className="space-y-3">
                  <textarea
                    value={responseDraft}
                    onChange={(e) => setResponseDraft(e.target.value)}
                    rows={6}
                    className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#03cd8c]"
                  />
                  <div className="fh-subcard-accent rounded-[24px] p-4 text-sm text-slate-700">
                    {toxicityAssist
                      ? "Tone assist suggests this draft is calm, acknowledges feedback, and avoids escalation."
                      : "Tone assist is currently disabled."}
                  </div>
                  <Button className="w-full rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]" disabled={offlineViewOnly}>
                    <MessageSquareText className="mr-2 h-4 w-4" /> Send provider response
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




