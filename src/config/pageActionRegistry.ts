import { defaultPageForRole, pageRegistry, type RoleKey } from "@/config/pageRegistry";

const rawExactPageActions: Record<string, Record<string, string>> = {
  "/app/user/entry": {
    "continue to faithhub": "/app/user/auth",
    "browse as guest": "/app/user/discover",
    "restore last session": "/app/user/home",
  },
  "/app/user/auth": {
    "continue with passkey": "/app/user/home",
    "continue": "/app/user/home",
    "create account": "/app/user/profile",
    "use face / touch id": "/app/user/home",
  },
  "/app/user/profile": {
    "continue": "/app/user/home",
    "discover institutions": "/app/user/discover",
    "open home": "/app/user/home",
  },
  "/app/user/home": {
    "open watch live": "/app/user/live",
    "open catch up": "/app/user/replay",
    "open give": "/app/user/giving",
    "open join group": "/app/user/discover",
    "open calendar": "/app/user/events",
    "open event": "/app/user/events/detail",
    "open series": "/app/user/series/detail",
  },
  "/app/user/discover": {
    "open profile": "/app/user/institution",
    "explore profile": "/app/user/institution",
    "open": "/app/user/institution",
    "join live": "/app/user/live",
  },
  "/app/user/institution": {
    "join live": "/app/user/live/waiting-room",
    "open live": "/app/user/live/waiting-room",
    "open series": "/app/user/series/detail",
    "open event": "/app/user/events/detail",
    "give now": "/app/user/giving",
    "unlock membership": "/app/user/membership",
  },
  "/app/user/series": {
    "open series": "/app/user/series/detail",
  },
  "/app/user/series/detail": {
    "open episode": "/app/user/episode",
    "continue watching": "/app/user/replay",
    "unlock premium": "/app/user/membership",
    "view benefits": "/app/user/membership",
  },
  "/app/user/episode": {
    "open": "/app/user/replay",
    "open replay": "/app/user/replay",
    "join live": "/app/user/live/waiting-room",
  },
  "/app/user/replay": {
    "watch clip": "/app/user/clips",
    "open clip viewer": "/app/user/clips",
    "unlock study guide": "/app/user/membership",
    "view benefits": "/app/user/membership",
  },
  "/app/user/clips": {
    "open full replay": "/app/user/replay",
    "open series": "/app/user/series/detail",
  },
  "/app/user/live": {
    "join live": "/app/user/live/waiting-room",
    "open room": "/app/user/live/waiting-room",
    "watch replay": "/app/user/replay",
  },
  "/app/user/live/waiting-room": {
    "enter live": "/app/user/live/player",
    "open chat": "/app/user/live/chat",
  },
  "/app/user/live/player": {
    "open chat": "/app/user/live/chat",
    "ask a question": "/app/user/live/chat",
    "give now": "/app/user/giving",
    "open series": "/app/user/series/detail",
  },
  "/app/user/live/chat": {
    "back to player": "/app/user/live/player",
    "view stream": "/app/user/live/player",
  },
  "/app/user/events": {
    "open event": "/app/user/events/detail",
    "join live": "/app/user/live/waiting-room",
  },
  "/app/user/events/detail": {
    "reserve seat": "/app/user/giving",
    "give now": "/app/user/giving",
    "open institution": "/app/user/institution",
  },
  "/app/user/giving": {
    "manage plan": "/app/user/membership",
    "open institution": "/app/user/institution",
    "continue to payment": "/app/user/membership",
  },
  "/app/user/membership": {
    "manage plan": "/app/user/settings",
    "subscribe / switch": "/app/user/settings",
  },
  "/app/user/reviews": {
    "submit review": "/app/user/reviews",
    "open institution": "/app/user/institution",
  },
  "/app/user/settings": {
    "save now": "/app/user/home",
  },
  "/app/provider/onboarding": {
    "continue": "/app/provider/dashboard",
    "launch workspace": "/app/provider/dashboard",
  },
  "/app/provider/dashboard": {
    "open alerts": "/app/provider/reviews-moderation",
    "open scheduler": "/app/provider/live-schedule",
    "export analytics": "/app/provider/live-ops",
  },
  "/app/provider/series-builder": {
    "continue": "/app/provider/episode-builder",
    "open episode builder": "/app/provider/episode-builder",
    "schedule live": "/app/provider/live-builder",
  },
  "/app/provider/episode-builder": {
    "continue": "/app/provider/post-live",
    "publish replay": "/app/provider/post-live",
    "open live builder": "/app/provider/live-builder",
  },
  "/app/provider/post-live": {
    "publish replay": "/app/provider/live-ops",
    "notify audience": "/app/provider/notifications",
  },
  "/app/provider/live-builder": {
    "open studio": "/app/provider/live-studio",
    "open scheduler": "/app/provider/live-schedule",
    "stream to platforms": "/app/provider/stream-to-platforms",
  },
  "/app/provider/live-schedule": {
    "open live builder": "/app/provider/live-builder",
    "open live ops": "/app/provider/live-ops",
    "open studio": "/app/provider/live-studio",
    "notify audience": "/app/provider/notifications",
    "stream destinations": "/app/provider/stream-to-platforms",
  },
  "/app/provider/live-ops": {
    "open studio": "/app/provider/live-studio",
    "stream destinations": "/app/provider/stream-to-platforms",
  },
  "/app/provider/live-studio": {
    "stream destinations": "/app/provider/stream-to-platforms",
    "notify audience": "/app/provider/notifications",
  },
  "/app/provider/stream-to-platforms": {
    "open live studio": "/app/provider/live-studio",
    "open contacts": "/app/provider/contacts",
  },
  "/app/provider/notifications": {
    "send test": "/app/provider/contacts",
    "open contacts": "/app/provider/contacts",
  },
  "/app/provider/contacts": {
    "add contact": "/app/provider/contacts",
    "open notifications": "/app/provider/notifications",
  },
  "/app/provider/events": {
    "notify attendees": "/app/provider/notifications",
    "open funds": "/app/provider/funds",
  },
  "/app/provider/funds": {
    "create fund": "/app/provider/funds",
    "open trust queue": "/app/provider/reviews-moderation",
  },
  "/app/provider/reviews-moderation": {
    "open trust queue": "/app/provider/reviews-moderation",
    "open case": "/app/provider/dashboard",
  },
  "/app/admin/overview": {
    "open incident desk": "/app/admin/live-moderation",
    "open live ops": "/app/provider/live-ops",
    "open security": "/app/admin/security",
    "moderation console": "/app/admin/live-moderation",
    "verification queue": "/app/admin/verification",
    "provider operations": "/app/provider/live-ops",
    "user experience": "/app/user/home",
  },
  "/app/admin/verification": {
    "open review queue": "/app/admin/verification",
    "manage badge": "/app/admin/policy",
    "escalate": "/app/admin/live-moderation",
    "open case": "/app/admin/security",
    "request evidence": "/app/admin/channels",
  },
  "/app/admin/live-moderation": {
    "open room": "/app/provider/live-ops",
    "open ops": "/app/admin/overview",
    "escalate": "/app/admin/security",
  },
  "/app/admin/policy": {
    "edit policy": "/app/admin/policy",
    "inspect": "/app/admin/channels",
  },
  "/app/admin/finance": {
    "open disputes": "/app/admin/finance",
    "review payouts": "/app/admin/security",
  },
  "/app/admin/channels": {
    "open registry": "/app/admin/channels",
    "open security": "/app/admin/security",
  },
  "/app/admin/security": {
    "export evidence": "/app/admin/security",
    "open overview": "/app/admin/overview",
  },
};

