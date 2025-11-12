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
import IosShareIcon from "@mui/icons-material/IosShareRounded";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function ActionsButton({
  robookPublicId,
  isFollowing,
  canFollow,
}: {
  robookPublicId: string;
  isFollowing: boolean;
  canFollow: boolean;
}) {
  const pathname = usePathname(); // e.g. "/r/atomic/chapters"
  const theme = useTheme();
  const router = useRouter();

  // Get last part of the path
  const isChaptersPage = pathname.endsWith("/chapters");
  const buttonLabel = isChaptersPage ? "Posts" : "Read";
  // Split the path into segments
  const segments = pathname.split("/").filter(Boolean);
  // Example: ["r", "atomic", "chapters"]

  // Get the book ID (2nd segment in /r/:bookId/...)
  const bookId = segments[1];

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

  const handleNavigation = () => {
    if (isChaptersPage) {
      router.push(`/r/${bookId}`);
      setValue("posts");
    } else {
      requireAuth(() => {
        router.push(`/r/${bookId}/chapters`);
        setValue("chapters");
      });
    }
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
  const [value, setValue] = React.useState(
    isChaptersPage ? "chapters" : "posts"
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleNavigation();
  };
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1.5, mb: 0.7 }}>
        <Button
          variant="contained"
          startIcon={isFollowingBook ? <CheckCircleIcon /> : null}
          onClick={() => requireAuth(makeAction)}
          disabled={!canFollow}
          fullWidth
        >
          {isFollowingBook ? "Following" : "Follow"}
        </Button>
        {/* <Button
          variant="outlined"
          onClick={handleNavigation}
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
          fullWidth
        >
          {buttonLabel}
        </Button> */}
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
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            px: { xs: 3, sm: 5, md: 9 },
            minHeight: 36, // reduce total height of the Tabs bar
            "& .MuiTabs-indicator": {
              height: 2, // thinner bottom border
            },
          }}
        >
          <Tab
            label="Posts"
            value="posts"
            sx={{
              minWidth: 120, // makes the tab horizontally larger
              py: 0, // reduces vertical padding
              minHeight: 36, // aligns with Tabs bar height
            }}
          />
          <Tab sx={{ flexGrow: 1, visibility: "hidden" }} />
          <Tab
            label="Chapters"
            value="chapters"
            sx={{
              minWidth: 120,
              py: 0,
              minHeight: 36,
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
