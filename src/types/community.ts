import type { Role } from "@/types/roles";

export type CommunityRole = Extract<Role, "user" | "provider">;
export type CommunityReaction = "like" | "pray" | "support";

export type CommunityReactionCounter = Record<CommunityReaction, number>;

export interface CommunityAuthor {
  id: string;
  name: string;
  role: CommunityRole;
  title?: "Member" | "Provider" | "Pastor" | "Leader";
  verified?: boolean;
}

export interface CommunityComment {
  id: string;
  postId: string;
  parentCommentId: string | null;
  author: CommunityAuthor;
  content: string;
  mentions: string[];
  timestamp: string;
  reported: boolean;
  moderated: boolean;
  replies: CommunityComment[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorRole: CommunityRole;
  author: CommunityAuthor;
  content: string;
  mentions: string[];
  timestamp: string;
  pinned: boolean;
  highlighted: boolean;
  threadStarter: boolean;
  discussionTopic: string | null;
  reactions: CommunityReactionCounter;
  comments: CommunityComment[];
  reported: boolean;
}
