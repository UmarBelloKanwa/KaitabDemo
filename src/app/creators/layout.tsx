"use server";

import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchAuthors } from "@/actions/author";
import { fetchBooks } from "@/actions/robook";
import { HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from "@/lib/get-query-client";


export default async function AuthorsAndRobooksListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  let initialAuthors = [];
  let initialBooks = [];

  try {
    const [authorsRes] = await Promise.all([
      fetchAuthors(),
    ]);
    initialAuthors = authorsRes ?? [];
  } catch (error) {
    console.log(error);
  }

  queryClient.setQueryData(["authors"], {
    pages: [initialAuthors],
    pageParams: [0],
  });

  if (initialAuthors) {
     initialAuthors.forEach((author: any) => {
      queryClient.setQueryData(["author", author.public_id], author);
    });
  }

  // queryClient.setQueryData(["robooks"], {
  //   pages: [initialBooks],
  //   pageParams: [0],
  // });

  // if (initialBooks) {
  //    initialBooks.forEach((book: any) => {
  //     queryClient.setQueryData(["robook", book.public_id], book);
  //   });
  // }

  // console.log("Initial Authors", initialAuthors);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      {children}
    </HydrationBoundary>
  );
}
