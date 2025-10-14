import React from "react";
import { Notification } from "@/types/home";

export default function useWebSocketNotification() {
  const [messages, setMessages] = React.useState<Notification[]>([]);
  const [connected, setConnected] = React.useState(false);

  const wsRef = React.useRef<WebSocket | null>(null);
  const reconnectTimer = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const backendHttp =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
    const backendWs = backendHttp.replace(/^http/, "ws");
    const url = `${backendWs}/api/py/notification/ws/notifications`;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as Notification;
          setMessages((prev) => [...prev, data]);
        } catch (err) {
          console.warn("Non-JSON WebSocket message:", event.data);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setConnected(false);

        // Auto-reconnect after 3 seconds
        reconnectTimer.current = setTimeout(() => {
          console.log("Reconnecting...");
          connect();
        }, 3000);
      };

      ws.onerror = (err) => {
        //console.log("WebSocket error:", err);
        ws.close();
      };
    };

    connect();

    // Cleanup when unmounting
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const sendMessage = (data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected");
    }
  };

  return { connected, messages, sendMessage };
}