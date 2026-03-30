import type {
  CommunityAuthor,
  CommunityComment,
  CommunityPost,
  CommunityReaction,
  CommunityRole,
} from "@/types/community";

const COMMUNITY_STORAGE_KEY = "faithhub.community.posts.v1";

const communityAuthors: Record<string, CommunityAuthor> = {
  "user-grace": {
    id: "user-grace",
    name: "Grace N.",
    role: "user",
    title: "Member",
    verified: false,
  },
  "user-james": {
    id: "user-james",
    name: "James K.",
    role: "user",
    title: "Member",
    verified: false,
  },
  "provider-pastor-anna": {
    id: "provider-pastor-anna",
    name: "Pastor Anna",
    role: "provider",
    title: "Pastor",
    verified: true,
  },
  "provider-leader-michael": {
    id: "provider-leader-michael",
    name: "Leader Michael",
    role: "provider",
    title: "Leader",
    verified: true,
  },
};

function nowMinus(minutes: number) {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function createComment(input: {
  id: string;
  postId: string;
  parentCommentId?: string | null;
  author: CommunityAuthor;
  content: string;
  mentions?: string[];
  timestamp?: string;
  replies?: CommunityComment[];
}): CommunityComment {
  return {
    id: input.id,
    postId: input.postId,
    parentCommentId: input.parentCommentId ?? null,
    author: input.author,
    content: input.content,
    mentions: input.mentions ?? extractMentions(input.content),
    timestamp: input.timestamp ?? new Date().toISOString(),
    reported: false,
    moderated: false,
    replies: input.replies ?? [],
  };
}

const seedCommunityPosts: CommunityPost[] = [
  {
    id: "post-prayer-circle",
    authorId: "provider-pastor-anna",
    authorRole: "provider",
    author: communityAuthors["provider-pastor-anna"],
    content:
      "Tonight we open a prayer circle for families at 8:00 PM. Share your prayer requests below and tag someone who should join.",
    mentions: ["community"],
    timestamp: nowMinus(45),
    pinned: true,
    highlighted: true,
    threadStarter: true,
    discussionTopic: "Prayer Circle",
    reactions: {
      like: 14,
      pray: 39,
      support: 8,
    },
    reported: false,
    comments: [
      createComment({
        id: "comment-prayer-1",
        postId: "post-prayer-circle",
        author: communityAuthors["user-grace"],
        content: "Please pray for my exams this week @PastorAnna",
        mentions: ["PastorAnna"],
        timestamp: nowMinus(36),
        replies: [
          createComment({
            id: "comment-prayer-1-reply-1",
            postId: "post-prayer-circle",
            parentCommentId: "comment-prayer-1",
            author: communityAuthors["provider-pastor-anna"],
            content: "We are praying with you tonight. Stay strong.",
            timestamp: nowMinus(31),
          }),
        ],
      }),
    ],
  },
  {
    id: "post-service-reflection",
    authorId: "user-james",
    authorRole: "user",
    author: communityAuthors["user-james"],
    content:
      "Sunday service reflection: gratitude and consistency transformed my week. What scripture encouraged you most?",
    mentions: [],
    timestamp: nowMinus(170),
    pinned: false,
    highlighted: false,
    threadStarter: false,
    discussionTopic: null,
    reactions: {
      like: 11,
      pray: 7,
      support: 4,
    },
    reported: false,
    comments: [
      createComment({
        id: "comment-reflection-1",
        postId: "post-service-reflection",
        author: communityAuthors["provider-leader-michael"],
        content: "Powerful reflection @James. Hebrews 10:24 encouraged me.",
        mentions: ["James"],
        timestamp: nowMinus(150),
      }),
    ],
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function parsePosts(raw: string | null) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => entry && typeof entry === "object") as CommunityPost[];
  } catch {
    return [];
  }
}

function mergePosts(posts: CommunityPost[]) {
  const map = new Map<string, CommunityPost>();
  for (const post of posts) {
    map.set(post.id, {
      ...post,
      reactions: {
        like: post.reactions?.like || 0,
        pray: post.reactions?.pray || 0,
        support: post.reactions?.support || 0,
      },
    });
  }
  const merged = Array.from(map.values());
  return merged.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.timestamp.localeCompare(a.timestamp);
  });
}

function readStoredPosts() {
  if (!isBrowser()) return [];
  return parsePosts(window.localStorage.getItem(COMMUNITY_STORAGE_KEY));
}

function writeStoredPosts(posts: CommunityPost[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(posts));
}

