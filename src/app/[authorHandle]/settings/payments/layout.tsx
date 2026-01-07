"use server";

import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import { checkStripeAccountStatus } from "@/actions/subs";

export default async function SubscriptionSettings({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ authorHandle: string }>;
}) {
  const p = await params;
  const queryClient = getQueryClient();

  // This is the magic: prefetch ONLY if not already in cache
  // But since this is a fresh QueryClient per request → it's never cached
  // So we prefetch the post data here → enables SSR + hydration
  await queryClient.prefetchQuery({
    queryKey: ["accountStatus"],
    queryFn: async () => {
      try {
        return await checkStripeAccountStatus()
      } catch (err) {
       // console.error(err);
        return null;
      }
    },
    staleTime: Infinity,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
