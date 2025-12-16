"use server";

import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import {
  getAuthorProfile,
  fetchInitialAuthorPosts,
  getAuthorArticles,
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

  try {
    // 🚀 Run all async backend actions IN PARALLEL
    const [
      authorData,
      initialBookPosts,
      initialArticlesPreviews,
    ] = await Promise.all([
      getAuthorProfile(handle),
      fetchInitialAuthorPosts(handle),
      getAuthorArticles(handle),
    ]);

    // ❌ Author not found → trigger Next.js 404
    if (!authorData) {
      notFound();
    }

    // ✅ Cache author
    queryClient.setQueryData(["author", handle], authorData);

    if (authorData.is_owner) {
      queryClient.setQueryData(["cortex"], authorData.cortex);
    }

    // ✅ Cache posts (infinite query format)
    if (initialBookPosts?.length) {
      queryClient.setQueryData(["posts", handle], {
        pages: [initialBookPosts],
        pageParams: [0],
      });

      initialBookPosts.forEach((post: any) => {
        queryClient.setQueryData(["post", post.public_id], post);
      });
    }

    // ✅ Cache article previews
    if (initialArticlesPreviews?.length) {
      queryClient.setQueryData(["authorArticlesPreviews", handle], {
        pages: [initialArticlesPreviews],
        pageParams: [0],
      });

      initialArticlesPreviews.forEach((articlePreview: any) => {
        articlePreview.author = authorData;
        queryClient.setQueryData(
          ["authorArticlesPreviews", articlePreview.public_id],
          articlePreview
        );
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
  } catch (error) {
    notFound();
  }
}
