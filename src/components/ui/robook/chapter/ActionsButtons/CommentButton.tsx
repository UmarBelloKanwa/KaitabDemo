"use client";

import React from "react";
import Button from "@mui/material/Button";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useRouter } from "next/navigation";


export default function CommentButton({
  robookSlug,
  chapterPublicId,
  commentCount,
}: {
  robookSlug: string;
  chapterPublicId: string;
  commentCount: number;
}) {
  const requireAuth = useAuthCheck();
  const router = useRouter();
  return (
    <Button
      variant="text"
      size="small"
      onClick={() => {
        requireAuth(() => router.push(`/r/${robookSlug}/chapters/${chapterPublicId}`));
      }}
      startIcon={<ChatBubbleOutlineIcon />}
      sx={{
        color: "text.secondary",
        textTransform: "none",
      }}
    >
      {commentCount}
    </Button>
  );
}
