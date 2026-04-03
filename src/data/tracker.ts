import type { Role } from "@/types/roles";
import type { WalletRole, WalletTransactionType } from "@/types/wallet";
import type { CommunityReaction } from "@/types/community";

export type AnalyticsEventName =
  | "NAVIGATE_PAGE"
  | "CLICK_BUTTON"
  | "GIVE_DONATION"
  | "WALLET_TRANSACTION"
  | "REACTION_ADDED"
  | "ROLE_SWITCH";

type AnalyticsPayloadMap = {
  NAVIGATE_PAGE: {
    to: string;
    from?: string;
    source?: string;
  };
  CLICK_BUTTON: {
    id: string;
    label?: string;
    location?: string;
  };
  GIVE_DONATION: {
    fundId: string;
    amount: number;
    mode?: "one-time" | "pledge" | "recurring";
  };
  WALLET_TRANSACTION: {
    walletRole: WalletRole;
    type: WalletTransactionType;
    amount: number;
    source: string;
  };
  REACTION_ADDED: {
    postId: string;
    reaction: CommunityReaction | "amen" | "pray" | "support";
  };
  ROLE_SWITCH: {
    fromRole: Role;
    toRole: Role;
    trigger?: "sidebar" | "access" | "profile" | "unknown";
  };
};

export type AnalyticsEvent<TName extends AnalyticsEventName = AnalyticsEventName> = {
  name: TName;
  timestamp: string;
  role: Role;
  payload: AnalyticsPayloadMap[TName];
};

type AnalyticsSink = (event: AnalyticsEvent) => void;

let sink: AnalyticsSink | null = null;

export function configureAnalyticsSink(nextSink: AnalyticsSink | null) {
  sink = nextSink;
}

export function trackEvent<TName extends AnalyticsEventName>(
  name: TName,
  payload: AnalyticsPayloadMap[TName],
  options?: { role?: Role; timestamp?: string },
): AnalyticsEvent<TName> {
  const event: AnalyticsEvent<TName> = {
    name,
    payload,
    role: options?.role || "user",
    timestamp: options?.timestamp || new Date().toISOString(),
  };

  if (sink) {
    sink(event);
    return event;
  }

  // Safe fallback while analytics service is not connected.
  // eslint-disable-next-line no-console
  console.log("[FaithHub analytics]", event);
  return event;
}

