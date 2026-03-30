import {
  defaultPageForRole,
  pageRegistry,
  pagesByRole,
  type PageRegistryItem,
  type RoleKey,
} from "@/config/pageRegistry";
import { routes } from "@/constants/routes";

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
    "enter session": "/app/user/live/player",
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
    "buy in faithmart": "/app/user/wallet",
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
    "create fund": "/app/provider/funds/create",
    "open trust queue": "/app/provider/reviews-moderation",
  },
  "/app/provider/reviews-moderation": {
    "open trust queue": "/app/provider/reviews-moderation",
    "open case": "/app/provider/dashboard",
    respond: "/app/provider/reviews-moderation",
  },
  "/app/admin/overview": {
    "open incident desk": "/app/admin/live-moderation",
    "open messages": "/app/admin/live-moderation",
    "open live ops": "/app/provider/live-ops",
    "open security": "/app/admin/security",
    "open user app": "/app/user/home",
    "open provider app": "/app/provider/dashboard",
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
    "open alerts": "/app/user/settings",
    "open thread": "/app/user/live/chat",
    "open attachment": "/app/user/replay",
    "open cta": "/app/user/institution",
    "open event pass": "/app/user/events/detail",
    "open ticket": "/app/user/events/detail",
    "open messages": "/app/user/live/chat",
    "open calendar": "/app/user/events",
    "open schedule": "/app/user/events",
    "open live calendar": "/app/user/events",
    reply: "/app/user/live/chat",
    report: "/app/user/reviews",
    block: "/app/user/reviews",
    "buy in faithmart": "/app/user/wallet",
    rsvp: "/app/user/events/detail",
    "set reminder": "/app/user/events",
    "continue giving": "/app/user/giving",
    "open wallet": "/app/user/wallet",
    "send magic link": "/app/user/home",
    resend: "/app/user/auth",
  },
  provider: {
    "open alerts": "/app/provider/notifications",
    "open scheduler": "/app/provider/live-schedule",
    "open studio": "/app/provider/live-studio",
    "stream destinations": "/app/provider/stream-to-platforms",
    "stream to platforms": "/app/provider/stream-to-platforms",
    "notify audience": "/app/provider/notifications",
    "open contacts": "/app/provider/contacts",
    "open trust queue": "/app/provider/reviews-moderation",
    "open case": "/app/provider/reviews-moderation",
    "open controls": "/app/provider/live-studio",
    "create event": "/app/provider/events",
    "create fund": "/app/provider/funds/create",
    "connect new": "/app/provider/stream-to-platforms",
    destinations: "/app/provider/stream-to-platforms",
    studio: "/app/provider/live-studio",
    "trust queue": "/app/provider/reviews-moderation",
    "view queue": "/app/provider/reviews-moderation",
    "go live": "/app/provider/live-studio",
    "save draft": "/app/provider/dashboard",
    "open queue": "/app/provider/reviews-moderation",
    "open calendar": "/app/provider/live-schedule",
    "open schedule": "/app/provider/live-schedule",
    "open moderation": "/app/provider/reviews-moderation",
    "open wallet": "/app/provider/wallet",
  },
  admin: {
    "open incident desk": "/app/admin/live-moderation",
    "open review queue": "/app/admin/verification",
    "open registry": "/app/admin/channels",
    "edit policy": "/app/admin/policy",
    "open security": "/app/admin/security",
    "open ops": "/app/admin/overview",
    "open alerts": "/app/admin/live-moderation",
    "open finance desk": "/app/admin/finance",
    "open audit explorer": "/app/admin/security",
    "manage badge": "/app/admin/policy",
    "open moderation": "/app/admin/live-moderation",
    "open verification": "/app/admin/verification",
    approve: "/app/admin/verification",
    escalate: "/app/admin/live-moderation",
    "open messages": "/app/admin/live-moderation",
  },
};

const rawExactPageActionIds: Record<string, Record<string, string>> = {
  [routes.app.user.home]: {
    "open-live-hub": routes.app.user.liveHub,
    "open-replay-player": routes.app.user.replay,
    "open-giving": routes.app.user.giving,
    "open-discover": routes.app.user.discover,
    "open-events": routes.app.user.events,
    "open-event-detail": routes.app.user.eventDetail,
    "open-series-detail": routes.app.user.seriesDetail,
  },
  [routes.app.provider.dashboard]: {
    "open-live-studio": routes.app.provider.liveStudio,
    "open-live-schedule": routes.app.provider.liveSchedule,
    "open-live-ops": routes.app.provider.liveOps,
    "open-reviews-moderation": routes.app.provider.reviewsModeration,
    "open-notifications": routes.app.provider.notifications,
    "open-contacts": routes.app.provider.contacts,
  },
  [routes.app.admin.overview]: {
    "open-admin-live-moderation": routes.app.admin.liveModeration,
    "open-admin-verification": routes.app.admin.verification,
    "open-admin-security": routes.app.admin.security,
    "open-live-ops": routes.app.provider.liveOps,
    "open-discover": routes.app.user.discover,
  },
};

