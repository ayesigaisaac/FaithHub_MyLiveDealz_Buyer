import React from "react";
import EnterpriseLayout from "@/layouts/EnterpriseLayout";

export default function TenantAdminLayout() {
  return (
    <EnterpriseLayout
      role="tenant_admin"
      title="Tenant Workspace"
      subtitle="Institution-level control for members, events, sessions, marketplace, and moderation."
    />
  );
}
