"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { BookPostDTO, BookResponse } from "@/types/book";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale"; // 👈 Import this!
import type { Author } from "@/types/author";

import LikeButton from "@ui/robook/chapter/ActionsButtons/LikeButton";
import ShareButton from "@ui/robook/chapter/ActionsButtons/ShareButton";
import { likeAuthorPost, unLikeAuthorPost } from "@/lib/api/author";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale); // Extend with updateLocale first

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export default function PostCard({
  isPermanent = false,
  author,
  post,
}: {
  author: Author;
  post: BookPostDTO;
  isPermanent?: boolean;
}) {
  const router = useRouter();

  const url = `/${author.handle}/post/${post.public_id}`;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  const maxLines = 7;

  const handlePostClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) {
      return;
    }
    if (!isPermanent) {
      router.push(url);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "background.default",
        mx: "auto",
        boxShadow: 11,
       
        borderRadius: 2,
       border: "1px solid",
         borderColor: "rgba(255, 255, 255, 0.03)",
        width: "100%",
        p: 0,
      }}
      onClick={handlePostClick}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2 }, pt: 0 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0 }}
          >
            <Avatar
              src={author.profile_picture || "/placeholder.svg"}
              alt={author.name}
              sx={{
                width: 50,
                height: 50,
                objectFit: "fill",
                borderRadius: 1
              }}
            >
              {author.name.charAt(0)}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <Typography
                component="div"
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  gap: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {author.name}
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  ·
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ flex: 1, color: "gray",  }}
                >
                  {dayjs(post.created_at).fromNow(true)}
                </Typography>
              </Typography>

              <Typography variant="caption" sx={{ color: "#6b7280" }}>
                @{author.handle}
              </Typography>
            </Box>
          </Box>
          {/* <ShareButton id={`post/${post.public_id}`} /> */}
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              lineHeight: 1.6,
              fontSize: { xs: "14px", sm: "14px", md: "15px" },
              whiteSpace: "pre-line",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: isPermanent ? "unset" : maxLines, // ✅ collapse when not expanded
            }}
          >
            {post.content}
          </Typography>

          {/* Show button only if content is long */}
          {!isPermanent && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(url);
              }}
              sx={{
                color: "#1DA1F2",
                textTransform: "none",
                p: 0,
                minWidth: "auto",
                "&:hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Show more
            </Button>
          )}
        </Box>

        <Box
          sx={{
            pt: 1.5,
            borderTop: "1px solid #3333338f",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            <LikeButton
              createLike={async () => await likeAuthorPost(post.public_id)}
              removeLike={async () => await unLikeAuthorPost(post.public_id)}
              isLikedByUser={post.liked_by_user}
              likesCount={post.like_count}
            />

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                 router.push(url);
              }}
              sx={{
                color: "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  color: "#1DA1F2",
                  bgcolor: "rgba(29, 161, 242, 0.1)",
                },
              }}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                {formatNumber(post.comment_count)}
              </Typography>
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, sm: 0.5 },
            }}
          >
            <ShareButton id={`post/${post.public_id}`} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
