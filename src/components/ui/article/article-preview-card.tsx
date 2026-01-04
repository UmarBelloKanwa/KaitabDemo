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
import ShareButton from "@ui/robook/chapter/ActionsButtons/ShareButton";

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
        bgcolor: "background.default",
        boxShadow: 11,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        width: "100%",
        maxWidth: "100%",
        color: "grey",
        mb: 2,
        "&:hover": {
          bgcolor: "background.paper",
        },
      }}
      onClick={() => {
        router.push(`/c/${articlePreview.public_id}`);
      }}
    >
      <CardContent>
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
                width: 48,
                height: 48,
                objectFit: "fill",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                mt: -0.7,
              }}
            >
              <Typography
                component="div"
                variant="body2"
                onClick={() => {
                  router.push(`/${articlePreview.author?.handle}`);
                }}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  gap: 1,
                }}
              >
                {articlePreview.author?.name}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: "grey" }}
              >
                @{articlePreview.author?.handle}
              </Typography>
            </Box>
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

        <Box sx={{ display: "flex", alignItems: "baseline", mt: 2 }}>
          <Typography
            component="div"
            variant="caption"
            sx={{
              fontSize: "0.8rem",
              flex: 1,
            }}
          >
            {articlePreview.author?.name} &nbsp; • &nbsp; {"1 MIN READ"}
          </Typography>
          <Box>
            <ShareButton
              id={`/c/${articlePreview.public_id}`}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
