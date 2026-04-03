import type { FaithHubResource, ResourceCategory, ResourceType } from "@/types/resources";
import { getStoredResourcesSync, saveStoredResourcesSync } from "@/data/services/resourcesService";

export const faithMartUrl = (import.meta.env.VITE_FAITHMART_URL as string | undefined) || "https://faithmart.app";

const seedResources: FaithHubResource[] = [
  {
    id: "res-grace-devotional",
    title: "Daily Grace Devotional",
    description: "A 30-day devotional guide for prayer, gratitude, and steady spiritual routines.",
    type: "pdf",
    author: "Pastor Anna",
    file_url: "https://example.com/resources/daily-grace-devotional.pdf",
    created_at: "2026-03-25T09:30:00.000Z",
    category: "Devotionals",
    tags: ["devotional", "daily", "prayer"],
    download_count: 412,
    featured: true,
    recommended: true,
    uploader_role: "provider",
  },
  {
    id: "res-family-prayer-book",
    title: "Family Prayer Handbook",
    description: "A practical family prayer handbook with weekly templates and conversation starters.",
    type: "pdf",
    author: "Leader Michael",
    file_url: "https://example.com/resources/family-prayer-handbook.pdf",
    created_at: "2026-03-21T11:15:00.000Z",
    category: "Books",
    tags: ["family", "prayer", "guide"],
    download_count: 289,
    featured: true,
    recommended: false,
    uploader_role: "provider",
  },
  {
    id: "res-youth-audio-series",
    title: "Youth Purpose Audio Series",
    description: "Seven short audio teachings focused on identity, focus, and meaningful choices.",
    type: "audio",
    author: "FaithHub Editorial",
    file_url: "https://example.com/resources/youth-purpose-audio.mp3",
    created_at: "2026-03-23T14:05:00.000Z",
    category: "Audio",
    tags: ["youth", "purpose", "audio"],
    download_count: 198,
    featured: false,
    recommended: true,
    uploader_role: "user",
  },
  {
    id: "res-leadership-notes",
    title: "Community Leadership Notes",
    description: "Short PDF notes for leaders running prayer circles and discussion groups.",
    type: "pdf",
    author: "Provider Team",
    file_url: "https://example.com/resources/community-leadership-notes.pdf",
    created_at: "2026-03-28T08:40:00.000Z",
    category: "PDFs",
    tags: ["leadership", "community"],
    download_count: 93,
    featured: false,
    recommended: true,
    uploader_role: "provider",
  },
  {
    id: "res-scripture-meditation",
    title: "Scripture Meditation Audio",
    description: "Calm audio reflections to guide scripture meditation and journaling moments.",
    type: "audio",
    author: "Grace N.",
    file_url: "https://example.com/resources/scripture-meditation.mp3",
    created_at: "2026-03-29T06:20:00.000Z",
    category: "Audio",
    tags: ["meditation", "scripture"],
    download_count: 54,
    featured: false,
    recommended: false,
    uploader_role: "user",
  },
];

function normalizeResources(resources: FaithHubResource[]) {
  return resources
    .slice()
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.created_at.localeCompare(a.created_at);
    });
}

export function getFaithHubResources() {
  const merged = [...seedResources, ...getStoredResourcesSync()];
  const dedupe = new Map<string, FaithHubResource>();
  for (const resource of merged) {
    dedupe.set(resource.id, resource);
  }
  return normalizeResources(Array.from(dedupe.values()));
}

export function saveFaithHubResources(resources: FaithHubResource[]) {
  saveStoredResourcesSync(resources);
}

export function getResourceById(resourceId: string) {
  return getFaithHubResources().find((resource) => resource.id === resourceId) || null;
}

export function getResourceCategories(): ResourceCategory[] {
  return ["Books", "PDFs", "Audio", "Devotionals"];
}

export function createResource(
  resources: FaithHubResource[],
  input: {
    title: string;
    description: string;
    type: ResourceType;
    category: ResourceCategory;
    author: string;
    file_url: string;
    tags?: string[];
    uploader_role?: "provider" | "user";
  },
) {
  const created: FaithHubResource = {
    id: `res-${Date.now()}`,
    title: input.title.trim(),
    description: input.description.trim(),
    type: input.type,
    author: input.author.trim(),
    file_url: input.file_url.trim(),
    created_at: new Date().toISOString(),
    category: input.category,
    tags: (input.tags || []).map((tag) => tag.trim()).filter(Boolean),
    download_count: 0,
    featured: false,
    recommended: true,
    uploader_role: input.uploader_role || "provider",
  };

  return normalizeResources([created, ...resources]);
}

export function updateResource(
  resources: FaithHubResource[],
  resourceId: string,
  patch: Partial<FaithHubResource>,
) {
  return normalizeResources(
    resources.map((resource) =>
      resource.id === resourceId
        ? {
            ...resource,
            ...patch,
          }
        : resource,
    ),
  );
}

export function removeResource(resources: FaithHubResource[], resourceId: string) {
  return normalizeResources(resources.filter((resource) => resource.id !== resourceId));
}

export function bumpResourceDownload(resources: FaithHubResource[], resourceId: string) {
  return updateResource(resources, resourceId, {
    download_count:
      (resources.find((resource) => resource.id === resourceId)?.download_count || 0) + 1,
  });
}
