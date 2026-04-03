import { repositoryFactory } from "@/data/repositories/factory";
import { readStoredNoticesSync, writeStoredNoticesSync } from "@/data/repositories/noticeRepository";
import { simulateLatency } from "@/data/services/runtime";
import type { Notice } from "@/data/interfaces/notice-repository";

function sortNotices(notices: Notice[]) {
  return notices.slice().sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function getStoredNoticesSync() {
  return sortNotices(readStoredNoticesSync());
}

export function saveStoredNoticesSync(notices: Notice[]) {
  writeStoredNoticesSync(notices);
  return getStoredNoticesSync();
}

export async function getStoredNotices() {
  await simulateLatency();
  const notices = await repositoryFactory.noticeboard.getNotices();
  return sortNotices(notices);
}

export async function saveStoredNotices(notices: Notice[]) {
  await simulateLatency();
  const next = await repositoryFactory.noticeboard.saveNotices(notices);
  return sortNotices(next);
}

