"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";
import RobookCard from "./RobookCard";
import type { BookResponse } from "@/types/book";
import type { Author } from "@/types/author";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import ShareButton from "@/components/ui/robook/chapter/ActionsButtons/ShareButton";
import { useRouter } from "next/navigation";
interface Robook extends BookResponse {
  comments_count: number;
}

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

export default function RobookCardContent({
  robook,
  author,
  authorHandle,
}: {
  robook: Robook;
  author: Author;
  authorHandle: string;
}) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Card
      sx={{
        maxWidth: "100%",
        bgcolor: "background.default",
        color: theme.palette.text.primary,
        // border: `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        boxShadow: "none",
      }}
      elevation={0}
    >
      <CardContent sx={{ p: { xs: 0, sm: 2 } }}>
        {/* Header with avatar, name, and more options */}
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 0 }}>
          <Avatar
            src={author.profile_picture}
            sx={{
              width: 40,
              height: 40,
              mr: 1.5,
              outline: `2px solid ${theme.palette.divider}`,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { sm: "13px", md: "17px" },
                  color: theme.palette.text.primary,
                }}
              >
                {author.name}
              </Typography>
              <VerifiedIcon
                sx={{ fontSize: 16, color: theme.palette.primary.main }}
              />
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary, ml: 0.5 }}
              >
                <Box component="span"> {author.handle}&nbsp;•</Box>
                <Box component="span">
                  {" "}
                  {dayjs(robook.uploaded_at).fromNow(true)}{" "}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tweet content */}
        <Box sx={{ ml: { xs: 4, sm: 6.5 }, mb: 2 }}>
          <RobookCard robook={robook} where="profile" />
        </Box>

        {/* Engagement metrics */}
        <Box
          sx={{
            ml: 6.5,
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 4 },
            mt: 2,
            pb: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, sm: 1 },
              p: 0.5,
            }}
            onClick={() => {
              router.push(`/${authorHandle}/r/${robook.slug}#comments`);
            }}
          >
            <IconButton
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {robook.comments_count}
            </Typography>
          </Box>

          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0, sm: 1 },
            }}
          >
            <IconButton
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": { color: theme.palette.error.main },
                p: 0.5,
              }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              1.2K
            </Typography>
          </Box> */}

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0, ml: "auto" }}
          >
            <ShareButton absolute={true} id={`r/${robook.slug}`} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
