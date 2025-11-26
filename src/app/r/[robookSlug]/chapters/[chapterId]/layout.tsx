"use server";

import React from "react";
import type { BookResponse, BookChapterResponse } from "@/types/book";
import { dehydrate } from "@tanstack/react-query";
import { fetchRobook } from "@/actions/robook";
import { HydrationBoundary } from "@tanstack/react-query";
import StoreItem from "@/components/ui/StoreItem";
import getQueryClient from "@/lib/get-query-client";
import { fetchBookChapter } from "@/actions/robook";

export default async function BookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ robookSlug: string; chapterId: string }>;
}) {
  const p = await params;
  const slug = p.robookSlug;
  const queryClient = getQueryClient();

  // Prefetch all data in parallel
  const [robook, chapter] = await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["robook", slug],
      queryFn: () => fetchRobook(slug),
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["chapter", p.chapterId],
      queryFn: () => fetchBookChapter(p.chapterId),
      staleTime: Infinity,
    }),
  ]);

  // Get data from cache
  const robookData: BookResponse | undefined = queryClient.getQueryData([
    "robook",
    slug,
  ]);

  if (!robookData) {
    return (
      <h1 style={{ marginLeft: "3em" }}>
        Please login to be able to read the book{" "}
      </h1>
    );
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <StoreItem type="book" data={robookData} />
      {children}
    </HydrationBoundary>
  );
}
