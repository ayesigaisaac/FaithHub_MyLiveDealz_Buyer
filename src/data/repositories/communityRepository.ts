import { readJson, writeJson } from "@/data/adapters/storage";
import type { CommunityRepository } from "@/data/interfaces/community-repository";
import type { CommunityPost } from "@/types/community";

const STORAGE_KEY = "faithhub.community.posts.v1";

function isCommunityPost(candidate: unknown): candidate is CommunityPost {
  if (!candidate || typeof candidate !== "object") return false;
  const post = candidate as CommunityPost;
  return Boolean(post.id && post.authorId && post.authorRole && post.content && post.timestamp);
}

function revivePosts(value: unknown): CommunityPost[] | null {
  if (!Array.isArray(value)) return [];
  return value.filter(isCommunityPost);
}

export function readCommunityPostsSync() {
  return readJson(STORAGE_KEY, [] as CommunityPost[], revivePosts);
}

export function writeCommunityPostsSync(posts: CommunityPost[]) {
  writeJson(STORAGE_KEY, posts);
}

class MockCommunityRepository implements CommunityRepository {
  async getPosts() {
    return readCommunityPostsSync();
  }

  async savePosts(posts: CommunityPost[]) {
    writeCommunityPostsSync(posts);
    return readCommunityPostsSync();
  }
}

export const communityRepository: CommunityRepository = new MockCommunityRepository();

