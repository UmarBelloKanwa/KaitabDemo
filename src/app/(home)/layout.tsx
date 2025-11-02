"use server";

import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ClientQueryProvider from "@/providers/QueryProvider";
import { fetchAuthors } from "@/actions/author";
import { fetchBooks, fetchBooksPosts } from "@/actions/robook";
import NavLayout from "./NavLayout";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const results = await Promise.allSettled([
    fetchAuthors(),
    fetchBooksPosts(),
    fetchBooks(),
  ]);

  const authorsRes = results[0].status === "fulfilled" ? results[0].value : [];
  const postsRes = results[1].status === "fulfilled" ? results[1].value : [];
  const booksRes = results[2].status === "fulfilled" ? results[2].value : [];

  queryClient.setQueryData(["authors"], {
    pages: [authorsRes],
    pageParams: [0],
  });

  queryClient.setQueryData(["booksPosts"], {
    pages: [postsRes],
    pageParams: [0],
  });

  queryClient.setQueryData(["robooks"], {
    pages: [booksRes],
    pageParams: [0],
  });

  const dehydratedState = dehydrate(queryClient);
  console.log("Posts", postsRes);
  // console.log("Authors", authorsRes);
  // console.log("Books", booksRes);

  return (
    <ClientQueryProvider state={dehydratedState}>
      <NavLayout>{children}</NavLayout>
    </ClientQueryProvider>
  );
}
