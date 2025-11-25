"use client";
import React from "react";
import Box from "@mui/material/Box";
import PostCard from "./PostCard";
import type { BookPostDTO } from "@/types/book";
import {
  fetchInitialAuthorPosts,
  getAuthorProfile
  // fetchRobook
} from "@/actions/author";
import { useQuery } from "@tanstack/react-query";
import { useInfinitePosts } from "@/hooks/author/useInfiniteAuthorPost";

export default function AuthorPosts({ handle }: { handle: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts(handle);
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  // Fetch robook metadata (cached from layout if prefetched)
  const { data: author } = useQuery({
    queryKey: ["author", handle],
    queryFn: () => getAuthorProfile(handle),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const posts = data?.pages.flat() || [];
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

  // if (!robook) return <h1> Sorry, No Robook found </h1>; // or a loading skeleton

  if (!posts) return <h1> Sorry, failed to load posts</h1>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 0,
        gap: 2,
        mb: 2,
      }}
    >
      {posts.map((post: BookPostDTO, index: number) => (
        <PostCard key={index} author={author} post={post} />
      ))}
      <div ref={loaderRef} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </Box>
  );
}
