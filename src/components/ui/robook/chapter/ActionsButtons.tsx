import React from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import { likeChapter, unLikeChapter } from "@/lib/api/book";
import useAuthCheck from "@/hooks/auth/useAuthCheck";

export function LikeButton({
  isLikedByUser,
  chapterPublicId,
  likesCount,
}: {
  isLikedByUser: boolean;
  chapterPublicId: string;
  likesCount: number;
}) {
  const [isLiked, setIsLiked] = React.useState(isLikedByUser);
  const [randomLikes, setRandomLikes] = React.useState(likesCount);
  const requireAuth = useAuthCheck();
  console.log(likesCount)

  const makeAction = async () => {
    // Optimistic UI update — instant change
    setIsLiked((prev) => !prev);

    try {
      if (isLiked) {
        await unLikeChapter(chapterPublicId);
      } else {
        await likeChapter(chapterPublicId);
      }
    } catch (err) {
      console.log("Follow/unfollow failed:", err);
      // revert state on error
      setIsLiked((prev) => !prev);
    }
  };
  return (
    <Button
      variant="text"
      size="small"
      startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      onClick={() => requireAuth(() => makeAction())}
      sx={{
        color: isLiked ? "" : "text.secondary",
        textTransform: "none",
      }}
    >
      {isLiked ? randomLikes + 1 : randomLikes}
    </Button>
  );
}

export function ShareButton() {
  const [open, setOpen] = React.useState(false);

  const handleShare = async () => {
    try {
      // Copy current page URL
      await navigator.clipboard.writeText(window.location.href);
      setOpen(true); // show "Copied!" snackbar
    } catch (err) {
      console.log("Failed to copy link:", err);
    }
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        startIcon={<ShareIcon />}
        sx={{
          color: "text.secondary",
          textTransform: "none",
        }}
        onClick={handleShare}
      >
        Share
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
