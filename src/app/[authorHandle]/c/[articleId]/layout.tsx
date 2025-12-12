"use server";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getAuthorArticle } from "@/actions/article";
import React from "react";
import BackButton from "@/components/ui/common/AppBar";
import Box from "@mui/material/Box";
import getQueryClient from "@/lib/get-query-client";


export default async function SinglArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ authorHandle: string, articleId: string }>;
}) {
  const p = await params;
  const queryClient = getQueryClient();

  // This is the magic: prefetch ONLY if not already in cache
  // But since this is a fresh QueryClient per request → it's never cached
  // So we prefetch the post data here → enables SSR + hydration
  await queryClient.prefetchQuery({
    queryKey: ["article", p.articleId],
    queryFn: () => getAuthorArticle(p.authorHandle, p.articleId),
    staleTime: Infinity,
  });

  const dehydratedState = dehydrate(queryClient);
 
  return (
   <HydrationBoundary state={dehydratedState}>
      <Box
        sx={{
          mt: 0,
          display: "flex",
          p: 0,
          flexDirection: { xs: "column", sm: "column", md: "row" }, // correct
          gap: 0,
          mx: "auto", // simpler than m: "auto"
          alignItems: { xs: "center", md: "start" },
          justifyContent: { xs: "center", md: "start" },
          width: "100%",
        }}
      >
        <BackButton title="Article" />
        <Box
          sx={{
            flex: 1,
            p: { xs: 1, sm: 1, md: 0 },
            mx: "auto", // centers it horizontally inside parent
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>
   </HydrationBoundary>
  );
}
