"use server";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ChaptersIcon from "@mui/icons-material/ImportContacts";
import ChapterGroup from "./ChapterGroup";
import bookData from "@/data/bookData.json";
import type { BookResponse, BookChapterResponse } from "@/types/book";
import Avatar from "@mui/material/Avatar";

const ChaptersFeed = ({
  robook,
  chapters,
}: {
  robook: BookResponse;
  chapters: BookChapterResponse[];
  }) => {
  console.log(chapters);
  return (
    <Box sx={{ width: "100%", m: "auto" }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          top: 0,
          zIndex: 20,
          m: "auto",
          border: "1px solid divider",
          bgcolor: "background.default"
        }}
      >
        <Box sx={{ maxWidth: "100%", mx: "auto", px: 1, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={robook?.main_photo_url}
              // alt={robook.author}
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                border: `1px solid divider`,
                bgcolor: "grey.700",
                color: "primary",
                borderRadius: "7px",
              }}
            >
              {robook?.name.charAt(0)}
            </Avatar>
            <Box sx={{mt: -1}}>
              <Typography variant="h6" fontWeight="bold">
                {robook.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {robook?.extra_metadata?.totalChapters} chapters &nbsp; • &nbsp;
                {robook?.extra_metadata?.totalPages} pages
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ m: "auto", mt: 1,}}>
        {chapters.map((chapter, id) => (
          <ChapterGroup key={id} chapter={chapter} id={id} robook={robook} />
        ))}
      </Box>
    </Box>
  );
};

export default ChaptersFeed;
