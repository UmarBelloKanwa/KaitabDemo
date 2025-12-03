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
import { followAuthor, unfollowAuthor } from "@/lib/api/author";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import IosShareIcon from "@mui/icons-material/IosShareRounded";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingCard from "../settings/CortexSettingCard";

export default function ActionsButton({
  authorPublicId,
  isFollowing,
  canFollow,
}: {
  authorPublicId: string;
  isFollowing: boolean;
  canFollow: boolean;
}) {
  const router = useRouter();

  const pathname = usePathname(); // e.g. "/r/atomic/chapters"
  const theme = useTheme();

  // Get last part of the path
  const isChaptersPage = pathname.endsWith("/chapters");
  const buttonLabel = isChaptersPage ? "Posts" : "Read";
  // Split the path into segments
  const segments = pathname.split("/").filter(Boolean);
  // Example: ["r", "atomic", "chapters"]

  // Get the Author ID (2nd segment in /r/:AuthorId/...)
  const AuthorId = segments[1];

  const [isFollowingAuthor, setIsFollowingAuthor] = React.useState(isFollowing);
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
    setIsFollowingAuthor((prev) => !prev);

    try {
      if (isFollowingAuthor) {
        await unfollowAuthor(authorPublicId);
      } else {
        await followAuthor(authorPublicId);
      }
    } catch (err) {
      console.log("Follow/unfollow failed:", err);
      setIsFollowingAuthor((prev) => !prev);
    }
  };

  const [displaySettingsCard, setDisplaySettingsCard] = React.useState(false);

  return (
    <Box sx={{ display: "flex", gap: 0, my: 0 }}>
      {canFollow ? (
        <Box sx={{ display: "flex", gap: 1, flexDirection: "row", width: "100%" }}>
          <Button
            variant="contained"
            startIcon={isFollowingAuthor ? <CheckCircleIcon /> : null}
            onClick={() => requireAuth(makeAction)}
            sx={{ flex: 1 }}
          >
            {isFollowingAuthor ? "Subscribed" : "Subscribe"}
          </Button>
          <Button
            variant="outlined"
            startIcon={isFollowingAuthor ? <CheckCircleIcon /> : null}
            onClick={() => requireAuth(makeAction)}
            sx={(theme) => ({
              flex: 1,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: "1px solid " + theme.palette.divider,
              boxShadow: theme.shadows[1],   // elevation
              textTransform: "none",
              "&:hover": {
                boxShadow: theme.shadows[8],
                backgroundColor: theme.palette.background.paper,
              },
            })}
          >
            {isFollowingAuthor ? "Following" : "Follow"}

          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={() => requireAuth(() => router.push(`/profile/edit`))}
          fullWidth
          sx={{ flex: 1 }}
        >
          Edit Profile
        </Button>
      )}
      {/* {!canFollow && (
        <IconButton
          onClick={() => setDisplaySettingsCard(true)}
          sx={{
            alignSelf: "flex-end",
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.text.primary,
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          <SettingsOutlinedIcon />
        </IconButton>
      )} */}
      <IconButton
        onClick={handleMoreClick}
        sx={{
          alignSelf: "flex-end",
          borderRadius: 1,
          ml: 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: "1px solid " + theme.palette.divider,
          boxShadow: theme.shadows[1],   // elevation
          textTransform: "none",
          "&:hover": {
            boxShadow: theme.shadows[8],
            backgroundColor: theme.palette.background.paper,
          },

        }}
      >
        <MoreHorizIcon />
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

      <SettingCard
        displaySettingsCard={displaySettingsCard}
        setDisplaySettingsCard={setDisplaySettingsCard}
      />
    </Box>
  );
}