const rawRoleLevelActions: Record<RoleKey, Record<string, string>> = {
  user: {
    "open profile": "/app/user/institution",
    "explore profile": "/app/user/institution",
    "open series": "/app/user/series/detail",
    "open episode": "/app/user/episode",
    "open event": "/app/user/events/detail",
    "join live": "/app/user/live/waiting-room",
    "open live": "/app/user/live/player",
    "open chat": "/app/user/live/chat",
    "give now": "/app/user/giving",
    "manage plan": "/app/user/membership",
    "unlock premium": "/app/user/membership",
    "unlock study guide": "/app/user/membership",
    "unlock membership": "/app/user/membership",
    "view benefits": "/app/user/membership",
  },
  provider: {
    "open alerts": "/app/provider/reviews-moderation",
    "open scheduler": "/app/provider/live-schedule",
    "open studio": "/app/provider/live-studio",
    "stream destinations": "/app/provider/stream-to-platforms",
    "stream to platforms": "/app/provider/stream-to-platforms",
    "notify audience": "/app/provider/notifications",
    "open contacts": "/app/provider/contacts",
    "open trust queue": "/app/provider/reviews-moderation",
    "open case": "/app/provider/reviews-moderation",
  },
  admin: {
    "open incident desk": "/app/admin/live-moderation",
    "open review queue": "/app/admin/verification",
    "open registry": "/app/admin/channels",
    "edit policy": "/app/admin/policy",
    "open security": "/app/admin/security",
    "open ops": "/app/admin/overview",
  },
};

