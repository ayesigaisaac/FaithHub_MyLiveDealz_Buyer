export type GivingFund = {
  id: number;
  fundId: string;
  slug: string;
  title: string;
  description: string;
  raised: string;
  goal: string;
  progress: number;
};

export type DonationMode = "One-time" | "Weekly" | "Monthly" | "Quarterly";
