import type { Role } from "@/types/roles";
import { routes } from "@/constants/routes";

const roles: Role[] = ["user", "provider", "admin"];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && roles.includes(value as Role);
}

export function roleFromPath(pathname: string): Role {
  if (pathname.startsWith(routes.app.provider.base) || pathname.startsWith(routes.aliases.provider)) {
    return "provider";
  }

  if (pathname.startsWith(routes.app.admin.base) || pathname.startsWith(routes.aliases.admin)) {
    return "admin";
  }

  if (pathname.startsWith(routes.public.login)) {
    const loginSegments = pathname.split("/").filter(Boolean);
    const maybeRole = loginSegments[1];
    if (isRole(maybeRole)) return maybeRole;
  }

  return "user";
}
