import React, { useMemo, useState } from "react";
import { Clock3, ShieldCheck } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailabilityForCounselor, getCounselorById, createCounselingBooking, counselors } from "@/data/counseling";
import { routes } from "@/constants/routes";
import type { SessionType } from "@/types/counseling";

function toLocalInputDateTime(value: string) {
  const date = new Date(value);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

export default function FaithHubCounselingBooking() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const counselorIdParam = params.get("counselorId") || "";
  const slotIdParam = params.get("slotId") || "";

  const counselor = getCounselorById(counselorIdParam) || counselors[0];
  const slots = useMemo(
    () => getAvailabilityForCounselor(counselor.id).filter((slot) => slot.status === "available"),
    [counselor.id],
  );

  const selectedSlotInitial = slots.find((slot) => slot.id === slotIdParam) || slots[0] || null;
  const [selectedSlotId, setSelectedSlotId] = useState(selectedSlotInitial?.id || "");
  const [sessionType, setSessionType] = useState<SessionType>(selectedSlotInitial?.sessionType || "video");
  const [notes, setNotes] = useState("");
  const [manualDateTime, setManualDateTime] = useState(
    selectedSlotInitial ? toLocalInputDateTime(selectedSlotInitial.startsAt) : "",
  );
  const [submitting, setSubmitting] = useState(false);

  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) || null;

  const startDate = selectedSlot?.startsAt
    ? new Date(selectedSlot.startsAt)
    : manualDateTime
      ? new Date(manualDateTime)
      : null;
  const endDate = startDate ? new Date(startDate.getTime() + 45 * 60 * 1000) : null;

  const canSubmit = Boolean(startDate && endDate && counselor);

  const handleConfirm = () => {
    if (!startDate || !endDate) return;
    setSubmitting(true);
    const booking = createCounselingBooking({
      counselorId: counselor.id,
      startsAt: startDate.toISOString(),
      endsAt: endDate.toISOString(),
      sessionType,
      notes: notes.trim(),
    });
    navigate(
      `${routes.app.user.counselingSessionById(booking.sessionId)}?counselorId=${encodeURIComponent(
        counselor.id,
      )}&mode=${sessionType}`,
    );
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="fh-label fh-user-kicker">Counseling Booking</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Book Session</h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Choose time, session type, and confirm your private counseling appointment.
              </p>
            </div>
            <Button variant="outline" className="fh-user-secondary-btn" onClick={() => navigate(routes.app.user.counseling)}>
              Back to counselors
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Counselor</div>
            <div className="mt-1 text-sm text-[var(--text-secondary)]">
              {counselor.name} - {counselor.title}
            </div>

            <div className="mt-4 space-y-3">
              <label className="fh-user-filter">
                Select open slot
                <select
                  value={selectedSlotId}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedSlotId(value);
                    const matched = slots.find((slot) => slot.id === value);
                    if (matched) {
                      setSessionType(matched.sessionType);
                    }
                  }}
                  className="w-full"
                >
                  {slots.length ? (
                    slots.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {new Date(slot.startsAt).toLocaleString()} ({slot.sessionType})
                      </option>
                    ))
                  ) : (
                    <option value="">No predefined slots</option>
                  )}
                </select>
              </label>

              {!slots.length ? (
                <label className="fh-user-filter">
                  Pick date and time
                  <input
                    type="datetime-local"
                    value={manualDateTime}
                    onChange={(event) => setManualDateTime(event.target.value)}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  />
                </label>
              ) : null}

              <label className="fh-user-filter">
                Session type
                <select
                  value={sessionType}
                  onChange={(event) => setSessionType(event.target.value as SessionType)}
                  className="w-full"
                >
                  <option value="video">Video counseling</option>
                  <option value="chat">Chat counseling</option>
                </select>
              </label>

              <label className="fh-user-filter">
                Session notes (optional)
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)]"
                  placeholder="Share focus areas to help counselor prepare."
                />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Booking summary</div>
            <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <div className="fh-label text-[var(--text-muted)]">Counselor</div>
                <div className="mt-1 font-semibold text-[var(--text-primary)]">{counselor.name}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <div className="fh-label text-[var(--text-muted)]">Session time</div>
                <div className="mt-1 font-semibold text-[var(--text-primary)]">
                  {startDate ? startDate.toLocaleString() : "Select date/time"}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <div className="fh-label text-[var(--text-muted)]">Duration</div>
                <div className="mt-1 inline-flex items-center gap-1 font-semibold text-[var(--text-primary)]">
                  <Clock3 className="h-4 w-4 text-[var(--accent)]" />
                  45 minutes
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <div className="fh-label text-[var(--text-muted)]">Privacy</div>
                <div className="mt-1 inline-flex items-center gap-1 font-semibold text-[var(--text-primary)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                  Encrypted access + verified counselor
                </div>
              </div>
            </div>

            <Button className="fh-user-primary-btn mt-4 w-full" onClick={handleConfirm} disabled={!canSubmit || submitting}>
              {submitting ? "Booking..." : "Confirm booking"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

