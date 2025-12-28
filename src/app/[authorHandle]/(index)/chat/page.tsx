"use server";

import RobookChat from "@/components/ui/robook/chat/RobookChat";

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
      <RobookChat/>
    </>
  );
}
