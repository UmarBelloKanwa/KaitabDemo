import { api } from "@/lib/axios";
import type { FeedbackType } from "@/types/feedback";

export const submitFeedback = async (data: {
  message: string;
  image?: File | undefined;
  type: FeedbackType;
}) => {
  
  const formData = new FormData();
  
  formData.append("message", data.message);
  if (data.image) {
    formData.append("image", data.image);
  }
  
  const res =  await api.post("feedback/submit", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 0, // disable timeout
  });
  return res
};