import React, { useState } from "react";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import UserPageShell from "@/pages/user/shared/UserPageShell";
import UserPageHeader from "@/pages/user/shared/UserPageHeader";
import UserActionBar from "@/pages/user/shared/UserActionBar";
import InstitutionHero from "@/pages/user/institution/components/InstitutionHero";
import InstitutionActionRow from "@/pages/user/institution/components/InstitutionActionRow";
import InstitutionAboutCard from "@/pages/user/institution/components/InstitutionAboutCard";
import InstitutionContentTabs from "@/pages/user/institution/components/InstitutionContentTabs";
import InstitutionTrustPanel from "@/pages/user/institution/components/InstitutionTrustPanel";
import type {
  InstitutionEventItem,
  InstitutionSeriesItem,
  LeaderItem,
  ServiceScheduleItem,
} from "@/pages/user/institution/types";

const serviceSchedule: ServiceScheduleItem[] = [
  {
    day: "Sunday",
    time: "8:00 AM - Main Service",
    note: "Wheelchair seating and quiet area available",
  },
  {
    day: "Wednesday",
    time: "6:30 PM - Midweek Teaching",
    note: "Live and in-person hybrid",
  },
  {
    day: "Friday",
    time: "7:30 PM - Youth Fellowship",
    note: "Youth and family participation",
  },
];

const leaders: LeaderItem[] = [
  {
    name: "Rev. Naomi Kato",
    role: "Lead Pastor",
    specialty: "Teaching, counseling, women fellowship",
  },
  {
    name: "Daniel Ssentamu",
    role: "Youth Director",
    specialty: "Youth programs and live worship nights",
  },
  {
    name: "Aisha Nabirye",
    role: "Community Care Lead",
    specialty: "Prayer support, missions, and family outreach",
  },
];

const series: InstitutionSeriesItem[] = [
  { title: "Walking in Wisdom", meta: "8 episodes - Episode 4 live tonight" },
  { title: "Mercy in Motion", meta: "6 episodes - Replay available" },
  { title: "Faith That Builds", meta: "New series - Starts next week" },
];

const events: InstitutionEventItem[] = [
  { title: "Youth Worship Camp", date: "12-15 Aug", type: "Camp", price: "FaithMart ticket" },
  { title: "Marketplace Day", date: "20 Aug", type: "Marketplace", price: "Vendor booths + merch" },
  { title: "Baptism Sunday", date: "01 Sep", type: "Baptism", price: "Free registration" },
];

export default function InstitutionProfile() {
  const [following, setFollowing] = useState(true);
  const [offlineMode] = useState(false);
  const [memberMode, setMemberMode] = useState(false);

  return (
    <UserPageShell
      header={
        <UserPageHeader
          icon={<Building2 className="h-5 w-5" />}
          title="Institution Profile"
          offline={offlineMode}
          offlineLabel="Cached institution profile"
        />
      }
      hero={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-4"
        >
          <InstitutionHero following={following} onToggleFollow={() => setFollowing((prev) => !prev)} />
        </motion.div>
      }
      main={
        <>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <InstitutionActionRow />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            <InstitutionAboutCard leaders={leaders} schedule={serviceSchedule} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <InstitutionContentTabs series={series} events={events} />
          </motion.div>
        </>
      }
      aside={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4 }}
        >
          <InstitutionTrustPanel memberMode={memberMode} onToggleMemberMode={() => setMemberMode((prev) => !prev)} />
        </motion.div>
      }
      stickyFooter={
        <UserActionBar
          actions={[
            {
              id: "institution-join-live",
              label: "Join live",
              dataActionLabel: "Join live",
              variant: "default",
            },
            {
              id: "institution-open-series",
              label: "Series",
              dataActionLabel: "Open series",
            },
            {
              id: "institution-give",
              label: "Give",
              dataActionLabel: "Give now",
            },
          ]}
        />
      }
    />
  );
}
