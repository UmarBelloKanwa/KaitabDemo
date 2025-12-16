"use client";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type { ArticlePreview } from "@/types/article";

interface ArticleCardProps {
  articlePreview: ArticlePreview;
}

export default function ArticleCard({ articlePreview }: ArticleCardProps) {
  const router = useRouter();
  function formatDateShort(dateString: string) {
    const date = new Date(dateString);

    return date
      .toLocaleDateString("en-US", {
        month: "short", // "Dec"
        day: "numeric", // "10"
      })
      .toUpperCase(); // "DEC 10"
  }
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent",
        borderRadius: 2,
        width: "100%",
        maxWidth: "100%",
        color: "grey",
        mb: 1,
        "&:hover": {
          bgcolor: "background.paper",
        },
      }}
      onClick={() => {
        router.push(
          `/${articlePreview.author?.handle}/c/${articlePreview.public_id}`
        );
      }}
    >
      <CardContent >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Avatar
              src={articlePreview.author?.profile_picture}
              alt={articlePreview.author?.name}
              sx={{
                width: 40,
                height: 40,
              }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
              {articlePreview.author?.name}
            </Typography>
          </Stack>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
            }}
          >
            {formatDateShort(articlePreview.created_at)}
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          sx={{
            // fontWeight: 700,
            mb: 1,
            fontSize: "0.99rem",
            //  lineHeight: 1.3,
          }}
        >
          {articlePreview.title}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "0.9rem",
            mb: 1,
            // lineHeight: 1.6,
          }}
        >
          {articlePreview.preview_text}
        </Typography>

        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {articlePreview.author?.name} &nbsp; • &nbsp; {"1 MIN READ"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
