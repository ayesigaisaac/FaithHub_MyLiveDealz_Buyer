import { repositoryFactory } from "@/data/repositories/factory";
import { readCommunityPostsSync, writeCommunityPostsSync } from "@/data/repositories/communityRepository";
import { simulateLatency } from "@/data/services/runtime";
import type { CommunityPost } from "@/types/community";

function sortCommunityPosts(posts: CommunityPost[]) {
  return posts.slice().sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.timestamp.localeCompare(a.timestamp);
  });
}

export function getStoredCommunityPostsSync() {
  return sortCommunityPosts(readCommunityPostsSync());
}

export function saveStoredCommunityPostsSync(posts: CommunityPost[]) {
  writeCommunityPostsSync(posts);
  return getStoredCommunityPostsSync();
}

export async function getStoredCommunityPosts() {
  await simulateLatency();
  const posts = await repositoryFactory.community.getPosts();
  return sortCommunityPosts(posts);
}

export async function saveStoredCommunityPosts(posts: CommunityPost[]) {
  await simulateLatency();
  const next = await repositoryFactory.community.savePosts(posts);
  return sortCommunityPosts(next);
}

