import type { Wallet, WalletRole } from "@/types/wallet";

export type WalletStore = {
  user: Wallet;
  provider: Wallet;
};

export interface WalletRepository {
  getStore(): Promise<WalletStore>;
  saveStore(store: WalletStore): Promise<WalletStore>;
  getWallet(role: WalletRole): Promise<Wallet>;
  saveWallet(role: WalletRole, wallet: Wallet): Promise<Wallet>;
}
