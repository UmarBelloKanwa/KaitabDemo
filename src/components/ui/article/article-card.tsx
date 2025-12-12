"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale"; // 👈 Import this!

import LikeButton from "@ui/robook/chapter/ActionsButtons/LikeButton";
import ShareButton from "@ui/robook/chapter/ActionsButtons/ShareButton";
import { likeArticle, unLikeArticle } from "@/lib/api/article";
import type { Article } from "@/types/article";
import { MainArticleView } from "@/components/ui/article/article-main";

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

export default function ArticleCard({ article }: { article: Article }) {
  const router = useRouter();

  //const url = `/${author.handle}/post/${post.public_id}`;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  const author = article.author;

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent",
        mx: "auto",
        boxShadow: "none",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        width: "100%",
        p: 0,
      }}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0 }}>
            <Avatar
              src={author.profile_picture || "/placeholder.svg"}
              alt={author.name}
              onClick={() => {
                router.push(`/${author.handle}`);
              }}
              sx={{
                width: 48,
                height: 48,
                objectFit: "fill",
                // borderRadius: 1,
              }}
            >
              {author.name.charAt(0)}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <Typography
                component="div"
                variant="body2"
                onClick={() => {
                  router.push(`/${author.handle}`);
                }}
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
                <Typography variant="caption" sx={{ flex: 1, color: "gray" }}>
                  {dayjs(article.created_at).fromNow(true)}
                </Typography>
              </Typography>

              <Typography variant="caption" sx={{ color: "grey" }}>
                @{author.handle}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <MainArticleView content={article.content} />
        </Box>

        <Box
          sx={{
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
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
              createLike={async () => await likeArticle(article.public_id)}
              removeLike={async () => await unLikeArticle(article.public_id)}
              isLikedByUser={article.liked_by_user}
              likesCount={article.like_count}
            />

            <IconButton
              size="small"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   router.push(url);
              // }}
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
                {formatNumber(article.comment_count)}
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
            <ShareButton id={`c/${article.public_id}`} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
