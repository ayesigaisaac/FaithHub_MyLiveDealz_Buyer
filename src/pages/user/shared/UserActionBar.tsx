import React from "react";
import { Button } from "@/components/ui/button";
import type { QuickAction } from "@/pages/user/shared/userPage.types";

type UserActionBarProps = {
  actions: QuickAction[];
};

export default function UserActionBar({ actions }: UserActionBarProps) {
  if (!actions.length) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || "outline"}
            onClick={action.onClick}
            disabled={action.disabled}
            data-action-label={action.dataActionLabel}
            className="whitespace-nowrap rounded-xl border-slate-200 bg-white px-4"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
