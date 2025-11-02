"use client";

import React from "react";
import Box from "@mui/material/Box";
import PostCard from "@ui/robook/post/PostCard";
import { useInfinitePosts } from "@/hooks/home/useInfinitePosts";

export default function HomePostLists() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

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

  if (!posts) return <h1> Sorry, failed to load posts</h1>;
  console.log()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {posts.map((post, index) => (
        <PostCard key={index} post={post} robook={post?.book}/>
      ))}
    </Box>
  );
}
