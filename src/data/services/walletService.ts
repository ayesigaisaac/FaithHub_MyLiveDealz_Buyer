import { repositoryFactory } from "@/data/repositories/factory";
import { readWalletStoreSync, writeWalletStoreSync } from "@/data/repositories/walletRepository";
import { simulateLatency } from "@/data/services/runtime";
import type {
  Wallet,
  WalletRole,
  WalletTransaction,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@/types/wallet";

function sortTransactions(transactions: WalletTransaction[]) {
  return transactions.slice().sort((a, b) => b.date.localeCompare(a.date));
}

function applyBalanceDelta(wallet: Wallet, transaction: WalletTransaction) {
  if (transaction.status !== "completed") return wallet.balance;
  if (transaction.type === "donation" || transaction.type === "purchase" || transaction.type === "withdraw") {
    return Math.max(0, wallet.balance - transaction.amount);
  }
  return wallet.balance + transaction.amount;
}

export function getWalletSync(role: WalletRole): Wallet {
  const store = readWalletStoreSync();
  const wallet = store[role];
  return {
    ...wallet,
    transactions: sortTransactions(wallet.transactions),
  };
}

export function saveWalletSync(role: WalletRole, wallet: Wallet) {
  const store = readWalletStoreSync();
  store[role] = {
    ...wallet,
    transactions: sortTransactions(wallet.transactions),
  };
  writeWalletStoreSync(store);
  return store[role];
}

export function appendTransactionSync(
  role: WalletRole,
  input: {
    type: WalletTransactionType;
    amount: number;
    status?: WalletTransactionStatus;
    source?: WalletTransaction["source"];
  },
) {
  const current = getWalletSync(role);
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

  saveWalletSync(role, nextWallet);
  return nextWallet;
}

export async function getWallet(role: WalletRole) {
  await simulateLatency();
  return repositoryFactory.wallet.getWallet(role);
}

export async function getWalletStore() {
  await simulateLatency();
  return repositoryFactory.wallet.getStore();
}

