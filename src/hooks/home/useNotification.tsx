import React from "react";
import useWebSocketNotification from "@/hooks/home/useWebSocketNotification";
import { useUserNotifications } from "@/lib/api/home";
import { NotificationAction } from "@/constants";
import type { Notification } from "@/types/home";

export default function useNotifications() {
  const { connected, messages, sendMessage } = useWebSocketNotification();
  const { data, mutate, error, isLoading } = useUserNotifications();
  const [errors, setErrors] = React.useState(error);

  // 🔹 Helper: send WS message
  const sendWSAction = (action: NotificationAction, id?: string) => {
    if (!connected) {
      console.warn("WebSocket not connected");
      return;
    }

    const message = {
      action,
      data: id ? { id } : null,
    };

    sendMessage(message);
  };

  // 🔹 Mark single notification as read
  const markAsRead = async (id: string) => {
    try {
      sendWSAction(NotificationAction.MARK_READ, id);
      await mutate(); // revalidate API data
    } catch (err) {
      // console.error(err);
      setErrors(err);
    }
  };

  // 🔹 Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      sendWSAction(NotificationAction.MARK_ALL_AS_READ);
      await mutate();
    } catch (err) {
      // console.error(err);
      setErrors(err);
    }
  };

  React.useEffect(() => {
    if (!messages?.length) return;

    const latest = messages[messages.length - 1];
    // Every WS message is a new notification
    mutate((prev: Notification[]) => (prev ? [...prev, latest] : [latest]), false);
  }, [messages, mutate]);

  return {
    notifications: data || [],
    unreadCount: (data || []).filter((n: Notification) => !n.read).length,
    markAsRead,
    markAllAsRead,
    errors,
    isLoading,
    connected,
  };
}
