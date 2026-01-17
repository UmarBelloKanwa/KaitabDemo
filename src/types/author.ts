import type { BookResponse} from "@/types/book";
import type { Cortex } from "@/types/cortex";

export type SocialLink = {
  platform:
    | "twitter"
    | "x"
    | "facebook"
    | "instagram"
    | "linkedin"
    | "youtube"
    | "github"
    | "website"
    | "tiktok"
    | "medium";
  url: string; // equivalent to HttpUrl in Pydantic
  label?: string | null;
};


export interface Author {
  public_id: string;
  handle: string;
  updated_at: string;
  birth_date: string;
  profile_picture: string;
  about_self: string | null;
  social_links: SocialLink[] | null; // you can refine this later if you know the exact structure
  created_at: string;
  user_public_id: string;
  name: string;
  contact: string;
  cover_photo: string | null;
  short_bio: string | null;
  location: string | null;
  expertise_area: string | null;

  monetization_enabled: boolean;

  // followers_count: number;
  // can_follow: boolean;
  // is_following: boolean;

  can_subscribe: boolean;
  is_subscribed: boolean;
  requires_upgrade: boolean;

  is_owner: boolean;

  cortex: Cortex | null;
  articles_count: number;
}


export interface Robook extends BookResponse {
  comments_count: number
}

