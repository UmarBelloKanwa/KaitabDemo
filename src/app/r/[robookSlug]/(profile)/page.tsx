"use server";

import React from "react";
import PostLists from "@/components/ui/robook/post/ProfilePosts";

export default async function RobookProfilePage({
  params,
}: {
  params: { robookSlug: string };
}) {
  const p = await params;
  const slug = p.robookSlug;

  return <PostLists slug={slug} />;
}
