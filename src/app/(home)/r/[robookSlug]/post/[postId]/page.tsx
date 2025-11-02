"use server";

import Box from "@mui/material/Box";
import { fetchBookPost, fetchBookPostComments } from "@/actions/robook";
import type { BookPostDTO, Comment } from "@/types/book";
import PostContainer from "./Post";

export default async function ChapterPage({
  params,
}: {
  params: {
    robookSlug: string;
    postId: string;
  };
}) {
  const p = await params;
  let post: BookPostDTO | null = null,
    comments: Comment[] | null = null;

  try {
    [post, comments] = await Promise.all([
      fetchBookPost(p.robookSlug, p.postId),
      fetchBookPostComments(p.robookSlug, p.postId),
    ]);
  } catch (err) {
    console.log(err);
  }

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", position: "relative" }}>
      <PostContainer robookSlug={p.robookSlug} post={post} comments={comments} />
    </Box>
  );
}
