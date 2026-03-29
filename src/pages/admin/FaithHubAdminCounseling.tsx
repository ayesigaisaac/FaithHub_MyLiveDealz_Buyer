import React, { useMemo, useState } from "react";
import { Activity, BadgeCheck, Clock3, ExternalLink, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildSessionRoomUrl,
  counselorApprovals,
  counselors,
  getCounselingBookings,
} from "@/data/counseling";
import { routes } from "@/constants/routes";
import type { CounselorApprovalStatus } from "@/types/counseling";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function approvalClass(status: CounselorApprovalStatus) {
  if (status === "approved") return "fh-pill fh-pill-emerald";
  if (status === "rejected") return "fh-pill fh-pill-orange";
  return "fh-pill fh-pill-slate";
}

export default function FaithHubAdminCounseling() {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState(counselorApprovals);
  const [bookings] = useState(() => getCounselingBookings());

  const stats = useMemo(() => {
    const approved = approvals.filter((entry) => entry.status === "approved").length;
    const pending = approvals.filter((entry) => entry.status === "pending").length;
    const upcoming = bookings.filter((booking) => booking.status === "upcoming").length;
    const completed = bookings.filter((booking) => booking.status === "completed").length;
    return { approved, pending, upcoming, completed };
  }, [approvals, bookings]);

  const setApprovalStatus = (counselorId: string, status: CounselorApprovalStatus) => {
    setApprovals((prev) =>
      prev.map((entry) =>
        entry.counselorId === counselorId
          ? {
              ...entry,
              status,
              note: status === "approved" ? "Credentials verified and approved." : "Escalated for follow-up.",
            }
          : entry,
      ),
    );
  };

  const rankedCounselors = useMemo(
    () =>
      counselors
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5),
    [],
  );

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Admin Counseling Control</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Counseling Governance
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Approve counselors, monitor counseling activity, and maintain privacy and trust standards across all
                sessions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="fh-pill fh-pill-emerald">{stats.approved} approved</span>
              <span className="fh-pill fh-pill-orange">{stats.pending} pending review</span>
              <span className="fh-pill fh-pill-slate">{stats.upcoming} upcoming sessions</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Approved Counselors
            </div>
            <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{stats.approved}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <BadgeCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
              Credential checks completed
            </div>
          </CardContent>
        </Card>
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Pending Approvals
            </div>
            <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{stats.pending}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <Clock3 className="h-3.5 w-3.5 text-[var(--warning)]" />
              Awaiting admin decision
            </div>
          </CardContent>
        </Card>
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Upcoming Sessions
            </div>
            <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{stats.upcoming}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <Activity className="h-3.5 w-3.5 text-[var(--accent)]" />
              Monitoring ready
            </div>
          </CardContent>
        </Card>
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
              Completed Sessions
            </div>
            <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{stats.completed}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
              Archived with trust logs
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Counselor approval queue</div>
            <div className="mt-3 space-y-3">
              {approvals.map((approval) => {
                const counselor = counselors.find((entry) => entry.id === approval.counselorId);
                return (
                  <div key={approval.counselorId} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{approval.counselorName}</div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          Requested {formatDateTime(approval.requestedAt)} - {counselor?.category || "General"}
                        </div>
                      </div>
                      <span className={approvalClass(approval.status)}>{approval.status}</span>
                    </div>
                    <p className="mt-2 text-xs text-[var(--text-secondary)]">{approval.note}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="fh-user-secondary-btn"
                        onClick={() => setApprovalStatus(approval.counselorId, "approved")}
                      >
                        <UserCheck className="mr-1.5 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="fh-user-secondary-btn"
                        onClick={() => setApprovalStatus(approval.counselorId, "rejected")}
                      >
                        <UserX className="mr-1.5 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Session monitoring feed</div>
            <div className="mt-3 space-y-3">
              {bookings.slice(0, 8).map((booking) => (
                <div key={booking.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
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
                      Open room
                    </Button>
                    <Button
                      variant="outline"
                      className="fh-user-secondary-btn"
                      onClick={() => navigate(routes.app.admin.security)}
                    >
                      View audit trace
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-5">
          <div className="text-base font-semibold text-[var(--text-primary)]">Top rated counselors</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {rankedCounselors.map((counselor) => (
              <div key={counselor.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="text-sm font-semibold text-[var(--text-primary)]">{counselor.name}</div>
                <div className="mt-1 text-xs text-[var(--text-secondary)]">{counselor.category}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                  <BadgeCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                  {counselor.rating.toFixed(1)} rating
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
