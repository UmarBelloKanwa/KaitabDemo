"use client";

import React from "react";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { followBook, unfollowBook } from "@/lib/api/book";
import useAuthCheck from "@/hooks/auth/useAuthCheck";

export default function FollowButton({
  robookPublicId,
  isFollowing,
}: {
  robookPublicId: string;
  isFollowing: boolean;
}) {
  const [isFollowingBook, setIsFollowingBook] = React.useState(isFollowing);
  const requireAuth = useAuthCheck();

  const makeAction = async () => {
    // Optimistic UI update — instant change
    setIsFollowingBook((prev) => !prev);

    try {
      if (isFollowingBook) {
        await unfollowBook(robookPublicId);
      } else {
        await followBook(robookPublicId);
      }
    } catch (err) {
      console.log("Follow/unfollow failed:", err);
      // revert state on error
      setIsFollowingBook((prev) => !prev);
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={isFollowingBook ? <CheckCircleIcon /> : null}
      onClick={() => requireAuth(makeAction)}
      sx={{
        flex: 1,
      }}
    >
      {isFollowingBook ? "Following" : "Follow"}
    </Button>
  );
}
