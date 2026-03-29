// @ts-nocheck
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  AudioLines,
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChevronRight,
  Flag,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
  WifiOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reviewTypes = ["All", "Session", "Series", "Institution"];

const reviews = [
  {
    id: 1,
    title: "Evening Prayer Revival",
    type: "Session",
    reviewer: "Naomi",
    verified: true,
    rating: 5,
    audioQuality: 5,
    clarity: 5,
    safety: 5,
    text: "Very clear teaching, smooth audio, and strong moderation throughout the live session.",
    helpful: 18,
    flagged: false,
  },
  {
    id: 2,
    title: "Walking in Wisdom",
    type: "Series",
    reviewer: "David",
    verified: true,
    rating: 4,
    audioQuality: 4,
    clarity: 5,
    safety: 4,
    text: "Excellent structure episode by episode. Would love more downloadable guides for the later parts of the series.",
    helpful: 11,
    flagged: false,
  },
  {
    id: 3,
    title: "St. Marys Cathedral",
    type: "Institution",
    reviewer: "Anonymous",
    verified: false,
    rating: 4,
    audioQuality: 4,
    clarity: 4,
    safety: 5,
    text: "Great service times and well-organized event guidance. Venue accessibility notes are especially helpful.",
    helpful: 9,
    flagged: false,
  },
  {
    id: 4,
    title: "Youth Impact Night",
    type: "Session",
    reviewer: "Miriam",
    verified: true,
    rating: 3,
    audioQuality: 3,
    clarity: 4,
    safety: 4,
    text: "Helpful session overall, though the first few minutes had some connection instability.",
    helpful: 6,
    flagged: true,
  },
];

