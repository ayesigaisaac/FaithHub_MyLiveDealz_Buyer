import { routes } from "@/constants/routes";

export const routeShortcuts: Record<string, string> = {
  "/home": routes.app.user.home,
  "/series": routes.app.user.series,
  "/live": routes.app.user.liveHub,
  "/provider/dashboard": routes.app.provider.dashboard,
  "/provider/community": routes.app.provider.community,
  "/provider/resources": routes.app.provider.resources,
  "/provider/content": routes.app.provider.seriesBuilder,
  "/provider/events": routes.app.provider.events,
  "/provider/counseling": routes.app.provider.counseling,
  "/admin/overview": routes.app.admin.overview,
  "/admin/policy": routes.app.admin.policy,
  "/admin/security": routes.app.admin.security,
  "/admin/finance": routes.app.admin.finance,
  "/admin/counseling": routes.app.admin.counseling,
};
