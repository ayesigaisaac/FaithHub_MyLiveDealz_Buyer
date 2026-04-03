import type { Fund, FundContribution, Pledge } from "@/types/funds";

export type FundsStore = {
  funds: Fund[];
  pledges: Pledge[];
  contributions: FundContribution[];
};

export interface FundsRepository {
  getStore(): Promise<FundsStore>;
  saveStore(store: FundsStore): Promise<FundsStore>;
}

