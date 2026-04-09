import React, { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Flag,
  Heart,
  HeartHandshake,
  MessageSquareText,
  Pin,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  addComment,
  addReply,
  createPost,
  getCommunityPosts,
  getDefaultCommunityAuthor,
  moderateComment,
  reactToPost,
  reportComment,
  saveCommunityPosts,
  togglePostFlag,
  undoPostReaction,
} from "@/data/community";
import { trackEvent } from "@/data/tracker";
import type {
  CommunityComment,
  CommunityPost,
  CommunityReaction,
  CommunityRole,
} from "@/types/community";

type FeedFilter = "all" | "providers" | "pinned" | "discussions";
type TopicFilter = "all" | "prayer" | "testimony" | "announcement";

function formatTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderMentionText(content: string) {
  return content.split(/(\s+)/).map((token, index) =>
    token.startsWith("@") ? (
      <span key={`${token}-${index}`} className="font-semibold text-[var(--accent)]">
        {token}
      </span>
    ) : (
      token
    ),
  );
}

function roleBadge(role: CommunityRole, title?: string) {
  if (role === "provider") {
    return title || "Provider";
  }
  return "Member";
}

function reactionLabel(reaction: CommunityReaction) {
  if (reaction === "like") return "Amen";
  if (reaction === "pray") return "Pray";
  return "Support";
}

function topicFromPost(post: CommunityPost): Exclude<TopicFilter, "all"> {
  if (post.discussionTopic?.toLowerCase().includes("prayer")) return "prayer";
  if (post.discussionTopic?.toLowerCase().includes("testimony")) return "testimony";
  if (post.discussionTopic?.toLowerCase().includes("announcement")) return "announcement";
  if (post.content.toLowerCase().includes("prayer")) return "prayer";
  if (post.content.toLowerCase().includes("testimony")) return "testimony";
  return "announcement";
}

interface CommentThreadProps {
  comments: CommunityComment[];
  postId: string;
  canModerate: boolean;
  openReplyTarget: string | null;
  replyDrafts: Record<string, string>;
  onOpenReply: (commentId: string | null) => void;
  onReplyDraftChange: (commentId: string, value: string) => void;
  onSubmitReply: (postId: string, commentId: string) => void;
  onToggleModeration: (postId: string, commentId: string) => void;
  onToggleReport: (postId: string, commentId: string) => void;
}

