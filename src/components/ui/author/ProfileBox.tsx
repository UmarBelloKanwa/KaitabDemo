"use client";
import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";
import type { Author } from "@/types/author";
import { followAuthor, unfollowAuthor } from "@/lib/api/author";
import useAuthCheck from "@/hooks/auth/useAuthCheck";

export default function ProfileCard({ author }: { author: Author }) {
  const pathname = usePathname();
  const router = useRouter();
  const requireAuth = useAuthCheck();
  const [isFollowingAuthor, setIsFollowingAuthor] = React.useState(
    author.is_following
  );

  const isActive = (path: string) =>
    pathname === path || pathname.endsWith(path);

  const navButtonSx = (active: boolean) => ({
    py: 0.2,
    px: 0.8,
    fontSize: "0.73em",
    borderColor: "divider",
    borderRadius: 2,
    height: "fit-content",
    color: "white",
    ...(active && {
      bgcolor: "white",
      color: "black",
      borderColor: "white",
      // "&:hover": {
      //   bgcolor: "primary.dark",
      // },
    }),
  });

  const buttonAction = async () => {
    if (!author.can_follow) {
      router.push("/profile/edit");
      return;
    }

    // Optimistic UI update
    setIsFollowingAuthor((prev) => !prev);

    try {
      if (isFollowingAuthor) {
        await unfollowAuthor(author.public_id);
      } else {
        await followAuthor(author.public_id);
      }
    } catch (err) {
      // console.log("Follow/unfollow failed:", err);
      setIsFollowingAuthor((prev) => !prev);
    }
  };

  return (
    <Box
      sx={{
        mx: "auto",
        my: 1,
        width: { xs: "80%", sm: "70%", md: "50%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignLast: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          height: "fit-content",
        }}
      >
        <Avatar
          src={author.profile_picture}
          sx={{
            width: 90,
            height: 90,
            border: "2px solid",
            borderColor: "divider",
          }}
        >
          {author.name.charAt(0)}
        </Avatar>

        {/* Online indicator */}
        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: 11,
            right: 11,
            width: 13,
            height: 13,
            bgcolor: "green", // green
            borderRadius: "50%",
            border: "2px solid white", // clean border
          })}
        />
      </Box>

      <Typography variant="h6">{author.name}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography component={"div"} variant="caption" color="grey">
          @{author.handle}
        </Typography>
        <Box sx={{ fontSize: "xx-small" }}>•</Box>
        <Button
          variant="text"
          size="small"
          onClick={() => requireAuth(buttonAction)}
          sx={{
            p: 0,
            ml: -1.5,
            fontSize: "0.7em",
            "&:hover": {
              bgcolor: "transparent",
              color: "blue",
            },
          }}
        >
          {!author.can_follow
            ? "Edit"
            : author.is_following
            ? "Following"
            : "Follow"}
        </Button>
      </Box>

      <Typography variant="caption" color="grey" fontSize="small">
        {author.short_bio}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push(`/chat`)}
          sx={navButtonSx(isActive(`/chat`) || isActive(`/`))}
        >
          Chat
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push(`/library`)}
          sx={navButtonSx(isActive(`/library`))}
        >
          Library
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push(`/about`)}
          sx={navButtonSx(isActive(`/about`))}
        >
          About
        </Button>
      </Box>
    </Box>
  );
}
