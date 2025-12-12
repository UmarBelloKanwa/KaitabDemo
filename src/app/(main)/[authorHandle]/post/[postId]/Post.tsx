"use client";

import PostCard from "@/components/ui/author/post/PostCard";
import Container from "@mui/material/Container";
import CommentSection from "@/components/ui/robook/chapter/CommentSection";
import {
  createCommentToAuthorPost,
  fetchAuthorPostComments,
  fetchAuthorPost,
} from "@/lib/api/author";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";

export default function Post({
  authorHandle,
  postId,
}: {
  postId: string;
  authorHandle: string;
}) {
  const queryClient = useQueryClient();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const cached = queryClient.getQueryData(["post", postId]);
      if (cached) return cached; // Prevent unnecessary fetch
      return await fetchAuthorPost(authorHandle, postId);
    },
    staleTime: Infinity, // optional
  });

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ m: 0, p: 0, display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !post) {
    return (
      <Container maxWidth="sm" sx={{ m: 0, p: 0 }}>
        <h1>Sorry, Post is not found</h1>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ m: 0, p: 0, gap: 1 }}>
      <PostCard post={post} author={post.author} isPermanent={true} />
      <CommentSection
        fetchComments={async () =>
          fetchAuthorPostComments(authorHandle, postId)
        }
        createComment={async (txt: string) =>
          await createCommentToAuthorPost(post.public_id, txt)
        }
      />
    </Container>
  );
}
