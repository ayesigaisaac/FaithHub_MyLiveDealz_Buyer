import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createFund, fundDefaults } from "@/data/funds";
import { routes } from "@/constants/routes";
import type { FundType } from "@/types/funds";

export default function FaithHubFundCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("1000");
  const [fundType, setFundType] = useState<FundType>("crowdfunding");
  const [endDate, setEndDate] = useState("");

  const canCreate =
    title.trim().length > 2 &&
    description.trim().length > 8 &&
    Number.isFinite(Number(targetAmount)) &&
    Number(targetAmount) > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    const created = createFund({
      provider_id: fundDefaults.providerId,
      title,
      description,
      target_amount: Number(targetAmount),
      type: fundType,
      end_date: endDate || null,
    });
    navigate(routes.app.provider.fundDetailBySlug(created.slug));
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Provider Funds</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Create Fund</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Build one-time, crowdfunding, or recurring support campaigns for your community.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-emerald">Provider: {user?.name || "Provider Team"}</Badge>
                <Badge className="fh-pill fh-pill-slate">Wallet-enabled contributions</Badge>
              </div>
            </div>
            <Button variant="outline" className="fh-user-secondary-btn" onClick={() => navigate(routes.app.provider.funds)}>
              Back to funds
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-2">
            <label className="fh-user-filter">
              Fund title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Community Kitchen Expansion"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
              />
            </label>

            <label className="fh-user-filter">
              Target amount
              <input
                type="number"
                min={1}
                step="0.01"
                value={targetAmount}
                onChange={(event) => setTargetAmount(event.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
              />
            </label>

            <label className="fh-user-filter lg:col-span-2">
              Description
              <textarea
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Explain the mission, impact, and what this fund supports."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
              />
            </label>

            <label className="fh-user-filter">
              Fund type
              <select
                value={fundType}
                onChange={(event) => setFundType(event.target.value as FundType)}
                className="w-full"
              >
                <option value="one-time">One-time</option>
                <option value="crowdfunding">Crowdfunding</option>
                <option value="recurring">Recurring</option>
              </select>
            </label>

            <label className="fh-user-filter">
              End date (optional)
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <Button variant="outline" className="fh-user-secondary-btn" onClick={() => navigate(routes.app.provider.funds)}>
              Cancel
            </Button>
            <Button className="fh-user-primary-btn" onClick={handleCreate} disabled={!canCreate}>
              <PlusCircle className="mr-1.5 h-4 w-4" />
              Create fund
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
