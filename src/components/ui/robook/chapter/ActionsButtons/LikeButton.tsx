"use client";

import React from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likeChapter, unLikeChapter } from "@/lib/api/book";
import useAuthCheck from "@/hooks/auth/useAuthCheck";


export default function LikeButton({
  isLikedByUser,
  chapterPublicId,
  likesCount,
}: {
  isLikedByUser: boolean;
  chapterPublicId: string;
  likesCount: number;
}) {
  const [isLiked, setIsLiked] = React.useState(isLikedByUser);
  const [count, setCount] = React.useState(likesCount);
  const requireAuth = useAuthCheck();

  const makeAction = async () => {
    const prevLiked = isLiked;
    const newLiked = !prevLiked;

    // Optimistic UI update
    setIsLiked(newLiked);
    setCount((prev) => prev + (newLiked ? 1 : -1));

    try {
      if (newLiked) {
        await likeChapter(chapterPublicId);
      } else {
        await unLikeChapter(chapterPublicId);
      }
    } catch (err) {
      console.log("Like/unlike failed:", err);
      // Revert UI on error
      setIsLiked(prevLiked);
      setCount((prev) => prev + (prevLiked ? 1 : -1));
    }
  };

  return (
    <Button
      variant="text"
      size="small"
      startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      onClick={() => requireAuth(makeAction)}
      sx={{
        color: isLiked ? "error.main" : "text.secondary",
        textTransform: "none",
      }}
    >
      {count}
    </Button>
  );
}