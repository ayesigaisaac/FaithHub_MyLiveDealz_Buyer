import EnterpriseLayout from "@/layouts/EnterpriseLayout";

const OPS_TITLE = "Trust and Safety Operations";
const OPS_SUBTITLE = "Queue-driven incident response, verification workflows, and audit visibility.";

export default function OpsLayout() {
  return <EnterpriseLayout role="ops" title={OPS_TITLE} subtitle={OPS_SUBTITLE} />;
}