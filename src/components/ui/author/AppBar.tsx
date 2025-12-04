"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import type { BookResponse } from "@/types/book";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

interface Props {
  robook: BookResponse;
  author: Author;
  authorHandle: string;
}

export default function ResponsiveAppBar({ robook, authorHandle, author }: Props) {
  const robookPhotoUrl = robook.cover_photo_url || "";
  const robookName = robook.name;
  const authorName = robook.author?.name || author.name;
  const router = useRouter();
  let url = `/${authorHandle}`;
  
  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={(theme) => ({
        bgcolor: "background.default",
        borderBottom: "1px solid grey",
        borderTop: { xs: `1px solid ${theme.palette.divider}` },
        borderColor: "divider",
        px: 0,
        justifyContent: "center",
        alignItems: "baseline",
      })}
    >
      <Toolbar sx={{ my: "auto", p: 0, mx: 0, gap: { xs: 1, md: 1 } }}>
        <IconButton onClick={() => router.push(url)}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={robookPhotoUrl}
            sx={{
              width: { xs: 37, sm: 40 },
              height: { xs: 37, sm: 40 },
              borderRadius: 1,
            }}
          >
            {robookName[0]}
          </Avatar>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              gap: 0.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {robookName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              By {authorName}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
