import React from "react";
import { Button } from "@/components/ui/button";
import type { QuickAction } from "@/pages/user/shared/userPage.types";

type UserActionBarProps = {
  actions: QuickAction[];
};

export default function UserActionBar({ actions }: UserActionBarProps) {
  if (!actions.length) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 px-2.5 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden">
      <div className="flex w-full min-w-0 items-center gap-2 overflow-x-auto pb-0.5">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || "outline"}
            uiSize="sm"
            onClick={action.onClick}
            disabled={action.disabled}
            data-action-label={action.dataActionLabel}
            data-action-id={action.dataActionId}
            className="min-w-[128px] shrink-0 justify-center whitespace-nowrap rounded-xl border-slate-200 bg-white px-3"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
