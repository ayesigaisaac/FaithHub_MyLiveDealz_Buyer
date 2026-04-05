import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Info,
  MoreVertical,
  PencilLine,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Notice } from "@/data/notice.repository";

export type NoticeReaction = "amen" | "pray" | "support";
export type NoticeReactionCounts = Record<NoticeReaction, number>;

type NoticeCardProps = {
  notice: Notice;
  canManage: boolean;
  reactionCounts: NoticeReactionCounts;
  onReact?: (noticeId: string, reaction: NoticeReaction) => void;
  onTogglePin?: (noticeId: string) => void;
  onDelete?: (noticeId: string) => void;
  onEdit?: (notice: Notice) => void;
};

const reactionMeta: Record<NoticeReaction, { label: string; emoji: string }> = {
  amen: { label: "Amen", emoji: "\uD83D\uDC4D" },
  pray: { label: "Pray", emoji: "\uD83D\uDE4F" },
  support: { label: "Support", emoji: "\u2764\uFE0F" },
};

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function typeMeta(type: Notice["type"]) {
  if (type === "urgent") {
    return {
      icon: AlertTriangle,
      badgeClass: "border border-[rgba(239,68,68,0.34)] bg-[rgba(239,68,68,0.12)] text-[#ef4444]",
      iconShellClass: "border border-[rgba(239,68,68,0.34)] bg-[rgba(239,68,68,0.12)] text-[#ef4444]",
    };
  }

  if (type === "event") {
    return {
      icon: CalendarDays,
      badgeClass: "fh-pill fh-pill-emerald",
      iconShellClass: "border border-[rgba(3,205,140,0.3)] bg-[rgba(3,205,140,0.12)] text-[var(--accent)]",
    };
  }

  return {
    icon: Info,
    badgeClass: "fh-pill fh-pill-slate",
    iconShellClass: "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]",
  };
}

const previewStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

function NoticeCardComponent({
  notice,
  canManage,
  reactionCounts,
  onReact,
  onTogglePin,
  onDelete,
  onEdit,
}: NoticeCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuListRef = useRef<HTMLDivElement | null>(null);
  const meta = useMemo(() => typeMeta(notice.type), [notice.type]);
  const TypeIcon = meta.icon;
  const menuId = `notice-actions-${notice.id}`;

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const firstMenuItem = menuListRef.current?.querySelector<HTMLButtonElement>("button[role='menuitem']");
    firstMenuItem?.focus();
  }, [menuOpen]);

  const cardClass = [
    "fh-surface-card rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--fh-shadow-card-hover)]",
    notice.isPinned
      ? "ring-1 ring-[rgba(3,205,140,0.24)] shadow-[0_0_0_1px_rgba(3,205,140,0.18),0_12px_22px_rgba(3,205,140,0.09)]"
      : "",
    notice.type === "urgent" ? "border-[rgba(239,68,68,0.42)]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card className={cardClass}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.iconShellClass}`.trim()}
          >
            <TypeIcon className="h-4.5 w-4.5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="truncate text-base font-semibold text-[var(--text-primary)]">{notice.title}</h3>
                  <Badge className={meta.badgeClass}>{notice.type}</Badge>
                  {notice.isPinned ? (
                    <Badge className="fh-pill fh-pill-emerald">
                      <Pin className="mr-1 h-3.5 w-3.5" />
                      Pinned
                    </Badge>
                  ) : null}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]" style={previewStyle}>
                  {notice.message.trim()}
                </p>
              </div>

              {canManage ? (
                <div className="relative" ref={menuRef}>
                  <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setMenuOpen(true);
                      }
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]"
                    aria-label="Open notice actions"
                    aria-haspopup="menu"
                    aria-controls={menuOpen ? menuId : undefined}
                    aria-expanded={menuOpen}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {menuOpen ? (
                    <div
                      id={menuId}
                      ref={menuListRef}
                      role="menu"
                      aria-label="Notice actions"
                      onKeyDown={(event) => {
                        const menuItems = Array.from(
                          menuListRef.current?.querySelectorAll<HTMLButtonElement>("button[role='menuitem']") || [],
                        );
                        if (!menuItems.length) return;
                        const activeElement = document.activeElement;
                        const currentIndex = menuItems.findIndex((item) => item === activeElement);
                        if (event.key === "Escape") {
                          event.preventDefault();
                          setMenuOpen(false);
                          menuButtonRef.current?.focus();
                          return;
                        }
                        if (event.key === "ArrowDown") {
                          event.preventDefault();
                          const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % menuItems.length;
                          menuItems[nextIndex]?.focus();
                        }
                        if (event.key === "ArrowUp") {
                          event.preventDefault();
                          const prevIndex =
                            currentIndex < 0 ? menuItems.length - 1 : (currentIndex - 1 + menuItems.length) % menuItems.length;
                          menuItems[prevIndex]?.focus();
                        }
                      }}
                      className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--fh-shadow-card)]"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onTogglePin?.(notice.id);
                          setMenuOpen(false);
                          menuButtonRef.current?.focus();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]"
                      >
                        {notice.isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                        {notice.isPinned ? "Unpin" : "Pin"}
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onEdit?.(notice);
                          setMenuOpen(false);
                          menuButtonRef.current?.focus();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-[var(--text-primary)] transition hover:bg-[var(--accent-soft)]"
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onDelete?.(notice.id);
                          setMenuOpen(false);
                          menuButtonRef.current?.focus();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-[var(--warning)] transition hover:bg-[rgba(247,127,0,0.12)]"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--text-secondary)]">{notice.author}</span>
              <span>|</span>
              <span>{formatDate(notice.createdAt)}</span>
              {notice.expiresAt ? (
                <>
                  <span>|</span>
                  <span>Expires {formatDate(notice.expiresAt)}</span>
                </>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(reactionMeta) as NoticeReaction[]).map((reaction) => (
                <Button
                  key={`${notice.id}:${reaction}`}
                  type="button"
                  variant="outline"
                  uiSize="sm"
                  className="fh-user-secondary-btn !rounded-full !px-3 !py-1.5"
                  onClick={() => onReact?.(notice.id, reaction)}
                >
                  <span aria-hidden>{reactionMeta[reaction].emoji}</span>
                  <span>{reactionMeta[reaction].label}</span>
                  <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-xs">
                    {reactionCounts[reaction] || 0}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(NoticeCardComponent);
