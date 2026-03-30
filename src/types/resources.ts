import type { Role } from "@/types/roles";

export type ResourceType = "pdf" | "audio" | "video";
export type ResourceCategory = "Books" | "PDFs" | "Audio" | "Devotionals";

export interface FaithHubResource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  author: string;
  file_url: string;
  created_at: string;
  category: ResourceCategory;
  tags: string[];
  download_count: number;
  featured: boolean;
  recommended: boolean;
  uploader_role: Extract<Role, "user" | "provider">;
}
