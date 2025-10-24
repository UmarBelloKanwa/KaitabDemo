"use client";

import Box from "@mui/material/Box";
import PostCard from "./PostCard";
import type { BookPostDTO } from "@/types/book";
import { fetchInitialBookPosts, fetchRobook } from "@/actions/robook";
import { useQuery } from "@tanstack/react-query";

export default function RobookProfilePosts({ slug }: { slug: string }) {
  // Fetch robook metadata (cached from layout if prefetched)
  const { data: robook } = useQuery({
    queryKey: ["robook", slug],
    queryFn: () => fetchRobook(slug),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch initial posts
  const { data: initialPosts } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => fetchInitialBookPosts(slug),
    staleTime: 5 * 60 * 1000, // cache posts for 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (!robook) return <h1> Sorry, No Robook found </h1>; // or a loading skeleton

  if (!initialPosts) return <h1> Sorry, failed to load posts</h1>;

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
      {initialPosts.map((post: BookPostDTO, index: number) => (
        <PostCard key={index} robook={robook} post={post} />
      ))}
    </Box>
  );
}
