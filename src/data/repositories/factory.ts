import { communityRepository } from "@/data/repositories/communityRepository";
import { counselingRepository } from "@/data/repositories/counselingRepository";
import { eventsRepository } from "@/data/repositories/eventsRepository";
import { financeRepository } from "@/data/repositories/financeRepository";
import { fundsRepository } from "@/data/repositories/fundsRepository";
import { mockNoticeRepository } from "@/data/repositories/noticeRepository";
import { resourcesRepository } from "@/data/repositories/resourcesRepository";
import { walletRepository } from "@/data/repositories/walletRepository";

export type DataAdapterMode = "mock-local" | "api";

const configuredMode = (import.meta.env.VITE_DATA_ADAPTER as DataAdapterMode | undefined) || "mock-local";

function resolveMode(mode: DataAdapterMode): Exclude<DataAdapterMode, "api"> {
  if (mode === "api") {
    // API adapters are intentionally not wired yet. This keeps frontend behavior
    // stable while preserving a clean swap point for backend integration later.
    return "mock-local";
  }
  return "mock-local";
}

export const dataAdapterMode = resolveMode(configuredMode);

export const repositoryFactory = {
  wallet: walletRepository,
  finance: financeRepository,
  community: communityRepository,
  resources: resourcesRepository,
  funds: fundsRepository,
  counseling: counselingRepository,
  noticeboard: mockNoticeRepository,
  events: eventsRepository,
} as const;

