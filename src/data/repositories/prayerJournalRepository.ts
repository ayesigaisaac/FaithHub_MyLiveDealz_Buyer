import type { PrayerJournalEntry } from "@/types/prayer";

function wait(ms = 90) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function normalizeOwner(ownerId: string) {
  return ownerId.trim().toLowerCase().replace(/\s+/g, "_");
}

function storageKey(ownerId: string) {
  return `faithhub_prayer_journal_${normalizeOwner(ownerId)}`;
}

function parseEntries(raw: string | null): PrayerJournalEntry[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item.id === "string" && typeof item.content === "string")
      .map((item) => ({
        id: item.id,
        content: item.content,
        createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
      })) as PrayerJournalEntry[];
  } catch {
    return [];
  }
}

function sortEntries(entries: PrayerJournalEntry[]) {
  return entries.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function readStore(ownerId: string) {
  if (typeof window === "undefined") return [] as PrayerJournalEntry[];
  return sortEntries(parseEntries(window.localStorage.getItem(storageKey(ownerId))));
}

function writeStore(ownerId: string, entries: PrayerJournalEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(ownerId), JSON.stringify(sortEntries(entries)));
}

export async function getPrayerJournalEntries(ownerId: string) {
  await wait();
  return readStore(ownerId);
}

export async function createPrayerJournalEntry(ownerId: string, content: string) {
  await wait();
  const next: PrayerJournalEntry = {
    id: `journal-${Date.now()}`,
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };
  const entries = [next, ...readStore(ownerId)];
  writeStore(ownerId, entries);
  return next;
}

export async function updatePrayerJournalEntry(ownerId: string, entryId: string, content: string) {
  await wait();
  const entries = readStore(ownerId).map((entry) =>
    entry.id === entryId ? { ...entry, content: content.trim() } : entry,
  );
  writeStore(ownerId, entries);
  return entries.find((entry) => entry.id === entryId) || null;
}

export async function deletePrayerJournalEntry(ownerId: string, entryId: string) {
  await wait();
  const entries = readStore(ownerId).filter((entry) => entry.id !== entryId);
  writeStore(ownerId, entries);
  return entries;
}
