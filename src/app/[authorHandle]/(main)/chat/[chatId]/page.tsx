import React from 'react';
import ChatPage from '@/components/ui/robook/chat/ChatPage';

export default async function SingleChatPage({ 
  params
}:{
  params: Promise<{
    authorHandle: string;
    chatId: string;
  }>
  }) {
  const p = await params;
  return (
    <ChatPage authorHandle={p.authorHandle} chatId={p.chatId} />
  )
}