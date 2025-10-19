"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ChaptersIcon from "@mui/icons-material/ImportContacts";
import ChapterGroup from "./ChapterGroup";
import bookData from "@/data/bookData.json";

export default function ChaptersFeed({ robook, chapters }: { robook: any, chapters: any }) {
  return (
    <Box sx={{ width: "100%", m: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          top: 0,
          zIndex: 20,
          m: "auto",
          //bgcolor: "background.default"
        }}
      >
        <Box sx={{ maxWidth: "100%", mx: "auto", p: 2, pt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <ChaptersIcon sx={{ width: 32, height: 32 }} />

            <Box>
              <Typography variant="h6" fontWeight="bold">
                Atomic Habits Chapters
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {bookData.metadata.totalChapters} chapters •{" "}
                {bookData.metadata.totalPages} pages
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mx: "auto", py: 1 }}>
        {bookData.chapters.map((chapter) => (
          <ChapterGroup key={chapter.id} chapter={chapter} />
        ))}
      </Box>
    </Box>
  );
}
