import type {
  Wallet,
  WalletRole,
  WalletTransaction,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@/types/wallet";
import { appendFinanceLedgerFromWallet } from "@/data/financeLedger";
import type { FinanceChannel } from "@/types/finance";

const STORAGE_KEY = "faithhub.wallet.v1";

type WalletStore = {
  user: Wallet;
  provider: Wallet;
};

export const faithMartWalletUrl =
  (import.meta.env.VITE_FAITHMART_URL as string | undefined) || "https://faithmart.app";

const seedWalletStore: WalletStore = {
  user: {
    user_id: "faithhub-user",
    balance: 248.75,
    transactions: [
      {
        id: "txn-u-001",
        type: "add_funds",
        amount: 300,
        status: "completed",
        date: "2026-03-24T10:15:00.000Z",
        source: "wallet",
      },
      {
        id: "txn-u-002",
        type: "donation",
        amount: 35,
        status: "completed",
        date: "2026-03-26T14:20:00.000Z",
        source: "giving",
      },
      {
        id: "txn-u-003",
        type: "purchase",
        amount: 16.25,
        status: "completed",
        date: "2026-03-28T08:05:00.000Z",
        source: "faithmart",
      },
    ],
  },
  provider: {
    user_id: "faithhub-provider",
    balance: 1284.4,
    transactions: [
      {
        id: "txn-p-001",
        type: "earning",
        amount: 950,
        status: "completed",
        date: "2026-03-20T11:00:00.000Z",
        source: "provider_payout",
      },
      {
        id: "txn-p-002",
        type: "earning",
        amount: 420,
        status: "completed",
        date: "2026-03-27T16:45:00.000Z",
        source: "provider_payout",
      },
      {
        id: "txn-p-003",
        type: "withdraw",
        amount: 85.6,
        status: "completed",
        date: "2026-03-29T09:30:00.000Z",
        source: "wallet",
      },
    ],
  },
};

function isBrowser() {
  return typeof window !== "undefined";
}

function isValidWallet(candidate: unknown): candidate is Wallet {
  if (!candidate || typeof candidate !== "object") return false;
  const wallet = candidate as Wallet;
  return (
    typeof wallet.user_id === "string" &&
    typeof wallet.balance === "number" &&
    Array.isArray(wallet.transactions)
  );
}

function parseStore(raw: string | null): WalletStore | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const source = parsed as Partial<WalletStore>;
    if (!isValidWallet(source.user) || !isValidWallet(source.provider)) return null;
    return source as WalletStore;
  } catch {
    return null;
  }
}

function readStore(): WalletStore {
  if (!isBrowser()) return seedWalletStore;
  return parseStore(window.localStorage.getItem(STORAGE_KEY)) || seedWalletStore;
}

function writeStore(store: WalletStore) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function sortTransactions(transactions: WalletTransaction[]) {
  return transactions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}

function applyBalanceDelta(wallet: Wallet, transaction: WalletTransaction) {
  if (transaction.status !== "completed") return wallet.balance;
  if (transaction.type === "donation" || transaction.type === "purchase" || transaction.type === "withdraw") {
    return Math.max(0, wallet.balance - transaction.amount);
  }
  return wallet.balance + transaction.amount;
}

export function getWalletByRole(role: WalletRole) {
  const store = readStore();
  const wallet = store[role];
  return {
    ...wallet,
    transactions: sortTransactions(wallet.transactions),
  };
}

export function saveWalletByRole(role: WalletRole, wallet: Wallet) {
  const store = readStore();
  store[role] = {
    ...wallet,
    transactions: sortTransactions(wallet.transactions),
  };
  writeStore(store);
}

export function appendWalletTransaction(
  role: WalletRole,
  input: {
    type: WalletTransactionType;
    amount: number;
    status?: WalletTransactionStatus;
    source?: WalletTransaction["source"];
    ledger?: {
      channel?: FinanceChannel;
      reference_id?: string | null;
      note?: string;
    };
  },
) {
  const current = getWalletByRole(role);
  const amount = Number(input.amount);
  if (!Number.isFinite(amount) || amount <= 0) return current;

  const transaction: WalletTransaction = {
    id: `txn-${role}-${Date.now()}`,
    type: input.type,
    amount: Number(amount.toFixed(2)),
    status: input.status || "completed",
    date: new Date().toISOString(),
    source: input.source || "wallet",
  };

  const nextWallet: Wallet = {
    ...current,
    balance: Number(applyBalanceDelta(current, transaction).toFixed(2)),
    transactions: sortTransactions([transaction, ...current.transactions]),
  };

  saveWalletByRole(role, nextWallet);
  appendFinanceLedgerFromWallet(role, transaction, input.ledger);
  return nextWallet;
}
