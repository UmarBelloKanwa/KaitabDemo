"use client";

import RobookCardContent from "./Author-RobookCard";
import { getAuthorProfile } from "@/actions/author";
import { useQuery } from "@tanstack/react-query";
import type { Author } from "@/types/author";
import CommentSection from "@ui/robook/chapter/CommentSection";
import { createCommentToBook } from "@/lib/api/author";
import Container from "@mui/material/Container";
import { getAuthorBook } from "@/lib/api/author";
import { getAuthorBookComments } from "@/lib/api/author";


export default function RobookIndieCard({
  authorHandle,
  robookSlug,
}: {
  authorHandle: string;
  robookSlug: string;
}) {
  const { data: author } = useQuery<Author>({
    queryKey: ["author", authorHandle],
    queryFn: () => getAuthorProfile(authorHandle),
    staleTime: Infinity,
  });

  const {
    data: robookData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["robook", robookSlug],
    queryFn: async () => getAuthorBook(authorHandle, robookSlug),
  });

  if (!robookData) {
    return (
      <h1 style={{ marginLeft: "3em" }}> Sorry the Robook is not found </h1>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ width: "100%", m: 0, p: 0, gap: 1 }}>
      <RobookCardContent
        robook={robookData}
        author={author ?? robookData.author}
        authorHandle={authorHandle}
      />
      <CommentSection
        fetchComments={() => getAuthorBookComments(authorHandle, robookSlug)}
        createComment={async (txt: string) => {
          return await createCommentToBook(robookData.slug, txt);
        }}
      />
    </Container>
  );
}
