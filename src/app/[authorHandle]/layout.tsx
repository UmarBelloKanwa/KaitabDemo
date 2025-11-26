"use server";

import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  getAuthorProfile,
  getAuthorBooks,
  fetchInitialAuthorPosts,
} from "@/actions/author";

import Container from "@mui/material/Container";
import ProfileCard from "@ui/author/ProfileCard";
import StoreItem from "@/components/ui/StoreItem";
import getQueryClient from "@/lib/get-query-client";

export default async function AuthorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ authorHandle: string }>;
}) {
  const { authorHandle: handle } = await params;

  const queryClient = getQueryClient();

  // 🚀 Run all async backend actions IN PARALLEL
  const [authorData, initialBooks, initialBookPosts] = await Promise.all([
    getAuthorProfile(handle), // profile
    getAuthorBooks(handle), // books
    fetchInitialAuthorPosts(handle), // initial posts
  ]);

  // If author doesn't exist
  if (!authorData) {
    return (
      <h1 style={{ marginLeft: "3em" }}>Sorry, the author was not found.</h1>
    );
  }

  // Cache author
  queryClient.setQueryData(["author", handle], authorData);

  // Cache books (infinite-query format)
  if (initialBooks) {
    queryClient.setQueryData(["robooks", handle], {
      pages: [initialBooks],
      pageParams: [0],
    });

    // Also index each book individually + attach author
    initialBooks.forEach((book: any) => {
      book.author = authorData;
      queryClient.setQueryData(["robook", book.public_id], book);
    });
  }

  // Cache posts (infinite-query format)
  if (initialBookPosts) {
    queryClient.setQueryData(["posts", handle], {
      pages: [initialBookPosts],
      pageParams: [0],
    });

    // Also index each post individually + attach author
    initialBookPosts.forEach((post: any) => {
      post.author = authorData;
      queryClient.setQueryData(["post", post.public_id], post);
    });
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
