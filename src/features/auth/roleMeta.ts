import type { Role } from "@/types/roles";

export const roleLoginHeadings: Record<Role, { title: string; subtitle: string; chip: string }> = {
  user: {
    title: "Welcome back, Member",
    subtitle: "Sign in to continue your FaithHub community journey.",
    chip: "User access",
  },
  provider: {
    title: "Provider workspace access",
    subtitle: "Sign in to manage content, events, and engagement.",
    chip: "Provider access",
  },
  admin: {
    title: "Admin command sign-in",
    subtitle: "Authenticate to access governance, trust, and operations controls.",
    chip: "Admin access",
  },
};

