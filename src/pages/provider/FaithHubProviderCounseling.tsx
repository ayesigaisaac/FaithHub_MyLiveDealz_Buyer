import React, { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, ExternalLink, PlusCircle, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildSessionRoomUrl,
  counselors,
  getAvailabilityForCounselor,
  getCounselingBookings,
  updateBookingStatus,
} from "@/data/counseling";
import type { Availability, SessionType } from "@/types/counseling";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toLocalInputDateTime(value: Date) {
  const tzOffset = value.getTimezoneOffset() * 60000;
  return new Date(value.getTime() - tzOffset).toISOString().slice(0, 16);
}

export default function FaithHubProviderCounseling() {
  const [activeCounselorId, setActiveCounselorId] = useState(counselors[0]?.id || "");
  const [customAvailability, setCustomAvailability] = useState<Availability[]>([]);
  const [newSlotDateTime, setNewSlotDateTime] = useState(toLocalInputDateTime(new Date(Date.now() + 86_400_000)));
  const [newSlotType, setNewSlotType] = useState<SessionType>("video");
  const [bookings, setBookings] = useState(() => getCounselingBookings());

  const refreshBookings = () => setBookings(getCounselingBookings());
  const activeCounselor = counselors.find((entry) => entry.id === activeCounselorId) || counselors[0];

  const baseAvailability = useMemo(
    () => getAvailabilityForCounselor(activeCounselor.id),
    [activeCounselor.id],
  );

  const scopedCustomAvailability = customAvailability.filter(
    (slot) => slot.counselorId === activeCounselor.id,
  );

  const allAvailability = useMemo(
    () =>
      [...baseAvailability, ...scopedCustomAvailability].sort((a, b) =>
        a.startsAt.localeCompare(b.startsAt),
      ),
    [baseAvailability, scopedCustomAvailability],
  );

  const counselorBookings = useMemo(
    () =>
      bookings
        .filter((booking) => booking.counselorId === activeCounselor.id)
        .sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    [activeCounselor.id, bookings],
  );

  const upcomingCount = counselorBookings.filter((booking) => booking.status === "upcoming").length;
  const completedCount = counselorBookings.filter((booking) => booking.status === "completed").length;

  const addAvailabilitySlot = () => {
    if (!newSlotDateTime) return;
    const startsAt = new Date(newSlotDateTime);
    if (Number.isNaN(startsAt.valueOf())) return;
    const endsAt = new Date(startsAt.getTime() + 45 * 60 * 1000);
    const id = `provider-slot-${Date.now()}`;
    setCustomAvailability((prev) => [
      ...prev,
      {
        id,
        counselorId: activeCounselor.id,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        status: "available",
        sessionType: newSlotType,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Provider Counseling Workspace</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Counseling Operations
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Manage counselor availability, review booking pipelines, and join active sessions from one control
                panel.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="fh-pill fh-pill-slate">{upcomingCount} upcoming bookings</span>
                <span className="fh-pill fh-pill-emerald">{completedCount} completed sessions</span>
              </div>
            </div>

            <label className="fh-user-filter min-w-[240px]">
              Active counselor
              <select
                value={activeCounselor.id}
                onChange={(event) => setActiveCounselorId(event.target.value)}
                className="w-full"
              >
                {counselors.map((counselor) => (
                  <option key={counselor.id} value={counselor.id}>
                    {counselor.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="text-base font-semibold text-[var(--text-primary)]">Booking queue</div>
              <span className="fh-pill fh-pill-slate">{counselorBookings.length} total</span>
            </div>

            <div className="mt-3 space-y-3">
              {counselorBookings.length ? (
                counselorBookings.map((booking) => (
                  <div key={booking.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{booking.counselorName}</div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {formatDateTime(booking.startsAt)} - {booking.sessionType.toUpperCase()}
                        </div>
                      </div>
                      <span
                        className={`fh-pill ${
                          booking.status === "completed"
                            ? "fh-pill-emerald"
                            : booking.status === "cancelled"
                              ? "fh-pill-orange"
                              : "fh-pill-slate"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="fh-user-secondary-btn"
                        onClick={() =>
                          window.open(buildSessionRoomUrl(booking.sessionId), "_blank", "noopener,noreferrer")
                        }
                      >
                        <ExternalLink className="mr-1.5 h-4 w-4" />
                        Join session
                      </Button>
                      <Button
                        variant="outline"
                        className="fh-user-secondary-btn"
                        disabled={booking.status === "completed"}
                        onClick={() => {
                          updateBookingStatus(booking.sessionId, "completed");
                          refreshBookings();
                        }}
                      >
                        <CheckCircle2 className="mr-1.5 h-4 w-4" />
                        Mark complete
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--text-secondary)]">
                  No bookings for this counselor yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="p-5">
              <div className="text-base font-semibold text-[var(--text-primary)]">Set availability</div>
              <div className="mt-3 space-y-3">
                <label className="fh-user-filter">
                  Session start
                  <input
                    type="datetime-local"
                    value={newSlotDateTime}
                    onChange={(event) => setNewSlotDateTime(event.target.value)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  />
                </label>

                <label className="fh-user-filter">
                  Session type
                  <select
                    value={newSlotType}
                    onChange={(event) => setNewSlotType(event.target.value as SessionType)}
                    className="w-full"
                  >
                    <option value="video">Video</option>
                    <option value="chat">Chat</option>
                  </select>
                </label>

                <Button className="fh-user-primary-btn w-full" onClick={addAvailabilitySlot}>
                  <PlusCircle className="mr-1.5 h-4 w-4" />
                  Add availability slot
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="p-5">
              <div className="text-base font-semibold text-[var(--text-primary)]">Availability feed</div>
              <div className="mt-3 space-y-2">
                {allAvailability.length ? (
                  allAvailability.map((slot) => (
                    <div key={slot.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                      <div className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <CalendarDays className="h-3.5 w-3.5 text-[var(--accent)]" />
                        {slot.sessionType.toUpperCase()}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {formatDateTime(slot.startsAt)}
                      </div>
                      <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <Clock3 className="h-3.5 w-3.5" />
                        45 minutes
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--text-secondary)]">
                    No availability published yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Stethoscope className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">Provider trust note</div>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    All sessions use secure links and support role-based access for counselor, member, and admin
                    monitoring.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
