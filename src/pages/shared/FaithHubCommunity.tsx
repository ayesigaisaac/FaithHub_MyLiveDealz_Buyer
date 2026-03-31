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
import type {
  CommunityComment,
  CommunityPost,
  CommunityRole,
} from "@/types/community";

type FeedFilter = "all" | "providers" | "pinned";

function formatTime(value: string) {
  return new Date(value).toLocaleString();
}

function renderMentionText(content: string) {
  return content.split(/(\s+)/).map((token, index) =>
    token.startsWith("@") ? (
      <span key={index} className="font-semibold text-[var(--accent)]">
        {token}
      </span>
    ) : (
      token
    )
  );
}

export default function FaithHubCommunity() {
  const { role } = useAuth();
  const currentRole: CommunityRole =
    role === "provider" ? "provider" : "user";
  const isProvider = currentRole === "provider";

  const currentAuthor = useMemo(
    () => getDefaultCommunityAuthor(currentRole),
    [currentRole]
  );

  const [posts, setPosts] = useState<CommunityPost[]>(() =>
    getCommunityPosts()
  );

  const [feedFilter, setFeedFilter] =
    useState<FeedFilter>("all");
  const [composerText, setComposerText] = useState("");
  const [discussionTopic, setDiscussionTopic] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<
    Record<string, string>
  >({});
  const [replyDrafts, setReplyDrafts] = useState<
    Record<string, string>
  >({});
  const [openReplyTarget, setOpenReplyTarget] =
    useState<string | null>(null);

  useEffect(() => {
    saveCommunityPosts(posts);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (feedFilter === "providers")
      return posts.filter((p) => p.authorRole === "provider");
    if (feedFilter === "pinned")
      return posts.filter((p) => p.pinned);
    return posts;
  }, [feedFilter, posts]);

  // 🔥 CLEAN ACTIONS

  const publishPost = () => {
    const content = composerText.trim();
    if (!content) return;

    const result = createPost(posts, {
      content,
      author: currentAuthor,
      threadStarter: isProvider && !!discussionTopic.trim(),
      discussionTopic: discussionTopic.trim() || null,
    });

    setPosts(result.posts);
    setComposerText("");
    setDiscussionTopic("");
  };

  const submitComment = (postId: string) => {
    const content = commentDrafts[postId]?.trim();
    if (!content) return;

    setPosts((prev) =>
      addComment(prev, { postId, content, author: currentAuthor })
    );

    setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
  };

  const submitReply = (postId: string, commentId: string) => {
    const content = replyDrafts[commentId]?.trim();
    if (!content) return;

    setPosts((prev) =>
      addReply(prev, {
        postId,
        parentCommentId: commentId,
        content,
        author: currentAuthor,
      })
    );

    setReplyDrafts((prev) => ({ ...prev, [commentId]: "" }));
    setOpenReplyTarget(null);
  };

  const handleReaction = (
    postId: string,
    reaction: "like" | "pray" | "support"
  ) => {
    setPosts((prev) =>
      reactToPost(prev, { postId, reaction })
    );
  };

  const handleReport = (postId: string, commentId?: string) => {
    setPosts((prev) =>
      commentId
        ? reportComment(prev, { postId, commentId })
        : togglePostFlag(prev, postId, "reported")
    );
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-2xl font-bold">
            FaithHub Community
          </h2>

          <div className="mt-3 flex gap-2">
            <Badge>{posts.length} posts</Badge>
            <Badge>
              {posts.filter((p) => p.authorRole === "provider").length} providers
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* CREATE POST */}
      <Card>
        <CardContent className="p-4">
          <textarea
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            placeholder="Share something..."
            className="w-full border p-2"
          />

          {isProvider && (
            <input
              value={discussionTopic}
              onChange={(e) =>
                setDiscussionTopic(e.target.value)
              }
              placeholder="Topic"
              className="mt-2 w-full border p-2"
            />
          )}

          <Button className="mt-2" onClick={publishPost}>
            Publish
          </Button>
        </CardContent>
      </Card>

      {/* POSTS */}
      {filteredPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4">
            <div className="font-semibold">
              {post.author.name}
            </div>

            <div className="mt-2">
              {renderMentionText(post.content)}
            </div>

            {/* REACTIONS */}
            <div className="mt-3 flex gap-2">
              <Button onClick={() => handleReaction(post.id, "like")}>
                ❤️ {post.reactions.like}
              </Button>

              <Button onClick={() => handleReaction(post.id, "pray")}>
                🙏 {post.reactions.pray}
              </Button>

              <Button onClick={() => handleReaction(post.id, "support")}>
                💪 {post.reactions.support}
              </Button>
            </div>

            {/* COMMENTS */}
            <div className="mt-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="mt-2">
                  {comment.content}
                </div>
              ))}
            </div>

            {/* COMMENT INPUT */}
            <div className="mt-3 flex gap-2">
              <input
                value={commentDrafts[post.id] || ""}
                onChange={(e) =>
                  setCommentDrafts((prev) => ({
                    ...prev,
                    [post.id]: e.target.value,
                  }))
                }
                className="flex-1 border p-2"
              />

              <Button onClick={() => submitComment(post.id)}>
                Comment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}