"use client";

import Container from "@mui/material/Container";
import CommentSection from "@/components/ui/robook/chapter/CommentSection";
import {
  createCommentToArticle,
  getArticleComments,
} from "@/lib/api/article";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import type { Article } from "@/types/article";
import ArticleCard from "@/components/ui/article/article-card";

export default function Article({
  authorHandle,
  articleId,
}: {
  articleId: string;
  authorHandle: string;
}) {
  const queryClient = useQueryClient();

  let { data: article, isLoading, isError } = useQuery<Article | undefined>({
    queryKey: ["article", articleId],
    queryFn: async (): Promise<Article | undefined> => {
      const cached = queryClient.getQueryData<Article | undefined>(["article", articleId]);
      return cached;
      // if (cached) return cached; // Prevent unnecessary fetch
      // return await fetchAuthorPost(authorHandle, articleId);
    },
    staleTime: Infinity, // optional
  });

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ m: 0, p: 0, display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Container>
    );
  }

  // article is already typed as Article | undefined, no need for type assertion

  if (isError || !article) {
    return (
      <Container maxWidth="sm" sx={{ m: 0, p: 0 }}>
        <h1>Sorry, Post is not found</h1>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ m: "auto", p: 0, gap: 1, maxWidth: 760 }}>
      <ArticleCard article={article} />
      <CommentSection
        fetchComments={async () =>
          getArticleComments(authorHandle, articleId)
        }
        createComment={async (txt: string) =>
          await createCommentToArticle(article.public_id, txt)
        }
      />
    </Container>
  );
}
