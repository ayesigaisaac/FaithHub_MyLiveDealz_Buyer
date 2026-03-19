import EnterpriseLayout from "@/layouts/EnterpriseLayout";

const USER_TITLE = "User Experience Workspace";

const USER_SUBTITLE =
  "Personalized activity, orders, tickets, saved content, and preference controls.";

export default function UserLayout() {
  return (
    <EnterpriseLayout
      role="user"
      title={USER_TITLE}
      subtitle={USER_SUBTITLE}
    />
  );
}
