export type SocialPlatform =
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

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string | null;
}

export interface AuthorProfileResponse {
  handle: string;
  name: string;
  contact: string;
  birth_date: string; // ISO date string
  profile_picture?: string | null;
  cover_photo?: string | null;
  short_bio?: string | null;
  location?: string | null;
  expertise_area?: string | null;
  about_self?: string | null;
  social_links?: SocialLink[] | null;
}

export interface UserProfileResponse {
  full_name: string;
  contact: string;
  public_id: string;
  is_author: boolean;
  author?: AuthorProfileResponse | null;
}
