import type { LucideIcon } from "lucide-react";

export type HomeIntent = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  icon: LucideIcon;
};

export type ContinueWatchingItem = {
  id: number;
  title: string;
  institution: string;
  duration: string;
  progress: number;
};

export type UpcomingEventItem = {
  id: number;
  title: string;
  institution: string;
  time: string;
  audience: string;
};
