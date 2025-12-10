import axios, { api } from "@/lib/axios";
import { UserFormData } from "@/types/social";

export const publishBook = (data: UserFormData) => {
  const formData = new FormData();

  // Append text fields
  formData.append("book_name", data.name);
  formData.append("description", data.description);
  formData.append("slug", data.slug);
  formData.append("topics", JSON.stringify(data.topics));

  // Append file fields (check for null)
  if (data.pdfFile) formData.append("file", data.pdfFile);
  if (data.coverPhoto) formData.append("cover_photo", data.coverPhoto);

  return axios.post("book/publish-book", formData, {
    // responseType: "stream",
    // adapter: 'fetch',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 0, // disable timeout
  });
};

// export const followBook = async (publicId: string) => {
//   return api.post(`book/follow/${publicId}`);
// };

// export const unfollowBook = async (publicId: string) => {
//   return api.delete(`book/unfollow/${publicId}`);
// };

export const likeChapter = async (public_id: string) => {
  return api.post(`book/chapter/${public_id}/like`);
};

export const unLikeChapter = async (public_id: string) => {
  return api.delete(`book/chapter/${public_id}/unlike`);
};

export const CreateCommentToChapter = async (
  public_id: string,
  comment: string
) => {
  return api.post(`book/chapter/${public_id}/comment`, {
    comment_text: comment,
  });
};


export const fetchBookChapter = async (public_id: string) => {
  const res = await api.get(`book/chapter/${public_id}`);
  return res.data;
};

export const fetchChapterComments = async (chapter_id: string) => {
  const res = await api.get(`book/chapter/${chapter_id}/comments`);
  return res.data;
};


export const fetchRobook = async (robookSlug: string) => {
  const res = await api.get(`book/${robookSlug}`);
  return res.data;
};

export const fetchBookChapters = async (robookSlug: string) => {
  const res = await api.get(`book/${robookSlug}/chapters`);
  return res.data;
};