import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Heart, HeartHandshake, MessageCircle, Plus, Reply } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import PrayerForm from "@/components/community/PrayerForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  addPrayerComment,
  adjustPrayerReaction,
  createPrayerRequest,
  getPrayerRequests,
  getTestimonies,
  markPrayerAnswered,
} from "@/data/repositories/prayerRepository";
import { createNotification } from "@/data/notifications";
import { trackEvent } from "@/data/tracker";
import type { PrayerRequestRecord, Testimony } from "@/types/prayer";

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function categoryLabel(value: PrayerRequestRecord["category"]) {
  if (value === "healing") return "Healing";
  if (value === "family") return "Family";
  if (value === "finance") return "Finance";
  return "Spiritual";
}

function statusClass(status: PrayerRequestRecord["status"]) {
  if (status === "answered") return "fh-pill fh-pill-emerald";
  if (status === "ongoing") return "fh-pill fh-pill-slate";
  return "fh-pill fh-pill-slate";
}

function normalizeIdentity(value: string | undefined | null) {
  return (value || "").trim().toLowerCase();
}

export default function FaithHubPrayerRequests() {
  const { role, user } = useAuth();
  const [requests, setRequests] = useState<PrayerRequestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [openRepliesByComment, setOpenRepliesByComment] = useState<Record<string, boolean>>({});
  const [openCommentsByRequest, setOpenCommentsByRequest] = useState<Record<string, boolean>>({});
  const [prayedByRequest, setPrayedByRequest] = useState<Record<string, boolean>>({});
  const [testimonyDrafts, setTestimonyDrafts] = useState<Record<string, string>>({});
  const [openTestimonyComposer, setOpenTestimonyComposer] = useState<Record<string, boolean>>({});
  const [testimonyByPrayer, setTestimonyByPrayer] = useState<Record<string, Testimony>>({});

  const prayedStorageKey = useMemo(
    () => `faithhub_prayer_prayed_${user?.email || user?.name || "guest"}`,
    [user?.email, user?.name],
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(prayedStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      setPrayedByRequest(parsed || {});
    } catch {
      setPrayedByRequest({});
    }
  }, [prayedStorageKey]);

  const persistPrayedState = (next: Record<string, boolean>) => {
    setPrayedByRequest(next);
    try {
      window.localStorage.setItem(prayedStorageKey, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    let mounted = true;
    Promise.all([getPrayerRequests(), getTestimonies()]).then(([prayerData, testimonyData]) => {
      if (!mounted) return;
      setRequests(prayerData);
      setTestimonyByPrayer(
        testimonyData.reduce<Record<string, Testimony>>((acc, item) => {
          acc[item.linkedPrayerId] = item;
          return acc;
        }, {}),
      );
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const activeCount = useMemo(
    () => requests.filter((item) => item.status === "active" || item.status === "ongoing").length,
    [requests],
  );

  const urgentCount = useMemo(() => requests.filter((item) => item.urgency === "urgent").length, [requests]);

  const handleCreate = async (input: {
    title: string;
    description: string;
    category: "healing" | "family" | "finance" | "spiritual";
    isAnonymous: boolean;
    urgency: "normal" | "urgent";
    createdBy: string;
  }) => {
    const created = await createPrayerRequest(input);
    setRequests((previous) => [created, ...previous]);
    setIsFormOpen(false);
    trackEvent(
      "CLICK_BUTTON",
      { id: "prayer-create", label: created.title, location: "community-prayer" },
      { role },
    );
  };

  const handleSupport = async (id: string) => {
    const prevRequests = requests;
    setRequests((previous) =>
      previous.map((item) => (item.id === id ? { ...item, supportCount: item.supportCount + 1 } : item)),
    );

    const updated = await adjustPrayerReaction(id, "support", 1);
    if (updated) {
      setRequests((previous) => previous.map((item) => (item.id === id ? updated : item)));
    } else {
      setRequests(prevRequests);
    }

    trackEvent(
      "REACTION_ADDED",
      { postId: id, reaction: "support" },
      { role },
    );
  };

  const handlePrayedToggle = async (id: string) => {
    const request = requests.find((item) => item.id === id);
    const wasPrayed = Boolean(prayedByRequest[id]);
    const delta = wasPrayed ? -1 : 1;
    const previousMap = prayedByRequest;
    const nextMap = { ...previousMap, [id]: !wasPrayed };
    const previousRequests = requests;

    persistPrayedState(nextMap);
    setRequests((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, prayedCount: Math.max(0, item.prayedCount + delta) } : item,
      ),
    );

    const updated = await adjustPrayerReaction(id, "prayed", delta);
    if (updated) {
      setRequests((previous) => previous.map((item) => (item.id === id ? updated : item)));
    } else {
      persistPrayedState(previousMap);
      setRequests(previousRequests);
    }

    if (!wasPrayed && request) {
      const actor = user?.name || user?.email || "A member";
      if (normalizeIdentity(request.createdBy) !== normalizeIdentity(actor)) {
        createNotification("prayed", `${actor} prayed for your request: "${request.title}"`);
      }
    }

    trackEvent(
      "REACTION_ADDED",
      { postId: id, reaction: "pray" },
      { role },
    );
  };

  const handleComment = async (id: string, parentCommentId?: string) => {
    const request = requests.find((item) => item.id === id);
    const draftKey = parentCommentId ? `${id}:${parentCommentId}` : id;
    const message = ((parentCommentId ? replyDrafts[draftKey] : commentDrafts[id]) || "").trim();
    if (!message) return;

    const author = user?.name || user?.email || "Faith member";
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      prayerId: id,
      user: author,
      message,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    const prevRequests = requests;

    setRequests((previous) =>
      previous.map((item) =>
        item.id === id
          ? parentCommentId
            ? {
                ...item,
                comments: item.comments.map((comment) =>
                  comment.id === parentCommentId
                    ? { ...comment, replies: [...(comment.replies || []), optimisticComment] }
                    : comment,
                ),
                commentCount: item.commentCount + 1,
              }
            : {
                ...item,
                comments: [...item.comments, optimisticComment],
                commentCount: item.commentCount + 1,
              }
          : item,
      ),
    );
    if (parentCommentId) {
      setReplyDrafts((previous) => ({ ...previous, [draftKey]: "" }));
      setOpenRepliesByComment((previous) => ({ ...previous, [draftKey]: false }));
    } else {
      setCommentDrafts((previous) => ({ ...previous, [id]: "" }));
    }

    const updated = await addPrayerComment(id, message, author, parentCommentId);
    if (updated) {
      setRequests((previous) => previous.map((item) => (item.id === id ? updated : item)));
    } else {
      setRequests(prevRequests);
    }

    if (request) {
      if (normalizeIdentity(request.createdBy) !== normalizeIdentity(author)) {
        createNotification("comment", `${author} commented on your prayer: "${request.title}"`);
      }
    }

    trackEvent(
      "CLICK_BUTTON",
      { id: "prayer-comment", label: "Add comment", location: "community-prayer" },
      { role },
    );
  };

  const handleMarkAnswered = async (requestId: string) => {
    const request = requests.find((item) => item.id === requestId);
    const testimonyMessage = (testimonyDrafts[requestId] || "").trim();
    if (!testimonyMessage) return;

    const previousRequests = requests;
    const previousTestimony = testimonyByPrayer;

    setRequests((previous) =>
      previous.map((item) => (item.id === requestId ? { ...item, status: "answered" } : item)),
    );
    const optimisticTestimony: Testimony = {
      id: `temp-testimony-${Date.now()}`,
      linkedPrayerId: requestId,
      message: testimonyMessage,
      createdAt: new Date().toISOString(),
    };
    setTestimonyByPrayer((previous) => ({ ...previous, [requestId]: optimisticTestimony }));
    setOpenTestimonyComposer((previous) => ({ ...previous, [requestId]: false }));
    setTestimonyDrafts((previous) => ({ ...previous, [requestId]: "" }));

    const result = await markPrayerAnswered(requestId, testimonyMessage);
    if (!result.request || !result.testimony) {
      setRequests(previousRequests);
      setTestimonyByPrayer(previousTestimony);
      return;
    }

    setRequests((previous) => previous.map((item) => (item.id === requestId ? result.request! : item)));
    setTestimonyByPrayer((previous) => ({ ...previous, [requestId]: result.testimony! }));

    if (request) {
      createNotification("answered", `Prayer answered: "${request.title}"`);
    }

    trackEvent(
      "CLICK_BUTTON",
      { id: "prayer-mark-answered", label: "Mark answered", location: "community-prayer" },
      { role },
    );
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Community</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Prayer Requests</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Share requests, stand with others in prayer, and support your community in real time.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-slate">{requests.length} requests</Badge>
                <Badge className="fh-pill fh-pill-emerald">{activeCount} active</Badge>
                <Badge className="fh-pill fh-pill-slate">{urgentCount} urgent</Badge>
              </div>
            </div>
            <Button className="fh-user-primary-btn" onClick={() => setIsFormOpen((previous) => !previous)}>
              <Plus className="h-4 w-4" />
              {isFormOpen ? "Close Form" : "New Prayer Request"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isFormOpen ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <PrayerForm
              createdBy={user?.name || user?.email || "Faith member"}
              onCancel={() => setIsFormOpen(false)}
              onSubmit={handleCreate}
            />
          </CardContent>
        </Card>
      ) : null}

      {isLoading ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-6 text-center text-sm text-[var(--text-secondary)]">
            Loading prayer requests...
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {requests.map((request) => (
            <Card
              key={request.id}
              className={`fh-surface-card rounded-2xl ${request.urgency === "urgent" ? "border-[rgba(247,127,0,0.38)]" : ""}`}
            >
              <CardContent className="space-y-3 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">{request.title}</h3>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {request.createdBy} - {formatDate(request.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge className="fh-pill fh-pill-slate">{categoryLabel(request.category)}</Badge>
                    <Badge className={statusClass(request.status)}>{request.status}</Badge>
                    {request.status === "answered" ? (
                      <Badge className="fh-pill bg-[rgba(3,205,140,0.18)] text-[var(--accent)]">🙌 Answered</Badge>
                    ) : null}
                    {request.urgency === "urgent" ? (
                      <Badge className="fh-pill bg-[#f77f00]/20 text-[#f77f00]">Urgent</Badge>
                    ) : null}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-primary)]">{request.description}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge className="fh-pill fh-pill-emerald">{request.prayedCount} people prayed</Badge>
                  <Badge className="fh-pill fh-pill-slate">{request.supportCount} supports</Badge>
                  <Badge className="fh-pill fh-pill-slate">{request.commentCount} comments</Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    uiSize="sm"
                    className={`h-8 rounded-lg px-2 text-xs ${
                      prayedByRequest[request.id]
                        ? "border-[rgba(3,205,140,0.35)] bg-[rgba(3,205,140,0.14)] text-[var(--accent)]"
                        : ""
                    }`}
                    onClick={() => handlePrayedToggle(request.id)}
                  >
                    <HeartHandshake className="h-3.5 w-3.5" />
                    {prayedByRequest[request.id] ? "Undo Prayer" : "I Prayed"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    uiSize="sm"
                    className="h-8 rounded-lg px-2 text-xs"
                    onClick={() => handleSupport(request.id)}
                  >
                    <Heart className="h-3.5 w-3.5" />
                    Support
                  </Button>
                  {request.status !== "answered" ? (
                    <Button
                      type="button"
                      variant="outline"
                      uiSize="sm"
                      className="h-8 rounded-lg px-2 text-xs"
                      onClick={() =>
                        setOpenTestimonyComposer((previous) => ({
                          ...previous,
                          [request.id]: !previous[request.id],
                        }))
                      }
                    >
                      🙌 Mark Answered
                    </Button>
                  ) : null}
                </div>

                {request.status === "answered" && testimonyByPrayer[request.id] ? (
                  <div className="rounded-xl border border-[rgba(3,205,140,0.28)] bg-[rgba(3,205,140,0.1)] px-3 py-2">
                    <div className="text-xs font-semibold text-[var(--accent)]">Testimony</div>
                    <div className="mt-1 text-sm text-[var(--text-primary)]">
                      {testimonyByPrayer[request.id].message}
                    </div>
                  </div>
                ) : null}

                {openTestimonyComposer[request.id] ? (
                  <div className="space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                    <div className="text-xs font-semibold text-[var(--text-primary)]">
                      Share testimony for this answered prayer
                    </div>
                    <textarea
                      value={testimonyDrafts[request.id] || ""}
                      onChange={(event) =>
                        setTestimonyDrafts((previous) => ({
                          ...previous,
                          [request.id]: event.target.value,
                        }))
                      }
                      rows={2}
                      placeholder="How did God answer this request?"
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
                    />
                    <div className="flex justify-end">
                      <Button type="button" uiSize="sm" className="h-8 px-3 text-xs" onClick={() => handleMarkAnswered(request.id)}>
                        Save Testimony
                      </Button>
                    </div>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    uiSize="sm"
                    className="h-8 rounded-lg px-2 text-xs"
                    onClick={() =>
                      setOpenCommentsByRequest((previous) => ({
                        ...previous,
                        [request.id]: !previous[request.id],
                      }))
                    }
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {openCommentsByRequest[request.id] ? "Hide comments" : `Show comments (${request.commentCount})`}
                    {openCommentsByRequest[request.id] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </Button>

                  {openCommentsByRequest[request.id] ? (
                    <div className="space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                      {request.comments.length ? (
                        request.comments.map((comment) => {
                          const replyKey = `${request.id}:${comment.id}`;
                          return (
                            <div key={comment.id} className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-2.5">
                              <div className="text-xs font-semibold text-[var(--text-primary)]">{comment.user}</div>
                              <div className="text-xs text-[var(--text-secondary)]">{comment.message}</div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  uiSize="sm"
                                  className="h-7 px-2 text-[11px]"
                                  onClick={() =>
                                    setOpenRepliesByComment((previous) => ({
                                      ...previous,
                                      [replyKey]: !previous[replyKey],
                                    }))
                                  }
                                >
                                  <Reply className="h-3 w-3" />
                                  Reply
                                </Button>
                              </div>

                              {(comment.replies || []).length ? (
                                <div className="space-y-1.5 border-l border-[var(--border)] pl-3">
                                  {(comment.replies || []).map((reply) => (
                                    <div key={reply.id} className="rounded-md bg-[var(--surface)] px-2 py-1.5">
                                      <div className="text-[11px] font-semibold text-[var(--text-primary)]">{reply.user}</div>
                                      <div className="text-[11px] text-[var(--text-secondary)]">{reply.message}</div>
                                    </div>
                                  ))}
                                </div>
                              ) : null}

                              {openRepliesByComment[replyKey] ? (
                                <div className="flex gap-2">
                                  <input
                                    value={replyDrafts[replyKey] || ""}
                                    onChange={(event) =>
                                      setReplyDrafts((previous) => ({ ...previous, [replyKey]: event.target.value }))
                                    }
                                    placeholder="Write a reply..."
                                    className="min-h-[34px] w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
                                  />
                                  <Button
                                    type="button"
                                    uiSize="sm"
                                    className="h-8 px-2 text-xs"
                                    onClick={() => handleComment(request.id, comment.id)}
                                  >
                                    Send
                                  </Button>
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-xs text-[var(--text-secondary)]">No comments yet. Be the first to encourage.</div>
                      )}

                      <div className="flex gap-2">
                        <input
                          value={commentDrafts[request.id] || ""}
                          onChange={(event) =>
                            setCommentDrafts((previous) => ({ ...previous, [request.id]: event.target.value }))
                          }
                          placeholder="Add a prayer comment..."
                          className="min-h-[36px] w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.36)]"
                        />
                        <Button
                          type="button"
                          uiSize="sm"
                          className="h-9 px-3 text-xs"
                          onClick={() => handleComment(request.id)}
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
