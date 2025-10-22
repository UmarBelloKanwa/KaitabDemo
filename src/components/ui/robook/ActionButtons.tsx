"use client";
import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import { followBook, unfollowBook } from "@/lib/api/book";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import IosShareIcon from '@mui/icons-material/IosShareRounded';

export default function ActionsButton({
  robookPublicId,
  isFollowing,
  canFollow,
}: {
  robookPublicId: string;
  isFollowing: boolean;
  canFollow: boolean;
}) {
  const theme = useTheme();
  const [isFollowingBook, setIsFollowingBook] = React.useState(isFollowing);
  const requireAuth = useAuthCheck();

  // State for More menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSnackbarOpen(true);
    } catch (err) {
      console.log("Failed to copy link:", err);
    } finally {
      handleClose();
    }
  };

  const makeAction = async () => {
    // Optimistic UI update
    setIsFollowingBook((prev) => !prev);

    try {
      if (isFollowingBook) {
        await unfollowBook(robookPublicId);
      } else {
        await followBook(robookPublicId);
      }
    } catch (err) {
      console.log("Follow/unfollow failed:", err);
      setIsFollowingBook((prev) => !prev);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
      {canFollow && (
        <Button
          variant="contained"
          startIcon={isFollowingBook ? <CheckCircleIcon /> : null}
          onClick={() => requireAuth(() => {})}
          sx={{ flex: 1 }}
        >
          {isFollowingBook ? "Following" : "Follow"}
        </Button>
      )}
      <Button
        variant="outlined"
        onClick={() => requireAuth(makeAction)}
        sx={{
          borderColor: theme.palette.divider,
          color: theme.palette.text.disabled,
          bgcolor: theme.palette.action.hover,
          flex: canFollow ? "unset" : 1,
          "&:hover": {
            bgcolor: "transparent",
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider,
          },
        }}
      >
        Read
      </Button>
      <IconButton
        onClick={handleMoreClick}
        sx={{
          color: theme.palette.text.secondary,
          "&:hover": {
            color: theme.palette.text.primary,
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        <IosShareIcon />
      </IconButton>

      {/* More Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleShare}>Copy Link</MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
