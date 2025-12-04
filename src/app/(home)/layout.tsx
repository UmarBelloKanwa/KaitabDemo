"use server";

import React from "react";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchAuthors } from "@/actions/author";
import { fetchBooks } from "@/actions/robook";
import { fetchAuthorsPosts } from "@/actions/author";
import type { Metadata } from "next";

import getQueryClient from "@/lib/get-query-client";

import NavLayout from "./NavLayout";
import { authors } from "@/data/fake";

export const metadata: Metadata = {
  title: "Home | Feedple",
  description: "A social platform to share ideas while training your digital mind.",
};


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  const results = await Promise.allSettled([
    fetchAuthors(),
    fetchAuthorsPosts(),
    fetchBooks(),
  ]);

  const authorsRes = results[0].status === "fulfilled" ? results[0].value : [];
  const postsRes = results[1].status === "fulfilled" ? results[1].value : [];
  const booksRes = results[2].status === "fulfilled" ? results[2].value : [];

  queryClient.setQueryData(["authors"], {
    pages: [authorsRes],
    pageParams: [0],
  });

  if (authors) {
    authors.forEach((author: any) => {
      queryClient.setQueryData(["author", author.public_id], author);
    });
  }

  queryClient.setQueryData(["posts"], {
    pages: [postsRes],
    pageParams: [0],
  });

  if (postsRes) {
    postsRes.forEach((post: any) => {
      queryClient.setQueryData(["post", post.public_id], post);
    });
  }

  queryClient.setQueryData(["robooks"], {
    pages: [booksRes],
    pageParams: [0],
  });

  if (booksRes) {
    booksRes.forEach((robook: any) => {
      queryClient.setQueryData(["robook", robook.public_id], robook);
    });
  }

  const dehydratedState = dehydrate(queryClient);
  // console.log("Posts", postsRes);
  // console.log("Authors", authorsRes);
  // console.log("Books", booksRes);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NavLayout>{children}</NavLayout>
    </HydrationBoundary>
  );
}