function normalizeLabel(label: string) {
  return label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeActionTable(actions: Record<string, string>, scope: string) {
  const normalizedTable: Record<string, string> = {};
  for (const [rawLabel, path] of Object.entries(actions)) {
    const normalizedLabel = normalizeLabel(rawLabel);
    if (!normalizedLabel) continue;
    if (import.meta.env.DEV && normalizedTable[normalizedLabel] && normalizedTable[normalizedLabel] !== path) {
      console.warn(`[FaithHub actions] Duplicate normalized action "${normalizedLabel}" in ${scope}. Last target wins.`);
    }
    normalizedTable[normalizedLabel] = path;
  }
  return normalizedTable;
}

const exactPageActions = Object.fromEntries(
  Object.entries(rawExactPageActions).map(([pathname, actions]) => [
    pathname,
    normalizeActionTable(actions, `page:${pathname}`),
  ]),
) as Record<string, Record<string, string>>;

const roleLevelActions = Object.fromEntries(
  Object.entries(rawRoleLevelActions).map(([role, actions]) => [
    role,
    normalizeActionTable(actions, `role:${role}`),
  ]),
) as Record<RoleKey, Record<string, string>>;

const knownActionTargets = new Set<string>([
  "/",
  "/access",
  "/shell-preview",
  "/app",
  "/app-shell",
  "/app/user",
  "/app/provider",
  "/app/admin",
  ...Object.values(defaultPageForRole),
  ...pageRegistry.map((page) => page.path),
]);

function validateActionTargets() {
  const unknownTargets = new Set<string>();
  for (const actions of Object.values(rawExactPageActions)) {
    for (const path of Object.values(actions)) {
      if (!knownActionTargets.has(path)) unknownTargets.add(path);
    }
  }
  for (const actions of Object.values(rawRoleLevelActions)) {
    for (const path of Object.values(actions)) {
      if (!knownActionTargets.has(path)) unknownTargets.add(path);
    }
  }
  if (unknownTargets.size > 0) {
    console.warn(
      `[FaithHub actions] Unknown navigation targets found: ${Array.from(unknownTargets)
        .sort()
        .join(", ")}`,
    );
  }
}

if (import.meta.env.DEV) {
  validateActionTargets();
}

function getRoleFromPath(pathname: string): RoleKey {
  if (pathname.startsWith("/app/provider")) return "provider";
  if (pathname.startsWith("/app/admin")) return "admin";
  return "user";
}

export function resolvePageButtonAction(pathname: string, label: string) {
  const normalized = normalizeLabel(label);
  if (!normalized) return null;
  const exact = exactPageActions[pathname]?.[normalized];
  if (exact) return exact;
  return roleLevelActions[getRoleFromPath(pathname)]?.[normalized] || null;
}
