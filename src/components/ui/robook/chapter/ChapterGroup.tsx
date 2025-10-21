"use client";

import React from "react";
import SectionPost from "./SectionPost";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type {
  BookChapterResponse,
  ChapterContent,
  BookResponse,
} from "@/types/book";
import Chapter from "@/components/ui/robook/chapter/Chapter";

export default function ChapterGroup({
  chapter,
  id,
  robook,
}: {
  chapter: BookChapterResponse;
  id: number;
  robook: BookResponse;
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
              {/* {chapter.sections.length} sections • Pages {chapter.pageNumber}-
                            {chapter.pageNumber + chapter.pagesCount - 1} */}
            </Typography>
          </Box>
        </Button>
      </Paper>

      <Collapse in={!collapsed}>
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
          <Chapter robook={robook} chapter={chapter} />
        </Box>
      </Collapse>
    </Box>
  );
}
