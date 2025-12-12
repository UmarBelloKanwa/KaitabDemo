"use server";

import Box from "@mui/material/Box";
import ArticleBody from "@/components/ui/article/article-body";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{
    authorHandle: string;
    articleId: string;
  }>;
  }) {
  const p = await params;

  return (
    <Box
      sx={{
        p: { xs: 1 },
        width: "100%",
        position: "relative",
      }}
    >
      <ArticleBody
        authorHandle={p.authorHandle}
        articleId={p.articleId}
      />
    </Box>
  );
}
