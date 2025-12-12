import type { Author } from "@/types/author";

export interface ArticlePreview {
  public_id: string;                // UUID
  author_public_id: string;         // UUID

  collection_id?: number | null;

  cover_photo_url?: string | null;
  title?: string | null;
  subtitle?: string | null;

  preview_text: string;

  created_at: string;               // ISO timestamp
  updated_at: string;               // ISO timestamp

  // Relationships (optional based on what you include in responses)
  author?: Author | null;
  collection?: Collection | null;

  comment_count?: number;      // Usually omitted in previews
}


export interface Article {
  public_id: string;                // UUID
  author_public_id: string;         // UUID

  collection_id?: number | null;

  cover_photo_url?: string | null;
  title?: string | null;
  subtitle?: string | null;

  content: Record<string, any>;     // Tiptap JSON structure
  preview_text: string;

  created_at: string;               // ISO timestamp
  updated_at: string;               // ISO timestamp

  // Relationships (optional based on what you include in responses)
  author: Author;
  collection?: Collection | null;

  liked_by_user: boolean;
  like_count: number;
  comment_count: number;

  // comments?: ArticleComment[];      // Usually omitted in previews
  // reactions?: ArticleReaction[];    // Usually omitted
}


export interface Collection {
  id: number;
  author_public_id: string;

  cover_photo_url: string;
  name: string;
  description?: string | null;

  articles?: Article[];
}

export interface ArticleComment {
  id: number;
  article_public_id: string;
  user_public_id: string;

  comment_text: string;
  created_at: string;
}

export interface ArticleReaction {
  id: number;
  article_public_id: string;
  user_public_id: string;
  created_at: string;
}
