import type { FinanceLedgerEntry } from "@/types/finance";

export interface FinanceRepository {
  getLedgerEntries(): Promise<FinanceLedgerEntry[]>;
  saveLedgerEntries(entries: FinanceLedgerEntry[]): Promise<FinanceLedgerEntry[]>;
}

