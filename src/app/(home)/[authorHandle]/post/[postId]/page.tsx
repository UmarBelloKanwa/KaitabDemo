"use server";

import Box from "@mui/material/Box";
import PostContainer from "./Post";

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{
    authorHandle: string;
    postId: string;
  }>;
}) {
  const p = await params;

  return (
    <Box
      sx={{
        m: 0,
        p: { xs: 1 },
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <PostContainer
        authorHandle={p.authorHandle}
        postId={p.postId}
      />
    </Box>
  );
}
