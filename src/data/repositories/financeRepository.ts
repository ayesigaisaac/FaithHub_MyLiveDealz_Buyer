import { readJson, writeJson } from "@/data/adapters/storage";
import type { FinanceRepository } from "@/data/interfaces/finance-repository";
import type { FinanceLedgerEntry } from "@/types/finance";

const STORAGE_KEY = "faithhub.finance.ledger.v1";

function isLedgerEntry(candidate: unknown): candidate is FinanceLedgerEntry {
  if (!candidate || typeof candidate !== "object") return false;
  const entry = candidate as FinanceLedgerEntry;
  return Boolean(
    entry.id &&
      entry.timestamp &&
      entry.wallet_role &&
      entry.type &&
      typeof entry.amount === "number" &&
      entry.status,
  );
}

function reviveLedger(value: unknown): FinanceLedgerEntry[] | null {
  if (!Array.isArray(value)) return [];
  return value.filter(isLedgerEntry);
}

export function readFinanceLedgerSync() {
  return readJson(STORAGE_KEY, [] as FinanceLedgerEntry[], reviveLedger);
}

export function writeFinanceLedgerSync(entries: FinanceLedgerEntry[]) {
  writeJson(STORAGE_KEY, entries);
}

class MockFinanceRepository implements FinanceRepository {
  async getLedgerEntries() {
    return readFinanceLedgerSync();
  }

  async saveLedgerEntries(entries: FinanceLedgerEntry[]) {
    writeFinanceLedgerSync(entries);
    return readFinanceLedgerSync();
  }
}

export const financeRepository: FinanceRepository = new MockFinanceRepository();

