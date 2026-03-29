import React, { useMemo, useState } from "react";
import { BadgeCheck, Search, ShieldCheck, Star, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  counselorAvailability,
  counselors,
  getCounselingCategories,
  getUpcomingCounselingBookings,
} from "@/data/counseling";
import { routes } from "@/constants/routes";
import type { CounselingCategory } from "@/types/counseling";

const ALL_CATEGORIES = "All categories";

export default function FaithHubCounselingHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [availabilityOnly, setAvailabilityOnly] = useState(true);

  const categories = useMemo(() => [ALL_CATEGORIES, ...getCounselingCategories()], []);
  const upcomingCount = getUpcomingCounselingBookings().length;

  const filteredCounselors = useMemo(() => {
    const term = search.trim().toLowerCase();
    return counselors.filter((counselor) => {
      const categoryMatch = category === ALL_CATEGORIES || counselor.category === (category as CounselingCategory);
      const hasAvailability = counselorAvailability.some(
        (slot) => slot.counselorId === counselor.id && slot.status === "available",
      );
      const availabilityMatch = !availabilityOnly || hasAvailability;
      const searchMatch =
        !term ||
        counselor.name.toLowerCase().includes(term) ||
        counselor.title.toLowerCase().includes(term) ||
        counselor.specializations.join(" ").toLowerCase().includes(term);
      return categoryMatch && availabilityMatch && searchMatch;
    });
  }, [availabilityOnly, category, search]);

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="fh-label fh-user-kicker">Counseling</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Counseling Care Hub</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Discover verified counselors, book secure online sessions, and continue your healing journey with
                private, faith-safe support.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">{filteredCounselors.length} counselors</Badge>
                <Badge className="fh-pill fh-pill-slate">{upcomingCount} upcoming sessions</Badge>
                <Badge className="fh-pill fh-pill-slate">End-to-end privacy indicators</Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" className="fh-user-secondary-btn" onClick={() => navigate(routes.app.user.counselingHistory)}>
                Session history
              </Button>
              <Button className="fh-user-primary-btn" onClick={() => navigate(routes.app.user.counselingBook)}>
                Book counseling
              </Button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <label className="fh-user-input">
              <Search className="h-4 w-4 text-[var(--text-secondary)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search counselor, specialization, or category"
                className="w-full"
              />
            </label>

            <label className="fh-user-filter min-w-[200px]">
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full">
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setAvailabilityOnly((prev) => !prev)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                availabilityOnly
                  ? "border-[rgba(3,205,140,0.32)] bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)]"
              }`}
            >
              {availabilityOnly ? "Showing available only" : "Show all counselors"}
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        {filteredCounselors.map((counselor) => {
          const hasAvailability = counselorAvailability.some(
            (slot) => slot.counselorId === counselor.id && slot.status === "available",
          );

          return (
            <Card key={counselor.id} className="fh-surface-card rounded-2xl">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold text-[var(--text-primary)]">{counselor.name}</div>
                      {counselor.verified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent-strong)]">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      ) : null}
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">{counselor.title}</div>
                  </div>

                  <div className="text-right text-xs text-[var(--text-secondary)]">
                    <div className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-semibold text-[var(--accent-strong)]">
                      <Star className="h-3.5 w-3.5" />
                      {counselor.rating.toFixed(1)}
                    </div>
                    <div className="mt-1">{counselor.reviewsCount} reviews</div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-[var(--text-secondary)]">{counselor.bio}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {counselor.specializations.slice(0, 3).map((tag) => (
                    <span key={tag} className="fh-pill fh-pill-slate">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                    <div className="fh-label text-[var(--text-muted)]">Privacy</div>
                    <div className="mt-1 flex items-center gap-1 text-[var(--text-primary)]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                      {counselor.privacyIndicator}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                    <div className="fh-label text-[var(--text-muted)]">Availability</div>
                    <div className="mt-1 flex items-center gap-1 text-[var(--text-primary)]">
                      <Stethoscope className="h-3.5 w-3.5 text-[var(--accent)]" />
                      {hasAvailability ? "Slots open this week" : "Waitlist only"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="fh-user-secondary-btn"
                    onClick={() => navigate(routes.app.user.counselingProfileById(counselor.id))}
                  >
                    View profile
                  </Button>
                  <Button
                    className="fh-user-primary-btn"
                    onClick={() => navigate(`${routes.app.user.counselingBook}?counselorId=${encodeURIComponent(counselor.id)}`)}
                  >
                    Book session
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

