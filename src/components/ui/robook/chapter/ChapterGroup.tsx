"use client";

import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type { BookChapterResponse, BookResponse } from "@/types/book";

export default function ChapterGroup({
  children,
  chapter,
  id,
}: {
  children: React.ReactNode;
  chapter: BookChapterResponse;
  id: number;
}) {
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <Box sx={{ mb: 0 }}>
      <Paper
        elevation={0}
        sx={{
          mb: collapsed ? 1 : 0.3,
          ml: collapsed ? 0 : "auto",
          borderRadius: 1,
          bgcolor: "background.default",
        }}
      >
        <Button
          fullWidth
          variant="text"
          onClick={() => setCollapsed(!collapsed)}
          endIcon={collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          sx={{
            py: 1,
            px: 3,
            justifyContent: "space-between",
            textTransform: "none",
            color: "text.primary",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 0 }}>
              {chapter.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Chapter {id}
            </Typography>
          </Box>
        </Button>
      </Paper>

      <Collapse in={!collapsed} timeout="auto" unmountOnExit={false}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
            width: "100%",
            m: "auto",
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}
