import React, { useEffect, useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, HeartHandshake, Plus, ShoppingBag, Wallet as WalletIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appendWalletTransaction, faithMartWalletUrl, getWalletByRole } from "@/data/wallet";
import { getFinanceLedgerEntries } from "@/data/financeLedger";
import { routes } from "@/constants/routes";
import type { WalletRole, WalletTransaction, WalletTransactionType } from "@/types/wallet";
import type { FinanceLedgerEntry } from "@/types/finance";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function transactionLabel(type: WalletTransactionType) {
  if (type === "add_funds") return "Add funds";
  if (type === "withdraw") return "Withdraw";
  if (type === "donation") return "Donation";
  if (type === "purchase") return "Purchase";
  return "Earning";
}

function transactionBadgeClass(transaction: WalletTransaction) {
  if (transaction.type === "earning" || transaction.type === "add_funds") {
    return "fh-pill fh-pill-emerald";
  }
  if (transaction.type === "purchase" || transaction.type === "donation") {
    return "fh-pill fh-pill-slate";
  }
  return "fh-pill";
}

function transactionPrefix(type: WalletTransactionType) {
  if (type === "earning" || type === "add_funds") return "+";
  return "-";
}

export default function FaithHubWallet() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const walletRole: WalletRole = role === "provider" ? "provider" : "user";
  const isProvider = walletRole === "provider";

  const [amountInput, setAmountInput] = useState("25");
  const [wallet, setWallet] = useState(() => getWalletByRole(walletRole));
  const [ledgerEntries, setLedgerEntries] = useState<FinanceLedgerEntry[]>(() =>
    getFinanceLedgerEntries().filter((entry) => entry.wallet_role === walletRole),
  );

  useEffect(() => {
    setWallet(getWalletByRole(walletRole));
    setLedgerEntries(getFinanceLedgerEntries().filter((entry) => entry.wallet_role === walletRole));
  }, [walletRole]);

  const amountValue = useMemo(() => Number(amountInput), [amountInput]);

  const applyTransaction = (
    type: WalletTransactionType,
    source: WalletTransaction["source"],
  ) => {
    if (!Number.isFinite(amountValue) || amountValue <= 0) return;
    setWallet(
      appendWalletTransaction(walletRole, {
        type,
        amount: amountValue,
        source,
      }),
    );
    setLedgerEntries(getFinanceLedgerEntries().filter((entry) => entry.wallet_role === walletRole));
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Finance</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">FaithHub Wallet</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Manage your wallet balance, review transaction activity, and connect spending or payouts across FaithHub.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">{isProvider ? "Provider wallet" : "User wallet"}</Badge>
                <Badge className="fh-pill fh-pill-slate">{wallet.transactions.length} transactions</Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">Current balance</div>
              <div className="mt-1 text-3xl font-bold text-[var(--text-primary)]">{formatCurrency(wallet.balance)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Wallet actions</div>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Add funds, withdraw, and keep wallet activity aligned with giving, FaithMart purchases, and payouts.
            </p>

            <label className="fh-user-filter mt-3">
              Amount
              <input
                type="number"
                min={1}
                step="0.01"
                value={amountInput}
                onChange={(event) => setAmountInput(event.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
              />
            </label>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button className="fh-user-primary-btn" onClick={() => applyTransaction("add_funds", "wallet")}>
                <Plus className="mr-1.5 h-4 w-4" />
                Add funds
              </Button>
              <Button variant="outline" className="fh-user-secondary-btn" onClick={() => applyTransaction("withdraw", "wallet")}>
                <ArrowDownLeft className="mr-1.5 h-4 w-4" />
                Withdraw
              </Button>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {isProvider ? (
                <>
                  <Button
                    variant="outline"
                    className="fh-user-secondary-btn"
                    onClick={() => applyTransaction("earning", "provider_payout")}
                  >
                    <ArrowUpRight className="mr-1.5 h-4 w-4" />
                    Record earning
                  </Button>
                  <Button
                    variant="outline"
                    className="fh-user-secondary-btn"
                    onClick={() => navigate(routes.app.provider.funds)}
                  >
                    <WalletIcon className="mr-1.5 h-4 w-4" />
                    Open payouts
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="fh-user-secondary-btn"
                    onClick={() => {
                      applyTransaction("donation", "giving");
                      navigate(routes.app.user.giving);
                    }}
                  >
                    <HeartHandshake className="mr-1.5 h-4 w-4" />
                    Donate from wallet
                  </Button>
                  <Button
                    variant="outline"
                    className="fh-user-secondary-btn"
                    onClick={() => {
                      applyTransaction("purchase", "faithmart");
                      window.open(faithMartWalletUrl, "_blank", "noopener,noreferrer");
                    }}
                  >
                    <ShoppingBag className="mr-1.5 h-4 w-4" />
                    Buy in FaithMart
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Transaction activity</div>
            <div className="mt-3 space-y-2">
              {wallet.transactions.length > 0 ? (
                wallet.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <Badge className={transactionBadgeClass(transaction)}>
                          {transactionLabel(transaction.type)}
                        </Badge>
                        <span className="text-xs text-[var(--text-secondary)]">{formatDate(transaction.date)}</span>
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {transactionPrefix(transaction.type)}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-[var(--text-secondary)]">
                      Source: {transaction.source.replace("_", " ")} - Status: {transaction.status}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] px-3 py-5 text-sm text-[var(--text-secondary)]">
                  No transactions yet. Start by adding funds or recording activity.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="text-base font-semibold text-[var(--text-primary)]">Unified finance log</div>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Central ledger across wallet, giving, FaithMart purchases, and provider payouts.
          </p>
          <div className="mt-3 space-y-2">
            {ledgerEntries.length ? (
              ledgerEntries.slice(0, 10).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                      {entry.channel.replace("_", " ")}
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {entry.direction === "debit" ? "-" : "+"}
                      {formatCurrency(entry.amount)}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">
                    {entry.note} - {formatDate(entry.timestamp)}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-[var(--border)] px-3 py-4 text-sm text-[var(--text-secondary)]">
                No ledger records yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
