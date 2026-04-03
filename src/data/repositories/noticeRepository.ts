import { readJson, writeJson } from "@/data/adapters/storage";
import type {
  Notice,
  NoticeRepository,
  NoticeType,
} from "@/data/interfaces/notice-repository";

const STORAGE_KEY = "faithhub.noticeboard.v1";

export const seedNotices: Notice[] = [
  {
    id: "notice-1",
    title: "Community Prayer Night",
    message:
      "Join the weekly prayer gathering this Friday at 8:00 PM. Invite your groups and submit prayer points before noon.",
    type: "event",
    author: "FaithHub Team",
    createdAt: "2026-04-01T10:30:00.000Z",
    expiresAt: "2026-04-08T22:00:00.000Z",
    isPinned: true,
  },
  {
    id: "notice-2",
    title: "Service Window Update",
    message:
      "Wallet and giving reconciliation runs between 2:00 AM and 3:00 AM EAT daily. You may notice short delays in transaction status updates.",
    type: "announcement",
    author: "Admin Operations",
    createdAt: "2026-03-30T07:10:00.000Z",
    isPinned: false,
  },
  {
    id: "notice-3",
    title: "Urgent Moderation Notice",
    message:
      "Please report suspicious links immediately. Provider moderators are asked to pin trusted updates in community threads.",
    type: "urgent",
    author: "Trust & Safety",
    createdAt: "2026-03-29T13:22:00.000Z",
    isPinned: true,
  },
];

function isNoticeType(value: unknown): value is NoticeType {
  return value === "announcement" || value === "event" || value === "urgent";
}

function isIsoDate(value: unknown) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isNotice(candidate: unknown): candidate is Notice {
  if (!candidate || typeof candidate !== "object") return false;
  const notice = candidate as Notice;
  if (
    !notice.id ||
    !notice.title ||
    !notice.message ||
    !notice.author ||
    !isNoticeType(notice.type) ||
    !isIsoDate(notice.createdAt) ||
    typeof notice.isPinned !== "boolean"
  ) {
    return false;
  }

  if (notice.expiresAt && !isIsoDate(notice.expiresAt)) {
    return false;
  }
  return true;
}

function reviveNotices(value: unknown): Notice[] | null {
  if (!Array.isArray(value)) return [];
  return value.filter(isNotice);
}

export function readStoredNoticesSync() {
  return readJson(STORAGE_KEY, [] as Notice[], reviveNotices);
}

export function writeStoredNoticesSync(notices: Notice[]) {
  writeJson(STORAGE_KEY, notices);
}

class MockNoticeRepository implements NoticeRepository {
  async getNotices() {
    return readStoredNoticesSync();
  }

  async saveNotices(notices: Notice[]) {
    writeStoredNoticesSync(notices);
    return readStoredNoticesSync();
  }
}

export const mockNoticeRepository: NoticeRepository = new MockNoticeRepository();

