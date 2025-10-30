"use server";

import React from "react";
import { getAuthorBook, getAuthorBookComments } from "@/actions/author";
import RobookIndieCard from "@/components/ui/author/RobookIndieCard";
import type { Comment } from "@/types/book";
import type { Robook } from "@/types/author";

export default async function RobookCard({
  params,
}: {
  params: {
    authorHandle: string;
    robookSlug: string;
  };
}) {
  const p = await params;
  let book: Robook | null = null;
  let comments: Comment[] | null = null;
  try {
    [book, comments] = await Promise.all([
      getAuthorBook(p.authorHandle, p.robookSlug),
      getAuthorBookComments(p.authorHandle, p.robookSlug),
    ]);
    console.log("Fetched book data:", book);
  } catch (error) {
    console.log("Error fetching book or comments:", error);
  }
  console.log("Book data in page.tsx:", book)
  if (!book) {
    return <h1 style={{ marginLeft: "3em" }}> Sorry the Book is not found </h1>;
  }

  return (
    <RobookIndieCard
      authorHandle={p.authorHandle}
      robookSlug={p.robookSlug}
      robookData={book}
      robookComments={comments}
    />
  );
}
