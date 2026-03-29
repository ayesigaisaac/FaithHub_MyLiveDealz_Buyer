import React, { useMemo } from "react";
import { BadgeCheck, CalendarDays, Globe2, Lock, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { counselorAvailability, counselors, getAvailabilityForCounselor, getCounselorById } from "@/data/counseling";
import { routes } from "@/constants/routes";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function FaithHubCounselorProfile() {
  const navigate = useNavigate();
  const { counselorId = "" } = useParams<{ counselorId: string }>();

  const counselor = getCounselorById(counselorId) || counselors[0];
  const availableSlots = useMemo(
    () => getAvailabilityForCounselor(counselor.id).filter((slot) => slot.status === "available"),
    [counselor.id],
  );

  const totalOpenSlots = counselorAvailability.filter(
    (slot) => slot.counselorId === counselor.id && slot.status === "available",
  ).length;

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label fh-user-kicker">Counselor Profile</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">{counselor.name}</h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{counselor.title}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {counselor.verified ? (
                  <Badge className="fh-pill fh-pill-emerald inline-flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified counselor
                  </Badge>
                ) : null}
                <Badge className="fh-pill fh-pill-slate">Category: {counselor.category}</Badge>
                <Badge className="fh-pill fh-pill-slate">{totalOpenSlots} open slots</Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="fh-user-secondary-btn" onClick={() => navigate(routes.app.user.counseling)}>
                Back to discovery
              </Button>
              <Button
                className="fh-user-primary-btn"
                onClick={() => navigate(`${routes.app.user.counselingBook}?counselorId=${encodeURIComponent(counselor.id)}`)}
              >
                Book session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">About counselor</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{counselor.bio}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="fh-label text-[var(--text-muted)]">Experience</div>
                <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{counselor.yearsExperience} years</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="fh-label text-[var(--text-muted)]">Rating</div>
                <div className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-primary)]">
                  <Star className="h-4 w-4 text-[var(--warning)]" />
                  {counselor.rating.toFixed(1)} ({counselor.reviewsCount} reviews)
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 sm:col-span-2">
                <div className="fh-label text-[var(--text-muted)]">Specializations</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {counselor.specializations.map((item) => (
                    <span key={item} className="fh-pill fh-pill-slate">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 sm:col-span-2">
                <div className="fh-label text-[var(--text-muted)]">Languages</div>
                <div className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-primary)]">
                  <Globe2 className="h-4 w-4 text-[var(--accent)]" />
                  {counselor.languages.join(", ")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="text-base font-semibold text-[var(--text-primary)]">Availability</div>
              <span className="fh-pill fh-pill-emerald">{availableSlots.length} slots</span>
            </div>
            <div className="mt-3 space-y-2">
              {availableSlots.slice(0, 6).map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() =>
                    navigate(
                      `${routes.app.user.counselingBook}?counselorId=${encodeURIComponent(
                        counselor.id,
                      )}&slotId=${encodeURIComponent(slot.id)}`,
                    )
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left transition hover:border-[rgba(3,205,140,0.35)] hover:bg-[var(--accent-soft)]"
                >
                  <div className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {slot.sessionType.toUpperCase()}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{formatDateTime(slot.startsAt)}</div>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-xs text-[var(--text-secondary)]">
              <div className="inline-flex items-center gap-1 font-semibold text-[var(--text-primary)]">
                <Lock className="h-3.5 w-3.5 text-[var(--accent)]" />
                Privacy indicator
              </div>
              <div className="mt-1">{counselor.privacyIndicator}. Session notes are protected and role-restricted.</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

