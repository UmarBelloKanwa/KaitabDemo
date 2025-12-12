import { api } from "@/lib/axios";

export const publishArticle = async (data: {
  title: string | null;
  subtitle: string | null;
  content: any;
  images: {
    file: File;
    tempUrl: string;
  }[];
}) => {
  const formData = new FormData();
  formData.append("content", JSON.stringify(data.content));
  
  if (data.title) {
    formData.append("title", data.title);
  }
  if (data.subtitle) {
    formData.append("subtitle", data.subtitle);
  }

  data.images.forEach((img) => {
    formData.append("files", img.file); // File object
    formData.append("tempUrls", img.tempUrl); // temporary blob URL
  });

  return await api.post("article/publish", formData, {
    // responseType: "stream",
    // adapter: 'fetch',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 0, // disable timeout
  });
};


export const getArticleComments = async (author_handle: string, article_public_id: string) => { 
  console.log("article_public_id", article_public_id)
  const res = await api.get(`article/${article_public_id}/comments`);
  return res.data;
}

export const createCommentToArticle = async (
  article_public_id: string,
  content: string
) => {
  return api.post(`article/${article_public_id}/comment`, { comment_text: content });
};


export const likeArticle = async (public_id: string) => {
  return api.post(`article/${public_id}/like`);
};

export const unLikeArticle = async (public_id: string) => {
  return api.delete(`article/${public_id}/unlike`);
};


