import React, { useMemo, useState } from "react";
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
  const [pickerOpen, setPickerOpen] = useState(false);

  const activeFunds = useMemo(() => {
    if (role === "admin") return null;
    return (
      role === "provider"
        ? getActiveFunds(fundDefaults.providerId)
        : getActiveFunds()
    );
  }, [role]);
  const activeFund = activeFunds?.[0] || null;

  if (!activeFund) return null;

  const progress = Math.min(
    100,
    Math.round((activeFund.current_amount / Math.max(1, activeFund.target_amount)) * 100),
  );

  const resolvePath = (slug: string) =>
    role === "provider"
      ? routes.app.provider.fundDetailBySlug(slug)
      : routes.app.user.fundDetailBySlug(slug);

  return (
    <>
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
          <Button
            className="fh-user-primary-btn"
            onClick={() => {
              if ((activeFunds?.length || 0) <= 1) {
                navigate(resolvePath(activeFund.slug));
                return;
              }
              setPickerOpen(true);
            }}
            data-no-nav
          >
            <HandHeart className="mr-1.5 h-4 w-4" />
            Give & Support
          </Button>
        </CardContent>
      </Card>

      {pickerOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(2,6,23,0.58)] p-4" data-no-nav>
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-[var(--text-primary)]">Select fund to support</div>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)]"
              >
                Close
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {(activeFunds || []).map((fund) => (
                <button
                  key={fund.id}
                  type="button"
                  onClick={() => {
                    navigate(resolvePath(fund.slug));
                    setPickerOpen(false);
                  }}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left transition hover:border-[rgba(3,205,140,0.34)]"
                >
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{fund.title}</div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">
                    {currency(fund.current_amount)} of {currency(fund.target_amount)} raised
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