export function getDefaultCommunityAuthor(role: CommunityRole): CommunityAuthor {
  if (role === "provider") {
    return {
      id: "provider-current",
      name: "Current Provider",
      role: "provider",
      title: "Leader",
      verified: true,
    };
  }
  return {
    id: "user-current",
    name: "Current User",
    role: "user",
    title: "Member",
    verified: false,
  };
}

export function extractMentions(content: string) {
  const mentions = new Set<string>();
  const regex = /@([a-zA-Z0-9_.-]+)/g;
  let match = regex.exec(content);
  while (match) {
    mentions.add(match[1]);
    match = regex.exec(content);
  }
  return Array.from(mentions);
}

export function getCommunityPosts() {
  return mergePosts([...seedCommunityPosts, ...readStoredPosts()]);
}

export function saveCommunityPosts(posts: CommunityPost[]) {
  writeStoredPosts(posts);
}

function appendReplyById(comments: CommunityComment[], parentId: string, reply: CommunityComment): CommunityComment[] {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...comment.replies, reply],
      };
    }
    if (!comment.replies.length) return comment;
    return {
      ...comment,
      replies: appendReplyById(comment.replies, parentId, reply),
    };
  });
}

function updateCommentById(
  comments: CommunityComment[],
  commentId: string,
  updater: (comment: CommunityComment) => CommunityComment,
): CommunityComment[] {
  return comments.map((comment) => {
    if (comment.id === commentId) return updater(comment);
    if (!comment.replies.length) return comment;
    return {
      ...comment,
      replies: updateCommentById(comment.replies, commentId, updater),
    };
  });
}

export function createPost(posts: CommunityPost[], input: {
  content: string;
  author: CommunityAuthor;
  threadStarter?: boolean;
  discussionTopic?: string | null;
}) {
  const created: CommunityPost = {
    id: `post-${Date.now()}`,
    authorId: input.author.id,
    authorRole: input.author.role,
    author: input.author,
    content: input.content.trim(),
    mentions: extractMentions(input.content),
    timestamp: new Date().toISOString(),
    pinned: false,
    highlighted: input.author.role === "provider",
    threadStarter: Boolean(input.threadStarter),
    discussionTopic: input.discussionTopic ?? null,
    reactions: {
      like: 0,
      pray: 0,
      support: 0,
    },
    comments: [],
    reported: false,
  };
  const next = mergePosts([created, ...posts]);
  return { created, posts: next };
}

export function reactToPost(posts: CommunityPost[], input: {
  postId: string;
  reaction: CommunityReaction;
}) {
  return posts.map((post) => {
    if (post.id !== input.postId) return post;
    return {
      ...post,
      reactions: {
        ...post.reactions,
        [input.reaction]: (post.reactions?.[input.reaction] || 0) + 1,
      },
    };
  });
}

export function addComment(posts: CommunityPost[], input: {
  postId: string;
  content: string;
  author: CommunityAuthor;
}) {
  const comment = createComment({
    id: `comment-${Date.now()}`,
    postId: input.postId,
    author: input.author,
    content: input.content.trim(),
  });
  return posts.map((post) => {
    if (post.id !== input.postId) return post;
    return {
      ...post,
      comments: [...post.comments, comment],
    };
  });
}

export function addReply(posts: CommunityPost[], input: {
  postId: string;
  parentCommentId: string;
  content: string;
  author: CommunityAuthor;
}) {
  const reply = createComment({
    id: `reply-${Date.now()}`,
    postId: input.postId,
    parentCommentId: input.parentCommentId,
    author: input.author,
    content: input.content.trim(),
  });
  return posts.map((post) => {
    if (post.id !== input.postId) return post;
    return {
      ...post,
      comments: appendReplyById(post.comments, input.parentCommentId, reply),
    };
  });
}

export function togglePostFlag(
  posts: CommunityPost[],
  postId: string,
  flag: "pinned" | "highlighted" | "threadStarter" | "reported",
) {
  const next = posts.map((post) => {
    if (post.id !== postId) return post;
    return {
      ...post,
      [flag]: !post[flag],
    };
  });
  return mergePosts(next);
}

export function moderateComment(posts: CommunityPost[], input: {
  postId: string;
  commentId: string;
}) {
  return posts.map((post) => {
    if (post.id !== input.postId) return post;
    return {
      ...post,
      comments: updateCommentById(post.comments, input.commentId, (comment) => ({
        ...comment,
        moderated: !comment.moderated,
      })),
    };
  });
}

export function reportComment(posts: CommunityPost[], input: {
  postId: string;
  commentId: string;
}) {
  return posts.map((post) => {
    if (post.id !== input.postId) return post;
    return {
      ...post,
      comments: updateCommentById(post.comments, input.commentId, (comment) => ({
        ...comment,
        reported: !comment.reported,
      })),
    };
  });
}
