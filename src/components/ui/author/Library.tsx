"use client";

import React from "react";
import { getAuthorProfile } from "@/actions/author";
import type { Author } from "@/types/author";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import type { ArticlePreview } from "@/types/article";
import ArticleCard from "@/components/ui/article/article-preview-card";
import { useInfiniteAuthorArticlesPreviews } from "@/hooks/author/useInfiniteAuthorArticles";

export default function Author({ handle }: { handle: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAuthorArticlesPreviews(handle);
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const { data: author } = useQuery({
    queryKey: ["authorArticlesPreviews", handle],
    queryFn: () => getAuthorProfile(handle),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const articlesPreviews = data?.pages.flat() || [];
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

  if (!articlesPreviews) return <h1> Sorry, failed to load articlesPreviews </h1>;

  // console.log(articlesPreviews);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", }}>
        {articlesPreviews.map((articlePreview: ArticlePreview, index: number) => (
          <Box sx={{ px: {md: 2}, m: "auto", width: "100%", }} key={index} >
            <ArticleCard articlePreview={articlePreview} />
          </Box>
        ))}
        <div ref={loaderRef} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </Box>
    </>
  );
}
