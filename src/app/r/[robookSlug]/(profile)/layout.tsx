"use server";

import React from "react";
import Container from "@mui/material/Container";
import ProfileInfo from "@/components/ui/robook/ProfileInfo";
import Box from "@mui/material/Box";
import type { BookResponse, BookChapterResponse } from "@/types/book";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {
  fetchRobook,
  fetchBookChapters,
} from "@/actions/robook";
import StoreItem from "@/components/ui/StoreItem";

export default async function BookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ robookSlug: string }>;
}) {
  const p = await params;
  const slug = p.robookSlug;
  const queryClient = new QueryClient();

  // Prefetch all data in parallel
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["robook", slug],
      queryFn: () => fetchRobook(slug),
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["chapters", slug],
      queryFn: () => fetchBookChapters(slug),
      staleTime: Infinity,
    }),
  ]);

  const chapters: BookChapterResponse[] | undefined = queryClient.getQueryData(["chapters", slug]);

  if (chapters && Array.isArray(chapters)) {
    chapters.forEach((chapter) => {
      queryClient.setQueryData(["chapter", chapter.public_id], chapter);
    });
  }

  // Get data from cache
  const robookData: BookResponse | undefined = queryClient.getQueryData([
    "robook",
    slug,
  ]);
  
  if (!robookData) {
    return <h1 style={{ marginLeft: "3em" }}>Please login to be able to read the book </h1>;
  }

  const dehydratedState = dehydrate(queryClient);
  
  return (
    <HydrationBoundary state={dehydratedState}>
      <StoreItem type="book" data={robookData} />
       <Container
        maxWidth="sm"
        disableGutters
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          px: 2,
          py: 2,
          pt: 1
        }}
      >
        <ProfileInfo robook={robookData} />
        <Box sx={{ width: "100%", mt: 0 }}>{children}</Box>
      </Container>
    </HydrationBoundary>
  );
}
