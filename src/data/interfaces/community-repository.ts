import type { CommunityPost } from "@/types/community";

export interface CommunityRepository {
  getPosts(): Promise<CommunityPost[]>;
  savePosts(posts: CommunityPost[]): Promise<CommunityPost[]>;
}

