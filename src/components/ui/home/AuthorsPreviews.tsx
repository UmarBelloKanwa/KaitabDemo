"use client";

import React from "react";
import { Container, Box, useTheme } from "@mui/material";
import AuthorPreviewCard from "@/components/ui/author/AuthorPreviewCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAuthors } from "@/actions/author";
import { Author } from "@/types/author";
import { useInfiniteAuthors } from "@/hooks/author/useInfiniteAuthors";

// const characters = [
//  1, 2, 3, 4, 5, 1, 2, 3, 4, 5,

// ];

export default function AuthorsPreviews() {
  const theme = useTheme();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAuthors();
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const authorsPreviews = data?.pages.flat() || [];

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
  if (!authorsPreviews)
    return <h1> Sorry, failed to load articlesPreviews </h1>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          // bgcolor: "red",
          //   width: { xs: "99%", sm: "93%", md: "sm" },
          //   maxWidth: "xl",
          width: "100%",
          m: "auto",
          maxWidth: 1000,
          // bgcolor: "red"
        }}
      >
        {authorsPreviews.map((author: Author, index) => (
          <AuthorPreviewCard key={index} author={author} />
        ))}
      </Box>
      <div ref={loaderRef} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </Box>
  );
}
