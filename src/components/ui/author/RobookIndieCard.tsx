"use client";

import type { Comment } from "@/types/book";
import RobookCardContent from "./Author-RobookCard";
import { getAuthorProfile } from "@/actions/author";
import { useQuery } from "@tanstack/react-query";
import type { Robook, Author } from "@/types/author";
import CommentSection from "@ui/robook/chapter/CommentSection";
import { createCommentToBook } from "@/lib/api/author";
import Box from "@mui/material/Box";

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
    <Box sx={{ width: "100%", m: "auto" }}>
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
    </Box>
  );
}
