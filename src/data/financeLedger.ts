import type { FinanceLedgerEntry } from "@/types/finance";
import type { WalletRole, WalletTransaction, WalletTransactionType } from "@/types/wallet";

const FINANCE_LEDGER_STORAGE_KEY = "faithhub.finance.ledger.v1";

const debitTypes = new Set<WalletTransactionType | "pledge_payment">([
  "donation",
  "purchase",
  "withdraw",
  "pledge_payment",
]);

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeAmount(value: number) {
  return Number(value.toFixed(2));
}

function parseLedger(raw: string | null) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is FinanceLedgerEntry => {
      if (!entry || typeof entry !== "object") return false;
      const ledgerEntry = entry as FinanceLedgerEntry;
      return Boolean(
        ledgerEntry.id &&
          ledgerEntry.timestamp &&
          ledgerEntry.wallet_role &&
          ledgerEntry.type &&
          typeof ledgerEntry.amount === "number",
      );
    });
  } catch {
    return [];
  }
}

function writeLedger(entries: FinanceLedgerEntry[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(FINANCE_LEDGER_STORAGE_KEY, JSON.stringify(entries));
}

function readLedger() {
  if (!isBrowser()) return [];
  return parseLedger(window.localStorage.getItem(FINANCE_LEDGER_STORAGE_KEY));
}

function sortLedger(entries: FinanceLedgerEntry[]) {
  return entries.slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function getFinanceLedgerEntries() {
  return sortLedger(readLedger());
}

export function appendFinanceLedgerEntry(
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
  const next = sortLedger([entry, ...readLedger()]);
  writeLedger(next);
  return entry;
}

export function appendFinanceLedgerFromWallet(
  role: WalletRole,
  transaction: WalletTransaction,
  options?: {
    channel?: FinanceLedgerEntry["channel"];
    reference_id?: string | null;
    note?: string;
  },
) {
  const channel = options?.channel || transaction.source;
  return appendFinanceLedgerEntry({
    id: `ledger-${transaction.id}`,
    timestamp: transaction.date,
    wallet_role: role,
    type: transaction.type,
    amount: transaction.amount,
    status: transaction.status,
    channel,
    source: transaction.source,
    reference_id: options?.reference_id ?? null,
    note: options?.note || `${transaction.type} from ${transaction.source.replace("_", " ")}`,
  });
}

