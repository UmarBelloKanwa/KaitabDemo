"use server";

import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ClientQueryProvider from "@/providers/QueryProvider";
import { getAuthorProfile, getAuthorBooks } from "@/actions/author";
import type { Author } from "@/types/author";
import Container from "@mui/material/Container";
import ProfileCard from "@ui/author/ProfileCard";

export default async function BookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { authorHandle: string };
}) {
  const p = await params;
  const handle = p.authorHandle;
  const queryClient = new QueryClient();

  // Prefetch author
  await queryClient.prefetchQuery({
    queryKey: ["author", handle],
    queryFn: () => getAuthorProfile(handle),
    staleTime: Infinity,
  });

  // Prefetch books
  const initialBooks = await getAuthorBooks(handle);
  queryClient.setQueryData(["authorBooks", handle], {
    pages: [initialBooks],
    pageParams: [0],
  });

  // Retrieve the cached author data
  const authorData = queryClient.getQueryData<Author>(["author", handle]);

  if (!authorData) {
    return (
      <h1 style={{ marginLeft: "3em" }}>Sorry, the author was not found.</h1>
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientQueryProvider state={dehydratedState}>
      <Container maxWidth="sm" sx={{ p: { xs: 2, sm: 2 } }}>
        <ProfileCard author={authorData} />
        {children}
      </Container>
    </ClientQueryProvider>
  );
}
