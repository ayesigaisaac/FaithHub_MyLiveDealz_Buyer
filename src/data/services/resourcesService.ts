import { repositoryFactory } from "@/data/repositories/factory";
import { readResourcesSync, writeResourcesSync } from "@/data/repositories/resourcesRepository";
import { simulateLatency } from "@/data/services/runtime";
import type { FaithHubResource } from "@/types/resources";

function sortResources(resources: FaithHubResource[]) {
  return resources.slice().sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.created_at.localeCompare(a.created_at);
  });
}

export function getStoredResourcesSync() {
  return sortResources(readResourcesSync());
}

export function saveStoredResourcesSync(resources: FaithHubResource[]) {
  writeResourcesSync(resources);
  return getStoredResourcesSync();
}

export async function getStoredResources() {
  await simulateLatency();
  const resources = await repositoryFactory.resources.getResources();
  return sortResources(resources);
}

export async function saveStoredResources(resources: FaithHubResource[]) {
  await simulateLatency();
  const next = await repositoryFactory.resources.saveResources(resources);
  return sortResources(next);
}

