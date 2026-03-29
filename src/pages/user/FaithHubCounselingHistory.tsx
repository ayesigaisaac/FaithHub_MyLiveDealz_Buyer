import React, { useMemo, useState } from "react";
import { CalendarClock, Clock3, History, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCounselingBookings, updateBookingStatus } from "@/data/counseling";
import { routes } from "@/constants/routes";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusClass(status: "upcoming" | "completed" | "cancelled") {
  if (status === "completed") return "fh-pill fh-pill-emerald";
  if (status === "cancelled") return "fh-pill fh-pill-orange";
  return "fh-pill fh-pill-slate";
}

export default function FaithHubCounselingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(() => getCounselingBookings());

  const upcoming = useMemo(
    () => bookings.filter((booking) => booking.status === "upcoming"),
    [bookings],
  );
  const history = useMemo(
    () => bookings.filter((booking) => booking.status !== "upcoming"),
    [bookings],
  );

  const refreshBookings = () => setBookings(getCounselingBookings());

  const cancelBooking = (sessionId: string) => {
    updateBookingStatus(sessionId, "cancelled");
    refreshBookings();
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="fh-label fh-user-kicker">Counseling Timeline</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Session History</h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Track upcoming bookings, revisit completed sessions, and quickly rebook with trusted counselors.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="fh-pill fh-pill-slate">{upcoming.length} upcoming</span>
                <span className="fh-pill fh-pill-emerald">
                  {history.filter((item) => item.status === "completed").length} completed
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="fh-user-secondary-btn" onClick={() => navigate(routes.app.user.counseling)}>
                Discover counselors
              </Button>
              <Button className="fh-user-primary-btn" onClick={() => navigate(routes.app.user.counselingBook)}>
                Book new session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
              <CalendarClock className="h-4 w-4 text-[var(--accent)]" />
              Upcoming sessions
            </div>
            <div className="mt-3 space-y-3">
              {upcoming.length ? (
                upcoming.map((booking) => (
                  <div key={booking.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{booking.counselorName}</div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {formatDateTime(booking.startsAt)} - {booking.sessionType.toUpperCase()}
                        </div>
                      </div>
                      <span className={statusClass(booking.status)}>{booking.status}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        className="fh-user-primary-btn"
                        onClick={() =>
                          navigate(
                            `${routes.app.user.counselingSessionById(booking.sessionId)}?counselorId=${encodeURIComponent(
                              booking.counselorId,
                            )}&mode=${booking.sessionType}`,
                          )
                        }
                      >
                        Join session
                      </Button>
                      <Button
                        variant="outline"
                        className="fh-user-secondary-btn"
                        onClick={() => navigate(`${routes.app.user.counselingBook}?counselorId=${booking.counselorId}`)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="fh-user-secondary-btn"
                        onClick={() => cancelBooking(booking.sessionId)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--text-secondary)]">
                  No upcoming sessions yet. Book from discovery to reserve your counseling slot.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
              <History className="h-4 w-4 text-[var(--accent)]" />
              Past sessions
            </div>
            <div className="mt-3 space-y-3">
              {history.length ? (
                history.map((booking) => (
                  <div key={booking.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{booking.counselorName}</div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {formatDateTime(booking.startsAt)} - {booking.sessionType.toUpperCase()}
                        </div>
                      </div>
                      <span className={statusClass(booking.status)}>{booking.status}</span>
                    </div>
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">
                      {booking.notes || "No session notes saved for this appointment."}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="fh-user-secondary-btn"
                        onClick={() => navigate(`${routes.app.user.counselingBook}?counselorId=${booking.counselorId}`)}
                      >
                        Rebook
                      </Button>
                      <Button
                        variant="outline"
                        className="fh-user-secondary-btn"
                        onClick={() =>
                          navigate(
                            `${routes.app.user.counselingSessionById(booking.sessionId)}?counselorId=${encodeURIComponent(
                              booking.counselorId,
                            )}&mode=${booking.sessionType}`,
                          )
                        }
                      >
                        <Video className="mr-1.5 h-4 w-4" />
                        Open record
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--text-secondary)]">
                  Your completed sessions will appear here after you finish your first counseling appointment.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-2">
            <Clock3 className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
            <div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">Rebooking takes one click</div>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Use any previous session to jump back into booking with the same counselor and preferred format.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
