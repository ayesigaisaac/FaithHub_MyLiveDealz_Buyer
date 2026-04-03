import type { Role } from "@/types/roles";
import {
  getStoredNoticesSync,
  saveStoredNoticesSync,
} from "@/data/services/noticeService";
import { seedNotices } from "@/data/repositories/noticeRepository";
import type {
  Notice,
  NoticeType,
  NoticeRepository as BaseNoticeRepository,
} from "@/data/interfaces/notice-repository";

export type { Notice, NoticeType };

export interface CreateNoticeInput {
  title: string;
  message: string;
  type: NoticeType;
  author: string;
  isPinned?: boolean;
  expiresAt?: string;
}

export interface NoticeRepository extends BaseNoticeRepository {
  getAllNotices(options?: { includeExpired?: boolean }): Notice[];
  createNotice(input: CreateNoticeInput): Notice;
  updateNotice(id: string, updates: Partial<Omit<Notice, "id" | "createdAt">>): Notice | null;
  deleteNotice(id: string): void;
  togglePin(id: string): Notice | null;
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

function readStore() {
  return dedupeAndSort([...seedNotices, ...getStoredNoticesSync()]);
}

function writeStore(notices: Notice[]) {
  const unique = dedupeAndSort(notices);
  const withoutSeed = unique.filter((notice) => !seedNotices.some((seed) => seed.id === notice.id));
  saveStoredNoticesSync(withoutSeed);
}

class LocalMockNoticeRepository implements NoticeRepository {
  async getNotices() {
    return getStoredNoticesSync();
  }

  async saveNotices(notices: Notice[]) {
    return saveStoredNoticesSync(notices);
  }

  getAllNotices(options?: { includeExpired?: boolean }) {
    const includeExpired = Boolean(options?.includeExpired);
    const notices = readStore();
    if (includeExpired) return notices;
    return notices.filter((notice) => !isExpired(notice));
  }

  createNotice(input: CreateNoticeInput) {
    const notice = normalizeNotice(input);
    const next = [notice, ...readStore()];
    writeStore(next);
    return notice;
  }

  updateNotice(id: string, updates: Partial<Omit<Notice, "id" | "createdAt">>) {
    let updated: Notice | null = null;
    const next = readStore().map((notice) => {
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
    writeStore(next);
    return updated;
  }

  deleteNotice(id: string) {
    const next = readStore().filter((notice) => notice.id !== id);
    writeStore(next);
  }

  togglePin(id: string) {
    let updated: Notice | null = null;
    const next = readStore().map((notice) => {
      if (notice.id !== id) return notice;
      updated = {
        ...notice,
        isPinned: !notice.isPinned,
      };
      return updated;
    });
    writeStore(next);
    return updated;
  }
}

export const noticeRepository: NoticeRepository = new LocalMockNoticeRepository();

export function canManageNoticeboard(role: Role) {
  return role === "admin" || role === "provider";
}

