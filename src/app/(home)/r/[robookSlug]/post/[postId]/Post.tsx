"use client";

import type { BookPostDTO, BookResponse, Comment } from "@/types/book";
import PostCard from "@/components/ui/robook/post/PostCard";
import Container from "@mui/material/Container";
import { useQuery } from "@tanstack/react-query";
import { fetchRobook } from "@/actions/robook";
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
      <Container maxWidth="sm" sx={{ m: 0, p: 0, gap: 1 }}>
        {post && robookData ? (
          <>
            <PostCard post={post} robook={robookData} isPermanent={true} />
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
  );
}
