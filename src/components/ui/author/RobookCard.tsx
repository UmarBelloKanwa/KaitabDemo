"use client";

import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import useAuthCheck from "@/hooks/auth/useAuthCheck";

import type { BookResponse } from "@/types/book";
import type { Author } from "@/types/author";
import { useRouter } from "next/navigation";
import { followBook, unfollowBook } from "@/lib/api/book";

export default function RobookCard({
  robook,
  where,
}: {
  robook: BookResponse;
  where: string;
}) {
  const router = useRouter();
  const [isFollowingBook, setIsFollowingBook] = React.useState(
    robook.is_following
  );
  const requireAuth = useAuthCheck();
  const makeAction = async () => {
    // Optimistic UI update
    setIsFollowingBook((prev) => !prev);

    try {
      if (isFollowingBook) {
        await unfollowBook(robook.public_id);
      } else {
        await followBook(robook.public_id);
      }
    } catch (err) {
      console.log("Follow/unfollow failed:", err);
      setIsFollowingBook((prev) => !prev);
    }
  };
  const FollowButton = () => {
    return (
      <>
        {robook.can_follow && (
          <IconButton
            size="small"
            sx={{
              px: 1,
              py: 0.5,
              width: "fit-content",
              fontSize: "0.75rem",
              mb: 1,
              color: "text.secondary",
              borderRadius: 0.9,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderColor: "grey.800",
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              requireAuth(makeAction);
            }}
          >
            {isFollowingBook ? "Following" : "Follow"}
          </IconButton>
        )}
      </>
    );
  };
  return (
    <Card
      sx={(theme) => ({
        minWidth: where == "home" ? 300 : "100%",
        flexShrink: 0, // Prevent shrinking in flex layouts
        flexGrow: 0, // Prevent growing in flex layouts
        height: where == "home" ? 130 : 150,
        cursor: "pointer",
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": { transform: "translateY(-2px)" },
        transition: "transform 0.2s",
        overflow: "hidden",
        borderRadius: 1.5,
        position: "relative",
        p: { xs: 1, md: 1 },
        background: theme.custom.gradient.primary,
      })}
      onClick={() => router.push(`r/${robook.slug}`)}
      elevation={0}
    >
      {/* <Avatar
        src="/two.png"
        sx={{
          width: 33,
          height: 33,
          borderRadius: 0,
          position: "absolute",
          right: 2,
          bottom: 0,
        }}
      /> */}
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Box
          sx={{
            width: { xs: 110, md: 150 },
            height: "100%",
            flexShrink: 0,
            borderRadius: "12px 0 0 12px",
            overflow: "hidden",
            p: 0.5,
            pl: 0.5,
          }}
        >
          <Box
            component="img"
            src={robook.main_photo_url}
            alt={robook.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              borderRadius: 1.1,
            }}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 1,
            width: "100%",
            minWidth: 0,
            height: "100%",
          }}
        >
          <Box sx={{ flex: 1, minHeight: 0, pb: 1 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "wrap",
                }}
              >
                {robook.name}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                fontSize: "0.75rem",
              }}
            >
              {[...(robook.topics ?? []), ...(robook.custom_topics ?? [])]
                .slice(0, where == "home" ? 2 : 3)
                .join(" • ")}
            </Typography>
          </Box>
          {where != "home" && <FollowButton />}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-arround",
              alignItems: "center",
              height: 20,
              gap: 1.5,
              color: "text.secondary",
              flexShrink: 0,
              mt: "auto",
            }}
          >
            {/* Follow Button */}

            {where != "home" && (
              <IconButton
                size="small"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  borderRadius: 0.9,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderColor: "grey.800",
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              >
                Read
              </IconButton>
            )}
            {where == "home" && <FollowButton />}
            {/* Interactions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <ChatIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {robook.followers_count}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
