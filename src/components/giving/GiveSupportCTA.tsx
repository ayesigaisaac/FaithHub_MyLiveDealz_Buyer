import React, { useMemo } from "react";
import { HandHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fundDefaults, getActiveFunds } from "@/data/funds";
import { routes } from "@/constants/routes";
import type { RoleKey } from "@/config/pageRegistry";

function currency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function GiveSupportCTA({ role }: { role: RoleKey }) {
  const navigate = useNavigate();

  const activeFund = useMemo(() => {
    if (role === "admin") return null;
    const funds =
      role === "provider"
        ? getActiveFunds(fundDefaults.providerId)
        : getActiveFunds();
    return funds[0] || null;
  }, [role]);

  if (!activeFund) return null;

  const progress = Math.min(
    100,
    Math.round((activeFund.current_amount / Math.max(1, activeFund.target_amount)) * 100),
  );

  const openPath =
    role === "provider"
      ? routes.app.provider.fundDetailBySlug(activeFund.slug)
      : routes.app.user.fundDetailBySlug(activeFund.slug);

  return (
    <Card className="fh-surface-card mb-4 rounded-2xl" data-no-nav>
      <CardContent className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
            Active Fund
          </div>
          <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
            {activeFund.title}
          </div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">
            {currency(activeFund.current_amount)} of {currency(activeFund.target_amount)} raised ({progress}%)
          </div>
        </div>
        <Button className="fh-user-primary-btn" onClick={() => navigate(openPath)} data-no-nav>
          <HandHeart className="mr-1.5 h-4 w-4" />
          Give & Support
        </Button>
      </CardContent>
    </Card>
  );
}
