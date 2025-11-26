"use client";

import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@/components/ui/robook/chapter/AppBar";
import ChapterFeed from "@/components/ui/robook/chapter/ChapterFeed";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchBookChapter } from "@/lib/api/book";

export default function ChapterPage({
  params,
}: {
  params:  Promise<{ chapterId: string, robookSlug: string }>;
}) {
  const p = React.use(params);
  const chapterId = p.chapterId;

  const queryClient = useQueryClient();

  const { data: chapter } = useQuery({
    queryKey: ["chapter", chapterId],
    queryFn: async () => {
      const cached = queryClient.getQueryData(["chapter", chapterId]);
      if (cached) return cached; // <-- This prevents unnecessary fetch
      return await fetchBookChapter(chapterId);
    },
    staleTime: Infinity, // not required but makes it feel snappier
  });

   const { data: robook, isLoading, isError } = useQuery({
      queryKey: ["robook", p.robookSlug],
      queryFn: async () => {
        const cached = queryClient.getQueryData(["robook", p.robookSlug]);
        return cached; // Prevent unnecessary fetch
      },
      staleTime: Infinity, // optional
   });
  
  chapter.book = chapter.book ?? robook;

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", position: "relative" }}>
      {/* Full-width AppBar */}
      {chapter?.book && <AppBar robook={chapter.book} />}

      {/* Centered content but not restricted by layout container */}
      <Container maxWidth={false} sx={{ py: 3, maxWidth: 805, mx: "auto" }}>
        <ChapterFeed chapter={chapter} />
      </Container>
    </Box>
  );
}
