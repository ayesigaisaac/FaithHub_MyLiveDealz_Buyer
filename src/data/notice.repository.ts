import type { Role } from "@/types/roles";

const NOTICE_STORAGE_KEY = "faithhub.noticeboard.v1";

export type NoticeType = "announcement" | "event" | "urgent";

export interface Notice {
  id: string;
  title: string;
  message: string;
  type: NoticeType;
  author: string;
  createdAt: string;
  expiresAt?: string;
  isPinned: boolean;
}

export interface CreateNoticeInput {
  title: string;
  message: string;
  type: NoticeType;
  author: string;
  isPinned?: boolean;
  expiresAt?: string;
}

export interface NoticeRepository {
  getAllNotices(options?: { includeExpired?: boolean }): Notice[];
  createNotice(input: CreateNoticeInput): Notice;
  updateNotice(id: string, updates: Partial<Omit<Notice, "id" | "createdAt">>): Notice | null;
  deleteNotice(id: string): void;
  togglePin(id: string): Notice | null;
}

const seedNotices: Notice[] = [
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

function isBrowser() {
  return typeof window !== "undefined";
}

function isValidNoticeType(value: unknown): value is NoticeType {
  return value === "announcement" || value === "event" || value === "urgent";
}

function isValidIso(value: unknown) {
  if (typeof value !== "string") return false;
  return !Number.isNaN(Date.parse(value));
}

function toNotice(value: unknown): Notice | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<Notice>;
  if (
    typeof candidate.id !== "string" ||
    typeof candidate.title !== "string" ||
    typeof candidate.message !== "string" ||
    !isValidNoticeType(candidate.type) ||
    typeof candidate.author !== "string" ||
    !isValidIso(candidate.createdAt) ||
    typeof candidate.isPinned !== "boolean"
  ) {
    return null;
  }

  if (candidate.expiresAt && !isValidIso(candidate.expiresAt)) {
    return null;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    message: candidate.message,
    type: candidate.type,
    author: candidate.author,
    createdAt: candidate.createdAt,
    expiresAt: candidate.expiresAt,
    isPinned: candidate.isPinned,
  };
}

function parseStored(raw: string | null): Notice[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(toNotice).filter((entry): entry is Notice => Boolean(entry));
  } catch {
    return [];
  }
}

function compareNotices(a: Notice, b: Notice) {
  if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
  return b.createdAt.localeCompare(a.createdAt);
}

function dedupeAndSort(notices: Notice[]) {
  const map = new Map<string, Notice>();
  for (const notice of notices) {
    map.set(notice.id, notice);
  }
  return Array.from(map.values()).sort(compareNotices);
}

function isExpired(notice: Notice) {
  if (!notice.expiresAt) return false;
  return new Date(notice.expiresAt).getTime() < Date.now();
}

function normalizeNotice(input: CreateNoticeInput): Notice {
  const expiresAt = input.expiresAt?.trim();
  return {
    id: `notice-${Date.now()}`,
    title: input.title.trim(),
    message: input.message.trim(),
    type: input.type,
    author: input.author.trim(),
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt || undefined,
    isPinned: Boolean(input.isPinned),
  };
}

function canManageByRole(role: Role) {
  return role === "admin" || role === "provider";
}

class LocalStorageNoticeRepository implements NoticeRepository {
  private readStore() {
    if (!isBrowser()) return dedupeAndSort(seedNotices);
    const stored = parseStored(window.localStorage.getItem(NOTICE_STORAGE_KEY));
    return dedupeAndSort([...seedNotices, ...stored]);
  }

  private writeStore(notices: Notice[]) {
    if (!isBrowser()) return;
    const unique = dedupeAndSort(notices);
    const withoutSeed = unique.filter((notice) => !seedNotices.some((seed) => seed.id === notice.id));
    window.localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(withoutSeed));
  }

  getAllNotices(options?: { includeExpired?: boolean }) {
    const includeExpired = Boolean(options?.includeExpired);
    const notices = this.readStore();
    if (includeExpired) return notices;
    return notices.filter((notice) => !isExpired(notice));
  }

  createNotice(input: CreateNoticeInput) {
    const notice = normalizeNotice(input);
    const next = [notice, ...this.readStore()];
    this.writeStore(next);
    return notice;
  }

  updateNotice(id: string, updates: Partial<Omit<Notice, "id" | "createdAt">>) {
    let updated: Notice | null = null;
    const next = this.readStore().map((notice) => {
      if (notice.id !== id) return notice;
      const candidate: Notice = {
        ...notice,
        ...updates,
        title: typeof updates.title === "string" ? updates.title.trim() : notice.title,
        message: typeof updates.message === "string" ? updates.message.trim() : notice.message,
        author: typeof updates.author === "string" ? updates.author.trim() : notice.author,
      };
      updated = candidate;
      return candidate;
    });
    this.writeStore(next);
    return updated;
  }

  deleteNotice(id: string) {
    const next = this.readStore().filter((notice) => notice.id !== id);
    this.writeStore(next);
  }

  togglePin(id: string) {
    let updated: Notice | null = null;
    const next = this.readStore().map((notice) => {
      if (notice.id !== id) return notice;
      updated = {
        ...notice,
        isPinned: !notice.isPinned,
      };
      return updated;
    });
    this.writeStore(next);
    return updated;
  }
}

export const noticeRepository: NoticeRepository = new LocalStorageNoticeRepository();

export function canManageNoticeboard(role: Role) {
  return canManageByRole(role);
}
