import axios, { api } from "@/lib/axios";
import { UserFormData } from "@/types/social";


export const publishBook = (data: UserFormData) => {
    const formData = new FormData();

    // Append text fields
    formData.append("book_name", data.name);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("slug", data.slug);
    formData.append("topics", JSON.stringify(data.topics));

    // Append file fields (check for null)
    if (data.pdfFile) formData.append("file", data.pdfFile);
    if (data.coverPhoto) formData.append("cover_photo", data.coverPhoto);
    if (data.mainPhoto) formData.append("main_photo", data.mainPhoto);

    return axios.post("book/publish-book", formData, {
        // responseType: "stream",
        // adapter: 'fetch',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout: 0, // disable timeout
    });
};

export const followBook = async (publicId: string) => {
    return api.post(`book/follow/${publicId}`);
}

export const unfollowBook = async (publicId: string) => {
    return api.delete(`book/unfollow/${publicId}`);
}

export const likeChapter = async (public_id: string) => {
  return api.post(`book/chapter/${public_id}/like`)
}

export const unLikeChapter = async (public_id: string) => {
  return api.delete(`book/chapter/${public_id}/unlike`)
}

export const CreateCommentToChapter = async (public_id: string, comment: string) => {
    return api.post(`book/chapter/${public_id}/comment`, { comment_text: comment });
}

export const likeBookPost = async (public_id: string) => {
    return api.post(`post/book/post/${public_id}/like`);
}

export const unLikeBookPost = async (public_id: string) => {
    return api.delete(`post/book/${public_id}/unlike`);
}


export const createCommentToBookPost = async (public_id: string, comment: string) => {
    return api.post(`post/book/post/${public_id}/comment`, { comment_text: comment });
}