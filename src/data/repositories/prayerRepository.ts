import type {
  CreatePrayerRequestInput,
  PrayerCategory,
  PrayerComment,
  PrayerRequestRecord,
  PrayerStatus,
  Testimony,
} from "@/types/prayer";

const STORAGE_KEY = "faithhub_prayer_requests";
const TESTIMONY_STORAGE_KEY = "faithhub_prayer_testimonies";

function wait(ms = 120) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function createSeedRequest(
  id: string,
  title: string,
  description: string,
  category: PrayerCategory,
  status: PrayerStatus,
  urgency: "normal" | "urgent",
  createdBy: string,
  hoursAgo: number,
): PrayerRequestRecord {
  return {
    id,
    title,
    description,
    category,
    isAnonymous: false,
    urgency,
    status,
    createdAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
    createdBy,
    prayedCount: Math.max(2, 18 - hoursAgo),
    supportCount: Math.max(1, 9 - Math.floor(hoursAgo / 2)),
    commentCount: 1,
    comments: [
      {
        id: `${id}-comment-1`,
        author: "Faith member",
        message: "Standing with you in prayer.",
        createdAt: new Date(Date.now() - (hoursAgo - 1) * 60 * 60 * 1000).toISOString(),
      },
    ],
  };
}

const seedPrayerRequests: PrayerRequestRecord[] = [
  createSeedRequest(
    "prayer-1",
    "Prayer for healing and strength",
    "Please pray for my mother's recovery and renewed strength after surgery.",
    "healing",
    "ongoing",
    "urgent",
    "Grace N.",
    6,
  ),
  createSeedRequest(
    "prayer-2",
    "Family unity and peace",
    "Asking prayer for restoration and peace in our family conversations.",
    "family",
    "active",
    "normal",
    "James K.",
    14,
  ),
  createSeedRequest(
    "prayer-3",
    "Financial breakthrough",
    "Pray for wisdom and open doors as we trust God for school fees this term.",
    "finance",
    "active",
    "normal",
    "Anonymous",
    24,
  ),
];

function parseRecords(raw: string | null): PrayerRequestRecord[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as PrayerRequestRecord[];
  } catch {
    return [];
  }
}

function sortRecords(records: PrayerRequestRecord[]) {
  return records.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function readStore() {
  if (typeof window === "undefined") return sortRecords(seedPrayerRequests);
  const existing = parseRecords(window.localStorage.getItem(STORAGE_KEY));
  if (existing.length) return sortRecords(existing);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPrayerRequests));
  return sortRecords(seedPrayerRequests);
}

function writeStore(records: PrayerRequestRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sortRecords(records)));
}

function parseTestimonies(raw: string | null): Testimony[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Testimony[];
  } catch {
    return [];
  }
}

function readTestimoniesStore() {
  if (typeof window === "undefined") return [] as Testimony[];
  return parseTestimonies(window.localStorage.getItem(TESTIMONY_STORAGE_KEY)).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

function writeTestimoniesStore(items: Testimony[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TESTIMONY_STORAGE_KEY, JSON.stringify(items));
}

export async function getPrayerRequests() {
  await wait();
  return readStore();
}

export async function createPrayerRequest(input: CreatePrayerRequestInput) {
  await wait();
  const next: PrayerRequestRecord = {
    id: `prayer-${Date.now()}`,
    title: input.title.trim(),
    description: input.description.trim(),
    category: input.category,
    isAnonymous: input.isAnonymous,
    urgency: input.urgency,
    status: "active",
    createdAt: new Date().toISOString(),
    createdBy: input.isAnonymous ? "Anonymous" : input.createdBy,
    prayedCount: 0,
    supportCount: 0,
    commentCount: 0,
    comments: [],
  };
  const records = [next, ...readStore()];
  writeStore(records);
  return next;
}

export async function incrementPrayerReaction(requestId: string, reaction: "prayed" | "support") {
  return adjustPrayerReaction(requestId, reaction, 1);
}

export async function adjustPrayerReaction(
  requestId: string,
  reaction: "prayed" | "support",
  delta: number,
) {
  await wait(80);
  const records = readStore().map((record) => {
    if (record.id !== requestId) return record;
    const safeDelta = Number.isFinite(delta) ? delta : 0;
    if (reaction === "prayed") {
      return { ...record, prayedCount: Math.max(0, record.prayedCount + safeDelta) };
    }
    return { ...record, supportCount: Math.max(0, record.supportCount + safeDelta) };
  });
  writeStore(records);
  return records.find((record) => record.id === requestId) || null;
}

export async function addPrayerComment(requestId: string, message: string, author: string) {
  await wait(100);
  const nextComment: PrayerComment = {
    id: `comment-${Date.now()}`,
    author,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  const records = readStore().map((record) => {
    if (record.id !== requestId) return record;
    const comments = [...record.comments, nextComment];
    return {
      ...record,
      comments,
      commentCount: comments.length,
    };
  });
  writeStore(records);
  return records.find((record) => record.id === requestId) || null;
}

export async function markPrayerAnswered(
  requestId: string,
  testimonyMessage: string,
) {
  await wait(120);
  const records = readStore().map((record) =>
    record.id === requestId ? { ...record, status: "answered" as PrayerStatus } : record,
  );
  const nextRequest = records.find((record) => record.id === requestId) || null;
  if (!nextRequest) return { request: null, testimony: null };

  const nextTestimony: Testimony = {
    id: `testimony-${Date.now()}`,
    linkedPrayerId: requestId,
    message: testimonyMessage.trim(),
    createdAt: new Date().toISOString(),
  };

  const testimonies = [nextTestimony, ...readTestimoniesStore().filter((item) => item.linkedPrayerId !== requestId)];
  writeStore(records);
  writeTestimoniesStore(testimonies);
  return { request: nextRequest, testimony: nextTestimony };
}

export async function getTestimonies() {
  await wait(80);
  return readTestimoniesStore();
}
