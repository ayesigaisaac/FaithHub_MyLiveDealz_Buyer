import EnterpriseLayout from "@/layouts/EnterpriseLayout";

const PROVIDER_TITLE = "Provider Operations Workspace";
const PROVIDER_SUBTITLE =
  "Catalog, fulfillment, payouts, notifications, and analytics in one role-focused shell.";

export default function ProviderLayout() {
  return <EnterpriseLayout role="provider" title={PROVIDER_TITLE} subtitle={PROVIDER_SUBTITLE} />;
}