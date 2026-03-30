import React, { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CornerDownRight,
  Flag,
  Heart,
  HeartHandshake,
  MessageSquare,
  Pin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "@/data/community";
import type { CommunityComment, CommunityPost, CommunityRole } from "@/types/community";

type FeedFilter = "all" | "providers" | "pinned";

function formatTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderMentionText(content: string) {
  const tokens = content.split(/(\s+)/);
  return tokens.map((token, index) => {
    if (!token.startsWith("@")) return <React.Fragment key={`${token}-${index}`}>{token}</React.Fragment>;
    return (
      <span key={`${token}-${index}`} className="font-semibold text-[var(--accent)]">
        {token}
      </span>
    );
  });
}

function providerBadge(title?: string) {
  if (!title) return "Provider";
  return title;
}

export default function FaithHubCommunity() {
  const { role } = useAuth();
  const currentRole: CommunityRole = role === "provider" ? "provider" : "user";
  const isProvider = currentRole === "provider";
  const currentAuthor = useMemo(() => getDefaultCommunityAuthor(currentRole), [currentRole]);

  const [posts, setPosts] = useState<CommunityPost[]>(() => getCommunityPosts());
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("all");
  const [composerText, setComposerText] = useState("");
  const [discussionTopic, setDiscussionTopic] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [openReplyTarget, setOpenReplyTarget] = useState<string | null>(null);

  useEffect(() => {
    saveCommunityPosts(posts);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (feedFilter === "providers") return posts.filter((post) => post.authorRole === "provider");
    if (feedFilter === "pinned") return posts.filter((post) => post.pinned);
    return posts;
  }, [feedFilter, posts]);

  const providerPostCount = posts.filter((post) => post.authorRole === "provider").length;
  const activeDiscussionCount = posts.filter((post) => post.threadStarter).length;

  const publishPost = () => {
    const content = composerText.trim();
    if (!content) return;
    const result = createPost(posts, {
      content,
      author: currentAuthor,
      threadStarter: isProvider && Boolean(discussionTopic.trim()),
      discussionTopic: isProvider && discussionTopic.trim() ? discussionTopic.trim() : null,
    });
    setPosts(result.posts);
    setComposerText("");
    setDiscussionTopic("");
  };

  const submitComment = (postId: string) => {
    const content = (commentDrafts[postId] || "").trim();
    if (!content) return;
    const nextPosts = addComment(posts, {
      postId,
      content,
      author: currentAuthor,
    });
    setPosts(nextPosts);
    setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
  };

  const submitReply = (postId: string, commentId: string) => {
    const content = (replyDrafts[commentId] || "").trim();
    if (!content) return;
    const nextPosts = addReply(posts, {
      postId,
      parentCommentId: commentId,
      content,
      author: currentAuthor,
    });
    setPosts(nextPosts);
    setReplyDrafts((prev) => ({ ...prev, [commentId]: "" }));
    setOpenReplyTarget(null);
  };

  const renderComment = (postId: string, comment: CommunityComment, depth = 0): React.ReactNode => {
    const clampedDepth = Math.min(depth, 3);
    const moderatedMessage = "Comment hidden by provider moderation.";

    return (
      <div key={comment.id} className="space-y-2" style={{ marginLeft: `${clampedDepth * 16}px` }}>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <UserRound className="h-3.5 w-3.5" />
              <span className="font-semibold text-[var(--text-primary)]">{comment.author.name}</span>
              {comment.author.role === "provider" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(3,205,140,0.16)] px-2 py-0.5 font-semibold text-[var(--accent)]">
                  <BadgeCheck className="h-3 w-3" />
                  {providerBadge(comment.author.title)}
                </span>
              ) : null}
              <span>{formatTime(comment.timestamp)}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setOpenReplyTarget((prev) => (prev === comment.id ? null : comment.id))}
                className="inline-flex items-center rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
              >
                Reply
              </button>
              <button
                type="button"
                onClick={() => setPosts(reportComment(posts, { postId, commentId: comment.id }))}
                className={`inline-flex items-center rounded-lg border px-2 py-1 text-xs font-semibold transition ${
                  comment.reported
                    ? "border-[rgba(247,127,0,0.35)] bg-[rgba(247,127,0,0.12)] text-[var(--warning)]"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--fh-elevated-surface)]"
                }`}
              >
                Report
              </button>
              {isProvider ? (
                <button
                  type="button"
                  onClick={() => setPosts(moderateComment(posts, { postId, commentId: comment.id }))}
                  className="inline-flex items-center rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
                >
                  {comment.moderated ? "Unhide" : "Moderate"}
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-2 text-sm text-[var(--text-secondary)]">
            {comment.moderated ? moderatedMessage : renderMentionText(comment.content)}
          </div>
        </div>

        {openReplyTarget === comment.id ? (
          <div className="ml-4 flex items-center gap-2">
            <CornerDownRight className="h-4 w-4 text-[var(--text-secondary)]" />
            <input
              value={replyDrafts[comment.id] || ""}
              onChange={(event) =>
                setReplyDrafts((prev) => ({
                  ...prev,
                  [comment.id]: event.target.value,
                }))
              }
              placeholder="Write a reply and mention with @name"
              className="h-10 flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,205,140,0.34)]"
            />
            <Button className="fh-user-primary-btn" onClick={() => submitReply(postId, comment.id)}>
              Reply
            </Button>
          </div>
        ) : null}

        {comment.replies.length ? (
          <div className="space-y-2">
            {comment.replies.map((reply) => renderComment(postId, reply, depth + 1))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="fh-label text-[var(--text-muted)]">FaithHub Community</div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">Community Hub</h1>
              <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                A shared space for members and providers to post updates, guide discussions, and grow trusted
                conversations together.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="fh-pill fh-pill-slate">{posts.length} posts</Badge>
                <Badge className="fh-pill fh-pill-emerald">{providerPostCount} provider posts</Badge>
                <Badge className="fh-pill fh-pill-slate">{activeDiscussionCount} active threads</Badge>
                {isProvider ? (
                  <Badge className="fh-pill fh-pill-emerald inline-flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Provider mode
                  </Badge>
                ) : (
                  <Badge className="fh-pill fh-pill-slate">Member mode</Badge>
                )}
              </div>
            </div>

            <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--card)] p-1">
              <button
                type="button"
                onClick={() => setFeedFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  feedFilter === "all" ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--text-secondary)]"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFeedFilter("providers")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  feedFilter === "providers" ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--text-secondary)]"
                }`}
              >
                Providers
              </button>
              <button
                type="button"
                onClick={() => setFeedFilter("pinned")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  feedFilter === "pinned" ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--text-secondary)]"
                }`}
              >
                Pinned
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-5">
          <div className="text-base font-semibold text-[var(--text-primary)]">Create post</div>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Both members and providers can post. Mention people with `@name`.
          </p>
          <div className="mt-3 space-y-3">
            <textarea
              value={composerText}
              onChange={(event) => setComposerText(event.target.value)}
              placeholder={
                isProvider
                  ? "Share guidance, announcements, or open a discussion thread..."
                  : "Share encouragement, testimony, or community updates..."
              }
              rows={4}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,205,140,0.34)]"
            />
            {isProvider ? (
              <label className="fh-user-filter">
                Discussion topic (optional)
                <input
                  value={discussionTopic}
                  onChange={(event) => setDiscussionTopic(event.target.value)}
                  placeholder="Example: Family Prayer Week"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text-primary)]"
                />
              </label>
            ) : null}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" />
                Trust tools enabled: report + moderation workflow
              </div>
              <Button className="fh-user-primary-btn" onClick={publishPost}>
                Publish post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const providerCard = post.authorRole === "provider";
          return (
            <Card
              key={post.id}
              className={`fh-surface-card rounded-2xl ${
                providerCard ? "border-[rgba(3,205,140,0.36)] bg-[var(--accent-soft)]" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{post.author.name}</div>
                      {post.authorRole === "provider" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(3,205,140,0.18)] px-2 py-0.5 text-xs font-semibold text-[var(--accent)]">
                          <BadgeCheck className="h-3 w-3" />
                          {providerBadge(post.author.title)}
                        </span>
                      ) : null}
                      {post.pinned ? <span className="fh-pill fh-pill-slate">Pinned</span> : null}
                      {post.highlighted ? <span className="fh-pill fh-pill-emerald">Highlighted</span> : null}
                      {post.threadStarter ? (
                        <span className="fh-pill fh-pill-slate">Discussion: {post.discussionTopic || "Open thread"}</span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-xs text-[var(--text-secondary)]">
                      {formatTime(post.timestamp)} • {post.authorRole}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPosts(togglePostFlag(posts, post.id, "reported"))}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold transition ${
                        post.reported
                          ? "border-[rgba(247,127,0,0.35)] bg-[rgba(247,127,0,0.12)] text-[var(--warning)]"
                          : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--fh-elevated-surface)]"
                      }`}
                    >
                      <Flag className="h-3.5 w-3.5" />
                      Report
                    </button>
                    {isProvider ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setPosts(togglePostFlag(posts, post.id, "pinned"))}
                          className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
                        >
                          <Pin className="h-3.5 w-3.5" />
                          {post.pinned ? "Unpin" : "Pin"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPosts(togglePostFlag(posts, post.id, "highlighted"))}
                          className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          {post.highlighted ? "Unhighlight" : "Highlight"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPosts(togglePostFlag(posts, post.id, "threadStarter"))}
                          className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          {post.threadStarter ? "Close thread" : "Start thread"}
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{renderMentionText(post.content)}</div>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPosts(reactToPost(posts, { postId: post.id, reaction: "like" }))}
                    className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
                  >
                    <Heart className="h-3.5 w-3.5" />
                    Like {post.reactions.like}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPosts(reactToPost(posts, { postId: post.id, reaction: "pray" }))}
                    className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Pray {post.reactions.pray}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPosts(reactToPost(posts, { postId: post.id, reaction: "support" }))}
                    className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--fh-elevated-surface)]"
                  >
                    <HeartHandshake className="h-3.5 w-3.5" />
                    Support {post.reactions.support}
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {post.comments.map((comment) => renderComment(post.id, comment))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input
                    value={commentDrafts[post.id] || ""}
                    onChange={(event) =>
                      setCommentDrafts((prev) => ({
                        ...prev,
                        [post.id]: event.target.value,
                      }))
                    }
                    placeholder="Write a comment... use @name for mentions"
                    className="h-10 flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,205,140,0.34)]"
                  />
                  <Button className="fh-user-primary-btn" onClick={() => submitComment(post.id)}>
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
