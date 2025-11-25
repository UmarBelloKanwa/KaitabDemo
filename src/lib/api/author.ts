import api from "@/lib/axios";
import type { ProfileData } from "@/hooks/profile/useProfileValidation";

export const followAuthor = async (publicId: string) => {
  return api.post(`author/follow/${publicId}`);
};

export const unfollowAuthor = async (publicId: string) => {
  return api.delete(`author/unfollow/${publicId}`);
};

export const createCommentToBook = async (
  book_slug: string,
  content: string
) => {
  return api.post(`book/${book_slug}/comment`, { comment_text: content });
};

export const updateAuthorProfile = async (data: ProfileData) => {
  const formData = new FormData();

  if (data.birth_date) {
    formData.append("birth_date", data.birth_date);
  }
  if (data.contact) {
    formData.append("contact", data.contact);
  }
  if (data.name) {
    formData.append("name", data.name);
  }
  if (data.handle) {
    formData.append("handle", data.handle);
  }
  if (data.profile_picture) {
    formData.append("profile_picture", data.profile_picture);
  }
  if (data.cover_photo) {
    formData.append("cover_photo", data.cover_photo);
  }

  if (data.short_bio) {
    formData.append("short_bio", data.short_bio);
  }
  if (data.location) {
    formData.append("location", data.location);
  }
  if (data.expertise_area) {
    formData.append("expertise_area", data.expertise_area);
  }
  if (data.about_self) {
    formData.append("about_self", data.about_self);
  }
  if (data.social_links) {
    formData.append("social_links", JSON.stringify(data.social_links));
  }
  return api.put("author/update/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const fetchAuthors = async (offset?: string) => {
 return api.get(`/author/authors/to-follow?limit=10&offset=${offset || 0}`);
}

export const likeAuthorPost = async (public_id: string) => {
  return api.post(`post/author/post/${public_id}/like`);
};

export const unLikeAuthorPost = async (public_id: string) => {
  return api.delete(`post/author/${public_id}/unlike`);
};

export const createCommentToAuthorPost = async (
  public_id: string,
  comment: string
) => {
  return api.post(`post/author/post/${public_id}/comment`, {
    comment_text: comment,
  });
};


export const fetchAuthorPostComments = async (author_handle: string, public_id: string) => {
  const res = await api.get(`post/${author_handle}/post/${public_id}/comments`);
  return res.data;
}


// Fetch book post for independent page of post
export const fetchAuthorPost = async (author_handle: string, public_id: string) => {
  const res = await api.get(`post/${author_handle}/post/${public_id}`);
  return res.data;
}
