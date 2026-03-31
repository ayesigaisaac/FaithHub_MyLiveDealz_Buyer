import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  HeartHandshake,
  Lock,
  Receipt,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/AuthContext";
import {
  DashboardActionItem,
  DashboardSectionHeader,
  DashboardStatCard,
} from "@/components/dashboard";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import type { DonationMode, GivingFund } from "@/pages/user/giving/types";
import { getActiveFunds, donateToFundFromWallet } from "@/data/funds";

function compactCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function memberIdFromName(name: string) {
  return `member-${name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "anonymous"}`;
}

export default function FaithHubGiving() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const givingFunds = useMemo<GivingFund[]>(() => {
    const funds = getActiveFunds();
    return funds.map((fund, index) => ({
      id: index + 1,
      fundId: fund.id,
      slug: fund.slug,
      title: fund.title,
      description: fund.description,
      raised: compactCurrency(fund.current_amount),
      goal: compactCurrency(fund.target_amount),
      progress: Math.min(
        100,
        Math.round(
          (fund.current_amount / Math.max(1, fund.target_amount)) * 100
        )
      ),
    }));
  }, []);

  const [selectedFundId, setSelectedFundId] = useState<number>(
    givingFunds[0]?.id || 0
  );
  const [amount, setAmount] = useState("25");
  const [mode, setMode] = useState<DonationMode>("One-time");
  const [receiptEmail, setReceiptEmail] = useState("naomi@faithhub.com");
  const [offlineMode, setOfflineMode] = useState(false);
  const [supporterTier, setSupporterTier] = useState(true);
  const [walletMessage, setWalletMessage] = useState("");

  const selectedFund = useMemo(
    () =>
      givingFunds.find((f) => f.id === selectedFundId) ||
      givingFunds[0] ||
      null,
    [selectedFundId, givingFunds]
  );

  const parsedAmount = useMemo(() => {
    const val = Number(amount);
    return Number.isFinite(val) && val > 0 ? val : 0;
  }, [amount]);

  const openFund = (fund: GivingFund) => {
    navigate(`/fund/${fund.slug}`);
  };

  const handleWalletContribution = () => {
    if (!parsedAmount) {
      setWalletMessage("Enter a valid amount.");
      return;
    }

    donateToFundFromWallet({
      fund_id: selectedFund.fundId,
      user_id: memberIdFromName(user?.name || "member"),
      amount: parsedAmount,
      wallet_role: "user",
    });

    setWalletMessage(`Contribution sent to ${selectedFund.title}`);
    setAmount("25"); // reset for UX
  };

  if (!selectedFund) {
    return (
      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-6 text-sm text-[var(--text-secondary)]">
          No active funds available.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <Card className="fh-interactive-card rounded-[24px]">
        <CardContent className="p-5">
          <h2 className="text-2xl font-bold">FaithHub Giving</h2>

          <div className="mt-3 flex gap-2">
            <Badge>{selectedFund.title}</Badge>
            <Badge>Mode: {mode}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* FUND SELECTOR */}
      <Card>
        <CardContent className="p-4">
          {givingFunds.map((fund) => (
            <div key={fund.id} className="mb-2">
              <button
                onClick={() => setSelectedFundId(fund.id)}
                className="w-full text-left"
              >
                {fund.title}
              </button>

              <button onClick={() => openFund(fund)}>Open</button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* PAYMENT */}
      <Card>
        <CardContent className="p-4">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button onClick={handleWalletContribution}>
            Contribute from wallet
          </Button>

          {walletMessage && <div>{walletMessage}</div>}
        </CardContent>
      </Card>
    </div>
  );
}