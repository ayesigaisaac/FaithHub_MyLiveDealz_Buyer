export type PrayerCategory = "healing" | "family" | "finance" | "spiritual";
export type PrayerUrgency = "normal" | "urgent";
export type PrayerStatus = "active" | "answered" | "ongoing";

export interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  category: PrayerCategory;
  isAnonymous: boolean;
  urgency: PrayerUrgency;
  status: PrayerStatus;
  createdAt: string;
  createdBy: string;
}

export interface PrayerComment {
  id: string;
  prayerId: string;
  user: string;
  message: string;
  createdAt: string;
  replies?: PrayerComment[];
}

export interface PrayerRequestRecord extends PrayerRequest {
  prayedCount: number;
  supportCount: number;
  commentCount: number;
  comments: PrayerComment[];
}

export interface CreatePrayerRequestInput {
  title: string;
  description: string;
  category: PrayerCategory;
  isAnonymous: boolean;
  urgency: PrayerUrgency;
  createdBy: string;
}

export interface Testimony {
  id: string;
  linkedPrayerId: string;
  message: string;
  createdAt: string;
}
