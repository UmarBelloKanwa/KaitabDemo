
export interface NotificationPayloadItem {
    type: "text" | "link";
    value?: string; // for type = "text"
    text?: string;  // for type = "link"
    url?: string;   // for type = "link"
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    payload?: NotificationPayloadItem[];
    created_at: string;   // ISO datetime string
    read: boolean;
    avatar?: string; // URL or path to avatar
}