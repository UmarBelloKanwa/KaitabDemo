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
  params: Promise<{ authorHandle: string; }>;
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
          display: { xs: "block", sm: "block", md: "flex" },
          gap: 0,
          m: "aauto",
          alignContent: "start",
          alignItems: "start",
          justifyContent: "start",
          justifyItems: "start",

        }}
      >
        <BackButton title="Book" />
        <Box sx={{ ml: { md: -2, sm: "auto", xs: "auto" }, flex: 1 }}>{children}</Box>
      </Box>
    </ClientQueryProvider>
  );
}
