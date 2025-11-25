"use server";

import React from "react";
import PostLists from "@/components/ui/author/post/ProfilePosts";

export default async function Page({
  params,
}: {
  params: Promise<{ authorHandle: string }>;
}) {
  const p = await params;
  const handle = p.authorHandle;

  return <PostLists handle={handle} />;
}
