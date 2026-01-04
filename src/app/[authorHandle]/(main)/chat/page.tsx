"use server";

import ChatPage from "@/components/ui/robook/chat/ChatPage";

export default async function AuthorChats({ 
  params
}:{
  params: Promise<{
    authorHandle: string;
  }>
  }) {
  const p = await params;
  
  return (
    <>
      <ChatPage authorHandle={p.authorHandle} where="home"/>
    </>
  );
}
