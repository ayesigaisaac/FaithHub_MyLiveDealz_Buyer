import { readJson, writeJson } from "@/data/adapters/storage";
import type { WalletRepository, WalletStore } from "@/data/interfaces/wallet-repository";
import type { Wallet, WalletRole } from "@/types/wallet";

const STORAGE_KEY = "faithhub.wallet.v1";

export const seedWalletStore: WalletStore = {
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

function isWallet(candidate: unknown): candidate is Wallet {
  if (!candidate || typeof candidate !== "object") return false;
  const wallet = candidate as Wallet;
  return (
    typeof wallet.user_id === "string" &&
    typeof wallet.balance === "number" &&
    Array.isArray(wallet.transactions)
  );
}

function reviveStore(value: unknown): WalletStore | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<WalletStore>;
  if (!isWallet(candidate.user) || !isWallet(candidate.provider)) return null;
  return {
    user: candidate.user,
    provider: candidate.provider,
  };
}

export function readWalletStoreSync() {
  return readJson(STORAGE_KEY, seedWalletStore, reviveStore);
}

export function writeWalletStoreSync(store: WalletStore) {
  writeJson(STORAGE_KEY, store);
}

class MockWalletRepository implements WalletRepository {
  async getStore() {
    return readWalletStoreSync();
  }

  async saveStore(store: WalletStore) {
    writeWalletStoreSync(store);
    return readWalletStoreSync();
  }

  async getWallet(role: WalletRole) {
    const store = readWalletStoreSync();
    return store[role];
  }

  async saveWallet(role: WalletRole, wallet: Wallet) {
    const store = readWalletStoreSync();
    store[role] = wallet;
    writeWalletStoreSync(store);
    return store[role];
  }
}

export const walletRepository: WalletRepository = new MockWalletRepository();

