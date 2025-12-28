"use server";

import RobookChat from "@/components/ui/robook/chat/RobookChat";
import AuthorChatLayout from "../chat/layout";
import AuthorChatPage from "../chat/page";

export default async function AuthorProfile({
  params,
}: {
  params: Promise<{
    authorHandle: string;
  }>;
}) {
  const p = await params;

  return (
    <AuthorChatLayout params={params}>
      <AuthorChatPage params={params} />
    </AuthorChatLayout>
  );
}
