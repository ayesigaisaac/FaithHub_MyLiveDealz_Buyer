import { appendWalletTransaction } from "@/data/wallet";
import type {
  Fund,
  FundContribution,
  FundSupporter,
  FundType,
  Pledge,
  PledgeStatus,
} from "@/types/funds";
import type { WalletRole } from "@/types/wallet";

const STORAGE_KEY = "faithhub.funds.v1";

type FundStore = {
  funds: Fund[];
  pledges: Pledge[];
  contributions: FundContribution[];
};

const defaultProviderId = "faithhub-provider";

const seedStore: FundStore = {
  funds: [
    {
      id: "fund-community-kitchen",
      provider_id: defaultProviderId,
      title: "Community Kitchen Expansion",
      description:
        "Support kitchen upgrades, weekly meal distribution, and volunteer coordination for vulnerable families.",
      target_amount: 5000,
      current_amount: 1825,
      type: "crowdfunding",
      status: "active",
      created_at: "2026-03-15T10:00:00.000Z",
      end_date: "2026-06-30T23:59:59.000Z",
    },
    {
      id: "fund-studio-upgrade",
      provider_id: defaultProviderId,
      title: "Live Studio Equipment",
      description:
        "Fund camera, audio, and streaming reliability upgrades for better worship and teaching broadcasts.",
      target_amount: 3500,
      current_amount: 1260,
      type: "one-time",
      status: "active",
      created_at: "2026-03-18T08:30:00.000Z",
      end_date: null,
    },
  ],
  pledges: [
    {
      id: "pledge-001",
      user_id: "member-naomi",
      fund_id: "fund-community-kitchen",
      pledged_amount: 240,
      paid_amount: 120,
      status: "partial",
      created_at: "2026-03-19T11:00:00.000Z",
    },
    {
      id: "pledge-002",
      user_id: "member-john",
      fund_id: "fund-studio-upgrade",
      pledged_amount: 150,
      paid_amount: 150,
      status: "completed",
      created_at: "2026-03-21T09:20:00.000Z",
    },
  ],
  contributions: [
    {
      id: "contribution-001",
      user_id: "member-naomi",
      fund_id: "fund-community-kitchen",
      amount: 120,
      created_at: "2026-03-20T08:15:00.000Z",
      source: "wallet",
      type: "pledge_payment",
    },
    {
      id: "contribution-002",
      user_id: "member-esther",
      fund_id: "fund-community-kitchen",
      amount: 310,
      created_at: "2026-03-22T13:40:00.000Z",
      source: "wallet",
      type: "donation",
    },
    {
      id: "contribution-003",
      user_id: "member-john",
      fund_id: "fund-studio-upgrade",
      amount: 150,
      created_at: "2026-03-23T17:10:00.000Z",
      source: "wallet",
      type: "pledge_payment",
    },
  ],
};

function isBrowser() {
  return typeof window !== "undefined";
}

function readStore(): FundStore {
  if (!isBrowser()) return seedStore;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedStore;
  try {
    const parsed = JSON.parse(raw) as Partial<FundStore>;
    return {
      funds: Array.isArray(parsed.funds) ? parsed.funds : seedStore.funds,
      pledges: Array.isArray(parsed.pledges) ? parsed.pledges : seedStore.pledges,
      contributions: Array.isArray(parsed.contributions)
        ? parsed.contributions
        : seedStore.contributions,
    };
  } catch {
    return seedStore;
  }
}

