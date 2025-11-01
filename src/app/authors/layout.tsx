"use server";

import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ClientQueryProvider from "@/providers/QueryProvider";
import { fetchAuthors } from "@/actions/author";
import { fetchBooks } from "@/actions/robook";

export default async function AuthorsAndRobooksListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  let initialAuthors = [];
  let initialBooks = [];

  try {
    const [authorsRes, booksRes] = await Promise.all([
      fetchAuthors(),
     fetchBooks(),
    ]);
    console.log("Fetched booksRes", booksRes);
    initialAuthors = authorsRes ?? [];
    initialBooks = booksRes ?? [];
  } catch (error) {
    console.log(error);
  }

  queryClient.setQueryData(["authors"], {
    pages: [initialAuthors],
    pageParams: [0],
  });

  queryClient.setQueryData(["robooks"], {
    pages: [initialBooks],
    pageParams: [0],
  });

  console.log("Initial Authors", initialAuthors);

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientQueryProvider state={dehydratedState}>
      {children}
    </ClientQueryProvider>
  );
}
