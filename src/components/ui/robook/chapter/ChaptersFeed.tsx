"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ChapterGroup from "./ChapterGroup";
import type { BookChapterResponse } from "@/types/book";
import Avatar from "@mui/material/Avatar";
import Chapter from "@/components/ui/robook/chapter/Chapter";
import { fetchRobook, fetchBookChapters } from "@/lib/api/book";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const ChaptersFeed = ({ slug }: { slug: string }) => {
  // Fetch robook metadata
  const {
    data: robook,
    isLoading: robookLoading,
    isError: robookError,
  } = useQuery({
    queryKey: ["robook", slug],
    queryFn: () => fetchRobook(slug),
    staleTime: Infinity,
  });

  // Fetch chapters
  const {
    data: chapters,
    isLoading: chaptersLoading,
    isError: chaptersError,
  } = useQuery({
    queryKey: ["chapters", slug],
    queryFn: () => fetchBookChapters(slug),
    staleTime: Infinity,
  });

  // ======================
  //  1️⃣ Robook Loading
  // ======================
  if (robookLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // ======================
  //  2️⃣ Robook Error
  // (We cannot proceed without it)
  // ======================
  if (robookError || !robook) {
    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="error">Robook not found.</Alert>
      </Box>
    );
  }

  // ================
  // 3️⃣ Normal UI
  // ================
  return (
    <Box sx={{ width: "100%", m: "auto" }}>
      {/* --- Robook Header --- */}
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          top: 0,
          zIndex: 20,
          m: "auto",
          border: "1px solid divider",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ maxWidth: "100%", mx: "auto", px: 1, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={robook?.main_photo_url}
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                border: `1px solid divider`,
                bgcolor: "grey.700",
                borderRadius: "7px",
              }}
            >
              {robook.name.charAt(0)}
            </Avatar>

            <Box sx={{ mt: -1 }}>
              <Typography variant="h6" fontWeight="bold">
                {robook.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {robook.extra_metadata?.totalChapters} chapters &nbsp; • &nbsp;
                {robook.extra_metadata?.totalPages} pages
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* --- Chapters Section --- */}
      <Box sx={{ mt: 2 }}>
        {/* Chapters Loading */}
        {chaptersLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Chapters Error (but still show robook header) */}
        {chaptersError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Unable to load chapters. Please login to access this content.
          </Alert>
        )}

        {/* Chapters Render */}
        {chapters &&
          chapters.map((chapter: BookChapterResponse, id: number) => (
            <ChapterGroup key={id} chapter={chapter} id={id + 1}>
              <Chapter robook={robook} chapter={chapter} />
            </ChapterGroup>
          ))}
      </Box>
    </Box>
  );
};

export default ChaptersFeed;
