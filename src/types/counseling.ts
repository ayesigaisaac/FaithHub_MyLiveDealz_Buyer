export type CounselingCategory =
  | "Marriage & Family"
  | "Youth & Identity"
  | "Addiction Recovery"
  | "Grief & Trauma"
  | "Career & Purpose";

export type SessionType = "video" | "chat";
export type BookingStatus = "upcoming" | "completed" | "cancelled";
export type AvailabilityStatus = "available" | "booked";
export type CounselorApprovalStatus = "pending" | "approved" | "rejected";

export interface Counselor {
  id: string;
  name: string;
  title: string;
  category: CounselingCategory;
  specializations: string[];
  bio: string;
  languages: string[];
  yearsExperience: number;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  privacyIndicator: "Confidential" | "Encrypted Notes" | "Faith-safe Space";
}

export interface Availability {
  id: string;
  counselorId: string;
  startsAt: string;
  endsAt: string;
  status: AvailabilityStatus;
  sessionType: SessionType;
}

export interface Booking {
  id: string;
  counselorId: string;
  counselorName: string;
  startsAt: string;
  endsAt: string;
  sessionType: SessionType;
  status: BookingStatus;
  sessionId: string;
  notes: string;
  createdAt: string;
}

export interface Session {
  id: string;
  bookingId: string;
  counselorId: string;
  counselorName: string;
  startsAt: string;
  sessionType: SessionType;
  roomId: string;
  roomUrl: string;
  status: "scheduled" | "live" | "ended";
}

export interface CounselorApproval {
  counselorId: string;
  counselorName: string;
  requestedAt: string;
  status: CounselorApprovalStatus;
  note: string;
}

