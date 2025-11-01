"use server";

import React from "react";
import type { BookResponse, BookChapterResponse } from "@/types/book";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchRobook } from "@/actions/robook";
import ClientQueryProvider from "@/providers/QueryProvider";
import StoreItem from "@/components/ui/StoreItem";

export default async function BookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { robookSlug: string };
}) {
  const p = await params;
  const slug = p.robookSlug;
  const queryClient = new QueryClient();

  // Prefetch all data in parallel
  const [robook] = await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["robook", slug],
      queryFn: () => fetchRobook(slug),
      staleTime: Infinity,
    }),
  ]);

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
    <ClientQueryProvider state={dehydratedState}>
      <StoreItem type="book" data={robookData} />
      {children}
    </ClientQueryProvider>
  );
}
