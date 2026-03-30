import type { WalletRole, WalletTransactionStatus, WalletTransactionType } from "@/types/wallet";

export type FinanceChannel = "wallet" | "giving" | "faithmart" | "provider_payout" | "pledge";
export type FinanceDirection = "debit" | "credit";

export interface FinanceLedgerEntry {
  id: string;
  timestamp: string;
  wallet_role: WalletRole;
  type: WalletTransactionType | "pledge_payment";
  direction: FinanceDirection;
  amount: number;
  status: WalletTransactionStatus;
  channel: FinanceChannel;
  source: string;
  reference_id: string | null;
  note: string;
}