function writeStore(store: FundStore) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function sortFunds(funds: Fund[]) {
  return funds.slice().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

function amount(value: number) {
  return Number(value.toFixed(2));
}

function updatePledgeStatus(pledge: Pledge): PledgeStatus {
  if (pledge.paid_amount <= 0) return "pending";
  if (pledge.paid_amount >= pledge.pledged_amount) return "completed";
  return "partial";
}

function userNameFromId(userId: string) {
  const token = userId.replace(/^member-/, "").replace(/[-_]/g, " ").trim();
  if (!token) return "FaithHub Member";
  return token
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getAllFunds() {
  const store = readStore();
  return sortFunds(store.funds);
}

export function getFundById(fundId: string) {
  return getAllFunds().find((fund) => fund.id === fundId) || null;
}

export function getProviderFunds(providerId = defaultProviderId) {
  return getAllFunds().filter((fund) => fund.provider_id === providerId);
}

export function getActiveFunds(providerId?: string) {
  const funds = getAllFunds().filter((fund) => fund.status === "active");
  if (!providerId) return funds;
  return funds.filter((fund) => fund.provider_id === providerId);
}

export function hasActiveFund(providerId?: string) {
  return getActiveFunds(providerId).length > 0;
}

export function getFundPledges(fundId: string) {
  const store = readStore();
  return store.pledges
    .filter((pledge) => pledge.fund_id === fundId)
    .slice()
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getFundSupporters(fundId: string): FundSupporter[] {
  const store = readStore();
  const supportMap = new Map<string, FundSupporter>();
  const pledges = store.pledges.filter((pledge) => pledge.fund_id === fundId);
  const contributions = store.contributions.filter((item) => item.fund_id === fundId);

  for (const pledge of pledges) {
    const existing = supportMap.get(pledge.user_id) || {
      user_id: pledge.user_id,
      name: userNameFromId(pledge.user_id),
      total_supported: 0,
      pledged_total: 0,
      contributions: 0,
    };
    existing.pledged_total += pledge.pledged_amount;
    supportMap.set(pledge.user_id, existing);
  }

  for (const contribution of contributions) {
    const existing = supportMap.get(contribution.user_id) || {
      user_id: contribution.user_id,
      name: userNameFromId(contribution.user_id),
      total_supported: 0,
      pledged_total: 0,
      contributions: 0,
    };
    existing.total_supported += contribution.amount;
    existing.contributions += 1;
    supportMap.set(contribution.user_id, existing);
  }

  return Array.from(supportMap.values())
    .map((supporter) => ({
      ...supporter,
      total_supported: amount(supporter.total_supported),
      pledged_total: amount(supporter.pledged_total),
    }))
    .sort((a, b) => b.total_supported - a.total_supported || b.pledged_total - a.pledged_total);
}

export function createFund(input: {
  provider_id?: string;
  title: string;
  description: string;
  target_amount: number;
  type: FundType;
  end_date?: string | null;
}) {
  const store = readStore();
  const created: Fund = {
    id: `fund-${Date.now()}`,
    provider_id: (input.provider_id || defaultProviderId).trim() || defaultProviderId,
    title: input.title.trim(),
    description: input.description.trim(),
    target_amount: amount(Math.max(1, input.target_amount)),
    current_amount: 0,
    type: input.type,
    status: "active",
    created_at: new Date().toISOString(),
    end_date: input.end_date || null,
  };
  store.funds = sortFunds([created, ...store.funds]);
  writeStore(store);
  return created;
}

export function createPledge(input: {
  user_id: string;
  fund_id: string;
  pledged_amount: number;
}) {
  const store = readStore();
  const pledge: Pledge = {
    id: `pledge-${Date.now()}`,
    user_id: input.user_id.trim() || "member-anonymous",
    fund_id: input.fund_id,
    pledged_amount: amount(Math.max(1, input.pledged_amount)),
    paid_amount: 0,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  store.pledges = [pledge, ...store.pledges];
  writeStore(store);
  return pledge;
}

function creditProviderWallet(amountValue: number) {
  appendWalletTransaction("provider", {
    type: "earning",
    amount: amountValue,
    source: "provider_payout",
  });
}

export function donateToFundFromWallet(input: {
  fund_id: string;
  user_id: string;
  amount: number;
  wallet_role?: WalletRole;
}) {
  const store = readStore();
  const fund = store.funds.find((entry) => entry.id === input.fund_id);
  if (!fund) return null;

  const amountValue = amount(Math.max(0, input.amount));
  if (amountValue <= 0) return null;

  fund.current_amount = amount(fund.current_amount + amountValue);
  store.contributions = [
    {
      id: `contribution-${Date.now()}`,
      user_id: input.user_id.trim() || "member-anonymous",
      fund_id: fund.id,
      amount: amountValue,
      created_at: new Date().toISOString(),
      source: "wallet",
      type: "donation",
    },
    ...store.contributions,
  ];
  writeStore(store);

  appendWalletTransaction(input.wallet_role || "user", {
    type: "donation",
    amount: amountValue,
    source: "giving",
  });
  creditProviderWallet(amountValue);

  return fund;
}

export function payPledgeFromWallet(input: {
  pledge_id: string;
  user_id: string;
  amount: number;
  wallet_role?: WalletRole;
}) {
  const store = readStore();
  const pledge = store.pledges.find((entry) => entry.id === input.pledge_id);
  if (!pledge || pledge.user_id !== input.user_id) return null;

  const fund = store.funds.find((entry) => entry.id === pledge.fund_id);
  if (!fund) return null;

  const unpaid = amount(Math.max(0, pledge.pledged_amount - pledge.paid_amount));
  const proposed = amount(Math.max(0, input.amount));
  const amountValue = amount(Math.min(unpaid, proposed));
  if (amountValue <= 0) return null;

  pledge.paid_amount = amount(pledge.paid_amount + amountValue);
  pledge.status = updatePledgeStatus(pledge);
  fund.current_amount = amount(fund.current_amount + amountValue);
  store.contributions = [
    {
      id: `contribution-${Date.now()}`,
      user_id: input.user_id,
      fund_id: fund.id,
      amount: amountValue,
      created_at: new Date().toISOString(),
      source: "wallet",
      type: "pledge_payment",
    },
    ...store.contributions,
  ];

  writeStore(store);

  appendWalletTransaction(input.wallet_role || "user", {
    type: "donation",
    amount: amountValue,
    source: "giving",
  });
  creditProviderWallet(amountValue);

  return {
    pledge,
    fund,
    paid_amount: amountValue,
  };
}

export function getProviderFundSnapshot(providerId = defaultProviderId) {
  const funds = getProviderFunds(providerId);
  const store = readStore();
  return funds.map((fund) => {
    const pledges = store.pledges.filter((pledge) => pledge.fund_id === fund.id);
    const supporters = getFundSupporters(fund.id);
    return {
      fund,
      supporters_count: supporters.length,
      pledges_count: pledges.length,
      pledged_total: amount(pledges.reduce((sum, pledge) => sum + pledge.pledged_amount, 0)),
    };
  });
}

export const fundDefaults = {
  providerId: defaultProviderId,
};

