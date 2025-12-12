"use client";

import React from "react";
import Box from "@mui/material/Box";
import type { ArticlePreview } from "@/types/article";
import ArticleCard from "@/components/ui/article/article-preview-card";
import { useInfiniteArticlesPreviews } from "@/hooks/home/useInfiniteArticlesPreviews";

export default function ArticlesPreviewsList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteArticlesPreviews();
  const loaderRef = React.useRef<HTMLDivElement | null>(null);


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


  if (!articlesPreviews) return <h1> Sorry, failed to load articlesPreviews </h1>;

  // console.log(articlesPreviews);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {articlesPreviews.map((articlePreview: ArticlePreview, index: number) => (
          <Box sx={{ m: "auto" }} key={index} >
            <ArticleCard articlePreview={articlePreview} />
          </Box>
        ))}
        <div ref={loaderRef} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </Box>
    </>
  );
}
