export type CortexSettings = {
  is_awakened: boolean;
  auto_post_enabled: boolean;
}

export type Cortex = {
  public_id: string;
  author_public_id: string;
  setting: CortexSettings;
}

export type Message = {
  role: "user" | "cortex";
  content: string;
  session_id: string;
}

export interface ChatSessionSummary {
  session_id: string;
  last_message: string;
  last_updated: string; // ISO datetime
  
}
