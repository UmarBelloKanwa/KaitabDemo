"use server";

import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ClientQueryProvider from "@/providers/QueryProvider";
import { fetchAuthors } from "@/actions/author";
import { fetchBooks } from "@/actions/robook";


export default async function RobooksListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  let initialAuthors, initialBooks;

  try {
    [initialAuthors, initialBooks] = await Promise.all([
      fetchAuthors(),
      fetchBooks()
    ])
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

  

  const dehydratedState = dehydrate(queryClient);

  return (
    <ClientQueryProvider state={dehydratedState}>
      {children}
    </ClientQueryProvider>
  );
}
