"use server";

import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ClientQueryProvider from "@/providers/QueryProvider";
import { getAuthorProfile } from "@/actions/author";
import type { Author } from "@/types/author";
import StoreItem from "@/components/ui/StoreItem";
import BackButton from "@/components/ui/common/AppBar";
import Box from "@mui/material/Box";

export default async function BookLayout({
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

  // Retrieve the cached author data
  const authorData = queryClient.getQueryData<Author>(["author", handle]);

  if (!authorData) {
    return (
      <h1 style={{ marginLeft: "3em" }}> Sorry, the author was not found.</h1>
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientQueryProvider state={dehydratedState}>
      <StoreItem type="author" data={authorData} />
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
        <BackButton title="Book" />

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
    </ClientQueryProvider>
  );
}
