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

export default function ChatPage({
  authorHandle,
  chatId,
  where,
}: {
  authorHandle: string;
  chatId?: string;
  where?: "home" | "chat";
}) {
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

  const setCortexMessage = (msg: string) => {
    return setChats((prev) => [...prev, { role: "cortex", content: msg }]);
  };
  const submitUserMessage = async (txt: string) => {
    setChats((prev) => [...prev, { role: "user", content: txt }]);
    try {
      const response = await sendCortexMessage(authorHandle, txt, chatId);
      setCortexMessage(response.answer);

      if (!chatId && response.session_id) {
        if (where === "home") {
          router.replace(`/chat/${response.session_id}`);
          return;
        }

        router.replace(`/${response.session_id}`);
      }
    } catch (err: any) {
      // REMOVE optimistic user message if failed
      // setChats((prev) => prev.slice(0, -1));

      if (err.status === 429) {
        setCortexMessage(err.message); // "You have reached your daily chat limit..."
      } else if (err.status === 400) {
        setCortexMessage(err.message); // "Author's Cortex is not awakened."
      } else {
        setCortexMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        m: "auto",
        maxWidth: { xs: "97%", sm: 750, md: 750 },
      }}
    >
      <Box ref={containerRef} sx={{ width: "100%", pb: { xs: 7 } }}>
        <ChatInterface messages={chats} authorHandle={authorHandle} />
      </Box>

      <AskInput
        containerRef={containerRef}
        authorHandle={authorHandle}
        submitUserMessage={submitUserMessage}
      />
    </Container>
  );
}
