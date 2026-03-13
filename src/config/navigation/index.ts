import { opsNav } from "@/config/navigation/opsNav";
import { providerNav } from "@/config/navigation/providerNav";
import { superAdminNav } from "@/config/navigation/superAdminNav";
import { tenantAdminNav } from "@/config/navigation/tenantAdminNav";
import { userNav } from "@/config/navigation/userNav";
import type { AppRole, EnterpriseNavItem } from "@/types/enterprise";

export { superAdminNav, tenantAdminNav, providerNav, userNav, opsNav };

export const navigationByRole: Record<AppRole, EnterpriseNavItem[]> = {
  super_admin: superAdminNav,
  tenant_admin: tenantAdminNav,
  provider: providerNav,
  user: userNav,
  moderator: opsNav,
  ops: opsNav,
};
