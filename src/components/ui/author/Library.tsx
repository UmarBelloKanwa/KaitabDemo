"use client";

import React from "react";
import { getAuthorProfile } from "@/actions/author";
import type { Author } from "@/types/author";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteAuthorBooks } from "@/hooks/author/useInfiniteAuthorBooks";
import Box from "@mui/material/Box";
import RobookCard from "./Author-RobookCard";
import type { Robook } from "@/types/author";

export default function Author({ handle }: { handle: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAuthorBooks(handle);
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const { data: author } = useQuery({
    queryKey: ["author", handle],
    queryFn: () => getAuthorProfile(handle),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const books = data?.pages.flat() || [];
  React.useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      observer.disconnect(); // safer than unobserve()
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!author) return <h1> Sorry, No Author found </h1>; // or a loading skeleton

  if (!books) return <h1> Sorry, failed to load books </h1>;
  console.log(books);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {books.map((robook: Robook, index: number) => (
          <React.Fragment key={index}>
            <RobookCard authorHandle={handle} robook={robook} author={author} />
          </React.Fragment>
        ))}
        <div ref={loaderRef} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </Box>
    </>
  );
}
