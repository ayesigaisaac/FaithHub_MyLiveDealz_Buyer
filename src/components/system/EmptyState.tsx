import React from "react";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  title = "Nothing here yet",
  message = "There are no items to display right now.",
  actionLabel,
  onAction,
}: {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="fh-surface-card rounded-2xl border border-dashed border-[var(--border)] p-8 text-center">
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--text-secondary)]">
        <Inbox className="h-5 w-5" />
      </div>
      <div className="text-base font-semibold text-[var(--text-primary)]">{title}</div>
      <div className="mx-auto mt-1 max-w-xl text-sm text-[var(--text-secondary)]">{message}</div>
      {actionLabel ? (
        <div className="mt-4">
          <Button variant="outline" className="fh-user-secondary-btn" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

