"use client";

import PostCard from "@/components/ui/author/post/PostCard";
import Container from "@mui/material/Container";
import CommentSection from "@/components/ui/robook/chapter/CommentSection";
import {
  createCommentToAuthorPost,
  fetchAuthorPostComments,
  fetchAuthorPost,
} from "@/lib/api/author";
// import { fetchAuthorPost,  } from "@/actions/author";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function Post({
  authorHandle,
  postId,
}: {
  postId: string;
  authorHandle: string;
}) {
  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const cached = queryClient.getQueryData(["post", postId]);
      if (cached) return cached; // <-- This prevents unnecessary fetch
      return await fetchAuthorPost(authorHandle, postId);
    },
    staleTime: 1000 * 60 * 10, // not required but makes it feel snappier
  });

  return (
    <Container maxWidth="sm" sx={{ m: 0, p: 0, gap: 1 }}>
      {post ? (
        <>
          <PostCard post={post} author={post.author} isPermanent={true} />
          <CommentSection
            fetchComments={async () =>
              fetchAuthorPostComments(authorHandle, postId)
            }
            createComment={async (txt: string) =>
              await createCommentToAuthorPost(post.public_id, txt)
            }
          />
        </>
      ) : (
        <h1> Sorry, Post is not found </h1>
      )}
    </Container>
  );
}
