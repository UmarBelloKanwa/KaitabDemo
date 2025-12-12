"use server";

import React from "react";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchAuthors } from "@/actions/author";
import { fetchBooks } from "@/actions/robook";
import { fetchAuthorsPosts } from "@/actions/author";
import { getArticlesPreviews } from "@/actions/article";

import getQueryClient from "@/lib/get-query-client";

import NavLayout from "../../components/ui/home/NavLayout";
import { authors } from "@/data/fake";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  const results = await Promise.allSettled([
    fetchAuthors(),
    fetchAuthorsPosts(),
   // fetchBooks(),
    getArticlesPreviews(),
  ]);

  const authorsRes = results[0].status === "fulfilled" ? results[0].value : [];
  const postsRes = results[1].status === "fulfilled" ? results[1].value : [];
  //const booksRes = results[2].status === "fulfilled" ? results[2].value : [];
  const initialArticlesPreviews = results[2].status === "fulfilled" ? results[2].value : [];


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

  // queryClient.setQueryData(["robooks"], {
  //   pages: [booksRes],
  //   pageParams: [0],
  // });
  // if (booksRes) {
  //   booksRes.forEach((robook: any) => {
  //     queryClient.setQueryData(["robook", robook.public_id], robook);
  //   });
  // }

  if (initialArticlesPreviews) {
    // ArticlesPreviews
    queryClient.setQueryData(["articlesPreviews"], {
      pages: [initialArticlesPreviews],
      pageParams: [0],
    });

    initialArticlesPreviews.forEach((articlePreview: any) => {
      queryClient.setQueryData(
        ["articlesPreviews", articlePreview.public_id],
        articlePreview
      );
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
