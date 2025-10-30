"use server";

import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ClientQueryProvider from "@/providers/QueryProvider";
import { fetchBooks } from "@/actions/robook";

export default async function RobooksListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const initialBooks = await fetchBooks(false, 10);
  queryClient.setQueryData(["books"], {
    pages: [initialBooks],
    pageParams: [0],
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientQueryProvider state={dehydratedState}>
      {children}
    </ClientQueryProvider>
  );
}
