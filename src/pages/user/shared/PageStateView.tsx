import React from "react";
import { AlertTriangle, CloudOff, Inbox, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageStateKind } from "@/pages/user/shared/userPage.types";

type PageStateViewProps = {
  state: PageStateKind;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

const stateIcon = {
  loading: LoaderCircle,
  empty: Inbox,
  offline: CloudOff,
  error: AlertTriangle,
};

export default function PageStateView({
  state,
  title,
  message,
  actionLabel,
  onAction,
}: PageStateViewProps) {
  const Icon = stateIcon[state];

  return (
    <div className="fh-surface-card rounded-[28px] p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <Icon className={`h-5 w-5 ${state === "loading" ? "animate-spin" : ""}`} />
      </div>
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <div className="mx-auto mt-2 max-w-xl fh-body text-slate-500">{message}</div>
      {actionLabel ? (
        <div className="mt-5">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}

