import type {
  Wallet,
  WalletRole,
  WalletTransaction,
  WalletTransactionStatus,
  WalletTransactionType,
} from "@/types/wallet";
import { appendFinanceLedgerFromWallet } from "@/data/financeLedger";
import type { FinanceChannel } from "@/types/finance";
import { appendTransactionSync, getWalletSync, saveWalletSync } from "@/data/services/walletService";

export const faithMartWalletUrl =
  (import.meta.env.VITE_FAITHMART_URL as string | undefined) || "https://faithmart.app";

export function getWalletByRole(role: WalletRole) {
  return getWalletSync(role);
}

export function saveWalletByRole(role: WalletRole, wallet: Wallet) {
  saveWalletSync(role, wallet);
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
  const amount = Number(input.amount);
  if (!Number.isFinite(amount) || amount <= 0) return getWalletByRole(role);

  const current = getWalletByRole(role);
  const nextWallet = appendTransactionSync(role, {
    type: input.type,
    amount,
    status: input.status,
    source: input.source,
  });
  const transaction = nextWallet.transactions.find((item) => !current.transactions.some((tx) => tx.id === item.id));
  if (transaction) {
    appendFinanceLedgerFromWallet(role, transaction, input.ledger);
  }
  return nextWallet;
}

export function processWalletPurchase(
  role: WalletRole,
  input: {
    amount: number;
    source?: WalletTransaction["source"];
  },
) {
  const amount = Number(input.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      ok: false as const,
      reason: "invalid_amount" as const,
      wallet: getWalletByRole(role),
    };
  }

  const current = getWalletByRole(role);
  if (current.balance < amount) {
    return {
      ok: false as const,
      reason: "insufficient_funds" as const,
      wallet: current,
    };
  }

  const nextWallet = appendWalletTransaction(role, {
    type: "purchase",
    amount,
    source: input.source || "faithmart",
  });

  return {
    ok: true as const,
    wallet: nextWallet,
  };
}
