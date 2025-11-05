"use client";

import type { Comment } from "@/types/book";
import RobookCardContent from "./Author-RobookCard";
import { getAuthorProfile } from "@/actions/author";
import { useQuery } from "@tanstack/react-query";
import type { Robook, Author } from "@/types/author";
import CommentSection from "@ui/robook/chapter/CommentSection";
import { createCommentToBook } from "@/lib/api/author";
import Container from "@mui/material/Container";

export default function RobookIndieCard({
  authorHandle,
  robookSlug,
  robookData,
  robookComments,
}: {
  authorHandle: string;
  robookSlug: string;
  robookData: Robook;
  robookComments: Comment[] | null;
}) {
  const { data: author } = useQuery<Author>({
    queryKey: ["author", authorHandle],
    queryFn: () => getAuthorProfile(authorHandle),
    staleTime: Infinity,
  });

  if (!author) {
    return (
      <h1 style={{ marginLeft: "3em" }}> Sorry the Author is not found </h1>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ width:"100%", m: 0, p: 0, gap: 1 }}>
      <RobookCardContent
        robook={robookData}
        author={author}
        authorHandle={authorHandle}
      />
      <CommentSection
        usersComments={robookComments ?? []}
        createComment={async (txt: string) => {
          return await createCommentToBook(robookData.slug, txt);
        }}
      />
    </Container>
  );
}
