"use server";

import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import StoreItem from "@/components/ui/StoreItem";
import { getAuthorProfile } from "@/actions/author";

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
    const [authorData] = await Promise.all([getAuthorProfile(handle)]);

    // ❌ Author not found → trigger Next.js 404
    if (!authorData) {
      notFound();
    }

    // ✅ Cache author
    queryClient.setQueryData(["author", handle], authorData);
    queryClient.setQueryData(["author"], authorData);

    if (authorData.is_owner) {
      queryClient.setQueryData(["cortex"], authorData.cortex);
    }

    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <StoreItem type="author" data={authorData} />
        {children}
      </HydrationBoundary>
    );
  } catch (error) {
    notFound();
  }
}
