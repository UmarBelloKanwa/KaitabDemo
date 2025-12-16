"use client";

import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { followAuthor, unfollowAuthor } from "@/lib/api/author";

export default function AuthorFollowButton({
  author,
  isFollowing = false,
}: {
  author: any;
  isFollowing?: boolean;
}) {
  const [isFollowingAuthor, setIsFollowingAuthor] = React.useState(isFollowing);

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const requiresAuth = useAuthCheck();

  const handleFollow = async () => {
    setIsFollowingAuthor(true);
    try {
      await followAuthor(author.public_id);
    } catch (err) {
      console.error(err);
      setIsFollowingAuthor(false);
    }
  };

  const handleUnfollow = async () => {
    setOpenConfirm(false);
    setIsFollowingAuthor(false);

    try {
      await unfollowAuthor(author.public_id);
    } catch (err) {
      console.error(err);
      setIsFollowingAuthor(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    requiresAuth(() => {
      if (isFollowingAuthor) {
        setOpenConfirm(true);
      } else {
        handleFollow();
      }
    });
  };

  return (
    <>
      {/* Follow / Following Button */}
      <Button
        variant={isFollowingAuthor ? "outlined" : "contained"}
        size="small"
        onClick={handleClick}
        sx={{
          px: 1.5,
          py: 0.5,
          fontSize: "0.75rem",
          textTransform: "none",
          borderRadius: "20px",
        }}
      >
        {isFollowingAuthor ? "Following" : "Follow"}
      </Button>

      {/* Unfollow Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              border: "1px solid red",
              borderColor: "grey.800",
              borderRadius: 2, // optional: rounded corners
              p: { xs: 0, md: 1 },
            },
            elevation: 0,
          },
        }}
        sx={{
          pb: 3,
        }}
      >
        <DialogTitle>Unfollow @{author.handle}?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            You will stop seeing updates from this author. Are you sure you want
            to unfollow?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleUnfollow} color="error" variant="contained">
            Unfollow
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
