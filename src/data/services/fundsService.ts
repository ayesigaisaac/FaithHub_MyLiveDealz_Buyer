import { repositoryFactory } from "@/data/repositories/factory";
import { readFundsStoreSync, writeFundsStoreSync } from "@/data/repositories/fundsRepository";
import { simulateLatency } from "@/data/services/runtime";
import type { FundsStore } from "@/data/interfaces/funds-repository";

export function getFundsStoreSync() {
  return readFundsStoreSync();
}

export function saveFundsStoreSync(store: FundsStore) {
  writeFundsStoreSync(store);
  return readFundsStoreSync();
}

export async function getFundsStore() {
  await simulateLatency();
  return repositoryFactory.funds.getStore();
}

export async function saveFundsStore(store: FundsStore) {
  await simulateLatency();
  return repositoryFactory.funds.saveStore(store);
}

