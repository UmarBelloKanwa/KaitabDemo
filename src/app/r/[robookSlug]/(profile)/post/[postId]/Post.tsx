"use client";

import type { BookPostDTO, BookResponse, Comment } from "@/types/book";
import PostCard from "@/components/ui/robook/post/PostCard";
import Container from "@mui/material/Container";
import { useQuery } from "@tanstack/react-query";
import { fetchRobook } from "@/actions/robook";
import AppBar from "@/components/ui/robook/chapter/AppBar";
import CommentSection from "@/components/ui/robook/chapter/CommentSection";
import { createCommentToBookPost } from "@/lib/api/book";

export default function Post({
  post,
  robookSlug,
  comments,
}: {
  post: BookPostDTO | null;
  robookSlug: string;
  comments: Comment[] | null;
}) {
  const { data: robookData } = useQuery<BookResponse>({
    queryKey: ["robook", robookSlug],
    queryFn: () => fetchRobook(robookSlug),
    staleTime: Infinity,
  });

  return (
    <>
      {robookData && <AppBar robook={robookData} />}
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {post && robookData ? (
          <>
            <PostCard post={post} robook={robookData} />
            <CommentSection
              usersComments={comments ?? []}
              createComment={async (txt: string) =>
                await createCommentToBookPost(post.public_id, txt)
              }
            />
          </>
        ) : (
          <h1> Sorry, Post is not found </h1>
        )}
      </Container>
    </>
  );
}
