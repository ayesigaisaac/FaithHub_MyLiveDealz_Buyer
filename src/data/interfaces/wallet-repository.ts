import type { Wallet, WalletRole } from "@/types/wallet";

export type WalletStore = {
  user: Wallet;
  provider: Wallet;
};

export interface WalletRepository {
  getStore(): WalletStore;
  saveStore(store: WalletStore): void;
  getWallet(role: WalletRole): Wallet;
  saveWallet(role: WalletRole, wallet: Wallet): void;
}

