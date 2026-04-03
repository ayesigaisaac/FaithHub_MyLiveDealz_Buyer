import type { FaithHubResource } from "@/types/resources";

export interface ResourcesRepository {
  getResources(): Promise<FaithHubResource[]>;
  saveResources(resources: FaithHubResource[]): Promise<FaithHubResource[]>;
}

