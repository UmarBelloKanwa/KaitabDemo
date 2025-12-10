import axios, { api } from "@/lib/axios";

export const publishArticle = (data: {
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

  return axios.post("article/publish", formData, {
    // responseType: "stream",
    // adapter: 'fetch',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 0, // disable timeout
  });
};
