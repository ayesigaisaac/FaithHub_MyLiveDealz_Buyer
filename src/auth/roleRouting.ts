import type { Role } from "@/types/roles";
import { routes } from "@/constants/routes";

export function isRole(value: unknown): value is Role {
  return value === "admin" || value === "provider" || value === "user";
}

export function roleFromPath(pathname: string): Role | null {
  if (pathname.startsWith(routes.app.admin.base) || pathname.startsWith(routes.aliases.admin)) return "admin";
  if (pathname.startsWith(routes.app.provider.base) || pathname.startsWith(routes.aliases.provider)) return "provider";
  if (
    pathname.startsWith(routes.app.user.base) ||
    pathname.startsWith(routes.aliases.user) ||
    pathname === "/home"
  ) {
    return "user";
  }
  return null;
}

