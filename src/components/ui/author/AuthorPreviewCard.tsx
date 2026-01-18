"use client";

import { Box, Paper, Avatar, Typography, Button, Stack } from "@mui/material";
import type { Author } from "@/types/author";
import { useRouter } from "next/navigation";
import { navigateToSubdomain } from "@/lib/utils/navigate";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

export default function AuthorPreviewCard({ author }: { author: Author }) {
  const router = useRouter();
  return (
    <Paper
      elevation={0}
      onClick={() => {
        navigateToSubdomain(author.handle, "/");
      }}
      sx={{
        gap: 2,
        width: 328,
        height: 175,
        bgcolor: "background.default",
        borderRadius: 2,
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",

        border: "2px solid",
        borderColor: "divider",
        "&:hover": {
          cursor: "pointer",
          // bgcolor: "action.hover",
        },
        //boxShadow: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          m: "auto",
          width: "100%",
        }}
      >
        {/* Profile Picture */}

        <Avatar
          src={author.profile_picture}
          sx={{
            width: 100,
            height: 100,
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0,
            justifyContent: "flex-start", // 👈 add this
            alignItems: "flex-start", // optional
          }}
        >
          {/* Username with Verification Badge */}

          <Typography component="span" fontSize="0.9em" fontWeight={500}>
            {author.name}
          </Typography>

          {/* Display Name */}
          <Typography variant="body2" fontSize="small">
            @{author.handle}
          </Typography>

          <Typography
            variant="body2"
            fontSize="small"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mt: 0.5,
            }}
          >
            {author.short_bio}
          </Typography>
          {/* Stats */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* <Typography
              component="div"
              variant="caption"
              color="grey"
              fontSize="x-small"
            >
              {author.articles_count || "0"} <ArticleOutlinedIcon sx={{fontSize: 10, color: "white"}}  />
            </Typography> */}
            {/* <Typography
              component="span"
              variant="caption"
              color="grey"
              fontSize="x-small"
            >
              29 chats
            </Typography> */}

            {/* <Typography variant="caption" color="grey" component="div" fontSize="x-small">
              {author.followers_count} <PlaylistPlayOutlinedIcon sx={{fontSize: 15, color: "white"}} />
            </Typography> */}
            {author.monetization_enabled && (
              <Button
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "x-small",
                  // p: 0.3,
                  py: 0.2,
                  mt: 0.5,
                  borderRadius: 1,
                  color: "white",
                  borderColor: "divider",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToSubdomain(author.handle, "/subscribe");
                }}
              >
                Subscribe
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1} sx={{ mt: 0, width: "100%" }}>
        <Button
          fullWidth
          size="small"
          //variant="contained"
          className="elevated"
          onClick={(e) => {
            e.stopPropagation();
            navigateToSubdomain(author.handle, "/chat");
          }}
          sx={{
            borderRadius: 2,
            color: "#ffffff",
          }}
        >
          Chat
        </Button>
        <Button
          fullWidth
          // variant="outlined"
          className="elevated"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            navigateToSubdomain(author.handle, "/library");
          }}
          sx={{
            color: "#ffffff",
            borderRadius: 2,
          }}
        >
          Library
        </Button>
      </Stack>
    </Paper>
  );
}
