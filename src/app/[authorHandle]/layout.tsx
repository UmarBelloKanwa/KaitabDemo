"use server";

import React from "react";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  getAuthorProfile,
  getAuthorBooks,
  fetchInitialAuthorPosts,
} from "@/actions/author";
import type { Author } from "@/types/author";
import Container from "@mui/material/Container";
import ProfileCard from "@ui/author/ProfileCard";
import StoreItem from "@/components/ui/StoreItem";

export default async function AuthorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ authorHandle: string }>;
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
  let initialBooks;
  try {
    initialBooks = await getAuthorBooks(handle);
  } catch (error) {
    console.log(error);
  }
  queryClient.setQueryData(["authorBooks", handle], {
    pages: [initialBooks],
    pageParams: [0],
  });

  const initialBookPosts = await fetchInitialAuthorPosts(handle);

  // Inject into cache in the correct infinite-query shape
  queryClient.setQueryData(["posts", handle], {
    pages: [initialBookPosts],
    pageParams: [0],
  });

  // Retrieve the cached author data
  const authorData = queryClient.getQueryData<Author>(["author", handle]);

  if (initialBookPosts) {
    initialBookPosts.forEach((post: any) => {
      post.author = authorData;
      queryClient.setQueryData(["post", post.public_id], post);
    });
  }

  if (!authorData) {
    return (
      <h1 style={{ marginLeft: "3em" }}>Sorry, the author was not found.</h1>
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <StoreItem type="author" data={authorData} />
      <Container maxWidth="sm" sx={{ p: { xs: 2, sm: 2 } }}>
        <ProfileCard author={authorData} />
        {children}
      </Container>
    </HydrationBoundary>
  );
}
