import React from "react";
import EnterpriseLayout from "@/layouts/EnterpriseLayout";

export default function SuperAdminLayout() {
  return (
    <EnterpriseLayout
      role="super_admin"
      title="Platform Control Tower"
      subtitle="Cross-tenant oversight for trust, operations, finance, and system governance."
    />
  );
}
