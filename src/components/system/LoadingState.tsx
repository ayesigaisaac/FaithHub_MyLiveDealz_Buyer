import React from "react";
import { LoaderCircle } from "lucide-react";

export default function LoadingState({
  title = "Loading",
  message = "Preparing your content...",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="fh-surface-card rounded-2xl p-8 text-center">
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
        <LoaderCircle className="h-5 w-5 animate-spin" />
      </div>
      <div className="text-base font-semibold text-[var(--text-primary)]">{title}</div>
      <div className="mt-1 text-sm text-[var(--text-secondary)]">{message}</div>
    </div>
  );
}

