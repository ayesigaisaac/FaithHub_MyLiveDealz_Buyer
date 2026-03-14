import EnterpriseLayout from "@/layouts/EnterpriseLayout";

const SUPER_ADMIN_TITLE = "Platform Control Tower";

const SUPER_ADMIN_SUBTITLE =
  "Cross-tenant oversight for trust, operations, finance, and system governance.";

export default function SuperAdminLayout() {
  return (
    <EnterpriseLayout
      role="super_admin"
      title={SUPER_ADMIN_TITLE}
      subtitle={SUPER_ADMIN_SUBTITLE}
    />
  );
}