function CommentThread({
  comments,
  postId,
  canModerate,
  openReplyTarget,
  replyDrafts,
  onOpenReply,
  onReplyDraftChange,
  onSubmitReply,
  onToggleModeration,
  onToggleReport,
}: CommentThreadProps) {
  if (!comments.length) return null;

  return (
    <div className="space-y-2.5">
      {comments.map((comment) => (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 sm:px-3 sm:py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[var(--text-primary)]">{comment.author.name}</span>
            <Badge className="fh-pill fh-pill-slate">{roleBadge(comment.author.role, comment.author.title)}</Badge>
            <span className="text-xs text-[var(--text-secondary)]">{formatTime(comment.timestamp)}</span>
            {comment.author.verified ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--accent)]">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            ) : null}
            {comment.moderated ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#f77f00]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Moderated
              </span>
            ) : null}
          </div>

          <div className="mt-1 text-[13px] leading-relaxed text-[var(--text-primary)] sm:text-sm">
            {renderMentionText(comment.content)}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              uiSize="sm"
              className="h-8 rounded-lg px-2 text-xs"
              onClick={() => onOpenReply(openReplyTarget === comment.id ? null : comment.id)}
            >
              Reply
            </Button>
            <Button
              type="button"
              variant="ghost"
              uiSize="sm"
              className="h-8 rounded-lg px-2 text-xs"
              onClick={() => onToggleReport(postId, comment.id)}
            >
              <Flag className="h-3.5 w-3.5" />
              {comment.reported ? "Reported" : "Report"}
            </Button>
            {canModerate ? (
              <Button
                type="button"
                variant="ghost"
                uiSize="sm"
                className="h-8 rounded-lg px-2 text-xs"
                onClick={() => onToggleModeration(postId, comment.id)}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {comment.moderated ? "Unmoderate" : "Moderate"}
              </Button>
            ) : null}
          </div>

          {openReplyTarget === comment.id ? (
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                value={replyDrafts[comment.id] || ""}
                onChange={(event) => onReplyDraftChange(comment.id, event.target.value)}
                placeholder="Reply to this comment..."
                className="min-h-[36px] w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.38)] sm:min-h-[40px]"
              />
              <Button
                type="button"
                uiSize="sm"
                className="h-9 min-w-[96px] sm:h-10 sm:min-w-[104px]"
                onClick={() => onSubmitReply(postId, comment.id)}
              >
                <Send className="h-3.5 w-3.5" />
                Reply
              </Button>
            </div>
          ) : null}

          {comment.replies.length ? (
            <div className="mt-2 border-l border-[var(--border)] pl-3">
              <CommentThread
                comments={comment.replies}
                postId={postId}
                canModerate={canModerate}
                openReplyTarget={openReplyTarget}
                replyDrafts={replyDrafts}
                onOpenReply={onOpenReply}
                onReplyDraftChange={onReplyDraftChange}
                onSubmitReply={onSubmitReply}
                onToggleModeration={onToggleModeration}
                onToggleReport={onToggleReport}
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function FaithHubCommunity() {
  const { role } = useAuth();
  const currentRole: CommunityRole = role === "provider" ? "provider" : "user";
  const canModerate = currentRole === "provider";

  const currentAuthor = useMemo(() => getDefaultCommunityAuthor(currentRole), [currentRole]);
  const [posts, setPosts] = useState<CommunityPost[]>(() => getCommunityPosts());
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("all");
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("all");
  const [composerText, setComposerText] = useState("");
  const [discussionTopic, setDiscussionTopic] = useState("");
  const [pinOnPublish, setPinOnPublish] = useState(false);
  const [highlightOnPublish, setHighlightOnPublish] = useState(true);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [openReplyTarget, setOpenReplyTarget] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [lastReaction, setLastReaction] = useState<{ postId: string; reaction: CommunityReaction } | null>(null);

  useEffect(() => {
    saveCommunityPosts(posts);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (feedFilter === "providers") {
      return posts.filter((post) => post.authorRole === "provider");
    }
    if (feedFilter === "pinned") {
      return posts.filter((post) => post.pinned);
    }
    if (feedFilter === "discussions") {
      return posts.filter((post) => post.threadStarter || Boolean(post.discussionTopic));
    }
    return posts;
  }, [feedFilter, posts]);

  const topicFilteredPosts = useMemo(() => {
    if (topicFilter === "all") return filteredPosts;
    return filteredPosts.filter((post) => topicFromPost(post) === topicFilter);
  }, [filteredPosts, topicFilter]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return topicFilteredPosts.slice(start, start + pageSize);
  }, [topicFilteredPosts, page]);

  const totalPages = Math.max(1, Math.ceil(topicFilteredPosts.length / pageSize));

  const pinnedPosts = useMemo(() => posts.filter((post) => post.pinned), [posts]);
  const topContributors = useMemo(() => {
    const counts = posts.reduce<Record<string, { name: string; role: CommunityRole; count: number; verified?: boolean }>>(
      (acc, post) => {
        const key = post.author.id;
        if (!acc[key]) {
          acc[key] = { name: post.author.name, role: post.authorRole, count: 0, verified: post.author.verified };
        }
        acc[key].count += 1;
        return acc;
      },
      {},
    );
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 4);
  }, [posts]);

  const publishPost = () => {
    const content = composerText.trim();
    if (!content) return;

    const result = createPost(posts, {
      content,
      author: currentAuthor,
      threadStarter: canModerate && Boolean(discussionTopic.trim()),
      discussionTopic: discussionTopic.trim() || null,
    });

    const nextPosts = result.posts.map((post) => {
      if (post.id !== result.created.id) return post;
      return {
        ...post,
        pinned: canModerate ? pinOnPublish : post.pinned,
        highlighted: canModerate ? highlightOnPublish : post.highlighted,
      };
    });

    setPosts(nextPosts);
    setComposerText("");
    setDiscussionTopic("");
    setPinOnPublish(false);
    setHighlightOnPublish(true);

    trackEvent(
      "CLICK_BUTTON",
      {
        id: "community-publish",
        label: "Publish Post",
        location: "community-composer",
      },
      { role: currentRole },
    );
  };

  const submitComment = (postId: string) => {
    const content = commentDrafts[postId]?.trim();
    if (!content) return;
    setPosts((previous) => addComment(previous, { postId, content, author: currentAuthor }));
    setCommentDrafts((previous) => ({ ...previous, [postId]: "" }));
  };

  const submitReply = (postId: string, commentId: string) => {
    const content = replyDrafts[commentId]?.trim();
    if (!content) return;
    setPosts((previous) =>
      addReply(previous, {
        postId,
        parentCommentId: commentId,
        content,
        author: currentAuthor,
      }),
    );
    setReplyDrafts((previous) => ({ ...previous, [commentId]: "" }));
    setOpenReplyTarget(null);
  };

  const handleReaction = (postId: string, reaction: CommunityReaction) => {
    setPosts((previous) => reactToPost(previous, { postId, reaction }));
    setLastReaction({ postId, reaction });
    trackEvent(
      "REACTION_ADDED",
      {
        postId,
        reaction,
      },
      { role: currentRole },
    );
  };

  const undoLastReaction = () => {
    if (!lastReaction) return;
    setPosts((previous) => undoPostReaction(previous, lastReaction));
    setLastReaction(null);
  };

  useEffect(() => {
    setPage(1);
  }, [feedFilter, topicFilter, posts.length]);

  return (
    <div className="space-y-3 sm:space-y-4">
      <Card className="fh-surface-card rounded-[24px]">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">Community</div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                Community Conversations
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                Share testimonies, prayer requests, and leadership guidance in one moderated, trust-first feed.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-slate">{posts.length} posts</Badge>
                <Badge className="fh-pill fh-pill-emerald">
                  {posts.filter((post) => post.authorRole === "provider").length} provider posts
                </Badge>
                <Badge className="fh-pill fh-pill-slate">
                  {currentRole === "provider" ? "Provider role" : "User role"}
                </Badge>
              </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["all", "providers", "pinned", "discussions"] as FeedFilter[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFeedFilter(item)}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition sm:px-3 sm:py-1.5 sm:text-sm ${
                    feedFilter === item
                      ? "border-[rgba(3,205,140,0.34)] bg-[rgba(3,205,140,0.16)] text-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "prayer", "testimony", "announcement"] as TopicFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTopicFilter(item)}
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition sm:px-3 sm:py-1.5 sm:text-sm ${
                  topicFilter === item
                    ? "border-[rgba(3,205,140,0.34)] bg-[rgba(3,205,140,0.16)] text-[var(--accent)]"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--surface)]"
                }`}
              >
                {item === "all" ? "All topics" : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {pinnedPosts.length ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-[var(--text-primary)]">Pinned updates</div>
              <Badge className="fh-pill fh-pill-emerald">{pinnedPosts.length} pinned</Badge>
            </div>
            <div className="space-y-2">
              {pinnedPosts.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-[rgba(3,205,140,0.28)] bg-[rgba(3,205,140,0.1)] px-3 py-2"
                >
                  <div className="text-xs font-semibold text-[var(--text-secondary)]">{post.author.name}</div>
                  <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{post.content}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {topContributors.length ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Top Contributors</div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {topContributors.map((contributor) => (
                <div
                  key={contributor.name}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"
                >
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{contributor.name}</div>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">
                    {contributor.role === "provider" ? "Provider" : "Member"} • {contributor.count} posts
                  </div>
                  {contributor.verified ? (
                    <div className="mt-1 text-[11px] font-semibold text-[var(--accent)]">Verified</div>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <div className="mb-2 text-sm font-semibold text-[var(--text-primary)]">Create a post</div>
          <textarea
            value={composerText}
            onChange={(event) => setComposerText(event.target.value)}
            rows={4}
            placeholder="Share encouragement, testimony, or prayer needs. Mention members with @name."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.38)]"
          />

          {canModerate ? (
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <input
                value={discussionTopic}
                onChange={(event) => setDiscussionTopic(event.target.value)}
                placeholder="Discussion topic (optional)"
                className="min-h-[40px] rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.38)]"
              />
              <div className="flex flex-wrap gap-2">
                <label className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    checked={pinOnPublish}
                    onChange={(event) => setPinOnPublish(event.target.checked)}
                    className="h-3.5 w-3.5 accent-[var(--accent)]"
                  />
                  Pin
                </label>
                <label className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    checked={highlightOnPublish}
                    onChange={(event) => setHighlightOnPublish(event.target.checked)}
                    className="h-3.5 w-3.5 accent-[var(--accent)]"
                  />
                  Highlight
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-3 flex justify-end">
            <Button type="button" className="fh-user-primary-btn" onClick={publishPost}>
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>

          {lastReaction ? (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[rgba(3,205,140,0.25)] bg-[rgba(3,205,140,0.1)] px-3 py-2">
              <div className="text-xs font-semibold text-[var(--text-secondary)]">
                Reaction added successfully.
              </div>
              <Button
                type="button"
                variant="ghost"
                uiSize="sm"
                className="h-8 rounded-lg px-2 text-xs"
                onClick={undoLastReaction}
              >
                Undo
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {paginatedPosts.map((post) => (
          <Card
            key={post.id}
            className={`fh-surface-card rounded-2xl ${
              post.authorRole === "provider"
                ? "border-[rgba(3,205,140,0.3)]"
                : "border-[var(--border)]"
            } ${
              post.highlighted ? "ring-1 ring-[rgba(3,205,140,0.2)]" : ""
            }`}
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]">
                  <UserRound className="h-4 w-4 text-[var(--text-secondary)]" />
                </span>
                <span className="font-semibold text-[var(--text-primary)]">{post.author.name}</span>
                <Badge className={post.authorRole === "provider" ? "fh-pill fh-pill-emerald" : "fh-pill fh-pill-slate"}>
                  {roleBadge(post.authorRole, post.author.title)}
                </Badge>
                {post.author.verified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--accent)]">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                ) : null}
                <span className="text-xs text-[var(--text-secondary)]">{formatTime(post.timestamp)}</span>
                {post.pinned ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(3,205,140,0.3)] bg-[rgba(3,205,140,0.14)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
                    <Pin className="h-3.5 w-3.5" />
                    Pinned
                  </span>
                ) : null}
                {post.discussionTopic ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[11px] font-semibold text-[var(--text-secondary)]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {post.discussionTopic}
                  </span>
                ) : null}
              </div>

              <div className="mt-3 text-sm leading-relaxed text-[var(--text-primary)]">{renderMentionText(post.content)}</div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(["like", "pray", "support"] as CommunityReaction[]).map((reaction) => (
                  <Button
                    key={reaction}
                    type="button"
                    variant="outline"
                    uiSize="sm"
                    className="h-8 rounded-lg px-2 text-xs"
                    onClick={() => handleReaction(post.id, reaction)}
                  >
                    {reaction === "like" ? <Heart className="h-3.5 w-3.5" /> : null}
                    {reaction === "pray" ? <HeartHandshake className="h-3.5 w-3.5" /> : null}
                    {reaction === "support" ? <ShieldCheck className="h-3.5 w-3.5" /> : null}
                    {reactionLabel(reaction)} ({post.reactions[reaction]})
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  uiSize="sm"
                  className="h-8 rounded-lg px-2 text-xs"
                  onClick={() => setPosts((previous) => togglePostFlag(previous, post.id, "reported"))}
                >
                  <Flag className="h-3.5 w-3.5" />
                  {post.reported ? "Reported" : "Report"}
                </Button>

                {canModerate ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      uiSize="sm"
                      className="h-8 rounded-lg px-2 text-xs"
                      onClick={() => setPosts((previous) => togglePostFlag(previous, post.id, "pinned"))}
                    >
                      <Pin className="h-3.5 w-3.5" />
                      {post.pinned ? "Unpin" : "Pin"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      uiSize="sm"
                      className="h-8 rounded-lg px-2 text-xs"
                      onClick={() => setPosts((previous) => togglePostFlag(previous, post.id, "highlighted"))}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      {post.highlighted ? "Unhighlight" : "Highlight"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      uiSize="sm"
                      className="h-8 rounded-lg px-2 text-xs"
                      onClick={() => setPosts((previous) => togglePostFlag(previous, post.id, "threadStarter"))}
                    >
                      <MessageSquareText className="h-3.5 w-3.5" />
                      {post.threadStarter ? "Close Thread" : "Start Thread"}
                    </Button>
                  </>
                ) : null}
              </div>

              <div className="mt-3 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                  Comments ({post.comments.length})
                </div>

                <CommentThread
                  comments={post.comments}
                  postId={post.id}
                  canModerate={canModerate}
                  openReplyTarget={openReplyTarget}
                  replyDrafts={replyDrafts}
                  onOpenReply={setOpenReplyTarget}
                  onReplyDraftChange={(commentId, value) =>
                    setReplyDrafts((previous) => ({ ...previous, [commentId]: value }))
                  }
                  onSubmitReply={submitReply}
                  onToggleModeration={(postId, commentId) =>
                    setPosts((previous) => moderateComment(previous, { postId, commentId }))
                  }
                  onToggleReport={(postId, commentId) =>
                    setPosts((previous) => reportComment(previous, { postId, commentId }))
                  }
                />

                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={commentDrafts[post.id] || ""}
                    onChange={(event) =>
                      setCommentDrafts((previous) => ({ ...previous, [post.id]: event.target.value }))
                    }
                    placeholder="Comment on this post..."
                    className="min-h-[36px] w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[rgba(3,205,140,0.38)] sm:min-h-[40px]"
                  />
                  <Button
                    type="button"
                    uiSize="sm"
                    className="h-9 min-w-[96px] sm:h-10 sm:min-w-[104px]"
                    onClick={() => submitComment(post.id)}
                  >
                    <MessageSquareText className="h-3.5 w-3.5" />
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!topicFilteredPosts.length ? (
          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="p-6 text-center text-sm text-[var(--text-secondary)]">
              No posts match this filter yet.
            </CardContent>
          </Card>
        ) : null}

        {topicFilteredPosts.length > pageSize ? (
          <Card className="fh-surface-card rounded-2xl">
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div className="text-xs text-[var(--text-secondary)]">
                Page {page} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  uiSize="sm"
                  className="h-8 rounded-lg px-3 text-xs"
                  onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  uiSize="sm"
                  className="h-8 rounded-lg px-3 text-xs"
                  onClick={() => setPage((previous) => Math.min(totalPages, previous + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
