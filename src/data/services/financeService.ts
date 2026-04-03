import { repositoryFactory } from "@/data/repositories/factory";
import { readFinanceLedgerSync, writeFinanceLedgerSync } from "@/data/repositories/financeRepository";
import { simulateLatency } from "@/data/services/runtime";
import type { FinanceLedgerEntry } from "@/types/finance";
import type { WalletRole, WalletTransaction, WalletTransactionType } from "@/types/wallet";

const debitTypes = new Set<WalletTransactionType | "pledge_payment">([
  "donation",
  "purchase",
  "withdraw",
  "pledge_payment",
]);

function normalizeAmount(value: number) {
  return Number(value.toFixed(2));
}

function sortLedger(entries: FinanceLedgerEntry[]) {
  return entries.slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function getLedgerEntriesSync() {
  return sortLedger(readFinanceLedgerSync());
}

export function appendLedgerEntrySync(
  input: Omit<FinanceLedgerEntry, "id" | "timestamp" | "direction"> & {
    id?: string;
    timestamp?: string;
  },
) {
  const entry: FinanceLedgerEntry = {
    id: input.id || `ledger-${Date.now()}`,
    timestamp: input.timestamp || new Date().toISOString(),
    wallet_role: input.wallet_role,
    type: input.type,
    direction: debitTypes.has(input.type) ? "debit" : "credit",
    amount: normalizeAmount(Math.max(0, input.amount)),
    status: input.status,
    channel: input.channel,
    source: input.source,
    reference_id: input.reference_id ?? null,
    note: input.note,
  };
  const next = sortLedger([entry, ...readFinanceLedgerSync()]);
  writeFinanceLedgerSync(next);
  return entry;
}

export function appendLedgerFromWalletSync(
  role: WalletRole,
  transaction: WalletTransaction,
  options?: {
    channel?: FinanceLedgerEntry["channel"];
    reference_id?: string | null;
    note?: string;
  },
) {
  return appendLedgerEntrySync({
    id: `ledger-${transaction.id}`,
    timestamp: transaction.date,
    wallet_role: role,
    type: transaction.type,
    amount: transaction.amount,
    status: transaction.status,
    channel: options?.channel || transaction.source,
    source: transaction.source,
    reference_id: options?.reference_id ?? null,
    note: options?.note || `${transaction.type} from ${transaction.source.replace("_", " ")}`,
  });
}

export async function getLedgerEntries() {
  await simulateLatency();
  const entries = await repositoryFactory.finance.getLedgerEntries();
  return sortLedger(entries);
}

