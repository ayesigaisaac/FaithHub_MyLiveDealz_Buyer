export type WalletRole = "user" | "provider";

export type WalletTransactionType =
  | "donation"
  | "purchase"
  | "earning"
  | "add_funds"
  | "withdraw";

export type WalletTransactionStatus = "completed" | "pending" | "failed";

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  amount: number;
  status: WalletTransactionStatus;
  date: string;
  source: "giving" | "faithmart" | "provider_payout" | "wallet";
}

export interface Wallet {
  user_id: string;
  balance: number;
  transactions: WalletTransaction[];
}

