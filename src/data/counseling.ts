import type {
  Availability,
  Booking,
  BookingStatus,
  Counselor,
  CounselorApproval,
  CounselingCategory,
  Session,
  SessionType,
} from "@/types/counseling";
import { getStoredBookingsSync, saveStoredBookingsSync } from "@/data/services/counselingService";

export const counselors: Counselor[] = [
  {
    id: "c-anna-namuli",
    name: "Anna Namuli",
    title: "Licensed Family Counselor",
    category: "Marriage & Family",
    specializations: ["Conflict repair", "Pre-marriage guidance", "Parenting"],
    bio: "Anna helps families restore trust through structured counseling plans rooted in faith-sensitive care.",
    languages: ["English", "Luganda"],
    yearsExperience: 11,
    rating: 4.9,
    reviewsCount: 214,
    verified: true,
    privacyIndicator: "Confidential",
  },
  {
    id: "c-joseph-kato",
    name: "Joseph Kato",
    title: "Youth Mentor & Counselor",
    category: "Youth & Identity",
    specializations: ["Identity coaching", "Campus pressure", "Confidence"],
    bio: "Joseph works with youth and young adults to navigate life transitions, identity, and social pressure.",
    languages: ["English", "Lusoga"],
    yearsExperience: 8,
    rating: 4.7,
    reviewsCount: 167,
    verified: true,
    privacyIndicator: "Faith-safe Space",
  },
  {
    id: "c-ruth-birungi",
    name: "Ruth Birungi",
    title: "Trauma Recovery Specialist",
    category: "Grief & Trauma",
    specializations: ["Loss recovery", "Trauma stabilization", "Support plans"],
    bio: "Ruth supports individuals and families through grief pathways with private, evidence-informed sessions.",
    languages: ["English", "Runyankole"],
    yearsExperience: 13,
    rating: 4.8,
    reviewsCount: 302,
    verified: true,
    privacyIndicator: "Encrypted Notes",
  },
  {
    id: "c-sam-mugisha",
    name: "Sam Mugisha",
    title: "Addiction & Recovery Counselor",
    category: "Addiction Recovery",
    specializations: ["Relapse prevention", "Accountability plans", "Recovery groups"],
    bio: "Sam provides practical recovery coaching, relapse-prevention frameworks, and family alignment sessions.",
    languages: ["English"],
    yearsExperience: 9,
    rating: 4.6,
    reviewsCount: 128,
    verified: true,
    privacyIndicator: "Confidential",
  },
  {
    id: "c-miriam-aine",
    name: "Miriam Aine",
    title: "Purpose & Career Counselor",
    category: "Career & Purpose",
    specializations: ["Career pivot", "Burnout support", "Purpose mapping"],
    bio: "Miriam helps professionals align vocation with values and faith goals while reducing burnout.",
    languages: ["English", "Luganda"],
    yearsExperience: 7,
    rating: 4.7,
    reviewsCount: 95,
    verified: false,
    privacyIndicator: "Faith-safe Space",
  },
];

export const counselorAvailability: Availability[] = [
  {
    id: "slot-1",
    counselorId: "c-anna-namuli",
    startsAt: "2026-03-30T09:00:00.000Z",
    endsAt: "2026-03-30T09:45:00.000Z",
    status: "available",
    sessionType: "video",
  },
  {
    id: "slot-2",
    counselorId: "c-anna-namuli",
    startsAt: "2026-03-30T12:00:00.000Z",
    endsAt: "2026-03-30T12:45:00.000Z",
    status: "available",
    sessionType: "chat",
  },
  {
    id: "slot-3",
    counselorId: "c-joseph-kato",
    startsAt: "2026-03-31T15:00:00.000Z",
    endsAt: "2026-03-31T15:45:00.000Z",
    status: "available",
    sessionType: "video",
  },
  {
    id: "slot-4",
    counselorId: "c-ruth-birungi",
    startsAt: "2026-04-01T08:30:00.000Z",
    endsAt: "2026-04-01T09:15:00.000Z",
    status: "available",
    sessionType: "video",
  },
  {
    id: "slot-5",
    counselorId: "c-sam-mugisha",
    startsAt: "2026-04-01T18:00:00.000Z",
    endsAt: "2026-04-01T18:45:00.000Z",
    status: "available",
    sessionType: "chat",
  },
  {
    id: "slot-6",
    counselorId: "c-miriam-aine",
    startsAt: "2026-04-02T10:00:00.000Z",
    endsAt: "2026-04-02T10:45:00.000Z",
    status: "available",
    sessionType: "video",
  },
];

