import { api }  from "@/lib/axios";

export function updateCortexSettings(
  settingsData: { is_awakened: boolean; auto_post_enabled: boolean }
) {
  return api.put(`cortex/update/settings`, settingsData);
}

export async function sendCortexMessage(
  author_handle: string,
  query: string,
  session_id: string = ""
) {
  try {
    const res = await api.post(`cortex/chat/${author_handle}`, {
      question: query,
      session_id,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.detail || "Something went wrong",
      };
    }
    throw {
      status: 500,
      message: "Network error. Please try again.",
    };
  }
}


export async function getSingleChatSession(session_id: string) { 
  const res = await api.get(`cortex/chat/session/${session_id}`);
  return res.data;
}

export async function getAllChatsSession(author_handle: string) {
  const res = await api.get(`cortex/chats/all/sessions/${author_handle}`);
  return res.data;
}