const rawRoleLevelActionIds: Record<RoleKey, Record<string, string>> = {
  user: {
    "open-profile": routes.app.user.institution,
    "open-series-detail": routes.app.user.seriesDetail,
    "open-episode-detail": routes.app.user.episode,
    "open-event-detail": routes.app.user.eventDetail,
    "open-live-waiting-room": routes.app.user.liveWaitingRoom,
    "open-live-player": routes.app.user.livePlayer,
    "open-live-chat": routes.app.user.liveChat,
    "open-giving": routes.app.user.giving,
    "open-membership": routes.app.user.membership,
    "open-settings": routes.app.user.settings,
    "open-discover": routes.app.user.discover,
    "open-events": routes.app.user.events,
    "open-calendar": routes.app.user.events,
    "open-schedule": routes.app.user.events,
    "open-alerts": routes.app.user.settings,
    "open-wallet": routes.app.user.wallet,
  },
  provider: {
    "open-live-schedule": routes.app.provider.liveSchedule,
    "open-live-studio": routes.app.provider.liveStudio,
    "open-stream-destinations": routes.app.provider.streamToPlatforms,
    "open-notifications": routes.app.provider.notifications,
    "open-contacts": routes.app.provider.contacts,
    "open-reviews-moderation": routes.app.provider.reviewsModeration,
    "open-live-ops": routes.app.provider.liveOps,
    "open-calendar": routes.app.provider.liveSchedule,
    "open-schedule": routes.app.provider.liveSchedule,
    "open-alerts": routes.app.provider.notifications,
    "open-wallet": routes.app.provider.wallet,
    "open-provider-fund-create": routes.app.provider.fundCreate,
  },
  admin: {
    "open-admin-overview": routes.app.admin.overview,
    "open-admin-live-moderation": routes.app.admin.liveModeration,
    "open-admin-verification": routes.app.admin.verification,
    "open-admin-policy": routes.app.admin.policy,
    "open-admin-security": routes.app.admin.security,
    "open-admin-finance": routes.app.admin.finance,
    "open-admin-channels": routes.app.admin.channels,
    "open-live-ops": routes.app.provider.liveOps,
    "open-admin-moderation": routes.app.admin.liveModeration,
    "open-admin-queue": routes.app.admin.verification,
    "open-discover": routes.app.user.discover,
    "open-alerts": routes.app.admin.liveModeration,
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

function normalizeActionId(actionId: string) {
  return actionId
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
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

function normalizeActionIdTable(actions: Record<string, string>, scope: string) {
  const normalizedTable: Record<string, string> = {};
  for (const [rawActionId, path] of Object.entries(actions)) {
    const normalizedActionId = normalizeActionId(rawActionId);
    if (!normalizedActionId) continue;
    if (
      import.meta.env.DEV &&
      normalizedTable[normalizedActionId] &&
      normalizedTable[normalizedActionId] !== path
    ) {
      console.warn(
        `[FaithHub actions] Duplicate normalized action id "${normalizedActionId}" in ${scope}. Last target wins.`,
      );
    }
    normalizedTable[normalizedActionId] = path;
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

const exactPageActionIds = Object.fromEntries(
  Object.entries(rawExactPageActionIds).map(([pathname, actions]) => [
    pathname,
    normalizeActionIdTable(actions, `page-id:${pathname}`),
  ]),
) as Record<string, Record<string, string>>;

const roleLevelActionIds = Object.fromEntries(
  Object.entries(rawRoleLevelActionIds).map(([role, actions]) => [
    role,
    normalizeActionIdTable(actions, `role-id:${role}`),
  ]),
) as Record<RoleKey, Record<string, string>>;

function buildUniqueTargetTable(tables: Array<Record<string, string>>) {
  const merged: Record<string, string | null> = {};
  for (const table of tables) {
    for (const [key, path] of Object.entries(table)) {
      if (!(key in merged)) {
        merged[key] = path;
        continue;
      }
      if (merged[key] !== path) {
        merged[key] = null;
      }
    }
  }
  return Object.fromEntries(
    Object.entries(merged).filter((entry): entry is [string, string] => Boolean(entry[1])),
  ) as Record<string, string>;
}

const globalActionLabelTargets = buildUniqueTargetTable([
  ...Object.values(exactPageActions),
  ...Object.values(roleLevelActions),
]);

const globalActionIdTargets = buildUniqueTargetTable([
  ...Object.values(exactPageActionIds),
  ...Object.values(roleLevelActionIds),
]);

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

const registeredActionTargets = Array.from(
  new Set([
    ...Object.values(rawExactPageActions).flatMap((actions) => Object.values(actions)),
    ...Object.values(rawRoleLevelActions).flatMap((actions) => Object.values(actions)),
    ...Object.values(rawExactPageActionIds).flatMap((actions) => Object.values(actions)),
    ...Object.values(rawRoleLevelActionIds).flatMap((actions) => Object.values(actions)),
  ]),
).sort();

const navigationIntentWords = new Set([
  "open",
  "view",
  "go",
  "goto",
  "launch",
  "visit",
  "switch",
  "join",
  "watch",
  "continue",
  "back",
  "return",
  "manage",
  "explore",
  "enter",
  "browse",
]);

const nonNavigationIntentWords = new Set([
  "save",
  "submit",
  "approve",
  "reject",
  "block",
  "report",
  "cancel",
  "retry",
  "refresh",
  "download",
  "upload",
  "copy",
  "delete",
  "remove",
  "mute",
  "unmute",
  "enable",
  "disable",
  "toggle",
  "start",
  "stop",
]);

const helperTokens = new Set([
  "now",
  "all",
  "my",
  "to",
  "the",
  "and",
  "your",
  "app",
  "page",
  "pages",
  "module",
  "modules",
  "queue",
]);

const directNavKeywords = new Set([
  "home",
  "account",
  "profile",
  "discover",
  "series",
  "episode",
  "replay",
  "clip",
  "clips",
  "live",
  "events",
  "event",
  "calendar",
  "schedule",
  "community",
  "finance",
  "funds",
  "giving",
  "membership",
  "settings",
  "security",
  "moderation",
  "dashboard",
  "studio",
  "ops",
  "notifications",
  "messages",
  "contacts",
  "channels",
  "policy",
  "verification",
  "resources",
  "books",
  "wallet",
]);

const roleKeywordFallbackPath: Record<RoleKey, Record<string, string>> = {
  user: {
    home: routes.app.user.home,
    account: routes.app.user.entry,
    discover: routes.app.user.discover,
    resources: routes.app.user.resources,
    books: routes.app.user.resources,
    series: routes.app.user.series,
    live: routes.app.user.liveHub,
    events: routes.app.user.events,
    calendar: routes.app.user.events,
    schedule: routes.app.user.events,
    event: routes.app.user.eventDetail,
    community: routes.app.user.community,
    finance: routes.app.user.giving,
    funds: routes.app.user.giving,
    wallet: routes.app.user.wallet,
    giving: routes.app.user.giving,
    settings: routes.app.user.settings,
    security: routes.app.user.settings,
    membership: routes.app.user.membership,
    messages: routes.app.user.liveChat,
    notifications: routes.app.user.settings,
    replay: routes.app.user.replay,
    clips: routes.app.user.clips,
    episode: routes.app.user.episode,
  },
  provider: {
    home: routes.app.provider.dashboard,
    dashboard: routes.app.provider.dashboard,
    account: routes.app.provider.onboarding,
    resources: routes.app.provider.resources,
    books: routes.app.provider.resources,
    series: routes.app.provider.seriesBuilder,
    live: routes.app.provider.liveOps,
    schedule: routes.app.provider.liveSchedule,
    studio: routes.app.provider.liveStudio,
    ops: routes.app.provider.liveOps,
    events: routes.app.provider.events,
    calendar: routes.app.provider.liveSchedule,
    community: routes.app.provider.community,
    finance: routes.app.provider.funds,
    funds: routes.app.provider.funds,
    wallet: routes.app.provider.wallet,
    giving: routes.app.provider.funds,
    settings: routes.app.provider.dashboard,
    security: routes.app.provider.reviewsModeration,
    moderation: routes.app.provider.reviewsModeration,
    notifications: routes.app.provider.notifications,
    messages: routes.app.provider.contacts,
    contacts: routes.app.provider.contacts,
  },
  admin: {
    home: routes.app.admin.overview,
    dashboard: routes.app.admin.overview,
    discover: routes.app.user.discover,
    live: routes.app.admin.liveModeration,
    moderation: routes.app.admin.liveModeration,
    incident: routes.app.admin.liveModeration,
    incidents: routes.app.admin.liveModeration,
    events: routes.app.admin.liveModeration,
    calendar: routes.app.admin.overview,
    schedule: routes.app.admin.overview,
    community: routes.app.admin.overview,
    finance: routes.app.admin.finance,
    funds: routes.app.admin.finance,
    giving: routes.app.admin.finance,
    settings: routes.app.admin.security,
    security: routes.app.admin.security,
    messages: routes.app.admin.liveModeration,
    channels: routes.app.admin.channels,
    policy: routes.app.admin.policy,
    verification: routes.app.admin.verification,
  },
};

function tokenizeNormalized(value: string) {
  return normalizeLabel(value).split(" ").filter(Boolean);
}

function isLikelyNavigationIntent(normalizedLabel: string) {
  const tokens = normalizedLabel.split(" ").filter(Boolean);
  if (!tokens.length) return false;
  if (tokens.some((token) => nonNavigationIntentWords.has(token))) return false;
  if (tokens.some((token) => navigationIntentWords.has(token))) return true;
  return tokens.some((token) => {
    if (helperTokens.has(token)) return false;
    return directNavKeywords.has(token);
  });
}

function scorePageAgainstTokens(page: PageRegistryItem, labelTokens: string[], normalizedLabel: string) {
  const label = normalizeLabel(page.label);
  const navTag = normalizeLabel(page.navTag);
  const section = normalizeLabel(page.section);
  const pathTail = normalizeLabel((page.path.split("/").pop() || "").replace(/-/g, " "));

  let score = 0;

  if (label && normalizedLabel.includes(label)) score += 9;
  if (navTag && normalizedLabel.includes(navTag)) score += 7;
  if (pathTail && normalizedLabel.includes(pathTail)) score += 5;
  if (section && normalizedLabel.includes(section)) score += 3;

  const keywordTokens = new Set([...tokenizeNormalized(page.label), ...tokenizeNormalized(page.navTag), ...tokenizeNormalized(page.section), ...tokenizeNormalized(pathTail)]);

  for (const token of labelTokens) {
    if (helperTokens.has(token) || navigationIntentWords.has(token)) continue;
    if (keywordTokens.has(token)) score += 2;
  }

  return score;
}

function resolveHeuristicPageTarget(pathname: string, normalizedLabel: string) {
  if (!isLikelyNavigationIntent(normalizedLabel)) return null;

  const role = getRoleFromPath(pathname);
  const candidates = pagesByRole[role] || [];
  const labelTokens = normalizedLabel.split(" ").filter(Boolean);

  for (const token of labelTokens) {
    const mapped = roleKeywordFallbackPath[role]?.[token];
    if (mapped) return mapped;
  }

  let best: { path: string; score: number } | null = null;
  let tie = false;

  for (const page of candidates) {
    const score = scorePageAgainstTokens(page, labelTokens, normalizedLabel);
    if (score <= 0) continue;
    if (!best || score > best.score) {
      best = { path: page.path, score };
      tie = false;
      continue;
    }
    if (best && score === best.score && page.path !== best.path) {
      tie = true;
    }
  }

  if (!best || best.score < 4 || tie) return null;
  return best.path;
}

function validateActionTargets() {
  const unknownTargets = new Set<string>();
  for (const path of registeredActionTargets) {
    if (!knownActionTargets.has(path)) {
      unknownTargets.add(path);
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

export function getRegisteredActionTargets() {
  return [...registeredActionTargets];
}

export function isKnownActionTarget(path: string) {
  return knownActionTargets.has(path);
}

if (import.meta.env.DEV) {
  validateActionTargets();
}

function getRoleFromPath(pathname: string): RoleKey {
  if (pathname.startsWith("/app/provider")) return "provider";
  if (pathname.startsWith("/app/admin")) return "admin";
  return "user";
}

export function resolvePageButtonAction(pathname: string, label: string, actionId = "") {
  const cleanPathname = pathname.split(/[?#]/, 1)[0] || pathname;
  const normalizedActionId = normalizeActionId(actionId);
  if (normalizedActionId) {
    const exactByActionId = exactPageActionIds[cleanPathname]?.[normalizedActionId];
    if (exactByActionId) return exactByActionId;

    const roleByActionId = roleLevelActionIds[getRoleFromPath(cleanPathname)]?.[normalizedActionId];
    if (roleByActionId) return roleByActionId;

    const globalByActionId = globalActionIdTargets[normalizedActionId];
    if (globalByActionId) return globalByActionId;

    const heuristicByActionId = resolveHeuristicPageTarget(
      cleanPathname,
      normalizedActionId.replace(/-/g, " "),
    );
    if (heuristicByActionId) return heuristicByActionId;
  }

  const normalized = normalizeLabel(label);
  if (!normalized) return null;
  const exact = exactPageActions[cleanPathname]?.[normalized];
  if (exact) return exact;
  const roleLevel = roleLevelActions[getRoleFromPath(cleanPathname)]?.[normalized];
  if (roleLevel) return roleLevel;
  const globalMatch = globalActionLabelTargets[normalized];
  if (globalMatch) return globalMatch;
  return resolveHeuristicPageTarget(cleanPathname, normalized);
}