const seededBookings: Booking[] = [
  {
    id: "bk-seeded-1",
    counselorId: "c-ruth-birungi",
    counselorName: "Ruth Birungi",
    startsAt: "2026-03-20T14:00:00.000Z",
    endsAt: "2026-03-20T14:45:00.000Z",
    sessionType: "video",
    status: "completed",
    sessionId: "sess-seeded-1",
    notes: "Follow-up grief support plan",
    createdAt: "2026-03-18T09:10:00.000Z",
  },
  {
    id: "bk-seeded-2",
    counselorId: "c-joseph-kato",
    counselorName: "Joseph Kato",
    startsAt: "2026-03-24T16:30:00.000Z",
    endsAt: "2026-03-24T17:15:00.000Z",
    sessionType: "chat",
    status: "completed",
    sessionId: "sess-seeded-2",
    notes: "Identity roadmap and accountability milestones",
    createdAt: "2026-03-22T11:20:00.000Z",
  },
];

export const counselorApprovals: CounselorApproval[] = counselors.map((counselor, index) => ({
  counselorId: counselor.id,
  counselorName: counselor.name,
  requestedAt: new Date(Date.now() - (index + 2) * 86_400_000).toISOString(),
  status: counselor.verified ? "approved" : "pending",
  note: counselor.verified ? "Credentials verified" : "Awaiting final review",
}));

function mergeBookings(bookings: Booking[]) {
  const map = new Map<string, Booking>();
  for (const booking of bookings) {
    map.set(booking.id, booking);
  }
  return Array.from(map.values()).sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

export function buildSessionRoomUrl(sessionId: string) {
  return `https://meet.jit.si/FaithHubCounseling-${encodeURIComponent(sessionId)}`;
}

export function getCounselorById(counselorId: string) {
  return counselors.find((counselor) => counselor.id === counselorId);
}

export function getCounselingCategories(): CounselingCategory[] {
  return Array.from(new Set(counselors.map((counselor) => counselor.category)));
}

export function getAvailabilityForCounselor(counselorId: string) {
  return counselorAvailability
    .filter((slot) => slot.counselorId === counselorId)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function getCounselingBookings() {
  return mergeBookings([...seededBookings, ...getStoredBookingsSync()]);
}

export function getCounselingHistory() {
  return getCounselingBookings().filter((booking) => booking.status === "completed");
}

export function getUpcomingCounselingBookings() {
  return getCounselingBookings().filter((booking) => booking.status === "upcoming");
}

export function createCounselingBooking(input: {
  counselorId: string;
  startsAt: string;
  endsAt: string;
  sessionType: SessionType;
  notes: string;
}) {
  const counselor = getCounselorById(input.counselorId) || counselors[0];
  const timestamp = Date.now();
  const booking: Booking = {
    id: `bk-${timestamp}`,
    counselorId: counselor.id,
    counselorName: counselor.name,
    startsAt: input.startsAt,
    endsAt: input.endsAt,
    sessionType: input.sessionType,
    status: "upcoming",
    sessionId: `sess-${timestamp}`,
    notes: input.notes,
    createdAt: new Date(timestamp).toISOString(),
  };

  const existing = getStoredBookingsSync();
  saveStoredBookingsSync([booking, ...existing]);
  return booking;
}

export function updateBookingStatus(sessionId: string, status: BookingStatus) {
  const existing = getStoredBookingsSync();
  const updated = existing.map((booking) =>
    booking.sessionId === sessionId
      ? {
          ...booking,
          status,
        }
      : booking,
  );
  saveStoredBookingsSync(updated);
}

export function getSessionById(sessionId: string): Session | null {
  const booking = getCounselingBookings().find((entry) => entry.sessionId === sessionId);
  if (!booking) return null;
  return {
    id: sessionId,
    bookingId: booking.id,
    counselorId: booking.counselorId,
    counselorName: booking.counselorName,
    startsAt: booking.startsAt,
    sessionType: booking.sessionType,
    roomId: `FaithHubCounseling-${sessionId}`,
    roomUrl: buildSessionRoomUrl(sessionId),
    status: booking.status === "completed" ? "ended" : "scheduled",
  };
}

