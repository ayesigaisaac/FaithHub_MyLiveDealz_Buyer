export type FundType = "one-time" | "crowdfunding" | "recurring";
export type FundStatus = "draft" | "active" | "closed";

export interface Fund {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  type: FundType;
  status: FundStatus;
  created_at: string;
  end_date?: string | null;
}

export type PledgeStatus = "pending" | "partial" | "completed";

export interface Pledge {
  id: string;
  user_id: string;
  fund_id: string;
  pledged_amount: number;
  paid_amount: number;
  status: PledgeStatus;
  created_at: string;
}

export interface FundContribution {
  id: string;
  user_id: string;
  fund_id: string;
  amount: number;
  created_at: string;
  source: "wallet";
  type: "donation" | "pledge_payment";
}

export interface FundSupporter {
  user_id: string;
  name: string;
  total_supported: number;
  pledged_total: number;
  contributions: number;
}

