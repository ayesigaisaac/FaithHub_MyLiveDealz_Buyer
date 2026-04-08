import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  HeartHandshake,
  Lock,
  Receipt,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/auth/AuthContext";
import { DashboardSectionHeader, DashboardStatCard } from "@/components/dashboard";
import { routes } from "@/constants/routes";
import { getActiveFunds, donateToFundFromWallet } from "@/data/funds";
import { trackEvent } from "@/data/tracker";
import DonationModeToggle from "@/pages/user/giving/components/DonationModeToggle";
import FundSelector from "@/pages/user/giving/components/FundSelector";
import GivingHero from "@/pages/user/giving/components/GivingHero";
import GivingTrustPanel from "@/pages/user/giving/components/GivingTrustPanel";
import PaymentSummaryCard from "@/pages/user/giving/components/PaymentSummaryCard";
import type { DonationMode, GivingFund } from "@/pages/user/giving/types";
import UserActionBar from "@/pages/user/shared/UserActionBar";

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
  const { role, user } = useAuth();
  const [fundRefreshToken, setFundRefreshToken] = useState(0);
  const [activeTab, setActiveTab] = useState<"giving" | "charity">("giving");

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
  }, [fundRefreshToken]);

  const [selectedFundId, setSelectedFundId] = useState<number>(
    givingFunds[0]?.id || 0
  );
  const [amount, setAmount] = useState("25");
  const [mode, setMode] = useState<DonationMode>("One-time");
  const [receiptEmail, setReceiptEmail] = useState(
    user?.email || "member@faithhub.app"
  );
  const [offlineMode, setOfflineMode] = useState(false);
  const [supporterTier, setSupporterTier] = useState(true);
  const [walletMessage, setWalletMessage] = useState("");
  const charityCategories = ["Education", "Health", "Relief", "Orphans", "Water", "Disaster Care"];

  const charityCauses = useMemo(
    () =>
      givingFunds.slice(0, 6).map((fund, index) => ({
        fundId: fund.id,
        title: fund.title,
        description: fund.description,
        category: charityCategories[index % charityCategories.length],
        progress: fund.progress,
      })),
    [givingFunds],
  );

  useEffect(() => {
    if (!givingFunds.length) return;
    if (!givingFunds.some((fund) => fund.id === selectedFundId)) {
      setSelectedFundId(givingFunds[0].id);
    }
  }, [givingFunds, selectedFundId]);

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

  const openSelectedFund = () => {
    if (!selectedFund) return;
    const path = routes.app.user.fundDetailBySlug(selectedFund.slug);
    trackEvent(
      "NAVIGATE_PAGE",
      {
        from: routes.app.user.giving,
        to: path,
        source: "giving-selected-fund",
      },
      { role }
    );
    navigate(path);
  };

  const openWallet = () => {
    trackEvent(
      "NAVIGATE_PAGE",
      {
        from: routes.app.user.giving,
        to: routes.app.user.wallet,
        source: "giving-wallet-shortcut",
      },
      { role }
    );
    navigate(routes.app.user.wallet);
  };

  const handleWalletContribution = () => {
    if (!selectedFund) return;
    if (!parsedAmount) {
      setWalletMessage("Enter a valid amount.");
      return;
    }

    if (offlineMode) {
      setWalletMessage(
        "Offline mode is active. Your giving intent has been queued and will complete when you go online."
      );
      trackEvent(
        "CLICK_BUTTON",
        {
          id: "giving-queue-intent",
          label: "Queue giving intent",
          location: routes.app.user.giving,
        },
        { role }
      );
      return;
    }

    donateToFundFromWallet({
      fund_id: selectedFund.fundId,
      user_id: memberIdFromName(user?.name || "member"),
      amount: parsedAmount,
      wallet_role: "user",
    });
    trackEvent(
      "GIVE_DONATION",
      {
        fundId: selectedFund.fundId,
        amount: parsedAmount,
        mode: mode === "One-time" ? "one-time" : "recurring",
      },
      { role },
    );

    setWalletMessage(`Contribution sent to ${selectedFund.title}.`);
    setAmount("25");
    setFundRefreshToken((prev) => prev + 1);
  };

  if (!selectedFund) {
    return (
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="space-y-4 p-6">
          <div className="text-sm text-[var(--text-secondary)]">
            No active funds available right now.
          </div>
          <Button className="fh-user-primary-btn" onClick={openWallet}>
            <Wallet className="h-4 w-4" />
            Open wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  const quickActions = [
    {
      id: "giving-mobile-wallet",
      label: "Open Wallet",
      onClick: openWallet,
      icon: <Wallet className="h-4 w-4" />,
      variant: "outline" as const,
      dataActionLabel: "Open wallet",
      dataActionId: "open-wallet",
    },
    {
      id: "giving-mobile-fund",
      label: "Fund Details",
      onClick: openSelectedFund,
      icon: <Sparkles className="h-4 w-4" />,
      variant: "outline" as const,
      dataActionLabel: "Open fund details",
    },
    {
      id: "giving-mobile-contribute",
      label: "Contribute",
      onClick: handleWalletContribution,
      icon: <HeartHandshake className="h-4 w-4" />,
      dataActionLabel: "Contribute from wallet",
      dataActionId: "give-now",
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <GivingHero
          offlineMode={offlineMode}
          onToggleOfflineMode={() => setOfflineMode((prev) => !prev)}
        />

        <Card className="fh-surface-card rounded-[24px]">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-wrap gap-2">
              {(["giving", "charity"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "border-[rgba(3,205,140,0.34)] bg-[rgba(3,205,140,0.16)] text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
                    }`}
                  >
                    {tab === "giving" ? "Giving" : "Charity"}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {activeTab === "charity" ? (
          <>
            <Card className="fh-surface-card rounded-[24px]">
              <CardContent className="p-5">
                <DashboardSectionHeader
                  title="Charity Causes"
                  subtitle="Support mission-driven causes with visible impact tracking."
                  action={
                    <Button
                      variant="outline"
                      className="fh-user-secondary-btn"
                      onClick={openSelectedFund}
                    >
                      <HeartHandshake className="h-4 w-4" />
                      View selected cause
                    </Button>
                  }
                />
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {charityCauses.map((cause) => (
                    <button
                      key={cause.fundId}
                      type="button"
                      onClick={() => setSelectedFundId(cause.fundId)}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left transition hover:border-[rgba(3,205,140,0.35)] hover:bg-[var(--accent-soft)]"
                    >
                      <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                        {cause.category}
                      </div>
                      <div className="mt-2 text-base font-semibold text-[var(--text-primary)]">{cause.title}</div>
                      <div className="mt-1 text-sm text-[var(--text-secondary)]">{cause.description}</div>
                      <div className="mt-3 text-xs text-[var(--text-secondary)]">Progress {cause.progress}%</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <DashboardStatCard
                label="ACTIVE CAUSES"
                value={`${charityCauses.length}`}
                hint="Active charity causes available for support."
                tone="slate"
                icon={<Sparkles className="h-4 w-4" />}
              />
              <DashboardStatCard
                label="SELECTED CAUSE"
                value={`${selectedFund.progress}%`}
                hint={`${selectedFund.raised} raised of ${selectedFund.goal}.`}
                tone="emerald"
                progress={selectedFund.progress}
                icon={<HeartHandshake className="h-4 w-4" />}
              />
              <DashboardStatCard
                label="CHARITY READINESS"
                value={offlineMode ? "Queued" : "Ready"}
                hint={offlineMode ? "Intent only while offline." : "Wallet contribution available."}
                tone={offlineMode ? "orange" : "emerald"}
                icon={offlineMode ? <Lock className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <DashboardStatCard
                label="ACTIVE FUNDS"
                value={`${givingFunds.length}`}
                hint="Open funds currently available for support."
                tone="slate"
                icon={<Sparkles className="h-4 w-4" />}
              />
              <DashboardStatCard
                label="SELECTED FUND"
                value={`${selectedFund.progress}%`}
                hint={`${selectedFund.raised} raised of ${selectedFund.goal}.`}
                tone="emerald"
                progress={selectedFund.progress}
                icon={<HeartHandshake className="h-4 w-4" />}
              />
              <DashboardStatCard
                label="GIVING READINESS"
                value={offlineMode ? "Queued" : "Ready"}
                hint={offlineMode ? "Intent only while offline." : "Wallet contribution available."}
                tone={offlineMode ? "orange" : "emerald"}
                icon={offlineMode ? <Lock className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              />
            </div>
          </>
        )}

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <FundSelector
              funds={givingFunds}
              selectedFundId={selectedFundId}
              onSelectFund={setSelectedFundId}
            />

            <Card className="fh-surface-card rounded-[24px]">
              <CardContent className="p-5">
                <DashboardSectionHeader
                  title={activeTab === "charity" ? "Selected Cause Overview" : "Selected Fund Overview"}
                  subtitle="Keep giving context visible while you complete your contribution."
                  action={
                    <Button
                      variant="outline"
                      className="fh-user-secondary-btn"
                      onClick={openSelectedFund}
                    >
                      <Sparkles className="h-4 w-4" />
                      Open fund details
                    </Button>
                  }
                />

                <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="text-lg font-semibold text-[var(--text-primary)]">
                    {selectedFund.title}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {selectedFund.description}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                      <div className="fh-label text-[var(--text-muted)]">Raised</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {selectedFund.raised}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                      <div className="fh-label text-[var(--text-muted)]">Goal</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {selectedFund.goal}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                      <div className="fh-label text-[var(--text-muted)]">Progress</div>
                      <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {selectedFund.progress}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <PaymentSummaryCard
              selectedFund={selectedFund}
              amount={amount}
              onAmountChange={setAmount}
              mode={mode}
              onModeChange={setMode}
              receiptEmail={receiptEmail}
              onReceiptEmailChange={setReceiptEmail}
            />

            <Card className="fh-surface-card rounded-[24px]">
              <CardContent className="p-5">
                <DashboardSectionHeader
                  title="Contribute From Wallet"
                  subtitle="Use your wallet balance to support the selected fund instantly."
                />

                <div className="space-y-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="fh-pill fh-pill-emerald">Mode: {mode}</span>
                      <span className="fh-pill fh-pill-slate">
                        Amount: {compactCurrency(parsedAmount || 0)}
                      </span>
                      <span className="fh-pill fh-pill-slate">
                        <Receipt className="mr-1 inline h-3.5 w-3.5" />
                        Receipt ready
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-[var(--text-secondary)]">
                      Receipt email: {receiptEmail || "Not set"}
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button
                      className="fh-user-primary-btn"
                      onClick={handleWalletContribution}
                      disabled={!parsedAmount}
                    >
                      <HeartHandshake className="h-4 w-4" />
                      Contribute from wallet
                    </Button>
                    <Button
                      variant="outline"
                      className="fh-user-secondary-btn"
                      onClick={openWallet}
                    >
                      <Wallet className="h-4 w-4" />
                      Open wallet
                    </Button>
                  </div>

                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      walletMessage
                        ? "border-[rgba(3,205,140,0.28)] bg-[rgba(3,205,140,0.1)] text-[var(--text-primary)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {walletMessage ||
                      "Ready to contribute. Use the controls above to complete your giving."}
                  </div>

                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <DonationModeToggle mode={mode} onChange={setMode} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <GivingTrustPanel
              supporterTier={supporterTier}
              onToggleSupporterTier={() => setSupporterTier((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <UserActionBar actions={quickActions} />
    </>
  );
}
