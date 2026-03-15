import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import UserPageShell from "@/pages/user/shared/UserPageShell";
import UserPageHeader from "@/pages/user/shared/UserPageHeader";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import GivingHero from "@/pages/user/giving/components/GivingHero";
import FundSelector from "@/pages/user/giving/components/FundSelector";
import PaymentSummaryCard from "@/pages/user/giving/components/PaymentSummaryCard";
import GivingTrustPanel from "@/pages/user/giving/components/GivingTrustPanel";
import type { DonationMode, GivingFund } from "@/pages/user/giving/types";

const givingFunds: GivingFund[] = [
  {
    id: 1,
    title: "General Giving",
    description: "Support weekly services, operations, and care programs.",
    raised: "$24,500",
    goal: "$40,000",
    progress: 61,
  },
  {
    id: 2,
    title: "Mission Outreach",
    description: "Fund missions, travel, materials, and community support.",
    raised: "$12,900",
    goal: "$20,000",
    progress: 64,
  },
  {
    id: 3,
    title: "Childrens Ministry",
    description: "Equip learning spaces and youth support activities.",
    raised: "$8,700",
    goal: "$15,000",
    progress: 58,
  },
];

export default function FaithHubGiving() {
  const [selectedFundId, setSelectedFundId] = useState(givingFunds[0].id);
  const [amount, setAmount] = useState("25");
  const [mode, setMode] = useState<DonationMode>("One-time");
  const [receiptEmail, setReceiptEmail] = useState("naomi@faithhub.com");
  const [offlineMode, setOfflineMode] = useState(false);
  const [supporterTier, setSupporterTier] = useState(true);

  const selectedFund = useMemo(
    () => givingFunds.find((fund) => fund.id === selectedFundId) || givingFunds[0],
    [selectedFundId],
  );

  return (
    <UserPageShell
      header={
        <UserPageHeader
          icon={<HeartHandshake className="h-5 w-5" />}
          title="Giving"
          offline={offlineMode}
          offlineLabel="Intent only, no payment capture"
        />
      }
      hero={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4"
        >
          <GivingHero offlineMode={offlineMode} onToggleOfflineMode={() => setOfflineMode((prev) => !prev)} />
        </motion.div>
      }
      main={
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <FundSelector
              funds={givingFunds}
              selectedFundId={selectedFundId}
              onSelectFund={setSelectedFundId}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <PaymentSummaryCard
              selectedFund={selectedFund}
              amount={amount}
              onAmountChange={setAmount}
              mode={mode}
              onModeChange={setMode}
              receiptEmail={receiptEmail}
              onReceiptEmailChange={setReceiptEmail}
            />
          </motion.div>
        </>
      }
      aside={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.4 }}
        >
          <GivingTrustPanel
            supporterTier={supporterTier}
            onToggleSupporterTier={() => setSupporterTier((prev) => !prev)}
          />
        </motion.div>
      }
      stickyFooter={
        <UserActionBar
          actions={[
            {
              id: "giving-pay",
              label: "Pay",
              dataActionLabel: "Continue to payment",
              variant: "default",
            },
            {
              id: "giving-manage-plan",
              label: "Manage plan",
              dataActionLabel: "Manage plan",
            },
            {
              id: "giving-open-institution",
              label: "Institution",
              dataActionLabel: "Open institution",
            },
          ]}
        />
      }
    />
  );
}
