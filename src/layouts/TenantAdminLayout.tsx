import EnterpriseLayout from "@/layouts/EnterpriseLayout";

const TENANT_ADMIN_TITLE = "Tenant Workspace";

const TENANT_ADMIN_SUBTITLE =
  "Institution-level control for members, events, sessions, marketplace, and moderation.";

export default function TenantAdminLayout() {
  return (
    <EnterpriseLayout
      role="tenant_admin"
      title={TENANT_ADMIN_TITLE}
      subtitle={TENANT_ADMIN_SUBTITLE}
    />
  );
}
