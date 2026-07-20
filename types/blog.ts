import type { ImageAsset, SeoMeta } from "./common";

export interface BlogAuthor {
  name: string;
  avatar: ImageAsset;
  bio?: string;
}

export interface BlogComment {
  id: string;
  author: string;
  avatar?: ImageAsset;
  message: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: ImageAsset;
  author: BlogAuthor;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  comments: BlogComment[];
  seo: SeoMeta;
}
