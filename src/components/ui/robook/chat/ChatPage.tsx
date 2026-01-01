"use client";

import React from "react";
import Box from "@mui/material/Box";
import AskInput from "@/components/ui/robook/chat/AskInput";
import ChatInterface from "@/components/ui/robook/chat/ChatInterface";
import { sendCortexMessage } from "@/lib/api/cortex";
import { getSingleChatSession } from "@/lib/api/cortex";
import { fakeMessages } from "@/data/fake_messages";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

export default function ChatPage({ authorHandle, chatId, where }: { authorHandle: string, chatId?: string, where?: "home" | "chat" }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [chats, setChats] = React.useState<any[]>([]);
  const router = useRouter();

  React.useEffect(() => { 
    const fetchChatSession = async () => {
      if (chatId) {
        const messages = await getSingleChatSession(chatId);
        setChats(messages);
      }
    };

    fetchChatSession();
  }, [chatId]);

  const submitUserMessage = async (txt: string) => {
    setChats(prev => [...prev, { role: "user", content: txt }]);
    const response = await sendCortexMessage(authorHandle, txt, chatId);
    setChats(prev => [...prev, { role: "cortex", content: response.answer }]);
    if (!chatId && response.session_id) {
      if (where === "home") {
        router.replace(`/chat/${response.session_id}`);
        return;
      }

      router.replace(`/${response.session_id}`);
    }
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: 750 }}>
      <Box ref={containerRef} sx={{ width: "100%", pb: { xs: 7 } }}>
        <ChatInterface messages={chats} authorHandle={authorHandle} />
      </Box>

      <AskInput
        containerRef={containerRef}
        submitUserMessage={submitUserMessage}
      />
    </Container>
  );
}


