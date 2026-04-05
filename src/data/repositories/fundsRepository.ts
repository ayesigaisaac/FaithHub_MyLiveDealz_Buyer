import { readJsonVersioned, writeJsonVersioned } from "@/data/adapters/storage";
import type { FundsRepository, FundsStore } from "@/data/interfaces/funds-repository";
import type { Fund, FundContribution, Pledge } from "@/types/funds";

const STORAGE_KEY = "faithhub.funds.v1";
const SCHEMA_VERSION = 1;

const defaultProviderId = "faithhub-provider";

export const seedFundsStore: FundsStore = {
  funds: [
    {
      id: "fund-community-kitchen",
      slug: "community-kitchen-expansion",
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
      id: "fund-mission-outreach",
      slug: "mission-outreach",
      provider_id: defaultProviderId,
      title: "Mission Outreach",
      description:
        "Fund missions, travel, materials, and local community outreach support for ongoing care initiatives.",
      target_amount: 20000,
      current_amount: 12900,
      type: "crowdfunding",
      status: "active",
      created_at: "2026-03-17T07:25:00.000Z",
      end_date: "2026-07-15T23:59:59.000Z",
    },
    {
      id: "fund-studio-upgrade",
      slug: "live-studio-equipment",
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

function isFund(candidate: unknown): candidate is Fund {
  if (!candidate || typeof candidate !== "object") return false;
  const fund = candidate as Fund;
  return Boolean(fund.id && fund.provider_id && fund.title && fund.status && fund.created_at);
}

function isPledge(candidate: unknown): candidate is Pledge {
  if (!candidate || typeof candidate !== "object") return false;
  const pledge = candidate as Pledge;
  return Boolean(pledge.id && pledge.user_id && pledge.fund_id && pledge.created_at);
}

function isContribution(candidate: unknown): candidate is FundContribution {
  if (!candidate || typeof candidate !== "object") return false;
  const contribution = candidate as FundContribution;
  return Boolean(contribution.id && contribution.user_id && contribution.fund_id && contribution.created_at);
}

function reviveStore(value: unknown): FundsStore | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<FundsStore>;
  const funds = Array.isArray(candidate.funds) ? candidate.funds.filter(isFund) : [];
  const pledges = Array.isArray(candidate.pledges) ? candidate.pledges.filter(isPledge) : [];
  const contributions = Array.isArray(candidate.contributions)
    ? candidate.contributions.filter(isContribution)
    : [];
  return {
    funds,
    pledges,
    contributions,
  };
}

export function readFundsStoreSync() {
  return readJsonVersioned(STORAGE_KEY, seedFundsStore, {
    currentVersion: SCHEMA_VERSION,
    reviveData: reviveStore,
    migrate: (legacyData) => reviveStore(legacyData),
  });
}

export function writeFundsStoreSync(store: FundsStore) {
  writeJsonVersioned(STORAGE_KEY, store, SCHEMA_VERSION);
}

class MockFundsRepository implements FundsRepository {
  async getStore() {
    return readFundsStoreSync();
  }

  async saveStore(store: FundsStore) {
    writeFundsStoreSync(store);
    return readFundsStoreSync();
  }
}

export const fundsRepository: FundsRepository = new MockFundsRepository();
