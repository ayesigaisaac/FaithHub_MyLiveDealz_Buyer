import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BellRing, Filter, Pin, Plus, Search, ShieldCheck, X } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import NoticeCard, {
  type NoticeReaction,
  type NoticeReactionCounts,
} from "@/components/notice/NoticeCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  canManageNoticeboard,
  noticeRepository,
  type Notice,
  type NoticeType,
} from "@/data/notice.repository";

type FeedFilter = "all" | "pinned" | "event" | "urgent";
type VisibilityFilter = "active" | "all";
type ComposerMode = "create" | "edit";

type NoticeDraft = {
  title: string;
  message: string;
  type: NoticeType;
  expiresAt: string;
  isPinned: boolean;
};

const emptyDraft: NoticeDraft = {
  title: "",
  message: "",
  type: "announcement",
  expiresAt: "",
  isPinned: false,
};

const emptyReactions: NoticeReactionCounts = {
  amen: 0,
  pray: 0,
  support: 0,
};

function roleLabel(role: string) {
  if (role === "admin") return "Admin";
  if (role === "provider") return "Provider";
  return "User";
}

function toDateInputValue(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
}

function toIsoDate(value: string) {
  if (!value.trim()) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function createReactionSeed(noticeId: string): NoticeReactionCounts {
  let hash = 0;
  for (let i = 0; i < noticeId.length; i += 1) {
    hash = (hash * 31 + noticeId.charCodeAt(i)) % 997;
  }
  return {
    amen: (hash % 8) + 1,
    pray: ((hash >> 2) % 6) + 1,
    support: ((hash >> 3) % 5) + 1,
  };
}

function matchesSearch(notice: Notice, query: string) {
  if (!query) return true;
  const haystack = `${notice.title} ${notice.message} ${notice.author}`.toLowerCase();
  return haystack.includes(query);
}

export default function Noticeboard() {
  const { role, user } = useAuth();
  const canManage = canManageNoticeboard(role);

  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("active");
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("all");
  const [search, setSearch] = useState("");
  const [notices, setNotices] = useState<Notice[]>(() => noticeRepository.getAllNotices());
  const [reactionMap, setReactionMap] = useState<Record<string, NoticeReactionCounts>>({});
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerMode, setComposerMode] = useState<ComposerMode>("create");
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [draft, setDraft] = useState<NoticeDraft>(emptyDraft);
  const [submitting, setSubmitting] = useState(false);

  const refreshNotices = useCallback(() => {
    setNotices(
      noticeRepository.getAllNotices({
        includeExpired: visibilityFilter === "all",
      }),
    );
  }, [visibilityFilter]);

  useEffect(() => {
    refreshNotices();
  }, [refreshNotices]);

  useEffect(() => {
    setReactionMap((previous) => {
      const next: Record<string, NoticeReactionCounts> = { ...previous };
      let changed = false;

      const noticeIds = new Set(notices.map((notice) => notice.id));

      for (const notice of notices) {
        if (!next[notice.id]) {
          next[notice.id] = createReactionSeed(notice.id);
          changed = true;
        }
      }

      for (const existingId of Object.keys(next)) {
        if (!noticeIds.has(existingId)) {
          delete next[existingId];
          changed = true;
        }
      }

      return changed ? next : previous;
    });
  }, [notices]);

  const normalizedSearch = search.trim().toLowerCase();

  const searchedNotices = useMemo(
    () => notices.filter((notice) => matchesSearch(notice, normalizedSearch)),
    [notices, normalizedSearch],
  );

  const pinnedHighlights = useMemo(
    () => searchedNotices.filter((notice) => notice.isPinned).slice(0, 3),
    [searchedNotices],
  );

  const filteredFeed = useMemo(() => {
    if (feedFilter === "pinned") return searchedNotices.filter((notice) => notice.isPinned);
    if (feedFilter === "event") return searchedNotices.filter((notice) => notice.type === "event");
    if (feedFilter === "urgent") return searchedNotices.filter((notice) => notice.type === "urgent");
    return searchedNotices.filter((notice) => !notice.isPinned);
  }, [feedFilter, searchedNotices]);

  const filterCounts = useMemo(
    () => ({
      all: searchedNotices.length,
      pinned: searchedNotices.filter((notice) => notice.isPinned).length,
      event: searchedNotices.filter((notice) => notice.type === "event").length,
      urgent: searchedNotices.filter((notice) => notice.type === "urgent").length,
    }),
    [searchedNotices],
  );

  const openCreateModal = useCallback(() => {
    setComposerMode("create");
    setEditingNoticeId(null);
    setDraft(emptyDraft);
    setComposerOpen(true);
  }, []);

  const openEditModal = useCallback((notice: Notice) => {
    setComposerMode("edit");
    setEditingNoticeId(notice.id);
    setDraft({
      title: notice.title,
      message: notice.message,
      type: notice.type,
      expiresAt: toDateInputValue(notice.expiresAt),
      isPinned: notice.isPinned,
    });
    setComposerOpen(true);
  }, []);

  const closeComposer = useCallback(() => {
    setComposerOpen(false);
    setSubmitting(false);
    setComposerMode("create");
    setEditingNoticeId(null);
    setDraft(emptyDraft);
  }, []);

  const handleTogglePin = useCallback(
    (noticeId: string) => {
      noticeRepository.togglePin(noticeId);
      refreshNotices();
    },
    [refreshNotices],
  );

  const handleDelete = useCallback(
    (noticeId: string) => {
      noticeRepository.deleteNotice(noticeId);
      refreshNotices();
    },
    [refreshNotices],
  );

  const handleReact = useCallback((noticeId: string, reaction: NoticeReaction) => {
    setReactionMap((previous) => {
      const current = previous[noticeId] || emptyReactions;
      return {
        ...previous,
        [noticeId]: {
          ...current,
          [reaction]: current[reaction] + 1,
        },
      };
    });
  }, []);

  const handleSubmitNotice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = draft.title.trim();
    const message = draft.message.trim();
    if (!title || !message) return;

    setSubmitting(true);
    try {
      if (composerMode === "edit" && editingNoticeId) {
        noticeRepository.updateNotice(editingNoticeId, {
          title,
          message,
          type: draft.type,
          isPinned: draft.isPinned,
          expiresAt: toIsoDate(draft.expiresAt),
        });
      } else {
        noticeRepository.createNotice({
          title,
          message,
          type: draft.type,
          isPinned: draft.isPinned,
          expiresAt: toIsoDate(draft.expiresAt),
          author: user?.name || `${roleLabel(role)} Team`,
        });
      }
      refreshNotices();
      closeComposer();
    } finally {
      setSubmitting(false);
    }
  };

  const filterTabs: Array<{ key: FeedFilter; label: string; count: number }> = [
    { key: "all", label: "All", count: filterCounts.all },
    { key: "pinned", label: "Pinned", count: filterCounts.pinned },
    { key: "event", label: "Events", count: filterCounts.event },
    { key: "urgent", label: "Urgent", count: filterCounts.urgent },
  ];

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[26px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Community Noticeboard</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Stay Informed</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Follow trusted announcements, important event reminders, and urgent updates in one premium feed.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-slate">{notices.length} notices</Badge>
                <Badge className="fh-pill fh-pill-emerald">{filterCounts.pinned} pinned</Badge>
                <Badge className="fh-pill fh-pill-slate">{roleLabel(role)} workspace</Badge>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_190px_auto]">
              <label className="fh-user-input">
                <Search className="h-4 w-4 text-[var(--text-secondary)]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title or message"
                  className="w-full"
                />
              </label>

              <label className="fh-user-filter">
                <span className="inline-flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Visibility
                </span>
                <select
                  value={visibilityFilter}
                  onChange={(event) => setVisibilityFilter(event.target.value as VisibilityFilter)}
                  className="w-full"
                >
                  <option value="active">Active only</option>
                  <option value="all">Include expired</option>
                </select>
              </label>

              {canManage ? (
                <Button className="fh-user-primary-btn" onClick={openCreateModal}>
                  <Plus className="mr-1.5 h-4 w-4" />
                  Create Notice
                </Button>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = feedFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFeedFilter(tab.key)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                    isActive
                      ? "border-[rgba(3,205,140,0.34)] bg-[rgba(3,205,140,0.16)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {feedFilter === "all" && pinnedHighlights.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)]">
            <Pin className="h-5 w-5 text-[var(--accent)]" />
            Pinned Highlights
          </div>
          <div className="grid gap-3">
            {pinnedHighlights.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                canManage={canManage}
                reactionCounts={reactionMap[notice.id] || emptyReactions}
                onReact={handleReact}
                onEdit={openEditModal}
                onTogglePin={handleTogglePin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)]">
          <BellRing className="h-5 w-5 text-[var(--accent)]" />
          Notice Feed
        </div>

        {filteredFeed.length > 0 ? (
          <div className="grid gap-3">
            {filteredFeed.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                canManage={canManage}
                reactionCounts={reactionMap[notice.id] || emptyReactions}
                onReact={handleReact}
                onEdit={openEditModal}
                onTogglePin={handleTogglePin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="p-5 text-sm text-[var(--text-secondary)]">
              No notices match this filter. Try another filter or clear your search.
            </CardContent>
          </Card>
        )}
      </section>

      {!canManage ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 text-sm text-[var(--text-secondary)]">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
              Users can view and react. Admin and Provider roles can create, edit, pin, and delete notices.
            </div>
          </CardContent>
        </Card>
      ) : null}

      {canManage && composerOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
          <Card className="fh-surface-card w-full max-w-xl rounded-2xl">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="fh-label text-[var(--text-muted)]">
                    {composerMode === "edit" ? "Edit Notice" : "Create Notice"}
                  </div>
                  <h2 className="mt-1 text-xl font-semibold text-[var(--text-primary)]">
                    {composerMode === "edit" ? "Update announcement details" : "Publish a new community notice"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeComposer}
                  className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]"
                  aria-label="Close notice editor"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form className="mt-4 space-y-3" onSubmit={handleSubmitNotice}>
                <label className="fh-user-filter">
                  Title
                  <input
                    value={draft.title}
                    onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                    placeholder="Notice title"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    required
                  />
                </label>

                <label className="fh-user-filter">
                  Message
                  <textarea
                    value={draft.message}
                    onChange={(event) => setDraft((prev) => ({ ...prev, message: event.target.value }))}
                    placeholder="Write the notice message..."
                    rows={5}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    required
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="fh-user-filter">
                    Notice type
                    <select
                      value={draft.type}
                      onChange={(event) =>
                        setDraft((prev) => ({
                          ...prev,
                          type: event.target.value as NoticeType,
                        }))
                      }
                      className="w-full"
                    >
                      <option value="announcement">Announcement</option>
                      <option value="event">Event</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </label>

                  <label className="fh-user-filter">
                    Expires at (optional)
                    <input
                      type="datetime-local"
                      value={draft.expiresAt}
                      onChange={(event) => setDraft((prev) => ({ ...prev, expiresAt: event.target.value }))}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <label className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    checked={draft.isPinned}
                    onChange={(event) => setDraft((prev) => ({ ...prev, isPinned: event.target.checked }))}
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  Pin this notice to top
                </label>

                <div className="flex flex-wrap justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="fh-user-secondary-btn"
                    onClick={closeComposer}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="fh-user-primary-btn" disabled={submitting}>
                    {submitting
                      ? "Saving..."
                      : composerMode === "edit"
                      ? "Save changes"
                      : "Publish notice"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