function StarRow({ value, onChange, readOnly = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={`rounded-full p-1 ${readOnly ? "cursor-default" : "hover:bg-[#03cd8c]/10"}`}
        >
          <Star className={`h-4 w-4 ${star <= value ? "fill-[#f77f00] text-[#f77f00]" : "text-slate-300"}`} />
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ title, subtitle, action = "See all" }) {
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

export default function FaithHubReviews() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [offlineMode, setOfflineMode] = useState(true);
  const [rating, setRating] = useState(5);
  const [audioQuality, setAudioQuality] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [safety, setSafety] = useState(5);
  const [draft, setDraft] = useState(
    "Very well organized session with clear moderation and a strong sense of safety."
  );
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesType = typeFilter === "All" || review.type === typeFilter;
      const matchesQuery =
        review.title.toLowerCase().includes(query.toLowerCase()) ||
        review.text.toLowerCase().includes(query.toLowerCase()) ||
        review.reviewer.toLowerCase().includes(query.toLowerCase());
      const matchesVerified = !verifiedOnly || review.verified;
      return matchesType && matchesQuery && matchesVerified;
    });
  }, [typeFilter, query, verifiedOnly]);

  return (
    <div className="fh-page-canvas min-h-0 text-slate-900">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fh-page-header mb-4 flex items-center justify-between rounded-[28px] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <div>
              <div className="hidden text-[#03cd8c]">EVzone Super App</div>
              <div className="text-lg font-semibold">Reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {offlineMode && (
              <div className="hidden items-center gap-2 rounded-full border border-[#f77f00]/20 bg-[#fff8ef] px-3 py-2 text-sm text-[#8b5a00] md:flex">
                <WifiOff className="h-4 w-4" />
                Draft saved offline
              </div>
            )}
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card relative overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br from-[#03cd8c] via-[#20cf9c] to-[#eafcf6] shadow-[0_24px_80px_-28px_rgba(3,205,140,0.45)]">
              <CardContent className="fh-pad-hero">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,127,0,0.12),transparent_22%)]" />
                <div className="relative z-10 text-white">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-white/90 text-[#03cd8c] hover:bg-white">Trust-centered feedback</Badge>
                    <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Structured reviews + moderation</Badge>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.66fr_0.34fr]">
                    <div className="space-y-4">
                      <div className="fh-kicker text-white/90">Feedback with integrity</div>
                      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                        Review sessions, series, and institutions with structured trust signals, safety reporting, and member credibility cues.
                      </h1>
                      <p className="max-w-2xl fh-body text-white/90 sm:text-base">
                        This page helps users leave useful feedback while protecting the ecosystem from abuse. It supports structured rating dimensions, verified badges, moderation reporting, and offline draft handling.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <AudioLines className="h-4 w-4" />
                          Audio quality scoring
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <ShieldCheck className="h-4 w-4" />
                          Safety and moderation signals
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1">
                          <BadgeCheck className="h-4 w-4" />
                          Verified-member review badge
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-4 backdrop-blur">
                      <div className="mb-3 text-sm font-semibold text-white">Filtering tools</div>
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                          <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search reviews"
                            className="h-12 w-full rounded-2xl border border-white/20 bg-white/12 pl-11 pr-4 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {reviewTypes.map((item) => (
                            <button
                              key={item}
                              onClick={() => setTypeFilter(item)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                typeFilter === item
                                  ? "border-white/40 bg-white/22 text-white"
                                  : "border-white/15 bg-white/10 text-white/90 hover:bg-white/15"
                              }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white/15"
                          onClick={() => setVerifiedOnly((prev) => !prev)}
                        >
                          {verifiedOnly ? "Verified only" : "Show all reviewers"}
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
                  title="Write a review"
                  subtitle="Rate with more context than a single star count."
                />
                <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr]">
                  <div className="space-y-4 fh-subcard rounded-[24px] p-4">
                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">Overall rating</div>
                      <StarRow value={rating} onChange={setRating} />
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">Audio quality</div>
                      <StarRow value={audioQuality} onChange={setAudioQuality} />
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">Teaching clarity</div>
                      <StarRow value={clarity} onChange={setClarity} />
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-semibold text-slate-900">Safety and moderation</div>
                      <StarRow value={safety} onChange={setSafety} />
                    </div>
                  </div>

                  <div className="fh-subcard rounded-[24px] p-4">
                    <div className="mb-3 text-sm font-semibold text-slate-900">Review text</div>
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      rows={8}
                      className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#03cd8c] focus:ring-4 focus:ring-[#03cd8c]/10"
                    />
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Button className="rounded-2xl bg-[#03cd8c] hover:bg-[#02b67c]">Submit review</Button>
                      <Button
                        variant="outline"
                        className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                        onClick={() => setOfflineMode((prev) => !prev)}
                      >
                        {offlineMode ? "Draft offline" : "Save draft"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Community reviews"
                  subtitle="Helpful public feedback with reporting and trust indicators."
                />
                <div className="space-y-3">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="fh-subcard rounded-[24px] p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-base font-semibold text-slate-900">{review.title}</div>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{review.type}</span>
                            {review.verified && (
                              <span className="rounded-full bg-[#ecfff8] px-2.5 py-1 text-xs font-semibold text-[#03cd8c]">Verified member</span>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">by {review.reviewer}</div>
                        </div>
                        <StarRow value={review.rating} readOnly />
                      </div>

                      <div className="mb-3 grid gap-2 sm:grid-cols-3 text-xs text-slate-600">
                        <div className="rounded-full bg-[#f8fafc] px-3 py-2 ring-1 ring-slate-200">Audio {review.audioQuality}/5</div>
                        <div className="rounded-full bg-[#f8fafc] px-3 py-2 ring-1 ring-slate-200">Clarity {review.clarity}/5</div>
                        <div className="rounded-full bg-[#f8fafc] px-3 py-2 ring-1 ring-slate-200">Safety {review.safety}/5</div>
                      </div>

                      <div className="fh-body-tight text-slate-600">{review.text}</div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]">
                            <ThumbsUp className="mr-2 h-4 w-4 text-[#03cd8c]" /> Helpful ({review.helpful})
                          </Button>
                          <Button variant="outline" className="rounded-2xl border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50">
                            <Flag className="mr-2 h-4 w-4 text-rose-500" /> Report
                          </Button>
                        </div>
                        {review.flagged && (
                          <span className="rounded-full bg-[#fff8ef] px-3 py-2 text-xs font-semibold text-[#f77f00]">Under moderation review</span>
                        )}
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
            transition={{ delay: 0.12, duration: 0.4 }}
            className="space-y-4"
          >
            <Card className="fh-interactive-card fh-surface-dark rounded-[32px] text-white">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Trust and moderation"
                  subtitle="Keep review quality high without damaging authentic feedback."
                  action="Policy"
                />
                <div className="space-y-3 text-sm text-white/80">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                      <ShieldCheck className="h-4 w-4 text-[#8ef0ca]" /> Anti-brigading posture
                    </div>
                    <div>Velocity checks, reviewer eligibility signals, and rate controls help reduce coordinated review attacks while preserving real community feedback.</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                      <BadgeCheck className="h-4 w-4 text-[#8ef0ca]" /> Verified-member credibility
                    </div>
                    <div>Reviews from verified members can show a badge, helping readers weigh context without hiding non-member reviews.</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-white">
                      <AlertTriangle className="h-4 w-4 text-[#f77f00]" /> Abuse reporting
                    </div>
                    <div>Users can quickly report abuse, harassment, or misleading content directly from each review card.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-warm rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900 sm:text-xl">Structured review dimensions</div>
                    <div className="text-sm text-slate-500">More useful than a single score.</div>
                  </div>
                  <Badge className="rounded-full bg-[#f77f00]/10 text-[#f77f00] hover:bg-[#f77f00]/10">Trust-first design</Badge>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-warm rounded-[24px] p-4">Audio quality gives feedback on streaming clarity and listening comfort.</div>
                  <div className="fh-subcard-warm rounded-[24px] p-4">Clarity tracks whether the teaching or presentation was understandable and well-structured.</div>
                  <div className="fh-subcard-warm rounded-[24px] p-4">Safety evaluates moderation, respectful engagement, and the confidence users felt in the space.</div>
                </div>
              </CardContent>
            </Card>

            <Card className="fh-interactive-card fh-surface-card rounded-[32px]">
              <CardContent className="fh-pad-panel">
                <SectionHeader
                  title="Offline review draft"
                  subtitle="Protect user effort if the connection drops while writing."
                  action="Drafts"
                />
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    Reviews written offline should save as drafts locally, then prompt the user to submit once the network returns.
                  </div>
                  <div className="fh-subcard-muted rounded-[24px] p-4">
                    This prevents lost feedback while keeping moderation and publication checks server-side.
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-slate-200 bg-white hover:border-[#03cd8c]/35 hover:bg-[#f7fffb]"
                    onClick={() => setOfflineMode((prev) => !prev)}
                  >
                    {offlineMode ? "Draft stored offline" : "Store draft offline"}
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





