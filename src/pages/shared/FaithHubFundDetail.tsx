import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, HandHeart, Handshake, TrendingUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createPledge,
  donateToFundFromWallet,
  getFundById,
  getFundBySlug,
  getFundPledges,
  getFundSupporters,
  payPledgeFromWallet,
} from "@/data/funds";
import { routes } from "@/constants/routes";
import type { Fund, Pledge } from "@/types/funds";
import type { WalletRole } from "@/types/wallet";

function currency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function toMemberId(name: string) {
  const token = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (!token) return "member-anonymous";
  return `member-${token}`;
}

function fundTypeLabel(type: Fund["type"]) {
  if (type === "one-time") return "One-time";
  if (type === "recurring") return "Recurring";
  return "Crowdfunding";
}

export default function FaithHubFundDetail() {
  const navigate = useNavigate();
  const { slug = "", fundId = "" } = useParams<{ slug?: string; fundId?: string }>();
  const { role, user } = useAuth();
  const fundKey = slug || fundId;

  const [fund, setFund] = useState<Fund | null>(() => getFundBySlug(fundKey) || getFundById(fundKey));
  const [pledges, setPledges] = useState<Pledge[]>(() => getFundPledges((getFundBySlug(fundKey) || getFundById(fundKey))?.id || fundKey));
  const [supporters, setSupporters] = useState(() => getFundSupporters((getFundBySlug(fundKey) || getFundById(fundKey))?.id || fundKey));

  const [donationAmount, setDonationAmount] = useState("25");
  const [pledgeAmount, setPledgeAmount] = useState("120");
  const [pledgePayAmount, setPledgePayAmount] = useState("30");
  const [selectedPledgeId, setSelectedPledgeId] = useState<string>("");

  const walletRole: WalletRole = role === "provider" ? "provider" : "user";
  const currentUserId = role === "provider" ? "provider-owner" : toMemberId(user?.name || "Member");

  const refreshFund = () => {
    const resolvedFund = getFundBySlug(fundKey) || getFundById(fundKey);
    setFund(resolvedFund);
    if (!resolvedFund) {
      setPledges([]);
      setSupporters([]);
      return;
    }
    setPledges(getFundPledges(resolvedFund.id));
    setSupporters(getFundSupporters(resolvedFund.id));
  };

  useEffect(() => {
    refreshFund();
  }, [fundKey]);

  const myPledges = useMemo(
    () => pledges.filter((pledge) => pledge.user_id === currentUserId),
    [pledges, currentUserId],
  );

  useEffect(() => {
    if (!myPledges.length) {
      setSelectedPledgeId("");
      return;
    }
    if (!selectedPledgeId || !myPledges.some((pledge) => pledge.id === selectedPledgeId)) {
      setSelectedPledgeId(myPledges[0].id);
    }
  }, [myPledges, selectedPledgeId]);

  if (!fund) {
    return (
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-6">
          <div className="text-xl font-semibold text-[var(--text-primary)]">Fund not found</div>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            This fund is not available anymore. Return to your giving workspace and choose another active campaign.
          </p>
          <div className="mt-4">
            <Button
              className="fh-user-primary-btn"
              onClick={() =>
                navigate(role === "provider" ? routes.app.provider.funds : routes.app.user.giving)
              }
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = Math.min(100, Math.round((fund.current_amount / Math.max(1, fund.target_amount)) * 100));

  const handleDonate = () => {
    donateToFundFromWallet({
      fund_id: fund.id,
      user_id: currentUserId,
      amount: Number(donationAmount),
      wallet_role: walletRole,
    });
    refreshFund();
  };

  const handleCreatePledge = () => {
    createPledge({
      user_id: currentUserId,
      fund_id: fund.id,
      pledged_amount: Number(pledgeAmount),
    });
    refreshFund();
  };

  const handlePayPledge = () => {
    if (!selectedPledgeId) return;
    payPledgeFromWallet({
      pledge_id: selectedPledgeId,
      user_id: currentUserId,
      amount: Number(pledgePayAmount),
      wallet_role: walletRole,
    });
    refreshFund();
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Fund Support</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">{fund.title}</h1>
              <p className="mt-2 max-w-3xl text-sm text-[var(--text-secondary)]">{fund.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">{fundTypeLabel(fund.type)}</Badge>
                <Badge className="fh-pill fh-pill-slate">Status: {fund.status}</Badge>
                {fund.end_date ? (
                  <Badge className="fh-pill fh-pill-slate">
                    Ends: {new Date(fund.end_date).toLocaleDateString()}
                  </Badge>
                ) : null}
              </div>
            </div>
            <Button
              variant="outline"
              className="fh-user-secondary-btn"
              onClick={() =>
                navigate(role === "provider" ? routes.app.provider.funds : routes.app.user.giving)
              }
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                {currency(fund.current_amount)} raised of {currency(fund.target_amount)}
              </div>
              <div className="text-xs font-semibold text-[var(--text-secondary)]">{progress}% funded</div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[color-mix(in_srgb,var(--border)_80%,transparent_20%)]">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Give & Support</div>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Support this fund instantly from wallet balance using direct giving or pledge commitments.
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="fh-user-filter">
                Give now amount
                <input
                  type="number"
                  min={1}
                  step="0.01"
                  value={donationAmount}
                  onChange={(event) => setDonationAmount(event.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                />
              </label>
              <div className="flex items-end">
                <Button className="fh-user-primary-btn w-full" onClick={handleDonate}>
                  <HandHeart className="mr-1.5 h-4 w-4" />
                  Give
                </Button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="fh-user-filter">
                Pledge amount
                <input
                  type="number"
                  min={1}
                  step="0.01"
                  value={pledgeAmount}
                  onChange={(event) => setPledgeAmount(event.target.value)}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                />
              </label>
              <div className="flex items-end">
                <Button variant="outline" className="fh-user-secondary-btn w-full" onClick={handleCreatePledge}>
                  <Handshake className="mr-1.5 h-4 w-4" />
                  Pledge
                </Button>
              </div>
            </div>

            {myPledges.length ? (
              <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Your pledges
                </div>
                <div className="mt-2 space-y-2">
                  {myPledges.map((pledge) => (
                    <button
                      key={pledge.id}
                      type="button"
                      onClick={() => setSelectedPledgeId(pledge.id)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                        selectedPledgeId === pledge.id
                          ? "border-[rgba(3,205,140,0.35)] bg-[var(--accent-soft)]"
                          : "border-[var(--border)] hover:bg-[var(--fh-elevated-surface)]"
                      }`}
                    >
                      <div className="font-semibold text-[var(--text-primary)]">
                        {currency(pledge.paid_amount)} / {currency(pledge.pledged_amount)}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">Status: {pledge.status}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                  <input
                    type="number"
                    min={1}
                    step="0.01"
                    value={pledgePayAmount}
                    onChange={(event) => setPledgePayAmount(event.target.value)}
                    className="h-10 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-sm"
                    placeholder="Amount to pay"
                  />
                  <Button className="fh-user-primary-btn" onClick={handlePayPledge}>
                    Pay pledge
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="text-base font-semibold text-[var(--text-primary)]">Supporters</div>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Community members backing this fund through donations and pledges.
            </p>
            <div className="mt-3 space-y-2">
              {supporters.length ? (
                supporters.map((supporter) => (
                  <div
                    key={supporter.user_id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{supporter.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{supporter.contributions} contributions</div>
                    </div>
                    <div className="mt-1 text-xs text-[var(--text-secondary)]">
                      Supported: {currency(supporter.total_supported)}
                      {supporter.pledged_total > 0 ? ` | Pledged: ${currency(supporter.pledged_total)}` : ""}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--border)] px-3 py-5 text-sm text-[var(--text-secondary)]">
                  No supporters yet. Be the first to support this fund.
                </div>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                <TrendingUp className="h-3.5 w-3.5" />
                Momentum
              </div>
              <div className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                {supporters.length} supporters | {pledges.length} pledges
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
