import { readJson, writeJson } from "@/data/adapters/storage";
import type { ResourcesRepository } from "@/data/interfaces/resources-repository";
import type { FaithHubResource } from "@/types/resources";

const STORAGE_KEY = "faithhub.resources.v1";

function isResource(candidate: unknown): candidate is FaithHubResource {
  if (!candidate || typeof candidate !== "object") return false;
  const resource = candidate as FaithHubResource;
  return Boolean(resource.id && resource.title && resource.file_url);
}

function reviveResources(value: unknown): FaithHubResource[] | null {
  if (!Array.isArray(value)) return [];
  return value.filter(isResource);
}

export function readResourcesSync() {
  return readJson(STORAGE_KEY, [] as FaithHubResource[], reviveResources);
}

export function writeResourcesSync(resources: FaithHubResource[]) {
  writeJson(STORAGE_KEY, resources);
}

class MockResourcesRepository implements ResourcesRepository {
  async getResources() {
    return readResourcesSync();
  }

  async saveResources(resources: FaithHubResource[]) {
    writeResourcesSync(resources);
    return readResourcesSync();
  }
}

export const resourcesRepository: ResourcesRepository = new MockResourcesRepository();

